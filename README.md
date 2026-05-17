# SkillSync AI — Impact Platform

A full-stack placement preparation platform with LeetCode integration, AI resume parsing, and recruiter dashboards.

---

## 🏗️ Architecture Overview

| Service | Tech | Port | Purpose |
|---|---|---|---|
| **Frontend** | React + Vite | 5173 | UI / dashboard |
| **Express Backend** | Node.js + Express | **5000** | LeetCode API proxy |
| **FastAPI Backend** | Python + FastAPI | **8000** | AI resume parsing |

---

## 🚀 Getting Started (For All Team Members)

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- [Python](https://python.org/) 3.9+
- pip (comes with Python)

---

### Step 1 — Clone the Repository
```bash
git clone <your-repo-url>
cd impact
```

---

### Step 2 — Install Dependencies

**Frontend + Express backend (one command):**
```bash
npm run setup
```

**Python (FastAPI) backend:**
```bash
cd backend
pip install -r requirements.txt
cd ..
```

---

### Step 3 — Set Up Environment Variables
```bash
cp .env.example .env
```
The `.env.example` already has the correct Supabase keys. **No changes needed** unless you're running your own Supabase project.

---

### Step 4 — Run All Services

**Option A: Run everything at once (recommended)**
```bash
npm run dev:all
```
This starts all 3 services simultaneously with color-coded logs.

**Option B: Run each service separately (in 3 terminals)**

Terminal 1 — Frontend:
```bash
npm run dev
```

Terminal 2 — Express backend (LeetCode API):
```bash
cd server
npm install
npm run dev
```

Terminal 3 — FastAPI backend (AI / Resume):
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

---

## 🌐 Service URLs

| Service | URL |
|---|---|
| 🖥️ Frontend | http://localhost:5173 |
| ⚙️ Express (LeetCode API) | http://localhost:5000 |
| 🐍 FastAPI (AI Engine) | http://localhost:8000 |
| 📄 FastAPI Docs (Swagger) | http://localhost:8000/docs |

---

## 🗂️ Project Structure

```
impact/
├── src/                    # React + TypeScript frontend
│   └── hooks/
│       └── useLeetCode.ts  # Calls Express backend on :5000
├── server/                 # Node.js/Express backend
│   ├── index.js            # LeetCode API proxy → port 5000
│   └── package.json
├── backend/                # Python FastAPI backend
│   ├── main.py             # AI/resume endpoints → port 8000
│   ├── requirements.txt
│   └── resumeextractor.py
├── .env.example            # Environment variable template (safe to commit)
├── .env                    # Local secrets (DO NOT commit — gitignored)
└── package.json            # Root config with all npm scripts
```

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run setup` | Install frontend + Express dependencies |
| `npm run dev:all` | **Start all 3 services** (recommended) |
| `npm run dev` | Frontend only |
| `npm run dev:server` | Express backend only (port 5000) |
| `npm run dev:python` | FastAPI backend only (port 8000) |
| `npm run build` | Production build |

---

## 🔧 Troubleshooting

### "Server unreachable. Is the backend running?"
Both backends must be running. Use `npm run dev:all` or start each service separately.

### Port conflict on 5000 or 8000
```bash
# Kill a specific port (Mac/Linux)
lsof -ti:<PORT> | xargs kill -9
# e.g.
lsof -ti:5000 | xargs kill -9
lsof -ti:8000 | xargs kill -9
```

### Python `ModuleNotFoundError`
```bash
cd backend
pip install -r requirements.txt
```

### `node_modules` missing
```bash
npm run setup
```
