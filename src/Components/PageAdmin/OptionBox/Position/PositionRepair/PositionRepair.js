import React, { useEffect, useRef, useState } from "react";
import { TailSpin } from "react-loading-icons";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import OptionLoading from "../../OptionLoading/OptionLoading";
import { httpServ } from "../../../../../ServiceWorkers";
import BtnClose from "../../BtnClose/BtnClose";
import {
  setReloadData,
  setShowOptionBox,
} from "../../../../../Store/AdminSlice/AdminSlice";
import Validator from "../../../../../Shared/Validator";
import Rules from "../Rules";
import InputTextForm from "../../../../InputTextForm/InputTextForm";

export default function PositionRepair() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.root.token);
  const language = useSelector((state) => state.root.language);

  const idOption = useSelector((state) => state.admin.idOption);
  const [errors, setErrors] = useState({});
  const [positionValue, setPositionValue] = useState(null);
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(true);
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
      setBtnLoading(true);
      const { name, province, country, valueate } = positionValue;
      const currentValue = {
        name,
        province,
        country,
        valueate: valueate * 1,
      };
      httpServ.capNhatViTri(currentValue, idOption, token).then((res) => {
        dispatch(setShowOptionBox(false));
        dispatch(setReloadData(true));
        toast.success(language.AdminRepairLocMess);
        setBtnLoading(false);
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
    setLoading(true);
    httpServ.layChiTietViTri(idOption).then((res) => {
      setPositionValue(res.data);
      setLoading(false);
    });
  }, [idOption]);
  if (loading) {
    return <OptionLoading />;
  }

  return (
    <div className="dark:bg-gray-900 bg-gray-100 md:px-10 px-5 py-5 rounded-md lg:w-[800px] max-h-[100vh] overflow-y-auto scroll__custom">
      <BtnClose />
      <h2 className="capitalize text-3xl font-semibold mb-5">
        {language.AdminRepairLoc}
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
              btnLoading && "cursor-not-allowed"
            } w-full font-bold text-white capitalize mt-5 min-h-[45px] flex justify-center items-center hover:opacity-70 transition-all duration-300 ease-linear bg-red-600 py-2 rounded-md`}
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
