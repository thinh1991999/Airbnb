import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineRight } from "react-icons/ai";
import { useSelector } from "react-redux";
import { httpServ } from "../../../../ServiceWorkers";
import { GoLocation } from "react-icons/go";

function PlaceBox() {
  const [suggestArr, setSuggestArr] = useState([]);
  const [loading, setLoading] = useState(true);

  const { place } = useSelector((state) => state.header.searchValue);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setLoading(true);
      httpServ.layDanhSachViTri(place).then((res) => {
        setSuggestArr(res.data);
        setLoading(false);
      });
    }, 100);
    return () => {
      clearTimeout(timeOut);
    };
  }, [place]);

  if (!place) {
    return (
      <div className="px-10">
        <h2>Moi luc,moi noi</h2>
        <button className="flex mt-5 min-w-[250px] px-4 py-2 rounded-full items-center justify-between border-[1px] header__btn">
          <span>Tìm kiếm linh hoạt</span>
          <span className="p-2">
            <AiOutlineRight />
          </span>
        </button>
      </div>
    );
  }

  if (loading) {
    return <h2 className="px-10">Loading...</h2>;
  }

  return (
    <div className="pl-2">
      {!suggestArr && (
        <>
          <h2>Moi luc,moi noi</h2>
          <button className="flex mt-5 min-w-[250px] px-4 py-2 rounded-full items-center justify-between border-[1px] header__btn">
            <span>Tìm kiếm linh hoạt</span>
            <span className="p-2">
              <AiOutlineRight />
            </span>
          </button>
        </>
      )}
      {suggestArr.map((item, index) => {
        const { name, image, _id, province } = item;
        if (index > 4) return;
        return (
          <div className="flex items-center my-2 cursor-pointer py-2 px-10 hover:bg-gray-400">
            <div className="p-3 bg-gray-200 rounded-md">
              <GoLocation />
            </div>{" "}
            <div className="ml-2 text-base capitalize">
              {name}, {province}
            </div>
          </div>
        );
      })}
      {suggestArr.length === 0 && <h2 className="px-10">Notthing to see</h2>}
    </div>
  );
}

export default PlaceBox;
