import axios from 'axios';
import StorageKeys from "../containts/storage-key"

const axiosClient = axios.create({
    baseURL: 'http://localhost:8080/api/v1/',
    headers: {
        'Content-Type': 'application/json',
    },
})

const instance = axios.create();
instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem(StorageKeys.TOKEN)
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data.data;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});


export default axiosClient;