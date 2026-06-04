from flask import Blueprint, current_app, request

from backend.schemas.auth import LoginRequest
from backend.schemas.chat import ChatRequest
from backend.schemas.paper import PaperRequest
from backend.schemas.health import HealthResponse
from backend.utils.response import success_response
from backend.utils.errors import ValidationError as AppValidationError

api_v1 = Blueprint("api_v1", __name__)


@api_v1.route("/auth/login", methods=["POST"])
def login():
    payload = request.get_json(silent=True)
    if payload is None:
        raise AppValidationError("Request body must be valid JSON")

    login_data = LoginRequest(**payload)
    result = current_app.auth_service.login(login_data.username, login_data.password)
    return success_response({"user": result["user"], "token": result["token"]})


@api_v1.route("/chat", methods=["POST"])
def chat():
    payload = request.get_json(silent=True)

    print("TYPE =", type(payload))
    print("PAYLOAD =", payload)

    if payload is None:
        raise AppValidationError("Request body must be valid JSON")

    chat_data = ChatRequest(**payload)
    response = current_app.chat_service.ask_question(chat_data.question)

    return success_response({"response": response})

@api_v1.route("/upload", methods=["POST"])
def upload():
    file_storage = request.files.get("file")
    result = current_app.upload_service.upload_pdf(file_storage)
    return success_response(result, 201)


@api_v1.route("/paper/generate", methods=["POST"])
def generate_paper():
    payload = request.get_json(silent=True)
    if payload is None:
        raise AppValidationError("Request body must be valid JSON")

    paper_data = PaperRequest(**payload)
    result = current_app.paper_service.generate(paper_data.topic, paper_data.num_questions)
    return success_response({"paper": result})


@api_v1.route("/health", methods=["GET"])
def health():
    health_payload = HealthResponse(status="ok", version=None)
    return success_response(health_payload.model_dump())
