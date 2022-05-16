import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Circles } from "react-loading-icons";
import { useDispatch, useSelector } from "react-redux";
import { httpServ } from "../../../../ServiceWorkers";
import { unknowImg } from "../../../../Shared/Constant";
import {
  setReloadData,
  setShowOptionBox,
} from "../../../../Store/AdminSlice/AdminSlice";
import Validator from "../../../../Shared/Validator";
import { TailSpin } from "react-loading-icons";
import { toast } from "react-toastify";
import BtnClose from "../BtnClose/BtnClose";

export default function UserRepair() {
  const dispatch = useDispatch();
  const idOption = useSelector((state) => state.admin.idOption);
  const token = useSelector((state) => state.root.token);

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
  const [rules, setRules] = useState([
    {
      field: "birthday",
      method: "isEmpty",
      validWhen: false,
      message: "The birthday field is required.",
    },
    {
      field: "address",
      method: "isEmpty",
      validWhen: false,
      message: "The address field is required.",
    },
    {
      field: "name",
      method: "isEmpty",
      validWhen: false,
      message: "The name field is required.",
    },
    {
      field: "email",
      method: "isEmpty",
      validWhen: false,
      message: "The email field is required.",
    },
    {
      field: "email",
      method: "isEmail",
      validWhen: true,
      message: "This field is email.",
    },
    {
      field: "phone",
      method: "isEmpty",
      validWhen: false,
      message: "The phone field is required.",
    },
    {
      field: "phone",
      method: "isMobilePhone",
      args: [""],
      validWhen: true,
      message: "The field is phone number.",
    },
  ]);
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
        Sửa thông tin người dùng
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
          <label htmlFor="email">Email</label>
          <input
            disabled={!activeEmail}
            id="email"
            type="text"
            placeholder="Email"
            name="email"
            value={userData.email}
            onFocus={handleFocus}
            onChange={handleChange}
            className={`my-2 w-full bg-gray-700 disabled:opacity-50 px-3 py-2 border-2  outline-none rounded-md ${
              errors.email ? `border-red-600` : `border-gray-400`
            }`}
          />
          {errors.email && <p className="text-red-600">{errors.email}</p>}
        </div>
        <div className="lg:w-1/2 lg:pl-1">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            placeholder="Ho Ten"
            name="name"
            value={userData.name}
            onFocus={handleFocus}
            onChange={handleChange}
            className={`my-2 w-full bg-gray-700 px-3 py-2 border-2  outline-none rounded-md ${
              errors.name ? `border-red-600` : `border-gray-400`
            }`}
          />
          {errors.name && <p className="text-red-600">{errors.name}</p>}
        </div>
        <div className="lg:w-1/2 lg:pr-1">
          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            type="text"
            placeholder="Phone"
            name="phone"
            value={userData.phone}
            onFocus={handleFocus}
            onChange={handleChange}
            className={`my-2 w-full bg-gray-700 px-3 py-2 border-2  outline-none rounded-md ${
              errors.phone ? `border-red-600` : `border-gray-400`
            }`}
          />
          {errors.phone && <p className="text-red-600">{errors.phone}</p>}
        </div>
        <div className="lg:w-1/2 lg:pl-1">
          <label htmlFor="address">Address</label>
          <input
            id="address"
            type="text"
            placeholder="Address"
            name="address"
            value={userData.address}
            onFocus={handleFocus}
            onChange={handleChange}
            className={`my-2 w-full flex-1 bg-gray-700 px-3 py-2 border-2  outline-none rounded-md ${
              errors.address ? `border-red-600` : `border-gray-400`
            }`}
          />
          {errors.address && <p className="text-red-600">{errors.address}</p>}
        </div>
        <div className="lg:w-1/2 lg:pr-1">
          <label htmlFor="date">Birth day</label>
          <input
            id="date"
            type="date"
            name="birthday"
            value={userData.birthday?.substring(0, 10)}
            onFocus={handleFocus}
            onChange={handleChange}
            className={`my-2 w-full flex-1 bg-gray-700 px-3 py-2 border-2  outline-none rounded-md ${
              errors.birthday ? `border-red-600` : `border-gray-400`
            }`}
          />
          {errors.birthday && <p className="text-red-600">{errors.birthday}</p>}
        </div>
        <div className="lg:w-1/2 lg:pl-1 flex flex-col">
          <label className="capitalize" htmlFor="">
            gender
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
              Male
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
              Female
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
            } w-full capitalize mt-5 min-h-[45px] flex justify-center items-center hover:opacity-70 transition-all duration-300 ease-linear bg-red-600 py-2 rounded-md`}
          >
            {btnLoading ? (
              <TailSpin
                height={"30px"}
                width={"30px"}
                fill="white"
                strokeWidth={3}
              />
            ) : (
              <span>save</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
