import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './MovieReviews.module.css';

const MovieReviews = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}/reviews`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNGI0MGEyMmRmYWY1NjNmMDgxZWM4OGU3OTljM2QzMyIsIm5iZiI6MTc0NDE1Njg5MC41NjksInN1YiI6IjY3ZjViOGRhMjQwZTY1OTk2ODk5NDY5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z2FHko5O6aBo9mpke6mgp-3CXUvSb3ZqQtpvzNOTDcY`,
        },
      })
      .then(response => setReviews(response.data.results))
      .catch(err => console.log(err));
  }, [movieId]);

  return (
    <div className={styles.movieReviews}>
      <h2>Reviews</h2>
      <ul>
        {reviews.map(review => (
          <li key={review.id}>{review.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
