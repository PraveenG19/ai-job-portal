# ⬡ AI Job Portal

> A futuristic AI-powered job portal connecting students and recruiters through intelligent job matching, resume analysis, and smart career tools.

![Tech Stack](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.5-6DB33F?style=flat&logo=springboot)
![Java](https://img.shields.io/badge/Java-21-ED8B00?style=flat&logo=openjdk)
![JWT](https://img.shields.io/badge/JWT-Auth-black?style=flat&logo=jsonwebtokens)
![Gemini AI](https://img.shields.io/badge/Gemini-AI-4285F4?style=flat&logo=google)

---

## 🚀 Live Demo

- **Frontend (Vercel):** _Deploy and add URL here_
- **API (Swagger):** `http://localhost:8081/swagger-ui.html`

---

## ✨ Features

| Module | Features |
|---|---|
| 👨‍🎓 Student | Register, upload resume, search & apply for jobs, track applications, AI resume analysis |
| 🏢 Recruiter | Post jobs, view applicants, AI candidate matching, schedule interviews |
| 👨‍💼 Admin | Manage users, monitor listings, platform analytics |
| 🤖 AI | Resume skill extraction, job-candidate matching, Gemini-powered analysis |

---

## 🛠️ Tech Stack

**Frontend:** React 19 · Vite · Bootstrap 5 · Axios · React Router 7  
**Backend:** Java 21 · Spring Boot 3.5 · Spring Security · JWT · REST APIs  
**Database:** PostgreSQL (prod) / H2 in-memory (dev)  
**AI:** Google Gemini API  

---

## ⚡ Quick Start

### Prerequisites
- Java 21+  
- Node.js 20+  
- PostgreSQL 16+ _(or run with H2 — no setup needed)_

### 1. Backend

```bash
cd backend
# Configure application.properties (DB credentials, Gemini key)
./mvnw spring-boot:run          # Linux/Mac
mvnw.cmd spring-boot:run        # Windows
```
Runs at **http://localhost:8081**  
Swagger UI: **http://localhost:8081/swagger-ui.html**

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```
Runs at **http://localhost:5173**

---

## 🌐 Deploy to Vercel (Frontend)

```bash
cd frontend
npm run build
# Then drag the dist/ folder to vercel.com
# OR: connect your GitHub repo on vercel.com and set:
#   Root Directory: frontend
#   Build Command:  npm run build
#   Output Dir:     dist
```

---

## 🔑 Environment Variables

| Key | Description |
|---|---|
| `gemini.api.key` | Google AI Studio API key |
| `jwt.secret` | JWT signing secret (min 32 chars) |
| `spring.mail.username` | Gmail address for notifications |
| `spring.mail.password` | Gmail app password |
| `spring.datasource.*` | PostgreSQL connection details |

---

## 📂 Project Structure

```
AI-Job-Portal/
├── frontend/          # React + Vite app
│   ├── src/
│   │   ├── components/   # Navbar, Footer, ParticleBackground
│   │   ├── pages/        # All page components
│   │   ├── css/          # Global futuristic styles
│   │   └── services/api.js
│   └── vercel.json
└── backend/           # Spring Boot app
    └── src/main/java/com/aijobportal/
        ├── controller/
        ├── service/
        ├── entity/
        ├── security/
        └── config/
```

---

## 📸 Design System

The UI features a **cyberpunk / futuristic 3D** design:
- 🌌 Animated particle network background
- 💎 Glassmorphism cards with neon glow borders  
- ⚡ 3D perspective tilt on hover
- 🎨 Neon palette: cyan `#00f5ff` · purple `#bf00ff` · pink `#ff006e` · green `#00ff88`
- 🔤 Orbitron font for headings, Inter for body text

---

## 👨‍💻 Author

**Praveen G** — Built with ❤️ and ⚡ AI
