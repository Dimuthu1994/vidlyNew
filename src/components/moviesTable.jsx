import React from "react";
import Like from "./common/like";
import Table from "./common/table";

function MoviesTable({ moviesPaginate, onLike, onDelete, onSort, sortColumn }) {
  //change from table to table
  let columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "Like",
      content: (movie) => (
        <Like liked={movie.liked} onToggle={() => onLike(movie)} />
      ),
    },
    {
      key: "delete",
      content: (movie) => (
        <button
          onClick={() => onDelete(movie._id)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];

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
