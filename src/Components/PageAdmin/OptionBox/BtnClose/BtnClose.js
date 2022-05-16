import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setShowOptionBox } from "../../../../Store/AdminSlice/AdminSlice";

export default function BtnClose() {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setShowOptionBox(false));
  };

  return (
    <div className="flex justify-end mb-2">
      <button onClick={handleClose} className="text-xl">
        <AiOutlineClose />
      </button>
    </div>
  );
}
