import { useEffect, useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { setSearchValue } from "../../../../Store/HeaderSlice/HeaderSlice";

function MemberBox() {
  const dispatch = useDispatch();
  const searchValue = useSelector((state) => state.header.searchValue);
  const language = useSelector((state) => state.root.language);

  const [options, setOptions] = useState([]);
  const [data, setData] = useState(searchValue.members || {});
  console.log(data);
  const handleMinus = (type, hint) => {
    const count = data[hint] ? data[hint] * 1 : 0;

    if (count > 0) {
      if ((hint === "NL" && count >= 2) || hint !== "NL") {
        setData({
          ...data,
          [hint]: count - 1,
        });
      }
    }
  };

  const handlePlus = (type, hint) => {
    const count = data[hint] ? data[hint] * 1 : 0;
    const countNL = data[hint] ? data[hint] * 1 : 0;
    if (hint !== "NL") {
      if (countNL === 0) {
        setData({
          ...data,
          NL: 1,
          [hint]: count + 1,
        });
      } else {
        setData({
          ...data,
          [hint]: count + 1,
        });
      }
    } else {
      setData({
        ...data,
        [hint]: count + 1,
      });
    }
  };

  useEffect(() => {
    setOptions([
      {
        title: language.SearchAdult,
        des: language.Search13More,
        type: "KH",
        hint: "NL",
      },
      {
        title: language.SearchChildren,
        des: language.Search2To12,
        type: "KH",
        hint: "TE",
      },
      {
        title: language.SearchBaby,
        des: language.SearchLow2,
        type: "EB",
        hint: "EB",
      },
      {
        title: language.SearchPet,
        des: language.SearchLow2Pet,
        type: "TC",
        hint: "TC",
      },
    ]);
  }, [language]);

  useEffect(() => {
    dispatch(setSearchValue({ ...searchValue, members: data }));
  }, [data]);

  return (
    <div className=" md:min-w-[350px] md:px-10">
      {options.map((item, index) => {
        const { title, des, type, hint } = item;
        const count = data[hint] ? data[hint] : 0;
        const arr = Object.values(data);
        const validBtn = hint === "NL" && count === 1;
        return (
          <div
            key={index}
            className={`flex justify-between py-4 ${
              index === options.length - 1 ? "" : `border-b-[1px]`
            } `}
          >
            <div className="flex flex-col">
              <h5 className="text-base font-bold">{title}</h5>
              <span className="text-base font-thin">{des}</span>
            </div>
            <div className="flex items-center">
              <button
                className={`${
                  count === 0 || validBtn
                    ? "cursor-not-allowed opacity-40 text-gray-400"
                    : "hover:border-black"
                } w-8 text-base h-8 flex justify-center items-center border-gray-400 rounded-full border  `}
                onClick={() => handleMinus(type, hint)}
              >
                <HiMinus />
              </button>
              <span className="mx-5">{count}</span>
              <button
                className="w-8 text-base h-8 flex justify-center border-gray-400 items-center rounded-full border hover:border-black"
                onClick={() => handlePlus(type, hint)}
              >
                <HiPlus />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MemberBox;
