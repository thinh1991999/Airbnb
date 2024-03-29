import { useEffect, useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AiFillStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setHoverActive } from "../../../Store/RoomListSlice/RoomListSlice";
import { Link } from "react-router-dom";
import { getVNDMoney } from "../../../Untils";

function Items({ currentItems }) {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.root.language);

  const [mounted, setMounted] = useState(false);

  const itemRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseEnter = (index) => {
    dispatch(setHoverActive(index));
  };

  const handleMouseLeave = () => {
    dispatch(setHoverActive(null));
  };

  if (!mounted) return <></>;

  return (
    <div className="w-full flex flex-wrap">
      {currentItems &&
        currentItems.map((item, index) => {
          const {
            name,
            description,
            image,
            _id,
            price,
            guests,
            bedRoom,
            bath,
            wifi,
            pool,
            kitchen,
            indoorFireplace,
            hotTub,
            heating,
            gym,
            elevator,
            dryer,
            cableTV,
          } = item;
          const newPrice = getVNDMoney(price);
          return (
            <div
              ref={itemRef}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave()}
              className={`w-full  md:py-8 md:border-t sm:border-none border-t  py-5 ${
                index === currentItems.length - 1
                  ? "md:border-b sm:border-none border-b"
                  : ""
              }`}
              key={_id}
            >
              <Link
                to={`/roomDetail/${_id}`}
                className="flex flex-wrap w-full h-full items-stretch cursor-pointer"
              >
                <div className="sm:w-[250px] w-full md:mb-0 mb-5   rounded-md  bg-gray-400">
                  <LazyLoadImage
                    height={"100%"}
                    src={image}
                    width={"100%"}
                    effect="opacity"
                    className="rounded-md h-full  object-cover"
                  />
                </div>
                <div className="sm:ml-4 flex flex-1 flex-col justify-between ">
                  <div className="">
                    <h5 className="text-xl font-bold mb-2 capitalize">
                      {name}
                    </h5>
                    <p className="one__line__text capitalize">{description}</p>
                    <div className="h-[1px] w-[40px] bg-gray-300 my-3"></div>
                    <p className="flex items-center capitalize">
                      {guests || 0} khách ,{bedRoom || 0} phòng ngủ, {bath || 0}{" "}
                      phòng tắm
                      <span className="flex items-center">.</span>
                    </p>
                    <p className="flex items-center capitalize">
                      {wifi && "wifi ,"} {pool && "bể bơi ,"}
                      {kitchen && "nhà bếp ,"}
                      {indoorFireplace && "lò sưởi ,"}
                      {hotTub && "nước nóng ,"}
                      {heating && "lò vi sóng ,"}
                      {gym && "gym ,"}
                      {elevator && "thang máy ,"}
                      {dryer && "máy sấy ,"}
                      {cableTV && "truyền hình cáp"}
                      <span className="flex items-center">.</span>
                    </p>
                  </div>
                  <div className="flex justify-between mt-10">
                    <div className="xl:flex lg:hidden flex items-center">
                      <span className="text-pink-500 mr-1">
                        <AiFillStar />
                      </span>{" "}
                      {item?.locationId?.valueate / 2 || 4}{" "}
                      <span className="font-thin ">
                        (169 {language.Rating})
                      </span>
                    </div>
                    <p>
                      <span className="font-medium text-lg ">{newPrice}</span>/
                      {language.Night}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
    </div>
  );
}

export default Items;
