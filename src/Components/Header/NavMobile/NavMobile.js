import React, { useEffect, useState } from "react";
import {
  AiOutlineAppstore,
  AiOutlineGlobal,
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineLogout,
  AiOutlineSearch,
} from "react-icons/ai";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import { FaSignInAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  setShowLanguageSetting,
  setShowNavMobile,
  setShowSearchMobile,
} from "../../../Store/HeaderSlice/HeaderSlice";
import { setMode, setToken, setUser } from "../../../Store/RootSlice/RootSlice";
import NavMobileSearch from "./NavMobileSearch/NavMobileSearch";
import Logo from "../../Logo/Logo";

export default function NavMobile() {
  const location = useLocation();
  const dispatch = useDispatch();
  const showNavMobile = useSelector((state) => state.header.showNavMobile);

  const mode = useSelector((state) => state.root.mode);
  const user = useSelector((state) => state.root.user);
  const language = useSelector((state) => state.root.language);

  const handleLogOut = () => {
    dispatch(setUser(null));
    dispatch(setToken(null));
  };

  const handlelanguage = () => {
    dispatch(setShowNavMobile(false));
    dispatch(setShowLanguageSetting(true));
  };

  const handleShowSearch = () => {
    dispatch(setShowNavMobile(false));
    dispatch(setShowSearchMobile(true));
  };

  const getActiveClass = ({ isActive }) => {
    const classActive =
      "flex items-center text-xl py-3 px-5 hover:bg-gray-200 dark:hover:bg-gray-700";
    return isActive
      ? classActive + " bg-gray-200 dark:bg-gray-700 "
      : classActive;
  };

  useEffect(() => {
    return () => {
      dispatch(setShowNavMobile(false));
    };
  }, [location]);

  return (
    <div
      className={`
      ${showNavMobile ? "fixed right-0" : "w-0"} 
      top-0 left-0 bottom-0 z-[999] overflow-hidden`}
    >
      <div className="relative w-full h-full">
        <div
          className={`${
            showNavMobile ? "sm:w-[500px] w-[80%]" : "w-0"
          } absolute top-0 left-0 bottom-0 z-10 bg-white dark:bg-gray-800 pt-5 pb-5  transition-all duration-300 ease-linear `}
        >
          <div className="pl-5 block mb-10">
            <Logo />
          </div>
          <div className=" py-3 border-t-[1px]  dark:border-gray-700">
            <NavLink to={"/"} className={getActiveClass}>
              <AiOutlineHome className="text-3xl" />
              <span className="ml-4">{language.menu}</span>
            </NavLink>
            <NavLink to={"/rooms"} className={getActiveClass}>
              <AiOutlineAppstore className="text-3xl" />
              <span className="ml-4">{language.roomList}</span>
            </NavLink>
          </div>
          <div className=" py-3 border-t-[1px]  dark:border-gray-700">
            <button
              onClick={handleShowSearch}
              className="w-full flex items-center text-xl  py-3 px-5 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <AiOutlineSearch className="text-3xl" />
              <span className="ml-4">{language.Search}</span>
            </button>
            <button
              onClick={handlelanguage}
              className="w-full flex items-center text-xl  py-3 px-5 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <AiOutlineGlobal className="text-3xl" />
              <span className="ml-4">{language.language}</span>
            </button>
            <button
              onClick={() =>
                dispatch(setMode(mode === "DARK" ? "LIGHT" : "DARK"))
              }
              className="w-full flex items-center text-xl  py-3 px-5 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {mode === "DARK" ? (
                <>
                  <BsFillSunFill className="text-3xl" />
                  <span className="ml-4">{language.day}</span>
                </>
              ) : (
                <>
                  <BsFillMoonFill className="text-3xl" />
                  <span className="ml-4">{language.night}</span>
                </>
              )}
            </button>
          </div>
          <div className=" py-3 border-t-[1px]  dark:border-gray-700">
            {user && (
              <>
                <Link
                  to={"/user"}
                  className="flex items-center text-xl  py-3 px-5 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <div className="w-[50px] h-[50px] rounded-full overflow-hidden mr-2">
                    <img
                      src={user.avatar}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="">
                    <span className="font-bold">{user.name}</span>
                    <p>{language.YourProfile}</p>
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
                  className="w-full flex items-center text-xl  py-3 px-5 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <AiOutlineLogout className="text-3xl" />
                  <span className="ml-4">{language.LogOut}</span>
                </button>
              </>
            )}
            {!user && (
              <>
                <Link
                  to={"/account/signUp"}
                  className="w-full flex items-center text-xl  py-3 px-5 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <FaSignInAlt className="text-3xl" />
                  <span className="ml-4">{language.SignUp}</span>
                </Link>
                <Link
                  to={"/account/signIn"}
                  className="w-full flex items-center text-xl  py-3 px-5 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <AiOutlineLogin className="text-3xl" />
                  <span className="ml-4">{language.LogIn}</span>
                </Link>
              </>
            )}
          </div>
        </div>
        <div
          onClick={() => dispatch(setShowNavMobile(false))}
          className="absolute top-0 left-0 bottom-0 right-0 bg-black/[0.5]"
        ></div>
      </div>
      <NavMobileSearch />
    </div>
  );
}
