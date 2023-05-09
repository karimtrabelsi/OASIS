import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Test = () => {
  const [povertyMapHTML, setPovertyMapHTML] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/pauvrete');
        setPovertyMapHTML(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Carte de pauvreté en Tunisie</h1>
      <div dangerouslySetInnerHTML={{ __html: povertyMapHTML }}></div>
    </div>
  );
};

export default Test;
