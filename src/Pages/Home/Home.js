import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setHeaderTrans,
  setScrollActive,
  setSearchActive,
  setShowSearch,
} from "../../Store/HeaderSlice/HeaderSlice";
import Button from "../../Components/Button/Button";
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
    // <div id="home">
    //   <div className=" bg-white relative ">
    //     {mode === "LIGHT" ? (
    //       <img
    //         src="https://images.unsplash.com/photo-1569982615761-66697da68502?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170"
    //         alt=""
    //         className="w-full h-[800px] object-cover object-center"
    //       />
    //     ) : (
    //       <img
    //         src="https://images.unsplash.com/Ys-DBJeX0nE.JPG?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170"
    //         alt=""
    //         className="w-full h-[800px] object-cover object-center "
    //       />
    //     )}
    //     {/* <div className="absolute bottom-[100px] left-0 right-0 flex justify-center">
    //       <img
    //         src="https://images.pexels.com/photos/1329711/pexels-photo-1329711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    //         alt=""
    //         className="lg:w-[600px] rounded-2xl home__img"
    //       />
    //     </div> */}
    //   </div>
    // </div>
    <div id="home" className="">
      <p className="line-1 anim-typewriter">Booking Your Room</p>
      {/* <div className="">
        <button>
          <Button>flex search</Button>
        </button>
      </div> */}
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
  );
}

export default Home;
