import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNGI0MGEyMmRmYWY1NjNmMDgxZWM4OGU3OTljM2QzMyIsIm5iZiI6MTc0NDE1Njg5MC41NjksInN1YiI6IjY3ZjViOGRhMjQwZTY1OTk2ODk5NDY5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z2FHko5O6aBo9mpke6mgp-3CXUvSb3ZqQtpvzNOTDcY';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: TOKEN,
  },
});

export const getTrendingMovies = async () => {
  const response = await axiosInstance.get('/trending/movie/day');
  return response.data.results;
};

export const searchMovies = async (query) => {
  const response = await axiosInstance.get('/search/movie', {
    params: {
      query,
      include_adult: false,
      language: 'en-US',
      page: 1,
    },
  });
  return response.data.results;
};

export const getMovieDetails = async (id) => {
  const response = await axiosInstance.get(`/movie/${id}`);
  return response.data;
};

export const getMovieCredits = async (id) => {
  const response = await axiosInstance.get(`/movie/${id}/credits`);
  return response.data.cast;
};

export const getMovieReviews = async (id) => {
  const response = await axiosInstance.get(`/movie/${id}/reviews`);
  return response.data.results;
};
