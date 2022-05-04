import { useEffect, useState } from "react";

function Footer() {
  const [supports, setSupports] = useState([]);
  const [community, setCommunity] = useState([]);
  const [guest, setGuest] = useState([]);
  const [intro, setIntro] = useState([]);
  const [policy, setPolicy] = useState([]);

  useEffect(() => {
    setSupports({
      title: "Hỗ trợ",
      data: [
        "Trung tâm trợ giúp",
        "Thông tin an toàn",
        "Các tùy chọn hủy",
        "Biện pháp ứng phó với đại dịch COVID-19 của chúng tôi",
        "Hỗ trợ người khuyết tật",
        "Báo cáo lo ngại của hàng xóm",
      ],
    });
    setCommunity({
      title: "Cộng đồng",
      data: [
        "Airbnb.org: nhà ở cứu trợ",
        "Hỗ trợ dân tị nạn Afghanistan",
        "Chống phân biệt đối xử",
      ],
    });
    setGuest({
      title: "Đón tiếp khách",
      data: [
        "Thử đón tiếp khách",
        "AirCover: bảo vệ cho Host",
        "Xem tài nguyên đón tiếp khách",
        "Truy cập diễn đàn cộng đồng",
        "Đón tiếp khách có trách nhiệm",
      ],
    });
    setIntro({
      title: "Giới thiệu",
      data: [
        "Trang tin tức",
        "Tìm hiểu các tính năng mới",
        "Thư ngỏ từ các nhà sáng lập",
        "Cơ hội nghề nghiệp",
        "Nhà đầu tư",
        "Airbnb Luxe",
      ],
    });
    setPolicy(["Quyền riêng tư", "Điều khoản", "Sơ đồ trang web"]);
  }, []);

  return (
    <div className="w-full px-20 bg-gray-100 dark:bg-gray-800">
      <div className="w-full border-b-[1px] py-10 flex justify-between">
        <div className="lg:w-1/4 px-2">
          <h5 className="font-bold">{supports?.title}</h5>
          <ul className="mt-2">
            {supports?.data?.map((item, index) => {
              return (
                <li
                  key={index}
                  className="my-2 font-light cursor-pointer hover:text-blue-600 transition-all ease-linear duration-100"
                >
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="lg:w-1/4 px-2">
          <h5 className="font-bold">{community?.title}</h5>
          <ul className="mt-2">
            {community?.data?.map((item, index) => {
              return (
                <li
                  key={index}
                  className="my-2 font-light cursor-pointer hover:text-blue-600 transition-all ease-linear duration-100"
                >
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="lg:w-1/4 px-2">
          <h5 className="font-bold">{guest?.title}</h5>
          <ul className="mt-2">
            {guest?.data?.map((item, index) => {
              return (
                <li
                  key={index}
                  className="my-2 font-light cursor-pointer hover:text-blue-600 transition-all ease-linear duration-100"
                >
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="lg:w-1/4 px-2">
          <h5 className="font-bold">{intro?.title}</h5>
          <ul className="mt-2">
            {intro?.data?.map((item, index) => {
              return (
                <li
                  key={index}
                  className="my-2 font-light cursor-pointer hover:text-blue-600 transition-all ease-linear duration-100"
                >
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="flex py-5 justify-between ">
        <div className="flex items-center px-2">
          <div className="">
            <span>© 2022 Duy Thinh.</span>
          </div>
          {policy?.map((item, index) => {
            return (
              <div className="flex items-center">
                <span className="align-middle mx-2">.</span>
                <div
                  key={index}
                  className="font-light  hover:text-blue-600 transition-all ease-linear duration-100 cursor-pointer"
                >
                  {item}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Footer;
