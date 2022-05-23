import React, { useState } from "react";
import { MdSendAndArchive } from "react-icons/md";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { httpServ } from "../../../../ServiceWorkers";

export default function RatingRepair({ repairCurrent, setRepairCurrent }) {
  const token = useSelector((state) => state.root.token);
  const language = useSelector((state) => state.root.language);

  const [repairValue, setRepairValue] = useState(repairCurrent?.content);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (repairValue.trim().length > 0) {
      httpServ
        .capNhatDanhGia(
          {
            roomId: "6165513adc423b001dd9c044",
          },
          repairCurrent?._id,
          {
            content: repairValue,
          },
          token
        )
        .then((res) => {
          console.log(res);
        });
    } else {
      toast.error("Đánh giá không được rỗng!");
    }
  };
  console.log();

  return (
    <div className="">
      <div className="w-full border-[1px] border-gray-500 px-5 py-5 rounded-full mt-5">
        <div className="flex items-center justify-between">
          <img
            src={repairCurrent?.userId?.avatar}
            className="w-[40px] h-[40px] rounded-full mr-5"
            alt=""
          />
          <form className="flex items-center flex-1" onSubmit={handleSubmit}>
            <input
              value={repairValue}
              onChange={(e) => setRepairValue(e.target.value)}
              type="text"
              placeholder={language.RoomNewReview}
              className="w-full bg-gray-900 text-xl outline-none"
            />
            <button type="submit" className="text-3xl text-white">
              <MdSendAndArchive />
            </button>
          </form>
        </div>
      </div>
      <button
        onClick={() => setRepairCurrent(null)}
        className="font-bold text-blue-500 ml-[80px]"
      >
        {language.Cancer}
      </button>
    </div>
  );
}
