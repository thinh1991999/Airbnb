import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Circles } from "react-loading-icons";
import { useSelector } from "react-redux";
import { httpServ } from "../../../../../ServiceWorkers";
import { unknowImg } from "../../../../../Shared/Constant";
import BtnClose from "../../BtnClose/BtnClose";
import ItemDetail from "../../ItemDetail/ItemDetail";

export default function UserDetail() {
  const idOption = useSelector((state) => state.admin.idOption);
  const language = useSelector((state) => state.root.language);

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    httpServ.layThongTinChiTietUser(idOption, false).then((res) => {
      setUserData(res.data);
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
  const {
    name,
    email,
    avatar,
    address,
    phone,
    birthday,
    gender,
    tickets,
    type,
  } = userData;

  return (
    <div className=" min-w-[320px] max-w-[600px]  py-5 px-7 rounded-xl dark:bg-gray-900 bg-gray-100">
      <BtnClose />
      <h2 className="capitalize text-3xl font-semibold mb-5">
        {language.AdminDetailUser}
      </h2>
      <div className="flex justify-center mb-5">
        <LazyLoadImage
          src={avatar || unknowImg}
          alt=""
          width={`${avatar ? "w-[200px]" : "w-[100px] h-[100px]"}`}
          className={`${
            avatar ? "w-[200px]" : "w-[100px] h-[100px] bg-gray-300"
          } rounded-md`}
          effect="opacity"
        />
      </div>
      <ItemDetail name={language.AdminName} value={name} />
      <ItemDetail name={language.UserType} value={type} />
      <ItemDetail name={language.HeaderAddress} value={address} />

      <ItemDetail name={"Email"} value={email} />
      <ItemDetail name={language.AdminPhone} value={phone} />
      <ItemDetail
        name={language.AdminBD}
        value={birthday?.substring(0, 10) || language.Null}
      />
      <ItemDetail
        name={language.AdminGender}
        value={
          gender !== undefined
            ? gender
              ? language.Male
              : language.Female
            : language.Null
        }
      />
      <ItemDetail name={language.Tickets} value={tickets.length} />
    </div>
  );
}
