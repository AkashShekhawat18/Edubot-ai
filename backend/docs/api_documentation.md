# EduBot Backend API Documentation

**Base URL:** `http://localhost:5000`

All endpoints are versioned under `/api/v1`.

## Response contract

Success:

```json
{
  "success": true,
  "data": { ... }
}
```

Failure:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message"
  }
}
```

---

## 1. POST /api/v1/auth/login

Authenticate a user and return a bearer token.

### Request

Headers:
- `Content-Type: application/json`

Body:

```json
{ "username": "teacher1", "password": "password123" }
```

### Response

#### 200 — Success

```json
{
  "success": true,
  "data": {
    "user": {"id": 1, "username": "teacher1", "role": "teacher"},
    "token": "<auth-token>"
  }
}
```

#### 401 — Invalid credentials

```json
{
  "success": false,
  "error": {
    "code": "AUTHENTICATION_ERROR",
    "message": "Invalid username or password"
  }
}
```

---

## 2. POST /api/v1/chat

Send a tutoring question to the AI adapter.

### Request

Headers:
- `Content-Type: application/json`
- `Authorization: Bearer <token>` (future protected endpoint)

Body:

```json
{ "question": "Explain Newton's second law." }
```

### Response

#### 200 — Success

```json
{
  "success": true,
  "data": {
    "response": "This is a placeholder AI response. Replace the adapter with a production AI provider."
  }
}
```

#### 400 — Validation error

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "question: field required"
  }
}
```

---

## 3. POST /api/v1/upload

Upload a PDF for later ingestion and metadata recording.

### Request

Headers:
- `Content-Type: multipart/form-data`

Body:
- `file` — PDF file payload

### Response

#### 201 — Accepted

```json
{
  "success": true,
  "data": {
    "status": "accepted",
    "book": {
      "id": 1,
      "filename": "sample.pdf",
      "upload_date": "2026-06-01T12:00:00Z"
    }
  }
}
```

#### 400 — Invalid file

```json
{
  "success": false,
  "error": {
    "code": "UPLOAD_ERROR",
    "message": "Only PDF uploads are allowed"
  }
}
```

---

## 4. POST /api/v1/paper/generate

Generate a question paper through the AI integration layer.

### Request

Headers:
- `Content-Type: application/json`

Body:

```json
{ "topic": "Cell Biology", "num_questions": 5 }
```

### Response

#### 200 — Success

```json
{
  "success": true,
  "data": {
    "paper": {
      "topic": "Cell Biology",
      "num_questions": 5,
      "paper": [ ... ]
    }
  }
}
```

---

## 5. GET /api/v1/health

Healthcheck endpoint for monitoring.

### Response

```json
{
  "success": true,
  "data": {
    "status": "ok",
    "version": null
  }
}
```

## 4. POST /generate-paper

Generate a question paper on a given topic.

### Headers

| Header | Value |
|---|---|
| Content-Type | application/json |

### Request Body

| Field | Type | Required | Description |
|---|---|---|---|
| topic | string | Yes | The subject/topic for the paper |
| num_questions | integer | Yes | Number of questions (must be > 0) |

### Responses

#### 200 — Success

```json
{
    "status": "success",
    "paper": {
        "topic": "Thermodynamics",
        "questions": [
            "Define the first law of thermodynamics.",
            "Explain entropy with an example."
        ]
    }
}
```

#### 400 — Missing Fields

```json
{
    "status": "error",
    "message": "Missing required fields: topic, num_questions"
}
```

#### 400 — Invalid num_questions

```json
{
    "status": "error",
    "message": "num_questions must be a valid integer"
}
```

#### 400 — num_questions <= 0

```json
{
    "status": "error",
    "message": "num_questions must be greater than 0"
}
```

#### 500 — Service Unavailable

```json
{
    "status": "error",
    "message": "Question generation service unavailable"
}
```

### Example Request

```bash
curl -X POST http://localhost:5000/generate-paper \
  -H "Content-Type: application/json" \
  -d '{"topic": "Thermodynamics", "num_questions": 5}'
```

---

## Status Code Summary

| Code | Meaning |
|---|---|
| 200 | Success |
| 201 | Resource created (upload) |
| 400 | Bad request / validation error |
| 401 | Authentication failed |
| 404 | Route not found |
| 405 | Method not allowed |
| 413 | Payload too large |
| 500 | Internal server error |

---

## Default Test Accounts

| Username | Password | Role |
|---|---|---|
| teacher1 | password123 | teacher |
| student1 | password123 | student |
