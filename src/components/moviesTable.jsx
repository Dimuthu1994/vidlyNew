import React from "react";
import { Link } from "react-router-dom";
import Like from "./common/like";
import Table from "./common/table";
import { getCurrentUser } from "../services/authService";

function MoviesTable({ moviesPaginate, onLike, onDelete, onSort, sortColumn }) {
  //change from table to table
  let columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "Like",
      content: (movie) => (
        <Like liked={movie.liked} onToggle={() => onLike(movie)} />
      ),
    },
  ];

  const user = getCurrentUser();
  if (user && user.isAdmin)
    columns.push({
      key: "Delete",
      content: (movie) => (
        <button
          onClick={() => onDelete(movie)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    });

  return (
    <Table
      columns={columns}
      data={moviesPaginate}
      sortColumn={sortColumn}
      onSort={onSort}
    />
  );
}

export default MoviesTable;
