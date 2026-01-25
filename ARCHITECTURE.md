# 🎨 Project Overview & Visual Guide

## 🏗️ Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                          CLIENT BROWSER                          │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │           React 18 + Vite (Port 3000)                     │  │
│  │  ┌──────────────────────────────────────────────────────┐ │  │
│  │  │ App.jsx (Router)                                     │ │  │
│  │  │  ├── /login → Login.jsx                             │ │  │
│  │  │  ├── /register → Register.jsx                       │ │  │
│  │  │  └── /dashboard → Dashboard.jsx (Protected)         │ │  │
│  │  │      ├── Sidebar (Navigation)                       │ │  │
│  │  │      ├── Header (Date Filter)                       │ │  │
│  │  │      └── Charts                                     │ │  │
│  │  │          ├── OverviewCards (6 metrics)              │ │  │
│  │  │          ├── TrafficChart (Line)                    │ │  │
│  │  │          ├── ConversionChart (Bar)                  │ │  │
│  │  │          ├── SourceChart (Pie)                      │ │  │
│  │  │          └── PlatformChart (Bar)                    │ │  │
│  │  └──────────────────────────────────────────────────────┘ │  │
│  │  Services Layer                                             │  │
│  │  └── api.js (Axios with JWT interceptors)                  │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
         │
         │ REST API Calls (JSON)
         │ Authorization: Bearer JWT Token
         │
         ▼
┌─────────────────────────────────────────────────────────────────┐
│                      EXPRESS.JS SERVER                           │
│                      (Port 5000)                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ Middleware Pipeline                                       │  │
│  │  ├── Helmet (Security Headers)                            │  │
│  │  ├── CORS (Cross-Origin)                                  │  │
│  │  ├── JSON Parser                                          │  │
│  │  ├── Request Logger                                       │  │
│  │  └── JWT Auth (Protected Routes)                          │  │
│  └───────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ Routes                                                    │  │
│  │  ├── /api/auth/register → authController.register        │  │
│  │  ├── /api/auth/login → authController.login              │  │
│  │  ├── /api/auth/refresh → authController.refresh          │  │
│  │  ├── /api/analytics/overview → analyticsController.overview   │
│  │  ├── /api/analytics/traffic → analyticsController.traffic     │
│  │  ├── /api/analytics/conversions → analyticsController.conversions   │
│  │  ├── /api/analytics/sources → analyticsController.sources     │
│  │  └── /api/analytics/platforms → analyticsController.platforms │
│  └───────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ Services (Business Logic)                                 │  │
│  │  ├── authService.js                                       │  │
│  │  │   ├── registerUser()                                   │  │
│  │  │   ├── loginUser()                                      │  │
│  │  │   ├── generateTokens()                                 │  │
│  │  │   └── refreshAccessToken()                             │  │
│  │  └── analyticsService.js                                  │  │
│  │      ├── getAnalyticsOverview()                           │  │
│  │      ├── getTrafficTrend()                                │  │
│  │      ├── getConversionMetrics()                           │  │
│  │      ├── getTrafficBySource()                             │  │
│  │      └── getTrafficByPlatform()                           │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
         │
         │ Prisma ORM Queries
         │
         ▼
┌─────────────────────────────────────────────────────────────────┐
│                     POSTGRESQL DATABASE                          │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ Tables                                                    │  │
│  │  ├── User (id, email, password, firstName, lastName)    │  │
│  │  ├── RefreshToken (id, token, userId, expiresAt)        │  │
│  │  ├── Workspace (id, name, slug, userId)                 │  │
│  │  ├── AnalyticsData (id, workspaceId, date, visitors...) │  │
│  │  └── Campaign (id, name, source, budget, revenue...)    │  │
│  │                                                           │  │
│  │ Indexes                                                  │  │
│  │  ├── AnalyticsData.workspaceId                          │  │
│  │  └── AnalyticsData.date                                 │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## 🔐 Authentication Flow

```
User → Registration Page
       ├── Enter: email, password, name
       ├── Frontend validates form
       └── POST /api/auth/register
                ├── Backend hashes password (bcryptjs)
                ├── Creates user in database
                ├── Generates tokens (JWT)
                │   ├── accessToken (7 days)
                │   └── refreshToken (30 days)
                └── Returns tokens & user

User → Login Page
       ├── Enter: email, password
       ├── POST /api/auth/login
       │   └── Backend validates credentials
       │       ├── Checks email exists
       │       ├── Compares password hash
       │       ├── Generates tokens
       │       └── Stores refresh token in DB
       └── Frontend stores tokens in localStorage

User → Protected Route
       ├── Frontend checks if token exists
       ├── Adds to request: Authorization: Bearer TOKEN
       └── Backend validates token
           ├── Verifies signature
           ├── Checks expiration
           └── Attaches user to request

Token Expires
       ├── Frontend detects 403 response
       ├── Axios interceptor triggers
       ├── POST /api/auth/refresh
       │   ├── Sends refresh token
       │   ├── Backend validates refresh token
       │   ├── Generates new access token
       │   └── Returns new token
       └── Frontend retries original request with new token

User → Logout
       ├── Frontend clears localStorage
       ├── Redirects to login
       └── Next protected route redirects to login
```

## 📊 Data Flow Example

```
Dashboard opens
       │
       ├─→ Check localStorage for accessToken
       │   ├─ No token? → Redirect to login
       │   └─ Has token? → Continue
       │
       └─→ fetch data for date range (last 30 days)
           │
           ├─→ analyticsApi.getOverview()
           │   GET /api/analytics/overview?workspaceId=xxx&startDate=xxx&endDate=xxx
           │   Header: Authorization: Bearer TOKEN
           │   │
           │   ├─→ Backend receives request
           │   ├─→ Validates JWT token
           │   ├─→ Calls analyticsService.getAnalyticsOverview()
           │   │   │
           │   │   └─→ Prisma queries AnalyticsData table
           │   │       WHERE workspaceId = xxx AND date BETWEEN startDate AND endDate
           │   │       │
           │   │       └─→ Aggregates data (sum visitors, avg bounce rate, etc.)
           │   │
           │   └─→ Returns JSON: { visitors: 15230, conversions: 357, ... }
           │
           ├─→ analyticsApi.getTraffic()
           │   Returns: [ { date: "2024-01-01", visitors: 523, ... }, ... ]
           │
           ├─→ analyticsApi.getConversions()
           │   Returns: [ { date: "2024-01-01", conversions: 12, revenue: 450 }, ... ]
           │
           ├─→ analyticsApi.getSources()
           │   Returns: [ { source: "organic", visitors: 8450 }, ... ]
           │
           └─→ analyticsApi.getPlatforms()
               Returns: [ { platform: "desktop", visitors: 7500 }, ... ]

All data fetched
       │
       └─→ State updated in Dashboard component
           │
           └─→ Components re-render with data
               ├─→ OverviewCards displays 6 metric cards
               ├─→ TrafficChart renders line chart
               ├─→ ConversionChart renders bar chart
               ├─→ SourceChart renders pie chart
               └─→ PlatformChart renders bar chart
```

## 📱 UI Component Hierarchy

```
App
├── Login Page
│   ├── Form (email, password)
│   ├── Error message
│   └── Link to Register
│
├── Register Page
│   ├── Form (name, email, password)
│   ├── Error message
│   └── Link to Login
│
└── Dashboard (Protected)
    ├── Sidebar
    │   ├── Logo
    │   └── Nav Items (Dashboard, Analytics, Reports, Settings)
    │
    ├── Header
    │   ├── Date Range Picker
    │   │   ├── Start Date Input
    │   │   └── End Date Input
    │   └── Logout Button
    │
    └── Main Content
        ├── OverviewCards
        │   ├── Card (Visitors)
        │   ├── Card (Unique Visitors)
        │   ├── Card (Page Views)
        │   ├── Card (Bounce Rate)
        │   ├── Card (Conversion Rate)
        │   └── Card (Revenue)
        │
        ├── Charts Row 1
        │   ├── TrafficChart
        │   │   └── Recharts LineChart
        │   └── ConversionChart
        │       └── Recharts BarChart
        │
        └── Charts Row 2
            ├── SourceChart
            │   └── Recharts PieChart
            └── PlatformChart
                └── Recharts BarChart
```

## 🗄️ Database Schema

```
┌──────────────────────┐
│      User            │
├──────────────────────┤
│ id (PK)              │
│ email (UNIQUE)       │
│ password             │
│ firstName            │
│ lastName             │
│ avatar (nullable)    │
│ createdAt            │
│ updatedAt            │
└──────────────────────┘
        │ (1:Many)
        │
        ├─→ ┌──────────────────────┐
        │   │  RefreshToken        │
        │   ├──────────────────────┤
        │   │ id (PK)              │
        │   │ token (UNIQUE)       │
        │   │ userId (FK)          │
        │   │ expiresAt            │
        │   │ createdAt            │
        │   └──────────────────────┘
        │
        └─→ ┌──────────────────────┐
            │   Workspace          │
            ├──────────────────────┤
            │ id (PK)              │
            │ name                 │
            │ slug (UNIQUE)        │
            │ userId (FK)          │
            │ createdAt            │
            │ updatedAt            │
            └──────────────────────┘
                    │ (1:Many)
                    │
                    └─→ ┌──────────────────────┐
                        │  AnalyticsData       │
                        ├──────────────────────┤
                        │ id (PK)              │
                        │ workspaceId (FK, IX) │
                        │ date (IX)            │
                        │ visitors             │
                        │ uniqueVisitors       │
                        │ pageViews            │
                        │ bounceRate           │
                        │ avgSessionDuration   │
                        │ conversionRate       │
                        │ revenue              │
                        │ source               │
                        │ platform             │
                        │ createdAt            │
                        │ updatedAt            │
                        └──────────────────────┘
                        (UNIQUE: workspaceId+date+source+platform)

┌──────────────────────┐
│    Campaign          │
├──────────────────────┤
│ id (PK)              │
│ name                 │
│ source               │
│ dateStart            │
│ dateEnd              │
│ budget               │
│ spent                │
│ clicks               │
│ conversions          │
│ revenue              │
│ createdAt            │
│ updatedAt            │
└──────────────────────┘
```

## 🎯 User Journey Map

```
Entry Point
    │
    ├─ No account? → REGISTER
    │   ├─ Fill form (name, email, password)
    │   ├─ Validate on client
    │   ├─ POST to backend
    │   ├─ Account created
    │   └─ Auto login with JWT tokens
    │
    └─ Has account? → LOGIN
        ├─ Enter credentials
        ├─ POST to backend
        ├─ Tokens returned
        ├─ Stored in localStorage
        └─ Redirect to dashboard

Dashboard
    │
    ├─ View Overview Cards
    │   └─ 6 key metrics at a glance
    │
    ├─ View Traffic Trend
    │   └─ Line chart of visitors over time
    │
    ├─ View Conversions
    │   └─ Bar chart of conversions and revenue
    │
    ├─ View Traffic Sources
    │   └─ Pie chart breakdown (organic, paid, direct, referral)
    │
    ├─ View Traffic by Platform
    │   └─ Bar chart (desktop, mobile, tablet)
    │
    └─ Filter by Date Range
        ├─ Select start date
        ├─ Select end date
        └─ Charts update automatically

Settings
    ├─ Profile (future)
    ├─ Workspace (future)
    └─ Preferences (future)

Logout
    └─ Clear tokens
        └─ Redirect to login
```

## 📈 Performance Metrics

```
Frontend:
  ├─ Bundle Size: ~150KB (gzipped)
  ├─ Load Time: < 2 seconds
  ├─ Time to Interactive: < 3 seconds
  └─ Charts: 60 FPS

Backend:
  ├─ Auth: < 100ms
  ├─ Analytics: < 500ms
  └─ Database: < 50ms per query

Database:
  ├─ Connection Pool: 10-20
  ├─ Query Cache: N/A (future)
  └─ Indexes: workspaceId, date
```

## 🔄 State Management

```
Frontend State:
  ├─ localStorage
  │   ├─ accessToken (JWT)
  │   └─ refreshToken (JWT)
  │
  ├─ React State (Dashboard)
  │   ├─ workspaceId
  │   ├─ dateRange { startDate, endDate }
  │   ├─ data { overview, traffic, conversions, sources, platforms }
  │   └─ loading
  │
  └─ Future: Zustand Store
      ├─ Auth State (user, tokens)
      ├─ Analytics State (cached data)
      └─ UI State (theme, sidebar)
```

## 🚀 Deployment Architecture

```
Production:
  ├─ Frontend (Vercel/Netlify)
  │   ├─ React SPA
  │   ├─ CDN for assets
  │   └─ HTTPS
  │
  ├─ Backend (Render/Railway)
  │   ├─ Node.js container
  │   ├─ Environment variables
  │   └─ Auto-restart on failure
  │
  └─ Database (AWS RDS/Supabase)
      ├─ PostgreSQL managed service
      ├─ Automatic backups
      ├─ SSL connection
      └─ Connection pooling
```

---

## 📊 Key Metrics Tracked

1. **Visitors** - Total page visits
2. **Unique Visitors** - Distinct users
3. **Page Views** - Total pages viewed
4. **Bounce Rate** - % of single-session users
5. **Conversion Rate** - % of users who converted
6. **Revenue** - Total money earned
7. **Traffic Source** - Where visitors came from
8. **Platform** - Device used (desktop/mobile/tablet)

---

**Status**: 🟢 MVP Complete
**Last Updated**: January 2024
**Ready for**: Development → Testing → Deployment
