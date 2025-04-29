import axiosClient from "./axiosClient";

const reviewApi = {
    
    addReviews(orderId, reviewData) {
        const url = `/reviews/add-review?orderId=${orderId}`;
        return axiosClient.post(url, reviewData);
      },
    
    getReviewsByProduct(productId, page = 1, size = 10) {
        const url = `/reviews/${productId}`;
        return axiosClient.get(url, {
        params: { page, size },
        });
    },
};
export default reviewApi;