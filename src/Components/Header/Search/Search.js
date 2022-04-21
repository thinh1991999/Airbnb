import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { AiOutlineSearch } from "react-icons/ai";
import "./Search.css";

function Search() {
  const language = useSelector((state) => state.root.language);
  const searchActive = useSelector((state) => state.root.searchActive);

  const [navData, setNavData] = useState([]);
  const [currentNav, setCurrentNav] = useState(0);
  const [activeSearch, setActiveSearch] = useState(null);

  const formRef = useRef(null);

  useEffect(() => {
    setNavData([
      {
        title: language.HeaderAddress,
        buttons: [
          {
            name: "Nhận phòng",
            value: "Thêm ngày",
          },
          {
            name: "Trả phòng",
            value: "Thêm ngày",
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
      setActiveSearch(null);
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
      className={`absolute overflow-hidden top-0 mt-5 left-0 right-0  bg-black`}
    >
      <div>
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
                    setActiveSearch(null);
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
        <div className="flex justify-center">
          <div>
            <form
              id="search"
              action=""
              onSubmit={(e) => e.preventDefault()}
              className="mt-5 lg:min-w-[800px]  flex justify-between bg-stone-200 rounded-full"
              ref={formRef}
            >
              <div
                className={`${
                  activeSearch === "SEARCH_INPUT"
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
                  onFocus={() => setActiveSearch("SEARCH_INPUT")}
                  onBlur={() => setActiveSearch(null)}
                  className="px-8 pb-4 bg-transparent outline-none placeholder:text-black"
                  type="text"
                  id="searchPlace"
                  placeholder="Bạn sắp đi đâu"
                />
              </div>
              <div className="flex min-w-[50%]">
                {navData[currentNav]?.buttons?.map((item, index) => {
                  const { name, value } = item;
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
                            activeSearch === index
                              ? "bg-white search__shadow"
                              : "hover:bg-stone-300"
                          } pl-8 cursor-pointer pr-2 flex flex-1 justify-between rounded-full text-black transition-all duration-300 ease-linear `}
                          onClick={() => setActiveSearch(index)}
                        >
                          <div className="flex flex-col items-start justify-center">
                            <span className="text-sm font-semibold">
                              {name}
                            </span>
                            <span className="text-sm">{value}</span>
                          </div>
                          <div className="flex items-center ml-10">
                            <button
                              className={`${
                                activeSearch !== null
                                  ? "bg-gradient-to-r from-pink-600 to-pink-500"
                                  : "primary--BGcolor"
                              } p-4 transition-all duration-300 ease-linear justify-end flex items-center text-xl text-white rounded-full primary--BGcolor`}
                            >
                              <AiOutlineSearch />
                              <div
                                className={`${
                                  activeSearch !== null ? "w-[80px]" : "w-0 h-0"
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
                          activeSearch === index
                            ? "bg-white search__shadow"
                            : "hover:bg-stone-300"
                        } px-8 flex flex-col items-center justify-center rounded-full text-black transition-all duration-300 ease-linear `}
                        onClick={() => setActiveSearch(index)}
                        type={"button"}
                      >
                        <span className="text-sm font-semibold">{name}</span>
                        <span className="text-sm">{value}</span>
                      </button>
                    </>
                  );
                })}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
