import React from "react";
import { useState } from "react";
import { unknowImg } from "../../../Shared/Constant";
import { getTime } from "../../../Untils";

export default function TicketsShow({ ticketsData }) {
  const [showDetail, setShowDetail] = useState(false);
  return (
    <div className="py-5 border-t-[1px] border-b-[1px] border-gray-500">
      <h2 className="text-xl font-bold capitalize">
        booking history : {ticketsData.length} tickets{" "}
        <button
          onClick={() => setShowDetail(!showDetail)}
          className="px-3 py-2 rounded-md bg-blue-500 ml-2"
        >
          {showDetail ? "Hide" : "Show"}
        </button>
      </h2>
      {showDetail && (
        <div className="flex flex-wrap -ml-2 -mr-2">
          {ticketsData?.map((ticket) => {
            const {
              _id,
              checkIn,
              checkOut,
              userId: { avatar, name },
            } = ticket;
            return (
              <div key={_id} className="w-1/2 p-2 flex items-center">
                <div className="mr-2">
                  <img
                    src={avatar || unknowImg}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full"
                  />
                </div>
                <div className="flex flex-col">
                  <h5 className="font-bold text-lg">{name}</h5>
                  <span className="font-thin">
                    Check In : {getTime(checkIn)}
                  </span>
                  <span className="font-thin">
                    Check Out : {getTime(checkOut)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
