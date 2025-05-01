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
    return response;
  },

  /**
   * Đánh dấu trạng thái đã xem hoặc chưa xem cho một thông báo
   * @param {number} notificationId - ID của thông báo
   * @returns {Promise<ApiResponse>} Kết quả cập nhật trạng thái
   */
  toggleReadStatus: async (notificationId) => {
    const url = `/notifications/mark-as-read/${notificationId}`;
    return axiosClient.put(url);
  },

  /**
   * Đánh dấu tất cả thông báo là đã xem cho một khách hàng
   * @param {number} customerId - ID của khách hàng
   * @returns {Promise<ApiResponse>} Kết quả cập nhật trạng thái
   */
  markAllAsRead: async (customerId) => {
    const url = `/notifications/mark-as-read-all/customer/${customerId}`;
    return axiosClient.put(url);
  },

  /**
   * Xóa một thông báo
   * @param {number} notificationId - ID của thông báo
   * @returns {Promise<ApiResponse>} Kết quả xóa thông báo
   */
  deleteNotification: async (notificationId) => {
    const url = `/notifications/delete/${notificationId}`;
    return axiosClient.delete(url);
  },

  /**
   * Xóa tất cả thông báo của một khách hàng
   * @param {number} customerId - ID của khách hàng
   * @returns {Promise<ApiResponse>} Kết quả xóa tất cả thông báo
   */
  deleteAllNotifications: async (customerId) => {
    const url = `/notifications/delete-all/customer/${customerId}`;
    return axiosClient.delete(url);
  },
};

export default notificationApi;