from backend.integrations.ai.base import AIService
from backend.utils.errors import AIServiceError


class PaperService:
    def __init__(self, ai_service: AIService):
        self.ai_service = ai_service

    def generate(self, topic: str, num_questions: int) -> dict:
        if not topic or not topic.strip():
            raise AIServiceError("Topic is required")
        return self.ai_service.generate_question_paper(topic, num_questions)
