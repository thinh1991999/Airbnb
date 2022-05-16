import React from "react";
import { Circles } from "react-loading-icons";

export default function OptionLoading() {
  return (
    <div className="w-[300px] h-[200px] py-5 px-7 rounded-xl flex justify-center items-center dark:bg-gray-900  bg-gray-100">
      <Circles fill="white" />
    </div>
  );
}
