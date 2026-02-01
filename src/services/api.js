import axios from 'axios';

// Get the API URL from environment variable
// For Railway, this will be something like: https://your-app.up.railway.app
const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');

console.log('🔗 API Base URL:', BASE_URL);

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout
});

// Request interceptor - add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log request for debugging
    console.log(`📤 ${config.method.toUpperCase()} ${config.url}`);
    
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors
api.interceptors.response.use(
  (response) => {
    // Log successful response
    console.log(`✅ ${response.config.method.toUpperCase()} ${response.config.url} - ${response.status}`);
    return response;
  },
  (error) => {
    // Enhanced error logging
    if (error.response) {
      // Server responded with error
      console.error(`❌ Server Error ${error.response.status}:`, error.response.data);
      
      // Handle 401 Unauthorized
      if (error.response.status === 401) {
        localStorage.removeItem('adminToken');
        if (window.location.pathname.startsWith('/admin') && !window.location.pathname.includes('/login')) {
          window.location.href = '/admin/login';
        }
      }
    } else if (error.request) {
      // Request made but no response received (network error)
      console.error('❌ Network Error - No response received:', error.message);
      console.error('Check if backend is running at:', BASE_URL);
    } else {
      // Something else happened
      console.error('❌ Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// ==================== SETTINGS API ====================
export const settingsAPI = {
  getAll: () => api.get('/api/settings').then(res => res.data),
  getMusic: () => api.get('/api/settings/music').then(res => res.data),
  update: (data) => api.put('/api/settings', data).then(res => res.data),
};

// ==================== EVENTS API ====================
export const eventsAPI = {
  getAll: (category) => {
    const params = category ? { category } : {};
    return api.get('/api/events', { params }).then(res => res.data);
  },
  getById: (id) => api.get(`/api/events/${id}`).then(res => res.data),
  create: (data) => api.post('/api/events', data).then(res => res.data),
  update: (id, data) => api.put(`/api/events/${id}`, data).then(res => res.data),
  delete: (id) => api.delete(`/api/events/${id}`).then(res => res.data),
};

// ==================== SERMONS API ====================
export const sermonsAPI = {
  getAll: () => api.get('/api/sermons').then(res => res.data),
  getById: (id) => api.get(`/api/sermons/${id}`).then(res => res.data),
  create: (data) => api.post('/api/sermons', data).then(res => res.data),
  update: (id, data) => api.put(`/api/sermons/${id}`, data).then(res => res.data),
  delete: (id) => api.delete(`/api/sermons/${id}`).then(res => res.data),
};

// ==================== GALLERY API ====================
export const galleryAPI = {
  getAll: (category) => {
    const params = category ? { category } : {};
    return api.get('/api/gallery', { params }).then(res => res.data);
  },
  create: (data) => api.post('/api/gallery', data).then(res => res.data),
  delete: (id) => api.delete(`/api/gallery/${id}`).then(res => res.data),
};

// ==================== MESSAGES API ====================
export const messagesAPI = {
  submit: (data) => api.post('/api/messages', data).then(res => res.data),
  getAll: () => api.get('/api/messages').then(res => res.data),
  updateStatus: (id, status) => api.patch(`/api/messages/${id}`, { status }).then(res => res.data),
  delete: (id) => api.delete(`/api/messages/${id}`).then(res => res.data),
};

// ==================== NEWSLETTER API ====================
export const newsletterAPI = {
  subscribe: (email) => api.post('/api/subscribe', { email }).then(res => res.data),
  getSubscribers: () => api.get('/api/subscribers').then(res => res.data),
};

// ==================== AUTH API ====================
export const authAPI = {
  login: (credentials) => api.post('/api/admin/login', credentials).then(res => res.data),
  register: (data) => api.post('/api/admin/register', data).then(res => res.data),
};

// ==================== ADMIN API ====================
export const adminAPI = {
  getStats: () => api.get('/api/admin/stats').then(res => res.data),
};

// ==================== HEALTH API ====================
export const healthAPI = {
  check: () => api.get('/api/health').then(res => res.data),
};

export default api;