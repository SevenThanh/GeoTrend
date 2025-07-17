import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const AccountPage = () => {
  const { user, signOut, loading } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-lg text-gray-600">Loading your account...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-lg text-gray-600">Please sign in to view your account details.</div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-16 p-8 bg-white rounded-xl shadow-md">
      <div className="flex items-center gap-6 mb-6">
        <div className="w-20 h-20 bg-blue-600 text-white text-3xl flex items-center justify-center rounded-full font-bold uppercase shadow">
          {user.email && user.email.charAt(0)}
        </div>
        <div>
          <div className="text-xl font-semibold text-gray-800">
            {user.user_metadata?.full_name || user.email}
          </div>
          <div className="text-gray-500 text-sm mt-1">
            Member since: {new Date(user.created_at).toLocaleDateString()}
          </div>
          <div className="text-gray-400 text-xs mt-1">
            User ID: {user.id}
          </div>
        </div>
      </div>
      <div className="border-t pt-6 mt-6 flex justify-end">
        <button
          onClick={handleSignOut}
          className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded transition"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default AccountPage;
