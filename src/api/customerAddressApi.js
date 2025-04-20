import axiosClient from "./axiosClient";

const customerAddressApi = {
    getAddressById(id) {
        return axiosClient.get(`addresses/${id}`);
    },
    getCustomerAddresses(page = 1, size = 10) {
        return axiosClient.get(`addresses/customer`, {
            params: { page, size },
        });
    },
    addAddress(addressRequest) {
        return axiosClient.post(`addresses/add`, addressRequest);
    },
    updateAddress(id, addressRequest) {
        return axiosClient.put(`addresses/update/${id}`, addressRequest);
    },
    setDefaultAddress(addressId) {
        return axiosClient.put(`addresses/setDefault/${addressId}`);
    },
    deleteAddress(id) {
        return axiosClient.delete(`addresses/delete/${id}`);
    },
};

export default customerAddressApi;
