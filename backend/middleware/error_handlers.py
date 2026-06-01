from flask import jsonify
from pydantic import ValidationError as PydanticValidationError

from backend.utils.errors import AppError, ValidationError
from backend.utils.response import error_response


def register_error_handlers(app):
    @app.errorhandler(AppError)
    def handle_app_error(error):
        return error_response(error.code, error.message, error.status_code)

    @app.errorhandler(PydanticValidationError)
    def handle_validation_error(error):
        message = "; ".join(err["msg"] for err in error.errors())
        return error_response("VALIDATION_ERROR", message, 400)

    @app.errorhandler(400)
    def handle_bad_request(error):
        return error_response("BAD_REQUEST", "Malformed request", 400)

    @app.errorhandler(404)
    def handle_not_found(error):
        return error_response("NOT_FOUND", "Resource not found", 404)

    @app.errorhandler(500)
    def handle_internal_error(error):
        app.logger.exception("Unhandled exception")
        return error_response("INTERNAL_SERVER_ERROR", "Unexpected server error", 500)
