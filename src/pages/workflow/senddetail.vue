<template>
    <div class="" style="height: 100">
        <a-row>
            <a-col :span="18" class="btn_group">
                <a-button @click="AddFn" type="primary"> {{ type == 'add' ? '新增' : '返回' }} </a-button>
                <!-- <a-button @click="handleAdd" type=""> 导入EXCEL </a-button>
                <a-button @click="handleAdd" type=""> 下载模板 </a-button> -->
            </a-col>

            <a-col :span="6" class="search">
                <a-input-search placeholder="搜索" style="width: 200px" @search="onSearch" />
            </a-col>
        </a-row>
        <a-row>
            <a-table
                :columns="columns"
                :data-source="data"
                :rowKey="
                    (record, index) => {
                        return index;
                    }
                "
            >
                <template slot="action" slot-scope="record" class="oprea">
                    <a class="" @click="operationEdit(record)">编辑</a>
                    <a-divider type="vertical" />
                    <a class="" @click="operationDelete(record)">删除</a>
                    <a-divider type="vertical" />
                    <a class="" @click="operationApprove(record)">审批</a>
                    <a-divider type="vertical" />
                    <a class="" @click="operationReturn(record)">撤回</a>
                    <a-divider type="vertical" />
                    <a class="" @click="operationRead(record)">查看流程</a>
                </template>
            </a-table>
        </a-row>
    </div>
</template>

<script>
import formJson from './form.json';
import '@/components/k-form-design/styles/form-design.less';
import { GetProcessFlowDataList, DeleteFormInfo, SaveTableData, UpdateTableDataInfo, SaveFormTableInfo } from '@/api/index.js';
const pinyin = require('js-pinyin');
var columns = [
    {
        title: '表单名称',
        dataIndex: 'MenuName',
        key: 'MenuName'
    },
    { title: '创建人', dataIndex: 'CreatorName', key: 'CreatorName' },
    {
        title: '操作',
        key: 'operation',
        scopedSlots: { customRender: 'action' }
    }
];

export default {
    components: {},
    data() {
        return {
            type: '',
            jsonData: {},
            data: [],
            columns,
            visible: false,
            confirmLoading: false,
            TableRow: {}
        };
    },
    computed: {},
    watch: {},
    methods: {
        AddFn() {
            this.type('add');
            alert(this.type);
        },
        GetFormListFn() {
            let tableParams = {
                IsPaging: true,
                PageIndex: 1,
                PageSize: 20,
                RelationID: 3,
                TableName: 'WT_20211224'
            };
            GetProcessFlowDataList(tableParams).then((res) => {
                this.data = res;
            });
        },
        onSearch() {},
        handleAdd() {
            console.log(1);
        },
        operationEdit(row) {
            this.type = 'edit';
            this.TableRow = row;
            let { ID } = row;
            this.visible = !this.visible;
        },
        operationApprove(row) {
            this.TableRow = row;
            this.type = 'approve';
        },
        operationReturn(row) {
            this.TableRow = row;
            this.type = 'return';
        },
        operationDelete(row) {
            this.TableRow = row;
            let { ID } = row;
            let _selt = this;
            this.$confirm({
                title: '提示',
                content: '确认删除？',
                okText: '确认',
                cancelText: '取消',
                onOk() {
                    DeleteFormInfo(ID).then((res) => {
                        _selt.$message.success('删除成功');
                        _selt.GetFormListFn();
                    });
                }
            });
        },

        //表单发起点击
        operationRead(row) {
            this.TableRow = row;
            this.type = 'read';
        },
        handleOk() {
            this.$refs.kfBulid
                .getData()
                .then((res) => {
                    let { TableName, FormXml } = this.TableRow;
                    this.confirmLoading = true;
                    this.visible = false;
                    this.confirmLoading = false;
                    let data = { TableJson: JSON.stringify(res), TableName: TableName, FormXml, FormXml };
                    let update = { TableID: this.detailId, TableJson: JSON.stringify(res), TableName: TableName };
                    console.log(update);
                    switch (this.type) {
                        case 'add':
                            this.SaveTableDataFn(data);
                            break;
                        case 'edit':
                            UpdateTableDataInfo(update).then((res) => {
                                this.$message.success('编辑成功');
                            });
                            break;
                        default:
                            alert(this.type);
                            break;
                    }
                })
                .catch((values) => {
                    console.log('验证未通过', values);
                });
        },
        handleCancel() {
            this.visible = false;
            this.$refs.kfBulid.reset();
        },
        SaveTableDataFn(formJson) {
            SaveTableData(formJson).then((res) => {
                this.$message.success('发起成功');
            });
        }
    },
    mounted() {
        this.GetFormListFn();
    }
};
</script>
<style lang='less' scoped>
@background_color: #0f99a2;
.btn_group {
    margin-bottom: 16px;
    button {
        margin-right: 12px;
    }
}
.search {
    display: flex;
    flex-direction: row-reverse;
}
/deep/ .ant-table-body {
    overflow-x: auto;
}
.tag {
    span {
        width: 52px;
        text-align: center;
        line-height: 26px;
        color: #fff;
        background: @background_color;
    }
    .invalid {
        color: @background_color;
        background: none;
        border: 1px solid @background_color;
    }
}

//@import url(); 引入公共css类
</style>