import axiosClient from "./axiosClient";
import qs from 'qs';

const productApi = {
  getAllProducts({ params = {} }) {
    const url = `/products/all`;
    return axiosClient.get(url, { params });
  },

  getProductsByCategory(categoryId, page = 1, size = 1) {
    const url = `/products/category/${categoryId}`;
    return axiosClient.get(url, {
      params: { page, size },
    });
  },

  searchAndFilterProducts({ params = {} }) {
    const url = `/products/search-and-filter`;
    return axiosClient.get(url, {
        params,
        paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
      });
  },
  getProductById(id) {
    const url = `/products/${id}`;
    return axiosClient.get(url);
  },
};

export default productApi;