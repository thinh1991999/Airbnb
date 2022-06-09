import React, { useEffect, useState } from "react";
import {
  AiOutlineArrowLeft,
  AiOutlineClose,
  AiOutlineSearch,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setActiveSearchMobile,
  setElementSearchMobile,
  setSearchParams,
  setSearchValue,
  setShowSearchMobile,
} from "../../../../Store/HeaderSlice/HeaderSlice";
import { getInforSearchValue } from "../../../../Untils";
import DateBox from "../../Search/DateBox/DateBox";
import MemberBox from "../../Search/MemberBox/MemberBox";
import "./NavMobileSearch.css";
import PlaceBoxMobile from "./PlaceBoxMobile/PlaceBoxMobile";
import SearchBoxMobile from "./SearchBoxMobile/SearchBoxMobile";

export default function NavMobileSearch() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const language = useSelector((state) => state.root.language);
  const showSearchMobile = useSelector(
    (state) => state.header.showSearchMobile
  );
  const elementSearchMobile = useSelector(
    (state) => state.header.elementSearchMobile
  );
  const searchValue = useSelector((state) => state.header.searchValue);
  const searchParams = useSelector((state) => state.header.searchParams);
  const activeSearchMobile = useSelector(
    (state) => state.header.activeSearchMobile
  );

  const [navData, setNavData] = useState([]);
  const [currentNavMobile, setCurrentNavMobile] = useState(0);

  const handleSearch = () => {
    dispatch(setShowSearchMobile(false));
    navigate(
      `/rooms/${searchParams.locationId ? searchParams?.locationId : ""}`
    );
  };

  const handleClose = () => {
    if (elementSearchMobile) {
      dispatch(setActiveSearchMobile(null));
      dispatch(setElementSearchMobile(null));
    } else {
      dispatch(setShowSearchMobile(false));
    }
  };

  const handleShowPlaceBox = () => {
    dispatch(
      setElementSearchMobile({
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        component: <PlaceBoxMobile />,
      })
    );
  };

  const handleShowBox = (index) => {
    dispatch(setActiveSearchMobile(index));
  };

  const handleClearSearch = () => {
    dispatch(setSearchValue({ members: { NL: 1 } }));
    dispatch(setSearchParams({}));
  };

  useEffect(() => {
    activeSearchMobile !== null &&
      dispatch(
        setElementSearchMobile({
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          component:
            navData[currentNavMobile]?.buttons[activeSearchMobile].element,
        })
      );
  }, [activeSearchMobile]);

  useEffect(() => {
    setNavData([
      {
        title: language.HeaderAddress,
        buttons: [
          {
            name: language.SearchTakeRoom,
            value: language.SearchAddDay,
            hint: "inDate",
            element: <DateBox double={false} title={language.SearchTakeRoom} />,
          },
          {
            name: language.SearchPayRoom,
            value: language.SearchAddDay,
            hint: "outDate",
            element: <DateBox double={false} title={language.SearchPayRoom} />,
          },
          {
            name: language.SearchGuest,
            value: language.SearchAddGuest,
            hint: "members",
            element: <MemberBox />,
          },
        ],
      },
      {
        title: language.HeaderEx,
        buttons: [
          {
            name: "Ngày",
            value: "Thêm thời gian muốn tham gia",
            element: <DateBox />,
          },
        ],
      },
    ]);
  }, [language]);

  return (
    <div
      id="NavMobileSearch"
      className={`${
        showSearchMobile ? "translate-y-0" : "translate-y-full"
      } fixed top-0 left-0 right-0 bottom-0 bg-white dark:bg-gray-800 transition-all duration-300 ease-linear z-50`}
    >
      <div className=" min-h-full flex flex-col">
        <div className="flex p-5">
          <button onClick={() => handleClose()} className="text-2xl">
            {elementSearchMobile ? <AiOutlineArrowLeft /> : <AiOutlineClose />}
          </button>
          <div className="flex-1 flex justify-center">
            <ul className="flex items-center">
              {navData.map((navItem, index) => {
                return (
                  <li
                    onClick={() => setCurrentNavMobile(index)}
                    className={`${
                      index === currentNavMobile &&
                      "border-b-[2px] border-black dark:border-white"
                    } py-2 mx-2  `}
                    key={index}
                  >
                    {navItem.title}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="p-5 relative flex-1 flex flex-col">
          <div className="">
            <button
              onClick={handleShowPlaceBox}
              className="cursor-text w-full block text-left px-5 py-3 my-5 rounded-lg bg-gray-100 dark:bg-gray-700 border-[1px] border-gray-600 dark:border-gray-300"
            >
              <h5>Dia diem</h5>
              <p className="text-gray-400">
                {searchValue?.place || "Bạn sẽ đi đâu"}
              </p>
            </button>
            {navData[currentNavMobile]?.buttons?.map((item, index) => {
              const { name, hint } = item;
              let newValue = getInforSearchValue(hint, searchValue);
              return (
                <div
                  onClick={() => handleShowBox(index)}
                  key={index}
                  className="px-5 py-3 my-5 rounded-lg bg-gray-100 dark:bg-gray-700 border-[1px] border-gray-600 dark:border-gray-300"
                >
                  <h5>{name}</h5>
                  <p className="text-gray-400">{newValue || ""}</p>
                </div>
              );
            })}
          </div>
          <div className="flex-1 flex  items-end">
            <div className="w-full flex justify-between">
              <button onClick={handleClearSearch}>
                <span>Clear</span>
              </button>
              <button
                onClick={handleSearch}
                className={`bg-gradient-to-r from-pink-600 to-pink-500 p-4 transition-all duration-300 ease-linear justify-end flex items-center text-xl text-white rounded-lg `}
              >
                <AiOutlineSearch />
                <div
                  className={`w-[80px] transition-all duration-300 ease-linear flex justify-center items-center overflow-hidden`}
                >
                  <span className="capitalize whitespace-nowrap text-base font-medium">
                    {language.Search}
                  </span>
                </div>
              </button>
            </div>
          </div>
          <SearchBoxMobile />
        </div>
      </div>
    </div>
  );
}
