// The config file where I save configurations for the API
// That I use to bring movies information and images

const BASE_API_URL = "https://api.themoviedb.org/3";
const API_KEY = "?api_key=5a652d0e61ec1f47cb6bd87bd1fd8868";

// The base url when requesting images
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";
// The size of the backdrop image if we want to get one
const IMAGE_BACKDROP_SIZE = "w1280";
// The size of the poster image if we want to get one
const IMAGE_POSTER_SIZE = "w342";

export {
  BASE_API_URL,
  API_KEY,
  IMAGE_BASE_URL,
  IMAGE_BACKDROP_SIZE,
  IMAGE_POSTER_SIZE,
};
