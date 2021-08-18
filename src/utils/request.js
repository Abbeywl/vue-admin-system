import axios from 'axios';

const request = axios.create({
    // process.env.NODE_ENV === 'development',// 来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了
    baseURL: 'http://47.103.110.240:8218/',
    headers: {'content-type': 'application/json'},
    // baseURL: 'api​', // api 的 base_url,
    timeout: 5000,
});

request.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

request.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return response.data;
        } else {
            Promise.reject();
        }
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

export default request;
