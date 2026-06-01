# Local Development Guide

## Setup
1. Create a Python virtual environment:
   ```bash
   python -m venv .venv
   .venv\Scripts\activate
   ```
2. Install dependencies:
   ```bash
   pip install -r backend/requirements.txt
   ```
3. Create environment variables:
   - Copy `backend/.env.example` to `backend/.env`
   - Set `SECRET_KEY`, `DATABASE_URL`, and optionally `AI_PROVIDER`.

## Running locally
From the workspace root:
```bash
cd backend
python app.py
```
The app will be available at `http://localhost:5000`.

## Default development data
The application seeds default credentials on first startup:
- `teacher1` / `password123`
- `student1` / `password123`

## Test execution
From `backend`:
```bash
pytest
```
