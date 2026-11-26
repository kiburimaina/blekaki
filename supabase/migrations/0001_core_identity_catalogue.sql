-- Milestone 2: identity, businesses, catalogue and stores. NOT YET APPLIED to any database.
-- Apply to a development Supabase project first, never directly to production.

create extension if not exists pgcrypto;

create type platform_role as enum ('customer', 'support', 'finance', 'admin');
create type business_type as enum ('individual', 'retailer', 'registered_business', 'wholesaler', 'distributor', 'manufacturer', 'importer', 'brand_owner', 'affiliate');
create type member_role as enum ('owner', 'admin', 'manager', 'staff');
create type verification_kind as enum ('identity', 'business');
create type verification_status as enum ('not_started', 'pending', 'approved', 'rejected');
create type product_status as enum ('draft', 'pending_review', 'published', 'rejected', 'archived');

-- Profiles: one per auth user.
create table profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  phone text,
  country_code char(2) not null default 'KE',
  platform_role platform_role not null default 'customer',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create function handle_new_user() returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into profiles (id, display_name) values (new.id, coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1)));
  return new;
end $$;
create trigger on_auth_user_created after insert on auth.users for each row execute function handle_new_user();

create function is_platform_admin() returns boolean language sql security definer stable set search_path = public as $$
  select exists (select 1 from profiles where id = auth.uid() and platform_role = 'admin');
$$;

-- Businesses and membership (the tenancy boundary).
create table businesses (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type business_type not null default 'individual',
  country_code char(2) not null default 'KE',
  created_by uuid not null references profiles (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table business_members (
  business_id uuid not null references businesses (id) on delete cascade,
  user_id uuid not null references profiles (id) on delete cascade,
  role member_role not null default 'staff',
  created_at timestamptz not null default now(),
  primary key (business_id, user_id)
);

create function is_business_member(bid uuid, roles member_role[] default null) returns boolean language sql security definer stable set search_path = public as $$
  select exists (
    select 1 from business_members
    where business_id = bid and user_id = auth.uid() and (roles is null or role = any (roles))
  );
$$;

create function add_owner_membership() returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into business_members (business_id, user_id, role) values (new.id, new.created_by, 'owner');
  return new;
end $$;
create trigger on_business_created after insert on businesses for each row execute function add_owner_membership();

-- Verification is kept separate for identity (a person) and business (a company). Badges come only from approved rows.
create table verifications (
  id uuid primary key default gen_random_uuid(),
  kind verification_kind not null,
  user_id uuid references profiles (id) on delete cascade,
  business_id uuid references businesses (id) on delete cascade,
  status verification_status not null default 'pending',
  reviewed_by uuid references profiles (id),
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  check ((kind = 'identity' and user_id is not null and business_id is null) or (kind = 'business' and business_id is not null))
);

-- Catalogue.
create table categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  parent_id uuid references categories (id),
  sort_order int not null default 0
);

create table products (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses (id) on delete cascade,
  category_id uuid references categories (id),
  slug text not null unique,
  name text not null,
  description text not null default '',
  price_minor bigint not null check (price_minor >= 0),
  currency char(3) not null default 'KES',
  status product_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index products_business_idx on products (business_id);
create index products_status_idx on products (status);

create table stores (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses (id) on delete cascade,
  slug text not null unique,
  name text not null,
  description text not null default '',
  is_published boolean not null default false,
  publish_to_marketplace boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Audit log: append-only. Written by server-side service functions only.
create table audit_log (
  id bigint generated always as identity primary key,
  actor_id uuid,
  action text not null,
  entity text not null,
  entity_id text,
  meta jsonb not null default '{}',
  created_at timestamptz not null default now()
);

-- Row Level Security.
alter table profiles enable row level security;
alter table businesses enable row level security;
alter table business_members enable row level security;
alter table verifications enable row level security;
alter table categories enable row level security;
alter table products enable row level security;
alter table stores enable row level security;
alter table audit_log enable row level security;

create policy profiles_select on profiles for select using (id = auth.uid() or is_platform_admin());
create policy profiles_update on profiles for update using (id = auth.uid())
  with check (id = auth.uid() and platform_role = (select p.platform_role from profiles p where p.id = auth.uid()));

create policy businesses_select on businesses for select using (is_business_member(id) or is_platform_admin());
create policy businesses_insert on businesses for insert with check (created_by = auth.uid());
create policy businesses_update on businesses for update using (is_business_member(id, array['owner','admin']::member_role[]));

create policy members_select on business_members for select using (user_id = auth.uid() or is_business_member(business_id) or is_platform_admin());
create policy members_manage on business_members for all using (is_business_member(business_id, array['owner']::member_role[])) with check (is_business_member(business_id, array['owner']::member_role[]));

create policy verifications_select on verifications for select using (user_id = auth.uid() or (business_id is not null and is_business_member(business_id)) or is_platform_admin());
create policy verifications_insert on verifications for insert with check (status = 'pending' and ((kind = 'identity' and user_id = auth.uid()) or (kind = 'business' and is_business_member(business_id, array['owner','admin']::member_role[]))));
create policy verifications_review on verifications for update using (is_platform_admin());

create policy categories_read on categories for select using (true);
create policy categories_admin on categories for all using (is_platform_admin()) with check (is_platform_admin());

create policy products_public on products for select using (status = 'published' or is_business_member(business_id) or is_platform_admin());
create policy products_insert on products for insert with check (is_business_member(business_id, array['owner','admin','manager']::member_role[]));
create policy products_update on products for update using (is_business_member(business_id, array['owner','admin','manager']::member_role[]) or is_platform_admin());

create policy stores_public on stores for select using (is_published or is_business_member(business_id) or is_platform_admin());
create policy stores_manage on stores for all using (is_business_member(business_id, array['owner','admin']::member_role[])) with check (is_business_member(business_id, array['owner','admin']::member_role[]));

create policy audit_admin_read on audit_log for select using (is_platform_admin());
-- No insert/update/delete policies on audit_log: only the service role can write it.
