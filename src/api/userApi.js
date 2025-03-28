import axiosClient from "./axiosClient";

const userApi = {
  login(data) {
    const url = `/auth/token?role=customer`;
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
};
export default userApi;
