import React, { useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import { AiOutlineDown } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { httpServ, localStorageServ } from "../../../ServiceWorkers";
import { getInforSearchValue, getVNDMoney } from "../../../Untils";
import Button from "../../Button/Button";
import MemberBox from "../../Header/Search/MemberBox/MemberBox";
import { TailSpin } from "react-loading-icons";
import "./BookTicket.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setLocation } from "../../../Store/LoginSlice/LoginSlice";

export default function BookTicket({ price, id }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const searchValue = useSelector((state) => state.header.searchValue);
  const language = useSelector((state) => state.root.language);
  const token = useSelector((state) => state.root.token);
  const user = useSelector((state) => state.root.user);
  const [showDateBox, setShowDateBox] = useState(false);
  const [showMemberBox, setShowMemberBox] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [mess, setMess] = useState({
    type: "SUCCESS",
    mess: "",
  });

  const dateBoxRef = useRef(null);
  const memberBoxRef = useRef(null);

  const handleBookTicket = () => {
    if (!loadingBtn) {
      setLoadingBtn(true);
      httpServ
        .datPhong(
          {
            roomId: id,
            checkIn: "2021-05-11T17:00:00.000+00:00",
            checkOut: "2021-05-15T17:00:00.000+00:00",
          },
          token
        )
        .then((res) => {
          setMess({
            type: "SUCCESS",
            mess: language.RoomSuccessfulBooking,
          });
          setLoadingBtn(false);
        });
    }
  };

  const handleForwardLogin = () => {
    dispatch(setLocation(location.pathname));
    navigate("/account/signIn");
  };

  const clickEvent = (e) => {
    setMess({
      type: "SUCCESS",
      mess: "",
    });
    if (showDateBox) {
      const checkValid =
        e.target.classList.length > 0
          ? e.target.classList.contains("react-calendar__tile")
          : e.target.getAttribute("aria-label");
      if (!dateBoxRef.current.contains(e.target) && !checkValid) {
        setShowDateBox(false);
      }
    }
    if (showMemberBox) {
      if (!memberBoxRef.current.contains(e.target)) {
        setShowMemberBox(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("click", clickEvent);
    window.addEventListener("click", clickEvent);
    return () => {
      window.removeEventListener("click", clickEvent);
    };
  }, [showDateBox, showMemberBox]);
  return (
    <div className="h-full relative w-full mt-5 pb-5">
      <div className="sticky top-[200px] ">
        <div className="px-10 py-5  min-w-[200px] rounded-xl border-[1px] ">
          <h5 className="lg:text-2xl md:text-lg font-bold">
            {getVNDMoney(price)}{" "}
            <span className="lg:text-lg md:text-sm font-normal">
              /{language.Night}
            </span>
          </h5>
          <div className="mt-5 rounded-lg  border-[1px] border-gray-500">
            <div
              onClick={() => setShowDateBox(true)}
              className="flex items-stretch relative"
            >
              <div className="flex-1 px-3 py-2 cursor-pointer">
                <span className="font-medium uppercase text-xs one__line__text">
                  {language.SearchTakeRoom}
                </span>
                <p className="text-base font-thin one__line__text">
                  {" "}
                  {getInforSearchValue("inDate", searchValue) ||
                    language.SearchAddDay}
                </p>
              </div>
              <div className="w-[1px] bg-gray-500"></div>
              <div className="flex-1 px-3 py-2 cursor-pointer">
                <span className="font-medium uppercase text-xs one__line__text">
                  {language.SearchPayRoom}
                </span>
                <p className="text-base font-thin one__line__text">
                  {getInforSearchValue("outDate", searchValue) ||
                    language.SearchAddDay}
                </p>
              </div>
              {showDateBox && (
                <div
                  ref={dateBoxRef}
                  id="BookTicket"
                  className="z-10 absolute top-[-28px] right-[-32px] px-[32px] py-[28px] lg:w-[200%] md:w-[600px] bg-white  dark:text-white dark:bg-gray-600 rounded-3xl"
                >
                  <div className="h-full w-full  ">
                    <div className="flex w-full">
                      <div className="w-1/2">
                        <h5 className="text-2xl font-bold">
                          {language.RoomChooseDate}
                        </h5>
                        <span className="text-gray-600 dark:text-gray-200">
                          {language.RoomSelectCheckIn}
                        </span>
                      </div>
                      <div className="w-1/2 flex rounded-lg overflow-hidden border-[1px]">
                        <div className="flex-1  py-[7px] px-3 flex flex-col">
                          <label className="font-bold" htmlFor="">
                            {language.SearchTakeRoom}
                          </label>
                          <span className="text-gray-600 dark:text-gray-200">
                            {getInforSearchValue("inDate", searchValue) ||
                              language.SearchAddDay}
                          </span>
                        </div>
                        <div className="w-[1px] bg-white"></div>
                        <div className="flex-1  py-[7px] px-3 flex flex-col">
                          <label className="font-bold" htmlFor="">
                            {language.SearchTakeRoom}
                          </label>
                          <span className="text-gray-600 dark:text-gray-200">
                            {getInforSearchValue("outDate", searchValue) ||
                              language.SearchAddDay}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Calendar
                      // onChange={onChange}
                      // tileClassName={handleDisableDay}
                      locale={"vi-VI"}
                      //   value={value}
                      className="border-0 text-black mt-5 w-full bg-white dark:bg-gray-600 dark:text-white"
                      showDoubleView={true}
                      // onClickDay={handleChooseDay}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="relative ">
              <div className="px-3 py-2 items-center flex justify-between cursor-pointer border-t-[1px] border-gray-500">
                <div
                  className=""
                  onClick={() => setShowMemberBox(!showMemberBox)}
                >
                  <span className="font-medium uppercase text-xs">
                    {language.SearchGuest}
                  </span>
                  <p className="text-base font-thin one__line__text">
                    {getInforSearchValue("members", searchValue) ||
                      language.SearchAddGuest}
                  </p>
                </div>
                <AiOutlineDown />
              </div>

              {showMemberBox && (
                <div
                  ref={memberBoxRef}
                  id="MemberBoxTicket"
                  className="absolute top-full right-0 2xl:left-0 bg-white  dark:text-white dark:bg-gray-600 rounded-md"
                >
                  <MemberBox />
                </div>
              )}
            </div>
          </div>
          {mess.mess && (
            <p
              className={`mt-5 font-medium capitalize ${
                mess.type === "SUCCESS" ? "text-blue-300" : "text-red-500"
              }`}
            >
              {mess.mess}
            </p>
          )}
          {user ? (
            <button
              onClick={handleBookTicket}
              className={`mt-5 w-full ${
                loadingBtn ? "cursor-not-allowed" : ""
              }`}
            >
              <Button>
                {loadingBtn ? (
                  <TailSpin width={"2em"} height={"2em"} />
                ) : (
                  <span>{language.RoomBooking}</span>
                )}
              </Button>
            </button>
          ) : (
            <p className="mt-5">
              Bạn cần đăng nhập để đặt phòng{" "}
              <button
                onClick={handleForwardLogin}
                className="font-bold text-blue-300 hover:opacity-70"
              >
                Đăng nhập
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
