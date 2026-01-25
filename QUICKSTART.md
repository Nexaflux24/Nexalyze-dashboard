# 🚀 Quick Start Guide

## Prerequisites
- Node.js 18+ ([Download](https://nodejs.org))
- PostgreSQL 12+ ([Download](https://www.postgresql.org/download))
- Git

## 1️⃣ Backend Setup (5 minutes)

```bash
# Navigate to backend
cd server

# Install dependencies
npm install

# Setup database
# First, create a PostgreSQL database
createdb nexalyze_db

# Configure environment
cp .env.example .env
# Edit .env and set DATABASE_URL to your PostgreSQL connection string
# Example: postgresql://username:password@localhost:5432/nexalyze_db

# Run migrations
npx prisma migrate dev --name init

# (Optional) Seed with demo data
npm run seed

# Start backend server
npm run dev
```

Backend runs on: **http://localhost:5000**

## 2️⃣ Frontend Setup (5 minutes)

```bash
# Navigate to frontend
cd client

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs on: **http://localhost:3000**

## 3️⃣ Login

Use demo credentials (if seeded):
- **Email**: demo@nexalyze.com
- **Password**: password123

Or create a new account via the registration page.

## 📚 Development Commands

### Backend
```bash
npm run dev              # Start with hot reload (Nodemon)
npm run build            # Build for production
npx prisma studio       # Open Prisma Studio (visual DB editor)
npx prisma migrate dev  # Create and run migrations
npm run seed             # Populate with sample data
```

### Frontend
```bash
npm run dev              # Start with hot reload (Vite)
npm run build            # Build for production
npm run preview          # Preview production build
```

## 🔧 Environment Configuration

### Backend (.env)
```env
DATABASE_URL="postgresql://user:password@localhost:5432/nexalyze_db"
JWT_SECRET="your-secure-secret-key"
JWT_EXPIRES_IN="7d"
REFRESH_TOKEN_SECRET="your-refresh-secret-key"
REFRESH_TOKEN_EXPIRES_IN="30d"
NODE_ENV="development"
PORT=5000
CORS_ORIGIN="http://localhost:3000"
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Check if PostgreSQL is running
psql --version

# Test connection
psql postgresql://user:password@localhost:5432/nexalyze_db
```

### Port Already in Use
```bash
# Backend (change PORT in .env)
PORT=5001 npm run dev

# Frontend (Vite will auto-select next available port)
npm run dev
```

### Prisma Errors
```bash
# Regenerate Prisma client
npx prisma generate

# Reset database (⚠️ deletes all data)
npx prisma migrate reset
```

### CORS Errors
- Ensure `CORS_ORIGIN` in backend .env matches frontend URL
- Default: `CORS_ORIGIN="http://localhost:3000"`

## 📊 Project Structure

```
nexalyze-dashboard/
├── server/
│   ├── src/
│   │   ├── controllers/      # Route handlers
│   │   ├── routes/           # API routes
│   │   ├── services/         # Business logic
│   │   ├── middleware/       # Express middleware
│   │   ├── app.js            # Express setup
│   │   └── server.js         # Entry point
│   ├── prisma/
│   │   ├── schema.prisma     # Database schema
│   │   └── seed.js           # Seeding script
│   ├── .env                  # Environment variables
│   └── package.json
│
├── client/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/            # Page components
│   │   ├── services/         # API client
│   │   ├── styles/           # CSS
│   │   ├── App.jsx           # Root component
│   │   └── main.jsx          # React entry
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
└── README.md
```

## 🎯 Next Steps

1. ✅ Database setup
2. ✅ Backend server running
3. ✅ Frontend server running
4. 📊 Open dashboard: http://localhost:3000
5. 📝 Login with credentials
6. 🚀 Start exploring!

## 📖 API Documentation

All API endpoints require JWT authentication (except login/register).

**Request Header:**
```
Authorization: Bearer <access_token>
```

### Auth Endpoints
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login
- `POST /api/auth/refresh` - Refresh token

### Analytics Endpoints
- `GET /api/analytics/overview?workspaceId=xxx&startDate=2024-01-01&endDate=2024-01-31`
- `GET /api/analytics/traffic?workspaceId=xxx&startDate=xxx&endDate=xxx`
- `GET /api/analytics/conversions?workspaceId=xxx&startDate=xxx&endDate=xxx`
- `GET /api/analytics/sources?workspaceId=xxx&startDate=xxx&endDate=xxx`
- `GET /api/analytics/platforms?workspaceId=xxx&startDate=xxx&endDate=xxx`

## 🤝 Support

- Issues? Check [GitHub Issues](https://github.com/nexaflux/nexalyze-dashboard)
- Questions? Email: support@nexalyze.com
- Docs: [FULL_STACK_README.md](./FULL_STACK_README.md)

---

Happy hacking! 🎉
