// src/services/api.js - API Service for Flask Backend
import axios from 'axios';

// Base API URL - Change this based on environment
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      if (window.location.pathname.startsWith('/admin') && 
          window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// ==================== AUTHENTICATION ====================

export const authAPI = {
  login: async (credentials) => {
    const response = await api.post('/admin/login', credentials);
    return response.data;
  },
  
  register: async (userData) => {
    const response = await api.post('/admin/register', userData);
    return response.data;
  },
};

// ==================== EVENTS ====================

export const eventsAPI = {
  getAll: async (category) => {
    const url = category ? `/events?category=${category}` : '/events';
    const response = await api.get(url);
    return response.data;
  },
  
  getById: async (id) => {
    const response = await api.get(`/events/${id}`);
    return response.data;
  },
  
  create: async (eventData) => {
    const response = await api.post('/events', eventData);
    return response.data;
  },
  
  update: async (id, eventData) => {
    const response = await api.put(`/events/${id}`, eventData);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await api.delete(`/events/${id}`);
    return response.data;
  },
};

// ==================== SERMONS ====================

export const sermonsAPI = {
  getAll: async () => {
    const response = await api.get('/sermons');
    return response.data;
  },
  
  getById: async (id) => {
    const response = await api.get(`/sermons/${id}`);
    return response.data;
  },
  
  create: async (sermonData) => {
    const response = await api.post('/sermons', sermonData);
    return response.data;
  },
  
  update: async (id, sermonData) => {
    const response = await api.put(`/sermons/${id}`, sermonData);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await api.delete(`/sermons/${id}`);
    return response.data;
  },
};

// ==================== GALLERY ====================

export const galleryAPI = {
  getAll: async (category) => {
    const url = category ? `/gallery?category=${category}` : '/gallery';
    const response = await api.get(url);
    return response.data;
  },
  
  create: async (imageData) => {
    const response = await api.post('/gallery', imageData);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await api.delete(`/gallery/${id}`);
    return response.data;
  },
};

// ==================== MESSAGES ====================

export const messagesAPI = {
  submit: async (messageData) => {
    const response = await api.post('/messages', messageData);
    return response.data;
  },
  
  getAll: async () => {
    const response = await api.get('/messages');
    return response.data;
  },
  
  updateStatus: async (id, status) => {
    const response = await api.patch(`/messages/${id}`, { status });
    return response.data;
  },
  
  delete: async (id) => {
    const response = await api.delete(`/messages/${id}`);
    return response.data;
  },
};

// ==================== NEWSLETTER ====================

export const newsletterAPI = {
  subscribe: async (email) => {
    const response = await api.post('/subscribe', { email });
    return response.data;
  },
  
  getSubscribers: async () => {
    const response = await api.get('/subscribers');
    return response.data;
  },
};

// ==================== ADMIN STATS ====================

export const adminAPI = {
  getStats: async () => {
    const response = await api.get('/admin/stats');
    return response.data;
  },
};

// ==================== HEALTH CHECK ====================

export const healthAPI = {
  check: async () => {
    const response = await api.get('/health');
    return response.data;
  },
};

export default api;