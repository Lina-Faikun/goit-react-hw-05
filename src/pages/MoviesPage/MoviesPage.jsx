import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';
import styles from './MoviesPage.module.css';

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const query = searchParams.get('query') || '';

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie`,
          {
            params: {
              query: query,
              include_adult: false,
              language: 'en-US',
              page: 1,
            },
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNGI0MGEyMmRmYWY1NjNmMDgxZWM4OGU3OTljM2QzMyIsIm5iZiI6MTc0NDE1Njg5MC41NjksInN1YiI6IjY3ZjViOGRhMjQwZTY1OTk2ODk5NDY5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z2FHko5O6aBo9mpke6mgp-3CXUvSb3ZqQtpvzNOTDcY`, 
            },
          }
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSubmit = e => {
    e.preventDefault();
    const trimmed = searchTerm.trim();
    if (trimmed) {
      setSearchParams({ query: trimmed });
      setSearchTerm('');
    }
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit} className={styles.searchBar}>
        <input
          className={styles.input}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          type="text"
          placeholder="Search movies"
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>

      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
