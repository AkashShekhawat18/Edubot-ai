"""
database.py — SQLite database initialization, connection handling, and CRUD helpers.

Tables:
    - users: id, username, password (hashed), role (teacher|student)
    - books: id, filename, upload_date (ISO 8601)
"""

import os
import sqlite3
from datetime import datetime, timezone

from werkzeug.security import generate_password_hash

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

DATABASE_PATH = os.getenv("DATABASE_PATH", "edubot.db")


# ---------------------------------------------------------------------------
# Connection helper
# ---------------------------------------------------------------------------

def get_db():
    """
    Open a new SQLite connection with row-factory enabled so that rows
    behave like dictionaries.
    """
    conn = sqlite3.connect(DATABASE_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    return conn


# ---------------------------------------------------------------------------
# Schema initialisation
# ---------------------------------------------------------------------------

def init_db():
    """
    Create tables if they do not exist and seed default accounts.
    Called once when the application starts.
    """
    conn = get_db()
    cursor = conn.cursor()

    # --- users table ---
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id       INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT    UNIQUE NOT NULL,
            password TEXT    NOT NULL,
            role     TEXT    NOT NULL CHECK(role IN ('teacher', 'student'))
        )
    """)

    # --- books table ---
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS books (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            filename    TEXT    NOT NULL,
            upload_date TEXT    NOT NULL
        )
    """)

    conn.commit()

    # Seed default accounts (only if the table is empty)
    if cursor.execute("SELECT COUNT(*) FROM users").fetchone()[0] == 0:
        _seed_default_accounts(conn)

    conn.close()


def _seed_default_accounts(conn):
    """Insert default teacher and student accounts for development/testing."""
    defaults = [
        ("teacher1", generate_password_hash("password123"), "teacher"),
        ("student1", generate_password_hash("password123"), "student"),
    ]
    conn.executemany(
        "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
        defaults,
    )
    conn.commit()


# ---------------------------------------------------------------------------
# User CRUD
# ---------------------------------------------------------------------------

def get_user_by_username(username):
    """
    Retrieve a single user row by username.

    Returns:
        dict with keys {id, username, password, role} or None.
    """
    conn = get_db()
    row = conn.execute(
        "SELECT id, username, password, role FROM users WHERE username = ?",
        (username,),
    ).fetchone()
    conn.close()

    if row is None:
        return None
    return dict(row)


# ---------------------------------------------------------------------------
# Book CRUD
# ---------------------------------------------------------------------------

def insert_book(filename):
    """
    Insert a new book record with the current UTC timestamp.

    Returns:
        dict with keys {id, filename, upload_date}.
    """
    upload_date = datetime.now(timezone.utc).isoformat()
    conn = get_db()
    cursor = conn.execute(
        "INSERT INTO books (filename, upload_date) VALUES (?, ?)",
        (filename, upload_date),
    )
    conn.commit()
    book_id = cursor.lastrowid
    conn.close()

    return {
        "id": book_id,
        "filename": filename,
        "upload_date": upload_date,
    }


def get_all_books():
    """
    Return a list of all book records as dicts.
    """
    conn = get_db()
    rows = conn.execute(
        "SELECT id, filename, upload_date FROM books ORDER BY id DESC"
    ).fetchall()
    conn.close()
    return [dict(r) for r in rows]
