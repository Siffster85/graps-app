import axios from "axios";

const url = process.env.REACT_APP_BACKEND_BASE_URL

const axiosInstance = axios.create({
    baseURL: url,
    withCredentials: true,
});

export default axiosInstance;