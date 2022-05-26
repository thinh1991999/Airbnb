import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Circles } from "react-loading-icons";
import { useDispatch, useSelector } from "react-redux";
import { httpServ } from "../../../../../ServiceWorkers";
import { unknowImg } from "../../../../../Shared/Constant";
import {
  setReloadData,
  setShowOptionBox,
} from "../../../../../Store/AdminSlice/AdminSlice";
import Validator from "../../../../../Shared/Validator";
import { TailSpin } from "react-loading-icons";
import { toast } from "react-toastify";
import BtnClose from "../../BtnClose/BtnClose";
import Rules from "../Rules";
import InputTextForm from "../../../../InputTextForm/InputTextForm";

export default function UserRepair() {
  const dispatch = useDispatch();
  const idOption = useSelector((state) => state.admin.idOption);
  const token = useSelector((state) => state.root.token);
  const language = useSelector((state) => state.root.language);

  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [userData, setUserData] = useState({
    email: "",
    name: "",
    phone: "",
    birthday: "",
    gender: true,
    address: "",
  });
  const [activeEmail, setActiveEmail] = useState(true);
  const [rules, setRules] = useState(Rules());
  const [validator, setValidator] = useState(new Validator(rules));
  const [messSignUp, setMessSignUp] = useState({
    type: "Success",
    msg: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validator.validate(userData));
    if (validator.isValid && !btnLoading) {
      setBtnLoading(true);
      httpServ.capNhatNguoiDung(userData, idOption, token).then((res) => {
        dispatch(setShowOptionBox(false));
        dispatch(setReloadData(true));
        toast.success("Chinh sua ho so thanh cong");
        setBtnLoading(false);
      });
    }
  };
  const handleFocus = (e) => {};
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setLoading(true);
    httpServ.layThongTinChiTietUser(idOption, false).then((res) => {
      res.data.email && setActiveEmail(false);
      setUserData(res.data);
      setLoading(false);
    });
  }, [idOption]);

  if (loading) {
    return (
      <div className="w-[300px] h-[200px] py-5 px-7 rounded-xl flex justify-center items-center dark:bg-gray-900 bg-gray-100">
        <Circles fill="white" />
      </div>
    );
  }

  return (
    <div className=" min-w-[320px] max-w-[600px]  py-5 px-10 rounded-xl dark:bg-gray-900 bg-gray-100">
      <BtnClose />
      <h2 className="capitalize text-3xl font-semibold mb-5">
        {language.AdminRepairUser}
      </h2>
      <div className="flex justify-center mb-5">
        <LazyLoadImage
          src={userData?.avatar || unknowImg}
          alt=""
          width={`${userData?.avatar ? "w-[200px]" : "w-[100px] h-[100px]"}`}
          className={`${
            userData?.avatar ? "w-[200px]" : "w-[100px] h-[100px] bg-gray-300"
          } rounded-md`}
          effect="opacity"
        />
      </div>
      <form action="" className="flex flex-wrap" onSubmit={handleSubmit}>
        <div className="lg:w-1/2 lg:pr-1">
          <InputTextForm
            disabled={!activeEmail}
            name={"email"}
            hint={userData.email}
            handleFocus={handleFocus}
            handleChange={handleChange}
            errors={errors}
            values={userData}
          />
        </div>
        <div className="lg:w-1/2 lg:pl-1">
          <InputTextForm
            name={"name"}
            hint={language.AdminName}
            handleFocus={handleFocus}
            handleChange={handleChange}
            errors={errors}
            values={userData}
          />
        </div>
        <div className="lg:w-1/2 lg:pr-1">
          <InputTextForm
            name={"phone"}
            hint={language.AdminPhone}
            handleFocus={handleFocus}
            handleChange={handleChange}
            errors={errors}
            values={userData}
          />
        </div>
        <div className="lg:w-1/2 lg:pl-1">
          <InputTextForm
            name={"address"}
            hint={language.AdminAddress}
            handleFocus={handleFocus}
            handleChange={handleChange}
            errors={errors}
            values={userData}
          />
        </div>
        <div className="lg:w-1/2 lg:pr-1">
          <InputTextForm
            name={"birthday"}
            hint={language.AdminBD}
            handleFocus={handleFocus}
            handleChange={handleChange}
            errors={errors}
            values={userData.birthday?.substring(0, 10)}
            type={"date"}
          />
        </div>
        <div className="lg:w-1/2 lg:pl-1 flex flex-col">
          <label className="capitalize font-bold" htmlFor="">
            {language.AdminGender}
          </label>
          <div className="w-full flex items-center h-full">
            <input
              type="radio"
              name="gender"
              id="male"
              className="cursor-pointer"
              checked={userData.gender}
              onChange={() => setUserData({ ...userData, gender: true })}
            />
            <label htmlFor="male" className="ml-1 cursor-pointer">
              {language.Male}
            </label>
            <input
              type="radio"
              className="ml-4 cursor-pointer"
              name="gender"
              id="Female"
              checked={!userData.gender}
              onChange={() => setUserData({ ...userData, gender: false })}
            />
            <label htmlFor="Female" className="ml-1 cursor-pointer">
              {language.Female}
            </label>
          </div>
        </div>

        {messSignUp.msg && (
          <p
            className={`${
              messSignUp.type === "Success" ? "text-blue-600" : "text-red-600"
            }`}
          >
            {messSignUp.msg}
          </p>
        )}
        <div className="lg:w-full flex flex-col justify-center items-center">
          <button
            type="submit"
            onSubmit={handleSubmit}
            className={`${
              loading && "cursor-not-allowed"
            } w-full text-white font-bold capitalize mt-5 min-h-[45px] flex justify-center items-center hover:opacity-70 transition-all duration-300 ease-linear bg-red-600 py-2 rounded-md`}
          >
            {btnLoading ? (
              <TailSpin
                height={"30px"}
                width={"30px"}
                fill="white"
                strokeWidth={3}
              />
            ) : (
              <span>{language.Save}</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
