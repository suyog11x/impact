# SkillSync AI — Impact Platform

A full-stack placement preparation platform with LeetCode integration, resume parsing, and recruiter dashboards.

---

## 🚀 Getting Started (For All Team Members)

### Prerequisites
Make sure you have these installed:
- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd impact
```

### 2. Install All Dependencies (One Command)
```bash
npm run setup
```
> This installs both the **frontend** and **backend** dependencies automatically.

### 3. Set Up Environment Variables
```bash
cp .env.example .env
```
The `.env.example` already contains the correct Supabase credentials — you **don't need to change anything** unless you're using your own Supabase project.

### 4. Run the Full App (Frontend + Backend Together)
```bash
npm run dev:all
```
This starts **both servers at once**:
| Server | URL |
|---|---|
| 🖥️ Frontend (Vite) | http://localhost:5173 |
| ⚙️ Backend API | http://localhost:8000 |

> ⚠️ **Important:** You MUST run `npm run dev:all` (not just `npm run dev`) or the LeetCode validation and stats features will show **"Server unreachable"** errors.

---

## 🗂️ Project Structure

```
impact/
├── src/               # React + TypeScript frontend
├── server/            # Node.js/Express backend (LeetCode API proxy)
│   ├── index.js       # API server entry point
│   └── package.json   # Backend dependencies
├── backend/           # Python resume parser
│   ├── main.py
│   └── requirements.txt
├── .env.example       # Environment variable template (safe to commit)
├── .env               # Your local secrets (DO NOT commit — gitignored)
└── package.json       # Root project config
```

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run setup` | Install all frontend + backend dependencies |
| `npm run dev:all` | **Start both frontend and backend** (recommended) |
| `npm run dev` | Start frontend only |
| `npm run dev:server` | Start backend only |
| `npm run build` | Build frontend for production |

---

## 🔧 Troubleshooting

### "Server unreachable. Is the backend running?"
You're only running the frontend. Run `npm run dev:all` instead of `npm run dev`.

### Port already in use
Kill the process on port 8000:
```bash
# Mac/Linux
lsof -ti:8000 | xargs kill -9

# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

### `node_modules` not found errors
Run `npm run setup` again to reinstall all dependencies.
