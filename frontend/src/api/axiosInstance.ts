import axios from "axios";

const backend_url = process.env.REACT_APP_BACKEND_BASE_URL

const axiosInstance = axios.create({
    baseURL: backend_url,
    withCredentials: true,
});

export default axiosInstance;