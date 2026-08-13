# CodeSarthi

A full-stack platform for developers to build career profiles, tailor resumes with AI, manage team projects, and prepare for interviews — all in one place. Built with React, Express, MongoDB, and Groq-powered LLMs.

Solo-built by [Vineet Chandel](https://github.com/Vineet-Chandel), a final-year engineering student.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Links](#links)

---

## Features

### Shastra AI

General-purpose AI assistant with streaming responses, conversation history, and Redis-backed response caching.

- Multi-turn chat with persistent conversation threads
- Server-Sent Events (SSE) for real-time token streaming
- Response caching via Redis with 24-hour TTL
- Auto-generated conversation titles using a fast 8B model
- Powered by Llama 3.3 70B (reasoning) and Llama 3.1 8B (title generation) through Groq

### Interview Arena

Resume and career profile pipeline — from profile creation through AI-powered tailoring to export.

- **Career Profile Builder** — structured resume creation with sections for header, experience, education, skills, projects, summary, certifications, and additional details
- **ATS Templates** — pre-built resume layouts for export
- **AI Resume Pipeline** — a 6-stage process that runs against a target role:
  - **Stage 0 — Profile Audit**: scans for placeholder text, duplicate bullets, date anomalies, missing fields; outputs a health score
  - **Stage 1 — Targeting Strategy**: builds keyword maps, narrative through-lines, and per-section rewrite instructions for a specific job + company
  - **Stage 2 — Section Rewrites**: parallel rewrites of summary, experience bullets, project bullets, and skills curation — each in a focused LLM call
  - **Stage 3 — Profile Assembly**: merges rewritten sections back into the original document shape with tailoring metadata
  - **Stage 4 — Skill Gap Analysis**: compares confirmed skills against role requirements, computes coverage percentage, flags missing critical/preferred skills
  - **Stage 5 — Growth Recommendations**: prioritized 30–90 day action plan tied to specific gaps from Stage 4
- **AI Content Generation** — inline generators for experience bullet points, education highlights, skills, project descriptions, and professional summaries
- **Job Description Generator** — generates realistic, ATS-optimized JDs for a given role to use as tailoring targets
- **PDF Export** — download as PDF via html2canvas + jsPDF

### TeamOS

Team collaboration and project management.

- **Teams** — create teams, join via invite code, role-based access (leader/member), ownership transfer, team settings
- **Projects** — create and manage projects within teams, Kanban board and list views, project detail panels
- **Issues** — issue tracking with assignment, comments, status management, linking issues to goals
- **Goals** — personal and team goal tracking with status, priority, categories, tags, target dates, photo attachments, comments, and timeline history
- **Scheduler** — calendar-based scheduling with schedule creation modal and analytics
- **Analytics** — contribution trends, completion rates, member activity charts, assignment splits, project breakdowns, idle member detection
- **Outbox Processor** — background worker for reliable event processing

### Platform

- **Authentication** — email/password with bcrypt, Google OAuth, JWT-based sessions
- **Real-Time Chat** — WebSocket-based messaging with typing indicators, heartbeat/ping-pong, online user tracking, reply threads, media sharing (images/videos via Cloudinary)
- **Social** — connection requests, user profiles, explore/feed, blocking
- **Toolkit** — technical documentation browser with flashcards, search palette (⌘K), and blog content
- **Payments** — Razorpay integration
- **Email** — transactional email via Nodemailer and Resend
- **Newsletter** — subscription and delivery system
- **Rate Limiting** — Express rate limiter on API routes

---

## Tech Stack

### Frontend

| Dependency | Version |
|---|---|
| React | ^19.2.0 |
| Vite | ^7.2.4 |
| React Router | ^7.11.0 |
| Redux Toolkit | ^2.11.2 |
| Tailwind CSS | ^3.4.19 |
| shadcn/ui (Radix) | ^4.8.0 / ^1.4.3 |
| Framer Motion | ^12.42.2 |
| GSAP | ^3.15.0 |
| Monaco Editor | ^4.7.0 |
| Recharts | ^3.10.1 |
| Socket.IO Client | ^4.8.3 |
| html2canvas + jsPDF | ^1.4.1 / ^4.2.1 |
| Fuse.js | ^7.5.0 |
| DaisyUI | ^5.5.19 |

### Backend

| Dependency | Version |
|---|---|
| Node.js (Docker) | 22-alpine |
| Express | ^5.2.1 |
| MongoDB / Mongoose | ^7.0.0 / ^9.0.2 |
| Redis | ^5.10.0 |
| WebSocket (`ws`) | ^8.20.0 |
| OpenAI SDK + Groq | ^6.35.0 |
| Cloudinary | ^2.9.0 |
| Razorpay | ^2.9.6 |
| Nodemailer | ^8.0.1 |
| Resend | ^6.10.0 |
| JSON Web Token | ^9.0.3 |
| bcryptjs | ^3.0.3 |
| Google Auth Library | ^11.0.0 |
| Multer | ^2.0.2 |

### Infrastructure

- **Reverse Proxy**: Nginx with SSL termination, HTTP→HTTPS redirect, WebSocket proxying
- **Containerization**: Docker with multi-stage builds (Node 22-alpine → Nginx alpine for frontend)
- **Orchestration**: Docker Compose (3 services: nginx, frontend, backend)

---

## Installation

### Prerequisites

- Node.js 22+
- MongoDB instance (local or Atlas)
- Redis instance (local or cloud)
- Groq API key
- Cloudinary account
- Google OAuth credentials (optional, for Google login)
- Razorpay credentials (optional, for payments)

### Manual

```bash
# Clone
git clone [REPO_LINK]
cd code-sarthi

# Backend
cd Backend
npm install
# Create .env — see Environment Variables section below
npm run dev          # starts nodemon on src/index.js

# Frontend (in a separate terminal)
cd Frontend
npm install
npm run dev          # starts Vite dev server
```

The backend runs on `http://localhost:3000` by default.  
The frontend Vite dev server runs on `http://localhost:5173` by default.

### Docker

The project ships with a `docker-compose.yml` at the root that builds three services: `nginx`, `frontend`, and `backend`.

```bash
# Clone
git clone [REPO_LINK]
cd code-sarthi

# Ensure Backend/.env exists with all required variables
# (see Environment Variables section)

# Build and start all services
docker compose up --build
```

This will:

1. Build the **backend** from `Backend/Dockerfile` — installs deps with `npm ci`, runs `node src/index.js`
2. Build the **frontend** from `Frontend/Dockerfile` — installs deps, runs `npm run build`, serves the production bundle via Nginx on port 80
3. Build the **nginx** reverse proxy from `nginx/Dockerfile` — routes `/` to the frontend, `/api/` and `/login/google/` to the backend with WebSocket upgrade support

The compose stack exposes ports **80** and **443** through the Nginx container. The nginx config expects SSL certificates at `/etc/letsencrypt/live/codesarthi.in/` (mounted as a read-only volume). For local development without SSL, you'll need to modify `nginx/nginx.conf` to remove the SSL blocks and serve on port 80 only.

To build individual containers:

```bash
# Backend only
docker build -t codesarthi-backend ./Backend

# Frontend only
docker build -t codesarthi-frontend ./Frontend
```

---

## Environment Variables

All environment variables are set in `Backend/.env`. The frontend uses a single `BASE_URL` variable in `Frontend/src/.env`.

### Backend

| Variable | Description |
|---|---|
| `DB_HOST` | MongoDB username |
| `DB_CONNECTION_SECRET` | MongoDB password |
| `DB_LINK` | Full MongoDB connection URI |
| `PORT` | Server port (default: `3000`) |
| `JWT_SECRET` | Secret for signing JSON Web Tokens |
| `NODE_ENV` | Environment (`development` or `production`) |
| `CLOUD_NAME` | Cloudinary cloud name |
| `CLOUD_KEY` | Cloudinary API key |
| `CLOUD_SECRET` | Cloudinary API secret |
| `EMAIL` | SMTP email address for Nodemailer |
| `PASSWORD` | SMTP app password for Nodemailer |
| `REDIS_HOST` | Redis server hostname |
| `REDIS_PORT` | Redis server port |
| `REDIS_USERNAME` | Redis username |
| `REDIS_PASSWORD` | Redis password |
| `AT_FRONT` | Frontend URL for CORS (e.g. `http://localhost:5173`) |
| `AT_BACK` | Backend URL (e.g. `http://localhost:3000`) |
| `AT_PORT` | API path prefix (e.g. `/api`) |
| `AT_SYSTEM_API` | Production system URL |
| `RESEND_API_KEY` | Resend email service API key |
| `RAZORPAY_KEY_ID` | Razorpay key ID |
| `RAZORPAY_SECRET` | Razorpay secret key |
| `GROQ_API_KEY` | Groq API key for LLM access |
| `OAUTH_CLIENT` | Google OAuth 2.0 client ID |
| `OAUTH_SECRET_KEY` | Google OAuth 2.0 client secret |
| `GOOGLE_REDIRECT_URI` | Google OAuth callback URL |

### Frontend

| Variable | Description |
|---|---|
| `BASE_URL` | Backend API base URL |

---

## Project Structure

```
code-sarthi/
├── Backend/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│       ├── index.js              # Express server entry, mounts all routes
│       ├── Socket/               # WebSocket server (ws), chat handlers
│       ├── config/               # Bot knowledge base
│       ├── configs/              # Database and Redis connections
│       ├── controllers/          # Team, goal, issue, bot, schedule logic
│       ├── middleware/           # Team/issue authorization
│       ├── middlewares/          # Auth, file upload (Multer)
│       ├── models/               # Mongoose schemas (23 models)
│       ├── routes/               # Express route handlers (22 route files)
│       ├── services/             # Team succession logic
│       ├── utils/                # Validation, error handling, helpers
│       └── workers/              # Outbox processor for async events
├── Frontend/
│   ├── Dockerfile
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx               # Route definitions
│       ├── Body.jsx              # Authenticated app layout
│       ├── Main/                 # Landing page, navigation, public pages
│       ├── Pages/
│       │   ├── Shastra/          # AI assistant interface
│       │   ├── INTERVIEW-ARENA/  # Resume pipeline, career profile, AI stages
│       │   ├── PROJECT-MANAGER/  # Goals, issues, teams, projects, analytics
│       │   ├── DISCUSSION/       # Real-time chat interface
│       │   ├── SCHEDULER/        # Calendar and scheduling
│       │   ├── CARRER-PROFILE-CREATION/  # Resume builder wizard
│       │   ├── Toolkit/          # Docs browser, flashcards, blogs
│       │   └── auth/             # Login, signup, profile completion
│       ├── components/           # Shared UI (navbar, bot, chat drawer)
│       ├── hooks/                # Custom hooks (bot streaming, click outside)
│       ├── socket/               # WebSocket context and provider
│       └── utils/                # Redux store, slices (12 slices)
├── nginx/
│   ├── Dockerfile
│   └── nginx.conf                # Reverse proxy with SSL, WebSocket support
├── docker-compose.yml            # 3-service compose (nginx, frontend, backend)
└── .github/
    └── ISSUE_TEMPLATE/           # Bug report, feature request, custom templates
```

---

## Contributing

Contributing guidelines are being finalized. In the meantime, feel free to open issues using the existing templates (bug reports and feature requests are set up in `.github/ISSUE_TEMPLATE/`).

---

## License

License details are coming soon.

---

## Links

- **Repository**: [REPO_LINK]
- **Live**: [codesarthi.in](https://codesarthi.in)
