import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import MoviesList from '../../components/MovieList/MovieList';
import { getMovies, searchMovies } from '../../tmdb-api';
import { useLocation, useSearchParams } from 'react-router-dom';

const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const fetchTrendingMovies = async () => {
    const data = await getMovies();
    setMovies(data.results);
  };

  const fetchSearchMovies = async (searchQuery) => {
    const data = await searchMovies(searchQuery);
    setMovies(data.results);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === '') {
      toast.error('Please enter a search query.');
    } else {
      setSearchParams({ query });
      fetchSearchMovies(query);
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const queryParam = searchParams.get('query');
    if (queryParam) {
      setQuery(queryParam);
      fetchSearchMovies(queryParam);
    } else if (location.pathname === '/movies') {
      fetchTrendingMovies();
    }
  }, [location.pathname, searchParams]);

  return (
    <>
      <Toaster />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
          value={query}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
      <MoviesList movies={movies} />
    </>
  );
}

export default MoviesPage