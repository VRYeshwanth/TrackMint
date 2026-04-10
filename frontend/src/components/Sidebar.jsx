import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Receipt, 
  BarChart3, 
  Tags, 
  Settings,
  X,
  Leaf
} from 'lucide-react';
import { useLayout } from '../context/LayoutContext';
import { ROUTES } from '../constants/routes';

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: ROUTES.DASHBOARD },
  { icon: PlusCircle, label: 'Add Expense', path: '/add-expense' },
  { icon: Receipt, label: 'Manage Expenses', path: '/manage-expenses' },
  { icon: BarChart3, label: 'Reports', path: '/reports' },
  { icon: Tags, label: 'Categories', path: '/categories' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export const Sidebar = () => {
  const { isSidebarOpen, setSidebarOpen } = useLayout();
  const location = useLocation();

  const closeSidebar = () => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${
          isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeSidebar}
      />

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 lg:top-16 z-50 w-64 bg-white border-r border-gray-100 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo / Header */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-100 lg:hidden">
            <div className="flex items-center gap-2 text-2xl font-bold text-primary">
              <Leaf className="w-8 h-8 text-primary" />
              <span>TrackMint</span>
            </div>
            <button 
              onClick={closeSidebar}
              className="p-2 text-gray-500 hover:text-primary transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <NavLink
                  key={item.label}
                  to={item.path}
                  onClick={closeSidebar}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                    ${isActive 
                      ? 'bg-primary/10 text-primary font-semibold shadow-sm shadow-primary/5' 
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}
                  `}
                >
                  <Icon className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-primary' : 'text-gray-400 group-hover:text-gray-600'}`} />
                  <span>{item.label}</span>
                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                  )}
                </NavLink>
              );
            })}
          </div>

          {/* Optional: User section at bottom of sidebar could go here */}
          <div className="p-4 border-t border-gray-100">
            <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                TM
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-900">Premium Plan</span>
                <span className="text-xs text-gray-500 underline cursor-pointer hover:text-primary">Upgrade now</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
