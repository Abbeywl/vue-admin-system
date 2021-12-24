<template>
    <div class="main">
        <a-row v-show="!isShow">
            <a-col :span="18" class="btn_group">
                <!-- <a-button @click="showModal" type="primary"> 新增 </a-button> -->
            </a-col>

            <a-col :span="6" class="search">
                <a-input-search placeholder="搜索" style="width: 200px" @search="onSearch" />
            </a-col>
        </a-row>
        <a-row v-show="!isShow">
            <a-table :columns="columns" :data-source="data" rowKey="ID">
                <template slot="action" slot-scope="record" class="oprea">
                    <!-- <a class="" @click="operationEdit(record)">添加到菜单</a>
                    <a-divider type="vertical" /> -->
                    <a class="" @click="operationDelete(record)">删除</a>
                    <a-divider type="vertical" />
                    <!-- <a class="" @click="operationCreateOrRead(record, true)" v-show="!record.XmlContent">创建流程</a>
                    <a-divider type="vertical" v-show="!record.XmlContent" />
                    <a class="" @click="operationCreateOrRead(record, false)" v-show="record.XmlContent">查看流程</a>
                    <a-divider type="vertical" v-show="record.XmlContent" /> -->
                    <a class="" @click="operationSend(record)">发起流程</a>
                    <a-divider type="vertical" />
                    <a class="" @click="operationHistory(record)">发起记录</a>
                </template>
            </a-table>
        </a-row>
        <a-modal
            :title="type == 'add' ? '添加' : type == 'edit' ? '编辑' : type == 'history' ? '发起记录' : '发起'"
            :visible="visible"
            :confirm-loading="confirmLoading"
            @cancel="handleCancel"
            :width="modalwidth"
            :dialog-style="{ top: '20px' }"
        >
            <template slot="footer">
                <a-button key="back" @click="handleCancel"> 取消 </a-button>
                <a-button type="primary" :loading="confirmLoading" @click="nextStep"> 查看流程 </a-button>
                <a-button key="submit" type="primary" :loading="confirmLoading" @click="handleOk"> 保存 </a-button>
            </template>
            <k-form-build :value="jsonData" ref="kfb" v-show="visible && type != 'history'" :dynamicData="dynamicData" />
            <!-- <a-row v-show="visible && type != 'add'"> 提示：发起流程之后，修改流程模板不影响当前发起流程。 </a-row> -->
            <div v-show="isflowShow" style="position: relative; height: 60vh" class="sss">
                <workflow :data.sync="flowData" :title="ProcessTitle" @ok="flowSave" :titleIsShow="false" />
            </div>
            <a-table
                v-show="type == 'history'"
                :columns="historyColumns"
                :data-source="historyData"
                :rowKey="
                    (record, index) => {
                        return index;
                    }
                "
            >
                <template slot="detailAction" slot-scope="record" class="oprea">
                    <a class="" @click="operation('edit', record)">编辑</a>
                    <a-divider type="vertical" />
                    <a class="" @click="operation('delete', record)">删除</a>
                    <a-divider type="vertical" />
                    <a class="" @click="operation('approve', record)">审批</a>
                    <a-divider type="vertical" />
                    <a class="" @click="operation('return', record)">撤回</a>
                    <a-divider type="vertical" />
                    <a class="" @click="operation('read', record)">查看流程</a>
                </template>
            </a-table>
        </a-modal>

        <div v-show="isShow">
            <workflow :data.sync="flowData" :title="ProcessTitle" @ok="flowSave" />
        </div>
    </div>
</template>

<script>
import workflow from '../../components/workflow-ui/src/components/Generator/Main.vue';
import '../../components/workflow-ui/src/assets/style.css';
import formJson from './form.json';
import {
    GetFlowFormRelationList,
    CreateProcessInfo,
    SaveProcessXml,
    UpdateProcessInfo,
    DeleteProcessInfo,
    SaveProcessFlow,
    GetProcessFlowDataList
} from '@/api/index.js';
var columns = [
    {
        title: '业务名称',
        dataIndex: 'Name',
        key: 'Name'
    },
    { title: '创建人', dataIndex: 'CreatorName', key: 'CreatorName' },
    {
        title: '工作流',
        dataIndex: 'ProcessName',
        key: 'ProcessName'
    },
    {
        title: '表单',
        dataIndex: 'MenuName',
        key: 'MenuName'
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
            modalwidth: 520,
            data: [],
            columns,
            visible: false,
            confirmLoading: false,
            type: '',
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
            tableParams: {
                IsPaging: true,
                PageIndex: 0,
                PageSize: 20
            },
            TableRow: {},
            isShow: false,
            isflowShow: false,
            flowData: {},
            ProcessTitle: '',
            // 动态数据
            dynamicData: { formData: [] },
            // 发起记录
            historyColumns: [],
            historyData: []
        };
    },
    computed: {},
    watch: {},
    methods: {
        GetFormListFn() {
            GetFlowFormRelationList(this.tableParams)
                .then((res) => {
                    this.data = res;
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        onSearch() {},

        operationSend(row) {
            this.type = 'send';
            this.TableRow = row;
            let { FormXml, XmlContent } = row;
            this.visible = !this.visible;
            this.jsonData = JSON.parse(FormXml);
            this.flowData = JSON.parse(XmlContent);
            console.log(1);
        },
        operationEdit(row) {
            this.type = 'edit';
            this.TableRow = row;
            let { ID, ProcessName, ProcessStatus, Description } = row;
            let obj = { processName: ProcessName, processStatus: ProcessStatus, description: Description };
            this.$nextTick(function () {
                this.$refs.kfb.form.setFieldsValue(obj);
            });

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
        operationHistory(row) {
            this.type = 'history';
            this.TableRow = row;
            let { ID, TableName } = row;
            this.visible = !this.visible;

            let obj = {
                TableName: TableName,
                RelationID: ID,
                IsPaging: true,
                PageIndex: 1,
                PageSize: 20
            };
            this.GetTableDataListFn(row, obj);
        },
        //表单发起点击
        // operationCreateOrRead(row, isRead) {
        //     this.TableRow = row;
        //     let ProcessName = row.ProcessName;
        //     this.ProcessTitle = ProcessName;
        //     let { ID } = row;
        //     this.flowData = {};
        //     if (!isRead) {
        //         QueryProcessXml(ID).then((res) => {
        //             if (res.XmlContent) {
        //                 this.$nextTick(function () {
        //                     this.flowData = JSON.parse(res.XmlContent);
        //                 });
        //                 this.isShow = true;
        //                 return;
        //             }
        //         });
        //     }
        //     this.flowData = {
        //         //   title: ProcessName,
        //         node: defaultData
        //     };
        //     this.isShow = true;
        // },
        showModal() {
            this.type = 'add';
            this.visible = !this.visible;
        },
        nextStep() {
            this.type = 'send';
            this.modalwidth = '80vw';
            this.isflowShow = !this.isflowShow;
        },
        handleOk() {
            this.$refs.kfb
                .getData()
                .then((res) => {
                    this.confirmLoading = true;
                    this.visible = false;
                    let { ID, TableName, XmlContent } = this.TableRow;
                    let obj = {
                        TableJson: JSON.stringify(res),
                        TableName: TableName,
                        TableID: 0,
                        XmlContent: XmlContent,
                        FlowFormRelationID: ID
                    };
                    setTimeout(() => {
                        this.confirmLoading = false;
                    }, 300);
                    switch (this.type) {
                        case 'add':
                            this.SaveTableDataFn(res);
                            break;
                        case 'edit':
                            this.UpdateTableDataInfoFn(res);
                            break;
                        case 'send':
                            this.SaveProcessFlowFn(obj);
                        default:
                            break;
                    }
                })
                .catch((values) => {
                    console.log('验证未通过', values);
                });
        },
        SaveProcessFlowFn(formJson) {
            SaveProcessFlow(formJson).then((res) => {
                this.$message.success('保存成功');
                // this.GetFormListFn();
            });
        },
        handleCancel() {
            this.visible = false;
            this.modalwidth = '520px';
            this.isflowShow = false;
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
            let xmlContent = JSON.stringify(data);
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
        },
        GetTableDataListFn(row, tableName) {
            let { TableJson } = row;
            GetProcessFlowDataList(tableName).then((res) => {
                console.log(res);
                let columnsArr = [];

                let column = JSON.parse(TableJson);
                for (var i in column) {
                    let obj = {};
                    obj.title = i;
                    obj.dataIndex = column[i];
                    obj.key = column[i];
                    columnsArr.push(obj);
                }
                let opera = {
                    title: '操作',
                    key: 'operation',

                    scopedSlots: { customRender: 'detailAction' }
                };
                columnsArr.push(opera);
                this.historyColumns = columnsArr;
                this.historyData = res;
            });
        },
        operation(type, row) {
            switch (type) {
                case 'edit':
                    break;
                case 'delete':
                    break;
                case 'approve':
                    break;
                case 'return':
                    break;
                default:
                    break;
            }
        }
    },
    created() {},
    mounted() {
        this.GetFormListFn();
    }
};
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
</style>