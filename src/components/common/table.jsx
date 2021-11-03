import React from "react";
import TableBody from "./tabeBody";
import TableHeader from "./tableHeader";

function Table({ onSort, sortColumn, columns, data }) {
  return (
    <table className="table">
      <TableHeader onSort={onSort} sortColumn={sortColumn} columns={columns} />

      <TableBody data={data} columns={columns} />
    </table>
  );
}

export default Table;
