import React from "react";
import Like from "./common/like";
function MoviesTable({ moviesPaginate, onLike, onDelete, onSort, sortColumn }) {
  let raiseSort = (path) => {
    let sortColumnClone = { ...sortColumn };
    if (sortColumnClone.path === path)
      sortColumnClone.order = sortColumnClone.order === "asc" ? "desc" : "asc";
    else {
      sortColumnClone.path = path;
      sortColumnClone.order = "asc";
    }
    onSort(sortColumnClone);
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th onClick={() => raiseSort("title")}>Title</th>
          <th onClick={() => raiseSort("genre.name")}>Genre</th>
          <th onClick={() => raiseSort("numberInStock")}>Stock</th>
          <th onClick={() => raiseSort("dailyRentalRate")}>Rate</th>
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
