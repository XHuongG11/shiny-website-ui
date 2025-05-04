// src/api/paymentApi.js
import axiosClient from "./axiosClient";

const paymentApi = {
  // Tạo thanh toán COD (nếu cần sử dụng)
  createCodPayment: (orderId) => {
    const url = `/payments/create?orderId=${orderId}`;
    return axiosClient.post(url); // Không cần body
  },

  // Tạo thanh toán MoMo
  createMomoPayment: (orderId) => {
    const url = `/payments/momo-payment?orderId=${orderId}`;
    return axiosClient.post(url); // Không gửi body
  },

  // Tạo thanh toán VNPay
  createVNpayPayment: (orderId) => {
    const url = `/payments/vnpay-payment?orderId=${orderId}`;
    return axiosClient.post(url); // Không gửi body
  },

  // (Tùy chọn) Kiểm tra trạng thái thanh toán
  checkPaymentStatus: (orderId) => {
    const url = `/payments/status/${orderId}`;
    return axiosClient.get(url);
  },
};

export default paymentApi;
