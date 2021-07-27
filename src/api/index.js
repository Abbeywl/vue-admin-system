import request from '../utils/request';

export const Login = query => {
    return request({
        url: '/Api/AppUser/AppUserLogin',
        method: 'post',
        data:query
    });
};
export const testApi = query => {
    return request({
        url: '/Api/AppUser/GetUserSubmitStatistics',
        method: 'get',
        params: query
    });
};
export const fetchData = query => {
    return request({
        url: 'api/Project/HasProject/',
        method: 'get',
        params: query
    });
};
