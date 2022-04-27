import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";

import "./DateBox.css";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveSearchForm,
  setSearchValue,
} from "../../../../Store/HeaderSlice/HeaderSlice";

function DateBox() {
  const dispatch = useDispatch();
  const searchValue = useSelector((state) => state.header.searchValue);

  const [value, setValue] = useState(null);
  const handleDisableDay = ({ date, view }) => {
    if (!moment(moment.now()).startOf("day").isSameOrBefore(moment(date))) {
      return "disable";
    } else {
      return "enable";
    }
  };
  const handleChooseDay = (e) => {
    const { inDate, outDate } = searchValue;
    if (!moment(moment.now()).startOf("day").isAfter(moment(e))) {
      if (!inDate) {
        dispatch(setSearchValue({ ...searchValue, inDate: e }));
        dispatch(setActiveSearchForm(1));
      } else {
        if (moment(inDate).isAfter(moment(e))) {
          dispatch(setSearchValue({ ...searchValue, inDate: e }));
          dispatch(setActiveSearchForm(1));
        } else {
          dispatch(setSearchValue({ ...searchValue, outDate: e }));
        }
      }
    }
  };

  useEffect(() => {
    if (searchValue.inDate || searchValue.outDate) {
      setValue([searchValue.inDate, searchValue.outDate]);
    }
  }, [searchValue]);

  return (
    <div id="date_box" className="px-5">
      <Calendar
        // onChange={onChange}
        tileClassName={handleDisableDay}
        locale={"vi-VI"}
        value={value}
        className="border-0"
        showDoubleView={true}
        onClickDay={handleChooseDay}
      />
    </div>
  );
}

export default DateBox;
