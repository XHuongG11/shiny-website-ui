import axiosClient from "./axiosClient";

const orderApi = {
  getOrder(id) {
    return new Promise((resolve, reject) => {
      axiosClient.get(`/orders/${id}`)
        .then(response => {
          if (response && response.code === "1000") {
            window.location.href = "/error/404";
            return;
          }
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
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

  placeOrder(orderRequest) {
    return axiosClient.post('/orders/place', orderRequest);
  },
  getEstimateShippingFee(address, method) {
    return axiosClient.post('/orders/shipping-fee', address, {
      params: { method }
    });
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
