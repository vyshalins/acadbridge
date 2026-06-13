# AcadBridge

AcadBridge is an academic-to-career intelligence platform that helps students map semesters to skills, evaluate role fit, build career roadmaps, and generate ATS-friendly resumes.

## Features

- **Semester Mapping** — Analyze syllabus content and map courses to relevant skills
- **Role Fit** — Score how well your profile matches target job roles
- **Career Roadmap** — Get an AI-generated learning path toward your goals
- **ATS Resume** — Generate and download an ATS-optimized resume as PDF

## Project Structure

```
acadbridge/
├── src/              # React frontend (Vite + TypeScript)
├── backend/          # FastAPI backend
│   ├── app/
│   │   ├── routes/   # API endpoints
│   │   ├── services/ # Business logic
│   │   └── core/     # Groq AI client
│   └── requirements.txt
└── package.json
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Python](https://www.python.org/) (v3.10+)
- A [Groq API key](https://console.groq.com/)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/vyshalins/acadbridge.git
cd acadbridge
```

### 2. Frontend setup

```bash
npm install
npm run dev
```

The frontend runs at **http://localhost:8080**.

### 3. Backend setup

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate

pip install -r requirements.txt
cp .env.example .env
```

Edit `backend/.env` and add your Groq API key:

```
GROQ_API_KEY=your_groq_api_key_here
```

Start the API server:

```bash
python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

The API runs at **http://localhost:8000**. Interactive docs are at **http://localhost:8000/docs**.

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `POST /api/semester/analyze` | Analyze semester syllabus and map skills |
| `POST /api/role-fit/evaluate` | Evaluate fit for a target role |
| `POST /api/roadmap/generate` | Generate a personalized career roadmap |
| `POST /api/resume/generate` | Generate an ATS resume PDF |

## Tech Stack

**Frontend:** React, TypeScript, Vite, Tailwind CSS, shadcn/ui, React Query

**Backend:** FastAPI, Python, Groq AI, Pydantic

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start frontend dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests |

## License

MIT
