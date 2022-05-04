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
    return AxiosServ.getMethod(uri, true);
  };
  layThongTinChiTietUser = (id, loading = true) => {
    const uri = "/api/users/" + id;
    return AxiosServ.getMethod(uri, loading);
  };

  dangNhap = (data) => {
    const uri = "/api/auth/login";
    return AxiosServ.postMethod(uri, data);
  };
  dangKy = (data) => {
    const uri = "/api/auth/register";
    return AxiosServ.postMethod(uri, data);
  };
  capNhatAnhDaiDien = (data, token) => {
    const uri = "/api/users/upload-avatar";
    AxiosServ.axiosConfig.headers.token = token;
    return AxiosServ.postMethod(uri, data);
  };
  layThongTinChiTietPhong = (id) => {
    const uri = "/api/rooms/" + id;
    return AxiosServ.getMethod(uri, true);
  };
}

const httpServ = new HttpRequestService();

export default httpServ;
