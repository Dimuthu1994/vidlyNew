import React from "react";
import _ from "lodash";

function TableBody({ data, columns }) {
  let renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };

  let createUniqueKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  return (
    <tbody>
      {data.map((item) => (
        <tr key={item._id}>
          {/* we cant use braket notation for nested properies insted we use lodash reason{item['genre.name']},otherwise we can use <td>{item[column.path]}</td> */}
          {columns.map((column) => (
            <td key={createUniqueKey(item, column)}>
              {renderCell(item, column)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
