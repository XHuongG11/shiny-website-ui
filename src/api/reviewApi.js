import axiosClient from "./axiosClient";

const reviewApi = {
    addReviews(data) {
        const url = `/reviews/add-review`;
        return axiosClient.post(url,data);
    },
    
    getReviewsByProduct(productId, page = 1, size = 10) {
        const url = `/reviews/${productId}`;
        return axiosClient.get(url, {
        params: { page, size },
        });
    },
};
export default reviewApi;