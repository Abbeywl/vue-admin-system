<template>
    <div class="main">
        <a-row v-show="!isShow">
            <a-col :span="18" class="btn_group">
                <a-button @click="showModal" type="primary"> 新增 </a-button>
                <a-button @click="handleAdd" type=""> 导入EXCEL </a-button>
                <a-button @click="handleAdd" type=""> 下载模板 </a-button>
            </a-col>

            <a-col :span="6" class="search">
                <a-input-search placeholder="搜索" style="width: 200px" @search="onSearch" />
            </a-col>
        </a-row>
        <a-row v-show="!isShow">
            <a-table :columns="columns" :data-source="data" rowKey="ID">
                <template slot="action" slot-scope="record" class="oprea">
                    <a class="" @click="operationEdit(record)">编辑</a>
                    <a-divider type="vertical" />
                    <a class="" @click="operationDelete(record)">删除</a>
                    <a-divider type="vertical" />
                    <a class="" @click="operationCreateOrRead(record, true)" v-show="!record.XmlContent">创建流程</a>
                    <a-divider type="vertical" v-show="!record.XmlContent" />
                    <a class="" @click="operationCreateOrRead(record, false)" v-show="record.XmlContent">查看流程</a>
                    <a-divider type="vertical" v-show="record.XmlContent" />
                    <a class="" @click="operationSend(record)">发起</a>
                    <!-- <a-divider type="vertical" v-show="record.XmlContent" />
                    <a class="" @click="operationHistory(record)">历史记录</a> -->
                </template>
                <template slot="status" slot-scope="record" class="oprea">
                    <a-tag :color="record == 'InUse' ? 'cyan' : ''"> {{ record == 'InUse' ? '使用中' : '草稿' }} </a-tag>
                </template>
            </a-table>
        </a-row>
        <a-modal
            :title="type == 'add' ? '添加' : type == 'edit' ? '编辑' : '发起'"
            :visible="visible"
            :confirm-loading="confirmLoading"
            @ok="handleOk"
            @cancel="handleCancel"
            ok-text="保存"
            cancel-text="取消"
        >
            <k-form-build :value="jsonData" ref="kfb" v-show="isForm" :dynamicData="dynamicData" />
        </a-modal>
        <div v-show="isShow">
            <workflow :data.sync="flowData" :title="ProcessTitle" @ok="flowSave" />
            <!-- <workflow1 :data.sync="flowData" :title="ProcessTitle" @ok="flowSave" /> -->
        </div>
    </div>
</template>

<script>
import workflow from '../../components/workflow-ui/src/components/Generator/Main.vue';
import workflow1 from './index.vue';
import '../../components/workflow-ui/src/assets/style.css';
import formJson from './form.json';
import sendform from './sendform.json';
import {
    GetProcessList,
    QueryProcessXml,
    CreateProcessInfo,
    SaveProcessXml,
    UpdateProcessInfo,
    DeleteProcessInfo,
    GetFormList,
    SaveFlowFormRelationInfo
} from '@/api/index.js';
const data = [];
var columns = [
    {
        title: '表单名称',
        dataIndex: 'ProcessName',
        key: 'ProcessName'
    },
    { title: '创建人', dataIndex: 'CreatorName', key: 'CreatorName' },
    {
        title: '状态',
        dataIndex: 'ProcessStatus',
        key: 'ProcessStatus',
        scopedSlots: { customRender: 'status' }
    },
    {
        title: '描述',
        dataIndex: 'Description',
        key: 'Description'
    },
    {
        title: '操作',
        key: 'operation',
        scopedSlots: { customRender: 'action' }
    }
];
const defaultData = {
    name: '发起人',
    type: 'start',
    nodeId: 'sid-startevent',
    properties: {
        name: '所有人'
    }
};
export default {
    components: { workflow },
    data() {
        return {
            jsonData: formJson,
            data,
            columns,
            visible: false,
            isForm: true,
            confirmLoading: false,
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
            tableParams: {
                IsPaging: true,
                PageIndex: 0,
                PageSize: 20
            },
            TableRow: {},
            isShow: false,
            flowData: {
                title: '请假',
                node: {
                    name: '发起人',
                    type: 'start',
                    nodeId: 'sid-startevent',
                    properties: {
                        name: '所有人'
                    }
                }
            },
            ProcessTitle: '',
            dynamicData: { formData: [] },
            type: ''
        };
    },
    computed: {},
    watch: {
        flowData: {
            handler(val) {
                console.log('=====sss===============', val);
            },
            deep: true
        }
    },
    methods: {
        GetFormListFn() {
            GetProcessList(this.tableParams).then((res) => {
                this.data = res;
            });
        },
        onSearch() {},

        handleAdd() {
            console.log(1);
        },
        operationEdit(row) {
            this.type = 'edit';
            this.jsonData = formJson;
            this.TableRow = row;
            let { ID, ProcessName, ProcessStatus, Description } = row;
            let obj = { processName: ProcessName, processStatus: ProcessStatus, description: Description };
            this.$nextTick(function () {
                this.$refs.kfb.form.setFieldsValue(obj);
            });

            this.visible = !this.visible;
        },
        //工作流 发送
        operationSend(row) {
            this.type = 'send';
            this.jsonData = sendform;
            this.TableRow = row;
            let { ID, ProcessName, ProcessStatus, Description } = row;
            // let obj = { processName: ProcessName, processStatus: ProcessStatus, description: Description };
            // this.$nextTick(function () {
            //     this.$refs.kfb.form.setFieldsValue(obj);
            // });

            this.visible = !this.visible;
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
                    DeleteProcessInfo(ID).then((res) => {
                        _selt.$message.success('删除成功');
                        _selt.GetFormListFn();
                    });
                }
            });
        },
        // operationHistory(row) {
        //     this.isForm = false;
        //     this.TableRow = row;
        //     this.visible = !this.visible;
        //     this.GetTableDataListFn(row.TableName);
        // },
        //表单发起点击
        operationCreateOrRead(row, isRead) {
            this.TableRow = row;
            let ProcessName = row.ProcessName;
            this.ProcessTitle = ProcessName;
            let { ID } = row;
            // this.flowData = {};
            if (!isRead) {
                QueryProcessXml(ID).then((res) => {
                    if (res.XmlContent) {
                        this.$nextTick(function () {
                            this.flowData.node = JSON.parse(res.XmlContent);
                        });
                        this.isShow = true;
                        return;
                    }
                });
            }
            this.flowData.node = {
                name: '发起人',
                type: 'start',
                nodeId: 'sid-startevent',
                properties: {
                    name: '所有人'
                }
            };
            this.isShow = true;
        },
        showModal() {
            this.type = 'add';
            this.jsonData = formJson;
            this.visible = !this.visible;
        },
        handleOk() {
            this.$refs.kfb
                .getData()
                .then((res) => {
                    this.confirmLoading = true;
                    this.visible = false;
                    this.confirmLoading = false;
                    let { ID } = this.TableRow;
                    switch (this.type) {
                        case 'add':
                            this.SaveTableDataFn(res);
                            break;
                        case 'edit':
                            res.ID = ID;
                            this.UpdateTableDataInfoFn(res);
                            break;
                        default:
                            res.ProcessID = ID;
                            SaveFlowFormRelationInfo(res)
                                .then((res) => {
                                    this.$message.success('发起成功');
                                    this.GetFormListFn();
                                })
                                .catch((err) => {
                                    this.$$message.warning('err');
                                });
                            break;
                    }
                })
                .catch((values) => {
                    console.log('验证未通过', values);
                });
        },
        handleCancel() {
            this.visible = false;
            this.$refs.kfb.reset();
        },
        SaveTableDataFn(formJson) {
            CreateProcessInfo(formJson).then((res) => {
                this.$message.success('保存成功');
                this.GetFormListFn();
            });
        },
        UpdateTableDataInfoFn(formJson) {
            UpdateProcessInfo(formJson).then((res) => {
                this.$message.success('编辑成功');
                this.GetFormListFn();
            });
        },
        //工作流保存
        flowSave(data) {
            console.log(JSON.stringify(data));
            return;
            let xmlContent = JSON.stringify(data.node);
            let { ID } = this.TableRow;
            let formdata = { ID: ID, xmlContent: xmlContent };

            SaveProcessXml(formdata)
                .then((res) => {
                    console.log(res);
                    this.isShow = false;
                    this.$message.success('保存成功');
                    this.GetFormListFn();
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        closeFn() {
            this.isShow = false;
        }
    },
    created() {},
    mounted() {
        this.$bus.$emit('workFlowType', 'edit');
        this.GetFormListFn();
        let tabledata = {
            IsPaging: true,
            PageIndex: 0,
            PageSize: 999
        };
        //获取表单数据
        GetFormList(tabledata).then((res) => {
            let formArr = [];
            for (let item of res.rows) {
                let obj = {
                    label: item.MenuName,
                    value: item.ID
                };
                formArr.push(obj);
            }
            this.dynamicData.formData = formArr;
        });
    },
    beforeCreate() {},
    beforeMount() {},
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {},
    destroyed() {},
    activated() {}
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
.main {
    position: relative;
    height: 100%;
    width: 100%;
}
//@import url(); 引入公共css类
</style>