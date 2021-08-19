import request from '../utils/request'
export const Login = query => {
    return request({
        url: '/Api/AppUser/AppUserLogin',
        method: 'post',
        data:query
    });
};
export const SaveFormTableInfo = query => {
    return request({
        url: 'api/userdefinedform/SaveFormTableInfo',
        method: 'post',
        data: query
    });
};
export const fetchData = query => {
    return request({
        url: 'api/Project/HasProject/',
        method: 'get',
        params: query
    });
};
