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
  layDanhSachViTriTrangChu = () => {
    const uri = "/api/locations";
    AxiosServ.axiosConfig.params = {
      limit: 10,
    };
    return AxiosServ.getMethod(uri, true);
  };
  layDanhSachPhong = (params = null, loading = true) => {
    const uri = "/api/rooms";
    if (params) {
      AxiosServ.axiosConfig.params = params;
    }
    return AxiosServ.getMethod(uri, loading);
  };
  layDanhSachPhongTrangChu = () => {
    const uri = "/api/rooms";
    AxiosServ.axiosConfig.params = {
      limit: 6,
    };
    return AxiosServ.getMethod(uri, true);
  };
  layThongTinChiTietUser = (id, loading = true) => {
    const uri = "/api/users/" + id;
    return AxiosServ.getMethod(uri, loading);
  };

  dangNhap = (data) => {
    const uri = "/api/auth/login";
    return AxiosServ.postMethod(uri, data, false);
  };
  dangKy = (data) => {
    const uri = "/api/auth/register";
    return AxiosServ.postMethod(uri, data, false);
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
    const uri = "/api/reviews";
    AxiosServ.axiosConfig.params = {
      roomId: id,
    };
    AxiosServ.axiosConfig.headers.token = token;
    return AxiosServ.postMethod(uri, data, false);
  };
  xoaDanhGia = (id, token) => {
    const uri = "/api/reviews/" + id;
    AxiosServ.axiosConfig.headers.token = token;
    return AxiosServ.deleteMothod(uri, false);
  };
  capNhatDanhGia = (params, id, data, token) => {
    const uri = "/api/reviews/" + id;
    AxiosServ.axiosConfig.params = params;
    AxiosServ.axiosConfig.headers.token = token;
    return AxiosServ.putMethod(uri, data, false);
  };
  layDanhSachNguoiDung = () => {
    const uri = "/api/users/pagination";
    AxiosServ.axiosConfig.params = {};
    return AxiosServ.getMethod(uri, false);
  };
  layDanhSachViTriAll = () => {
    const uri = "/api/locations";
    AxiosServ.axiosConfig.params = {};
    return AxiosServ.getMethod(uri, false);
  };
  layChiTietViTri = (id) => {
    const uri = "/api/locations/" + id;
    return AxiosServ.getMethod(uri, false);
  };
  taoViTri = (data, token) => {
    const uri = "/api/locations";
    AxiosServ.axiosConfig.headers.token = token;
    return AxiosServ.postMethod(uri, data, false);
  };
  xoaViTri = (id, token) => {
    const uri = "/api/locations/" + id;
    AxiosServ.axiosConfig.headers.token = token;
    return AxiosServ.deleteMothod(uri, false);
  };
  capNhatViTri = (data, id, token) => {
    const uri = "/api/locations/" + id;
    AxiosServ.axiosConfig.headers.token = token;
    return AxiosServ.putMethod(uri, data, false);
  };
  capNhatAnhViTri = (file, id, token) => {
    const formData = new FormData();
    formData.append("location", file);
    const uri = "/api/locations/upload-images/" + id;
    AxiosServ.axiosConfig.headers.token = token;
    return AxiosServ.postMethod(uri, formData, false);
  };
  layDanhSachPhongAll = () => {
    const uri = "/api/rooms";
    AxiosServ.axiosConfig.params = {};
    return AxiosServ.getMethod(uri, false);
  };
  taoPhong = (data, token) => {
    const uri = "/api/rooms";
    AxiosServ.axiosConfig.headers.token = token;
    return AxiosServ.postMethod(uri, data, false);
  };
  xoaPhong = (id, token) => {
    const uri = "/api/rooms/" + id;
    AxiosServ.axiosConfig.headers.token = token;
    return AxiosServ.deleteMothod(uri, false);
  };
  capNhatPhong = (data, id, token) => {
    const uri = "/api/rooms/" + id;
    AxiosServ.axiosConfig.headers.token = token;
    return AxiosServ.putMethod(uri, data, false);
  };
  capNhatAnhPhong = (file, id, token) => {
    const formData = new FormData();
    formData.append("room", file);
    const uri = "/api/rooms/upload-image/" + id;
    AxiosServ.axiosConfig.headers.token = token;
    return AxiosServ.postMethod(uri, formData, false);
  };
  xoaNguoiDung = (id, token) => {
    const uri = "/api/users/" + id;
    AxiosServ.axiosConfig.headers.token = token;
    return AxiosServ.deleteMothod(uri, false);
  };
  capNhatNguoiDung = (data, id, token) => {
    const uri = "/api/users/" + id;
    AxiosServ.axiosConfig.headers.token = token;
    return AxiosServ.putMethod(uri, data, false);
  };
  taoQuanTriVien = (data, token) => {
    const uri = "/api/users";
    AxiosServ.axiosConfig.headers.token = token;
    return AxiosServ.postMethod(uri, data, false);
  };
}

const httpServ = new HttpRequestService();

export default httpServ;
