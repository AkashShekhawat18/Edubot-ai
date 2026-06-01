# AI Integration Guide

## Purpose
The backend exposes a strict AI adapter boundary inside `backend/integrations/ai`.
AI engineers can replace the underlying AI provider without changing routes or business logic.

## Adapter contract
Implement the `AIService` interface in `backend/integrations/ai/base.py`:
- `ask_question(question: str, context: dict | None = None) -> str`
- `process_pdf(file_path: str) -> dict`
- `generate_question_paper(topic: str, num_questions: int) -> dict`

## Adapter discovery
The backend loads the adapter using `create_ai_service()` in `backend/integrations/ai/factory.py`.
Set `AI_PROVIDER` in environment configuration when a real adapter is available.

## Implementation guidance
- Keep provider-specific logic inside `backend/integrations/ai/`.
- Avoid exposing provider details to business services or routes.
- Use the service layer to convert integration responses into backend-friendly payloads.

## Example flow
1. `POST /api/v1/chat` → route validates request and delegates to `ChatService`.
2. `ChatService` calls `AIService.ask_question()`.
3. The AI adapter executes model calls, embeddings, or vector retrieval.
4. Backend returns a normalized response envelope.
