import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { toast } from "react-toastify";
import { Circles } from "react-loading-icons";
import {
  setComponentShow,
  setIdOption,
  setReloadData,
  setShowOptionBox,
} from "../../../../Store/AdminSlice/AdminSlice";
import { httpServ } from "../../../../ServiceWorkers";
import { getVNDMoney } from "../../../../Untils";

export default function TableBody({
  getTableBodyProps,
  page,
  prepareRow,
  currentNavData,
}) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.root.token);
  const user = useSelector((state) => state.root.user);

  const [currentIdTarget, setCurrentIdTarget] = useState({});
  const [currentIdTargetImg, setCurrentIdTargetImg] = useState({});

  const handleDelete = (id) => {
    setCurrentIdTarget({ ...currentIdTarget, [id]: id });
    const funcName = currentNavData.delete;
    httpServ[funcName](id, token).then((res) => {
      toast.success("Xoa user thanh cong!");
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

  const handleUpLoadImg = (e, id) => {
    const file = e.target.files[0];
    if (file.type.includes("image")) {
      setCurrentIdTargetImg({ ...currentIdTargetImg, [id]: id });
      httpServ[currentNavData.upLoadImg](file, id, token).then((res) => {
        dispatch(setReloadData(true));
        setCurrentIdTargetImg((prev) => {
          delete prev[id];
          return { ...prev };
        });
        toast.success("Thay đổi ảnh thành công!");
      });
    } else {
      e.target.value = null;
      toast.error("File được chọn phải là ảnh!");
    }
  };

  return (
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
                cell.column.Header !== "Actions" &&
                cell.column.Header !== "Avatar" &&
                cell.column.Header !== "Image"
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
                valueCell = cell.value ? cell?.value.substring(0, 10) : "null";
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
                      className={`flex ${
                        cell.column.Header === "Image"
                          ? `justify-around`
                          : `justify-center items-center`
                      }`}
                    >
                      {!valueCell ? (
                        <span className="text-center flex-1">null</span>
                      ) : (
                        <div
                          className={`${
                            cell.column.Header === "Image"
                              ? "w-[100px]"
                              : " w-[70px]"
                          }  avatar__td`}
                        >
                          <LazyLoadImage
                            src={valueCell}
                            width="100%"
                            effect="opacity"
                            className="w-full h-full rounded-md overflow-hidden"
                            alt=""
                          />
                        </div>
                      )}
                      {cell.column.Header === "Image" && (
                        <div className="flex items-center">
                          {currentIdTargetImg[id] ? (
                            <Circles height="3em" width="3em" />
                          ) : (
                            <>
                              <label
                                htmlFor={id}
                                className="px-2 py-1 bg-blue-500 rounded-md cursor-pointer"
                              >
                                Chinh sua
                              </label>
                              <input
                                type="file"
                                className="hidden"
                                id={id}
                                onChange={(e) => handleUpLoadImg(e, id)}
                              />
                            </>
                          )}
                        </div>
                      )}
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
                <td {...cell.getCellProps()} className="lg:max-w-[500px]">
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
  );
}
