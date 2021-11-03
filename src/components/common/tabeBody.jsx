import React from "react";
import _ from "lodash";

function TableBody({ data, columns }) {
  let renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };

  return (
    <tbody>
      {data.map((item) => (
        <tr>
          {/* we cant use braket notation for nested properies insted we use lodash */}
          {columns.map((column) => (
            <td>{renderCell(item, column)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
