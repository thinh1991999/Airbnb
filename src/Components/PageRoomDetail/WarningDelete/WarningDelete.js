import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setShowWarning } from "../../../Store/RoomDetailSlice/RoomDetailSlice";

export default function WarningDelete({ id, handleDeleteRating }) {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setShowWarning(false));
  };

  const handleDelete = () => {
    handleDeleteRating(id);
    dispatch(setShowWarning(false));
  };

  return (
    <div className="dark:bg-gray-900 bg-gray-100 px-10 py-5 rounded-md text-white lg:w-[500px]">
      <div className="flex justify-end mb-2">
        <button onClick={handleClose} className="text-xl">
          <AiOutlineClose />
        </button>
      </div>
      <h2 className="capitalize text-3xl font-semibold mb-5">Xóa đánh giá</h2>
      <div className="">
        <p className="text-xl">Bạn có chắc muốn xóa đánh giá này?</p>
        <div className="flex justify-end mt-10 ">
          <button
            onClick={handleClose}
            className="mr-5 font-bold text-blue-500"
          >
            Hủy
          </button>
          <button
            onClick={handleDelete}
            className="px-3 py-2 bg-red-500 rounded-md font-bold"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
}
