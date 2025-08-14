import { defineStore } from 'pinia';
import { ref } from 'vue';
import api from '@/services/api.service';
import axios from 'axios';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const token = ref(localStorage.getItem('token') || null);
  const isAuthenticated = ref(false);

  if (token.value) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      user.value = JSON.parse(storedUser);
      isAuthenticated.value = true;
    }
  }

  async function login(email, password) {
    try {
      clearData()
      const response = await api.post('/auth/login', { email, password }, {
        withCredentials: true
      });

      user.value = response.data.user;
      token.value = response.data.token;
      isAuthenticated.value = true;

      localStorage.setItem('token', token.value);
      localStorage.setItem('user', JSON.stringify(user.value));

      return response;
    } catch (error) {
      logout();
      throw error;
    }
  }

  async function register(userData) {
      const response = await api.post('/auth/register', userData)
      return response
  }

  async function logout() {
    try {
      await api.post('/auth/logout', {}, {
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      });
    } catch (err) {
      return err.response.data
    } finally {
      clearData();
    }
  }

  async function registerRiot(riotUsername, riotTagLine) {
    try {
      const result = await api.post('/auth/register-riot', { riotId: riotUsername, riotTag: riotTagLine }, {
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      });
      return result.data
    } catch (err) {
      return err.response.data
    }
  }

  async function validateRiot() {
    try {
      const result = await api.post('/auth/validate-riot', {}, {
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      });
      return result.data
    } catch (err) {
      return err.response.data
    }
  }

  async function refreshToken() {
      // Usamos una instancia de axios sin interceptores para esta petición
      const plainAxios = axios.create({
        baseURL: process.env.API_BASE_URL || 'http://localhost:5000/api',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      const response = await plainAxios.post('/auth/refresh-token');
      this.token = response.data.token;
      localStorage.setItem('token', this.token);
      return response.data;
  }

  function clearData() {
    user.value = null;
    token.value = null;
    isAuthenticated.value = false;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  return {
    user,
    token,
    isAuthenticated,
    login,
    register,
    registerRiot,
    validateRiot,
    logout,
    refreshToken
  };
});