import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setSearchValue } from "../../../../../Store/HeaderSlice/HeaderSlice";
import PlaceBox from "../../../Search/PlaceBox/PlaceBox";

export default function PlaceBoxMobile() {
  const dispatch = useDispatch();
  const searchValue = useSelector((state) => state.header.searchValue);

  return (
    <>
      <div className="flex items-center px-5 py-4 border-[1px] border-black dark:border-white rounded-lg">
        <AiOutlineSearch className="text-2xl mr-2" />
        <input
          onChange={(e) =>
            dispatch(setSearchValue({ ...searchValue, place: e.target.value }))
          }
          type="text"
          placeholder="Tim kiem diem den"
          className="w-full bg-gray-100 dark:bg-gray-900 outline-none"
          autoComplete={"off"}
          value={searchValue.place || ""}
        />
      </div>
      <div className="mt-5 ">
        <PlaceBox />
      </div>
    </>
  );
}
