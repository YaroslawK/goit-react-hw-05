import './App.css';
import { useState, useEffect } from 'react';
import { getMovies } from './tmdb-api';
import { searchMovies } from './tmdb-api';
import HomePage from './pages/HomePage/HomePage';
import { Routes, Route, useLocation} from 'react-router-dom';
import MoviesPage from './pages/MoviesPage/MoviesPage';
import Navigation from './components/Navigation/Navigation';
import MoviesDetailsPage from './pages/MoviesDetailspage/MoviesDetailsPage';


function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const location = useLocation();

  const fetchTrandMovies = async () => {
    const data = await getMovies();
    setMovies(data.results);
  }

  const fetchSearchMovies = async (query) => {
    if (!query) return;
    const data = await searchMovies(query);
    setMovies(data.results);
  }

  useEffect(() => {
    if (query) {
      fetchSearchMovies(query);
    } else if (location.pathname === '/') {
      fetchTrandMovies();
    }
  }, [query, location.pathname]);

  const onSubmit = (searchQuery) => {
    if (searchQuery !== query) {
      setQuery(searchQuery);
      setMovies([]);
    }
  };

  useEffect(() => {
    if (location.pathname === '/') {
      setQuery(''); 
    } else if (location.pathname === '/movies') {
      setMovies([]);
    }
  }, [location.pathname]);
  return (
    <>
      <Navigation />
      <Routes>
        <Route path='/' element={<HomePage movies={movies} />} />
        <Route path='/movies' element={<MoviesPage onSubmit={onSubmit} movies={movies} />} />
        <Route path='/movies/:moviesId' element={<MoviesDetailsPage/>} />
      </Routes>
    </>
  );
}

export default App;