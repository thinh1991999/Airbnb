import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setShowSearch } from "../../Store/HeaderSlice/HeaderSlice";
import { useTable } from "react-table";
import { httpServ } from "../../ServiceWorkers";
import TableAdmin from "../../Components/PageAdmin/TableAdmin/TableAdmin";

export default function Admin() {
  const dispatch = useDispatch();
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
        },
        {
          Header: "Adress",
          accessor: "adress",
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
      ],
    },
    {
      name: "Quản lý vị trí",
    },
    {
      name: "Quản lý thông tin phòng",
    },
  ]);
  const [data, setData] = useState([]);

  useEffect(() => {
    httpServ.layDanhSachNguoiDung().then((res) => {
      setData(res.data);
    });
  }, []);

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
                key={index}
                className="py-5 border-b-[1px] mx-5 cursor-pointer text-xl font-bold capitalize"
              >
                {name}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="">
        <TableAdmin data={data} currentColumns={navData[0].tableColumns} />
      </div>
    </div>
  );
}
