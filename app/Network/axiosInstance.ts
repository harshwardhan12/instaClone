import axios from 'axios';
import {config} from "@fortawesome/fontawesome-svg-core";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        return config;
    },
    (error) => {
        if (error.response) {
            console.error(`Request failed with status code: ${error.response.status}`);
        }
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    (response) => {
        response.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default axiosInstance;