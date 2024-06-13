import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import MoviesList from '../../components/MovieList/MovieList';

const MoviesPage = ({ onSubmit, movies }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === '') {
      toast.error('Please enter a search query.');
    } else {
      onSubmit(query);
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

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