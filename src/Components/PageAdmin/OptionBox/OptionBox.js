import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowOptionBox } from "../../../Store/AdminSlice/AdminSlice";

export default function OptionBox() {
  const dispatch = useDispatch();
  const componentShow = useSelector((state) => state.admin.componentShow);
  const wrapRef = useRef(null);

  const clickEvent = (e) => {
    if (!wrapRef.current?.contains(e.target)) {
      dispatch(setShowOptionBox(false));
    }
  };
  useEffect(() => {
    window.addEventListener("click", clickEvent);
    return () => {
      window.removeEventListener("click", clickEvent);
    };
  }, []);
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0  z-[52] ">
      <div className="w-full h-full relative">
        <div className="absolute top-0 left-0 bottom-0 right-0 bg-black/[0.5] flex justify-center items-center">
          <div ref={wrapRef}>{componentShow}</div>
        </div>
      </div>
    </div>
  );
}
