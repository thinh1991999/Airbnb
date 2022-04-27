import { useState } from "react";
import httpServ from "../../../ServiceWorkers/http.service";
import Validator from "../../../Shared/Validator";
import { TailSpin } from "react-loading-icons";
import { Link } from "react-router-dom";
import methods from "validator";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function SignUp() {
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
    {
      field: "password",
      method: "isEmpty",
      validWhen: false,
      message: "The password field is required.",
    },
    {
      field: "cfPassword",
      method: "isEmpty",
      validWhen: false,
      message: "The comfirm password field is required.",
    },
  ]);
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
      setLoading(true);
      httpServ
        .dangKy(signUpValue)
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
            msg: "Đăng ký thành công",
          });
          setLoading(false);
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
  console.log(signUpValue);
  return (
    <div className="bg-black px-10 py-5 rounded-md text-white lg:w-[800px]">
      <h2 className="capitalize text-3xl font-semibold mb-5">Sign Up</h2>
      <form action="" className="flex flex-wrap" onSubmit={handleSubmit}>
        <div className="lg:w-1/2 lg:pr-1">
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
        <div className="lg:w-1/2 lg:pl-1">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            placeholder="Ho Ten"
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
        <div className="lg:w-1/2 lg:pr-1">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
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
        <div className="lg:w-1/2 lg:pl-1">
          <label htmlFor="cfPw">Comfirm Password</label>
          <input
            id="cfPw"
            type="password"
            placeholder="Comfirm Password"
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
        <div className="lg:w-1/2 lg:pr-1">
          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            type="text"
            placeholder="Phone"
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
        <div className="lg:w-1/2 lg:pl-1">
          <label htmlFor="address">Your Address</label>
          <input
            id="address"
            type="text"
            placeholder="Address"
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
        <div className="lg:w-1/2 lg:pr-1">
          <label htmlFor="date">Birth day</label>
          <input
            id="date"
            type="date"
            placeholder="Birth Day"
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
              checked={signUpValue.gender}
              onChange={() => setSignUpValue({ ...signUpValue, gender: true })}
            />
            <label htmlFor="male" className="ml-1 cursor-pointer">
              Male
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
            {loading ? (
              <TailSpin
                height={"30px"}
                width={"30px"}
                fill="white"
                strokeWidth={3}
              />
            ) : (
              <span>sign up</span>
            )}
          </button>
          <p className="mt-4 text-gray-200">
            Bạn đã có tài khoản{" "}
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