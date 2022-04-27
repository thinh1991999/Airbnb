import { useState } from "react";
import { useSelector } from "react-redux";

function LanguageSetting() {
  const languageHint = useSelector((state) => state.root.languageHint);
  const [languages, setLanguages] = useState([
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
  ]);

  return (
    <div className="fixed flex justify-center items-center bg-black/[0.2] left-0 top-0 right-0 bottom-0">
      <div className="bg-white text-black px-10 py-5 rounded-lg">
        <h5 className="font-bold">Chọn ngôn ngữ và khu vực</h5>
        <div className="flex -ml-4 -mr-4 mt-5">
          {languages.map((item, index) => {
            const { name, country, hint } = item;
            return (
              <div className="px-4">
                <div
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
