# Development Notes & Architecture

## Project Overview

Nexalyze is a production-ready SaaS analytics dashboard built with modern technologies. It's designed for digital marketers, SMBs, and agencies to track website analytics with clean UI and fast performance.

## Architecture

### Full-Stack Flow

```
Client (React/Vite) 
    ↓ (REST API calls)
Backend (Express.js) 
    ↓ (ORM queries)
Database (PostgreSQL)
```

### Authentication Flow

1. **Registration/Login**: User submits credentials → Backend hashes password, creates JWT tokens
2. **Access Token**: 7-day JWT for API requests
3. **Refresh Token**: 30-day JWT stored in database for renewal
4. **Token Refresh**: When access token expires, client sends refresh token → Backend validates & issues new access token
5. **Logout**: Client clears local storage

### Data Flow

```
User opens Dashboard
    ↓
Frontend fetches data (with auth token)
    ↓
Backend validates JWT
    ↓
Services aggregate analytics data
    ↓
Prisma queries PostgreSQL
    ↓
Response returned to frontend
    ↓
Charts render with data
```

## Key Design Decisions

### 1. JWT with Refresh Tokens
- **Why**: Secure, scalable, doesn't require session storage
- **How**: Access token (7d) for requests, refresh token (30d) for renewal
- **Implementation**: Backend validates JWT, frontend handles token refresh automatically

### 2. Service Layer Pattern
- **Why**: Separates business logic from routes
- **Services**: `authService.js`, `analyticsService.js`
- **Benefit**: Reusable logic, easier testing

### 3. Prisma ORM
- **Why**: Type-safe database queries, automatic migrations
- **Benefits**: Schema consistency, query optimization, built-in validation
- **Usage**: Models in `schema.prisma`, used in services

### 4. Component-Based UI
- **Why**: Reusable, maintainable React components
- **Structure**: 
  - `pages/` - Full page components
  - `components/` - Reusable components
  - `components/charts/` - Chart components
  - `components/layout/` - Layout components
  - `components/ui/` - Basic UI components

### 5. API Interceptors
- **Why**: Automatic token refresh, centralized error handling
- **Implementation**: Axios interceptors in `services/api.js`
- **Features**: 
  - Adds auth token to all requests
  - Refreshes token on 403
  - Redirects to login if refresh fails

## Database Schema

### User Model
```prisma
model User {
  id            String       @id @default(cuid())
  email         String       @unique
  password      String
  firstName     String?
  lastName      String?
  avatar        String?
  createdAt     DateTime     @default(now())
  updatedAt     DateTime     @updatedAt
  
  workspaces    Workspace[]
  refreshTokens RefreshToken[]
}
```

### Workspace Model
```prisma
model Workspace {
  id        String   @id @default(cuid())
  name      String
  slug      String   @unique
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  
  analyticsData AnalyticsData[]
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

### AnalyticsData Model
```prisma
model AnalyticsData {
  id                 String @id @default(cuid())
  workspaceId        String
  workspace          Workspace @relation(fields: [workspaceId], references: [id])
  date               DateTime
  visitors           Int
  uniqueVisitors     Int
  pageViews          Int
  bounceRate         Float
  avgSessionDuration Int
  conversionRate     Float
  revenue            Float
  source             String  // organic, paid, direct, referral
  platform           String  // desktop, mobile, tablet
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@unique([workspaceId, date, source, platform])
  @@index([workspaceId])
  @@index([date])
}
```

## API Endpoints

### Authentication
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/refresh
POST   /api/auth/logout
```

### Analytics (Protected)
```
GET    /api/analytics/overview
GET    /api/analytics/traffic
GET    /api/analytics/conversions
GET    /api/analytics/sources
GET    /api/analytics/platforms
```

## Frontend Technologies

### Key Libraries
- **React 18**: Latest version with concurrent rendering
- **Vite**: Fast bundler with hot reload
- **Tailwind CSS**: Utility-first styling
- **Recharts**: Composable charting library
- **React Router v6**: Modern routing
- **Axios**: HTTP client with interceptors

### State Management
- Currently using React hooks + localStorage for auth
- Ready for Zustand integration (state store pattern)
- React Query can be added for data caching

## Backend Technologies

### Key Libraries
- **Express.js**: Minimal, flexible web framework
- **Prisma**: Type-safe ORM
- **JWT**: Stateless authentication
- **Bcryptjs**: Password hashing
- **Helmet**: Security middleware
- **CORS**: Cross-origin handling

## Performance Optimizations

### Frontend
- ✅ Code splitting (automatic with React Router)
- ✅ Lazy loading charts (already in Chart components)
- ✅ Tailwind CSS purging (production build)
- 📋 React Query for caching (future)
- 📋 Image optimization (future)

### Backend
- ✅ Database indexing (on workspaceId, date)
- ✅ Query optimization in services
- ✅ JWT validation caching
- 📋 Response compression (future)
- 📋 Database connection pooling (future)

## Security Features

- ✅ JWT with refresh tokens
- ✅ Password hashing (bcryptjs)
- ✅ Helmet security headers
- ✅ CORS protection
- ✅ Input validation (database level)
- ✅ Error handling (no sensitive data in errors)

## Development Workflow

### Making API Changes
1. Update `schema.prisma` if needed
2. Run `npx prisma migrate dev`
3. Update services with new logic
4. Update controllers to use services
5. Add new routes if needed
6. Update frontend API client (`services/api.js`)

### Adding New Features
1. Backend: Controller → Service → Route
2. Frontend: Page/Component → API call → Display
3. Styling: Tailwind classes in component

### Testing
```bash
# Backend
npm test

# Frontend (when configured)
npm test
```

## Troubleshooting Guide

### Common Issues

**CORS Error**
- Check backend `CORS_ORIGIN` env var
- Ensure frontend URL matches

**Database Connection Error**
- Verify PostgreSQL is running
- Check `DATABASE_URL` in `.env`
- Run `npx prisma db push` to sync schema

**Token Invalid/Expired**
- Frontend should auto-refresh (axios interceptor)
- Check JWT_SECRET matches between requests
- Clear localStorage and re-login

**Port Already in Use**
- Backend: Change `PORT` in `.env`
- Frontend: Vite auto-selects next available

## Future Enhancements

### Phase 2
- [ ] Real-time data with WebSockets
- [ ] Multi-tenant UI improvements
- [ ] Advanced filtering and segmentation
- [ ] Custom date ranges and comparisons
- [ ] Export to CSV/PDF

### Phase 3
- [ ] AI insights and anomaly detection
- [ ] Goal tracking and alerts
- [ ] Integration with GA, Segment
- [ ] Webhooks for external services
- [ ] Email reports and scheduling

### Phase 4
- [ ] Mobile app (React Native)
- [ ] Advanced permissions system
- [ ] Custom dashboards and widgets
- [ ] Dark mode
- [ ] Multiple languages

## Code Style & Standards

### JavaScript
- ES6+ modules
- Arrow functions preferred
- Async/await over promises
- Meaningful variable names

### React
- Functional components with hooks
- Props destructuring
- Custom hooks for reusable logic
- CSS-in-JS or Tailwind (no global CSS)

### Backend
- REST API conventions
- Error handling in all routes
- Service layer for logic
- Environment variables for config

## Documentation

- **FULL_STACK_README.md**: Project overview and setup
- **QUICKSTART.md**: Quick setup guide
- **DEVELOPMENT.md**: This file

## Support & Contributing

- Issues: [GitHub Issues](https://github.com/nexaflux/nexalyze-dashboard/issues)
- Discussions: [GitHub Discussions](https://github.com/nexaflux/nexalyze-dashboard/discussions)
- Email: dev@nexaflux.agency

---

Last Updated: January 2024
Version: 1.0.0-beta
