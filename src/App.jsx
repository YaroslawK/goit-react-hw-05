import './App.css';
import { useState, useEffect, lazy, Suspense } from 'react';
import { getMovies } from './tmdb-api';
import { searchMovies } from './tmdb-api';
import { Routes, Route, useLocation} from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';


const MoviesDetailsPage = lazy(() => import('./pages/MoviesDetailspage/MoviesDetailsPage'))
const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage'))
const MovieCast = lazy(() => import('./components/MovieCast/MovieCast'))
const MovieReview = lazy(() => import('./components/MovieReview/MovieReview'))
const HomePage = lazy(() => import('./pages/HomePage/HomePage'))
const Navigation = lazy(() => import('./components/Navigation/Navigation'))


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
      <Suspense fallback='null'>
      <Routes>
        <Route path='/' element={<HomePage movies={movies} />} />
        <Route path='/movies' element={<MoviesPage onSubmit={onSubmit} movies={movies} />} />
        <Route path='/movies/:moviesId' element={<MoviesDetailsPage/>}>
          <Route path="cast" element={<MovieCast/>} />
          <Route path="review" element={<MovieReview />} />
        </Route>
        <Route path='*' element={<NotFoundPage/>}/>
        </Routes>
        </Suspense>
    </>
  );
}

export default App;