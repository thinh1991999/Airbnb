import React from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setLocation } from "../../Store/LoginSlice/LoginSlice";

export default function RequireSignIn() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleForwardLogin = () => {
    dispatch(setLocation(location.pathname));
    navigate("/account/signIn");
  };
  return (
    <p className="mt-5">
      Bạn cần đăng nhập để đặt phòng{" "}
      <button
        onClick={handleForwardLogin}
        className="font-bold text-blue-300 hover:opacity-70"
      >
        Đăng nhập
      </button>
    </p>
  );
}
