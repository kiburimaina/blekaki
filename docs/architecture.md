# Architecture

## Shape
A modular monolith in one Next.js app, deployed on Vercel, backed by Supabase. Domains are separate modules with their own data access and rules, so they can be split out later.

## Domains
catalog · sellers and verification · stores (multi-tenant) · orders · dropship and fulfilment · wholesale and quotes · payments and ledger · delivery · marketing and affiliates · business OS (inventory, POS, expenses) · admin and moderation · countries and tax

## Proposed layout
```
src/
  app/            routes (public shop, /store/[slug], /seller, /supplier, /admin)
  modules/        one folder per domain: schema, queries, actions, rules, tests
  components/     design-system components
  lib/            supabase clients, validation, money, i18n, logging
  adapters/       payments/, delivery/, ads/, ai/ (one interface, many providers)
supabase/
  migrations/     versioned SQL
  seed/           development seed only
docs/
```

## Principles
1. **Multi-tenant by design.** Every seller-owned row carries `business_id` (and `store_id` where relevant). Row Level Security enforces separation. Application code never relies on filtering alone.
2. **Server decides.** Prices, stock, fees, permissions and order state change only in server actions or database functions.
3. **Adapters for anything external.** Payments, couriers, ads, AI and verification providers sit behind interfaces. If credentials are missing, the adapter reports "not configured". It never simulates success.
4. **Money is integers.** Amounts are stored in minor units with an ISO currency code. KES is the default. No hardcoded country assumptions: country config drives currency, tax, payment methods and shipping.
5. **Ledger first.** Every financial event is a balanced double-entry posting. Balances are derived, not edited.
6. **Background jobs** handle webhooks, stock sync, settlements and notifications, and are idempotent.
7. **Audit everything sensitive.** Role changes, approvals, refunds, payouts and settings changes write to an append-only audit log.

## Order flow (dropshipping)
placed → payment confirmed → stock checked → financial breakdown → supplier request → accepted/rejected → dispatched → delivered → fulfilment confirmed → earnings calculated → settlement. Rejection, cancellation, partial fulfilment, refund and dispute are first-class states.
