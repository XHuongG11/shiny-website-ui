// src/api/orderApi.js

import axiosClient from "./axiosClient";

const orderApi = {
  getOrder(id) {
    return axiosClient.get(`/orders/${id}`);
  },

  getMyOrders(page = 1, size = 30) {
    return axiosClient.get(`/orders/my-orders`, {
      params: { page, size }
    });
  },

  getOrders(page = 1, size = 30) {
    return axiosClient.get(`/orders/all`, {
      params: { page, size }
    });
  },

  getEstimateShippingFee(address, method) {
    // address: { district, province }
    return axiosClient.get(`/orders/shipping-fee`, {
      params: { method },
      data: address // tuỳ backend, nếu không hỗ trợ GET with body, đổi sang POST
    });
  },

  placeOrder(orderRequest) {
    return axiosClient.post('/orders/place', orderRequest);
  },

  // ✅ API cập nhật trạng thái đơn hàng
  updateOrderStatus(id, status) {
    return axiosClient.put(`/orders/${id}/status`, null, {
      params: { status }
    });
  }
};

export default orderApi;
