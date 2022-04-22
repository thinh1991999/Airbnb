import Axios from "axios";

class AxiosService {
  axios;
  axiosConfig;
  authService;
  constructor(params) {
    this.axios = Axios.create({
      baseURL: this.getBaseUrl(),
    });
    this.getAxiosConfig();
  }

  getBaseUrl() {
    return "https://airbnb.cybersoft.edu.vn";
  }

  getAxiosConfig = (_token) => {
    // const token = _token ? _token : localStorageServ.accessToken.get();
    this.axiosConfig = {
      headers: {
        tokenByClass:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAxOCIsIkhldEhhblN0cmluZyI6IjI0LzEwLzIwMjIiLCJIZXRIYW5UaW1lIjoiMTY2NjU2OTYwMDAwMCIsIm5iZiI6MTYzNzc3MzIwMCwiZXhwIjoxNjY2NzE3MjAwfQ.DWLvOaiIVlM3ruSxr9n9wTjFAhCxMgyw8spyqZIBrPE",
      },
    };
  };

  removeAxiosConfig = () => {
    this.axiosConfig = {
      headers: {
        iKeapy: ``,
        "Content-Type": "application/json",
      },
    };
  };

  getMethod(uri, loading = true) {
    return this.handleFlow(this.axios.get(uri, this.axiosConfig), loading);
  }

  postMethod(uri, data, loading = true) {
    return this.handleFlow(
      this.axios.post(uri, data, this.axiosConfig),
      loading
    );
  }

  putMethod(uri, data, loading = true) {
    return this.handleFlow(
      this.axios.put(uri, data, this.axiosConfig),
      loading
    );
  }

  patchMethod(uri, data, loading = true) {
    return this.handleFlow(
      this.axios.patch(uri, data, this.axiosConfig),
      loading
    );
  }

  deleteMothod(uri, loading = true) {
    return this.handleFlow(this.axios.delete(uri, this.axiosConfig), loading);
  }

  handleFlow(method, loading = true) {
    return new Promise((resolve, reject) => {
      method
        .then((res) => {
          resolve({
            data: res.data,
            status: res.status,
            isSuccess: true,
          });
        })
        .catch((err) => {
          this.handleError(err);
          reject({
            err: err,
          });
        });
    });
  }

  handleError = (err) => {
    const status = err.response?.status;
    switch (status) {
      // case 400:
      case 401:
      case 403:
      // window.location.assign("/login");
      //   break;
      // default:
      //   break;
    }
  };
  //
  axiosInstance = (req) => {
    this.axios(req, this.axiosConfig);
  };
}

const AxiosServ = new AxiosService();
export default AxiosServ;
