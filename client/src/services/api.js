import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Handle token refresh on 403
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = localStorage.getItem('refreshToken')
        const response = await axios.post(`${API_URL}/auth/refresh`, { refreshToken })
        
        localStorage.setItem('accessToken', response.data.accessToken)
        originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`
        
        return api(originalRequest)
      } catch (refreshError) {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export const analyticsApi = {
  getOverview: (workspaceId, startDate, endDate) =>
    api.get('/analytics/overview', {
      params: { workspaceId, startDate, endDate }
    }),
  getTraffic: (workspaceId, startDate, endDate) =>
    api.get('/analytics/traffic', {
      params: { workspaceId, startDate, endDate }
    }),
  getConversions: (workspaceId, startDate, endDate) =>
    api.get('/analytics/conversions', {
      params: { workspaceId, startDate, endDate }
    }),
  getSources: (workspaceId, startDate, endDate) =>
    api.get('/analytics/sources', {
      params: { workspaceId, startDate, endDate }
    }),
  getPlatforms: (workspaceId, startDate, endDate) =>
    api.get('/analytics/platforms', {
      params: { workspaceId, startDate, endDate }
    })
}

export default api