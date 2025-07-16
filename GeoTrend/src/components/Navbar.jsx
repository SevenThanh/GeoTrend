import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkedAlt, FaUser, FaHeart } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 dark:bg-blue-800 p-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-white font-bold text-xl">Global Trend Explorer</Link>
      <div className="flex space-x-6">
        <Link to="/" className="text-white hover:text-gray-300 flex items-center"><FaMapMarkedAlt className="mr-1" /> Map</Link>
        <Link to="/foryou" className="text-white hover:text-gray-300 flex items-center"><FaHeart className="mr-1" /> For You</Link>
        <Link to="/account" className="text-white hover:text-gray-300 flex items-center"><FaUser className="mr-1" /> Account</Link>
      </div>
    </nav>
  );
};

export default Navbar;
