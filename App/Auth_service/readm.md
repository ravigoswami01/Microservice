# Auth Service

The authentication service manages user registration, login, and the current authenticated user.

## Run

From this directory:

```bash
npm install
npm run dev
```

The service listens on `AUTH_PORT`, defaulting to `4000`.

## Endpoints

```text
GET  /health
POST /auth/register
POST /auth/login
GET  /auth/me
```

Requests to `/auth` require the gateway secret when called directly. Configure `DATABASE_URL`, `GATEWAY_SECRET`, `JWT_SECRET`, and `JWT_EXPIRES_IN` in the root `.env` file.
