import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { httpServ } from "../../../../../ServiceWorkers";
import { setReloadData } from "../../../../../Store/AdminSlice/AdminSlice";
import Validator from "../../../../../Shared/Validator";
import { TailSpin } from "react-loading-icons";
import BtnClose from "../../BtnClose/BtnClose";
import { setUserAddValue } from "../../../../../Store/AdminSlice/AdminSlice";
import Rules from "../Rules";
import InputTextForm from "../../../../InputTextForm/InputTextForm";

function UserAdd() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.root.token);
  const language = useSelector((state) => state.root.language);

  const userAddValue = useSelector((state) => state.admin.userAddValue);

  const [errors, setErrors] = useState({});
  const [signUpValue, setSignUpValue] = useState({ ...userAddValue });

  const [rules, setRules] = useState(Rules());
  const [validator, setValidator] = useState(new Validator(rules));
  const [messSignUp, setMessSignUp] = useState({
    type: "Success",
    msg: "",
  });
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validator.validate(signUpValue));
    if (validator.isValid && !loading && handleBlurCfPassword()) {
      const { email, password, name, phone, birthday, gender, address, type } =
        signUpValue;
      const currentValue = {
        email,
        password,
        name,
        phone,
        birthday,
        gender,
        address,
        type,
      };
      setLoading(true);
      httpServ
        .taoQuanTriVien(currentValue, token)
        .then((res) => {
          setSignUpValue({
            email: "",
            password: "",
            cfPassword: "",
            name: "",
            phone: "",
            birthday: "",
            gender: true,
            address: "",
          });
          setMessSignUp({
            type: "Success",
            msg: "Thêm quản trị viên thành công",
          });
          setLoading(false);
          dispatch(setReloadData(true));
        })
        .catch((errors) => {
          setLoading(false);
          setMessSignUp({
            type: "Fail",
            msg: "Có lỗi xảy ra,vui lòng thử lại",
          });
        });
    }
  };
  const handleBlurCfPassword = () => {
    if (signUpValue.cfPassword !== signUpValue.password) {
      setErrors({
        ...errors,
        cfPassword: "Comfirm password isn't corrected!",
      });
      return false;
    } else {
      return true;
    }
  };

  const handleFocus = (e) => {
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
    setMessSignUp({
      type: "Success",
      msg: "",
    });
  };
  const handleChange = (e) => {
    setSignUpValue({
      ...signUpValue,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    return () => {
      dispatch(setUserAddValue({ ...signUpValue }));
    };
  }, [signUpValue]);

  return (
    <div className="dark:bg-gray-900 bg-gray-100 sm:px-10 px-5 py-5 rounded-md lg:w-[800px] overflow-y-scroll max-h-[100vh] scroll__custom">
      <BtnClose />
      <h2 className="capitalize text-3xl font-semibold mb-5">
        {language.AdminAddUser}
      </h2>
      <form action="" className="flex flex-wrap" onSubmit={handleSubmit}>
        <div className="md:w-1/2 w-full md:pr-1">
          <InputTextForm
            name={"email"}
            hint={"Email"}
            handleFocus={handleFocus}
            handleChange={handleChange}
            errors={errors}
            values={signUpValue}
          />
        </div>
        <div className="md:w-1/2 w-full md:pl-1">
          <InputTextForm
            name={"name"}
            hint={language.AdminName}
            handleFocus={handleFocus}
            handleChange={handleChange}
            errors={errors}
            values={signUpValue}
          />
        </div>
        <div className="md:w-1/2 w-full md:pr-1">
          <InputTextForm
            name={"password"}
            hint={language.Password}
            handleFocus={handleFocus}
            handleChange={handleChange}
            errors={errors}
            values={signUpValue}
            type="password"
          />
        </div>
        <div className="md:w-1/2 w-full md:pl-1">
          <InputTextForm
            name={"cfPassword"}
            hint={language.CfPassword}
            handleFocus={handleFocus}
            handleChange={handleChange}
            errors={errors}
            values={signUpValue}
            type="password"
          />
        </div>
        <div className="md:w-1/2 w-full md:pr-1">
          <InputTextForm
            name={"phone"}
            hint={language.AdminPhone}
            handleFocus={handleFocus}
            handleChange={handleChange}
            errors={errors}
            values={signUpValue}
          />
        </div>
        <div className="md:w-1/2 w-full md:pl-1">
          <InputTextForm
            name={"address"}
            hint={language.AdminAddress}
            handleFocus={handleFocus}
            handleChange={handleChange}
            errors={errors}
            values={signUpValue}
          />
        </div>
        <div className="md:w-1/2 w-full md:pr-1">
          <InputTextForm
            name={"birthday"}
            hint={language.AdminBD}
            handleFocus={handleFocus}
            handleChange={handleChange}
            errors={errors}
            values={signUpValue}
            type="date"
            addMode={true}
          />
        </div>
        <div className="md:w-1/2 w-full md:pl-1 flex flex-col">
          <label className="capitalize font-bold" htmlFor="">
            {language.AdminGender}
          </label>
          <div className="w-full flex items-center h-full">
            <input
              type="radio"
              name="gender"
              id="male"
              className="cursor-pointer"
              checked={signUpValue.gender}
              onChange={() => setSignUpValue({ ...signUpValue, gender: true })}
            />
            <label htmlFor="male" className="ml-1 cursor-pointer">
              {language.Male}
            </label>
            <input
              type="radio"
              className="ml-4 cursor-pointer"
              name="gender"
              id="Female"
              checked={!signUpValue.gender}
              onChange={() => setSignUpValue({ ...signUpValue, gender: false })}
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
        <div className="w-full flex flex-col justify-center items-center">
          <button
            type="submit"
            onSubmit={handleSubmit}
            className={`${
              loading && "cursor-not-allowed"
            } w-full text-white font-bold capitalize mt-5 min-h-[45px] flex justify-center items-center hover:opacity-70 transition-all duration-300 ease-linear bg-red-600 py-2 rounded-md`}
          >
            {loading ? (
              <TailSpin
                height={"30px"}
                width={"30px"}
                fill="white"
                strokeWidth={3}
              />
            ) : (
              <span>{language.Add}</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserAdd;
