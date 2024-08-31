import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'https://lol-web-api.op.gg/api/v1.0/internal/bypass'
})