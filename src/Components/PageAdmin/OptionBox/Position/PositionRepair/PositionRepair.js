import React, { useEffect, useState } from "react";
import { TailSpin } from "react-loading-icons";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import OptionLoading from "../../OptionLoading/OptionLoading";
import { httpServ } from "../../../../../ServiceWorkers";
import BtnClose from "../../BtnClose/BtnClose";
import {
  setPosAddValue,
  setReloadData,
  setShowOptionBox,
} from "../../../../../Store/AdminSlice/AdminSlice";
import Validator from "../../../../../Shared/Validator";

export default function PositionRepair() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.root.token);
  const idOption = useSelector((state) => state.admin.idOption);
  const [errors, setErrors] = useState({});
  const [positionValue, setPositionValue] = useState(null);
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [messAdd, setMessAdd] = useState({
    type: "Success",
    msg: "",
  });
  const [rules, setRules] = useState([
    {
      field: "name",
      method: "isEmpty",
      validWhen: false,
      message: "The name field is required.",
    },
    {
      field: "province",
      method: "isEmpty",
      validWhen: false,
      message: "The province field is required.",
    },
    {
      field: "country",
      method: "isEmpty",
      validWhen: false,
      message: "The country field is required.",
    },
    {
      field: "valueate",
      method: "isEmpty",
      validWhen: false,
      message: "The valueate field is required.",
    },
    {
      field: "valueate",
      method: "isInt",
      validWhen: true,
      args: [{ min: 0, max: 10 }],
      message: "The valueate field is number(0-10).",
    },
  ]);
  const [validator, setValidator] = useState(new Validator(rules));

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
        toast.success("Chinh sua vị trí thanh cong");
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
    <div className="dark:bg-gray-900 bg-gray-100 px-10 py-5 rounded-md text-white lg:w-[800px]">
      <BtnClose />
      <h2 className="capitalize text-3xl font-semibold mb-5">
        Sửa thông tin vị trí
      </h2>
      <form action="" className="flex flex-wrap" onSubmit={handleSubmit}>
        <div className="lg:w-1/2 lg:pr-1">
          <label className="capitalize" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Name"
            name="name"
            value={positionValue.name}
            onFocus={handleFocus}
            onChange={handleChange}
            className={`my-2 w-full bg-gray-700  px-3 py-2 border-2  outline-none rounded-md ${
              errors.name ? `border-red-600` : `border-gray-400`
            }`}
          />
          {errors.name && <p className="text-red-600">{errors.name}</p>}
        </div>
        <div className="lg:w-1/2 lg:pr-1">
          <label className="capitalize" htmlFor="province">
            Province
          </label>
          <input
            id="province"
            type="text"
            placeholder="Province"
            name="province"
            value={positionValue.province}
            onFocus={handleFocus}
            onChange={handleChange}
            className={`my-2 w-full bg-gray-700 px-3 py-2 border-2  outline-none rounded-md ${
              errors.province ? `border-red-600` : `border-gray-400`
            }`}
          />
          {errors.province && <p className="text-red-600">{errors.province}</p>}
        </div>
        <div className="lg:w-1/2 lg:pr-1">
          <label className="capitalize" htmlFor="province">
            country
          </label>
          <input
            id="country"
            type="text"
            placeholder="Country"
            name="country"
            value={positionValue.country}
            onFocus={handleFocus}
            onChange={handleChange}
            className={`my-2 w-full bg-gray-700  px-3 py-2 border-2  outline-none rounded-md ${
              errors.country ? `border-red-600` : `border-gray-400`
            }`}
          />
          {errors.country && <p className="text-red-600">{errors.country}</p>}
        </div>
        <div className="lg:w-1/2 lg:pr-1">
          <label className="capitalize" htmlFor="province">
            valueate
          </label>
          <input
            id="valueate"
            type="text"
            placeholder="Valueate"
            name="valueate"
            value={positionValue.valueate}
            onFocus={handleFocus}
            onChange={handleChange}
            className={`my-2 w-full bg-gray-700 px-3 py-2 border-2  outline-none rounded-md ${
              errors.valueate ? `border-red-600` : `border-gray-400`
            }`}
          />
          {errors.valueate && <p className="text-red-600">{errors.valueate}</p>}
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
        <div className="lg:w-full flex flex-col justify-center items-center">
          <button
            type="submit"
            onSubmit={handleSubmit}
            className={`${
              btnLoading && "cursor-not-allowed"
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
