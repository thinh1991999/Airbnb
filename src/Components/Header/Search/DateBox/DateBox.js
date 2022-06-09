import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";

import "./DateBox.css";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveSearchForm,
  setActiveSearchMobile,
  setSearchValue,
  setSearchValueMobile,
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
      if (!searchValue?.inDate) {
        dispatch(setSearchValue({ ...searchValue, inDate: e }));
        dispatch(setActiveSearchMobile(1));
      } else {
        if (moment(searchValue?.inDate).isAfter(moment(e))) {
          dispatch(setSearchValue({ ...searchValue, inDate: e }));
          dispatch(setActiveSearchForm(1));
          dispatch(setActiveSearchMobile(1));
        } else {
          dispatch(setSearchValue({ ...searchValue, outDate: e }));
        }
      }
    }
  };

  useEffect(() => {
    setValue([searchValue?.inDate, searchValue?.outDate]);
  }, [searchValue]);

  return (
    <div id="date_box" className="px-5">
      {title && <h5 className="font-bold text-xl mb-5">{title}</h5>}
      <Calendar
        // onChange={onChange}
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
