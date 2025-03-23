import axiosClient from "./axiosClient";

const userApi = {
    login(data) {
        const url = `/auth/token?role=customer`;
        return axiosClient.post(url, data)
    },

    get(id) {
        const url = `/users/customers/${id}`;
        return axiosClient.get(url);
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
export default userApi;