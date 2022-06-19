import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineSend } from "react-icons/ai";
import { httpServ } from "../../../../ServiceWorkers";
import { toast } from "react-toastify";
import { setReloadRating } from "../../../../Store/RoomDetailSlice/RoomDetailSlice";
import RequireSignIn from "../../../RequireSignIn/RequireSignIn";

export default function RatingAdd({ id }) {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.root.language);
  const token = useSelector((state) => state.root.token);
  const user = useSelector((state) => state.root.user);
  const [ratingValue, setRatingValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ratingValue.trim().length > 0) {
      httpServ
        .taoDanhGia(
          id,
          {
            content: ratingValue,
          },
          token
        )
        .then((res) => {
          setRatingValue("");
          dispatch(setReloadRating(true));
        });
    } else {
      toast.error("Đánh giá không được rỗng!");
    }
  };

  return (
    <div className="w-full border-[1px] border-gray-500 px-5 py-3 rounded-full mt-5">
      {user ? (
        <div className="flex items-center justify-between">
          <img
            src={user?.avatar}
            className="w-[40px] h-[40px] rounded-full mr-5"
            alt=""
          />
          <form className="flex items-center flex-1" onSubmit={handleSubmit}>
            <input
              value={ratingValue}
              onChange={(e) => setRatingValue(e.target.value)}
              type="text"
              placeholder={language.RoomEnterRating}
              className="w-full dark:bg-gray-900 text-lg outline-none"
            />
            <button type="submit" className="text-3xl">
              <AiOutlineSend />
            </button>
          </form>
        </div>
      ) : (
        <RequireSignIn title={language.Rating} />
      )}
    </div>
  );
}
