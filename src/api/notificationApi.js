import axiosClient from "./axiosClient";

const notificationApi = {

  /**
   * Lấy danh sách tất cả thông báo
   * @param {number} page - Số trang
   * @param {number} size - Số lượng thông báo mỗi trang
   * @returns {Promise<ApiResponse>} Danh sách thông báo
   */
  getAllNotifications: async (page = 1, size = 10) => {
    const url = `/notifications/all`;
    const response = await axiosClient.get(url, { params: { page, size } });
    return response;
  },

  /**
   * Lấy số lượng thông báo chưa xem
   * @returns {Promise<ApiResponse>} Số lượng thông báo chưa xem
   */
  getUnreadNotificationCount: async () => {
    const url = `/notifications/unread-count`;
    return axiosClient.get(url);
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
   * Đánh dấu trạng thái đã xem cho một thông báo
   * @param {number} notificationId - ID của thông báo
   * @returns {Promise<ApiResponse>} Kết quả cập nhật trạng thái
   */
  markAsRead: async (notificationId) => {
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
   * Đánh dấu tất cả thông báo là đã xem
   * @returns {Promise<ApiResponse>} Kết quả cập nhật trạng thái
   */
  markAllAsRead: async () => {
    const url = `/notifications/mark-as-read-all`;
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

  /**
   * Xóa tất cả thông báo
   * @returns {Promise<ApiResponse>} Kết quả xóa tất cả thông báo
   */
  deleteAllNotifications: async () => {
    const url = `/notifications/delete-all`;
    return axiosClient.delete(url);
  },
};

export default notificationApi;