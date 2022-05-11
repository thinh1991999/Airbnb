import React from "react";
import { AiOutlineWifi } from "react-icons/ai";
import { FaSwimmingPool } from "react-icons/fa";
import { CgGym, CgScreen } from "react-icons/cg";
import { GiCampCookingPot, GiFireplace } from "react-icons/gi";
import {
  MdOutlineLocalLaundryService,
  MdOutlineElevator,
  MdMicrowave,
  MdOutlineHotTub,
} from "react-icons/md";
import Calendar from "react-calendar";
import "./InfoShow.css";

export default function InfoShow({ detailData }) {
  const {
    name,
    guests,
    bedRoom,
    bath,
    description,
    cableTV,
    dryer,
    elevator,
    gym,
    heating,
    hotTub,
    indoorFireplace,
    kitchen,
    pool,
    wifi,
  } = detailData;
  return (
    <div className="w-full" id="RoomDetailInfo">
      <div className="py-5  border-gray-500">
        <h3 className="text-xl font-bold">{name}</h3>
        <p>
          {guests || 0} khách ,{bedRoom || 0} phòng ngủ, {bath || 0} phòng tắm
        </p>
      </div>
      <div className="py-5 border-t-[1px] border-gray-500">
        <p>
          <span className="font-bold">Description:</span> {description}
        </p>
      </div>
      <div className="py-5 border-t-[1px] border-gray-500">
        <h3 className="text-xl font-bold">Nơi này có gì cho bạn</h3>
        <div className="flex flex-wrap">
          <div className="lg:w-1/3 flex items-center my-2 text-xl capitalize ">
            <div className="relative">
              <AiOutlineWifi />
              {!wifi && (
                <div className="text-2xl absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                  x
                </div>
              )}
            </div>{" "}
            <span className={`ml-2 ${!wifi && `line-through`} `}>wi-fi</span>
          </div>
          <div className="lg:w-1/3 flex items-center my-2 text-xl capitalize">
            <div className="relative">
              <FaSwimmingPool />
              {!pool && (
                <div className="text-2xl absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                  x
                </div>
              )}
            </div>{" "}
            <span className={`ml-2 ${!pool && `line-through`} `}>bể bơi</span>
          </div>
          <div className="lg:w-1/3 flex items-center my-2 text-xl capitalize">
            <div className="relative">
              <CgGym />
              {!gym && (
                <div className="text-2xl absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                  x
                </div>
              )}
            </div>{" "}
            <span className={`ml-2 ${!gym && `line-through`} `}>gym</span>
          </div>
          <div className="lg:w-1/3 flex items-center my-2 text-xl capitalize">
            <div className="relative">
              <GiCampCookingPot />
              {!kitchen && (
                <div className="text-2xl absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                  x
                </div>
              )}
            </div>{" "}
            <span className={`ml-2 ${!kitchen && `line-through`} `}>bếp</span>
          </div>
          <div className="lg:w-1/3 flex items-center my-2 text-xl capitalize">
            <div className="relative">
              <MdOutlineLocalLaundryService />
              {!dryer && (
                <div className="text-2xl absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                  x
                </div>
              )}
            </div>{" "}
            <span className={`ml-2 ${!dryer && `line-through`} `}>máy xấy</span>
          </div>
          <div className="lg:w-1/3 flex items-center my-2 text-xl capitalize">
            <div className="relative">
              <MdOutlineElevator />
              {!elevator && (
                <div className="text-2xl absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                  x
                </div>
              )}
            </div>{" "}
            <span className={`ml-2 ${!elevator && `line-through`} `}>
              thang máy
            </span>
          </div>
          <div className="lg:w-1/3 flex items-center my-2 text-xl capitalize">
            <div className="relative">
              <CgScreen />
              {!cableTV && (
                <div className="text-2xl absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                  x
                </div>
              )}
            </div>{" "}
            <span className={`ml-2 ${!cableTV && `line-through`} `}>tv</span>
          </div>

          <div className="lg:w-1/3 flex items-center my-2 text-xl capitalize">
            <div className="relative">
              <MdMicrowave />
              {!heating && (
                <div className="text-2xl absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                  x
                </div>
              )}
            </div>{" "}
            <span className={`ml-2 ${!heating && `line-through`} `}>
              lò vi sóng
            </span>
          </div>
          <div className="lg:w-1/3 flex items-center my-2 text-xl capitalize">
            <div className="relative">
              <MdOutlineHotTub />
              {!hotTub && (
                <div className="text-2xl absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                  x
                </div>
              )}
            </div>{" "}
            <span className={`ml-2 ${!hotTub && `line-through`} `}>
              nước nóng
            </span>
          </div>
          <div className="lg:w-1/3 flex items-center my-2 text-xl capitalize">
            <div className="relative">
              <GiFireplace />
              {!indoorFireplace && (
                <div className="text-2xl absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                  x
                </div>
              )}
            </div>{" "}
            <span className={`ml-2 ${!indoorFireplace && `line-through`} `}>
              lò sưởi
            </span>
          </div>
        </div>
        {/* <button className="px-4 py-2 border-[1px] border-black dark:border-white rounded-md mt-2 hover:opacity-50 transition-all duration-300 ease-linear">
          Hiển thị tất cả 22 tiện ích
        </button> */}
      </div>
      <div className="py-5 border-t-[1px] border-gray-500">
        <h3 className="text-xl font-bold">Chọn ngày nhận phòng</h3>
        <span className="font-light">Thêm ngày đi để biết giá chính xác</span>
        <Calendar
          // onChange={onChange}
          // tileClassName={handleDisableDay}
          locale={"vi-VI"}
          //   value={value}
          className="border-0 text-black mt-5 w-full bg-white dark:bg-gray-900 dark:text-white"
          showDoubleView={true}
          // onClickDay={handleChooseDay}
        />
      </div>
    </div>
  );
}
