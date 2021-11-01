import React, { useState } from "react";
import { getMovies } from "../services/fakeMovieService";

function Movies(props) {
  let [movies, setMovies] = useState(getMovies());

  let handleDelete = (id) => {
    const fMovies = movies.filter((m) => m._id !== id);
    setMovies(fMovies);
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Genre</th>
          <th>Stock</th>
          <th>Rate</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {movies.map((movie) => (
          <tr key={movie._id}>
            <td>{movie.title}</td>
            <td>{movie.genre.name}</td>
            <td>{movie.numberInStock}</td>
            <td>{movie.dailyRentalRate}</td>
            <td>
              <button
                onClick={() => handleDelete(movie._id)}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Movies;
