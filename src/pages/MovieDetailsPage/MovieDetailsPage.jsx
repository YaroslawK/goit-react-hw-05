import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { getMovieDetails } from "../../tmdb-api";
import css from './MovieDetailsPage.module.css'

const MoviesDetailsPage = () => {
  const { moviesId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (!moviesId) return;
    const fetchMovieDetails = async () => {
      const data = await getMovieDetails(moviesId);
      setMovie(data);
    };
    fetchMovieDetails();
  }, [moviesId]);

  
  
  const location = useLocation();
  const saveLocation = useRef(location.state ?? '/movies');
    
    const baseImageURL = 'https://image.tmdb.org/t/p/w200';
  const defaultImg = 'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';


  return (
    <div>
      <Link to={saveLocation.current}>Go Back</Link>
      {movie ? (
        <div className={css.movieDetailsContainer}>
          <h1>{movie.title}</h1>
          <img
            className={css.img}
              src={movie.poster_path ? `${baseImageURL}${movie.poster_path}` : defaultImg}
              width={500}
              height={300}
              alt={movie.title}
              onError={(e) => { e.target.onerror = null; e.target.src = defaultImg; }}
            />
          <p>{movie.overview}</p>
          <p>Release Date: {movie.release_date}</p>
            <p>Rating: {movie.vote_average}</p>
            <nav>
            <ul>
              <li>
                <Link to="cast">Cast</Link>
              </li>
              <li>
                <Link to="review">Review</Link>
              </li>
            </ul>
          </nav>
          <Outlet/>

        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}


export default MoviesDetailsPage;