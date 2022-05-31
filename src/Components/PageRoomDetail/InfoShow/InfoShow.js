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
import { useSelector } from "react-redux";

export default function InfoShow({ detailData }) {
  const language = useSelector((state) => state.root.language);
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
          {guests || 0} {language.GuestRoom},{bedRoom || 0} {language.Bedroom},{" "}
          {bath || 0} {language.Bathroom}
        </p>
      </div>
      <div className="py-5 border-t-[1px] border-gray-500">
        <h3 className="text-xl font-bold">{language.RoomDes}</h3>
        <p>{description}</p>
      </div>
      <div className="py-5 border-t-[1px] border-gray-500">
        <h3 className="text-xl font-bold">{language.RoomPlaceForU}</h3>
        <div className="flex flex-wrap">
          <div className="w-1/3 flex items-center my-2 text-xl capitalize ">
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
          <div className="w-1/3 flex items-center my-2 text-xl capitalize">
            <div className="relative">
              <FaSwimmingPool />
              {!pool && (
                <div className="text-2xl absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                  x
                </div>
              )}
            </div>{" "}
            <span className={`ml-2 ${!pool && `line-through`} `}>
              {language.Pool}
            </span>
          </div>
          <div className="w-1/3 flex items-center my-2 text-xl capitalize">
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
          <div className="w-1/3 flex items-center my-2 text-xl capitalize">
            <div className="relative">
              <GiCampCookingPot />
              {!kitchen && (
                <div className="text-2xl absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                  x
                </div>
              )}
            </div>{" "}
            <span className={`ml-2 ${!kitchen && `line-through`} `}>
              {language.Oven}
            </span>
          </div>
          <div className="w-1/3 flex items-center my-2 text-xl capitalize">
            <div className="relative">
              <MdOutlineLocalLaundryService />
              {!dryer && (
                <div className="text-2xl absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                  x
                </div>
              )}
            </div>{" "}
            <span className={`ml-2 ${!dryer && `line-through`} `}>
              {language.Dryer}
            </span>
          </div>
          <div className="w-1/3 flex items-center my-2 text-xl capitalize">
            <div className="relative">
              <MdOutlineElevator />
              {!elevator && (
                <div className="text-2xl absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                  x
                </div>
              )}
            </div>{" "}
            <span className={`ml-2 ${!elevator && `line-through`} `}>
              {language.Elevator}
            </span>
          </div>
          <div className="w-1/3 flex items-center my-2 text-xl capitalize">
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

          <div className="w-1/3 flex items-center my-2 text-xl capitalize">
            <div className="relative">
              <MdMicrowave />
              {!heating && (
                <div className="text-2xl absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                  x
                </div>
              )}
            </div>{" "}
            <span className={`ml-2 ${!heating && `line-through`} `}>
              {language.Microwave}
            </span>
          </div>
          <div className="w-1/3 flex items-center my-2 text-xl capitalize">
            <div className="relative">
              <MdOutlineHotTub />
              {!hotTub && (
                <div className="text-2xl absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                  x
                </div>
              )}
            </div>{" "}
            <span className={`ml-2 ${!hotTub && `line-through`} `}>
              {language.HotWater}
            </span>
          </div>
          <div className="w-1/3 flex items-center my-2 text-xl capitalize">
            <div className="relative">
              <GiFireplace />
              {!indoorFireplace && (
                <div className="text-2xl absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                  x
                </div>
              )}
            </div>{" "}
            <span className={`ml-2 ${!indoorFireplace && `line-through`} `}>
              {language.Heater}
            </span>
          </div>
        </div>
      </div>
      <div className="py-5 border-t-[1px] border-gray-500">
        <h3 className="text-xl font-bold">{language.RoomSelectCheckIn}</h3>
        <span className="font-light">{language.RoomAddTravelDate}</span>
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
