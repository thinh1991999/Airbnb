import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Search.css";
import SearchBox from "./SearchBox/SearchBox";
import {
  setSearchValue,
  setElementSearch,
  setActiveSearchForm,
} from "../../../Store/HeaderSlice/HeaderSlice";
import PlaceBox from "./PlaceBox/PlaceBox";
import DateBox from "./DateBox/DateBox";
import MemberBox from "./MemberBox/MemberBox";
import SearchNav from "./SearchNav/SearchNav";
import { useNavigate } from "react-router-dom";

function Search() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const language = useSelector((state) => state.root.language);
  const searchParams = useSelector((state) => state.header.searchParams);
  const activeSearchForm = useSelector(
    (state) => state.header.activeSearchForm
  );
  const searchValue = useSelector((state) => state.header.searchValue);
  const elementSearch = useSelector((state) => state.header.elementSearch);

  const [navData, setNavData] = useState([]);
  const [currentNav, setCurrentNav] = useState(0);

  const formRef = useRef(null);
  const handleFocusInput = () => {
    dispatch(setActiveSearchForm("SEARCH_INPUT"));
    dispatch(setElementSearch({ element: <PlaceBox />, left: 0 }));
  };

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      navigate(
        `/rooms/${searchParams.locationId ? searchParams?.locationId : ""}`
      );
    },
    [searchParams]
  );

  useEffect(() => {
    setNavData([
      {
        title: language.HeaderAddress,
        buttons: [
          {
            name: language.SearchTakeRoom,
            value: language.SearchAddDay,
            hint: "checkIn",
            element: <DateBox />,
          },
          {
            name: language.SearchPayRoom,
            value: language.SearchAddDay,
            hint: "checkOut",
            element: <DateBox />,
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
            name: language.time,
            value: "Thêm thời gian muốn tham gia",
            element: <DateBox />,
          },
        ],
      },
    ]);
  }, [language]);

  const eventClick = (e) => {
    if (!formRef.current.contains(e.target)) {
      dispatch(setActiveSearchForm(null));
    }
  };

  useEffect(() => {
    window.addEventListener("mousedown", eventClick);
    return () => {
      window.removeEventListener("mousedown", eventClick);
    };
  }, []);

  return (
    <div className={`absolute top-0 left-0 right-0  `}>
      <div className="">
        <div className="flex justify-center">
          <ul
            className={` flex text-center justify-center transition-all duration-300 ease-linear`}
          >
            {navData.map((item, index) => {
              return (
                <li
                  className="capitalize relative mx-4 whitespace-nowrap group font-medium cursor-pointer py-2 transition-all duration-300 ease-linear"
                  key={index}
                  onClick={() => {
                    setCurrentNav(index);
                    dispatch(setActiveSearchForm(null));
                  }}
                >
                  {item.title}
                  <div
                    className={`${
                      currentNav === index ? "w-full" : "w-0"
                    } absolute bottom-0  group-hover:w-full transition-all duration-300 ease-linear h-[2px] bg-black dark:bg-white`}
                  ></div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex justify-center ">
          <div className="">
            <form
              id="search"
              action=""
              onSubmit={handleSearch}
              className="mt-5 lg:min-w-[850px] md:min-w-[550px]  flex justify-between bg-gray-100 rounded-full relative"
              ref={formRef}
            >
              <div
                className={`${
                  activeSearchForm === "SEARCH_INPUT"
                    ? "bg-white  search__shadow"
                    : "hover:bg-gray-300"
                } flex flex-1  cursor-pointer text-black rounded-full flex-col text-sm font-semibold`}
              >
                <label
                  htmlFor="searchPlace"
                  className="px-8 pt-4 cursor-pointer"
                >
                  {language.SearchAdress}
                </label>
                <input
                  onFocus={handleFocusInput}
                  onChange={(e) => {
                    dispatch(
                      setSearchValue({ ...searchValue, place: e.target.value })
                    );
                  }}
                  autoComplete={"off"}
                  className="px-8 pb-4 bg-transparent outline-none dark:placeholder:text-black"
                  type="text"
                  id="searchPlace"
                  placeholder={language.SearchAdressFinal}
                  value={searchValue.place || ""}
                />
              </div>
              <div className="flex min-w-[50%]">
                <SearchNav
                  navData={navData}
                  currentNav={currentNav}
                  handleSearch={handleSearch}
                />
              </div>
              {elementSearch && activeSearchForm !== null && (
                <SearchBox>{elementSearch?.element}</SearchBox>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
