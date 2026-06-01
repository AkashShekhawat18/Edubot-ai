from backend.integrations.ai.base import AIService
from backend.utils.errors import AIServiceError


class ChatService:
    def __init__(self, ai_service: AIService):
        self.ai_service = ai_service

    def ask_question(self, question: str) -> str:
        if not question or not question.strip():
            raise AIServiceError("Question text is required")
        return self.ai_service.ask_question(question)
