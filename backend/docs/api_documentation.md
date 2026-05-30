# EduBot API Documentation

**Base URL:** `http://localhost:5000`

All responses use a consistent JSON envelope:

```json
{
    "status": "success" | "error",
    "message": "...",
    ...additional fields
}
```

---

## 1. POST /login

Authenticate a user and retrieve their profile.

### Headers

| Header | Value |
|---|---|
| Content-Type | application/json |

### Request Body

| Field | Type | Required | Description |
|---|---|---|---|
| username | string | Yes | The user's username |
| password | string | Yes | The user's password |

### Responses

#### 200 — Success

```json
{
    "status": "success",
    "message": "Login successful",
    "user": {
        "id": 1,
        "username": "teacher1",
        "role": "teacher"
    }
}
```

#### 400 — Missing Fields

```json
{
    "status": "error",
    "message": "Missing required fields: username, password"
}
```

#### 401 — Invalid Credentials

```json
{
    "status": "error",
    "message": "Invalid credentials"
}
```

### Example Request

```bash
curl -X POST http://localhost:5000/login \
  -H "Content-Type: application/json" \
  -d '{"username": "teacher1", "password": "password123"}'
```

---

## 2. POST /upload

Upload a PDF file and store its metadata.

### Headers

| Header | Value |
|---|---|
| Content-Type | multipart/form-data |

### Request Body (form-data)

| Field | Type | Required | Description |
|---|---|---|---|
| file | file | Yes | A PDF file (max 16 MB) |

### Responses

#### 201 — Success

```json
{
    "status": "success",
    "message": "File uploaded successfully",
    "book": {
        "id": 1,
        "filename": "physics_chapter1.pdf",
        "upload_date": "2026-05-29T17:00:00+00:00"
    }
}
```

#### 400 — No File Provided

```json
{
    "status": "error",
    "message": "No file provided"
}
```

#### 400 — Invalid File Type

```json
{
    "status": "error",
    "message": "Only PDF files are allowed"
}
```

#### 413 — File Too Large

```json
{
    "status": "error",
    "message": "File too large. Maximum size is 16 MB"
}
```

### Example Request

```bash
curl -X POST http://localhost:5000/upload \
  -F "file=@/path/to/document.pdf"
```

---

## 3. POST /chat

Send a question to the chatbot and receive a response.

### Headers

| Header | Value |
|---|---|
| Content-Type | application/json |

### Request Body

| Field | Type | Required | Description |
|---|---|---|---|
| question | string | Yes | The question to ask the chatbot |

### Responses

#### 200 — Success

```json
{
    "status": "success",
    "response": "The answer to your question is..."
}
```

#### 400 — Missing Field

```json
{
    "status": "error",
    "message": "Missing required field: question"
}
```

#### 500 — Service Unavailable

```json
{
    "status": "error",
    "message": "Chatbot service unavailable"
}
```

### Example Request

```bash
curl -X POST http://localhost:5000/chat \
  -H "Content-Type: application/json" \
  -d '{"question": "What is Newton'\''s second law?"}'
```

---

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
