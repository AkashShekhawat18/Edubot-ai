from werkzeug.security import generate_password_hash

from backend.repositories.db import get_connection
from backend.utils.errors import DatabaseError


class UserRepository:
    def get_by_username(self, username: str) -> dict | None:
        try:
            conn = get_connection()
            cursor = conn.execute(
                "SELECT id, username, password, role FROM users WHERE username = ?",
                (username,),
            )
            row = cursor.fetchone()
            conn.close()
            return dict(row) if row else None
        except Exception as exc:
            raise DatabaseError(str(exc)) from exc

    def get_by_id(self, user_id: int) -> dict | None:
        try:
            conn = get_connection()
            cursor = conn.execute(
                "SELECT id, username, role FROM users WHERE id = ?",
                (user_id,),
            )
            row = cursor.fetchone()
            conn.close()
            return dict(row) if row else None
        except Exception as exc:
            raise DatabaseError(str(exc)) from exc

    def seed_default_accounts(self):
        try:
            conn = get_connection()
            cursor = conn.execute("SELECT COUNT(*) FROM users")
            if cursor.fetchone()[0] == 0:
                defaults = [
                    ("teacher1", generate_password_hash("password123"), "teacher"),
                    ("student1", generate_password_hash("password123"), "student"),
                ]
                conn.executemany(
                    "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
                    defaults,
                )
                conn.commit()
            conn.close()
        except Exception as exc:
            raise DatabaseError(str(exc)) from exc
