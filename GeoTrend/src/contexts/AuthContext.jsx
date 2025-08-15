import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../config/supabase';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription?.unsubscribe();
  }, []);

  const signUp = async (email, password, metadata = {}) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
        emailRedirectTo: 'https://geo-trend.vercel.app/login'
      }
    });
    return { data, error };
  };

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });
    return { data, error };
  };

  const signInWithGitHub = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });
    return { data, error };
  };

  const resetPassword = async (email) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    return { data, error };
  };
  const saveTrend = async (trendData, city, subreddit) => {
    if (!user) return { error: 'User not authenticated' };
    
    const { data, error } = await supabase
      .from('saved_trends')
      .insert({
        user_id: user.id,
        title: trendData.title,
        score: trendData.score,
        comments: trendData.comments,
        url: trendData.url,
        city: city,
        subreddit: subreddit
      });
    
    return { data, error };
  };

  const unsaveTrend = async (trendUrl) => {
    if (!user) return { error: 'User not authenticated' };
    
    const { data, error } = await supabase
      .from('saved_trends')
      .delete()
      .eq('user_id', user.id)
      .eq('url', trendUrl);
    
    return { data, error };
  };

  const getSavedTrends = async () => {
    if (!user) return { data: [], error: 'User not authenticated' };
    
    const { data, error } = await supabase
      .from('saved_trends')
      .select('*')
      .eq('user_id', user.id)
      .order('saved_at', { ascending: false });
    
    return { data, error };
  };

  const isTrendSaved = async (trendUrl) => {
    if (!user) return { data: false, error: null };
    
    const { data, error } = await supabase
      .from('saved_trends')
      .select('id')
      .eq('user_id', user.id)
      .eq('url', trendUrl)
      .single();
    
    return { data: !!data, error: error?.code === 'PGRST116' ? null : error };
  };


  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    signInWithGoogle,
    signInWithGitHub,
    resetPassword,
    saveTrend,
    unsaveTrend,
    getSavedTrends,
    isTrendSaved
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 