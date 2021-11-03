import React from "react";
import Like from "./common/like";

import TableBody from "./common/tabeBody";
import TableHeader from "./common/tableHeader";
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
    <table className="table">
      <TableHeader onSort={onSort} sortColumn={sortColumn} columns={columns} />

      <TableBody
        data={moviesPaginate}
        onLike={onLike}
        onDelete={onDelete}
        columns={columns}
      />
    </table>
  );
}

export default MoviesTable;
