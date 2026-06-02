from backend.repositories.db import get_connection
from backend.utils.errors import DatabaseError


class BookRepository:
    def insert(self, filename: str) -> dict:
        try:
            conn = get_connection()
            cursor = conn.execute(
                "INSERT INTO books (filename, upload_date) VALUES (?, strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))",
                (filename,),
            )
            conn.commit()
            book_id = cursor.lastrowid
            row = conn.execute(
                "SELECT id, filename, upload_date FROM books WHERE id = ?",
                (book_id,),
            ).fetchone()
            conn.close()
            return dict(row) if row else {"id": book_id, "filename": filename}
        except Exception as exc:
            raise DatabaseError(str(exc)) from exc

    def list_all(self) -> list[dict]:
        try:
            conn = get_connection()
            rows = conn.execute(
                "SELECT id, filename, upload_date FROM books ORDER BY id DESC"
            ).fetchall()
            conn.close()
            return [dict(row) for row in rows]
        except Exception as exc:
            raise DatabaseError(str(exc)) from exc
