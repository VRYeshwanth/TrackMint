import React, { useState, useRef, useEffect, useContext } from 'react';
import { User, LogOut, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { authService } from '../services/authService';
import { ROUTES } from '../constants/routes';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { Modal } from './ui/Modal';

export const AvatarMenu = () => {
  const { user, logout, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Edit form state
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState('');

  // Delete state
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  // Update local state if user context syncs from elsewhere
  useEffect(() => {
    setName(user?.name || '');
    setEmail(user?.email || '');
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getInitials = (n, e) => {
    if (n) {
      const parts = n.trim().split(/\s+/);
      if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
      if (parts.length === 1 && parts[0]) return parts[0][0].toUpperCase();
    }
    if (e) return e[0].toUpperCase();
    return '?';
  };

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    setUpdateError('');
    try {
      const data = { name, email };
      if (password) data.password = password;
      const res = await authService.updateProfile(data);
      updateUser(res.user);
      setIsEditModalOpen(false);
      setPassword('');
    } catch (err) {
      setUpdateError(err.response?.data?.message || 'Failed to update profile.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    setDeleteError('');
    try {
      await authService.deleteAccount();
      logout();
      navigate(ROUTES.LOGIN);
    } catch (err) {
      setDeleteError(err.response?.data?.message || 'Failed to delete account.');
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <button 
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold shadow-sm hover:bg-primary/20 transition focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          {getInitials(user?.name, user?.email)}
        </button>
        
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-40">
            <div className="px-4 py-2 border-b border-gray-100 mb-1">
              <p className="text-sm font-semibold text-gray-900 truncate">{user?.name || "User"}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
            <button 
              onClick={() => { setIsEditModalOpen(true); setDropdownOpen(false); }} 
              className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
            >
              <User className="w-4 h-4 mr-2 text-gray-400" />
              Edit Profile
            </button>
            <button 
              onClick={handleLogout} 
              className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
            <div className="border-t border-gray-100 mt-1 pt-1">
               <button 
                 onClick={() => { setIsDeleteModalOpen(true); setDropdownOpen(false); }} 
                 className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 transition"
               >
                 <Trash2 className="w-4 h-4 mr-2" />
                 Delete Account
               </button>
            </div>
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      <Modal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        title="Edit Profile"
      >
        {updateError && <div className="mb-4 text-red-600 text-sm bg-red-50 p-2 rounded">{updateError}</div>}
        <form onSubmit={handleUpdateProfile}>
          <Input 
            label="Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
          <Input 
            label="Email" 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <Input 
            label="New Password" 
            type="password" 
            value={password} 
            placeholder="Leave blank to keep current"
            onChange={(e) => setPassword(e.target.value)} 
            className="mb-8"
          />
          <div className="flex gap-3 justify-end mt-2">
            <Button variant="secondary" rounded="full" type="button" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
            <Button variant="primary" rounded="full" type="submit" className="px-6" disabled={isUpdating}>
              {isUpdating ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Account Modal */}
      <Modal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)} 
        title="Delete Account"
      >
        <p className="text-gray-600 mb-6 text-sm leading-relaxed">
          Are you sure you want to delete your account? This will permanently delete your profile and <span className="font-bold text-red-600">all associated transactions</span>. This action cannot be undone.
        </p>
        {deleteError && <div className="mb-4 text-red-600 text-sm bg-red-50 p-2 rounded">{deleteError}</div>}
        <div className="flex gap-3 justify-end">
          <Button variant="secondary" rounded="full" type="button" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
          <Button 
            variant="danger"
            rounded="full"
            onClick={handleDeleteAccount}
            disabled={isDeleting}
            className="px-6"
          >
            {isDeleting ? 'Deleting...' : 'Delete Permanently'}
          </Button>
        </div>
      </Modal>
    </>
  );
};
