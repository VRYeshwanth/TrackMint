import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ROUTES } from '../constants/routes';
import { expenseService } from '../services/expenseService';

export const Dashboard = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState({ balance: 0, totalIncome: 0, totalExpense: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [transactionsData, summaryData] = await Promise.all([
          expenseService.getExpenses(),
          expenseService.getSummary()
        ]);
        setExpenses(transactionsData);
        setSummary(summaryData);
      } catch (error) {
        console.error("Failed fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) return <Navigate to={ROUTES.LOGIN} replace />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      <div className="mb-6 sm:mb-8 flex justify-between items-end border-b pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm sm:text-base text-gray-500 mt-1 sm:mt-2">Welcome back, {user?.name || user?.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
        <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mb-1">Total Balance</p>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">₹{(summary.balance || 0).toFixed(2)}</h3>
          </div>
          <div className="bg-green-100 p-2 sm:p-3 rounded-full">
             <span className="text-primary font-bold text-sm sm:text-base">In</span>
          </div>
        </div>
        <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mb-1">Monthly Expenses</p>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">₹{(summary.totalExpense || 0).toFixed(2)}</h3>
          </div>
          <div className="bg-red-100 p-2 sm:p-3 rounded-full">
             <span className="text-red-500 font-bold text-sm sm:text-base">Out</span>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-100">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">Recent Transactions</h3>
        </div>
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading your transactions...</div>
        ) : expenses.length === 0 ? (
           <div className="p-8 text-center text-gray-500">No transactions recorded yet.</div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {expenses.map((expense) => (
              <li key={expense._id || expense.id} className="px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center hover:bg-gray-50 transition">
                <div>
                  <p className="text-sm sm:text-base font-medium text-gray-900">{expense.title}</p>
                </div>
                <div className={`text-sm sm:text-base font-semibold ${expense.type === 'income' ? 'text-green-600' : 'text-gray-900'}`}>
                  {expense.type === 'income' ? '+' : '-'}₹{(expense.amount || 0).toFixed(2)}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
