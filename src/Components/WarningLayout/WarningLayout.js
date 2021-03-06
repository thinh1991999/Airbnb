import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowWarning } from "../../Store/RootSlice/RootSlice";

export default function WarningLayout() {
  const dispatch = useDispatch();
  const componentWarning = useSelector((state) => state.root.componentWarning);
  const wrapRef = useRef(null);

  const clickEvent = (e) => {
    if (!wrapRef.current?.contains(e.target)) {
      dispatch(setShowWarning(false));
    }
  };
  useEffect(() => {
    window.addEventListener("click", clickEvent);
    return () => {
      window.removeEventListener("click", clickEvent);
    };
  }, []);

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0  z-50 ">
      <div className="w-full h-full relative">
        <div className="absolute top-0 left-0 bottom-0 right-0 bg-black/[0.5] flex justify-center items-center">
          <div ref={wrapRef}>{componentWarning}</div>
        </div>
      </div>
    </div>
  );
}
