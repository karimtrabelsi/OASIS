import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const ListeEvent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/getAllEvent")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
    {data.map((event, index) => (
      <React.Fragment key={event._id}>
        <div className="card" style={{ width: '18rem', margin: '10px' }}>
          <img
            src={`http://localhost:3000/uploads/${event.photo}`}
            alt={event.title}
            className="img-fluid"
            style={{ width: '100%', height: 'auto' }}
          />
          <div className="card-body">
            <h5 className="card-title">{event.title}</h5>
            <p className="card-text">{event.description}</p>
            <Link to={`/map/${event._id}?lat=${event.latitude}&log=${event.longitude}`}>
              Details
            </Link>
          </div>
        </div>
        {index % 3 === 2 && <div style={{ flexBasis: '100%' }}></div>} 
      </React.Fragment>
    ))}
  </div>
  
   
  
  );
};

export default ListeEvent;
