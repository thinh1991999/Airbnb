import { useRef, useState } from "react";
import httpServ from "../../../ServiceWorkers/http.service";
import Validator from "../../../Shared/Validator";
import { TailSpin } from "react-loading-icons";
import { Link } from "react-router-dom";
import "react-calendar/dist/Calendar.css";
import Rules from "./Rules";
import Logo from "../../Logo/Logo";
import { useSelector } from "react-redux";

function SignUp() {
  const language = useSelector((state) => state.root.language);
  const [errors, setErrors] = useState({});
  const [signUpValue, setSignUpValue] = useState({
    email: "",
    password: "",
    cfPassword: "",
    name: "",
    phone: "",
    birthday: "",
    gender: true,
    address: "",
  });
  const rules = useRef(Rules()).current;
  const validator = useRef(new Validator(rules)).current;
  const [messSignUp, setMessSignUp] = useState({
    type: "Success",
    msg: "",
  });
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validator.validate(signUpValue));
    if (validator.isValid && !loading && handleBlurCfPassword()) {
      setLoading(true);
      httpServ
        .dangKy(signUpValue)
        .then(() => {
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
            msg: language.signUnSuccess,
          });
          setLoading(false);
        })
        .catch((errors) => {
          setLoading(false);
          setMessSignUp({
            type: "Fail",
            msg: language.errorTryAgian,
          });
        });
    }
  };

  const handleBlurCfPassword = () => {
    if (signUpValue.cfPassword !== signUpValue.password) {
      setErrors({
        ...errors,
        cfPassword: language.cfPasswordNotCorrect,
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

  return (
    <div className="bg-black xl:py-5 md:px-10 px-5 py-3 rounded-md text-white lg:max-w-[800px] lg:h-auto w-full h-full overflow-y-auto">
      <div className="md:hidden block mb-10">
        <Logo />
      </div>
      <h2 className="lg:mt-0 md:mt-20 capitalize text-3xl font-semibold mb-5">
        {language.SignUp}
      </h2>
      <form action="" className="flex flex-wrap" onSubmit={handleSubmit}>
        <div className="md:w-1/2 md:pr-1 w-full ">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            placeholder="Email"
            name="email"
            value={signUpValue.email}
            onFocus={handleFocus}
            onChange={handleChange}
            className={`my-2 w-full bg-gray-700 px-3 py-2 border-2  outline-none rounded-md ${
              errors.email ? `border-red-600` : `border-gray-400`
            }`}
          />
          {errors.email && <p className="text-red-600">{errors.email}</p>}
        </div>
        <div className="md:w-1/2 md:pl-1 w-full">
          <label htmlFor="name">{language.fullName}</label>
          <input
            id="name"
            type="text"
            placeholder={language.fullName}
            name="name"
            value={signUpValue.name}
            onFocus={handleFocus}
            onChange={handleChange}
            className={`my-2 w-full bg-gray-700 px-3 py-2 border-2  outline-none rounded-md ${
              errors.name ? `border-red-600` : `border-gray-400`
            }`}
          />
          {errors.name && <p className="text-red-600">{errors.name}</p>}
        </div>
        <div className="md:w-1/2 md:pr-1 w-full">
          <label htmlFor="password">{language.Password}</label>
          <input
            id="password"
            type="password"
            placeholder={language.Password}
            name="password"
            value={signUpValue.password}
            onFocus={handleFocus}
            onChange={handleChange}
            className={`my-2 w-full bg-gray-700 px-3 py-2 border-2  outline-none rounded-md 
          ${errors.password ? `border-red-600` : `border-gray-400`}
          `}
          />
          {errors.password && <p className="text-red-600">{errors.password}</p>}
        </div>
        <div className="md:w-1/2 md:pl-1 w-full">
          <label htmlFor="cfPw">{language.CfPassword}</label>
          <input
            id="cfPw"
            type="password"
            placeholder={language.CfPassword}
            name="cfPassword"
            value={signUpValue.cfPassword}
            onFocus={handleFocus}
            onChange={handleChange}
            className={`my-2 w-full bg-gray-700 px-3 py-2 border-2  outline-none rounded-md 
          ${errors.cfPassword ? `border-red-600` : `border-gray-400`}
          `}
          />
          {errors.cfPassword && (
            <p className="text-red-600">{errors.cfPassword}</p>
          )}
        </div>
        <div className="md:w-1/2 md:pr-1 w-full">
          <label htmlFor="phone">{language.AdminPhone}</label>
          <input
            id="phone"
            type="text"
            placeholder={language.AdminPhone}
            name="phone"
            value={signUpValue.phone}
            onFocus={handleFocus}
            onChange={handleChange}
            className={`my-2 w-full bg-gray-700 px-3 py-2 border-2  outline-none rounded-md ${
              errors.phone ? `border-red-600` : `border-gray-400`
            }`}
          />
          {errors.phone && <p className="text-red-600">{errors.phone}</p>}
        </div>
        <div className="md:w-1/2 md:pl-1 w-full">
          <label htmlFor="address">{language.AdminAddress}</label>
          <input
            id="address"
            type="text"
            placeholder={language.AdminAddress}
            name="address"
            value={signUpValue.address}
            onFocus={handleFocus}
            onChange={handleChange}
            className={`my-2 w-full flex-1 bg-gray-700 px-3 py-2 border-2  outline-none rounded-md ${
              errors.address ? `border-red-600` : `border-gray-400`
            }`}
          />
          {errors.address && <p className="text-red-600">{errors.address}</p>}
        </div>
        <div className="md:w-1/2 md:pr-1 w-full">
          <label htmlFor="date">{language.AdminBD}</label>
          <input
            id="date"
            type="date"
            placeholder={language.AdminBD}
            name="birthday"
            value={signUpValue.birthday}
            onFocus={handleFocus}
            onChange={handleChange}
            className={`my-2 w-full flex-1 bg-gray-700 px-3 py-2 border-2  outline-none rounded-md ${
              errors.birthday ? `border-red-600` : `border-gray-400`
            }`}
          />
          {errors.birthday && <p className="text-red-600">{errors.birthday}</p>}
        </div>
        <div className="md:w-1/2 md:pl-1 w-full flex flex-col">
          <label className="capitalize" htmlFor="">
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
            } w-full capitalize mt-5 min-h-[45px] flex justify-center items-center hover:opacity-70 transition-all duration-300 ease-linear bg-red-600 py-2 rounded-md`}
          >
            {loading ? (
              <TailSpin
                height={"30px"}
                width={"30px"}
                fill="white"
                strokeWidth={3}
              />
            ) : (
              <span>{language.SignUp}</span>
            )}
          </button>
          <p className="mt-4 text-gray-200">
            {language.haveAccount}{" "}
            <Link to={"/account/signIn"} className="font-semibold text-red-600">
              Sign In Now
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
