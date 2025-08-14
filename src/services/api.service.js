import axios from 'axios';
import { useAuthStore } from '@/stores/auth.store';

const api = axios.create({
  baseURL: process.env.API_BASE_URL || 'http://localhost:5000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

let isRefreshing = false;
let subscribers = [];
let refreshAttempts = 0;
const MAX_REFRESH_ATTEMPTS = 2;

function onRefreshed(token) {
  subscribers.forEach(cb => cb(token));
  subscribers = [];
}

function addSubscriber(callback) {
  subscribers.push(callback);
}

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    const authStore = useAuthStore();
    
    if (error.response?.status === 401 && 
      !originalRequest._retry && 
      !originalRequest.url.includes('/auth/')) {

      if (refreshAttempts >= MAX_REFRESH_ATTEMPTS) {
        authStore.logout();
        return Promise.reject(new Error('Límite de reintentos alcanzado'));
      }

      if (isRefreshing) {
        return new Promise(resolve => {
          addSubscriber(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          });
        });
      }
      

      originalRequest._retry = true;
      isRefreshing = true;
      refreshAttempts++;

      try {
        const { token: newToken } = await authStore.refreshToken();
        refreshAttempts = 0;
        onRefreshed(newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        refreshAttempts = 0;
        authStore.logout();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    
    return Promise.reject(error);
  }
);

api.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  if (authStore.token && !config.url.includes('/auth/')) {
    config.headers.Authorization = `Bearer ${authStore.token}`;
  }
  return config;
});

const getBalance = async () => {
  return api.get('/balance');
};

const depositUSDT = async (amount) => {
  return api.post('/transactions/deposit', { amount });
};

const withdrawUSDT = async (amount, address) => {
  return api.post('/transactions/withdraw', { amount, address });
};

export default {
  ...api,
  getBalance,
  depositUSDT,
  withdrawUSDT
};