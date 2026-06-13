import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://tax-system-backend.onrender.com/api';

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

  confirmEmail: (email, otp) =>
    api.post('/auth/verify-email', { email, otp }),

  resendCode: (email) =>
    api.post('/auth/resend-otp', { email }),

  forgotPassword: (email) =>
    api.post('/auth/forgot-password', { email }),

  verifyResetCode: (email, otp) =>
    api.post('/auth/verify-otp', { email, otp }),

  resetPassword: (token, new_password) =>
    api.post('/auth/reset-password', { token, new_password }),

  logout: () =>
    api.post('/auth/logout'),
};

export const userAPI = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (data) => api.put('/user/profile', data),
  createIndividualProfile: (data) => api.post('/user/individual-profile', data),
  createBusinessProfile: (data) => api.post('/user/business-profile', data),
};

export const taxAPI = {
  calculatePAYE: (data) => api.post('/tax/calculate-paye', data),
  calculateSME: (data) => api.post('/tax/calculate-sme', data),
  getHistory: () => api.get('/tax/history'),
  saveCalculation: (data) => api.post('/tax/save', data),
  getTaxRules: () => api.get('/tax/rules'),
};

export const payrollAPI = {
  upload: (formData) => api.post('/payroll/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  getUploads: () => api.get('/payroll/uploads'),
  getResults: (id) => api.get(`/payroll/uploads/${id}/results`),
};

export const reportsAPI = {
  getReports: () => api.get('/reports'),
  downloadReport: (id) => api.get(`/reports/${id}/download`),
  generatePDF: () => api.get('/reports/individual/pdf'),
  generateCSV: (data) => api.post('/reports/payroll/csv', data),
};

export default api;