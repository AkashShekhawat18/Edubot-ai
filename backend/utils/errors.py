class AppError(Exception):
    def __init__(self, code: str, message: str, status_code: int = 400):
        super().__init__(message)
        self.code = code
        self.message = message
        self.status_code = status_code


class ValidationError(AppError):
    def __init__(self, message: str):
        super().__init__("VALIDATION_ERROR", message, 400)


class AuthenticationError(AppError):
    def __init__(self, message: str = "Authentication failed"):
        super().__init__("AUTHENTICATION_ERROR", message, 401)


class AuthorizationError(AppError):
    def __init__(self, message: str = "Access denied"):
        super().__init__("AUTHORIZATION_ERROR", message, 403)


class DatabaseError(AppError):
    def __init__(self, message: str = "Database failure"):
        super().__init__("DATABASE_ERROR", message, 500)


class AIServiceError(AppError):
    def __init__(self, message: str = "AI service failed"):
        super().__init__("AI_SERVICE_ERROR", message, 502)


class UploadError(AppError):
    def __init__(self, message: str = "Upload failed"):
        super().__init__("UPLOAD_ERROR", message, 400)
