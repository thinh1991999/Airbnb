import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setHeaderTrans,
  setScrollActive,
  setSearchActive,
  setShowSearch,
} from "../../Store/HeaderSlice/HeaderSlice";
import "./Home.scss";

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
      <div id="home" className="">
        <p className="line-1 anim-typewriter">Booking Your Room</p>
        <div className="bird-container bird-container--one">
          <div className="bird bird--one" />
        </div>
        <div className="bird-container bird-container--two">
          <div className="bird bird--two" />
        </div>
        <div className="bird-container bird-container--three">
          <div className="bird bird--three" />
        </div>
        <div className="bird-container bird-container--four">
          <div className="bird bird--four" />
        </div>
      </div>
      <div className="container m-auto lg:px-20">
        <div className="mt-10">
          <h5 className="text-center text-3xl font-bold ">Địa điểm nổi bật</h5>
          <div className="flex flex-wrap">
            <div className="w-1/3 p-2 flex flex-col">
              <div className="w-full">
                <img
                  src="data:image/jpeg;base64,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"
                  alt=""
                  className="w-full object-cover h-[250px] rounded-xl"
                />
              </div>
              <div className="flex flex-col justify-center items-center">
                <h5 className="font-bold text-lg">name</h5>
                <p className="">descriptiom</p>
                <span>price</span>
              </div>
            </div>
            <div className="w-1/3 p-2 flex flex-col">
              <div className="w-full">
                <img
                  src="data:image/jpeg;base64,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"
                  alt=""
                  className="w-full object-cover h-[250px] rounded-xl"
                />
              </div>
              <div className="flex flex-col justify-center items-center">
                <h5 className="font-bold text-lg">name</h5>
                <p className="">descriptiom</p>
                <span>price</span>
              </div>
            </div>
            <div className="w-1/3 p-2 flex flex-col">
              <div className="w-full">
                <img
                  src="data:image/jpeg;base64,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"
                  alt=""
                  className="w-full object-cover h-[250px] rounded-xl"
                />
              </div>
              <div className="flex flex-col justify-center items-center">
                <h5 className="font-bold text-lg">name</h5>
                <p className="">descriptiom</p>
                <span>price</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <h5 className="text-center text-3xl font-bold ">Phòng nổi bật</h5>
          <div className="flex flex-wrap">
            <div className="w-1/3 p-2 flex flex-col">
              <div className="w-full">
                <img
                  src="data:image/jpeg;base64,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"
                  alt=""
                  className="w-full object-cover h-[250px] rounded-xl"
                />
              </div>
              <div className="flex flex-col justify-center items-center">
                <h5 className="font-bold text-lg">name</h5>
                <p className="">descriptiom</p>
                <span>price</span>
              </div>
            </div>
            <div className="w-1/3 p-2 flex flex-col">
              <div className="w-full">
                <img
                  src="data:image/jpeg;base64,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"
                  alt=""
                  className="w-full object-cover h-[250px] rounded-xl"
                />
              </div>
              <div className="flex flex-col justify-center items-center">
                <h5 className="font-bold text-lg">name</h5>
                <p className="">descriptiom</p>
                <span>price</span>
              </div>
            </div>
            <div className="w-1/3 p-2 flex flex-col">
              <div className="w-full">
                <img
                  src="data:image/jpeg;base64,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"
                  alt=""
                  className="w-full object-cover h-[250px] rounded-xl"
                />
              </div>
              <div className="flex flex-col justify-center items-center">
                <h5 className="font-bold text-lg">name</h5>
                <p className="">descriptiom</p>
                <span>price</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
