import os

from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS

from backend.api.v1.routes import api_v1
from backend.config.settings import Settings
from backend.integrations.ai.factory import create_ai_service
from backend.middleware.error_handlers import register_error_handlers
from backend.middleware.request_logger import register_request_logger
from backend.repositories.book_repository import BookRepository
from backend.repositories.db import initialize_database
from backend.repositories.user_repository import UserRepository
from backend.services.auth_service import AuthService
from backend.services.chat_service import ChatService
from backend.services.math_service import MathService
from backend.services.paper_service import PaperService
from backend.services.upload_service import UploadService


def create_app() -> Flask:
    load_dotenv()
    settings = Settings()

    app = Flask(__name__)
    app.config["SECRET_KEY"] = settings.SECRET_KEY
    app.config["MAX_CONTENT_LENGTH"] = settings.MAX_CONTENT_LENGTH

    CORS(app, origins=list(settings.CORS_ORIGINS), supports_credentials=True)
    app.config["SETTINGS"] = settings

    initialize_database()

    user_repo = UserRepository()
    book_repo = BookRepository()
    ai_service = create_ai_service()

    user_repo.seed_default_accounts()

    app.auth_service = AuthService(user_repo, settings)
    app.chat_service = ChatService(ai_service)
    app.math_service = MathService(ai_service)
    app.paper_service = PaperService(ai_service)
    app.upload_service = UploadService(book_repo, ai_service, settings)

    register_error_handlers(app)
    register_request_logger(app)

    app.register_blueprint(api_v1, url_prefix=settings.API_PREFIX)

    return app


if __name__ == "__main__":
    app = create_app()
if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=5000, debug=True)