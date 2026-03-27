import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';

export const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow flex flex-col">
        <div className="w-full flex-grow">
          <Outlet />
        </div>
      </main>
      <footer className="bg-white border-t border-gray-100 py-6 text-center text-sm text-gray-500 mt-auto">
        <p>© {new Date().getFullYear()} TrackMint. All rights reserved.</p>
      </footer>
    </div>
  );
};
