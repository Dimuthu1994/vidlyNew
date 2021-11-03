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

  //columns:array
  //sortColumn :obj
  //onsort :func
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            key={column.path || column.key}
            onClick={() => raiseSort(column.path)}
          >
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHeader;
