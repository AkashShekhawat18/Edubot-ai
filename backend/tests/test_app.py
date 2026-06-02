import os
import tempfile

import pytest
from backend.app import create_app


@pytest.fixture(autouse=True)
def set_test_database(monkeypatch, tmp_path):
    db_file = tmp_path / "edubot_test.db"
    monkeypatch.setenv("DATABASE_URL", f"sqlite:///{db_file.as_posix()}")
    return db_file


@pytest.fixture
def app():
    return create_app()


def test_health_endpoint(app):
    client = app.test_client()
    response = client.get("/api/v1/health")

    assert response.status_code == 200
    assert response.json["success"] is True
    assert response.json["data"]["status"] == "ok"


def test_login_endpoint(app):
    client = app.test_client()
    response = client.post(
        "/api/v1/auth/login",
        json={"username": "teacher1", "password": "password123"},
    )

    assert response.status_code == 200
    assert response.json["success"] is True
    assert response.json["data"]["user"]["username"] == "teacher1"
    assert "token" in response.json["data"]
