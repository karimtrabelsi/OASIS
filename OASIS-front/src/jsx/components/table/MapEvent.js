import React, { useEffect, useState } from "react";
import MapGL, {
  Marker,
  NavigationControl,
  FullscreenControl,
  GeolocateControl,
} from "react-map-gl";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

const MapEvent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const location = useLocation();

  const lt = new URLSearchParams(location.search).get("lat");
  const lo = new URLSearchParams(location.search).get("log");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("http://localhost:5000/api/events");
        setData(result.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/getEventById/${id}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (

    <div style={{ display: 'flex', justifyContent: 'center' }}>
    <div style={{ width: '500px', height: '500px', borderRadius: '15px', border: '2px solid red' }}>
      <div style={{ marginTop: '20px', padding: '10px' }}>
        {data.map((event) => (
          <div key={event._id}>
            <h1 style={{ fontSize: '24px', marginBottom: '10px', color: 'red', fontWeight: 'bold' }}>
              Title: {event.title}
            </h1>
            <p style={{ fontSize: '16px', color: 'red', fontWeight: 'bold' }}>
              Description: {event.description}
            </p>
            <img
              src={`http://localhost:3000/uploads/${event.photo}`}
              alt={event.title}
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        ))}
      </div>
      <MapGL
        mapboxAccessToken="pk.eyJ1IjoiZW1uYTEyMzQiLCJhIjoiY2xoZmI5NzYwMTR1MjNkcGNyd2lodTlpcCJ9.x8fLgt1E8GboTvveDRBfhw"
        style={{ width: '100%', height: '100%' }}
        longitude={lo}
        latitude={lt}
        zoom={7}
        mapStyle="mapbox://styles/mapbox/streets-v12"
      >
        <Marker longitude={lo} latitude={lt} />
        <NavigationControl position="bottom-right" />
        <FullscreenControl />
        <GeolocateControl />
      </MapGL>
    </div>
  </div>
  
  
  );
};

export default MapEvent;
