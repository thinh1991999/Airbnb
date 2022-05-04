import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setShowSearch } from "../../Store/HeaderSlice/HeaderSlice";
import { unknowImg } from "../../Shared/Constant";
import { httpServ } from "../../ServiceWorkers";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function User() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.root.user);
  const token = useSelector((state) => state.root.token);

  const loading = useSelector((state) => state.loading.loading);

  const [currentImage, setCurrentImage] = useState(user?.avatar || unknowImg);
  const [dataUser, setDataUser] = useState(null);
  const errors = {};

  const handleChangeImage = (e) => {
    // var fReader = new FileReader();
    // fReader.readAsDataURL(e.target.files[0]);
    // fReader.onloadend = function (event) {

    // };
    httpServ
      .capNhatAnhDaiDien(
        {
          avatar: "C:\\Users\\MSI\\Desktop\\loginBg.jpg",
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

  const handleSubmit = () => {};

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

  return (
    <div className="pt-[96px] lg:px-20 bg-slate-300 dark:bg-gray-900 dark:text-white">
      <div className="w-full flex py-20">
        <div className="lg:w-1/3">
          <div className="flex flex-col items-center">
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
        <div className="lg:w-1/2">
          <div className="">
            <div className="flex items-center mb-2">
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
        </div>
      </div>
    </div>
  );
}
