import api from './api';

export const expenseService = {
  getExpenses: async () => {
    const response = await api.get('/transactions');
    return response.data.data;
  },
  getSummary: async () => {
    const response = await api.get('/transactions/summary');
    return response.data.data;
  }
};
