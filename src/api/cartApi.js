import axiosClient from './axiosClient';

const cartApi = {
  // Lấy tất cả sản phẩm trong giỏ hàng của người dùng
  getCartItems: () => {
    return axiosClient.get('/cart');
  },
  
  // Thêm sản phẩm vào giỏ hàng
  addToCart: (productData) => {
    return axiosClient.post('/cart', productData);
  },
  
  // Cập nhật số lượng sản phẩm trong giỏ hàng
  updateCartItem: (productId, quantity) => {
    return axiosClient.put(`/cart/${productId}`, { quantity });
  },
  
  // Xóa sản phẩm khỏi giỏ hàng
  removeFromCart: (productId) => {
    return axiosClient.delete(`/cart/${productId}`);
  },
  
  // Lấy tổng số lượng sản phẩm trong giỏ hàng
  getCartCount: () => {
    return axiosClient.get('/cart/count');
  },
  
  // Save cart to local storage for offline use
  saveCartToLocalStorage: (cartItems) => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  },
  
  // Get cart from local storage when offline
  getCartFromLocalStorage: () => {
    const cartItems = localStorage.getItem('cartItems');
    return cartItems ? JSON.parse(cartItems) : [];
  }
};

export default cartApi;