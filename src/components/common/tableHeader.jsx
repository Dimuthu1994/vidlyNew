import React from "react";

function TableHeader({ onSort, sortColumn, columns }) {
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

  let renderSortIcon = (column) => {
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  };

  //columns:array
  //sortColumn :obj
  //onsort :func
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            className="clickable"
            key={column.path || column.key}
            onClick={() => raiseSort(column.path)}
          >
            {column.label} {renderSortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHeader;
