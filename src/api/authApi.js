import axiosClient from "./axiosClient";

const authApi = {
  createUser(data) {
    const url = `/auth/register`;
    return axiosClient.post(url, data);
  },
  sendEmail(data) {
    const url = `/auth/send-email`;
    return axiosClient.post(url, data);
  },
  verifyEmail(data) {
    const url = `/auth/verify-email`;
    return axiosClient.post(url, data);
  },
};
export default authApi;
