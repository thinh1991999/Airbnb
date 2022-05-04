import React from "react";
import { AiOutlineDown } from "react-icons/ai";
import Button from "../../Button/Button";

export default function BookTicket() {
  return (
    <div className="h-full relative w-full mt-5 pb-5">
      <div className="sticky top-[200px] ">
        <div className="px-10 py-5  min-w-[200px] rounded-xl border-[1px] ">
          <h5 className="text-2xl font-bold">
            $113 <span className="text-lg font-normal">/đêm</span>
          </h5>
          <div className="mt-5 rounded-lg overflow-hidden border-[1px] border-gray-500">
            <div className="flex items-stretch ">
              <div className="flex-1 px-3 py-2 cursor-pointer">
                <span className="font-medium uppercase text-xs">
                  Nhận phòng
                </span>
                <p className="text-base font-thin">Thêm ngày</p>
              </div>
              <div className="w-[1px] bg-gray-500"></div>
              <div className="flex-1 px-3 py-2 cursor-pointer">
                <span className="font-medium uppercase text-xs">Trả phòng</span>
                <p className="text-base font-thin">Thêm ngày</p>
              </div>
            </div>
            <div className="px-3 py-2 items-center flex justify-between cursor-pointer border-t-[1px] border-gray-500">
              <div className="">
                <span className="font-medium uppercase text-xs">Khách</span>
                <p className="text-base font-thin">Thêm ngày</p>
              </div>
              <AiOutlineDown />
            </div>
          </div>
          <button className="mt-5 w-full">
            <Button>Đặt phòng</Button>
          </button>
          {/* <button className="px-4 py-2 text-white uppercase font-bold hover:opacity-75 transition-all ease-linear duration-300 w-full mt-5 rounded-md bg-gradient-to-r from-violet-500 to-fuchsia-500">
            
          </button> */}
        </div>
      </div>
    </div>
  );
}
