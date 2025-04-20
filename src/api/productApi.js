import axiosClient from "./axiosClient";

const productApi = {
  getAllProducts({ params = {} }) {
    const url = `/products/all`;
    return axiosClient.get(url, { params });
  },

  getProductsByCategory(categoryId, page = 1, size = 1) {
    const url = `/category/${categoryId}`;
    return axiosClient.get(url, {
      params: { page, size },
    });
  },
};

export default productApi;