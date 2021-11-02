import React, { useState } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Like from "./like";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./listGroup";

function Movies(props) {
  let [movies, setMovies] = useState(getMovies());
  let [genres, setGenres] = useState(getGenres());
  let [currentPage, setCurrentPage] = useState(1);
  let [selectGenre, setSelectGenre] = useState(null);
  let pageSize = 4;

  let handleDelete = (id) => {
    const fMovies = movies.filter((m) => m._id !== id);
    setMovies(fMovies);
  };

  let handleLike = (movie) => {
    let lmovies = [...movies];
    const index = lmovies.indexOf(movie);
    lmovies[index] = { ...lmovies[index] };
    lmovies[index].liked = !lmovies[index].liked;
    setMovies(lmovies);
  };

  let handlePageChange = (page) => {
    setCurrentPage(page);
  };

  let handleGenreSelect = (genre) => {
    setSelectGenre(genre);
  };

  if (movies.length === 0) return <p>There are zero movies in the database</p>;
  const moviesPaginate = paginate(movies, currentPage, pageSize);
  return (
    <div className="row">
      <div className="col-3">
        <ListGroup
          items={genres}
          onItemSelect={handleGenreSelect}
          selectGenre={selectGenre}
          textProperty="name"
          valueProperty="_id"
        />
      </div>

      <div className="col">
        <p>Showing {movies.length} in the database</p>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {moviesPaginate.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like
                    liked={movie.liked}
                    onToggle={() => handleLike(movie)}
                  />
                </td>
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

        <Pagination
          itemsCount={movies.length}
          pageSize={4}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

export default Movies;
