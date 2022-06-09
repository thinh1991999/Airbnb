import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { httpServ } from "../../ServiceWorkers";
import {
  setHeaderTrans,
  setHomeChecked,
  setScrollActive,
  setSearchActive,
  setShowSearch,
} from "../../Store/HeaderSlice/HeaderSlice";
import { getVNDMoney } from "../../Untils";
import "./Home.scss";

function Home() {
  const dispatch = useDispatch();
  const [locsHot, setLocsHot] = useState([]);
  const [roomsHot, setRoomsHot] = useState([]);

  useEffect(() => {
    dispatch(setShowSearch(true));
    dispatch(setSearchActive(true));
    dispatch(setScrollActive(true));
    dispatch(setHeaderTrans(true));
    dispatch(setHomeChecked(true));
    return () => {
      dispatch(setHomeChecked(false));
      dispatch(setHeaderTrans(false));
    };
  }, []);

  useEffect(() => {
    httpServ
      .layDanhSachViTriTrangChu()
      .then((res) => {
        setLocsHot(res.data);
      })
      .then(() => {
        httpServ.layDanhSachPhongTrangChu().then((res) => {
          setRoomsHot(res.data);
        });
      });
  }, []);

  return (
    <div id="home" className="">
      <div id="home__thumnail" className="">
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
      <div className="md:container m-auto lg:px-20 md:px-10 px-5">
        {locsHot.length > 0 && (
          <div className="my-10">
            <h5 className="mb-4 text-center text-3xl font-bold ">
              Địa điểm nổi bật
            </h5>
            <div className="flex flex-wrap">
              {locsHot.map((loc) => {
                const { province, image, _id } = loc;
                return (
                  <div
                    key={_id}
                    className="xl:w-1/5 lg:w-1/4 md:w-1/3 sm:w-1/2 w-full p-2 flex flex-col"
                  >
                    <Link
                      to={`/rooms/${_id}`}
                      className="w-full rounded-xl overflow-hidden relative cursor-pointer hover:-translate-y-2 transition-all duration-300 ease-linear box__shadow"
                    >
                      <img
                        src={image}
                        alt=""
                        className="w-full object-cover h-[250px] "
                      />
                      <div className="absolute top-0 left-0 right-0 bottom-0 p-2">
                        <span className="font-bold text-white">{province}</span>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {roomsHot.length > 0 && (
          <div className="my-10">
            <h5 className="mb-4 text-center text-3xl font-bold ">
              Phòng nổi bật
            </h5>
            <div className="flex flex-wrap">
              {roomsHot.map((item) => {
                const { name, image, description, _id, price } = item;
                return (
                  <div
                    key={_id}
                    className="lg:w-1/3 md:w-1/2 w-full p-2 flex flex-col"
                  >
                    <Link
                      to={`/roomDetail/${_id}`}
                      className="box__shadow rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-300 ease-linear "
                    >
                      <div className="w-full">
                        <img
                          src={image}
                          alt=""
                          className="w-full object-cover h-[250px]  "
                        />
                      </div>
                      <div className="p-2 flex flex-col justify-center items-center dark:bg-gray-700">
                        <h5 className="font-bold text-lg">{name}</h5>
                        <p className="one__line__text">{description}</p>
                        <p>
                          {getVNDMoney(price)}{" "}
                          <span className="font-thin">/đêm</span>
                        </p>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
