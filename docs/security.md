# Security model

- **Auth:** Supabase Auth with email, phone OTP and OAuth. MFA required for admins and for withdrawals.
- **Authorisation:** role-based, enforced by RLS and re-checked server-side. Admin and seller access are separate.
- **Secrets:** server-only environment variables. Never in client bundles or in git. Service-role keys are never exposed to the browser.
- **Payments:** use licensed providers (M-Pesa, cards, banks). Never store card data. Verify every webhook signature and make handlers idempotent. Wallet views do not mean Blekaki holds regulated funds; stored value, escrow and payouts go through regulated partners.
- **Input:** validate all input on the server with a shared schema. Rate-limit auth, search, messaging and checkout.
- **High-risk actions:** refunds, payouts, role grants and settings changes require a second approver and are written to the audit log.
- **Privacy:** collect the minimum, encrypt at rest, restrict verification documents to reviewers, log access.
- **Trust:** no fabricated badges, reviews or stock. Reviews require a verified purchase.
- **Recovery:** daily database backups, a tested restore procedure and migrations as the only way to change schema.
