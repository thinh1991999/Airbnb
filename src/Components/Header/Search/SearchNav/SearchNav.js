import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineSearch } from "react-icons/ai";
import {
  setActiveSearchForm,
  setElementSearch,
} from "../../../../Store/HeaderSlice/HeaderSlice";
import { useNavigate } from "react-router-dom";

function SearchNav({ navData, currentNav }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchValue = useSelector((state) => state.header.searchValue);
  const searchParams = useSelector((state) => state.header.searchParams);
  const language = useSelector((state) => state.root.language);
  const activeSearchForm = useSelector(
    (state) => state.header.activeSearchForm
  );

  const handleSearch = () => {
    navigate(
      `/rooms/${searchParams.locationId ? searchParams?.locationId : ""}`
    );
  };

  const handleClickSearch = (index, element) => {
    dispatch(setActiveSearchForm(index));
    if (index === 2) {
      dispatch(setElementSearch({ element, right: 0 }));
    } else {
      dispatch(setElementSearch({ element, left: 0, right: 0 }));
    }
  };

  return (
    <>
      {navData[currentNav]?.buttons?.map((item, index) => {
        const { name, value, element, hint } = item;
        let newValue = value;
        if (hint === "inDate" || hint === "outDate") {
          newValue = searchValue[hint]
            ? moment(searchValue[hint]).format("MM/DD/YYYY").toString()
            : value;
        } else if (hint === "members") {
          const countNL = searchValue[hint]?.NL ? searchValue[hint]?.NL : 0;
          const countTE = searchValue[hint]?.TE ? searchValue[hint]?.TE : 0;
          const countEB = searchValue[hint]?.EB ? searchValue[hint]?.EB : 0;
          const countTC = searchValue[hint]?.TC ? searchValue[hint]?.TC : 0;
          newValue =
            countNL || countTE || countEB || countTC
              ? `${countNL + countTE > 0 ? `${countNL + countTE} khách` : ``}${
                  countEB > 0 ? `,${countEB} em bé` : ""
                }${countTC > 0 ? `,${countTC} thú cưng` : ""} `
              : value;
        }

        if (index === navData[currentNav]?.buttons.length - 1) {
          return (
            <>
              <div className="flex items-center">
                <span className="text-black/[0.2] text-2xl font-thin">|</span>
              </div>
              <div
                key={index}
                className={` ${
                  activeSearchForm === index
                    ? "bg-white search__shadow"
                    : "hover:bg-stone-300"
                } pl-8 cursor-pointer pr-2 flex flex-1 justify-between rounded-full text-black transition-all duration-300 ease-linear `}
              >
                <div
                  onClick={() => handleClickSearch(index, element)}
                  className="flex flex-col items-start justify-center"
                >
                  <span className="text-sm font-semibold">{name}</span>
                  <span className="text-sm">{newValue}</span>
                </div>
                <div className="flex items-center ml-10">
                  <button
                    onClick={handleSearch}
                    className={`${
                      activeSearchForm !== null
                        ? "bg-gradient-to-r from-pink-600 to-pink-500"
                        : "primary--BGcolor"
                    } p-4 transition-all duration-300 ease-linear justify-end flex items-center text-xl text-white rounded-full primary--BGcolor`}
                  >
                    <AiOutlineSearch />
                    <div
                      className={`${
                        activeSearchForm !== null ? "w-[80px]" : "w-0 h-0"
                      } transition-all duration-300 ease-linear flex justify-center items-center overflow-hidden`}
                    >
                      <span className="capitalize whitespace-nowrap text-base font-medium">
                        {language.Search}
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
              <span className="text-black/[0.2] text-2xl font-thin">|</span>
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
              <span className="text-sm">{newValue}</span>
            </button>
          </>
        );
      })}
    </>
  );
}

export default SearchNav;
