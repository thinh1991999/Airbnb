import { useEffect, useState } from "react";
import httpServ from "../../../../../ServiceWorkers/http.service";
import Validator from "../../../../../Shared/Validator";
import { TailSpin } from "react-loading-icons";
import "react-calendar/dist/Calendar.css";
import BtnClose from "../../BtnClose/BtnClose";
import { useDispatch, useSelector } from "react-redux";
import {
  setReloadData,
  setShowOptionBox,
} from "../../../../../Store/AdminSlice/AdminSlice";
import CheckBoxItem from "../../CheckBoxItem/CheckBoxItem";
import InputTextForm from "../../../../InputTextForm/InputTextForm";
import PosList from "../PosList/PosList";
import Rules from "../Rules";
import OptionLoading from "../../OptionLoading/OptionLoading";
import { toast } from "react-toastify";

export default function RoomRepair() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.root.token);
  const language = useSelector((state) => state.root.language);

  const idOption = useSelector((state) => state.admin.idOption);
  const [errors, setErrors] = useState({});
  const [roomValue, setRoomValue] = useState(null);
  const [posData, setPosData] = useState([]);

  const [rules, setRules] = useState(Rules());
  const [validator, setValidator] = useState(new Validator(rules));
  const [messAdd, setMessAdd] = useState({
    type: "Success",
    msg: "",
  });
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setloading] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validator.validate(roomValue));
    if (validator.isValid) {
      setBtnLoading(true);
      httpServ.capNhatPhong(roomValue, idOption, token).then((res) => {
        dispatch(setShowOptionBox(false));
        dispatch(setReloadData(true));
        toast.success(language.AdminRepairRoomMess);
        setBtnLoading(false);
      });
    }
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
  const handleFocusPos = (name) => {
    setErrors({ ...errors, [name]: "" });
    setMessAdd({
      type: "Success",
      msg: "",
    });
  };

  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      setRoomValue({
        ...roomValue,
        [e.target.name]: e.target.checked,
      });
      return;
    }
    setRoomValue({
      ...roomValue,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangePos = (id) => {
    setRoomValue({
      ...roomValue,
      locationId: id,
    });
  };
  useEffect(() => {
    setloading(true);
    httpServ
      .layThongTinChiTietPhong(idOption)
      .then((res) => {
        setRoomValue(res.data);
      })
      .then(() => {
        httpServ.layDanhSachViTri().then((res) => {
          setPosData(res.data);
          setloading(false);
        });
      });
  }, [idOption]);

  if (loading) {
    return <OptionLoading />;
  }

  return (
    <div className="dark:bg-gray-900 bg-gray-100 md:px-10 px-5 py-5 rounded-md lg:w-[800px]  max-h-[100vh] overflow-y-auto scroll__custom">
      <BtnClose />
      <h2 className="capitalize text-3xl font-semibold mb-5">
        {language.AdminRepairRoom}
      </h2>
      <form action="" className="flex flex-wrap" onSubmit={handleSubmit}>
        <div className="md:w-1/2 w-full md:pr-1">
          <InputTextForm
            name={"name"}
            hint={language.AdminName}
            handleFocus={handleFocus}
            handleChange={handleChange}
            errors={errors}
            values={roomValue}
          />
        </div>
        <div className="md:w-1/2 w-full lg:pl-1">
          <InputTextForm
            name={"price"}
            hint={language.AdminPrice + "(VND)"}
            handleFocus={handleFocus}
            handleChange={handleChange}
            errors={errors}
            values={roomValue}
          />
        </div>
        <div className="md:w-1/2 w-full md:pr-1">
          <InputTextForm
            name={"guests"}
            hint={language.GuestRoom}
            handleFocus={handleFocus}
            handleChange={handleChange}
            errors={errors}
            values={roomValue}
          />
        </div>
        <div className="md:w-1/2 w-full lg:pl-1">
          <InputTextForm
            name={"bedRoom"}
            hint={language.Bedroom}
            handleFocus={handleFocus}
            handleChange={handleChange}
            errors={errors}
            values={roomValue}
          />
        </div>
        <div className="md:w-1/2 w-full md:pr-1">
          <InputTextForm
            name={"bath"}
            hint={language.Bathroom}
            handleFocus={handleFocus}
            handleChange={handleChange}
            errors={errors}
            values={roomValue}
          />
        </div>
        <div className="md:w-1/2 w-full lg:pl-1">
          <label className="capitalize font-bold">{language.Location}</label>
          <PosList
            posData={posData}
            values={roomValue}
            handleChangePos={handleChangePos}
            name="locationId"
            errors={errors}
            handleFocusPos={handleFocusPos}
          />
          {errors.locationId && (
            <p className="text-red-600">{errors.locationId}</p>
          )}
        </div>
        <div className="w-full">
          <InputTextForm
            name={"description"}
            hint={language.AdminDescription}
            handleFocus={handleFocus}
            handleChange={handleChange}
            errors={errors}
            values={roomValue}
          />
        </div>
        <div className="md:w-1/2 w-full md:pr-1">
          <CheckBoxItem
            hint={language.Elevator}
            name="elevator"
            values={roomValue}
            handleChange={handleChange}
          />
        </div>
        <div className="md:w-1/2 w-full ">
          <CheckBoxItem
            hint="hotTub"
            name="hotTub"
            values={roomValue}
            handleChange={handleChange}
          />
        </div>
        <div className="md:w-1/2 w-full md:pr-1">
          <CheckBoxItem
            hint={language.Pool}
            name="pool"
            values={roomValue}
            handleChange={handleChange}
          />
        </div>
        <div className="md:w-1/2 w-full ">
          <CheckBoxItem
            hint="indoorFireplace"
            name="indoorFireplace"
            values={roomValue}
            handleChange={handleChange}
          />
        </div>
        <div className="md:w-1/2 w-full md:pr-1">
          <CheckBoxItem
            hint={language.Dryer}
            name="dryer"
            values={roomValue}
            handleChange={handleChange}
          />
        </div>
        <div className="md:w-1/2 w-full ">
          <CheckBoxItem
            hint="gym"
            name="gym"
            values={roomValue}
            handleChange={handleChange}
          />
        </div>
        <div className="md:w-1/2 w-full md:pr-1">
          <CheckBoxItem
            hint="kitchen"
            name="kitchen"
            values={roomValue}
            handleChange={handleChange}
          />
        </div>
        <div className="md:w-1/2 w-full ">
          <CheckBoxItem
            hint="wifi"
            name="wifi"
            values={roomValue}
            handleChange={handleChange}
          />
        </div>
        <div className="md:w-1/2 w-full md:pr-1">
          <CheckBoxItem
            hint="heating"
            name="heating"
            values={roomValue}
            handleChange={handleChange}
          />
        </div>
        <div className="md:w-1/2 w-full ">
          <CheckBoxItem
            hint="cableTV"
            name="cableTV"
            values={roomValue}
            handleChange={handleChange}
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
