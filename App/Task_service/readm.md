# Task Service

The task service is the home for task management functionality.

## Run

From this directory:

```bash
npm install
npm run dev
```

The service listens on `TASK_PORT`, defaulting to `3002` in the current implementation.

## Endpoints

```text
GET /health
```

Task routes can be added under `src/routes` as the service grows. The service loads configuration from its local `.env` file or the repository root `.env` file.
