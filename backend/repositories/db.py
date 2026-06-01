import os
import sqlite3
from pathlib import Path

from backend.config.settings import Settings
from backend.utils.errors import DatabaseError

settings = Settings()


def get_connection():
    path = settings.sqlite_path()
    try:
        path.parent.mkdir(parents=True, exist_ok=True)
        connection = sqlite3.connect(path)
        connection.row_factory = sqlite3.Row
        connection.execute("PRAGMA foreign_keys = ON")
        return connection
    except sqlite3.Error as exc:
        raise DatabaseError(str(exc)) from exc


def initialize_database():
    schema_path = Path(__file__).resolve().parents[1] / "../migrations/0001_initial_schema.sql"
    schema_file = Path(schema_path).resolve()
    if not schema_file.exists():
        raise DatabaseError("Database migration script missing")

    conn = get_connection()
    with conn:
        conn.executescript(schema_file.read_text())
    conn.close()
