from flask import request, current_app


def register_request_logger(app):
    @app.before_request
    def log_incoming_request():
        current_app.logger.info(
            "Request start: %s %s from %s",
            request.method,
            request.path,
            request.remote_addr,
        )

    @app.after_request
    def log_outgoing_response(response):
        current_app.logger.info(
            "Response completed: %s %s %s",
            request.method,
            request.path,
            response.status,
        )
        return response
