import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowSearch } from "../../Store/HeaderSlice/HeaderSlice";
import { httpServ } from "../../ServiceWorkers";
import TableAdmin from "../../Components/PageAdmin/TableAdmin/TableAdmin";
import { Circles } from "react-loading-icons";

export default function Admin() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.root.mode);

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
      getDataFunc: httpServ.layDanhSachNguoiDung,
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
      getDataFunc: httpServ.layDanhSachViTri,
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
      getDataFunc: httpServ.layDanhSachPhongAll,
    },
  ]);
  const [currentNav, setCurrentNav] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    navData[currentNav].getDataFunc(null, false).then((res) => {
      setData(res.data);
      setLoading(false);
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
        <div className="min-h-[500px] flex justify-center items-center">
          <Circles
            height={"10rem"}
            width="10rem"
            fill={mode === "DARK" ? "white" : "black"}
          />
        </div>
      ) : (
        <TableAdmin
          data={data}
          currentColumns={navData[currentNav].tableColumns}
        />
      )}
    </div>
  );
}
