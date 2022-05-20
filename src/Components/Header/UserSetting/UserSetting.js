import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { unknowImg } from "../../../Shared/Constant";
import { setShowUserSetting } from "../../../Store/HeaderSlice/HeaderSlice";
import { setToken, setUser } from "../../../Store/RootSlice/RootSlice";

export default function UserSetting() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.root.user);
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
      className="absolute text-base top-[calc(100%_+_10px)] lg:min-w-[200px]  py-3 right-0 bg-gray-600 text-white  dark:text-black dark:bg-white rounded-lg"
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
                <span className="font-thin">See ur profile</span>
              </div>
            </Link>
            {user?.type === "ADMIN" && (
              <Link
                to={"/admin"}
                className="px-5 py-2 flex items-center hover:dark:bg-gray-200 hover:bg-gray-500 cursor-pointer"
              >
                <div className="">
                  <span className="font-bold">Admin</span>
                </div>
              </Link>
            )}
            <button
              onClick={handleLogOut}
              className="hover:dark:bg-gray-200 hover:bg-gray-500 px-5 py-2 text-left"
            >
              Dang xuat
            </button>
          </>
        ) : (
          <>
            <Link
              to={"/account/signUp"}
              className="font-semibold cursor-pointer hover:bg-gray-500 hover:dark:bg-gray-200 px-5 py-2"
            >
              Dang ky
            </Link>
            <Link
              to={"/account/signIn"}
              className="font-semibold cursor-pointer hover:bg-gray-500 hover:dark:bg-gray-200 px-5 py-2"
            >
              Dang Nhap
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
