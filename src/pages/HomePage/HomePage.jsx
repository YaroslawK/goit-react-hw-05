import { useEffect, useState } from "react";
import MoviesList from "../../components/MovieList/MovieList";
import css from './HomePage.module.css';
import { getMovies } from "../../tmdb-api";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  const fetchTrendingMovies = async () => {
    const data = await getMovies();
    setMovies(data.results);
  };

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  return (
    <>
      <h1 className={css.homePageTitle}>Trending today</h1>
      <MoviesList movies={movies} />
    </>
  );
}

export default HomePage;