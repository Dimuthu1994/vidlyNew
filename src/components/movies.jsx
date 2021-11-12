import React, { useState, useEffect } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import _ from "lodash";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import SearchBox from "./common/searchBox";
import MoviesTable from "./moviesTable";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Movies({ user }) {
  let [movies, setMovies] = useState([]);
  let [genres, setGenres] = useState([]);

  let [currentPage, setCurrentPage] = useState(1);
  let [selectGenre, setSelectGenre] = useState(null);
  let [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });
  let [searchQuery, setSearchQuery] = useState("");

  let pageSize = 4;

  useEffect(() => {
    //new function returns a promise we cant spread it like this
    //const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    async function getDataFromDB() {
      const { data } = await getGenres();
      const genres = [{ _id: "", name: "All Genres" }, ...data];
      setGenres(genres);

      const { data: movies } = await getMovies();
      setMovies(movies);
    }

    getDataFromDB();
  }, []);

  let handleDelete = async (id) => {
    const originalMovies = movies;
    const fMovies = originalMovies.filter((m) => m._id !== id);
    setMovies(fMovies);

    try {
      await deleteMovie(id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This movie has already been deleted");
      setMovies(originalMovies);
    }
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
    setSearchQuery("");
  };

  let handleSort = (sortColumnClone) => {
    setSortColumn(sortColumnClone);
  };

  let getPagedData = () => {
    let filteredMovies = movies;
    if (searchQuery)
      filteredMovies = movies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectGenre && selectGenre._id)
      filteredMovies = movies.filter((m) => m.genre._id === selectGenre._id);

    const sorted = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );
    const moviesPaginate = paginate(sorted, currentPage, pageSize);
    return { totalCount: filteredMovies.length, data: moviesPaginate };
  };

  let handleSearch = (query) => {
    setSearchQuery(query);
    setSelectGenre(null);
    setCurrentPage(1);
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
        {user && (
          <Link
            className="btn btn-primary"
            to="/movies/new"
            style={{ marginBottom: 20 }}
          >
            New Movie
          </Link>
        )}
        <p>Showing {totalCount} in the database</p>
        <SearchBox value={searchQuery} onChange={handleSearch} />
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
