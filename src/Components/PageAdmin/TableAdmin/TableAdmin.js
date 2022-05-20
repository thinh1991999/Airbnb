import { useEffect, useMemo, useState } from "react";
import { usePagination, useTable } from "react-table";
import { IoCaretBackOutline, IoCaretForwardOutline } from "react-icons/io5";
import { ImBackward2, ImForward3 } from "react-icons/im";
import "./TableAdmin.css";

import { useDispatch, useSelector } from "react-redux";
import { httpServ } from "../../../ServiceWorkers";

import {
  setComponentShow,
  setCurrentPage,
  setData,
  setIdOption,
  setReloadData,
  setShowOptionBox,
} from "../../../Store/AdminSlice/AdminSlice";
import TableBody from "./TableBody/TableBody";
import { Circles } from "react-loading-icons";
import AdminLoading from "../AdminLoading/AdminLoading";

function TableAdmin({ currentNavData }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.root.user);
  const data = useSelector((state) => state.admin.data);
  const currentPage = useSelector((state) => state.admin.currentPage);
  const reloadData = useSelector((state) => state.admin.reloadData);

  const columns = useMemo(() => currentNavData?.tableColumns, [currentNavData]);
  const [loading, setLoading] = useState(false);

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

  const handleShowAdd = () => {
    dispatch(setComponentShow(currentNavData?.addComponent));
    dispatch(setShowOptionBox(true));
  };

  useEffect(() => {
    if (reloadData) {
      dispatch(setCurrentPage(pageIndex));
      setLoading(true);
      httpServ[currentNavData.getDataFunc](null, false).then((res) => {
        dispatch(setData(res.data));
        console.log(currentPage);
        gotoPage(currentPage);
        dispatch(setReloadData(false));
        setLoading(false);
      });
    }
  }, [reloadData]);
  return (
    <div className="mt-10" id="table__admin">
      {loading ? (
        <AdminLoading />
      ) : (
        <>
          <div className="flex justify-end mb-5">
            <button
              onClick={handleShowAdd}
              className="px-4 py-3 rounded-md primary--BGcolor flex items-center capitalize text-xl"
            >
              <span className="mr-2">{currentNavData?.btnAddMess}</span>
              {currentNavData?.btnAddIcon}
            </button>
          </div>
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => {
                return (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => {
                      if (
                        column.Header === "Actions" &&
                        user?.type !== "ADMIN"
                      ) {
                        return;
                      }
                      return (
                        <th {...column.getHeaderProps()}>
                          {column.render("Header")}
                        </th>
                      );
                    })}
                  </tr>
                );
              })}
            </thead>
            <TableBody
              getTableBodyProps={getTableBodyProps}
              page={page}
              prepareRow={prepareRow}
              currentNavData={currentNavData}
            />
          </table>
          <div className="pagination">
            <div className="btnWrap flex justify-center items-center py-5 ">
              <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                <ImBackward2 />
              </button>
              <button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
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
        </>
      )}
    </div>
  );
}

export default TableAdmin;
