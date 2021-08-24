import axios from 'axios';
import Qs from 'qs';
const request = axios.create({
    // process.env.NODE_ENV === 'development',// 来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了
    baseURL: 'http://localhost:8080/',
    headers: {'Content-Type': 'application/json;charset=UTF-8'},
    // baseURL: 'api​', // api 的 base_url,
    timeout: 5000,
});

// request.interceptors.request.use(
//     config => {
//         if (config.data.form) {
//             config.transformRequest=[function (data) {              
//                 delete data.form;
//                 var formData = Qs.stringify(data);
//                 return formData;
//             }];
//            config.headers['Content-Type'] ='application/x-www-form-urlencoded;charset=UTF-8'
//         }
//         return config;
//     },
//     error => {
//         console.log(error);
//         return Promise.reject();
//     }
// );

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
