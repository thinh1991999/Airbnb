import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Circles } from "react-loading-icons";
import { useDispatch, useSelector } from "react-redux";
import { httpServ } from "../../../../ServiceWorkers";
import { unknowImg, unknowPosImg } from "../../../../Shared/Constant";
import BtnClose from "../BtnClose/BtnClose";
import ItemDetail from "../ItemDetail/ItemDetail";

// function ItemDetail({ name, value }) {
//   return (
//     <div className="w-full flex justify-between my-2">
//       <span className="font-bold w-[80px] capitalize">{name}</span>
//       <p>{value || value === 0 ? value : "null"}</p>
//     </div>
//   );
// }

export default function PositionDetail() {
  const dispatch = useDispatch();
  const idOption = useSelector((state) => state.admin.idOption);
  const [posData, setPosData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    httpServ.layChiTietViTri(idOption).then((res) => {
      setPosData(res.data);
      setLoading(false);
    });
  }, [idOption]);

  if (loading) {
    return (
      <div className="w-[300px] h-[200px] py-5 px-7 rounded-xl flex justify-center items-center dark:bg-gray-900  bg-gray-100">
        <Circles fill="white" />
      </div>
    );
  }
  const { country, image, name, province, valueate } = posData;
  return (
    <div className=" min-w-[320px] max-w-[600px]  py-5 px-7 rounded-xl dark:bg-gray-900 bg-gray-100">
      <BtnClose />
      <h2 className="capitalize text-3xl font-semibold mb-5">Chi tiết</h2>
      <div className="flex justify-center mb-5">
        <LazyLoadImage
          src={image || unknowPosImg}
          alt=""
          width={`${image ? "w-[200px]" : "w-[100px] h-[100px]"}`}
          className={`${
            image ? "w-[200px]" : "w-[100px] h-[100px] bg-gray-300"
          } rounded-md`}
          effect="opacity"
        />
      </div>
      <ItemDetail name={"name"} value={name} />
      <ItemDetail name={"province"} value={province} />
      <ItemDetail name={"country"} value={country} />
      <ItemDetail name={"valueate"} value={valueate} />
    </div>
  );
}
