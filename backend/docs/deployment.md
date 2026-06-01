# Deployment Guide

## Production readiness
This backend is designed for cloud deployment with separation between API, business logic, and AI adapters.

## Recommended deployment stack
- Application: Flask behind Gunicorn / Uvicorn
- Database: PostgreSQL
- Caching / Session store: Redis
- Background jobs: Celery or RQ for long-running AI ingestion
- Observability: centralized logs, metrics, and health checks

## Environment variables
- `SECRET_KEY` — required for auth token signing
- `DATABASE_URL` — postgres or sqlite URL
- `UPLOAD_FOLDER` — persistent storage path for uploaded PDFs
- `AI_PROVIDER` — adapter provider name
- `TOKEN_EXPIRATION_SECONDS` — session lifetime
- `CORS_ORIGINS` — allowed frontend origins

## Notes
- Do not store secrets in source code.
- Use secure file storage for uploads in cloud environments.
- Migrate `migrations/0001_initial_schema.sql` to a production migration tool such as Alembic.
