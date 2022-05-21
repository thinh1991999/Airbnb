import React, { useEffect, useRef, useState } from "react";
import { TailSpin } from "react-loading-icons";
import { toast } from "react-toastify";
import { BsThreeDots } from "react-icons/bs";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { unknowImg } from "../../../Shared/Constant";
import { httpServ } from "../../../ServiceWorkers";
import {
  setComponentShow,
  setShowWarning,
  setRateData,
  setReloadRating,
} from "../../../Store/RoomDetailSlice/RoomDetailSlice";
import WarningDelete from "../WarningDelete/WarningDelete";
import RatingAdd from "./RatingAdd/RatingAdd";

export default function RatingShow({ id }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.root.token);
  const user = useSelector((state) => state.root.user);
  const rateData = useSelector((state) => state.roomDetail.rateData);
  const reloadRating = useSelector((state) => state.roomDetail.reloadRating);

  const optionRef = useRef([]);
  const btnRef = useRef([]);
  const [ratingLoading, setRatingLoading] = useState(true);
  const [showOption, setShowOption] = useState({
    id: null,
    show: false,
  });
  const [hideRates, setHideRates] = useState([]);
  const [delRates, setDelRates] = useState({});

  const handleHideRating = (id) => {
    if (hideRates.includes(id)) {
      const hideRatesCopy = [...hideRates];
      const idx = hideRatesCopy.findIndex((item) => {
        return item === id;
      });
      hideRatesCopy.splice(idx, 1);
      console.log(hideRatesCopy);
      setHideRates([...hideRatesCopy]);
    } else {
      setHideRates([...hideRates, id]);
    }
    setShowOption({
      id: null,
      show: false,
    });
  };

  const handleDeleteRating = (id) => {
    setDelRates({ ...delRates, [id]: id });
    httpServ.xoaDanhGia(id, token).then(() => {
      const sdObj = { ...delRates };
      delete sdObj[id];
      setDelRates(sdObj);
      const arr = [...rateData];
      const idx = arr.findIndex((item) => item._id === id);
      arr.splice(idx, 1);
      dispatch(setRateData(arr));
      dispatch(setReloadRating(true));
      toast.success("Xóa đánh giá thành công!");
    });
  };
  const handleShowDeleteRating = (id) => {
    dispatch(
      setComponentShow(
        <WarningDelete id={id} handleDeleteRating={handleDeleteRating} />
      )
    );
    dispatch(setShowWarning(true));
    setShowOption({
      id: null,
      show: false,
    });
  };

  const handleShowOption = (id) => {
    if (showOption.id !== id) {
      setShowOption({
        id,
        show: true,
      });
    } else {
      setShowOption({
        id,
        show: !showOption.show,
      });
    }
  };

  useEffect(() => {
    httpServ.layDanhGiaPhong(id).then((res) => {
      const arr = res.data;
      _.reverse(arr);
      dispatch(setRateData(arr));
      setRatingLoading(false);
    });
  }, [id]);

  useEffect(() => {
    if (reloadRating) {
      httpServ.layDanhGiaPhong(id).then((res) => {
        const arr = res.data;
        _.reverse(arr);
        dispatch(setRateData(arr));
        dispatch(setReloadRating(false));
      });
    }
  }, [reloadRating]);

  const clickEvent = (e) => {
    let validBtn = true;
    btnRef.current.forEach((btnEl) => {
      if (btnEl.contains(e.target)) {
        validBtn = false;
      }
    });
    optionRef.current.forEach((optionEl) => {
      if (!optionEl?.contains(e.target) && validBtn) {
        setShowOption({
          id: null,
          show: false,
        });
      }
    });
  };

  useEffect(() => {
    window.addEventListener("click", clickEvent);
    return () => {
      window.removeEventListener("click", clickEvent);
    };
  }, [rateData]);

  return (
    <div className="py-5 border-t-[1px] border-b-[1px] border-gray-500">
      <h2 className="text-xl font-bold capitalize">
        đánh giá : {rateData?.length}{" "}
      </h2>
      <RatingAdd id={id} />
      {ratingLoading ? (
        <div className="flex justify-center">
          <TailSpin />
        </div>
      ) : (
        <>
          {rateData.map((rateItem, index) => {
            const {
              content,
              created_at,
              _id,
              userId: { name, avatar, _id: userId },
            } = rateItem;
            const timeFromNow = moment(created_at).fromNow();
            return (
              <div
                className={`${
                  (hideRates.includes(_id) || delRates[_id]) && "opacity-50"
                } flex items-center my-5 group `}
              >
                <div className="mr-4">
                  <img
                    src={avatar || unknowImg}
                    className="w-[50px] h-[50px] object-center rounded-full"
                    alt=""
                  />
                </div>
                <div className="">
                  <h5 className="text-2xl font-bold flex items-center">
                    <span>{name || "..."}</span>
                    <span className="text-sm font-thin ml-2">
                      {timeFromNow}
                    </span>
                    <div className=" flex relative text-sm w-[20px] h-[20px] ml-2">
                      <button
                        ref={(el) => (btnRef.current[index] = el)}
                        className="group-hover:flex hidden w-[20px] h-[20px] bg-gray-800 rounded-full justify-center items-center"
                        onClick={() => handleShowOption(_id)}
                      >
                        <BsThreeDots />
                      </button>
                      {_id === showOption.id && showOption.show && (
                        <div
                          ref={(el) => (optionRef.current[index] = el)}
                          className="z-50 absolute min-w-[200px] bg-gray-800 top-full py-2  rounded-md"
                        >
                          <ul className="text-lg font-medium">
                            <li
                              onClick={() => handleHideRating(_id)}
                              className="py-2 px-3 cursor-pointer hover:bg-gray-700"
                            >
                              {hideRates.includes(_id)
                                ? "Hiện đánh giá"
                                : "Ẩn đánh giá"}
                            </li>
                            {user?._id === userId && (
                              <>
                                <li
                                  onClick={() => handleShowDeleteRating(_id)}
                                  className="py-2 px-3 cursor-pointer hover:bg-gray-700"
                                >
                                  Xóa đánh giá
                                </li>
                                <li className="py-2 px-3 cursor-pointer hover:bg-gray-700">
                                  Chỉnh sửa đánh giá
                                </li>
                              </>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  </h5>
                  <p className="text-lg">{content}</p>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
