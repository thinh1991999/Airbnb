import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";

import "./DateBox.css";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveSearchForm,
  setSearchValue,
  setSearchValueMobile,
} from "../../../../Store/HeaderSlice/HeaderSlice";

function DateBox({ double = true, mobile = false }) {
  const dispatch = useDispatch();
  const searchValue = useSelector((state) => state.header.searchValue);
  const searchValueMobile = useSelector(
    (state) => state.header.searchValueMobile
  );

  const [value, setValue] = useState(null);
  const handleDisableDay = ({ date, view }) => {
    if (!moment(moment.now()).startOf("day").isSameOrBefore(moment(date))) {
      return "disable";
    } else {
      return "enable";
    }
  };
  const handleChooseDay = (e) => {
    if (!moment(moment.now()).startOf("day").isAfter(moment(e))) {
      switch (mobile) {
        case true:
          {
            if (setSearchValueMobile?.inDate) {
              dispatch(
                setSearchValueMobile({ ...searchValueMobile, inDate: e })
              );
            } else {
              if (moment(setSearchValueMobile?.inDate).isAfter(moment(e))) {
                dispatch(
                  setSearchValueMobile({ ...searchValueMobile, inDate: e })
                );
              } else {
                dispatch(
                  setSearchValueMobile({ ...searchValueMobile, outDate: e })
                );
              }
            }
          }
          break;
        case false: {
          if (searchValue?.inDate) {
            dispatch(setSearchValue({ ...searchValue, inDate: e }));
            dispatch(setActiveSearchForm(1));
          } else {
            if (moment(searchValue?.inDate).isAfter(moment(e))) {
              dispatch(setSearchValue({ ...searchValue, inDate: e }));
              dispatch(setActiveSearchForm(1));
            } else {
              dispatch(setSearchValue({ ...searchValue, outDate: e }));
            }
          }
          break;
        }
        default:
          break;
      }
    }
  };

  useEffect(() => {
    if (mobile) {
      if (searchValueMobile.inDate || searchValueMobile.outDate) {
        setValue([searchValueMobile.inDate, searchValueMobile.outDate]);
      }
    } else {
      if (searchValue.inDate || searchValue.outDate) {
        setValue([searchValue.inDate, searchValue.outDate]);
      }
    }
  }, [searchValue, searchValueMobile, mobile]);

  return (
    <div id="date_box" className="px-5">
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
