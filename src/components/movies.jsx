import React, { useState } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import _ from "lodash";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";

function Movies(props) {
  let [movies, setMovies] = useState(getMovies());
  let [genres, setGenres] = useState(getGenres());
  let [currentPage, setCurrentPage] = useState(1);
  let [selectGenre, setSelectGenre] = useState(null);
  let [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });
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

  let handleSort = (sortColumnClone) => {
    setSortColumn(sortColumnClone);
  };

  let getPagedData = () => {
    const filteredMovies =
      selectGenre && selectGenre._id
        ? movies.filter((m) => m.genre._id === selectGenre._id)
        : movies;

    const sorted = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );
    const moviesPaginate = paginate(sorted, currentPage, pageSize);
    return { totalCount: filteredMovies.length, data: moviesPaginate };
  };

  if (movies.length === 0) return <p>There are zero movies in the database</p>;

  const { totalCount, data } = getPagedData();
  //
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
        <p>Showing {totalCount} in the database</p>
        <MoviesTable
          moviesPaginate={data}
          onLike={handleLike}
          onDelete={handleDelete}
          onSort={handleSort}
          sortColumn={sortColumn}
        />

        <Pagination
          itemsCount={totalCount}
          pageSize={4}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

export default Movies;
