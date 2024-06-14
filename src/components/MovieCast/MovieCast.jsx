import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCast } from '../../tmdb-api';
import css from './MovieCast.module.css'

const MovieCast = () => {
  const { moviesId } = useParams();
    const [cast, setCast] = useState([]);

  useEffect(() => {
    if (!moviesId) return;
    const fetchCast = async () => {
      const data = await getMovieCast(moviesId);
      setCast(data.cast);
    };
    fetchCast();
  }, [moviesId]);

  return (
    <div className={css.castContainer}>
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
