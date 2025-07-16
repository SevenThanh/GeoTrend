import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1Ijoid2ppam9uMjIzIiwiYSI6ImNtZDY0dDkxdTA2ZHUyanEyZWV5NXBnNGYifQ.55-IA8r-KG8di_-s-CLunw";

const MapPage = () => {
  const [map, setMap] = useState(null);

  // Major US cities data
  const majorCities = [
    {
      name: "New York City",
      coordinates: [-74.006, 40.7128],
      population: "8.3M",
      state: "New York",
      description: "The largest city in the US and a global financial hub.",
      trend: "Tech startups growing 15% YoY"
    },
    {
      name: "Los Angeles",
      coordinates: [-118.2437, 34.0522],
      population: "4.0M",
      state: "California",
      description: "Entertainment capital and major west coast hub.",
      trend: "Entertainment industry up 8%"
    },
    {
      name: "Chicago",
      coordinates: [-87.6298, 41.8781],
      population: "2.7M",
      state: "Illinois",
      description: "Major financial and transportation center.",
      trend: "Manufacturing growth 12%"
    },
    {
      name: "Houston",
      coordinates: [-95.3698, 29.7604],
      population: "2.3M",
      state: "Texas",
      description: "Energy capital and major port city.",
      trend: "Energy sector expanding 18%"
    },
    {
      name: "Phoenix",
      coordinates: [-112.0740, 33.4484],
      population: "1.7M",
      state: "Arizona",
      description: "Fastest growing major city in the US.",
      trend: "Population growth 22% in 5 years"
    },
    {
      name: "Philadelphia",
      coordinates: [-75.1652, 39.9526],
      population: "1.6M",
      state: "Pennsylvania",
      description: "Historic city and major east coast hub.",
      trend: "Healthcare sector up 14%"
    },
    {
      name: "San Antonio",
      coordinates: [-98.4936, 29.4241],
      population: "1.5M",
      state: "Texas",
      description: "Military and tourism center.",
      trend: "Tourism revenue up 25%"
    },
    {
      name: "San Diego",
      coordinates: [-117.1611, 32.7157],
      population: "1.4M",
      state: "California",
      description: "Biotech and military hub with perfect weather.",
      trend: "Biotech industry growing 20%"
    },
    {
      name: "Dallas",
      coordinates: [-96.7970, 32.7767],
      population: "1.3M",
      state: "Texas",
      description: "Major business and financial center.",
      trend: "Corporate relocations up 30%"
    },
    {
      name: "San Jose",
      coordinates: [-121.8863, 37.3382],
      population: "1.0M",
      state: "California",
      description: "Heart of Silicon Valley.",
      trend: "AI startups increased 45%"
    },
    {
      name: "Austin",
      coordinates: [-97.7431, 30.2672],
      population: "965K",
      state: "Texas",
      description: "Tech hub and music capital.",
      trend: "Tech jobs up 35%"
    },
    {
      name: "Jacksonville",
      coordinates: [-81.6557, 30.3322],
      population: "950K",
      state: "Florida",
      description: "Major port and logistics center.",
      trend: "Logistics growth 16%"
    },
    {
      name: "Fort Worth",
      coordinates: [-97.3308, 32.7555],
      population: "935K",
      state: "Texas",
      description: "Cultural and business center.",
      trend: "Cultural tourism up 28%"
    },
    {
      name: "Columbus",
      coordinates: [-82.9988, 39.9612],
      population: "905K",
      state: "Ohio",
      description: "Education and government hub.",
      trend: "Education sector growing 11%"
    },
    {
      name: "Seattle",
      coordinates: [-122.3321, 47.6062],
      population: "750K",
      state: "Washington",
      description: "Tech giant headquarters and coffee culture.",
      trend: "Cloud computing jobs up 40%"
    },
    {
      name: "Denver",
      coordinates: [-104.9903, 39.7392],
      population: "715K",
      state: "Colorado",
      description: "Mile high city and outdoor recreation hub.",
      trend: "Green energy sector up 33%"
    },
    {
      name: "Boston",
      coordinates: [-71.0589, 42.3601],
      population: "685K",
      state: "Massachusetts",
      description: "Education and biotech capital.",
      trend: "Biomedical research up 24%"
    },
    {
      name: "Nashville",
      coordinates: [-86.7816, 36.1627],
      population: "670K",
      state: "Tennessee",
      description: "Music city and healthcare hub.",
      trend: "Music industry revenue up 19%"
    },
    {
      name: "Detroit",
      coordinates: [-83.0458, 42.3314],
      population: "670K",
      state: "Michigan",
      description: "Motor city undergoing urban renewal.",
      trend: "EV manufacturing up 50%"
    },
    {
      name: "Miami",
      coordinates: [-80.1918, 25.7617],
      population: "470K",
      state: "Florida",
      description: "International gateway and finance hub.",
      trend: "Fintech growth 42%"
    }
  ];

  useEffect(() => {
    const mapInstance = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-98.5795, 39.8283], // Center of US
      zoom: 4,
      antialias: true,
    });

    // Add navigation controls
    mapInstance.addControl(new mapboxgl.NavigationControl(), 'top-right');
    mapInstance.addControl(new mapboxgl.FullscreenControl(), 'top-right');
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
    mapInstance.addControl(new mapboxgl.ScaleControl({
      maxWidth: 100,
      unit: 'metric'
    }), 'bottom-left');

    mapInstance.on('load', () => {
      // Create GeoJSON data for cities
      const citiesGeoJSON = {
        type: 'FeatureCollection',
        features: majorCities.map(city => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: city.coordinates
          },
          properties: {
            name: city.name,
            state: city.state,
            population: city.population,
            description: city.description,
            trend: city.trend
          }
        }))
      };

      // Add cities data source
      mapInstance.addSource('cities', {
        type: 'geojson',
        data: citiesGeoJSON
      });

      // Add circle layer for city markers
      mapInstance.addLayer({
        id: 'cities-circles',
        type: 'circle',
        source: 'cities',
        paint: {
          'circle-radius': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            12,
            8
          ],
          'circle-color': '#3B82F6',
          'circle-stroke-color': '#ffffff',
          'circle-stroke-width': 2,
          'circle-opacity': 0.9,
          'circle-stroke-opacity': 1
        }
      });

      // Add labels layer for city names
      mapInstance.addLayer({
        id: 'cities-labels',
        type: 'symbol',
        source: 'cities',
        layout: {
          'text-field': ['get', 'name'],
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-offset': [0, 1.25],
          'text-anchor': 'top',
          'text-size': 12
        },
        paint: {
          'text-color': '#1f2937',
          'text-halo-color': '#ffffff',
          'text-halo-width': 1
        }
      });

      // Variable to track hover state
      let hoveredCityId = null;

      // Add hover effects
      mapInstance.on('mouseenter', 'cities-circles', (e) => {
        mapInstance.getCanvas().style.cursor = 'pointer';
        
        if (e.features.length > 0) {
          if (hoveredCityId !== null) {
            mapInstance.setFeatureState(
              { source: 'cities', id: hoveredCityId },
              { hover: false }
            );
          }
          hoveredCityId = e.features[0].id;
          mapInstance.setFeatureState(
            { source: 'cities', id: hoveredCityId },
            { hover: true }
          );
        }
      });

      mapInstance.on('mouseleave', 'cities-circles', () => {
        mapInstance.getCanvas().style.cursor = 'grab';
        
        if (hoveredCityId !== null) {
          mapInstance.setFeatureState(
            { source: 'cities', id: hoveredCityId },
            { hover: false }
          );
        }
        hoveredCityId = null;
      });

      // Add click event for popups
      mapInstance.on('click', 'cities-circles', (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const properties = e.features[0].properties;

        // Create popup content
        const popupContent = `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 220px;">
            <div style="background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%); color: white; padding: 12px; margin: -15px -15px 0 -15px; border-radius: 8px;">
              <h3 style="margin: 0; font-size: 18px; font-weight: 700;">${properties.name}</h3>
              <p style="margin: 4px 0 0 0; font-size: 14px; opacity: 0.9;">${properties.state} • Population: ${properties.population}</p>
            </div>
          </div>
        `;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup({
          offset: 25,
          closeButton: true,
          closeOnClick: true,
          maxWidth: '300px'
        })
        .setLngLat(coordinates)
        .setHTML(popupContent)
        .addTo(mapInstance);
      });

      // General map hover effects
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
      
      {/* Map Legend */}
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-xs">
        <h3 className="text-sm font-semibold text-gray-800 mb-2">Major US Cities</h3>
        <div className="flex items-center mb-2">
          <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white shadow-md mr-2"></div>
          <span className="text-xs text-gray-600">Click markers for city insights</span>
        </div>
        <p className="text-xs text-gray-500">
          Explore trending data and demographics for {majorCities.length} major cities across the United States.
        </p>
      </div>
    </div>
  );
};

export default MapPage;
