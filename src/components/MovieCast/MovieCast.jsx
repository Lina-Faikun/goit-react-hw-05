import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './MovieCast.module.css';

const MovieCast = ({ movieId }) => {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNGI0MGEyMmRmYWY1NjNmMDgxZWM4OGU3OTljM2QzMyIsIm5iZiI6MTc0NDE1Njg5MC41NjksInN1YiI6IjY3ZjViOGRhMjQwZTY1OTk2ODk5NDY5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z2FHko5O6aBo9mpke6mgp-3CXUvSb3ZqQtpvzNOTDcY`,
        },
      })
      .then(response => setCast(response.data.cast))
      .catch(err => console.log(err));
  }, [movieId]);

  return (
    <div className={styles.movieCast}>
      <h2>Cast</h2>
      <ul>
        {cast.map(actor => (
          <li key={actor.id}>{actor.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
