import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import MapPage from "./pages/MapPage";
import LoginPage from "./pages/LoginPage";
import "mapbox-gl/dist/mapbox-gl.css";

// Component to handle authenticated routing
const AuthenticatedApp = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-white text-black flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route 
            path="/login" 
            element={user ? <Navigate to="/" replace /> : <LoginPage />} 
          />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <MapPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/foryou" 
            element={
              <ProtectedRoute>
                <div className="h-full flex items-center justify-center">
                  <h1 className="text-2xl text-gray-600">For You page coming soon!</h1>
                </div>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/account" 
            element={
              <ProtectedRoute>
                <div className="h-full flex items-center justify-center">
                  <h1 className="text-2xl text-gray-600">Account page coming soon!</h1>
                </div>
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AuthenticatedApp />
      </AuthProvider>
    </Router>
  );
}

export default App;
