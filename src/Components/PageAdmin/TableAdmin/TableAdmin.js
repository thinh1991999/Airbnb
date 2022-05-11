import { useMemo, useState } from "react";
import { useTable } from "react-table";
import "./TableAdmin.css";

function TableAdmin({ data, currentColumns }) {
  // const data = [
  //   {
  //     name: "Leanne Graham",
  //     email: "Sincere@april.biz",
  //     age: 28,
  //     status: "Active",
  //   },
  //   {
  //     name: "Ervin Howell",
  //     email: "Shanna@melissa.tv",
  //     age: 35,
  //     status: "Active",
  //   },
  //   {
  //     name: "Clementine Bauch",
  //     email: "Nathan@yesenia.net",
  //     age: 33,
  //     status: "Inactive",
  //   },
  //   {
  //     name: "Patricia Lebsack",
  //     email: "Julianne@kory.org",
  //     age: 25,
  //     status: "Active",
  //   },
  //   {
  //     name: "Kamren",
  //     email: "Hettinger@annie.ca",
  //     age: 42,
  //     status: "Active",
  //   },
  //   {
  //     name: "Dennis Schulist",
  //     email: "Dach@jasper.info",
  //     age: 34,
  //     status: "Inactive",
  //   },
  //   {
  //     name: "Kurtis Weissnat",
  //     email: "Hoeger@billy.biz",
  //     age: 44,
  //     status: "Active",
  //   },
  //   {
  //     name: "Maxime_Nienow",
  //     email: "Sherwood@rosamond.me",
  //     age: 26,
  //     status: "Active",
  //   },
  //   {
  //     name: "Glenna Reichert",
  //     email: "McDermott@dana.io",
  //     age: 30,
  //     status: "Inactive",
  //   },
  // ];
  const columns = useMemo(() => currentColumns, []);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
  return (
    <div className="mt-10" id="table__admin">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  let valueCell = cell.value || "null";
                  if (cell.column.Header === "Gender") {
                    if (cell.value) {
                      valueCell = "male";
                    } else {
                      valueCell = "female";
                    }
                  }
                  if (cell.column.Header === "BirthDay") {
                    valueCell = cell.value
                      ? cell?.value.substring(0, 10)
                      : "null";
                  }
                  return <td {...cell.getCellProps()}>{valueCell}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TableAdmin;
