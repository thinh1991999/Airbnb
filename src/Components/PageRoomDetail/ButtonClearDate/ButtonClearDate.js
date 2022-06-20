import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchValue } from "../../../Store/HeaderSlice/HeaderSlice";

export default function ButtonClearDate() {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.root.language);
  const searchValue = useSelector((state) => state.header.searchValue);
  const handleClearDay = () => {
    dispatch(
      setSearchValue({
        members: { ...searchValue?.members },
        checkIn: null,
        checkOut: null,
      })
    );
  };
  return (
    <button
      onClick={handleClearDay}
      className="underline mt-2 hover:text-red-500 transition-all duration-300 ease-linear"
    >
      {language.delDay}
    </button>
  );
}
