// src/api/paymentApi.js
import axiosClient from "./axiosClient";

const paymentApi = {
  createMomoPayment(orderId) {
    const url = `/payments/momo`;
    return axiosClient.post(url, null, {
      params: {
        orderId: orderId,
      },
    });
  },

};

export default paymentApi;
