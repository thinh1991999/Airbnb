import AxiosServ from "./axios.service";

class HttpRequestService {
  constructor() {}

  layDanhSachViTri = (location) => {
    const uri = "/api/locations";
    AxiosServ.axiosConfig.params = {
      location,
    };
    return AxiosServ.getMethod(uri, false);
  };
  layDanhSachPhong = (params = null, loading = true) => {
    const uri = "/api/rooms";
    if (params) {
      AxiosServ.axiosConfig.params = params;
    }
    return AxiosServ.getMethod(uri, loading);
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
  layDanhGiaPhong = (id) => {
    const uri = "/api/reviews/byRoom?roomId=" + id;
    return AxiosServ.getMethod(uri, false);
  };
  layThongTinChiTietVe = (id) => {
    const uri = "/api/tickets/" + id;
    return AxiosServ.getMethod(uri, false);
  };
  datPhong = (data, token) => {
    const uri = "/api/rooms/booking";
    AxiosServ.axiosConfig.headers.token = token;
    return AxiosServ.postMethod(uri, data, false);
  };
  taoDanhGia = (id, data, token) => {
    const uri = "/api/reviews/byRoom?roomId=" + id;
    AxiosServ.axiosConfig.headers.token = token;
    return AxiosServ.postMethod(uri, data, false);
  };
  layDanhSachNguoiDung = () => {
    const uri = "/api/users/pagination";
    return AxiosServ.getMethod(uri, false);
  };
  layDanhSachViTri = () => {
    const uri = "/api/locations";
    return AxiosServ.getMethod(uri, false);
  };
  layDanhSachPhongAll = () => {
    const uri = "/api/rooms";
    return AxiosServ.getMethod(uri, false);
  };
}

const httpServ = new HttpRequestService();

export default httpServ;
