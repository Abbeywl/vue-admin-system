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

//查看表单记录
export const GetTableDataList = query => {
    return request({
        url: 'api/userdefinedform/GetTableDataList',
        method: 'post',
        data: query
    });
};

//记录修改
export const UpdateTableDataInfo = query => {
    return request({
        url: 'api/userdefinedform/UpdateTableDataInfo',
        method: 'post',
        data: query
    });
};
//删除修改
export const DeleteTableDataInfo = (id) => {
    return request({
        url: 'api/userdefinedform/DeleteTableDataInfo?tableID='+id,
        method: 'delete',
    });
};