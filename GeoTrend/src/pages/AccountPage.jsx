import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../config/supabase';


const AccountPage = () => {
  const { user, signOut, loading: authLoading, getSavedTrends, unsaveTrend } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.user_metadata?.username || '',
    displayName: user?.user_metadata?.display_name || user?.email || '',
    bio: user?.user_metadata?.bio || '',
    location: user?.user_metadata?.location || '',
    timezone: user?.user_metadata?.timezone || 'UTC',
  });
  const [updating, setUpdating] = useState(false);
  const [savedTrends, setSavedTrends] = useState([]);
  const [loadingTrends, setLoadingTrends] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setUpdating(true);
    const { error } = await supabase.auth.updateUser({
      data: {
        username: formData.username,
        display_name: formData.displayName,
        bio: formData.bio,
        location: formData.location,
        timezone: formData.timezone,
      },
    });
    setUpdating(false);
    if (!error) {
      setEditing(false);
    } else {
      alert('Error updating profile: ' + error.message);
    }
  };

  const timezones = ['UTC', 'America/New_York', 'America/Los_Angeles', 'Europe/London', 'Asia/Tokyo']; 
  useEffect(() => {
    const fetchSavedTrends = async () => {
      if (user) {
        try {
          setLoadingTrends(true);
          const { data, error } = await getSavedTrends();
          if (error) {
            console.error('Error fetching saved trends:', error);
          } else {
            setSavedTrends(data || []);
          }
        } catch (error) {
          console.error('Error fetching saved trends:', error);
        } finally {
          setLoadingTrends(false);
        }
      } else {
        setLoadingTrends(false);
      }
    };

    fetchSavedTrends();
  }, [user, getSavedTrends]);

  const handleUnsaveTrend = async (trendUrl) => {
    try {
      const { error } = await unsaveTrend(trendUrl);
      if (!error) {
        setSavedTrends(prev => prev.filter(trend => trend.url !== trendUrl));
      } else {
        console.error('Error unsaving trend:', error);
      }
    } catch (error) {
      console.error('Error unsaving trend:', error);
    }
  };

  if (authLoading || !user) {
    return <div className="flex justify-center items-center h-96 text-gray-600">Loading...</div>;
  }

  return (
    <div className="bg-[#FFF4EC] min-h-screen py-16">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {/* Left side */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-16 h-16 bg-blue-600 text-white text-2xl flex items-center justify-center 
            rounded-full font-bold uppercase shadow aspect-square">
              {formData.displayName.charAt(0)}
            </div>
            <div className="flex-1">
              {!editing ? (
                <>
                  <div className="text-black font-semibold break-words text-sm">{user.email}</div>
                  <div className="text-gray-500">@{formData.username}</div>
                  <div className="text-gray-600 mt-2">{formData.bio}</div>
                  <div className="text-gray-500 text-sm mt-1">Location: {formData.location}</div>
                  <div className="text-gray-500 text-sm">Timezone: {formData.timezone}</div>
                </>
              ) : (
                <div className="space-y-3">
                  <input
                    type="text"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleInputChange}
                    placeholder="Display Name"
                    className="w-full p-2 border rounded bg-white text-black"
                  />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Username"
                    className="w-full p-2 border rounded bg-white text-black"
                  />
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder="Bio/Description"
                    className="w-full p-2 border rounded bg-white text-black h-24"
                  />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Location (e.g., New York, USA)"
                    className="w-full p-2 border rounded bg-white text-black"
                  />
                  <select
                    name="timezone"
                    value={formData.timezone}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded bg-white text-black"
                  >
                    {timezones.map((tz) => (
                      <option key={tz} value={tz}>
                        {tz}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end gap-3 border-t pt-4">
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  onClick={() => setEditing(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={updating}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  {updating ? 'Saving...' : 'Save Changes'}
                </button>
              </>
            )}
            <button
              onClick={signOut}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
            >
              Sign Out
            </button>
          </div>
        </div>
        {/* Right Side */}
        <div className="md:col-span-2 bg-white rounded-xl shadow-md p-8">
          <h2 className="text-xl font-bold mb-4">Saved Trends</h2>
          {loadingTrends ? (
            <div className="text-center text-gray-500">Loading saved trends...</div>
          ) : savedTrends.length > 0 ? (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {savedTrends.map((trend) => (
                <div
                  key={trend.id}
                  className="p-4 rounded-lg bg-blue-50 border border-blue-100 shadow-sm relative"
                >
                  <button
                    onClick={() => handleUnsaveTrend(trend.url)}
                    className="absolute top-2 right-2 p-1 rounded-full text-xs bg-red-500 text-white hover:bg-red-600 transition-colors"
                    title="Remove from saved"
                  >
                    ✕
                  </button>
                  <a
                    href={trend.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block pr-8 hover:text-blue-700"
                  >
                    <div className="font-semibold text-blue-800 mb-2">
                      {trend.title}
                    </div>
                    <div className="text-xs text-gray-500 flex gap-4 mb-2">
                      <span>Score: {trend.score}</span>
                      <span>Comments: {trend.comments}</span>
                    </div>
                    <div className="text-xs text-blue-600">
                      <span>From: {trend.city}</span>
                      <span className="ml-4">Saved: {new Date(trend.saved_at).toLocaleDateString()}</span>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500">You haven't saved any trends yet. Start exploring to add some!</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
