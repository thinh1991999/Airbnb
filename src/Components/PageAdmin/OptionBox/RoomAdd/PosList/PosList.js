import React, { useEffect, useState } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

export default function PosList({ posData, values, handleChangePos, name }) {
  const [showPosList, setShowPosList] = useState(false);
  const [pos, setPos] = useState("");

  useEffect(() => {
    const posValue = posData.filter((item) => {
      return item._id === values.locationId;
    });
    if (posValue.length > 0) {
      setPos(posValue[0]);
    }
  }, [values, posData]);

  return (
    <div className="relative px-3 py-2 h-[44px] my-2 bg-gray-700 rounded-md border-[2px] border-gray-400">
      <button
        onClick={() => setShowPosList(!showPosList)}
        className="w-full flex justify-between items-center"
      >
        <span className="text-gray-400">{pos ? pos.name : "Chon vi tri"}</span>{" "}
        {showPosList ? <AiOutlineUp /> : <AiOutlineDown />}
      </button>
      {showPosList && (
        <ul className="scroll__custom bg-gray-700 border-[2px] border-gray-400 py-2 rounded-md absolute top-[calc(100%_+_10px)] right-0 left-0 max-h-[300px] overflow-y-auto">
          {posData?.map((item) => {
            const { _id, name, province, country } = item;
            const value = `${name},${province},${country}`;
            if (!name || value.length < 10) return;
            return (
              <li
                key={_id}
                onClick={() => handleChangePos(_id)}
                className={`${
                  _id === values?.locationId && `bg-gray-600`
                } one__line__text px-3 py-2 cursor-pointer hover:bg-gray-600 transition-all duration-300 ease-linear`}
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
