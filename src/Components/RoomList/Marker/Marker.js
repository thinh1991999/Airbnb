import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { AiFillStar } from "react-icons/ai";

function Marker({ index, data, mapSize }) {
  const hoverActive = useSelector((state) => state.rooms.hoverActive);
  const [active, setActive] = useState(false);
  const [positionSub, setPositionSub] = useState({});

  const itemRef = useRef(null);
  const {
    name,
    description,
    image,
    _id,
    price,
    guests,
    bedRoom,
    bath,
    locationId: { valueate },
  } = data;
  const newPrice = price.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });

  const handleActive = () => {
    setActive(true);
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
    const { width, height } = window.screen;
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
      // onClick={handleActive}
      ref={itemRef}
      className={`${
        hoverActive === index || active
          ? "bg-black text-white"
          : "bg-white text-black"
      } relative py-4 border px-2 border-gray-600 ${
        !active && "hover:scale-125"
      } transition-all duration-300 ease-linear rounded-2xl   w-[60px] h-2  text-base font-bold flex justify-center items-center`}
    >
      <span className="one__line__text">{`${newPrice}`}</span>
      {active && (
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
            <img src={image} alt="" className="w-full h-[150px] object-cover" />
          </div>
          <div className="px-4 py-2">
            <p className="flex items-center">
              <span className="text-pink-500 mr-1">
                <AiFillStar />
              </span>{" "}
              {valueate / 2}{" "}
              <span className="font-thin ml-1">({valueate})</span>
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
      )}
    </div>
  );
}

export default Marker;
