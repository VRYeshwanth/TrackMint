import api from './api';

export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return { user: response.data.data };
  },
  
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return { user: response.data.data };
  },
  
  updateProfile: async (userData) => {
    const response = await api.patch('/users/profile', userData);
    return { user: response.data.data };
  },
  
  deleteAccount: async () => {
    await api.delete('/users/profile');
  }
};
