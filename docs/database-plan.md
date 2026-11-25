# Database plan (Supabase / PostgreSQL)

Every table has `id`, `created_at`, `updated_at`. Money columns are integer minor units plus `currency`.

## Identity and tenancy
profiles · businesses (type: individual, retailer, wholesaler, distributor, manufacturer, importer, brand, affiliate) · business_members (role) · verifications (identity, business, kept separate) · seller_reputation (computed from real events)

## Catalogue
categories · brands · products · product_variants · product_media · supplier_offers (dropship, wholesale, retail, quote; supplier price, suggested price, MOQ, dispatch time, regions) · reseller_listings (imports of supplier offers with reseller price)

## Stores
stores (slug, branding, theme, policies, publish-to-marketplace flag, future custom domain) · store_domains

## Orders and fulfilment
carts · orders · order_items · fulfilment_requests (per supplier) · shipments · returns · disputes

## Wholesale
price_tiers · quotes · purchase_orders

## Finance
ledger_accounts · ledger_entries (balanced pairs, append-only) · payments · payouts · refunds · commissions · wallet_views (derived)

## Platform
reviews (verified purchase only) · messages · notifications · audit_log · countries · currencies · tax_rules · shipping_rates

## RLS rules
- Customers read and write only their own carts, orders and reviews.
- Business members access only rows with their `business_id`, scoped by role.
- Suppliers see only fulfilment requests addressed to them.
- Public reads are limited to published products and stores.
- Ledger, audit_log and payments are insert-only for application roles. Only server-side service functions write them.
- Admin access uses separate roles and never shares a code path with seller access.
