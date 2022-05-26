import React, { useCallback, useEffect, useMemo, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Circles } from "react-loading-icons";
import { useDispatch, useSelector } from "react-redux";
import { httpServ } from "../../../../../ServiceWorkers";
import { unknowRoomImg } from "../../../../../Shared/Constant";
import { getVNDMoney } from "../../../../../Untils";
import BtnClose from "../../BtnClose/BtnClose";
import ItemDetail from "../../ItemDetail/ItemDetail";

export default function RoomDetail() {
  const idOption = useSelector((state) => state.admin.idOption);
  const language = useSelector((state) => state.root.language);
  const [roomData, setRoomData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getSupports = (typeCheck) => {
    if (roomData) {
      const {
        cableTV,
        dryer,
        elevator,
        gym,
        heating,
        hotTub,
        indoorFireplace,
        kitchen,
        pool,
        wifi,
      } = roomData;
      let supportsValue = "";
      let notSupportsValue = "";
      const check = (type, name) => {
        if (type) {
          supportsValue += ` ${name},`;
        } else {
          notSupportsValue += ` ${name},`;
        }
      };
      check(cableTV, "cableTV");
      check(dryer, "dryer");
      check(elevator, "elevator");
      check(gym, "gym");
      check(heating, "heating");
      check(hotTub, "hotTub");
      check(indoorFireplace, "indoorFireplace");
      check(kitchen, "kitchen");
      check(pool, "pool");
      check(wifi, "wifi");
      if (typeCheck) {
        return supportsValue ? supportsValue : "null";
      } else {
        return notSupportsValue ? notSupportsValue : "null";
      }
    }
    return "null";
  };

  useEffect(() => {
    setLoading(true);
    httpServ.layThongTinChiTietPhong(idOption).then((res) => {
      setRoomData(res.data);
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
  const { name, description, price, bath, bedRoom, guests, image } = roomData;

  return (
    <div className=" min-w-[320px] max-w-[600px]  py-5 px-7 rounded-xl dark:bg-gray-900 bg-gray-100">
      <BtnClose />
      <h2 className="capitalize text-3xl font-semibold mb-5">Chi tiết phòng</h2>
      <div className="flex justify-center mb-5">
        <LazyLoadImage
          src={image || unknowRoomImg}
          alt=""
          width={`${image ? "w-[200px]" : "w-[100px] h-[100px]"}`}
          className={`${
            image ? "w-[200px]" : "w-[100px] h-[100px] bg-gray-300"
          } rounded-md`}
          effect="opacity"
        />
      </div>
      <ItemDetail name={language.AdminName} value={name} />
      <ItemDetail name={language.AdminDescription} value={description} />
      <ItemDetail name={language.Support} value={getSupports(true)} />
      <ItemDetail name={language.NotSupport} value={getSupports(false)} />
      <ItemDetail name={language.AdminPrice} value={getVNDMoney(price)} />
      <ItemDetail name={language.Bathroom} value={bath} />
      <ItemDetail name={language.Bedroom} value={bedRoom} />
      <ItemDetail name={language.GuestRoom} value={guests} />
    </div>
  );
}
