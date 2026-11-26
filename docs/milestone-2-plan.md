# Milestone 2 plan: authentication and marketplace

Status: schema drafted, nothing applied to any database.

## Done on this branch
- `supabase/migrations/0001_core_identity_catalogue.sql`: profiles, businesses, members, verifications (identity and business kept separate), categories, products, stores, audit log, helper functions and Row Level Security.

## Needs your approval or input before it can go further
1. **A Supabase development project.** Creating one may cost money. Tell me when you approve, or create it and share the project name.
2. **Applying the migration** to that development project.
3. **Auth settings:** which sign-in methods to enable first (email, phone OTP, Google).

## Next steps once approved
- Add `@supabase/ssr` and `@supabase/supabase-js`, server and browser clients, and route protection.
- Sign-up, sign-in and account pages.
- Seller onboarding: create a business, choose its type, start verification.
- Move the product catalogue from sample data to the database, then seller storefront pages.

## Rules kept
No fake verification badges (badges only from `approved` rows), no secrets in git, admin access separate from seller access, audit log write-only for the service role.
