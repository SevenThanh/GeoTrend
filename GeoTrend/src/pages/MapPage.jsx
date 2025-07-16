import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1Ijoid2ppam9uMjIzIiwiYSI6ImNtZDY0dDkxdTA2ZHUyanEyZWV5NXBnNGYifQ.55-IA8r-KG8di_-s-CLunw";

const MapPage = () => {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-74.5, 40],
      zoom: 9,
    });

    return () => map.remove();
  }, []);

  return <div id="map" className="h-96 w-full border" />;
};

export default MapPage;
