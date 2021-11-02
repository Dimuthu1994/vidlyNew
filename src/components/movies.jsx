import React, { useState } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";

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
    console.log(movie);
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
    setCurrentPage(1);
  };

  if (movies.length === 0) return <p>There are zero movies in the database</p>;

  const filteredMovies =
    selectGenre && selectGenre._id
      ? movies.filter((m) => m.genre._id === selectGenre._id)
      : movies;
  const moviesPaginate = paginate(filteredMovies, currentPage, pageSize);
  return (
    <div className="row">
      <div className="col-3">
        <ListGroup
          items={genres}
          onItemSelect={handleGenreSelect}
          selectGenre={selectGenre}
        />
      </div>

      <div className="col">
        <p>Showing {filteredMovies.length} in the database</p>
        <MoviesTable
          moviesPaginate={moviesPaginate}
          onLike={handleLike}
          onDelete={handleDelete}
        />

        <Pagination
          itemsCount={filteredMovies.length}
          pageSize={4}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

export default Movies;
