import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://kfh-stock-api.onrender.com/api"

const api = axios.create({
    baseURL : BASE_URL,
    withCredentials : true
});

export default api