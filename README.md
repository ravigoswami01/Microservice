# Microservice Project

This repository contains a microservice-based application with separate services for authentication and task management, plus an API gateway and shared packages.

## Project Structure

- `App/Api_getway` - API gateway service
- `App/Auth_service` - Authentication service
- `App/Task_service` - Task management service
- `packages/shared` - Shared utilities, database connection, validation, logger, and error handling
- `Sql` - SQL migration files
- `script` - Database migration scripts

## Tech Stack

- TypeScript
- Node.js
- PostgreSQL
- Express-style service architecture
- Shared package for common modules

## Getting Started

1. Install dependencies for each service/package as needed.
2. Configure environment variables.
3. Run the services in their respective directories.
4. Use the API gateway to route requests.

## Notes

This project is structured as a monorepo-style microservice setup and is intended to be extended as development progresses.
