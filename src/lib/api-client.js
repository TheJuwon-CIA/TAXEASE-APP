import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://api.taxease.com/v1';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem('authToken');
    }
    return Promise.reject(error.response?.data || error.message);
  },
);

export const authAPI = {
  login: (email, password) =>
    api.post('/auth/login', { email, password }),

  register: (data) =>
    api.post('/auth/register', data),

  confirmEmail: (email, code) =>
    api.post('/auth/confirm-email', { email, code }),

  resendCode: (email) =>
    api.post('/auth/resend-code', { email }),

  forgotPassword: (email) =>
    api.post('/auth/forgot-password', { email }),

  verifyResetCode: (email, code) =>
    api.post('/auth/verify-reset-code', { email, code }),

  resetPassword: (email, code, newPassword) =>
    api.post('/auth/reset-password', { email, code, newPassword }),

  googleLogin: (idToken) =>
    api.post('/auth/google', { idToken }),

  selectUserType: (userId, userType) =>
    api.post('/auth/user-type', { userId, userType }),
};

export const userAPI = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (data) => api.put('/user/profile', data),
};

export const taxAPI = {
  calculate: (data) => api.post('/tax/calculate', data),
  getHistory: () => api.get('/tax/history'),
};

export default api;