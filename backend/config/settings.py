import os
from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class Settings:
    ENV: str = os.getenv("FLASK_ENV", "production")
    SECRET_KEY: str = os.getenv("SECRET_KEY", "")
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///edubot.db")
    UPLOAD_FOLDER: str = os.getenv("UPLOAD_FOLDER", "uploads")
    MAX_CONTENT_LENGTH: int = int(os.getenv("MAX_CONTENT_LENGTH", 16 * 1024 * 1024))
    ALLOWED_EXTENSIONS: tuple[str, ...] = ("pdf",)
    CORS_ORIGINS: tuple[str, ...] = tuple(x.strip() for x in os.getenv("CORS_ORIGINS", "*").split(",") if x.strip())
    AI_PROVIDER: str = os.getenv("AI_PROVIDER", "null")
    TOKEN_EXPIRATION_SECONDS: int = int(os.getenv("TOKEN_EXPIRATION_SECONDS", 3600))
    API_PREFIX: str = "/api/v1"

    def sqlite_path(self) -> Path:
        if self.DATABASE_URL.startswith("sqlite:///"):
            raw_path = self.DATABASE_URL[10:]
            if raw_path.startswith("/") and len(raw_path) >= 3 and raw_path[2] == ":":
                raw_path = raw_path[1:]
            return Path(raw_path)
        return Path("edubot.db")
