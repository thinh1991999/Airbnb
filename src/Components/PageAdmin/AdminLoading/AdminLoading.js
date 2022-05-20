import React from "react";
import { Circles } from "react-loading-icons";
import { useSelector } from "react-redux";

export default function AdminLoading() {
  const mode = useSelector((state) => state.root.mode);
  return (
    <div className="min-h-[500px] flex justify-center items-center">
      <Circles
        height={"10rem"}
        width="10rem"
        fill={mode === "DARK" ? "white" : "black"}
      />
    </div>
  );
}
