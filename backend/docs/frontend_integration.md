# Frontend Integration Guide

## Contract boundaries
The frontend team integrates only with the HTTP API surface under `/api/v1`.
No frontend logic may be coupled to backend internals such as database schemas, AI models, or service orchestration.

## Important rules
- Use JSON request and response contracts exactly as documented in `api_documentation.md`.
- Do not rely on backend internal field names beyond documented contract fields.
- Attach the `Authorization: Bearer <token>` header once JWT support is enabled.
- Do not parse HTML or application-specific error pages; backend responses are always JSON.

## Recommended requests
- Login: `POST /api/v1/auth/login`
- Chat: `POST /api/v1/chat`
- Upload: `POST /api/v1/upload`
- Generate paper: `POST /api/v1/paper/generate`
- Health: `GET /api/v1/health`

## Example React fetch
```js
const response = await fetch("/api/v1/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ question: "What is a neuron?" }),
});
const payload = await response.json();
if (!payload.success) {
  throw new Error(payload.error.message);
}
```
