# Nexalyze Dashboard

A full-stack analytics platform with a React + Vite frontend and a Node.js + Express backend.

## What this repo contains

- `client/` — active frontend app built with React, Vite, Tailwind CSS, Recharts, and Axios
- `server/` — backend API built with Express, Prisma, PostgreSQL, JWT auth, and bcrypt
- `frontend/` — legacy static HTML/CSS/JS frontend (archived, optional)

> This README now consolidates setup, architecture, usage, and troubleshooting for Nexalyze.

## Key features

- Authenticated dashboard with login/register flow
- JWT-based access + refresh token support
- Analytics charts for traffic, conversions, sources, and platforms
- Responsive dashboard layout for desktop, tablet, and mobile
- Prisma ORM with PostgreSQL database support
- Modular route/controller/service architecture
- Tailwind-driven UI with reusable components

## Tech stack

- Frontend: React 18, Vite, Tailwind CSS, Recharts, React Router, Axios
- Backend: Node.js, Express, Prisma, PostgreSQL, JWT, bcryptjs, Helmet, CORS
- Dev tools: Vite, Nodemon, ESLint, Prisma CLI

## Repository layout

```
Nexalyze-dashboard/
├── client/                 # React frontend app
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/          # Login / Register / Dashboard
│   │   ├── services/       # API client
│   │   ├── styles/         # global CSS
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── server/                 # Express backend API
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── middleware/
│   │   ├── app.js
│   │   └── server.js
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.js
│   └── package.json
├── frontend/               # legacy static frontend (optional)
└── README.md               # consolidated documentation
```

## Quick setup

### Prerequisites

- Node.js 18+
- npm 9+
- PostgreSQL 12+

### 1. Install dependencies

```bash
cd server
npm install

cd ../client
npm install
```

### 2. Configure environment

Create `server/.env` with values like:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/nexalyze_db"
JWT_SECRET="your-super-secret-jwt-key"
REFRESH_TOKEN_SECRET="your-refresh-secret-key"
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

Create `client/.env` with:

```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Initialize the database

```bash
cd server
npx prisma migrate dev --name init
npx prisma generate
npm run seed
```

### 4. Start development servers

Open two terminals:

Terminal 1:
```bash
cd server
npm run dev
```

Terminal 2:
```bash
cd client
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

## Authentication flow

- `POST /api/auth/register` — create a user and return JWT tokens
- `POST /api/auth/login` — authenticate user and return access + refresh tokens
- `POST /api/auth/refresh` — refresh access token using refresh token

Front-end requests include `Authorization: Bearer <access_token>` for protected routes.

## Main app pages

- `/login` — user sign-in
- `/register` — new account registration
- `/dashboard` — protected analytics dashboard

## API endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/refresh`

### Analytics
- `GET /api/analytics/overview`
- `GET /api/analytics/traffic`
- `GET /api/analytics/conversions`
- `GET /api/analytics/sources`
- `GET /api/analytics/platforms`

> All analytics endpoints require a valid access token.

## Development commands

### Client
- `npm run dev` — start Vite dev server
- `npm run build` — production build
- `npm run preview` — preview production build
- `npm run lint` — run ESLint on `src`

### Server
- `npm run dev` — start backend with Nodemon
- `npm run start` — run backend once
- `npm run prisma:migrate` — run Prisma migrations
- `npm run prisma:generate` — generate Prisma client
- `npm run seed` — seed demo data

## Troubleshooting'

- If frontend fails to connect, confirm `VITE_API_URL` matches backend URL.
- If backend cannot connect to PostgreSQL, verify `DATABASE_URL` and that Postgres is running.
- If token refresh fails, clear browser storage and log in again.
- For CORS issues, ensure `CORS_ORIGIN` includes `http://localhost:5173`.

## Notes

- The active app is in `client/` and `server/`.
- `frontend/` contains legacy static HTML/CSS/JS.
- This README consolidates project docs into one single source of truth.

## License

MIT
