import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaMapMarkedAlt, FaUser, FaHeart, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center shadow-lg">
      <Link to="/" className="text-white font-bold text-xl hover:text-blue-100 transition duration-200">
        GeoTrend
      </Link>
      
      <div className="flex items-center space-x-6">
        <Link to="/" className="text-white hover:text-blue-100 flex items-center transition duration-200">
          <FaMapMarkedAlt className="mr-1" /> Map
        </Link>
        
        {user ? (
          <div className="flex items-center space-x-4">
            <span className="text-blue-100 text-sm">
              Welcome, {user.email?.split('@')[0] || 'User'}
            </span>
            <Link to="/account" className="text-white hover:text-blue-100 flex items-center transition duration-200">
              <FaUser className="mr-1" /> Account
            </Link>
            <button
              onClick={handleSignOut}
              className="bg-blue-700 hover:bg-blue-800 text-white px-3 py-2 rounded-lg flex items-center transition duration-200 border border-blue-500 hover:border-blue-400"
            >
              <FaSignOutAlt className="mr-1" /> Sign Out
            </button>
          </div>
        ) : (
          <Link to="/login" className="text-white hover:text-blue-100 flex items-center transition duration-200">
            <FaUser className="mr-1" /> Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
