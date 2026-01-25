# 📡 API Reference & Response Examples

## Authentication Endpoints

### POST `/api/auth/register`
Create a new user account.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Success Response (201):**
```json
{
  "user": {
    "id": "clp1234567890",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response (400):**
```json
{
  "error": "Email and password required"
}
```

---

### POST `/api/auth/login`
Authenticate user with email and password.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Success Response (200):**
```json
{
  "user": {
    "id": "clp1234567890",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response (401):**
```json
{
  "error": "Invalid credentials"
}
```

---

### POST `/api/auth/refresh`
Refresh the access token using a refresh token.

**Request:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Success Response (200):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response (401):**
```json
{
  "error": "Invalid or expired refresh token"
}
```

---

### POST `/api/auth/logout`
Logout the current user. (Client clears tokens)

**Request:**
```
Authorization: Bearer <access_token>
```

**Success Response (200):**
```json
{
  "message": "Logged out successfully"
}
```

---

## Analytics Endpoints (Protected)

All analytics endpoints require authorization header:
```
Authorization: Bearer <access_token>
```

### GET `/api/analytics/overview`
Get aggregated analytics metrics for a date range.

**Query Parameters:**
```
workspaceId=workspace_id
startDate=2024-01-01
endDate=2024-01-31
```

**Success Response (200):**
```json
{
  "visitors": 15230,
  "uniqueVisitors": 8450,
  "pageViews": 45670,
  "bounceRate": "42.50",
  "conversionRate": "2.35",
  "revenue": "12450.75"
}
```

---

### GET `/api/analytics/traffic`
Get traffic trend data (visitors over time).

**Query Parameters:**
```
workspaceId=workspace_id
startDate=2024-01-01
endDate=2024-01-31
```

**Success Response (200):**
```json
[
  {
    "date": "2024-01-01",
    "visitors": 523,
    "uniqueVisitors": 287
  },
  {
    "date": "2024-01-02",
    "visitors": 612,
    "uniqueVisitors": 334
  },
  {
    "date": "2024-01-03",
    "visitors": 445,
    "uniqueVisitors": 245
  }
]
```

---

### GET `/api/analytics/conversions`
Get conversion metrics over time.

**Query Parameters:**
```
workspaceId=workspace_id
startDate=2024-01-01
endDate=2024-01-31
```

**Success Response (200):**
```json
[
  {
    "date": "2024-01-01",
    "conversions": 12,
    "conversionRate": 2.3,
    "revenue": 450.00
  },
  {
    "date": "2024-01-02",
    "conversions": 15,
    "conversionRate": 2.5,
    "revenue": 562.50
  }
]
```

---

### GET `/api/analytics/sources`
Get traffic breakdown by source (organic, paid, direct, referral).

**Query Parameters:**
```
workspaceId=workspace_id
startDate=2024-01-01
endDate=2024-01-31
```

**Success Response (200):**
```json
[
  {
    "source": "organic",
    "visitors": 8450,
    "pageViews": 23450
  },
  {
    "source": "paid",
    "visitors": 4200,
    "pageViews": 12300
  },
  {
    "source": "direct",
    "visitors": 1800,
    "pageViews": 5400
  },
  {
    "source": "referral",
    "visitors": 780,
    "pageViews": 4520
  }
]
```

---

### GET `/api/analytics/platforms`
Get traffic breakdown by platform (desktop, mobile, tablet).

**Query Parameters:**
```
workspaceId=workspace_id
startDate=2024-01-01
endDate=2024-01-31
```

**Success Response (200):**
```json
[
  {
    "platform": "desktop",
    "visitors": 7500
  },
  {
    "platform": "mobile",
    "visitors": 5800
  },
  {
    "platform": "tablet",
    "visitors": 1930
  }
]
```

---

## Error Responses

### Common Error Codes

**400 - Bad Request**
```json
{
  "error": "Email and password required"
}
```

**401 - Unauthorized**
```json
{
  "error": "Access token required"
}
```

**403 - Forbidden**
```json
{
  "error": "Invalid or expired token"
}
```

**500 - Server Error** (Development)
```json
{
  "error": "Internal server error",
  "stack": "Error: ... at ..."
}
```

**500 - Server Error** (Production)
```json
{
  "error": "An unexpected error occurred"
}
```

---

## Using the API with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Get Overview (with token)
```bash
curl -X GET "http://localhost:5000/api/analytics/overview?workspaceId=default&startDate=2024-01-01&endDate=2024-01-31" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## Using the API with JavaScript/Axios

```javascript
import axios from 'axios'

const API_URL = 'http://localhost:5000/api'

// Register
const register = async () => {
  const response = await axios.post(`${API_URL}/auth/register`, {
    email: 'user@example.com',
    password: 'password123',
    firstName: 'John',
    lastName: 'Doe'
  })
  return response.data
}

// Login
const login = async () => {
  const response = await axios.post(`${API_URL}/auth/login`, {
    email: 'user@example.com',
    password: 'password123'
  })
  localStorage.setItem('accessToken', response.data.accessToken)
  localStorage.setItem('refreshToken', response.data.refreshToken)
  return response.data
}

// Get Analytics (with token)
const getAnalytics = async (token) => {
  const response = await axios.get(`${API_URL}/analytics/overview`, {
    params: {
      workspaceId: 'default',
      startDate: '2024-01-01',
      endDate: '2024-01-31'
    },
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  return response.data
}
```

---

## Response Headers

### Standard Headers
```
Content-Type: application/json
X-Powered-By: Express
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Strict-Transport-Security: max-age=15552000; includeSubDomains
```

### CORS Headers
```
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

---

## Rate Limiting (Future)

When implemented, responses may include:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1704067200
```

---

## Pagination (Future)

Analytics endpoints may support pagination:
```
GET /api/analytics/traffic?workspaceId=xxx&page=1&limit=30

Response:
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 30,
    "total": 300,
    "pages": 10
  }
}
```

---

## Testing the API

### Using Postman
1. Import the API collection
2. Set environment variables: `base_url`, `access_token`
3. Run authentication flow first
4. Use token in subsequent requests

### Using ThunderClient (VS Code)
1. Install ThunderClient extension
2. Create new request collection
3. Add requests with proper headers
4. Test endpoints

### Using Rest Client (VS Code)
Create `requests.http` file:
```http
### Register
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123",
  "firstName": "Test",
  "lastName": "User"
}

### Login
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

---

## API Health Check

```bash
curl http://localhost:5000/api/health

Response:
{
  "status": "ok"
}
```

---

**Last Updated**: January 2024
**API Version**: 1.0.0
**Status**: Production Ready
