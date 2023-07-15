import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyfirstComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:4000/api/endpoint')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      {data ? (
        <div>
          <h1>Respuesta del servidor:</h1>
          <p>{data.message}</p>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default MyfirstComponent;