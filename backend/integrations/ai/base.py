from abc import ABC, abstractmethod


class AIService(ABC):
    @abstractmethod
    def ask_question(self, question: str, context: dict | None = None) -> str:
        raise NotImplementedError

    @abstractmethod
    def process_pdf(self, file_path: str) -> dict:
        raise NotImplementedError

    @abstractmethod
    def generate_question_paper(self, topic: str, num_questions: int) -> dict:
        raise NotImplementedError
