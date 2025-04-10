import { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { getMovieDetails } from '../../services/api';
import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkHref = location.state?.from || '/';

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovieDetails(movieId); // тут замінено id на movieId
        setMovie(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovie();
  }, [movieId]); // movieId використовуємо як залежність

  if (!movie) return <div>Loading...</div>;

  return (
    <div className={styles.detailsPage}>
      <Link className={styles.goBack} to={backLinkHref}>
        ← Go back
      </Link>
      <div className={styles.content}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
        />
        <div className={styles.info}>
          <h1>{movie.title}</h1>
          <p><strong>Overview:</strong> {movie.overview}</p>
          <p><strong>Genres:</strong> {movie.genres.map(g => g.name).join(', ')}</p>
          <p><strong>Rating:</strong> {movie.vote_average}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
