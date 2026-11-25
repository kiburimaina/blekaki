# Environments

| Environment | Purpose | Data | Payments |
|---|---|---|---|
| development | local work | seed data, clearly marked fake | provider sandbox only |
| preview | every pull request (Vercel preview) | separate Supabase project | sandbox only |
| production | live | real | live only after explicit approval |

Each environment has its own Supabase project, keys and webhook secrets. Nothing is shared between them.

Deploys: preview is automatic per pull request. Production deploys and any merge to `main` need written approval.
