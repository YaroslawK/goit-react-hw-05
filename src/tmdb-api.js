import axios from "axios";

const API_KEY = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMGNkZGJiNTkwMDVkNTlkNWRlMzYwNDJiMzZmNTA1YSIsInN1YiI6IjY2NjZlNmQ0ZTcxMDM0MDEwZmJlNzNjMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.f40TrbxKzUng_g9j2h-wUQWhskk1K5SESP7BATNGtlQ'

const BASE_URL = 'https://api.themoviedb.org/3';


const options = {
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMGNkZGJiNTkwMDVkNTlkNWRlMzYwNDJiMzZmNTA1YSIsInN1YiI6IjY2NjZlNmQ0ZTcxMDM0MDEwZmJlNzNjMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.f40TrbxKzUng_g9j2h-wUQWhskk1K5SESP7BATNGtlQ',
  },
};

export async function getMovies() {
  const url = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`;
  try {
    const response = await axios.get(url, options);
    return response.data;
  } catch (error) {
    console.error(error);
    return { results: [] };
  }
}

export async function searchMovies(query) {
  const url = `${BASE_URL}/search/movie?query=${query}&include_adult=false&language=en-US&page=1&api_key=${API_KEY}`;
  try {
    const response = await axios.get(url, options);
    return response.data;
  } catch (error) {
    console.error(error);
    return { results: [] };
  }
}

export async function getMovieDetails(movieId) {
  const url = `${BASE_URL}/movie/${movieId}`;
  try {
    const response = await axios.get(url, options);
    return response.data;
  } catch (error) {
    console.error(error);
    return { results: [] };
  }
}