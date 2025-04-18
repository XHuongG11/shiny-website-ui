import axios from "axios";
import StorageKeys from "../constants/storage-key";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem(StorageKeys.TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          if (error.response.data.code === "0") {
            alert("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại.");
            localStorage.removeItem(StorageKeys.TOKEN);
            localStorage.removeItem(StorageKeys.USER);
            window.location.href = "/login";
          }
          break;
        case 403:
          window.location.href = `/error/${error.response.status}`;
          break;
        case 404:
          window.location.href = `/error/${error.response.status}`;
          break;
        case 500:
          window.location.href = `/error/${error.response.status}`;
          break;
        default:
          window.location.href = `/error/${error.response.status}`;
      }
    } else {
      alert("Không thể kết nối đến máy chủ. Vui lòng kiểm tra mạng.");
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
