const API_BASE = 'http://localhost:5000/api';

const createRequest = async (path, options = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  const token = localStorage.getItem('token');
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || 'Request failed');
  }

  return data;
};

export const login = (email, password) =>
  createRequest('/auth/login', {
    method: 'POST',
    body: { email, password }
  });

export const register = (email, password, firstName, lastName) =>
  createRequest('/auth/register', {
    method: 'POST',
    body: { email, password, firstName, lastName }
  });

export const getOverview = () =>
  createRequest('/analytics');

export const getSeries = () =>
  createRequest('/analytics/series');

export const getCampaigns = () =>
  createRequest('/campaigns');
