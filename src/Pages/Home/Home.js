import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowSearch } from "../../Store/HeaderSlice/HeaderSlice";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setShowSearch(true));
  }, []);
  return (
    <div className="">
      <div className="h-[500px] bg-black"></div>
    </div>
  );
}

export default Home;
