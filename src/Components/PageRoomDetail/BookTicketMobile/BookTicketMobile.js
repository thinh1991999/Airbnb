import React, { useEffect, useMemo, useState } from "react";
import _ from "lodash";
import { AiFillStar, AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setSaveValueMobile } from "../../../Store/HeaderSlice/HeaderSlice";
import { setShowBookTicketMB } from "../../../Store/RoomDetailSlice/RoomDetailSlice";
import { getInforSearchValue, getVNDMoney } from "../../../Untils";
import Button from "../../Button/Button";
import DateBox from "../../Header/Search/DateBox/DateBox";
import MemberBox from "../../Header/Search/MemberBox/MemberBox";
import RequireSignIn from "../../RequireSignIn/RequireSignIn";

export default function BookTicketMobile({ detailData }) {
  const dispatch = useDispatch();
  const showBookTicketMB = useSelector(
    (state) => state.roomDetail.showBookTicketMB
  );
  const language = useSelector((state) => state.root.language);
  const user = useSelector((state) => state.root.user);
  const searchValue = useSelector((state) => state.header.searchValue);

  const [timeBooking, setTimeBooking] = useState("");

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

  const handleBooking = () => {
    if (checkBooking) {
    } else {
      dispatch(setShowBookTicketMB(true));
    }
  };

  // const handleSaveInfoBooking = () => {
  //   if (checkBooking) {
  //     dispatch(setSaveValueMobile());
  //     dispatch(setShowBookTicketMB(false));
  //   }
  // };

  useEffect(() => {
    let newValue = "";
    const inDateText = getInforSearchValue("inDate", searchValue);
    const outDateText = getInforSearchValue("outDate", searchValue);
    if (inDateText && outDateText) {
      newValue = inDateText + "->" + outDateText;
      setTimeBooking(newValue);
    } else {
      setTimeBooking(null);
    }
  }, [searchValue]);

  const { price, locationId } = detailData;

  return (
    <>
      <div className="fixed left-0 right-0 bottom-0  bg-white dark:bg-gray-800 border-t z-50">
        <div className="px-5 py-5 flex justify-between items-center">
          <div className={`${user ? "" : "sm:block hidden"}`}>
            <p className="flex items-center">
              <span className="font-bold text-xl">{getVNDMoney(price)}</span>
              <span>/dem</span>
            </p>

            {timeBooking ? (
              <p className="font-light">{timeBooking}</p>
            ) : (
              <div className="flex items-center">
                <span className="text-pink-500 mr-1">
                  <AiFillStar />
                </span>{" "}
                {locationId?.valueate / 2 || 4}{" "}
                <span className="font-thin ">(169 {language.Rating})</span>
              </div>
            )}
          </div>

          {user ? (
            <button onClick={handleBooking}>
              <Button>
                <span className="sm:text-base text-xs">
                  {checkBooking ? "Đặt phòng" : "Đăng ký đặt phòng"}
                </span>
              </Button>
            </button>
          ) : (
            <RequireSignIn />
          )}
        </div>
      </div>
      <div
        className={`${
          showBookTicketMB ? "translate-y-0" : "translate-y-full"
        } transition-all duration-300 ease-linear p-5 fixed bottom-0 left-0 right-0 top-0 bg-white dark:bg-gray-800 z-40 overflow-y-auto`}
      >
        <div className="">
          <button
            onClick={() => dispatch(setShowBookTicketMB(false))}
            className="text-3xl"
          >
            <AiOutlineClose />
          </button>
        </div>
        <div className="mt-5 pb-20">
          <div className="">
            <h5 className="font-bold text-2xl">
              Chon ngay {searchValue?.inDate ? "tra phong" : "nhan phong"}
            </h5>
            <span>Them ngay de biet gia chinh xac</span>
            <div className="mt-5">
              <DateBox double={false} mobile={true} />
            </div>
          </div>
          <div className="mt-10">
            <h5 className="font-bold text-2xl">Chon so luong hanh khach</h5>
            <div className="">
              <MemberBox />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
