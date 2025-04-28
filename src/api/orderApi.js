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
  },
   // Gửi yêu cầu hoàn trả
   returnOrderItem(data) {
    const url = `/orders/return`; // Endpoint API
    return axiosClient.post(url, data);
  },

  // Tải lên hình ảnh chứng minh
  uploadReturnItemProof(itemId, files) {
    const url = `/orders/return/upload`; // Endpoint API
    const formData = new FormData();
    formData.append("itemId", itemId);
    files.forEach((file) => {
      formData.append("files", file);
    });

    return axiosClient.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default orderApi;
