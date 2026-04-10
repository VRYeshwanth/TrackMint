import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { AuthContext } from '../context/AuthContext';
import { useLayout } from '../context/LayoutContext';
import { LayoutDashboard, LogIn, UserPlus, Leaf, Menu } from 'lucide-react';
import { Button } from './ui/Button';
import { AvatarMenu } from './AvatarMenu';

export const Navbar = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { toggleSidebar } = useLayout();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-16">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-4">
            {isAuthenticated && (
              <button 
                onClick={toggleSidebar}
                className="lg:hidden p-2 rounded-md text-gray-600 hover:text-primary hover:bg-gray-100 transition-colors"
                aria-label="Toggle Sidebar"
              >
                <Menu className="w-6 h-6" />
              </button>
            )}
            <Link to={ROUTES.HOME} className="flex items-center gap-2 text-2xl font-bold text-primary">
              <Leaf className="w-8 h-8 text-primary" />
              <span>TrackMint</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            {isAuthenticated ? (
              <>
                <Link to={ROUTES.DASHBOARD} className="text-gray-600 hover:text-primary transition flex items-center gap-1 sm:gap-2 font-medium">
                  <LayoutDashboard className="w-5 h-5 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Dashboard</span>
                </Link>
                <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>
                <AvatarMenu />
              </>
            ) : (
              <>
                <Link to={ROUTES.LOGIN}>
                  <Button variant="secondary" className="flex items-center gap-1 text-sm py-1.5 px-3">
                    <LogIn className="w-4 h-4" />
                    <span className="hidden sm:inline">Login</span>
                  </Button>
                </Link>
                <Link to={ROUTES.REGISTER}>
                  <Button variant="primary" className="flex items-center gap-1 text-sm py-1.5 px-3 shadow-md shadow-primary/20">
                    <UserPlus className="w-4 h-4" />
                    <span className="hidden sm:inline">Register</span>
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
