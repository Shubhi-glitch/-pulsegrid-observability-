# PulseGrid

> Real-time distributed system monitoring & incident response dashboard

PulseGrid is a full-stack observability platform that streams live service health metrics — CPU usage, latency, and error rate — over WebSockets, visualizes them on an interactive 3D network graph, and automatically raises incidents when alert thresholds are breached.

---

## ✨ Features

- **Live Dashboard** — real-time service health overview, updated every 2 seconds via WebSockets
- **CPU History Charts** — historical CPU trend lines per service with configurable alert thresholds (e.g. 80% line)
- **3D Network Graph** — interactive, draggable/rotatable/zoomable visualization of services as nodes; node color reflects live health status
- **Automated Incident Detection** — alerts auto-generate when a service crosses a defined threshold, and auto-resolve when it recovers
- **Incident Timeline** — full history of alerts and resolutions with timestamps
- **Auth & Sessions** — JWT-based login, protected routes, session verification
- **Live Connection Status** — visual indicator for WebSocket connection health, with automatic reconnection handling

---

## 🛠 Tech Stack

**Frontend**
- React (Vite)
- Tailwind CSS
- Framer Motion — page transitions & micro-interactions
- Three.js — 3D network graph rendering
- Recharts / custom charting — CPU history visualization
- Socket.io-client — real-time data streaming

**Backend**
- Node.js + Express
- MongoDB + Mongoose — services, metrics, incidents, users
- Socket.io — real-time event broadcasting
- JWT — authentication

---

## 📊 Architecture

```
┌─────────────┐      WebSocket / REST      ┌──────────────┐
│   Frontend   │ ◄─────────────────────────► │   Backend    │
│  React+Vite  │                             │ Node+Express │
└─────────────┘                             └──────┬───────┘
                                                     │
                                              ┌──────▼───────┐
                                              │   MongoDB    │
                                              │ (metrics,    │
                                              │  incidents,  │
                                              │  users)      │
                                              └──────────────┘
```

Simulated microservices continuously emit health metrics → backend evaluates them against alert thresholds → incidents are created/resolved automatically → frontend receives live updates over WebSockets and re-renders the dashboard and 3D graph in real time.

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
- Node.js (v18+)
- MongoDB (local or MongoDB Atlas)

### 1. Clone the repo
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
```
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
```
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
```
```bash
npm run dev
```

The app will be running at `http://localhost:5173`.

---

## 📌 Roadmap

- [ ] Deploy backend (Railway) + frontend (Vercel)
- [ ] Add historical analytics / uptime % view
- [ ] Multi-user team support with role-based access
- [ ] Slack/email alert notifications

---

## 👩‍💻 Author

**Shubhi Tiwari**
Final-year CS Engineering student, KIIT
[LinkedIn](https://linkedin.com/in/shubhi-tiwari) · [GitHub](https://github.com/Shubhi-glitch)
