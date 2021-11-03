import React from "react";
import Like from "./common/like";
import TableHeader from "./common/tableHeader";
function MoviesTable({ moviesPaginate, onLike, onDelete, onSort, sortColumn }) {
  //change from table to table
  let columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    { key: "Like" },
    { key: "delete" },
  ];

  return (
    <table className="table">
      <TableHeader onSort={onSort} sortColumn={sortColumn} columns={columns} />
      <tbody>
        {moviesPaginate.map((movie) => (
          <tr key={movie._id}>
            <td>{movie.title}</td>
            <td>{movie.genre.name}</td>
            <td>{movie.numberInStock}</td>
            <td>{movie.dailyRentalRate}</td>
            <td>
              <Like liked={movie.liked} onToggle={() => onLike(movie)} />
            </td>
            <td>
              <button
                onClick={() => onDelete(movie._id)}
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

export default MoviesTable;
