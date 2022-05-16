import { useCallback, useEffect, useMemo, useState } from "react";
import { usePagination, useTable } from "react-table";
import { IoCaretBackOutline, IoCaretForwardOutline } from "react-icons/io5";
import { ImBackward2, ImForward3 } from "react-icons/im";
import "./TableAdmin.css";
import { getVNDMoney } from "../../../Untils";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import { httpServ } from "../../../ServiceWorkers";
import { toast } from "react-toastify";
import { Circles } from "react-loading-icons";
import {
  setComponentShow,
  setCurrentPage,
  setData,
  setIdOption,
  setIdUserOption,
  setReloadData,
  setShowOptionBox,
} from "../../../Store/AdminSlice/AdminSlice";
import UserDetail from "../OptionBox/UserDetail/UserDetail";
import UserRepair from "../OptionBox/UserRepair/UserRepair";

function TableAdmin({ currentNavData }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.root.user);
  const token = useSelector((state) => state.root.token);
  const data = useSelector((state) => state.admin.data);
  const currentPage = useSelector((state) => state.admin.currentPage);
  const reloadData = useSelector((state) => state.admin.reloadData);

  const columns = useMemo(() => currentNavData?.tableColumns, [currentNavData]);
  const [currentIdTarget, setCurrentIdTarget] = useState({});
  const [btnLoading, setBtnLoading] = useState(true);

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

  const handleDelete = (id) => {
    setCurrentIdTarget({ ...currentIdTarget, [id]: id });
    const funcName = currentNavData.delete;
    httpServ[funcName](id, token).then((res) => {
      toast.success("Xoa user thanh cong!");
      // dispatch(setCurrentPage(pageIndex));
      dispatch(setReloadData(true));
      setCurrentIdTarget((prev) => {
        delete prev[id];
        return { ...prev };
      });
    });
  };

  const handleShowDetail = (id) => {
    dispatch(setIdOption(id));
    dispatch(setComponentShow(currentNavData?.detailComponent));
    dispatch(setShowOptionBox(true));
  };

  const handleShowRepair = (id) => {
    dispatch(setIdOption(id));
    dispatch(setComponentShow(currentNavData?.repairComponent));
    dispatch(setShowOptionBox(true));
  };

  const handleShowAdd = () => {
    dispatch(setComponentShow(currentNavData?.addComponent));
    dispatch(setShowOptionBox(true));
  };

  useEffect(() => {
    if (reloadData) {
      dispatch(setCurrentPage(pageIndex));
      httpServ[currentNavData.getDataFunc](null, false).then((res) => {
        dispatch(setData(res.data));
        gotoPage(currentPage);
        dispatch(setReloadData(false));
      });
    }
  }, [reloadData]);
  return (
    <div className="mt-10" id="table__admin">
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
                  if (column.Header === "Actions" && user?.type !== "ADMIN") {
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
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  const id = row.original._id;
                  let valueCell = cell.value;
                  if (
                    !valueCell &&
                    valueCell !== 0 &&
                    cell.column.Header !== "Actions"
                  ) {
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
                          <LazyLoadImage
                            src={valueCell}
                            width="100%"
                            effect="opacity"
                            className="w-full h-auto"
                            alt=""
                          />
                        </div>
                      </td>
                    );
                  }

                  if (cell.column.Header === "Actions") {
                    if (user?.type === "ADMIN") {
                      return (
                        <td {...cell.getCellProps()}>
                          {currentIdTarget[id] ? (
                            <div className="w-full h-full flex justify-center">
                              <Circles height="3em" width="3em" />
                            </div>
                          ) : (
                            <div className="text-white">
                              <button
                                onClick={() => handleShowDetail(id)}
                                className="mx-2 px-2 py-1 bg-green-500 rounded-md"
                              >
                                Xem chi tiet
                              </button>
                              <button
                                onClick={() => handleShowRepair(id)}
                                className="mx-2 px-2 py-1 bg-blue-500 rounded-md"
                              >
                                Sua
                              </button>
                              <button
                                onClick={() => handleDelete(id)}
                                className="mx-2 px-2 py-1 bg-red-500 rounded-md"
                              >
                                Xoa
                              </button>
                            </div>
                          )}
                        </td>
                      );
                    } else {
                      return;
                    }
                  }
                  return (
                    <td {...cell.getCellProps()}>
                      <p>
                        {valueCell?.length > 200
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
