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
  sendEmailResetPassword(params) {
    const url = `/auth/reset-password/send-email`;
    return axiosClient.post(url, null, { params });
  },
  verifyResetPassword(data) {
    const url = `/auth/reset-password/verify`;
    return axiosClient.post(url, data);
  },
  loginOAuth(code) {
    const url = `/auth/call-back/google`;
    return axiosClient.post(url, null, {
      params: {
        code,
        role: "CUSTOMER",
      },
    });
  },
};
export default authApi;
