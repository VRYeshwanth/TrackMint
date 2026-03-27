import api from './api';

export const authService = {
  login: async (credentials) => {
    // const response = await api.post('/auth/login', credentials);
    // return response.data;
    console.log('Login mock hit with:', credentials);
    return { token: 'mock-token', user: { id: 1, email: credentials.email } };
  },
  
  register: async (userData) => {
    // const response = await api.post('/auth/register', userData);
    // return response.data;
    console.log('Register mock hit with:', userData);
    return { success: true };
  }
};
