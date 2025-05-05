import axiosClient from "./axiosClient";

const privacyAndTermApi = {
  getPrivacyAndTerm() {
    return axiosClient.get(`privacy-and-terms/get`);
  },
};

export default privacyAndTermApi;
