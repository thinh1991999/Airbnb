import React, { useEffect, useRef } from "react";
import { AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { FaSignInAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { unknowImg } from "../../../Shared/Constant";
import { setShowUserSetting } from "../../../Store/HeaderSlice/HeaderSlice";
import { setToken, setUser } from "../../../Store/RootSlice/RootSlice";

export default function UserSetting() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.root.user);
  const language = useSelector((state) => state.root.language);

  const wrapRef = useRef(null);

  const handleLogOut = () => {
    dispatch(setUser(null));
    dispatch(setToken(null));
  };

  const eventClick = (e) => {
    if (!wrapRef.current.contains(e.target)) {
      dispatch(setShowUserSetting(false));
    }
  };

  useEffect(() => {
    window.addEventListener("click", eventClick);
    return () => {
      window.removeEventListener("click", eventClick);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="absolute text-base top-[calc(100%_+_10px)] min-w-[200px]  py-3 right-0 bg-gray-600 text-white  dark:text-black dark:bg-white rounded-lg"
    >
      <div className="flex flex-col">
        {user ? (
          <>
            <Link
              to={"/user"}
              className="px-5 py-2 flex items-center hover:dark:bg-gray-200 hover:bg-gray-500 cursor-pointer"
            >
              <div className="mr-2">
                <img
                  src={user?.avatar || unknowImg}
                  alt=""
                  className="rounded-full w-[40px] h-[40px]"
                />
              </div>
              <div className="">
                <h5 className="font-bold one__line__text">{user?.name}</h5>
                <span className="font-thin">{language.YourProfile}</span>
              </div>
            </Link>
            {user?.type === "ADMIN" && (
              <Link
                to={"/admin"}
                className="px-5 py-2 flex items-center hover:dark:bg-gray-200 hover:bg-gray-500 cursor-pointer"
              >
                <MdOutlineAdminPanelSettings className="text-3xl" />
                <span className="font-bold ml-4">{language.AdminPage}</span>
              </Link>
            )}
            <button
              onClick={handleLogOut}
              className="hover:dark:bg-gray-200 hover:bg-gray-500 px-5 py-2 text-left flex items-center"
            >
              <span>
                <AiOutlineLogout className="mr-2" />
              </span>
              {language.LogOut}
            </button>
          </>
        ) : (
          <>
            <Link
              to={"/account/signUp"}
              className="font-semibold cursor-pointer hover:bg-gray-500 hover:dark:bg-gray-200 px-5 py-2 flex items-center"
            >
              <FaSignInAlt className="mr-2" />
              {language.SignIn}
            </Link>
            <Link
              to={"/account/signIn"}
              className="font-semibold cursor-pointer hover:bg-gray-500 hover:dark:bg-gray-200 px-5 py-2 flex items-center"
            >
              <AiOutlineLogin className="mr-2" />
              {language.LogIn}
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
