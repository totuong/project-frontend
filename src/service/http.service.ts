import axios from "axios";

const axiosInstance = axios.create({
  timeout: 10000,
  withCredentials: true,
  baseURL:  "/api",
  headers: {
    // 设置后端需要的传参类型
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token"); // Assuming you're storing the token in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
function useAuditLogHttp() {
  return axiosInstance;
}

export { useAuditLogHttp };