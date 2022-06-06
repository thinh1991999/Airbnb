import React, { useEffect, useState } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

export default function PosList({
  posData,
  values,
  handleChangePos,
  name,
  errors,
  handleFocusPos,
}) {
  const [showPosList, setShowPosList] = useState(false);
  const [pos, setPos] = useState("");

  const handleChoosePos = (id) => {
    setTimeout(() => {
      handleChangePos(id);
      setShowPosList(!showPosList);
    }, 100);
  };

  useEffect(() => {
    if (values.locationId) {
      let posValue;
      if (typeof values.locationId === "object") {
        posValue = posData.filter((item) => {
          const { name, country, province } = item;
          const {
            name: nameLoc,
            country: countryLoc,
            province: provinceLoc,
          } = values.locationId;
          return (
            name === nameLoc &&
            country === countryLoc &&
            province === provinceLoc
          );
        });
      } else {
        posValue = posData.filter((item) => {
          return item._id === values.locationId;
        });
      }
      if (posValue.length > 0) {
        setPos(posValue[0]);
      }
    }
  }, [values, posData]);

  useEffect(() => {
    if (showPosList) {
      handleFocusPos(name);
    }
  }, [showPosList]);
  return (
    <div
      className={`${
        errors[name] ? `border-red-600` : `border-gray-400`
      } relative px-3 py-2 h-[44px] my-2 bg-gray-300 dark:bg-gray-700 rounded-md border-[2px] `}
    >
      <button
        type="button"
        onClick={() => setShowPosList(!showPosList)}
        className="w-full flex justify-between items-center"
      >
        <span className="text-gray-400">{pos ? pos.name : "Chon vi tri"}</span>{" "}
        {showPosList ? <AiOutlineUp /> : <AiOutlineDown />}
      </button>

      {showPosList && (
        <ul className=" bg-gray-300 dark:bg-gray-700 border-[2px] border-gray-400 py-2 rounded-md absolute top-[calc(100%_+_10px)] right-0 left-0 sm:max-h-[300px] max-h-[250px] overflow-y-auto scroll__custom">
          {posData?.map((item) => {
            const { _id, name, province, country } = item;
            const value = `${name},${province},${country}`;
            if (!name || value.length < 10) return;
            return (
              <li
                key={_id}
                onClick={() => handleChoosePos(_id)}
                className={`${
                  _id === pos?._id && `bg-gray-600`
                } one__line__text px-3 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 ease-linear`}
              >
                {value}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
