import os
from pathlib import Path

from werkzeug.utils import secure_filename

from backend.utils.errors import UploadError
from backend.repositories.book_repository import BookRepository
from backend.integrations.ai.base import AIService
from backend.config.settings import Settings


class UploadService:
    def __init__(self, book_repository: BookRepository, ai_service: AIService, settings: Settings):
        self.book_repository = book_repository
        self.ai_service = ai_service
        self.settings = settings

    def upload_pdf(self, file_storage) -> dict:
        if file_storage is None:
            raise UploadError("PDF file is required")

        filename = file_storage.filename or ""
        safe_filename = secure_filename(filename)
        if not safe_filename:
            raise UploadError("Invalid filename")

        if not self._has_allowed_extension(safe_filename):
            raise UploadError("Only PDF uploads are allowed")

        upload_folder = Path(self.settings.UPLOAD_FOLDER)
        upload_folder.mkdir(parents=True, exist_ok=True)
        destination = upload_folder / safe_filename
        file_storage.save(destination)

        record = self.book_repository.insert(safe_filename)
        try:
            self.ai_service.process_pdf(str(destination))
        except Exception:
            # The upload is successful even if asynchronous processing is unavailable.
            pass

        return {
            "status": "accepted",
            "book": record,
        }

    def _has_allowed_extension(self, filename: str) -> bool:
        return "." in filename and filename.rsplit(".", 1)[1].lower() in self.settings.ALLOWED_EXTENSIONS
