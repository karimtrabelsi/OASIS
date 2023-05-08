import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiZW1uYTEyMzQiLCJhIjoiY2xoZmI5NzYwMTR1MjNkcGNyd2lodTlpcCJ9.x8fLgt1E8GboTvveDRBfhw';

const MapEvent = () => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const initializeMap = () => {
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [11.065337331154353, 35.50205837313591],
        zoom: 10
      });

      setMap(map);
    };

    if (!map) initializeMap();
  }, [map]);

  return (
    <div id="map" style={{ height: '100vh' }}>
      <h1>Carte de la Tunisie</h1>
    </div>
  );
};

export default MapEvent;












/*



import React, { useState } from "react";
import ReactMapGL, { Marker, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = 'pk.eyJ1IjoiZW1uYTEyMzQiLCJhIjoiY2xoZmI5NzYwMTR1MjNkcGNyd2lodTlpcCJ9.x8fLgt1E8GboTvveDRBfhw';

const MapEvent = () => {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: 35.50205837313591,
    longitude: 11.065337331154353,
    zoom: 10
  });

  const [marker, setMarker] = useState({
    longitude: 11.065337331154353,
    latitude: 35.50205837313591
  });

  const handleMarkerDragEnd = (event) => {
    const lngLat = event.lngLat;
    setMarker({
      longitude: lngLat[0],
      latitude: lngLat[1]
    });
  };

  const markerStyle = {
    width: "20px",
    height: "20px",
    backgroundColor: "red",
    borderRadius: "50%"
  };

  return (
    <div style={{ height: "100%" }}>
      <ReactMapGL
        {...viewport}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapboxApiAccessToken="pk.eyJ1IjoiZW1uYTEyMzQiLCJhIjoiY2xoZmI5NzYwMTR1MjNkcGNyd2lodTlpcCJ9.x8fLgt1E8GboTvveDRBfhw"
      >
        <Marker
          longitude={marker.longitude}
          latitude={marker.latitude}
          offsetLeft={-10}
          offsetTop={-10}
          draggable
          onDragEnd={handleMarkerDragEnd}
        >
          <div style={markerStyle}></div>
        </Marker>

        <div style={{ position: "absolute", right: 0 }}>
          <NavigationControl />
        </div>
      </ReactMapGL>
    </div>
  );
};

export default MapEvent; 
*/