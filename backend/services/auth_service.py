from itsdangerous import BadSignature, SignatureExpired, URLSafeTimedSerializer
from werkzeug.security import check_password_hash

from backend.config.settings import Settings
from backend.repositories.user_repository import UserRepository
from backend.utils.errors import AuthenticationError, DatabaseError


class AuthService:
    def __init__(self, user_repository: UserRepository, settings: Settings):
        self.user_repository = user_repository
        self.settings = settings
        self.serializer = URLSafeTimedSerializer(self.settings.SECRET_KEY or "dev-secret", salt="auth-token")

    def login(self, username: str, password: str) -> dict:
        user_record = self.user_repository.get_by_username(username)
        if user_record is None:
            raise AuthenticationError("Invalid username or password")

        if not check_password_hash(user_record["password"], password):
            raise AuthenticationError("Invalid username or password")

        token = self._create_token({"id": user_record["id"], "username": user_record["username"], "role": user_record["role"]})
        return {
            "user": {
                "id": user_record["id"],
                "username": user_record["username"],
                "role": user_record["role"],
            },
            "token": token,
        }

    def verify_token(self, token: str) -> dict | None:
        try:
            payload = self.serializer.loads(token, max_age=self.settings.TOKEN_EXPIRATION_SECONDS)
            return payload
        except SignatureExpired:
            raise AuthenticationError("Session expired")
        except BadSignature:
            raise AuthenticationError("Invalid session token")

    def _create_token(self, payload: dict) -> str:
        try:
            return self.serializer.dumps(payload)
        except Exception as exc:
            raise AuthenticationError("Unable to create authentication token") from exc
