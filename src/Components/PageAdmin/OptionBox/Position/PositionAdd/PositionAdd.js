import React, { useEffect, useRef, useState } from "react";
import { TailSpin } from "react-loading-icons";
import { useDispatch, useSelector } from "react-redux";
import { httpServ } from "../../../../../ServiceWorkers";
import BtnClose from "../../BtnClose/BtnClose";
import {
  setPosAddValue,
  setReloadData,
} from "../../../../../Store/AdminSlice/AdminSlice";
import Validator from "../../../../../Shared/Validator";
import Rules from "../Rules";
import InputTextForm from "../../../../InputTextForm/InputTextForm";

export default function PositionAdd() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.root.token);
  const language = useSelector((state) => state.root.language);

  const posAddValue = useSelector((state) => state.admin.posAddValue);
  const [errors, setErrors] = useState({});
  const [positionValue, setPositionValue] = useState({ ...posAddValue });
  const [loading, setLoading] = useState(false);
  const [messAdd, setMessAdd] = useState({
    type: "Success",
    msg: "",
  });
  const rules = useRef(Rules()).current;
  const validator = useRef(new Validator(rules)).current;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validator.validate(positionValue));
    if (validator.isValid) {
      setLoading(true);
      const { name, province, country, valueate } = positionValue;
      const currentValue = {
        name,
        province,
        country,
        valueate: valueate * 1,
      };
      httpServ.taoViTri(currentValue, token).then((res) => {
        setPositionValue({
          name: "",
          province: "",
          country: "",
          valueate: "",
        });
        setMessAdd({
          type: "Success",
          msg: "Thêm vị trí thành công",
        });
        setLoading(false);
        dispatch(setReloadData(true));
      });
    }
  };
  const handleChange = (e) => {
    setPositionValue({
      ...positionValue,
      [e.target.name]: e.target.value,
    });
  };
  const handleFocus = (e) => {
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
    setMessAdd({
      type: "Success",
      msg: "",
    });
  };

  useEffect(() => {
    return () => {
      dispatch(setPosAddValue({ ...positionValue }));
    };
  }, [positionValue]);

  return (
    <div className="dark:bg-gray-900 bg-gray-100 sm:px-10 px-5 py-5 rounded-md lg:w-[800px] overflow-y-scroll max-h-[100vh] scroll__custom">
      <BtnClose />
      <h2 className="capitalize text-3xl font-semibold mb-5">
        {language.AdminAddLoc}
      </h2>
      <form action="" className="flex flex-wrap" onSubmit={handleSubmit}>
        <div className="md:w-1/2 w-full md:pr-1">
          <InputTextForm
            name={"name"}
            hint={language.AdminName}
            handleFocus={handleFocus}
            handleChange={handleChange}
            errors={errors}
            values={positionValue}
          />
        </div>
        <div className="md:w-1/2 w-full md:pr-1">
          <InputTextForm
            name={"province"}
            hint={language.AdminProvince}
            handleFocus={handleFocus}
            handleChange={handleChange}
            errors={errors}
            values={positionValue}
          />
        </div>
        <div className="md:w-1/2 w-full md:pr-1">
          <InputTextForm
            name={"country"}
            hint={language.AdminCountry}
            handleFocus={handleFocus}
            handleChange={handleChange}
            errors={errors}
            values={positionValue}
          />
        </div>
        <div className="md:w-1/2 w-full md:pr-1">
          <InputTextForm
            name={"valueate"}
            hint={language.AdminValueate}
            handleFocus={handleFocus}
            handleChange={handleChange}
            errors={errors}
            values={positionValue}
          />
        </div>
        {messAdd.msg && (
          <p
            className={`${
              messAdd.type === "Success" ? "text-blue-600" : "text-red-600"
            }`}
          >
            {messAdd.msg}
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
