import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1Ijoid2ppam9uMjIzIiwiYSI6ImNtZDY0dDkxdTA2ZHUyanEyZWV5NXBnNGYifQ.55-IA8r-KG8di_-s-CLunw";

const MapPage = () => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const mapInstance = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-74.5, 40],
      zoom: 9,
      antialias: true, // Enable for smoother rendering
    });

    // Add navigation controls (zoom in/out, compass)
    mapInstance.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add fullscreen control
    mapInstance.addControl(new mapboxgl.FullscreenControl(), 'top-right');

    // Add geolocate control (find user's location)
    mapInstance.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserHeading: true
      }),
      'top-right'
    );

    // Add scale control
    mapInstance.addControl(new mapboxgl.ScaleControl({
      maxWidth: 100,
      unit: 'metric'
    }), 'bottom-left');

    // Add some interaction handlers
    mapInstance.on('load', () => {
      // Example: Add a custom marker
      new mapboxgl.Marker({
        color: '#3B82F6',
        scale: 1.2
      })
      .setLngLat([-74.5, 40])
      .setPopup(new mapboxgl.Popup({ offset: 25 })
        .setHTML('<h3>Welcome to GeoTrend!</h3><p>Explore global trends on this interactive map.</p>'))
      .addTo(mapInstance);

      // Example: Add hover effects
      mapInstance.on('mouseenter', () => {
        mapInstance.getCanvas().style.cursor = 'grab';
      });

      mapInstance.on('mousedown', () => {
        mapInstance.getCanvas().style.cursor = 'grabbing';
      });

      mapInstance.on('mouseup', () => {
        mapInstance.getCanvas().style.cursor = 'grab';
      });
    });

    setMap(mapInstance);

    return () => mapInstance.remove();
  }, []);

  return (
    <div className="relative h-full w-full">
      {/* Map Container */}
      <div id="map" className="h-full w-full" />
    </div>
  );
};

export default MapPage;
