import axiosClient from "./axiosClient";

const productApi = {

    getAllProducts({ params = {} }) {
        const url = `/products/all`;
        return axiosClient.get(url, { params });
    },
    add(data) {
        const url = `/users/add-customer`;
        return axiosClient.post(url, data);
    },
    update(data) {
        const url = `/users/update-customer`;
        return axiosClient.put(url, data);
    },
};
export default productApi;