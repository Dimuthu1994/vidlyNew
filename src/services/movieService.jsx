import http from "./httpService";
import config from "../config.json";
const apiEndpoint = config.apiUrl + "/movies";

export function getMovies() {
  return http.get(apiEndpoint);
}

export function deleteMovie(movieId) {
  return http.delete(apiEndpoint + "/" + movieId);
}

export function getMovie(movieId) {
  return http.get(apiEndpoint + "/" + movieId);
}

export function saveMovie(movie) {
  //movie update
  //db dont like id property in body
  // so we have to delete id
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(apiEndpoint + "/" + movie._id, movie);
  }

  //movie create
  return http.post(apiEndpoint, movie);
}
