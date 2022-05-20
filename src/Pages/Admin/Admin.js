import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowSearch } from "../../Store/HeaderSlice/HeaderSlice";
import { httpServ } from "../../ServiceWorkers";
import TableAdmin from "../../Components/PageAdmin/TableAdmin/TableAdmin";
import { Circles } from "react-loading-icons";
import { AiOutlineUserAdd } from "react-icons/ai";
import { MdOutlineAddLocationAlt, MdAddBusiness } from "react-icons/md";
import { setData, setLoading } from "../../Store/AdminSlice/AdminSlice";
import OptionBox from "../../Components/PageAdmin/OptionBox/OptionBox";
import UserAdd from "../../Components/PageAdmin/OptionBox/User/UserAdd/UserAdd";
import UserRepair from "../../Components/PageAdmin/OptionBox/User/UserRepair/UserRepair";
import UserDetail from "../../Components/PageAdmin/OptionBox/User/UserDetail/UserDetail";
import RoomAdd from "../../Components/PageAdmin/OptionBox/Room/RoomAdd/RoomAdd";
import RoomDetail from "../../Components/PageAdmin/OptionBox/Room/RoomDetail/RoomDetail";
import RoomRepair from "../../Components/PageAdmin/OptionBox/Room/RoomRepair/RoomRepair";
import PositionAdd from "../../Components/PageAdmin/OptionBox/Position/PositionAdd/PositionAdd";
import PositionDetail from "../../Components/PageAdmin/OptionBox/Position/PositionDetail/PositionDetail";
import PositionRepair from "../../Components/PageAdmin/OptionBox/Position/PositionRepair/PositionRepair";
import AdminLoading from "../../Components/PageAdmin/AdminLoading/AdminLoading";

export default function Admin() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.root.mode);
  const showOptionBox = useSelector((state) => state.admin.showOptionBox);
  const loading = useSelector((state) => state.admin.loading);

  const [navData, setNavData] = useState([
    {
      name: "Quản lý người dùng",
      tableColumns: [
        {
          Header: "Name",
          accessor: "name",
        },
        {
          Header: "Avatar",
          accessor: "avatar",
        },
        {
          Header: "Address",
          accessor: "address",
        },
        {
          Header: "Email",
          accessor: "email",
        },
        {
          Header: "Phone",
          accessor: "phone",
        },
        {
          Header: "BirthDay",
          accessor: "birthday",
        },
        {
          Header: "Gender",
          accessor: "gender",
        },
        {
          Header: "Actions",
        },
      ],
      getDataFunc: "layDanhSachNguoiDung",
      delete: "xoaNguoiDung",
      upLoadImg: "thayAnhNguoiDung",
      btnAddMess: "Thêm quản trị viên",
      btnAddIcon: <AiOutlineUserAdd className="text-2xl" />,
      detailComponent: <UserDetail />,
      repairComponent: <UserRepair />,
      addComponent: <UserAdd />,
    },
    {
      name: "Quản lý vị trí",
      tableColumns: [
        {
          Header: "Name",
          accessor: "name",
        },
        {
          Header: "Country",
          accessor: "country",
        },
        {
          Header: "Province",
          accessor: "province",
        },
        {
          Header: "Image",
          accessor: "image",
        },
        {
          Header: "Valueate",
          accessor: "valueate",
        },
        {
          Header: "Actions",
        },
      ],
      getDataFunc: "layDanhSachViTri",
      delete: "xoaNguoiDung",
      btnAddMess: "Thêm vị trí",
      upLoadImg: "capNhatAnhViTri",
      btnAddIcon: <MdOutlineAddLocationAlt className="text-2xl" />,
      detailComponent: <PositionDetail />,
      repairComponent: <PositionRepair />,
      addComponent: <PositionAdd />,
    },
    {
      name: "Quản lý thông tin phòng",
      tableColumns: [
        {
          Header: "Name",
          accessor: "name",
        },
        {
          Header: "Image",
          accessor: "image",
        },
        {
          Header: "Description",
          accessor: "description",
        },
        {
          Header: "Price",
          accessor: "price",
        },
        {
          Header: "Actions",
        },
      ],
      getDataFunc: "layDanhSachPhongAll",
      delete: "xoaNguoiDung",
      btnAddMess: "Thêm phòng",
      upLoadImg: "capNhatAnhPhong",
      btnAddIcon: <MdAddBusiness className="text-2xl" />,
      detailComponent: <RoomDetail />,
      repairComponent: <RoomRepair />,
      addComponent: <RoomAdd />,
    },
  ]);
  const [currentNav, setCurrentNav] = useState(0);

  useEffect(() => {
    dispatch(setLoading(true));
    httpServ[navData[currentNav].getDataFunc](null, false).then((res) => {
      dispatch(setData(res.data));
      dispatch(setLoading(false));
    });
  }, [currentNav]);

  useEffect(() => {
    dispatch(setShowSearch(false));
  }, []);
  return (
    <div className="lg:pt-[96px] container  mx-auto">
      <div className="flex justify-center">
        <ul className="flex justify-center">
          {navData.map((item, index) => {
            const { name } = item;
            return (
              <li
                onClick={() => setCurrentNav(index)}
                key={index}
                className={`${
                  currentNav === index && " border-b-[4px]"
                }  py-5  mx-5 cursor-pointer text-xl font-bold border-black dark:border-white capitalize`}
              >
                {name}
              </li>
            );
          })}
        </ul>
      </div>

      {loading ? (
        <AdminLoading />
      ) : (
        <TableAdmin currentNavData={navData[currentNav]} />
      )}
      {showOptionBox && <OptionBox />}
    </div>
  );
}
