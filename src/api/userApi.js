import axiosClient from "./axiosClient";

const userApi = {
  login(data) {
    const url = `/auth/login`;
    return axiosClient.post(url, data);
  },

  getInfo() {
    const url = `/users/my-info`;
    return axiosClient.get(url);
  },
  getAddresses() {
    const url = `/addresses/customer`;
    return axiosClient.get(url);
  },
  addAddress(data) {
    const url = `/addresses/add`;
    return axiosClient.post(url, data);
  },
  updateAddress(id, data) {
    const url = `/addresses/update/${id}`;
    return axiosClient.put(url, data);
  },
  setDefaultAddress(addressId) {
    const url = `/addresses/setDefault/${addressId}`;
    return axiosClient.put(url);
  },
  updateInfo(data) {
    const url = `/users/update`;
    return axiosClient.put(url, data);
  },
  add(data) {
    const url = `/users/add-customer`;
    return axiosClient.post(url, data);
  },
  registerForNews(isSubscribed) {
    const url = `/users/register-for-news?isSubscribed=${isSubscribed}`;
    return axiosClient.post(url);
  },
  addWishList(data) {
    const url = `/wishlist/add`;
    return axiosClient.post(url, data);
  },
  getWishList({ params = {} }) {
    const url = `/wishlist/customer`;
    return axiosClient.get(url, { params });
  },
  removeWishList(id) {
    const url = `/wishlist/delete/${id}`;
    return axiosClient.delete(url);
  },
};
export default userApi;
