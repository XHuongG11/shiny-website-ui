// src/api/paymentApi.js
import axiosClient from "./axiosClient";

// src/api/paymentApi.js
const paymentApi = {
  // Thực hiện thanh toán MoMo
  createMomoPayment: (orderId) => {
    const url = `/payments/momo-payment?orderId=${orderId}`;
    return axiosClient.post(url); // KHÔNG gửi body

  },
  createVNpayPayment: (orderId) => {
    const url = `/payments/vnpay-payment?orderId=${orderId}`;
    return axiosClient.post(url); // KHÔNG gửi body

  },

  // Kiểm tra trạng thái thanh toán
  checkPaymentStatus: (orderId) => {
    const url = `/payments/status/${orderId}`;
    return axiosClient.get(url);
  },
};


export default paymentApi;
