import React, { useEffect, useState } from 'react';
import api from '../services/api';

function ShowMangas() {
  const [mangas, setMangas] = useState([]);

  useEffect(() => {
    api.get('/mangas')
      .then(response => setMangas(response.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Lista de Mangás</h2>
      <ul>
        {mangas.map(manga => (
          <li key={manga.id}>{manga.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default ShowMangas;
