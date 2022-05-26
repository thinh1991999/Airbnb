import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setHeaderTrans,
  setScrollActive,
  setSearchActive,
  setShowSearch,
} from "../../Store/HeaderSlice/HeaderSlice";

function Home() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.root.mode);

  useEffect(() => {
    dispatch(setShowSearch(true));
    dispatch(setSearchActive(true));
    dispatch(setScrollActive(true));
    dispatch(setHeaderTrans(true));
    return () => {
      dispatch(setHeaderTrans(false));
    };
  }, []);
  return (
    <div className="">
      <div className=" bg-white">
        {mode === "LIGHT" ? (
          <img
            src="https://images.unsplash.com/photo-1569982615761-66697da68502?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170"
            alt=""
            className="w-full h-[800px] object-cover object-center"
          />
        ) : (
          <img
            src="https://images.unsplash.com/Ys-DBJeX0nE.JPG?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170"
            alt=""
            className="w-full h-[800px] object-cover object-center"
          />
        )}
      </div>
    </div>
  );
}

export default Home;
