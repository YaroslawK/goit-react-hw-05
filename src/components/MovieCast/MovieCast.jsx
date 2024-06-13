import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCast } from '../../tmdb-api';

const MovieCast = () => {
  const { moviesId } = useParams();
    const [cast, setCast] = useState([]);
    console.log(cast);

  useEffect(() => {
    if (!moviesId) return;
    const fetchCast = async () => {
      const data = await getMovieCast(moviesId);
      setCast(data.cast);
    };
    fetchCast();
  }, [moviesId]);

  return (
    <div>
      <h2>Cast</h2>
      <ul>
        {cast.map(actor => (
          <li key={actor.id}>{actor.name} as {actor.character}</li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
