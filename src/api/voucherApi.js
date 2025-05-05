import axiosClient from "./axiosClient";

const voucherApi = {
  // Lấy tất cả các voucher
  getAllVouchers() {
    const url = `/vouchers/all`;
    return axiosClient.get(url);
  },

  // Tìm kiếm voucher theo từ khóa
  searchVouchers(query) {
    const url = `/vouchers/search`;
    return axiosClient.get(url, { params: { query } });
  },

  // Lấy các voucher hợp lệ
  getValidVouchers({data, page, size}) {
    const url = `/vouchers/valid-for-order`;
    return axiosClient.post(url, data, {params: {page, size},});
  },  

  // Lấy voucher theo loại
  getVoucherByType(type) {
    const url = `/vouchers/type`;
    return axiosClient.get(url, { params: { type } });
  },

  // Lấy voucher theo mã
  getVoucherByCode(code) {
    const url = `/vouchers/code`;
    return axiosClient.get(url, { params: { code } });
  },

  // Lấy voucher theo id
  getVoucherById(id) {
    const url = `/vouchers/${id}`;
    return axiosClient.get(url);
  },

  // Kiểm tra và xác thực voucher
  validateVoucher(data) {
    const url = `/vouchers/check-validate`;
    return axiosClient.post(url, data);
  },

  // Thêm voucher mới
  addVoucher(data) {
    const url = `/vouchers/add`;
    return axiosClient.post(url, data);
  },

  // Cập nhật thông tin voucher
  updateVoucher(id, data) {
    const url = `/vouchers/${id}`;
    return axiosClient.put(url, data);
  },

  // Xóa voucher theo id
  deleteVoucher(id) {
    const url = `/vouchers/${id}`;
    return axiosClient.delete(url);
  },
};

export default voucherApi;
