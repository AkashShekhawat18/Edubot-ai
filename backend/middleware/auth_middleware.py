from functools import wraps
from flask import request, current_app

from backend.utils.errors import AuthenticationError, AuthorizationError


def require_auth(required_role: str | None = None):
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            auth_header = request.headers.get("Authorization", "")
            scheme, _, token = auth_header.partition(" ")

            if scheme.lower() != "bearer" or not token:
                raise AuthenticationError("Authorization header is required")

            auth_service = current_app.auth_service
            user = auth_service.verify_token(token)
            if user is None:
                raise AuthenticationError("Invalid or expired token")

            if required_role and user.get("role") != required_role:
                raise AuthorizationError("User role is not authorized for this resource")

            request.user = user
            return fn(*args, **kwargs)

        return wrapper

    return decorator
