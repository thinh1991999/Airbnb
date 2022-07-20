import React, { useEffect, useMemo, useRef, useState } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { httpServ } from "../../../ServiceWorkers";
import { getInforSearchValue, getVNDMoney } from "../../../Untils";
import Button from "../../Button/Button";
import MemberBox from "../../Header/Search/MemberBox/MemberBox";
import { TailSpin } from "react-loading-icons";
import "./BookTicket.css";
import { useLocation, useNavigate } from "react-router-dom";
import { setLocation } from "../../../Store/LoginSlice/LoginSlice";
import _ from "lodash";
import { toast } from "react-toastify";
import {
  resetSearchValue,
  setSearchValue,
} from "../../../Store/HeaderSlice/HeaderSlice";
import DateBox from "../../Header/Search/DateBox/DateBox";
import RequireSignIn from "../../RequireSignIn/RequireSignIn";

export default function BookTicket({ price, id, setReloadTickets }) {
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

  const checkBooking = useMemo(() => {
    if (
      searchValue?.checkIn &&
      searchValue?.checkOut &&
      !_.isEmpty(searchValue?.members)
    ) {
      return true;
    }
    return false;
  }, [searchValue]);

  const dateBoxRef = useRef(null);
  const memberBoxRef = useRef(null);

  const handleBookTicket = () => {
    if (checkBooking) {
      if (!loadingBtn) {
        setLoadingBtn(true);
        httpServ
          .datPhong(
            {
              roomId: id,
              checkIn: "2022-06-13T17:00:00.000Z",
              checkOut: "2022-06-21T17:00:00.000Z",
              userId: user?._id,
            },
            token
          )
          .then((res) => {
            setReloadTickets(true);
            dispatch(resetSearchValue());
            setMess({
              type: "SUCCESS",
              mess: language.RoomSuccessfulBooking,
            });
            setLoadingBtn(false);
            toast.success("Đặt phòng thành công!");
          });
      }
    } else {
      toast.error("Vui lòng chọn đầy đủ thông tin đặt phòng!");
    }
  };

  const handleForwardLogin = () => {
    dispatch(setLocation(location.pathname));
    navigate("/account/signIn");
  };

  const handleClearDay = () => {
    dispatch(
      setSearchValue({
        members: { ...searchValue?.members },
        checkIn: null,
        checkOut: null,
      })
    );
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
                  {getInforSearchValue("checkIn", searchValue) ||
                    language.SearchAddDay}
                </p>
              </div>
              <div className="w-[1px] bg-gray-500"></div>
              <div className="flex-1 px-3 py-2 cursor-pointer">
                <span className="font-medium uppercase text-xs one__line__text">
                  {language.SearchPayRoom}
                </span>
                <p className="text-base font-thin one__line__text">
                  {getInforSearchValue("checkOut", searchValue) ||
                    language.SearchAddDay}
                </p>
              </div>
              {showDateBox && (
                <div
                  ref={dateBoxRef}
                  id="BookTicket"
                  className="z-10 absolute top-[-28px] right-[-32px] px-[32px] py-[28px] lg:w-[calc(200%_+_64px)] md:w-[600px] bg-white  dark:text-white dark:bg-gray-600 rounded-3xl"
                >
                  <div className="h-full w-full  ">
                    <div className="flex w-full">
                      <div className="w-1/2">
                        <h5 className="text-2xl font-bold ">
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
                          <span className="text-gray-600 dark:text-gray-200 one__line__text">
                            {getInforSearchValue("checkIn", searchValue) ||
                              language.SearchAddDay}
                          </span>
                        </div>
                        <div className="w-[1px] bg-white"></div>
                        <div className="flex-1  py-[7px] px-3 flex flex-col">
                          <label className="font-bold" htmlFor="">
                            {language.SearchTakeRoom}
                          </label>
                          <span className="text-gray-600 dark:text-gray-200 one__line__text">
                            {getInforSearchValue("checkOut", searchValue) ||
                              language.SearchAddDay}
                          </span>
                        </div>
                      </div>
                    </div>
                    <DateBox double={false} />
                    <div className="">
                      <button
                        onClick={handleClearDay}
                        className="underline mt-2 hover:text-red-500 transition-all duration-300 ease-linear"
                      >
                        {language.delDay}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="relative ">
              <div className="px-3 py-2  cursor-pointer border-t-[1px] border-gray-500">
                <div
                  onClick={() => setShowMemberBox(!showMemberBox)}
                  className="items-center flex justify-between"
                >
                  <div className="">
                    <span className="font-medium uppercase text-xs">
                      {language.SearchGuest}
                    </span>
                    <p className="text-base font-thin one__line__text">
                      {getInforSearchValue("members", searchValue) ||
                        language.SearchAddGuest}
                    </p>
                  </div>
                  {showMemberBox ? <AiOutlineUp /> : <AiOutlineDown />}
                </div>
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
            <div className="mt-5">
              <RequireSignIn title={language.RoomBooking} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
