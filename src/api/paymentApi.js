// src/api/paymentApi.js
import axiosClient from "./axiosClient";

// src/api/paymentApi.js
const paymentApi = {
  // Thực hiện thanh toán MoMo
  createMomoPayment: (orderId) => {
    // Cách 1: Gửi qua URL query param
    const url = `/payments/momo-payment?orderId=${orderId}`;
    return axiosClient.post(url); // KHÔNG gửi body

  },

  // Kiểm tra trạng thái thanh toán
  checkPaymentStatus: (orderId) => {
    const url = `/payments/status/${orderId}`;
    return axiosClient.get(url);
  },
};


export default paymentApi;
