import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "./DateBox.css";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveSearchForm,
  setActiveSearchMobile,
  setSearchValue,
} from "../../../../Store/HeaderSlice/HeaderSlice";

function DateBox({ double = true, title = null }) {
  const dispatch = useDispatch();
  const searchValue = useSelector((state) => state.header.searchValue);

  const [value, setValue] = useState(null);
  const handleDisableDay = ({ date }) => {
    if (!moment(moment.now()).startOf("day").isSameOrBefore(moment(date))) {
      return "disable";
    } else {
      return "enable";
    }
  };
  const handleChooseDay = (e) => {
    if (!moment(moment.now()).startOf("day").isAfter(moment(e))) {
      if (!searchValue?.checkIn) {
        dispatch(setSearchValue({ ...searchValue, checkIn: e }));
        dispatch(setActiveSearchMobile(1));
      } else {
        if (moment(searchValue?.checkIn).isAfter(moment(e))) {
          dispatch(setSearchValue({ ...searchValue, checkIn: e }));
          dispatch(setActiveSearchForm(1));
          dispatch(setActiveSearchMobile(1));
        } else {
          dispatch(setSearchValue({ ...searchValue, checkOut: e }));
        }
      }
    }
  };

  useEffect(() => {
    setValue([searchValue?.checkIn, searchValue?.checkOut]);
  }, [searchValue]);

  return (
    <div id="date_box" className={`${double ? "px-5" : ""}`}>
      {title && <h5 className="font-bold text-xl mb-5">{title}</h5>}
      <Calendar
        tileClassName={handleDisableDay}
        locale={"vi-VI"}
        value={value}
        className="border-0"
        showDoubleView={double}
        onClickDay={handleChooseDay}
      />
    </div>
  );
}

export default DateBox;
