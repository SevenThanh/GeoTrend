import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase/supabaseClient';
import TrendCard from '../components/TrendCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { fetchTrends } from '../services/api';


const ForYouPage = () => {
  const [trends, setTrends] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLocationAndTrends = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      let lat, lng;

      if (user) {
        const { data } = await supabase.from('preferences').select('zip_code').eq('user_id', user.id);
        if (data && data[0]?.zip_code) {
          // Placeholder: Convert zip to lat/lng
          lat = 40.7128; lng = -74.0060; // Example: New York
        }
      }

      if (!lat || !lng) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            lat = pos.coords.latitude;
            lng = pos.coords.longitude;
            fetchData(lat, lng);
          },
          () => setError('Geolocation not available')
        );
      } else {
        fetchData(lat, lng);
      }
    };

    const fetchData = (lat, lng) => {
      fetchTrends(lat, lng)
        .then(data => setTrends(data))
        .catch(err => setError('No trends available'))
        .finally(() => setLoading(false));
    };

    getLocationAndTrends();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500 p-4">{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">For You</h1>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {trends?.twitter.map((trend, i) => <TrendCard key={i} data={trend} />)}
        {trends?.google.map((trend, i) => <TrendCard key={i} data={trend} />)}
        {trends?.news.map((item, i) => <TrendCard key={i} data={item} />)}
        {trends?.reddit.map((post, i) => <TrendCard key={i} data={post} />)}
      </section>
    </div>
  );
};

export default ForYouPage;
