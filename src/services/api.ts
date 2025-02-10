// src/services/api.ts
import axios from 'axios';
import { authService } from './authService';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

// Request interceptor for adding token
api.interceptors.request.use(
  (config) => {
    const token = authService.getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;