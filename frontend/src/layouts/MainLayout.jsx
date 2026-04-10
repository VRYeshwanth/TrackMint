import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { AuthContext } from '../context/AuthContext';

export const MainLayout = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <Navbar />
      <div className="flex flex-1 overflow-hidden relative">
        {isAuthenticated && <Sidebar />}
        <main className={`flex-1 flex flex-col overflow-y-auto min-w-0 ${isAuthenticated ? 'lg:pl-64' : ''}`}>
          <div className="w-full flex-grow p-4 md:p-6 lg:p-10 max-w-[1600px] mx-auto">
            <Outlet />
          </div>
          <footer className="bg-white border-t border-gray-100 py-6 text-center text-sm text-gray-500 mt-auto">
            <p>© {new Date().getFullYear()} TrackMint. All rights reserved.</p>
          </footer>
        </main>
      </div>
    </div>
  );
};
