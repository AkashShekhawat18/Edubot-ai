"""
app.py — Flask application for the EduBot backend.

Endpoints:
    POST /login           — Authenticate a user
    POST /upload          — Upload a PDF book
    POST /chat            — Send a question to the chatbot
    POST /generate-paper  — Generate a question paper

External modules (not implemented here):
    chatbot.py, pdf_handler.py, vector_store.py, question_generator.py
"""

import os

from dotenv import load_dotenv
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename

from database import init_db, insert_book
from auth import authenticate

# ---------------------------------------------------------------------------
# Load environment variables
# ---------------------------------------------------------------------------

load_dotenv()

# ---------------------------------------------------------------------------
# Flask app configuration
# ---------------------------------------------------------------------------

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY", "dev-fallback-key")
app.config["UPLOAD_FOLDER"] = os.getenv("UPLOAD_FOLDER", "uploads")
app.config["MAX_CONTENT_LENGTH"] = 16 * 1024 * 1024  # 16 MB

ALLOWED_EXTENSIONS = {"pdf"}

# Ensure upload directory exists
os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def allowed_file(filename):
    """Return True if the file has a permitted extension."""
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def error_response(message, status_code):
    """Return a standardised JSON error response."""
    return jsonify({"status": "error", "message": message}), status_code


def success_response(payload, status_code=200):
    """Return a standardised JSON success response."""
    body = {"status": "success"}
    body.update(payload)
    return jsonify(body), status_code


# ---------------------------------------------------------------------------
# External module imports (graceful — they may not be present yet)
# ---------------------------------------------------------------------------

try:
    from chatbot import get_response as chatbot_get_response
except ImportError:
    chatbot_get_response = None

try:
    from pdf_handler import process_pdf as pdf_handler_process_pdf
except ImportError:
    pdf_handler_process_pdf = None

try:
    from question_generator import generate as qg_generate
except ImportError:
    qg_generate = None


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------

# ---- POST /login ----------------------------------------------------------

@app.route("/login", methods=["POST"])
def login():
    """Authenticate a user with username and password."""

    # Ensure request body is JSON
    data = request.get_json(silent=True)
    if data is None:
        return error_response("Request body must be valid JSON", 400)

    username = data.get("username")
    password = data.get("password")

    # Validate required fields
    missing = []
    if not username:
        missing.append("username")
    if not password:
        missing.append("password")
    if missing:
        return error_response(
            f"Missing required fields: {', '.join(missing)}", 400
        )

    # Authenticate
    success, result = authenticate(username, password)
    if not success:
        return error_response(result, 401)

    return success_response({
        "message": "Login successful",
        "user": result,
    })


# ---- POST /upload ---------------------------------------------------------

@app.route("/upload", methods=["POST"])
def upload():
    """Receive a PDF file, save it, store metadata, and invoke pdf_handler."""

    # Check that a file part exists in the request
    if "file" not in request.files:
        return error_response("No file provided", 400)

    file = request.files["file"]

    # Check for empty filename (browser submitted an empty form)
    if file.filename == "" or file.filename is None:
        return error_response("No file selected", 400)

    # Validate extension
    if not allowed_file(file.filename):
        return error_response("Only PDF files are allowed", 400)

    # Save file
    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    file.save(filepath)

    # Store metadata in database
    book = insert_book(filename)

    # Invoke external PDF processing module (if available)
    if pdf_handler_process_pdf is not None:
        try:
            pdf_handler_process_pdf(filepath)
        except Exception as e:
            # Log but do not fail the upload — the file is already saved
            app.logger.error("pdf_handler.process_pdf failed: %s", e)

    return success_response({
        "message": "File uploaded successfully",
        "book": book,
    }, 201)


# ---- POST /chat -----------------------------------------------------------

@app.route("/chat", methods=["POST"])
def chat():
    """Forward a question to the chatbot and return its response."""

    data = request.get_json(silent=True)
    if data is None:
        return error_response("Request body must be valid JSON", 400)

    question = data.get("question")
    if not question or not str(question).strip():
        return error_response("Missing required field: question", 400)

    # Check that the chatbot module is available
    if chatbot_get_response is None:
        return error_response("Chatbot service unavailable", 500)

    try:
        answer = chatbot_get_response(question)
    except Exception as e:
        app.logger.error("chatbot.get_response failed: %s", e)
        return error_response("Chatbot service unavailable", 500)

    return success_response({"response": answer})


# ---- POST /generate-paper -------------------------------------------------

@app.route("/generate-paper", methods=["POST"])
def generate_paper():
    """Generate a question paper by invoking question_generator."""

    data = request.get_json(silent=True)
    if data is None:
        return error_response("Request body must be valid JSON", 400)

    topic = data.get("topic")
    num_questions = data.get("num_questions")

    # Validate required fields
    missing = []
    if not topic:
        missing.append("topic")
    if num_questions is None:
        missing.append("num_questions")
    if missing:
        return error_response(
            f"Missing required fields: {', '.join(missing)}", 400
        )

    # Validate num_questions is a positive integer
    try:
        num_questions = int(num_questions)
    except (TypeError, ValueError):
        return error_response("num_questions must be a valid integer", 400)

    if num_questions <= 0:
        return error_response("num_questions must be greater than 0", 400)

    # Check that the question generator module is available
    if qg_generate is None:
        return error_response("Question generation service unavailable", 500)

    try:
        paper = qg_generate(topic, num_questions)
    except Exception as e:
        app.logger.error("question_generator.generate failed: %s", e)
        return error_response("Question generation service unavailable", 500)

    return success_response({"paper": paper})


# ---------------------------------------------------------------------------
# Global error handlers
# ---------------------------------------------------------------------------

@app.errorhandler(400)
def bad_request(e):
    return error_response("Bad request", 400)


@app.errorhandler(404)
def not_found(e):
    return error_response("Resource not found", 404)


@app.errorhandler(405)
def method_not_allowed(e):
    return error_response("Method not allowed", 405)


@app.errorhandler(413)
def payload_too_large(e):
    return error_response("File too large. Maximum size is 16 MB", 413)


@app.errorhandler(500)
def internal_server_error(e):
    return error_response("Internal server error", 500)


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    init_db()
    app.run(debug=True, host="0.0.0.0", port=5000)
