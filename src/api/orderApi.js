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
      data: address // axios allows GET with data in some setups, else use POST if backend supports
    });
  },

  placeOrder(orderRequest) {
    return axiosClient.post('/orders/place', orderRequest);
  },

  updateOrderStatus(id, status) {
    return axiosClient.put(`/orders/${id}/status`, null, {
      params: { status }
    });
  }
};

export default orderApi;