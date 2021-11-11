import http from "./httpService";
import config from "../config.json";
const apiEndpoint = config.apiUrl + "/movies";

function getMovieUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getMovies() {
  return http.get(apiEndpoint);
}

export function deleteMovie(movieId) {
  return http.delete(getMovieUrl(movieId));
}

export function getMovie(movieId) {
  return http.get(getMovieUrl(movieId));
}

export function saveMovie(movie) {
  //movie update
  //db dont like id property in body
  // so we have to delete id
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(getMovieUrl(movie._id), body);
  }

  //movie create
  return http.post(apiEndpoint, movie);
}
