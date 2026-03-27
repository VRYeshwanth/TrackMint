import api from './api';

export const expenseService = {
  getExpenses: async () => {
    // const response = await api.get('/expenses');
    // return response.data;
    return [{ id: 1, title: 'Groceries', amount: 50 }];
  },
};
