import os
from pathlib import Path

from backend.integrations.ai.adapters import NullAIService
from backend.integrations.ai.ai_module_adapter import AIModuleService
from backend.integrations.ai.base import AIService


def _ai_module_available() -> bool:
    workspace_root = Path(__file__).resolve().parents[3]
    return (workspace_root / "AI_Module" / "venv" / "chatbot.py").exists()


def create_ai_service() -> AIService:
    provider = os.getenv("AI_PROVIDER", "auto").lower()

    if provider == "auto":
        if _ai_module_available():
            return AIModuleService()
        return NullAIService()

    if provider == "null":
        return NullAIService()

    if provider == "ai_module":
        return AIModuleService()

    raise RuntimeError(f"Unsupported AI provider configured: {provider}")
