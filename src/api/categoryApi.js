import axiosClient from "./axiosClient";

const categoryApi = {

    getAllCategories() {
        const url = `/categories/all`;
        return axiosClient.get(url);
    },
};
export default categoryApi;

