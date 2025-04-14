import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import axios from 'axios';
import styles from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams(); 
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNGI0MGEyMmRmYWY1NjNmMDgxZWM4OGU3OTljM2QzMyIsIm5iZiI6MTc0NDE1Njg5MC41NjksInN1YiI6IjY3ZjViOGRhMjQwZTY1OTk2ODk5NDY5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z2FHko5O6aBo9mpke6mgp-3CXUvSb3ZqQtpvzNOTDcY`,
            },
          }
        );
        setReviews(response.data.results);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
        console.error('Error fetching reviews:', err);
      }
    };

    fetchReviews();
  }, [movieId]);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>Error fetching reviews data.</p>;

  return (
    <div className={styles.movieReviews}>
      <h2>Reviews</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <strong>{review.author}</strong>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
