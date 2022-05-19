import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineRight } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { httpServ } from "../../../../ServiceWorkers";
import { GoLocation } from "react-icons/go";
import {
  setSearchParams,
  setSearchValue,
} from "../../../../Store/HeaderSlice/HeaderSlice";

function PlaceBox() {
  const searchValue = useSelector((state) => state.header.searchValue);
  const searchParams = useSelector((state) => state.header.searchParams);
  const language = useSelector((state) => state.root.language);
  const dispatch = useDispatch();

  const [suggestArr, setSuggestArr] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleChoosePlace = (name, _id) => {
    dispatch(setSearchValue({ ...searchValue, place: name }));
    dispatch(
      setSearchParams({
        ...searchParams,
        locationId: _id,
      })
    );
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setLoading(true);
      httpServ.layDanhSachViTri(searchValue.place).then((res) => {
        setSuggestArr(res.data);
        if (res.data.length > 0) {
          dispatch(
            setSearchParams({
              ...searchParams,
              locationId: res.data[0]._id,
            })
          );
        }
        setLoading(false);
      });
    }, 100);
    return () => {
      clearTimeout(timeOut);
    };
  }, [searchValue.place]);

  if (!searchValue.place) {
    return (
      <div className="px-10">
        <h2>{language.SearchEveryWhere}</h2>
        <button className="flex mt-5 min-w-[250px] px-4 py-2 rounded-full items-center justify-between border-[1px] header__btn">
          <span>{language.FlexSearh}</span>
          <span className="p-2">
            <AiOutlineRight />
          </span>
        </button>
      </div>
    );
  }

  if (loading) {
    return <h2 className="px-10">{language.Loading}...</h2>;
  }

  return (
    <div className="pl-2">
      {!suggestArr && (
        <>
          <h2>{language.SearchEveryWhere}</h2>
          <button className="flex mt-5 min-w-[250px] px-4 py-2 rounded-full items-center justify-between border-[1px] header__btn">
            <span>{language.FlexSearh}</span>
            <span className="p-2">
              <AiOutlineRight />
            </span>
          </button>
        </>
      )}
      {suggestArr.map((item, index) => {
        const { name, image, _id, province } = item;
        if (index > 4) return;
        const address = name + ", " + province;
        return (
          <div
            onClick={() => handleChoosePlace(name, _id)}
            className="flex items-center my-2 cursor-pointer py-2 px-10 hover:bg-gray-400"
            key={_id}
          >
            <div className=" bg-gray-200 rounded-md overflow-hidden">
              <img
                src={image}
                className="w-[50px] h-[40px] object-cover"
                alt=""
              />
            </div>{" "}
            <div className="ml-2 text-base capitalize">{address}</div>
          </div>
        );
      })}
      {suggestArr.length === 0 && (
        <h2 className="px-10">{language.NothingToSee}</h2>
      )}
    </div>
  );
}

export default PlaceBox;
