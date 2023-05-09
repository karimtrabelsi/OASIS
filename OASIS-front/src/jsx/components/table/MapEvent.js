import React, { useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, {
  Marker,
  NavigationControl,
  Popup,
  FullscreenControl,
  GeolocateControl,
ZoomControl
} from "react-map-gl";

const MapEvent = () => {
  const [lng, setLng] = useState(11.065337331154353);
  const [lat, setLat] = useState(35.50205837313591);

  return (
    <div>
      <Map
        mapboxAccessToken="pk.eyJ1IjoiZW1uYTEyMzQiLCJhIjoiY2xoZmI5NzYwMTR1MjNkcGNyd2lodTlpcCJ9.x8fLgt1E8GboTvveDRBfhw"
        style={{
          width: "500px",
          height: "500px",
          borderRadius: "15px",
          border: "2px solid red",
        }}
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom:10
        }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
      >
        <Marker longitude={lng} latitude={lat} />
        <NavigationControl position="bottom-right" />
        <FullscreenControl />
        <GeolocateControl />
      </Map>
    </div>
  );
};

export default MapEvent;