import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../../tmdb-api';
import css from './MovieReview.module.css';

const MovieReview = () => {
  const { moviesId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!moviesId) return;
    const fetchReviews = async () => {
      const data = await getMovieReviews(moviesId);
      setReviews(data.results);
    };
    fetchReviews();
  }, [moviesId]);

  return (
    <div className={css.reviewContainer}>
      <h2>Reviews</h2>
      <ul>
        {reviews.map(review => (
          <li key={review.id}>
            <p>Author: {review.author}</p>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReview;
