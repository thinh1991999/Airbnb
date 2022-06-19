import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setLocation } from "../../Store/LoginSlice/LoginSlice";

export default function RequireSignIn({ title }) {
  const language = useSelector((state) => state.root.language);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleForwardLogin = () => {
    dispatch(setLocation(location.pathname));
    navigate("/account/signIn");
  };
  return (
    <p className="">
      {language.loginRequired + " " + title}{" "}
      <button
        onClick={handleForwardLogin}
        className="font-bold text-blue-500 hover:opacity-70"
      >
        {language.LogIn}
      </button>
    </p>
  );
}
