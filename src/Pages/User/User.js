import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setShowSearch } from "../../Store/HeaderSlice/HeaderSlice";
import { unknowImg } from "../../Shared/Constant";
import { httpServ } from "../../ServiceWorkers";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AiFillStar } from "react-icons/ai";
import { getVNDMoney } from "../../Untils";
import TailSpin from "react-loading-icons/dist/components/tail-spin";

export default function User() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.root.user);
  const token = useSelector((state) => state.root.token);

  const [currentImage, setCurrentImage] = useState(user?.avatar || unknowImg);
  const [dataUser, setDataUser] = useState(null);
  const [ticketsData, setTicketsData] = useState([]);
  const [ticketsLoading, setTicketsLoading] = useState(true);

  const handleChangeImage = (e) => {
    // var fReader = new FileReader();
    // fReader.readAsDataURL();
    // fReader.onloadend = function (event) {
    //   console.log(event);
    // };
    console.log(e.target.files[0]);
    httpServ
      .capNhatAnhDaiDien(
        {
          avatar: e.target.files[0],
        },
        token
      )
      .then((res) => {
        console.log(res);
      })
      .catch((res) => {
        console.log(res);
      });
  };

  useEffect(() => {
    dispatch(setShowSearch(false));
    if (!user) {
      navigate("/");
      return;
    }
    httpServ.layThongTinChiTietUser(user._id, true).then((res) => {
      setDataUser(res.data);
    });
  }, [user]);
  const getTicketsData = async () => {
    const newTicketsData = [];
    for (const ticket of dataUser?.tickets) {
      const asyncResult = await httpServ
        .layThongTinChiTietVe(ticket)
        .then((res) => {
          return res.data;
        });
      newTicketsData.push(asyncResult);
    }
    return newTicketsData;
  };
  useEffect(() => {
    setTicketsLoading(true);
    getTicketsData().then((res) => {
      setTicketsData(res);
      setTicketsLoading(false);
    });
  }, [dataUser]);
  return (
    <div className="pt-[96px] lg:px-20 bg-slate-300 dark:bg-gray-900 dark:text-white">
      <div className="w-full  flex justify-center py-20">
        <div className="lg:w-1/3 flex justify-center items-start">
          <div className=" flex flex-col items-center px-10 py-5 rounded-xl border-[1px] dark:border-gray-500 min-h-[300px]">
            <LazyLoadImage
              src={currentImage}
              className="w-[200px] h-[200px] rounded-full"
              alt=""
              effect="opacity"
            />
            <div className="mt-4">
              <button className="px-2 py-1 bg-blue-600 text-white rounded-full cursor-pointer">
                <label htmlFor="image" className="cursor-pointer">
                  Up load new image
                </label>
              </button>
              <input
                className="hidden"
                type="file"
                id="image"
                onChange={handleChangeImage}
              />
            </div>
          </div>
        </div>
        <div className="lg:w-2/3 flex flex-col ">
          <div className="border-b-[1px] pb-10 border-gray-500">
            <h3 className="text-5xl font-bold">
              Xin chào, tôi là {dataUser?.name}
            </h3>
            <span className="font-thin">Bắt đầu tham gia vào 2022</span>
            <span className="flex items-center text-2xl mt-5">
              <AiFillStar className="mr-2" /> 0 đánh giá
            </span>
          </div>
          <div className="py-5 border-b-[1px] border-gray-500">
            <h5 className="text-3xl font-bold mb-5">My information</h5>
            <div className="flex  items-center mb-2">
              <span className="mr-2 font-bold block min-w-[80px] capitalize">
                Type
              </span>
              <p className="">: {dataUser?.type}</p>
            </div>
            <div className="flex items-center mb-2">
              <span className="mr-2 font-bold block min-w-[80px] capitalize">
                Name
              </span>
              <p className="">: {dataUser?.name}</p>
            </div>
            <div className="flex items-center mb-2">
              <span className="mr-2 font-bold block min-w-[80px] capitalize">
                Email
              </span>
              <p className="">: {dataUser?.email}</p>
            </div>
            <div className="flex items-center mb-2">
              <span className="mr-2 font-bold block min-w-[80px] capitalize">
                Phone
              </span>
              <p className="">: {dataUser?.phone}</p>
            </div>
            <div className="flex items-center mb-2">
              <span className="mr-2 font-bold block min-w-[80px] capitalize">
                Address
              </span>
              <p className="">: {dataUser?.address}</p>
            </div>
            <div className="flex items-center mb-2">
              <span className="mr-2 font-bold block min-w-[80px] capitalize">
                birthday
              </span>
              <p className="">: {dataUser?.birthday.substring(0, 10)}</p>
            </div>
            <div className="flex items-center mb-2">
              <span className="mr-2 font-bold block min-w-[80px] capitalize">
                gender
              </span>
              <p className="">: {dataUser?.gender ? "Male" : "Female"}</p>
            </div>
          </div>
          <div className="py-5 border-b-[1px] border-gray-500">
            <h5 className="text-3xl font-bold mb-5">
              My tickets:{" "}
              {!ticketsLoading && (
                <span className="text-xl font-normal">
                  {ticketsData.length} tickets
                </span>
              )}
            </h5>

            {ticketsLoading ? (
              <div className="flex justify-center">
                <TailSpin />
              </div>
            ) : (
              <div className="px-5">
                {ticketsData.map((ticket, index) => {
                  if (ticket.roomId) {
                    const {
                      roomId: { image, price, name },
                    } = ticket;
                    return (
                      <div className="my-2 py-3 px-5 border-gray-500 border-[1px] rounded-md flex items-center ">
                        <div className="mr-5">
                          <img
                            src={image}
                            className="w-[100px] rounded-md"
                            alt=""
                          />
                        </div>
                        <div className="">
                          <h5 className="text-xl font-bold">{name}</h5>
                          <span>{getVNDMoney(price)}/đêm</span>
                        </div>
                      </div>
                    );
                  }
                  return;
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
