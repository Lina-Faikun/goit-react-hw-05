import { useState } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';
import styles from './MoviesPage.module.css';

const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearch = () => {
    if (query) {
      axios
        .get(`https://api.themoviedb.org/3/search/movie?query=${query}`, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNGI0MGEyMmRmYWY1NjNmMDgxZWM4OGU3OTljM2QzMyIsIm5iZiI6MTc0NDE1Njg5MC41NjksInN1YiI6IjY3ZjViOGRhMjQwZTY1OTk2ODk5NDY5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z2FHko5O6aBo9mpke6mgp-3CXUvSb3ZqQtpvzNOTDcY`,
          },
        })
        .then(response => setMovies(response.data.results))
        .catch(err => console.log(err));
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchBar}>
        <input
          type="text"
          className={styles.input}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
        />
        <button className={styles.button} onClick={handleSearch}>
          Search
        </button>
      </div>

      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
