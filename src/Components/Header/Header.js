import {
  AiOutlineSearch,
  AiOutlineGlobal,
  AiOutlineMenu,
} from "react-icons/ai";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { HiUserCircle } from "react-icons/hi";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import Search from "./Search/Search";
import { useEffect, useRef, useState } from "react";
import {
  setHeaderTrans,
  setSearchActive,
  setShowLanguageSetting,
  setShowNavMobile,
  setShowSearchMobile,
  setShowUserSetting,
} from "../../Store/HeaderSlice/HeaderSlice";
import LanguageSetting from "./LanguageSetting/LanguageSetting";
import { setMode } from "../../Store/RootSlice/RootSlice";
import UserSetting from "./UserSetting/UserSetting";
import NavMobile from "./NavMobile/NavMobile";
import Logo from "../Logo/Logo";

function Header() {
  const language = useSelector((state) => state.root.language);
  const mode = useSelector((state) => state.root.mode);
  const searchActive = useSelector((state) => state.header.searchActive);
  const scrollActive = useSelector((state) => state.header.scrollActive);
  const showSearch = useSelector((state) => state.header.showSearch);
  const headerTrans = useSelector((state) => state.header.headerTrans);

  const showLanguageSetting = useSelector(
    (state) => state.header.showLanguageSetting
  );
  const showUserSetting = useSelector((state) => state.header.showUserSetting);
  const homeChecked = useSelector((state) => state.header.homeChecked);

  const dispatch = useDispatch();
  const [lastScroll, setLastScroll] = useState(0);
  const headerRef = useRef(null);

  const scrollEvent = (e) => {
    if (showSearch) {
      const currentScroll = e.target.scrollingElement.scrollTop;
      if (currentScroll >= lastScroll) {
        dispatch(setSearchActive(false));
        setLastScroll(currentScroll);
      } else {
        dispatch(setSearchActive(true));
        setLastScroll(currentScroll);
      }
      if (homeChecked) {
        if (currentScroll > 500) {
          dispatch(setHeaderTrans(false));
        } else {
          dispatch(setHeaderTrans(true));
        }
      }
    }
  };

  useEffect(() => {
    scrollActive && window.addEventListener("scroll", scrollEvent);
    return () => {
      window.removeEventListener("scroll", scrollEvent);
    };
  }, [lastScroll, scrollActive, homeChecked]);

  const clickEvent = (e) => {
    if (scrollActive) {
      if (!headerRef.current.contains(e.target) && window.pageYOffset !== 0) {
        dispatch(setSearchActive(false));
      }
    } else {
      if (!headerRef.current.contains(e.target)) {
        dispatch(setSearchActive(false));
      }
    }
  };

  useEffect(() => {
    window.pageYOffset === 0 && dispatch(setSearchActive(true));
    window.addEventListener("click", clickEvent);
    return () => {
      window.removeEventListener("click", clickEvent);
    };
  }, []);

  return (
    <div
      ref={headerRef}
      id="header"
      className={`${
        searchActive && showSearch ? " md:h-[200px] h-[92px]" : "h-[92px]"
      } ${
        headerTrans
          ? "bg-transparent dark:bg-transparent"
          : "bg-white header__shadow dark:bg-black"
      }  fixed top-0 left-0 right-0 z-10  text-black  dark:text-white `}
    >
      <div className="relative md:container m-auto">
        <div className=" lg:px-20 lg:py-5 md:px-10 px-5 py-5">
          <div className=" flex items-center md:justify-between justify-between">
            <div className="sm:block hidden md:w-1/4 relative z-10">
              <Logo />
            </div>
            <div className="md:block marker: hidden flex-1">
              <div
                className={`${
                  !searchActive && showSearch ? "flex" : "hidden"
                }  lg:justify-center`}
              >
                <button
                  onClick={() => dispatch(setSearchActive(!searchActive))}
                  className="flex min-w-[250px] bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full items-center justify-between border-[1px] header__btn"
                >
                  <span className="font-medium">{language.HeaderSearch}</span>
                  <span className="p-2 text-white rounded-full primary--BGcolor">
                    <AiOutlineSearch />
                  </span>
                </button>
              </div>
            </div>
            <div className="md:flex hidden md:w-1/4 text-xl  justify-end relative z-10">
              <button
                onClick={() =>
                  dispatch(setShowLanguageSetting(!showLanguageSetting))
                }
                className={`${
                  mode === "DARK"
                    ? "bg-gray-800/[40%] hover:bg-gray-800"
                    : "bg-gray-50/[40%] hover:bg-gray-100"
                } ml-4 px-3 py-1 rounded-full transition-all duration-300 ease-linear `}
              >
                <AiOutlineGlobal />
              </button>

              <button
                onClick={() =>
                  dispatch(setMode(mode === "DARK" ? "LIGHT" : "DARK"))
                }
                className={`${
                  mode === "DARK"
                    ? "bg-gray-800/[40%] hover:bg-gray-800"
                    : "bg-gray-50/[40%] hover:bg-gray-100"
                } ml-4 px-3 py-1 rounded-full transition-all duration-300 ease-linear `}
              >
                {mode === "DARK" ? <BsFillSunFill /> : <BsFillMoonFill />}
              </button>
              <div className="relative">
                <button
                  onClick={() => dispatch(setShowUserSetting(!showUserSetting))}
                  className={`${
                    mode === "DARK"
                      ? "bg-gray-100 text-black"
                      : "bg-gray-800 text-white"
                  } flex items-center  px-3 py-1 rounded-full border ml-4 user__btn `}
                >
                  <AiOutlineMenu className="mr-4" />
                  <HiUserCircle className="text-3xl" />
                </button>
                {showUserSetting && <UserSetting />}
              </div>
            </div>
            {showSearch && (
              <button
                onClick={() => dispatch(setShowSearchMobile(true))}
                className="md:hidden flex items-center dark:bg-gray-800 px-4 py-2 rounded-full sm:flex-none sm:w-[300px] sm:mr-0 flex-1 mr-2 dark:border-gray-500 border-[1px]"
              >
                <AiOutlineSearch className="text-2xl" />
                <span className="ml-4">Ban se di dau</span>
              </button>
            )}
            <button
              onClick={() => dispatch(setShowNavMobile(true))}
              className="md:hidden block text-3xl font-bold"
            >
              <AiOutlineMenu className="" />
            </button>
          </div>
        </div>
        <div
          className={`${
            searchActive && showSearch ? "scale-100" : "scale-0"
          } transition duration-300 ease-linear absolute lg:top-5 md:top-[80px] md:block hidden left-0 right-0`}
        >
          <Search />
        </div>
      </div>
      <NavMobile />
      {showLanguageSetting && <LanguageSetting />}
    </div>
  );
}

export default Header;
