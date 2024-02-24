
import axios from 'axios';
import Cookies from 'js-cookie';
import { showSnackbar } from '../utils/snackbar-utils';
import { BASE_URL } from '../utils/global';

const axiosClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})


axiosClient.interceptors.request.use(
    config=>{
        const accessToken = Cookies.get('accessToken');
        if(config.url==="/card-image" && config.method==="post"){
            config.headers['Content-Type'] = 'multipart/form-data';
        }
        if(accessToken){
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    error=>{
        Promise.reject(error)
    }
)

axiosClient.interceptors.response.use(
    response=>{
        const data = response.data["data"];
        const message = response.data["message"];

        if(message){
            showSnackbar(message, { variant: 'success' });
        }

        if(data?.token){
            Cookies.set('accessToken', data.token.accessToken);
            Cookies.set('refreshToken', data.token.refreshToken);
        }

        return data;
    },
    error=>{
        const originalRequest = error.config;
        if (
            error.response.status === 401 && originalRequest.url === `${BASE_URL}/accessToken`
        ) {
            window.location.href = 'https://bizcard-web.web.app/signin';
            return Promise.reject(error)
        }
        if(error.response.status === 401 && !originalRequest._retry){
            originalRequest._retry = true;
            const refreshToken = Cookies.get('refreshToken');
            axios.post('/accessToken', {refreshToken: refreshToken})
                .then(res=>{
                    if(res.status===200){
                        const data = res.data['data'];
                        Cookies.set('accessToken', data?.token.accessToken); 
                        Cookies.set('refreshToken', data?.token.refreshToken); 
                        axiosClient.defaults.headers.common['Authorization'] = `Bearer ${data?.token.accessToken}`;
                        return axios(originalRequest)
                    }
                })
        }
        return Promise.reject(error)
    }
)

export default axiosClient;