<div align="center">

# PulseGrid

**Real-time distributed system monitoring & incident response dashboard**

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Socket.io](https://img.shields.io/badge/Socket.io-black?style=flat&logo=socket.io&badgeColor=010101)](https://socket.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](#license)

PulseGrid streams live service health metrics — CPU usage, latency, and error rate — over WebSockets, visualizes them on an interactive 3D network graph, and automatically raises incidents when alert thresholds are breached.

[Features](#-features) · [Tech Stack](#-tech-stack) · [Architecture](#-architecture) · [Getting Started](#-getting-started) · [Roadmap](#-roadmap)

</div>

---

## 📖 Overview

Modern engineering teams manage hundreds of interdependent microservices — when one degrades, engineers need to know **immediately**, and **exactly where**. PulseGrid is a self-built exploration of that problem: a lightweight observability platform simulating a distributed system, complete with live telemetry, threshold-based alerting, and automated incident lifecycle management.

---

## ✨ Features

| Feature | Description |
|---|---|
| **Live Dashboard** | Real-time service health overview, streamed via WebSockets and refreshed every 2 seconds |
| **CPU History Charts** | Historical CPU trend lines per service with configurable alert thresholds |
| **3D Network Graph** | Interactive, draggable / rotatable / zoomable visualization — node color reflects live health status |
| **Automated Incident Detection** | Alerts auto-generate when a service crosses a defined threshold, and auto-resolve on recovery |
| **Incident Timeline** | Full chronological history of alerts and resolutions |
| **Authentication** | JWT-based login with protected routes and session verification |
| **Connection Resilience** | Live WebSocket connection indicator with automatic reconnection handling |

---

## 🛠 Tech Stack

**Frontend**
`React (Vite)` · `Tailwind CSS` · `Framer Motion` · `Three.js` · `Recharts` · `Socket.io-client`

**Backend**
`Node.js` · `Express` · `MongoDB` + `Mongoose` · `Socket.io` · `JWT`

---

## 🏗 Architecture

```
┌─────────────┐      WebSocket / REST      ┌──────────────┐
│   Frontend   │ ◄─────────────────────────► │   Backend    │
│  React + Vite│                             │ Node + Express│
└─────────────┘                             └──────┬───────┘
                                                     │
                                              ┌──────▼───────┐
                                              │   MongoDB    │
                                              │  metrics /   │
                                              │  incidents / │
                                              │  users       │
                                              └──────────────┘
```

Simulated microservices continuously emit health metrics → the backend evaluates them against alert thresholds → incidents are created or resolved automatically → the frontend receives live updates over WebSockets and re-renders the dashboard and 3D graph in real time.

---

## 📁 Project Structure

```
pulsegrid/
├── backend/
│   ├── middleware/     # auth middleware
│   ├── models/         # Incident, Metric, User schemas
│   ├── routes/         # auth, metrics endpoints
│   └── server.js
├── frontend/
│   └── src/
│       ├── components/ # CPUChart, ServiceGraph3D, ParticleBackground, ThemeToggle, UptimeBar
│       ├── context/    # ThemeContext
│       ├── hooks/      # useSocket, useServiceStats
│       ├── pages/      # Landing, Login, Dashboard, Incidents, Settings, ServiceDetail
│       └── utils/      # api.js
└── test-client/        # standalone socket test page
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### 1. Clone the repository
```bash
git clone https://github.com/Shubhi-glitch/pulsegrid-observability.git
cd pulsegrid-observability
```

### 2. Backend setup
```bash
cd backend
npm install
```
Create a `.env` file in `backend/`:
```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret
```
```bash
node server.js
```

### 3. Frontend setup
```bash
cd ../frontend
npm install
```
Create a `.env` file in `frontend/`:
```env
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
```
```bash
npm run dev
```

The app runs at `http://localhost:5173`.

---

## 🗺 Roadmap

- [ ] Deploy backend (Railway) + frontend (Vercel)
- [ ] Historical analytics / uptime % view
- [ ] Multi-user team support with role-based access
- [ ] Slack / email alert notifications

---

## 📄 License

This project is licensed under the MIT License.

---

<div align="center">

## 👩‍💻 Author

**Shubhi Tiwari**
Final-year CS Engineering Student, KIIT

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://linkedin.com/in/shubhi-tiwari)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/Shubhi-glitch)

</div>
