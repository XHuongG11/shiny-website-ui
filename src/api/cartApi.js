import axiosClient from './axiosClient';

const CartApi = {
  /**
   * Lấy thông tin giỏ hàng của người dùng hiện tại
   * @returns {Promise<CartResponse>} Thông tin giỏ hàng
   */
  getMyCart: ({ params = {} }) => {
    const url = '/carts/my-cart';
    return axiosClient.get(url ,{ params });
  },

  /**
   * Thêm một sản phẩm vào giỏ hàng
   * @param {number} productSizeId - ID của size sản phẩm
   * @param {number} quantity - Số lượng sản phẩm cần thêm
   * @returns {Promise<ApiResponse>} Kết quả thêm sản phẩm
   */
  addItemToCart: (productSizeId, quantity) => {
    const url = '/carts/add';
    return axiosClient.post(url, null, {
      params: {
        productSizeId,
        quantity
      }
    });
  },

  /**
   * Xóa một sản phẩm khỏi giỏ hàng
   * @param {number} productSizeId - ID của size sản phẩm cần xóa
   * @returns {Promise<ApiResponse>} Kết quả xóa sản phẩm
   */
  removeItemFromCart: (productSizeId) => {
    const url = '/carts/remove';
    return axiosClient.delete(url, {
      params: {
        productSizeId
      }
    });
  },

  /**
   * Cập nhật số lượng sản phẩm trong giỏ hàng
   * @param {number} productSizeId - ID của size sản phẩm
   * @param {number} quantity - Số lượng mới
   * @returns {Promise<ApiResponse>} Kết quả cập nhật số lượng
   */
  updateItemQuantity: (productSizeId, quantity) => {
    const url = '/carts/update';
    return axiosClient.put(url, null, {
      params: {
        productSizeId,
        quantity
      }
    });
  },

  /**
   * Thay đổi size của sản phẩm trong giỏ hàng
   * @param {number} oldProductSize - ID của size sản phẩm hiện tại
   * @param {number} newProductSize - ID của size sản phẩm mới
   * @returns {Promise<ApiResponse>} Kết quả thay đổi size
   */
  changeSize: (oldProductSize, newProductSize) => {
    const url = '/carts/change-size';
    return axiosClient.put(url, null, {
      params: {
        oldProductSize,
        newProductSize
      }
    });
  },

  /**
   * Xóa toàn bộ giỏ hàng
   * @returns {Promise<ApiResponse>} Kết quả xóa giỏ hàng
   */
  clearMyCart: () => {
    const url = '/carts/clear';
    return axiosClient.delete(url);
  }
};

export default CartApi;