import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import MapPage from "./pages/MapPage";
import "mapbox-gl/dist/mapbox-gl.css";

function App() {
  return (
    <Router>
      <div className="h-screen w-screen bg-white text-black flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <Routes>
            <Route path="/" element={<MapPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
