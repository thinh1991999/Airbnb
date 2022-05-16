import { useEffect, useState } from "react";
import httpServ from "../../../../ServiceWorkers/http.service";
import Validator from "../../../../Shared/Validator";
import { TailSpin } from "react-loading-icons";
import "react-calendar/dist/Calendar.css";
import BtnClose from "../BtnClose/BtnClose";
import { useDispatch, useSelector } from "react-redux";
import {
  setReloadData,
  setUserAddValue,
} from "../../../../Store/AdminSlice/AdminSlice";
import CheckBoxItem from "../CheckBoxItem/CheckBoxItem";
import InputTextForm from "../../../InputTextForm/InputTextForm";

function RoomAdd() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.root.token);
  const userAddValue = useSelector((state) => state.admin.userAddValue);

  const [errors, setErrors] = useState({});
  const [signUpValue, setSignUpValue] = useState({ ...userAddValue });

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
    <div className="dark:bg-gray-900 bg-gray-100 px-10 py-5 rounded-md text-white lg:w-[800px]">
      <BtnClose />
      <h2 className="capitalize text-3xl font-semibold mb-5">Thêm phòng</h2>
      <form action="" className="flex flex-wrap" onSubmit={handleSubmit}>
        <div className="lg:w-1/2 lg:pr-1">
          <InputTextForm
            name={"name"}
            hint={"Name"}
            handleFocus={handleFocus}
            handleChange={handleChange}
            errors={errors}
            values={signUpValue}
          />
        </div>
        <div className="lg:w-1/2 lg:pl-1">
          <InputTextForm
            name={"Price"}
            hint={"Price (VND)"}
            handleFocus={handleFocus}
            handleChange={handleChange}
            errors={errors}
            values={signUpValue}
          />
        </div>
        <div className="lg:w-1/2 lg:pr-1">
          <InputTextForm
            name={"guests"}
            hint={"guests"}
            handleFocus={handleFocus}
            handleChange={handleChange}
            errors={errors}
            values={signUpValue}
          />
        </div>
        <div className="lg:w-1/2 lg:pl-1">
          <InputTextForm
            name={"bedRoom"}
            hint={"bedRoom"}
            handleFocus={handleFocus}
            handleChange={handleChange}
            errors={errors}
            values={signUpValue}
          />
        </div>
        <div className="lg:w-1/2 lg:pr-1">
          <InputTextForm
            name={"bath"}
            hint={"bath"}
            handleFocus={handleFocus}
            handleChange={handleChange}
            errors={errors}
            values={signUpValue}
          />
        </div>
        <div className="lg:w-1/2 lg:pl-1">
          <label className="capitalize">Vị trí</label>
        </div>
        <div className="lg:w-full">
          <label htmlFor="description">Description</label>
          <input
            id="description"
            type="text"
            placeholder="Description"
            name="description"
            value={signUpValue.description}
            onFocus={handleFocus}
            onChange={handleChange}
            className={`my-2 w-full bg-gray-700 px-3 py-2 border-2  outline-none rounded-md ${
              errors.description ? `border-red-600` : `border-gray-400`
            }`}
          />
          {errors.description && (
            <p className="text-red-600">{errors.description}</p>
          )}
        </div>
        <div className="lg:w-1/2 lg:pr-1">
          <CheckBoxItem hint="elevator" name="elevator" />
        </div>
        <div className="lg:w-1/2 ">
          <CheckBoxItem hint="hotTub" name="hotTub" />
        </div>
        <div className="lg:w-1/2 lg:pr-1">
          <CheckBoxItem hint="pool" name="pool" />
        </div>
        <div className="lg:w-1/2 ">
          <CheckBoxItem hint="indoorFireplace" name="indoorFireplace" />
        </div>
        <div className="lg:w-1/2 lg:pr-1">
          <CheckBoxItem hint="dryer" name="dryer" />
        </div>
        <div className="lg:w-1/2 ">
          <CheckBoxItem hint="gym" name="gym" />
        </div>
        <div className="lg:w-1/2 lg:pr-1">
          <CheckBoxItem hint="kitchen" name="kitchen" />
        </div>
        <div className="lg:w-1/2 ">
          <CheckBoxItem hint="wifi" name="wifi" />
        </div>
        <div className="lg:w-1/2 lg:pr-1">
          <CheckBoxItem hint="heating" name="heating" />
        </div>
        <div className="lg:w-1/2 ">
          <CheckBoxItem hint="cableTV" name="cableTV" />
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
              <span>Thêm</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default RoomAdd;
