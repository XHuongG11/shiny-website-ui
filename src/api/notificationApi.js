import axiosClient from "./axiosClient";

const notificationApi = {
  /**
   * Lấy danh sách thông báo của khách hàng
   * @param {number} customerId - ID của khách hàng
   * @param {number} page - Số trang
   * @param {number} size - Số lượng thông báo mỗi trang
   * @returns {Promise<ApiResponse>} Danh sách thông báo
   */
  getCustomerNotifications: async (customerId, page = 1, size = 10) => {
    const url = `/notifications/customer/${customerId}`;
    const response = await axiosClient.get(url, { params: { page, size } });
    // console.log("API Response:", response); // In ra console dữ liệu trả về
    return response;
  },
};

export default notificationApi;