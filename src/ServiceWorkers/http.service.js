import AxiosServ from "./axios.service";

/* eslint-disable no-useless-constructor */
class HttpRequestService {
  constructor() {}

  layDanhSachViTri = (location) => {
    const uri = "/api/locations";
    AxiosServ.axiosConfig.params = {
      location,
    };
    return AxiosServ.getMethod(uri, false);
  };
  layDanhSachPhong = (params) => {
    const uri = "/api/rooms";
    AxiosServ.axiosConfig.params = params;
    return AxiosServ.getMethod(uri, false);
  };

  dangNhap = (data) => {
    const uri = "/api/auth/login";
    return AxiosServ.postMethod(uri, data);
  };
  dangKy = (data) => {
    const uri = "/api/auth/register";
    return AxiosServ.postMethod(uri, data);
  };
}

const httpServ = new HttpRequestService();

export default httpServ;
