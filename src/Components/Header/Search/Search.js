import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineSearch } from "react-icons/ai";
import "./Search.css";
import SearchBox from "./SearchBox/SearchBox";
import {
  setSearchValue,
  setElementSearch,
  setActiveSearchForm,
} from "../../../Store/HeaderSlice/HeaderSlice";
import PlaceBox from "./PlaceBox/PlaceBox";
import DateBox from "./DateBox/DateBox";
import moment from "moment";

function Search() {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.root.language);
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
  const handleClickSearch = (index, element) => {
    dispatch(setActiveSearchForm(index));
    dispatch(setElementSearch({ element, left: 0, right: 0 }));
  };

  useEffect(() => {
    setNavData([
      {
        title: language.HeaderAddress,
        buttons: [
          {
            name: "Nhận phòng",
            value: "Thêm ngày",
            hint: "inDate",
            element: <DateBox />,
          },
          {
            name: "Trả phòng",
            value: "Thêm ngày",
            hint: "outDate",
            element: <DateBox />,
          },
          {
            name: "Khách",
            value: "Thêm khách",
          },
        ],
      },
      {
        title: language.HeaderEx,
        buttons: [
          {
            name: "Ngày",
            value: "Thêm thời gian muốn tham gia",
          },
        ],
      },
      {
        title: language.HeaderExOl,
      },
    ]);
  }, [language]);

  const eventClick = (e) => {
    if (!formRef.current.contains(e.target)) {
      dispatch(setActiveSearchForm(null));
    }
  };

  useEffect(() => {
    window.addEventListener("click", eventClick);
    return () => {
      window.removeEventListener("click", eventClick);
    };
  }, []);

  // useEffect(() => {
  //   if (activeSearchForm === null) {
  //     setElementSearch(null);
  //   }
  // }, [activeSearchForm]);

  return (
    <div className={`absolute  top-0 mt-5 left-0 right-0  bg-black`}>
      <div className="">
        <div className="flex justify-center">
          <ul
            className={` flex text-center justify-center transition-all duration-300 ease-linear`}
          >
            {navData.map((item, index) => {
              return (
                <li
                  className="relative mx-4 whitespace-nowrap group font-medium cursor-pointer py-2 transition-all duration-300 ease-linear"
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
                    } absolute bottom-0  group-hover:w-full transition-all duration-300 ease-linear h-[2px] bg-white`}
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
              onSubmit={(e) => e.preventDefault()}
              className="mt-5 lg:min-w-[800px]  flex justify-between bg-stone-200 rounded-full relative"
              ref={formRef}
            >
              <div
                className={`${
                  activeSearchForm === "SEARCH_INPUT"
                    ? "bg-white search__shadow"
                    : "hover:bg-stone-300"
                } flex flex-1  cursor-pointer text-black rounded-full flex-col text-sm font-semibold`}
              >
                <label
                  htmlFor="searchPlace"
                  className="px-8 pt-4 cursor-pointer"
                >
                  Địa điểm
                </label>
                <input
                  onFocus={handleFocusInput}
                  onChange={(e) =>
                    dispatch(
                      setSearchValue({ ...searchValue, place: e.target.value })
                    )
                  }
                  autoComplete={"off"}
                  className="px-8 pb-4 bg-transparent outline-none placeholder:text-black"
                  type="text"
                  id="searchPlace"
                  placeholder="Bạn sắp đi đâu"
                  value={searchValue.place || ""}
                />
              </div>
              <div className="flex min-w-[50%]">
                {navData[currentNav]?.buttons?.map((item, index) => {
                  const { name, value, element, hint } = item;
                  if (index === navData[currentNav]?.buttons.length - 1) {
                    return (
                      <>
                        <div className="flex items-center">
                          <span className="text-black/[0.2] text-2xl font-thin">
                            |
                          </span>
                        </div>
                        <div
                          key={index}
                          className={` ${
                            activeSearchForm === index
                              ? "bg-white search__shadow"
                              : "hover:bg-stone-300"
                          } pl-8 cursor-pointer pr-2 flex flex-1 justify-between rounded-full text-black transition-all duration-300 ease-linear `}
                          onClick={() => handleClickSearch(index, element)}
                        >
                          <div className="flex flex-col items-start justify-center">
                            <span className="text-sm font-semibold">
                              {name}
                            </span>
                            <span className="text-sm">
                              {searchValue[hint] ? searchValue[hint] : value}
                            </span>
                          </div>
                          <div className="flex items-center ml-10">
                            <button
                              className={`${
                                activeSearchForm !== null
                                  ? "bg-gradient-to-r from-pink-600 to-pink-500"
                                  : "primary--BGcolor"
                              } p-4 transition-all duration-300 ease-linear justify-end flex items-center text-xl text-white rounded-full primary--BGcolor`}
                            >
                              <AiOutlineSearch />
                              <div
                                className={`${
                                  activeSearchForm !== null
                                    ? "w-[80px]"
                                    : "w-0 h-0"
                                } transition-all duration-300 ease-linear flex items-center overflow-hidden`}
                              >
                                <span className="capitalize whitespace-nowrap text-base font-medium">
                                  tim kiem
                                </span>
                              </div>
                            </button>
                          </div>
                        </div>
                      </>
                    );
                  }
                  return (
                    <>
                      <div className="flex items-center">
                        <span className="text-black/[0.2] text-2xl font-thin">
                          |
                        </span>
                      </div>
                      <button
                        key={index}
                        className={` ${
                          activeSearchForm === index
                            ? "bg-white search__shadow"
                            : "hover:bg-stone-300"
                        } px-8 flex flex-col items-center justify-center rounded-full text-black transition-all duration-300 ease-linear `}
                        onClick={() => handleClickSearch(index, element)}
                        type={"button"}
                      >
                        <span className="text-sm font-semibold">{name}</span>
                        <span className="text-sm">
                          {searchValue[hint]
                            ? moment(searchValue[hint])
                                .format("MM/DD/YYYY")
                                .toString()
                            : value}
                        </span>
                      </button>
                    </>
                  );
                })}
              </div>
              {elementSearch && <SearchBox>{elementSearch?.element}</SearchBox>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
