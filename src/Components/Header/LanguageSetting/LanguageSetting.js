import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowLanguageSetting } from "../../../Store/HeaderSlice/HeaderSlice";
import { setLanguageHint } from "../../../Store/RootSlice/RootSlice";

function LanguageSetting() {
  const dispatch = useDispatch();
  const languageHint = useSelector((state) => state.root.languageHint);
  const language = useSelector((state) => state.root.language);

  const languages = useRef([
    {
      name: "Tiếng Việt",
      country: "Việt Nam",
      hint: "VN",
    },
    {
      name: "EngLish",
      country: "United States",
      hint: "US",
    },
  ]).current;
  const wrapRef = useRef(null);
  const contentRef = useRef(null);

  const handleChangeLanguage = (hint) => {
    dispatch(setLanguageHint(hint));
  };

  const eventClick = (e) => {
    if (!contentRef.current.contains(e.target)) {
      dispatch(setShowLanguageSetting(false));
    }
  };

  useEffect(() => {
    wrapRef?.current?.addEventListener("click", eventClick);
    return () => {
      wrapRef?.current?.removeEventListener("click", eventClick);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className=" fixed flex justify-center items-center bg-black/[0.5] left-0 top-0 right-0 bottom-0"
    >
      <div
        ref={contentRef}
        className="bg-white text-black px-10 py-5 rounded-lg md:min-w-[400px]"
      >
        <h5 className="font-bold">{language.SelectLanguageAndRegion}</h5>
        <div className="flex flex-wrap -ml-4 -mr-4 mt-5">
          {languages.map((item, index) => {
            const { name, country, hint } = item;
            return (
              <div className="md:w-1/2 w-full px-4">
                <div
                  onClick={() => handleChangeLanguage(hint)}
                  key={index}
                  className={`cursor-pointer hover:bg-gray-200 transition-all duration-200 ease-linear flex flex-col  px-6 py-3 rounded-lg ${
                    languageHint === hint && "border-black border"
                  }`}
                >
                  <span>{name}</span>
                  <span className="font-thin">{country}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default LanguageSetting;
