import json
from importlib.util import module_from_spec, spec_from_file_location
from pathlib import Path

from backend.integrations.ai.base import AIService
from backend.utils.errors import AIServiceError


class AIModuleService(AIService):
    def __init__(self):
        workspace_root = Path(__file__).resolve().parents[3]
        ai_root = workspace_root / "AI_Module" / "venv"

        self.chatbot = self._load_module("ai_module_chatbot", ai_root / "chatbot.py")
        self.pdf_handler = self._load_module("ai_module_pdf_handler", ai_root / "pdf_handler.py")
        self.vector_store = self._load_module("ai_module_vector_store", ai_root / "vector_store.py")

        if not hasattr(self.chatbot, "ask_gemini"):
            raise AIServiceError("AI module chatbot does not expose ask_gemini")

    def _load_module(self, name: str, path: Path):
        if not path.exists():
            raise AIServiceError(f"AI module file not found: {path}")

        module_dir = str(path.parent)
        spec = spec_from_file_location(name, str(path))
        if spec is None or spec.loader is None:
            raise AIServiceError(f"Unable to load AI module: {path}")

        module = module_from_spec(spec)
        import sys
        import ast

        sys.path.insert(0, module_dir)
        try:
            if path.name == "pdf_handler.py":
                source = path.read_text(encoding="utf-8")
                tree = ast.parse(source, filename=str(path))
                filtered = [node for node in tree.body if isinstance(node, (ast.Import, ast.ImportFrom, ast.FunctionDef, ast.AsyncFunctionDef, ast.ClassDef))]
                module_code = ast.Module(body=filtered, type_ignores=[])
                compiled = compile(module_code, filename=str(path), mode="exec")
                exec(compiled, module.__dict__)
            else:
                spec.loader.exec_module(module)
        finally:
            sys.path.remove(module_dir)

        return module

    def ask_question(self, question: str, context: dict | None = None) -> str:
        if not question or not question.strip():
            raise AIServiceError("Question text is required")

        prompt = question
        if context:
            prompt = f"{question}\n\nContext:\n{json.dumps(context)}"

        return self.chatbot.ask_gemini(prompt)

    def process_pdf(self, file_path: str) -> dict:
        try:
            text = self.pdf_handler.extract_text(file_path)
            chunks = self.pdf_handler.chunk_text(text)
            index, _embeddings = self.vector_store.create_vector_store(chunks)
            return {
                "status": "processed",
                "chunks": len(chunks),
                "index_shape": index.ntotal if hasattr(index, "ntotal") else None,
            }
        except Exception as exc:
            raise AIServiceError(f"AI module PDF processing failed: {exc}") from exc

    def generate_question_paper(self, topic: str, num_questions: int) -> dict:
        if not topic or not topic.strip():
            raise AIServiceError("Topic is required")
        if num_questions <= 0:
            raise AIServiceError("num_questions must be greater than 0")

        prompt = (
            f"Generate {num_questions} exam questions with answers for the topic '{topic}'. "
            "Return the result as plain text with each question followed by its answer."
        )

        paper_text = self.chatbot.ask_gemini(prompt)
        return {
            "topic": topic,
            "num_questions": num_questions,
            "content": paper_text,
        }
