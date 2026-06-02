# Backend Architecture

## Overview
EduBot backend is designed as a central orchestration layer with clear ownership over:
- API contracts
- Authentication and authorization
- Validation and sanitization
- Database access and repository pattern
- Business logic orchestration
- Logging and observability
- Security boundaries

## Folder responsibilities
- `api/`: Flask route definitions and versioned API blueprint registration.
- `services/`: Business use cases, orchestration, and domain workflows.
- `repositories/`: Persistence layer and database access abstractions.
- `models/`: Domain models and typed entities (placeholder for future domain-driven work).
- `schemas/`: Request and response contracts expressed as Pydantic models.
- `middleware/`: Cross-cutting concerns such as error handling, logging, and auth guards.
- `config/`: Environment configuration, feature flags, and runtime settings.
- `utils/`: Shared helpers for response formatting, security, and application errors.
- `integrations/`: External service adapters for AI providers and future third-party systems.
- `docs/`: Backend docs, API contracts, and integration guides.
- `tests/`: Backend test coverage and contract validation.
- `migrations/`: SQL migration scripts for schema evolution.
