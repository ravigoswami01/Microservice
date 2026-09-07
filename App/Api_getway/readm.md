# API Gateway

The API gateway is the public entry point for the microservice system.

## Responsibilities

- Proxies `/auth` requests to the authentication service
- Applies security headers, CORS, rate limiting, and request logging
- Validates gateway access and forwards authenticated user identity headers

## Run

From this directory:

```bash
npm install
npm run dev
```

The gateway listens on `GATEWAY_PORT`, defaulting to `3000`.

## Endpoints

```text
GET /health
/auth/*    Proxied to the authentication service
```

Required environment variables include `GATEWAY_SECRET` and `AUTH_SERVICE_URL`.
