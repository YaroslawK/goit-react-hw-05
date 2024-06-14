import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css'


const MoviesList = ({ movies }) => {

  const location = useLocation();
  
  return (
    <>
      <div>
        <ul className={css.moviesList}>
          {movies.map((movie) => (
          <li key={movie.id} className={css.moviesListItem}>
            <Link to={`/movies/${movie.id}`} state={location}>{movie.title}</Link>
          </li>
        ))}
      </ul></div>
    </>
  );
}


export default MoviesList;