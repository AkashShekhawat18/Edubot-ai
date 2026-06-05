# CampusMind Node Backend (minimal)

This folder contains a minimal Express + MongoDB backend scaffold with a health endpoint and authentication (login) endpoint. It is intended as a migration target from the existing Flask backend and a starting point for expanding the API.

Quick start:

1. Copy `.env.example` to `.env` and update `MONGO_URI` if needed.
2. Install dependencies:

```bash
cd backend_node
npm install
```

3. Seed default users (teacher1 / student1):

```bash
node seed.js
```

4. Start server:

```bash
npm run dev
```

Server will run on `http://localhost:4000` by default.
