import axios from 'axios';
import { getToken } from './auth';

const api = axios.create({
    baseURL: 'http://localhost:3333'
})

api.interceptors.request.use(async config => {
    const token = getToken();

    if (token) {
        config.headers.Authorization = 'Bearer ' + token;
    }

    return config;
});

api.interceptors.response.use(async res => {
    if (res.status === 401) {
        alert('Sessão expirou')
        window.location = '/';
    }
    if (res.status === 200 && res.config.url === 'login')
        localStorage.setItem('token', res.data.token)
        
    return res;
});


export default api;