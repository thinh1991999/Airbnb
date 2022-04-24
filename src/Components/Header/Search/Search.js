import { useEffect, useRef, useState } from "react";
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
import moment from "moment";
import MemberBox from "./MemberBox/MemberBox";
import SearchNav from "./SearchNav/SearchNav";

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
                <SearchNav navData={navData} currentNav={currentNav} />
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
