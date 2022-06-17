import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setShowWarning } from "../../Store/RootSlice/RootSlice";

export default function WarningDelete({ id, handleDelete, title, question }) {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.root.language);

  const handleClose = () => {
    dispatch(setShowWarning(false));
  };

  const handleDeleteAcion = () => {
    handleDelete(id);
    dispatch(setShowWarning(false));
  };

  return (
    <div className="dark:bg-gray-900 bg-gray-100 px-10 py-5 rounded-md text-white lg:w-[500px]">
      <div className="flex justify-end mb-2">
        <button onClick={handleClose} className="text-xl">
          <AiOutlineClose />
        </button>
      </div>
      <h2 className="capitalize text-3xl font-semibold mb-5">{title}</h2>
      <div className="">
        <p className="text-xl">{question}?</p>
        <div className="flex justify-end mt-10 ">
          <button
            onClick={handleClose}
            className="mr-5 font-bold text-blue-500"
          >
            {language.Cancer}
          </button>
          <button
            onClick={handleDeleteAcion}
            className="px-3 py-2 bg-red-500 rounded-md font-bold"
          >
            {language.Delete}
          </button>
        </div>
      </div>
    </div>
  );
}
