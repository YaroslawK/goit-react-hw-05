import { Link } from 'react-router-dom';
import css from './MovieList.module.css'

const MoviesList = ({ movies }) => {
  
  return (
    <>
      <div>
        <ul className={css.moviesList}>
          {movies.map((movie) => (
          <li key={movie.id} className={css.moviesListItem}>
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul></div>
    </>
  );
}


export default MoviesList;