import './App.css';
import { lazy, Suspense } from 'react';

import { Routes, Route} from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';


const MoviesDetailsPage = lazy(() => import('./pages/MoviesDetailsPage/MoviesDetailsPage'))
const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage'))
const MovieCast = lazy(() => import('./components/MovieCast/MovieCast'))
const MovieReview = lazy(() => import('./components/MovieReview/MovieReview'))
const HomePage = lazy(() => import('./pages/HomePage/HomePage'))
const Navigation = lazy(() => import('./components/Navigation/Navigation'))


function App() {
  
  return (
    <>
      <Navigation />
      <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/movies' element={<MoviesPage />} />
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