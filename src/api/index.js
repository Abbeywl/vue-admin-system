import request from '../utils/request'
export const Login = query => {
    return request({
        url: '/Api/AppUser/AppUserLogin',
        method: 'post',
        data:query
    });
};
//保存绘制表单
export const SaveFormTableInfo = query => {
    return request({
        url: 'api/userdefinedform/SaveFormTableInfo',
        method: 'post',
        data: query
    });
};
// 获取表单列表数据
export const GetFormList = query => {
    return request({
        url: 'api/userdefinedform/GetFormList',
        method: 'post',
        data: query
    });
};

// 删除表单列表数据
export const DeleteFormInfo = query => {
    return request({
        url: 'api/userdefinedform/DeleteFormInfo?formID='+query,
        method: 'delete',
    });
};

//保存表单详情数据

export const SaveTableData = query => {
    return request({
        url: 'api/userdefinedform/SaveTableData',
        method: 'post',
        data: query
    });
};