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
        url: 'api/userdefinedform/UpdateTableData',
        method: 'post',
        data: query
    });
};
//删除修改
export const DeleteTableDataInfo = (id,tableName) => {
    return request({
        url: 'api/userdefinedform/DeleteTableDataInfo?tableID='+id+'&tableName='+tableName,
        method: 'delete',
    });
};



// 工作流相关api  start

//保存工作流表单
export const CreateProcessInfo = query => {
    return request({
        url: 'api/userdefinedflow/CreateProcessInfo',
        method: 'post',
        data: query
    });
};

// 获取工作流列表数据
export const GetProcessList = query => {
    return request({
        url: 'api/userdefinedflow/GetProcessList',
        method: 'post',
        data: query
    });
};
// 编辑工作流表单
export const UpdateProcessInfo = query => {
    return request({
        url: 'api/userdefinedflow/UpdateProcessInfo',
        method: 'post',
        data: query
    });
};
//删除
export const DeleteProcessInfo = (id) => {
    return request({
        url: 'api/userdefinedflow/DeleteProcessInfo?processID='+id,
        method: 'delete',
    });
};

//保存工作流程
export const SaveProcessXml = query => {
    return request({
        url: 'api/userdefinedflow/SaveProcessXml',
        method: 'post',
        data: query
    });
};

export const QueryProcessXml = id => {
    return request({
        url: 'api/userdefinedflow/QueryProcessXml?ID='+id,
        method: 'get',
    })
}
// 工作流相关api  end

// 工作流发起
export const SaveFlowFormRelationInfo = query => {
     return request({
        url: 'api/userdefinedflow/SaveFlowFormRelationInfo',
        method: 'post',
        data: query
    });
}
export const GetFlowFormRelationList = query => {
    return request({
        url: 'api/userdefinedflow/GetFlowFormRelationList',
        method: 'post',
        data: query
     })
}
//发起流程
export const SaveProcessFlow = query => {
    return request({
        url: 'api/userdefinedflow/SaveProcessFlow',
        method: 'post',
        data: query
     })
}
// 获取发起记录
export const GetProcessFlowDataList = query => {
     return request({
        url: 'api/userdefinedflow/GetProcessFlowDataList?',
        method: 'post',
        data: query
     })
}
 
export const ApproveOperation = query => {
    return request({
           url: 'api/userdefinedflow/ApproveOperation?',
        method: 'post',
        data: query
     })
 }
