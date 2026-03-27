import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { AuthContext } from '../context/AuthContext';
import { Button } from './ui/Button';
import { LayoutDashboard, LogOut, LogIn, UserPlus, Leaf } from 'lucide-react';

export const Navbar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="w-full px-6 sm:px-10 lg:px-16">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to={ROUTES.HOME} className="flex items-center gap-2 text-2xl font-bold text-primary">
              <Leaf className="w-8 h-8 text-primary" />
              <span>TrackMint</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to={ROUTES.DASHBOARD} className="text-gray-600 hover:text-primary transition flex items-center gap-1 font-medium">
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <div className="h-6 w-px bg-gray-200"></div>
                <span className="text-sm text-gray-500 hidden sm:block">Hello, {user?.email}</span>
                <Button variant="outline" onClick={handleLogout} className="flex items-center gap-1 text-sm py-1.5 px-3">
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to={ROUTES.LOGIN}>
                  <Button variant="secondary" className="flex items-center gap-1 text-sm py-1.5 px-3">
                    <LogIn className="w-4 h-4" />
                    Login
                  </Button>
                </Link>
                <Link to={ROUTES.REGISTER}>
                  <Button variant="primary" className="flex items-center gap-1 text-sm py-1.5 px-3 shadow-md shadow-primary/20">
                    <UserPlus className="w-4 h-4" />
                    Register
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
