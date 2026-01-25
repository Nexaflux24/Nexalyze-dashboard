# Nexalyze - Modern Analytics Dashboard

A production-ready, full-stack analytics dashboard built with React, Node.js, and PostgreSQL. Designed for digital marketers, SMB owners, and agencies to track and visualize key metrics with clean, minimal UI inspired by Stripe, Vercel, and Linear.

## 🎯 Features

### Core Analytics
- **Traffic Metrics**: Real-time visitor tracking, unique visitors, page views
- **Conversion Tracking**: Conversion rates and revenue metrics
- **Traffic Sources**: Breakdown by organic, paid, direct, referral
- **Platform Analytics**: Desktop, mobile, tablet device tracking
- **Date Range Filtering**: Flexible date range selection for custom periods

### User Experience
- **Authentication**: Secure JWT-based authentication with refresh tokens
- **Responsive Design**: Mobile-first design for all devices
- **Real-time Charts**: Interactive Recharts visualizations
- **Fast Performance**: Code splitting, lazy loading, optimized queries
- **Multi-workspace Support**: Scalable architecture for multiple workspaces

## 🛠️ Tech Stack

### Frontend
- **React 18.2** - Modern UI library
- **Vite** - Lightning-fast build tool
- **Tailwind CSS 3.3** - Utility-first styling
- **Recharts** - Beautiful, responsive charts
- **React Router v6** - Client-side routing
- **Axios** - HTTP client with interceptors
- **Lucide React** - Clean icon library

### Backend
- **Node.js 18+** - Runtime
- **Express.js 4.18+** - HTTP server
- **PostgreSQL** - Relational database
- **Prisma 5.7** - ORM
- **JWT** - Secure authentication
- **Bcryptjs** - Password hashing
- **Helmet** - Security headers
- **CORS** - Cross-origin requests

## 📦 Project Structure

```
nexalyze-dashboard/
├── backend/
│   ├── server/
│   │   ├── src/
│   │   │   ├── controllers/     # Request handlers
│   │   │   ├── routes/          # Route definitions
│   │   │   ├── services/        # Business logic
│   │   │   ├── middleware/      # Auth, error handling
│   │   │   ├── utils/           # Helper functions
│   │   │   ├── app.js           # Express configuration
│   │   │   └── server.js        # Server entry point
│   │   ├── prisma/
│   │   │   └── schema.prisma    # Database schema
│   │   ├── .env.example         # Environment template
│   │   └── package.json
│   └── ...
├── frontend/
│   ├── client/
│   │   ├── src/
│   │   │   ├── components/      # Reusable React components
│   │   │   ├── pages/           # Page components
│   │   │   ├── services/        # API client
│   │   │   ├── styles/          # Global styles
│   │   │   ├── main.jsx         # React entry point
│   │   │   └── App.jsx          # Root component
│   │   ├── index.html
│   │   ├── vite.config.js
│   │   ├── tailwind.config.js
│   │   └── package.json
│   └── ...
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 12+
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**
```bash
cd server
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment**
```bash
cp .env.example .env
# Edit .env with your database credentials and JWT secrets
```

4. **Setup database**
```bash
npx prisma migrate dev --name init
```

5. **Start development server**
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd client
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## 📝 API Documentation

### Authentication Routes
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout user

### Analytics Routes (Protected)
- `GET /api/analytics/overview` - Overview metrics
- `GET /api/analytics/traffic` - Traffic trend data
- `GET /api/analytics/conversions` - Conversion metrics
- `GET /api/analytics/sources` - Traffic by source
- `GET /api/analytics/platforms` - Traffic by platform

### Query Parameters
All analytics endpoints accept:
- `workspaceId`: Workspace ID
- `startDate`: Start date (YYYY-MM-DD)
- `endDate`: End date (YYYY-MM-DD)

## 🔒 Security

- **JWT Authentication**: Access tokens (7 days) + Refresh tokens (30 days)
- **Password Hashing**: Bcryptjs with salt rounds
- **Security Headers**: Helmet.js protection
- **CORS**: Configurable cross-origin requests
- **Input Validation**: Server-side validation on all endpoints
- **Error Handling**: Secure error messages without sensitive data leaks

## 🎨 UI/UX Design Principles

- **Data-First**: Information hierarchy optimized for quick insights
- **Minimal Design**: Clean, uncluttered interface
- **Responsive**: Works seamlessly on mobile, tablet, desktop
- **Performance**: Optimized bundle size, lazy loading charts
- **Accessibility**: WCAG 2.1 AA compliance, keyboard navigation

## 📊 Database Schema

### User
- id, email (unique), password, firstName, lastName, avatar, timestamps

### RefreshToken
- id, token (unique), userId (FK), expiresAt, timestamps

### Workspace
- id, name, slug (unique), userId (FK), timestamps

### AnalyticsData
- id, workspaceId (FK), date, visitors, uniqueVisitors, pageViews, bounceRate, avgSessionDuration, conversionRate, revenue, source, platform, timestamps

### Campaign
- id, name, source, dateStart, dateEnd, budget, spent, clicks, conversions, revenue

## 🧪 Testing

Run tests with:
```bash
# Backend
cd server && npm test

# Frontend
cd client && npm test
```

## 🚢 Deployment

### Backend (Node.js)
- Recommended: Render, Railway, Heroku
- Database: PostgreSQL managed service (AWS RDS, Heroku Postgres, Supabase)
- Environment: Production `.env` with secure secrets

### Frontend (React/Vite)
- Recommended: Vercel, Netlify, Cloudflare Pages
- Build: `npm run build` generates optimized dist/
- Preview: `npm run preview`

## 📈 Performance Optimization

- **Code Splitting**: Route-based code splitting
- **Lazy Loading**: Charts load only when visible
- **Query Optimization**: Indexed database queries
- **Caching**: React Query for API response caching
- **Bundle Size**: Tree-shaking, minification, compression

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add amazing feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 📞 Support

For issues and questions:
- GitHub Issues: [Create an issue]
- Email: support@nexalyze.com

---

**Built with ❤️ for data-driven businesses**
