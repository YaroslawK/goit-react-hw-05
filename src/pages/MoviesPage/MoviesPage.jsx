import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import MoviesList from '../../components/MovieList/MovieList';
import { searchMovies } from '../../tmdb-api';
import { useSearchParams } from 'react-router-dom';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const fetchSearchMovies = async (searchQuery) => {
    if (!searchQuery) return;
    const data = await searchMovies(searchQuery);
    setMovies(data.results);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = searchParams.get('query') || '';
    if (query.trim() === '') {
      toast.error('Please enter a search query.');
    } else {
      setSearchParams({ query });
    }
  };

  const handleChange = (e) => {
    setSearchParams({ query: e.target.value });
  };

  useEffect(() => {
    const queryParam = searchParams.get('query');
    if (queryParam) {
      fetchSearchMovies(queryParam);
    } else {
      setMovies([]);
    }
  }, [searchParams]);

  return (
    <>
      <Toaster />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
          value={searchParams.get('query') || ''}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
      <MoviesList movies={movies} />
    </>
  );
}

export default MoviesPage