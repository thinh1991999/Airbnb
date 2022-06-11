import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";

function Marker({ index, data, mapSize }) {
  const hoverActive = useSelector((state) => state.rooms.hoverActive);
  const [active, setActive] = useState(false);
  const [positionSub, setPositionSub] = useState({});

  const itemRef = useRef(null);
  const { name, description, image, price, _id } = data;
  const newPrice = price
    ? price?.toLocaleString("it-IT", {
        style: "currency",
        currency: "VND",
      })
    : 0;
  const handleClickMarker = () => {
    console.log(123);
  };

  const eventClick = (e) => {
    const {
      left: leftMap,
      top: topMap,
      bottom: bottomMap,
      right: rightMap,
    } = mapSize;
    const { left, bottom, top, right } =
      itemRef.current.getBoundingClientRect();

    const realBottom = bottomMap - bottom;
    const realTop = top - topMap;
    const realLeft = left - leftMap;
    const realRight = rightMap - right;
    const pos = {};
    if (realBottom >= realTop) {
      pos.top = true;
    } else {
      pos.top = false;
    }
    if (realLeft >= realRight) {
      pos.left = true;
    } else {
      pos.left = false;
    }
    setPositionSub(pos);
    if (!itemRef.current.contains(e.target)) {
      setActive(false);
    } else {
      setActive(true);
    }
  };
  useEffect(() => {
    window.addEventListener("click", eventClick);
    return () => {
      window.removeEventListener("click", eventClick);
    };
  }, []);

  return (
    <div
      ref={itemRef}
      className={`${
        hoverActive === index || active
          ? "bg-black text-white"
          : "bg-white text-black"
      } relative py-4 border px-2 border-gray-600 ${
        !active && "hover:scale-125"
      } transition-all duration-300 ease-linear rounded-2xl min-w-[80px] h-2  text-base font-bold flex justify-center items-center`}
    >
      <span className="one__line__text">{`${newPrice}`}</span>
      {active && (
        <Link to={`/roomDetail/${_id}`}>
          <div
            className={`${
              positionSub?.top
                ? `top-[calc(100%_+_10px)]`
                : `bottom-[calc(100%_+_10px)]`
            } ${
              positionSub?.left
                ? `right-[calc(100%_+_10px)]`
                : `left-[calc(100%_+_10px)]`
            } absolute min-w-[250px] rounded-md overflow-hidden bg-white text-black   z-10`}
          >
            <div className="w-full">
              <img
                src={image}
                alt=""
                className="w-full h-[150px] object-cover"
              />
            </div>
            <div className="px-4 py-2">
              <p className="flex items-center">
                <span className="text-pink-500 mr-1">
                  <AiFillStar />
                </span>
                {data?.locationId?.valueate / 2 || 5}
                <span className="font-thin ml-1">
                  ({data?.locationId?.valueate || 10})
                </span>
              </p>
              <p className="font-thin one__line__text">{description}</p>
              <p className="font-semibold one__line__text text-gray-700">
                {name}
              </p>
              <p className="mt-2">
                {newPrice} <span className="font-thin">/đêm</span>
              </p>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
}

export default Marker;
