import { useMemo, useState } from "react";
import { usePagination, useTable } from "react-table";
import { IoCaretBackOutline, IoCaretForwardOutline } from "react-icons/io5";
import { ImBackward2, ImForward3 } from "react-icons/im";
import "./TableAdmin.css";
import { getVNDMoney } from "../../../Untils";

function TableAdmin({ data, currentColumns }) {
  const columns = useMemo(() => currentColumns, [currentColumns]);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );

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
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  let valueCell = cell.value;
                  if (!valueCell && cell.column.Header !== "Actions") {
                    return (
                      <td {...cell.getCellProps()}>
                        <p>null</p>
                      </td>
                    );
                  }
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
                  if (cell.column.Header === "Price") {
                    valueCell = getVNDMoney(valueCell);
                  }
                  if (
                    cell.column.Header === "Avatar" ||
                    cell.column.Header === "Image"
                  ) {
                    return (
                      <td {...cell.getCellProps()}>
                        <div
                          className={`${
                            cell.column.Header === "Image"
                              ? "w-[100px]"
                              : " w-[50px]"
                          } rounded-md overflow-hidden avatar__td`}
                        >
                          <img src={valueCell} className="w-full" alt="" />
                        </div>
                      </td>
                    );
                  }
                  if (cell.column.Header === "Actions") {
                    return (
                      <td {...cell.getCellProps()}>
                        <div className="text-white">
                          <button className="mx-2 px-2 py-1 bg-green-500 rounded-md">
                            Xem chi tiet
                          </button>
                          <button className="mx-2 px-2 py-1 bg-blue-500 rounded-md">
                            Sua
                          </button>
                          <button className="mx-2 px-2 py-1 bg-red-500 rounded-md">
                            Xoa
                          </button>
                        </div>
                      </td>
                    );
                  }
                  return (
                    <td {...cell.getCellProps()}>
                      <p>
                        {valueCell.length > 200
                          ? `${valueCell.substring(0, 200)}...`
                          : valueCell}
                      </p>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <div className="btnWrap flex justify-center items-center py-5 ">
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            <ImBackward2 />
          </button>
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            <IoCaretBackOutline />
          </button>
          <div className="flex items-center">
            <p>
              {pageIndex + 1} of {pageOptions.length}
            </p>
          </div>
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            <IoCaretForwardOutline />
          </button>
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            <ImForward3 />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TableAdmin;
