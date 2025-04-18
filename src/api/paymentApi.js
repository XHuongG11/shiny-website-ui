// src/api/paymentApi.js
import axiosClient from "./axiosClient";

const paymentApi = {
  createMomoPayment: (data) => {
    const url = '/payments/momo/create';
    return axiosClient.post(url, data);
},
  checkPaymentStatus: (orderId) => {
    const url = `/payments/status/${orderId}`;
    return axiosClient.get(url);
},
// Có thể thêm các phương thức thanh toán khác ở đây
};

export default paymentApi;
