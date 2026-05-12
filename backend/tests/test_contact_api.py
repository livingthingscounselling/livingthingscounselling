"""Backend tests for Living Things Counselling contact form API."""
import os
import pytest
import requests
from pymongo import MongoClient

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://social-work-care.preview.emergentagent.com').rstrip('/')
API = f"{BASE_URL}/api"

# Mongo direct check
MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
DB_NAME = os.environ.get('DB_NAME', 'test_database')


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture(scope="module")
def mongo_db():
    c = MongoClient(MONGO_URL, serverSelectionTimeoutMS=3000)
    return c[DB_NAME]


# ---------- Health / regression ----------
class TestRegression:
    def test_root_hello_world(self, session):
        r = session.get(f"{API}/")
        assert r.status_code == 200
        assert r.json() == {"message": "Hello World"}

    def test_status_post_get(self, session):
        r = session.post(f"{API}/status", json={"client_name": "TEST_regression"})
        assert r.status_code == 200
        data = r.json()
        assert data["client_name"] == "TEST_regression"
        assert "id" in data and "timestamp" in data

        r2 = session.get(f"{API}/status")
        assert r2.status_code == 200
        assert isinstance(r2.json(), list)


# ---------- Contact: happy path ----------
class TestContactHappy:
    created_id = None

    def test_post_contact_valid(self, session, mongo_db):
        payload = {
            "name": "TEST_Jane Doe",
            "email": "test_jane@example.com",
            "message": "Hello, I would like to book a session."
        }
        r = session.post(f"{API}/contact", json=payload)
        assert r.status_code == 201, r.text
        data = r.json()
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["message"] == payload["message"]
        assert "id" in data and isinstance(data["id"], str) and len(data["id"]) > 0
        assert "timestamp" in data
        assert data["email_sent"] is False
        assert data["email_error"] is None
        TestContactHappy.created_id = data["id"]

        # Verify persistence in MongoDB
        doc = mongo_db.contact_submissions.find_one({"id": data["id"]})
        assert doc is not None
        assert doc["email"] == payload["email"]

    def test_get_contact_lists_and_sorted_desc_no_objectid(self, session):
        r = session.get(f"{API}/contact")
        assert r.status_code == 200
        items = r.json()
        assert isinstance(items, list)
        assert len(items) >= 1
        # No _id should leak
        for it in items:
            assert "_id" not in it
            assert "id" in it
            assert "timestamp" in it
        # sort desc by timestamp
        if len(items) >= 2:
            assert items[0]["timestamp"] >= items[1]["timestamp"]
        # Our created id should be in the list
        ids = [it["id"] for it in items]
        assert TestContactHappy.created_id in ids


# ---------- Contact: validation ----------
class TestContactValidation:
    def test_invalid_email(self, session):
        r = session.post(f"{API}/contact", json={
            "name": "Bad", "email": "not-an-email", "message": "hi"
        })
        assert r.status_code == 422

    def test_empty_name(self, session):
        r = session.post(f"{API}/contact", json={
            "name": "", "email": "ok@example.com", "message": "hello"
        })
        assert r.status_code == 422

    def test_missing_fields(self, session):
        r = session.post(f"{API}/contact", json={"email": "ok@example.com"})
        assert r.status_code == 422

    def test_message_too_long(self, session):
        r = session.post(f"{API}/contact", json={
            "name": "Long", "email": "ok@example.com", "message": "x" * 5001
        })
        assert r.status_code == 422

    def test_empty_message(self, session):
        r = session.post(f"{API}/contact", json={
            "name": "Long", "email": "ok@example.com", "message": ""
        })
        assert r.status_code == 422
