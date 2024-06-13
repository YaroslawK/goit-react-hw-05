import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { getMovieDetails } from "../../tmdb-api";

const MoviesDetailsPage = () => {
  const { moviesId } = useParams();
  const [movie, setMovie] = useState(null);
    const navigate = useNavigate();

  useEffect(() => {
    if (!moviesId) return;
    const fetchMovieDetails = async () => {
      const data = await getMovieDetails(moviesId);
      setMovie(data);
    };
    fetchMovieDetails();
  }, [moviesId]);

  const handleGoBack = () => {
    navigate(-1);
    };
    
    const baseImageURL = 'https://image.tmdb.org/t/p/w200';
  const defaultImg = 'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';


  return (
    <div>
      <button onClick={handleGoBack}>Go Back</button>
      {movie ? (
        <div>
          <h1>{movie.title}</h1>
          <img
              src={movie.poster_path ? `${baseImageURL}${movie.poster_path}` : defaultImg}
              width={250}
              height={150}
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