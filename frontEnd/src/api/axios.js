import axios from "axios";

const CostumAxios = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: true,
});
CostumAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
export default CostumAxios;