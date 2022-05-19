import { useEffect, useState } from "react";
import httpServ from "../../../../../ServiceWorkers/http.service";
import Validator from "../../../../../Shared/Validator";
import { TailSpin } from "react-loading-icons";
import "react-calendar/dist/Calendar.css";
import BtnClose from "../../BtnClose/BtnClose";
import { useDispatch, useSelector } from "react-redux";
import {
  setReloadData,
  setRoomAddValue,
} from "../../../../../Store/AdminSlice/AdminSlice";
import CheckBoxItem from "../../CheckBoxItem/CheckBoxItem";
import InputTextForm from "../../../../InputTextForm/InputTextForm";
import PosList from "../PosList/PosList";
import Rules from "../Rules";
import OptionLoading from "../../OptionLoading/OptionLoading";

function RoomAdd() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.root.token);
  const roomAddValue = useSelector((state) => state.admin.roomAddValue);

  const [errors, setErrors] = useState({});
  const [roomValue, setRoomValue] = useState({ ...roomAddValue });
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
      httpServ.taoPhong(roomValue, token).then((res) => {
        setRoomValue({
          name: "",
          guests: 1,
          bedRoom: 1,
          bath: 1,
          description: "",
          price: 100000,
          elevator: true,
          hotTub: true,
          pool: true,
          indoorFireplace: true,
          dryer: true,
          gym: true,
          kitchen: true,
          wifi: true,
          heating: true,
          cableTV: true,
          locationId: "",
        });
        setMessAdd({
          type: "Success",
          msg: "Thêm phòng thành công",
        });
        setBtnLoading(false);
        dispatch(setReloadData(true));
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
    return () => {
      dispatch(setRoomAddValue({ ...roomValue }));
    };
  }, [roomValue]);

  useEffect(() => {
    setloading(true);
    httpServ.layDanhSachViTri().then((res) => {
      setPosData(res.data);
      setloading(false);
    });
  }, []);
  if (loading) {
    return <OptionLoading />;
  }
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
            values={roomValue}
          />
        </div>
        <div className="lg:w-1/2 lg:pl-1">
          <InputTextForm
            name={"price"}
            hint={"Price (VND)"}
            handleFocus={handleFocus}
            handleChange={handleChange}
            errors={errors}
            values={roomValue}
          />
        </div>
        <div className="lg:w-1/2 lg:pr-1">
          <InputTextForm
            name={"guests"}
            hint={"guests"}
            handleFocus={handleFocus}
            handleChange={handleChange}
            errors={errors}
            values={roomValue}
          />
        </div>
        <div className="lg:w-1/2 lg:pl-1">
          <InputTextForm
            name={"bedRoom"}
            hint={"bedRoom"}
            handleFocus={handleFocus}
            handleChange={handleChange}
            errors={errors}
            values={roomValue}
          />
        </div>
        <div className="lg:w-1/2 lg:pr-1">
          <InputTextForm
            name={"bath"}
            hint={"bath"}
            handleFocus={handleFocus}
            handleChange={handleChange}
            errors={errors}
            values={roomValue}
          />
        </div>
        <div className="lg:w-1/2 lg:pl-1">
          <label className="capitalize">Vị trí</label>
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
        <div className="lg:w-full">
          <InputTextForm
            name={"description"}
            hint={"description"}
            handleFocus={handleFocus}
            handleChange={handleChange}
            errors={errors}
            values={roomValue}
          />
        </div>
        <div className="lg:w-1/2 lg:pr-1">
          <CheckBoxItem
            hint="elevator"
            name="elevator"
            values={roomValue}
            handleChange={handleChange}
          />
        </div>
        <div className="lg:w-1/2 ">
          <CheckBoxItem
            hint="hotTub"
            name="hotTub"
            values={roomValue}
            handleChange={handleChange}
          />
        </div>
        <div className="lg:w-1/2 lg:pr-1">
          <CheckBoxItem
            hint="pool"
            name="pool"
            values={roomValue}
            handleChange={handleChange}
          />
        </div>
        <div className="lg:w-1/2 ">
          <CheckBoxItem
            hint="indoorFireplace"
            name="indoorFireplace"
            values={roomValue}
            handleChange={handleChange}
          />
        </div>
        <div className="lg:w-1/2 lg:pr-1">
          <CheckBoxItem
            hint="dryer"
            name="dryer"
            values={roomValue}
            handleChange={handleChange}
          />
        </div>
        <div className="lg:w-1/2 ">
          <CheckBoxItem
            hint="gym"
            name="gym"
            values={roomValue}
            handleChange={handleChange}
          />
        </div>
        <div className="lg:w-1/2 lg:pr-1">
          <CheckBoxItem
            hint="kitchen"
            name="kitchen"
            values={roomValue}
            handleChange={handleChange}
          />
        </div>
        <div className="lg:w-1/2 ">
          <CheckBoxItem
            hint="wifi"
            name="wifi"
            values={roomValue}
            handleChange={handleChange}
          />
        </div>
        <div className="lg:w-1/2 lg:pr-1">
          <CheckBoxItem
            hint="heating"
            name="heating"
            values={roomValue}
            handleChange={handleChange}
          />
        </div>
        <div className="lg:w-1/2 ">
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
              <span>Thêm</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default RoomAdd;
