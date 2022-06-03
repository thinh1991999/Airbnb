import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowSearch } from "../../Store/HeaderSlice/HeaderSlice";
import { httpServ } from "../../ServiceWorkers";
import TableAdmin from "../../Components/PageAdmin/TableAdmin/TableAdmin";
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
  const language = useSelector((state) => state.root.language);
  const showOptionBox = useSelector((state) => state.admin.showOptionBox);
  const loading = useSelector((state) => state.admin.loading);

  const [navData, setNavData] = useState(null);
  const [currentNav, setCurrentNav] = useState(0);

  useEffect(() => {
    if (navData) {
      dispatch(setLoading(true));
      httpServ[navData[currentNav].getDataFunc](null, false).then((res) => {
        dispatch(setData(res.data));
        dispatch(setLoading(false));
      });
    }
  }, [currentNav, navData]);

  useEffect(() => {
    dispatch(setShowSearch(false));
  }, []);

  useEffect(() => {
    setNavData([
      {
        name: language.AdminControlUser,
        tableColumns: [
          {
            Hint: "Name",
            Header: language.AdminName,
            accessor: "name",
          },
          {
            Hint: "Avatar",
            Header: language.AdminAvatar,
            accessor: "avatar",
          },
          {
            Hint: "Address",
            Header: language.AdminAddress,
            accessor: "address",
          },
          {
            Hint: "Email",
            Header: language.AdminEmail,
            accessor: "email",
          },
          {
            Hint: "Phone",
            Header: language.AdminPhone,
            accessor: "phone",
          },
          {
            Hint: "BirthDay",
            Header: language.AdminBD,
            accessor: "birthday",
          },
          {
            Hint: "Gender",
            Header: language.AdminGender,
            accessor: "gender",
          },
          {
            Hint: "Actions",
            Header: language.AdminActions,
          },
        ],
        getDataFunc: "layDanhSachNguoiDung",
        delete: "xoaNguoiDung",
        upLoadImg: "thayAnhNguoiDung",
        btnAddMess: language.AdminAddUser,
        btnDelMess: language.AdminDelUser,
        btnAddIcon: <AiOutlineUserAdd className="text-2xl" />,
        detailComponent: <UserDetail />,
        repairComponent: <UserRepair />,
        addComponent: <UserAdd />,
      },
      {
        name: language.AdminControlPos,
        tableColumns: [
          {
            Hint: "Name",
            Header: language.AdminName,
            accessor: "name",
          },
          {
            Hint: "Country",
            Header: language.AdminCountry,
            accessor: "country",
          },
          {
            Hint: "Province",
            Header: language.AdminProvince,
            accessor: "province",
          },
          {
            Hint: "Image",
            Header: language.AdminImage,
            accessor: "image",
          },
          {
            Hint: "Valueate",
            Header: language.AdminValueate,
            accessor: "valueate",
          },
          {
            Hint: "Actions",
            Header: language.AdminActions,
          },
        ],
        getDataFunc: "layDanhSachViTriAll",
        delete: "xoaViTri",
        btnAddMess: language.AdminAddLoc,
        btnDelMess: language.AdminDelLoc,
        upLoadImg: "capNhatAnhViTri",
        btnAddIcon: <MdOutlineAddLocationAlt className="text-2xl" />,
        detailComponent: <PositionDetail />,
        repairComponent: <PositionRepair />,
        addComponent: <PositionAdd />,
      },
      {
        name: language.AdminControlRoom,
        tableColumns: [
          {
            Hint: "Name",
            Header: language.AdminName,
            accessor: "name",
          },
          {
            Hint: "Image",
            Header: language.AdminImage,
            accessor: "image",
          },
          {
            Hint: "Description",
            Header: language.AdminDescription,
            accessor: "description",
          },
          {
            Hint: "Price",
            Header: language.AdminPrice,
            accessor: "price",
          },
          {
            Hint: "Actions",
            Header: language.AdminActions,
          },
        ],
        getDataFunc: "layDanhSachPhongAll",
        delete: "xoaPhong",
        btnAddMess: language.AdminAddRoom,
        btnDelMess: language.AdminDelRoom,
        upLoadImg: "capNhatAnhPhong",
        btnAddIcon: <MdAddBusiness className="text-2xl" />,
        detailComponent: <RoomDetail />,
        repairComponent: <RoomRepair />,
        addComponent: <RoomAdd />,
      },
    ]);
  }, [language]);

  return (
    <div className="lg:pt-[96px] container lg:px-[80px]  mx-auto">
      <div className="flex justify-center">
        <ul className="flex justify-center">
          {navData?.map((item, index) => {
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
      {loading && <AdminLoading />}
      {!loading && navData && (
        <TableAdmin currentNavData={navData?.[currentNav]} />
      )}
      {showOptionBox && <OptionBox />}
    </div>
  );
}
