import api from './api';

export const authService = {
  // Login
  login: async (credentials) => {
    return api.post('/login', credentials);
  },

  // Signup
  signup: async (userData) => {
    return api.post('/signup', userData);
  },

  // Logout
  logout: async () => {
    return api.get('/logout');
  },

  // Get current user
  getCurrentUser: async () => {
    return api.get('/currentuser');
  }
};