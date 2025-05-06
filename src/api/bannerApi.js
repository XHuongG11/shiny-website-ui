import axiosClient from "./axiosClient";

const bannerApi = {
    // Lấy danh sách banner theo vị trí
    getBannersByPosition(position) {
        const url = `/banners/position?position=${position}`;
        return axiosClient.get(url);
    },

    // Lấy tất cả banners (yêu cầu quyền MANAGER)
    getAllBanners() {
        const url = `/banners/all`;
        return axiosClient.get(url);
    },
};

export default bannerApi;