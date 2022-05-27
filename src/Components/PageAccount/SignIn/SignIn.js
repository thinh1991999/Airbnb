import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TailSpin } from "react-loading-icons";
import { Link, useNavigate } from "react-router-dom";
import httpServ from "../../../ServiceWorkers/http.service";
import Validator from "../../../Shared/Validator";
import { setToken, setUser } from "../../../Store/RootSlice/RootSlice";

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useSelector((state) => state.login.location);
  const language = useSelector((state) => state.root.language);

  const [errors, setErrors] = useState({});
  const [signInValue, setSignInValue] = useState({
    email: "",
    password: "",
  });
  const [rules, setRules] = useState([
    {
      field: "email",
      method: "isEmpty",
      validWhen: false,
      message: language.emailRequired,
    },
    {
      field: "email",
      method: "isEmail",
      validWhen: true,
      message: language.emailChecked,
    },
    {
      field: "password",
      method: "isEmpty",
      validWhen: false,
      message: language.passwordRequired,
    },
  ]);
  const [validator, setValidator] = useState(new Validator(rules));
  const [messSignIn, setMessSignIn] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validator.validate(signInValue));
    if (validator.isValid && !loading) {
      setLoading(true);
      httpServ
        .dangNhap(signInValue)
        .then((res) => {
          dispatch(setToken(res.data.token));
          dispatch(setUser(res.data.user));
          setLoading(false);
          navigate(location);
        })
        .catch((error) => {
          setLoading(false);
          setMessSignIn(error?.err?.response?.data?.message);
        });
    }
  };

  const handleFocus = (e) => {
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
    setMessSignIn("");
  };

  const handleChange = (e) => {
    setSignInValue({
      ...signInValue,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-black px-10 py-5 rounded-md text-white lg:w-[400px]">
      <h2 className="capitalize text-3xl font-semibold mb-5">Sign in</h2>
      <form action="" className="flex flex-col" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={signInValue.email}
          onFocus={handleFocus}
          onChange={handleChange}
          className={`my-2 bg-gray-700 px-3 py-2 border-2  outline-none rounded-md ${
            errors.email ? `border-red-600` : `border-gray-400`
          }`}
        />
        {errors.email && <p className="text-red-600">{errors.email}</p>}
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={signInValue.password}
          onFocus={handleFocus}
          onChange={handleChange}
          className={`my-2 bg-gray-700 px-3 py-2 border-2  outline-none rounded-md 
          ${errors.password ? `border-red-600` : `border-gray-400`}
          `}
        />
        {errors.password && <p className="text-red-600">{errors.password}</p>}
        {messSignIn && <p className="text-red-600">{messSignIn}</p>}
        <button
          type="submit"
          onSubmit={handleSubmit}
          className={`${
            loading && "cursor-not-allowed"
          } capitalize mt-5 min-h-[45px] flex justify-center items-center hover:opacity-70 transition-all duration-300 ease-linear bg-red-600 py-2 rounded-md`}
        >
          {loading ? (
            <TailSpin
              height={"30px"}
              width={"30px"}
              fill="white"
              strokeWidth={3}
            />
          ) : (
            <span>sign in</span>
          )}
        </button>
        <p className="mt-4 text-gray-200">
          Bạn chưa có tài khoản{" "}
          <Link to={"/account/signUp"} className="font-semibold text-red-600">
            Sign Up Now
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignIn;
