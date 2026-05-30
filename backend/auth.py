"""
auth.py — Authentication helpers for the EduBot backend.

Provides a single function `authenticate` that validates credentials
against the database and returns a result tuple.
"""

from werkzeug.security import check_password_hash

from database import get_user_by_username


def authenticate(username, password):
    """
    Validate a username/password pair.

    Args:
        username (str): The username to look up.
        password (str): The plain-text password to verify.

    Returns:
        tuple: (success: bool, payload: dict | str)
            On success -> (True,  {id, username, role})
            On failure -> (False, "error message")
    """
    user = get_user_by_username(username)

    if user is None:
        return False, "Invalid credentials"

    if not check_password_hash(user["password"], password):
        return False, "Invalid credentials"

    # Strip the hashed password before returning user info
    return True, {
        "id": user["id"],
        "username": user["username"],
        "role": user["role"],
    }
