# Microservice

A TypeScript monorepo containing an API gateway, authentication service, task service, and shared infrastructure package.

## Project Structure

- `App/Api_getway` - API gateway and request proxying
- `App/Auth_service` - authentication and user management
- `App/Task_service` - task service
- `packages/shared` - shared database, authentication, logging, validation, and response utilities
- `Sql` - database schema files
- `script/db_migrate.ts` - database migration runner

## Requirements

- Node.js
- npm
- PostgreSQL-compatible database

## Setup

Install dependencies from the repository root:

```bash
npm install
```

Configure the root `.env` file with your database connection and service settings. Do not commit real credentials or secrets.

Important environment variables include:

```env
AUTH_PORT=4000
GATEWAY_PORT=3000
TASK_PORT=3001
AUTH_SERVICE_URL=http://localhost:4000
TASK_SERVICE_URL=http://localhost:3001
DATABASE_URL=your_database_connection_string
GATEWAY_SECRET=your_gateway_secret
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
```

## Database Migration

Run the default user schema migration:

```bash
npm run db:migrate
```

Run a specific SQL file:

```bash
npx tsx script/db_migrate.ts Sql/01_Task.sql
```

## Running Services

Run each service in a separate terminal from the repository root:

```bash
npm run --workspace=api_getway dev
npm run --workspace=auth_service dev
npm run --workspace=task_service dev
```

The services use these default addresses:

- Gateway: `http://localhost:3000`
- Auth service: `http://localhost:4000`
- Task service: `http://localhost:3001`

## Health Checks

```bash
curl http://localhost:3000/health
curl http://localhost:4000/health
curl http://localhost:3001/health
```

The gateway exposes authentication routes under `/auth` and proxies them to the authentication service.
