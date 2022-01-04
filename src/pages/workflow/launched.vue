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
                    <a class="" @click="operationDelete(record)">删除</a>
                    <a-divider type="vertical" />
                    <a class="" @click="operationSendOrRead('read', record)">查看流程</a>
                    <a-divider type="vertical" />
                    <a class="" @click="operationSendOrRead('send', record)">发起流程</a>
                    <a-divider type="vertical" />
                    <a class="" @click="operationHistory(record)">发起记录</a>
                </template>
            </a-table>
        </a-row>
        <a-modal
            :title="type == 'add' ? '添加' : type == 'edit' ? '编辑' : type == 'history' ? '发起记录' : '发起流程'"
            :visible="visible"
            :confirm-loading="confirmLoading"
            @cancel="handleCancel"
            :width="modalwidth"
            :dialog-style="{ top: '20px' }"
        >
            <template slot="footer">
                <a-button key="back" @click="handleCancel"> 取消 </a-button>
                <!-- <a-button type="primary" :loading="confirmLoading" @click="nextStep"> 查看流程 </a-button> -->
                <!-- <a-button type="primary" v-show="type == 'historyEdit'" :loading="confirmLoading" @click="operationBtn('approve')">
                    审批
                </a-button>
                <a-button type="primary" v-show="type == 'historyEdit'" :loading="confirmLoading" @click="operationBtn('return')">
                    回退
                </a-button> -->
                <a-button
                    type="primary"
                    :loading="confirmLoading"
                    v-for="(item, i) of operationBtnArr"
                    :key="i"
                    @click="operationBtn(item)"
                    v-show="item == 'submit' || item == 'draft'"
                >
                    {{
                        item == 'submit' ? '提交' : item == 'draft' ? '草稿' : item == 'recall' ? '撤回' : item == 'urged' ? '催办' : '回退'
                    }}
                </a-button>
                <!-- <a-button key="submit" type="primary" :loading="confirmLoading" @click="handleOk"> 保存 </a-button> -->
            </template>
            <k-form-build :value="jsonData" ref="kfb" v-show="visible && type != 'history'" :dynamicData="dynamicData" />
            <div v-show="isflowShow" style="position: relative; height: 60vh">
                <workflow :data.sync="flowData" :title="ProcessTitle" @ok="flowSave" :workflowtype.sync="flowtype" />
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
                <template slot="approveAction" slot-scope="record" class="oprea">
                    <span v-if="record.NodeBtn">
                        <span v-for="(item, id) of record.NodeBtn.split(',')" :key="id">
                            <a class="" @click="operationBtn(item, record)">
                                {{
                                    item == 'submit'
                                        ? '提交'
                                        : item == 'draft'
                                        ? '草稿'
                                        : item == 'recall'
                                        ? '撤回'
                                        : item == 'urged'
                                        ? '催办'
                                        : '回退'
                                }}</a
                            >
                            <a-divider type="vertical" />
                        </span>
                    </span>
                </template>
                <template slot="detailAction" slot-scope="record" class="oprea">
                    <!-- <a class="" @click="operation('edit', record)">编辑</a>
                    <a-divider type="vertical" /> -->
                    <a class="" @click="operation('delete', record)">删除</a>
                    <a-divider type="vertical" />
                    <a class="" @click="operation('readflow', record)">查看流程</a>
                </template>
                <template slot="FlowStatusStr" slot-scope="record">
                    <a-tag :color="record.FlowStatus == 'Pending' ? 'green' : record.FlowStatus == 'Finished' ? 'blue' : 'red'">
                        {{
                            record.FlowStatus == 'Pending'
                                ? '审批中' + (record.empTurn != null && record.empTurn != '' ? '(' + record.empTurn + ')' : '')
                                : record.FlowStatus == 'Finished'
                                ? '审批完成' + (record.empTurn != null && record.empTurn != '' ? '(' + record.empTurn + ')' : '')
                                : '回退' + (record.empTurn != null && record.empTurn != '' ? '(' + record.empTurn + ')' : '')
                        }}
                    </a-tag>
                </template>
            </a-table>
        </a-modal>
        <a-modal title="查看流fd程" :visible="isShow" @cancel="isShow = false" :width="'80vw'" :dialog-style="{ top: '20px' }">
            <div v-show="isShow" style="position: relative; height: 60vh">
                <workflow :data.sync="flowData" :title="ProcessTitle" @ok="flowSave" />
            </div>
        </a-modal>
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
    GetProcessFlowDataList,
    ApproveOperation,
    GetFlowStartNodeBtn,
    FlowOperation
} from '@/api/index.js';
import conditionInputNumberVue from '../../components/workflow-ui/src/components/Generator/condition-input-number.vue';
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
            modalwidth: 820,
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
            historyData: [],
            operationRow: {},
            operationBtnArr: [],
            //提交类型
            OperationType: '',
            flowtype: 'read'
        };
    },
    computed: {},
    watch: {},
    methods: {
        GetFormListFn() {
            GetFlowFormRelationList(this.tableParams)
                .then((res) => {
                    this.data = res;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        onSearch() {},
        operationSendOrRead(type, row) {
            var that = this;
            this.flowtype = 'create';
            this.operationBtnArr = [];
            this.TableRow = row;
            let { FormXml, XmlContent, ID } = row;
            this.jsonData = JSON.parse(FormXml);
            let XmlContentJson = JSON.parse(XmlContent);
            this.flowData = {};
            this.flowData = { node: XmlContentJson };
            this.modalwidth = '80vw';
            switch (type) {
                case 'send':
                    this.GetFlowStartNodeBtnFn(ID);
                    this.type = 'send';
                    this.visible = !this.visible;
                    that.$nextTick(function () {
                        this.$bus.$emit('workFlowType', 'read');
                    });
                    this.isflowShow = true;
                    break;
                default:
                    this.visible = false;
                    that.$nextTick(function () {
                        this.$bus.$emit('workFlowType', 'read');
                    });
                    this.isShow = true;
                    break;
            }
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
            this.operationBtnArr = [];
            this.visible = !this.visible;
            this.isflowShow = false;
            this.GetTableDataListFn(row);
        },

        showModal() {
            this.type = 'add';
            this.visible = !this.visible;
        },

        handleOk() {
            this.$refs.kfb
                .getData()
                .then((res) => {
                    this.confirmLoading = true;
                    this.visible = false;
                    let { ID, TableName, XmlContent, FlowID } = this.TableRow;
                    let obj = {
                        TableJson: JSON.stringify(res),
                        TableName: TableName,
                        TableID: 0,
                        XmlContent: XmlContent,
                        FlowFormRelationID: ID,
                        FlowID: FlowID,
                        OperationType: 'submit'
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
                            FlowOperation(obj).then((res) => {
                                console.log(res);
                            });
                        // this.SaveProcessFlowFn(obj);
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
            this.modalwidth = '820px';
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
        GetTableDataListFn(row) {
            let { ID, TableName, TableJson } = row;
            let obj = {
                TableName: TableName,
                RelationID: ID,
                IsPaging: true,
                PageIndex: 1,
                PageSize: 20
            };
            GetProcessFlowDataList(obj).then((res) => {
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
                let approveOpera = {
                    title: '审核操作',
                    key: 'approveAction',
                    scopedSlots: { customRender: 'approveAction' }
                };
                let status = {
                    title: '状态',
                    key: 'FlowStatus',
                    scopedSlots: { customRender: 'FlowStatusStr' }
                };
                columnsArr.push(status, approveOpera, opera);
                this.historyColumns = columnsArr;
                this.historyData = res;
            });
        },
        operation(type, row) {
            let { ID, FlowID, ProcessXml } = row;
            let operationType = type == 'return' ? 'fallback' : type == 'approve' ? 'submit' : '';
            let obj = {
                flowID: FlowID,
                operationType: operationType
            };
            switch (type) {
                case 'edit':
                    // return;
                    // this.TableRow = row;
                    let { FormXml, XmlContent, TableJson } = this.TableRow;
                    this.type = 'historyEdit';
                    this.modalwidth = '80vw';
                    this.visible = true;
                    this.isflowShow = true;
                    this.jsonData = JSON.parse(FormXml);
                    let XmlContentJson = JSON.parse(XmlContent);
                    this.flowData = {};

                    let format = this.formateData(row);
                    this.$nextTick(() => {
                        this.$refs.kfb.form.setFieldsValue(format);
                        this.flowData = { node: XmlContentJson };
                    });
                    break;
                case 'delete':
                    break;
                default:
                    this.$bus.$emit('workFlowType', 'read');
                    this.visible = false;
                    let ProcessXmlJson = JSON.parse(ProcessXml);
                    this.flowData = { node: ProcessXmlJson };
                    this.isShow = true;
                    break;
            }
        },
        operationBtn(type, row) {
            // this.FlowID = row ? row.FlowID : 0;
            this.OperationType = type;
            let { ID, TableName, XmlContent, TableJson } = this.TableRow;
            let obj = {
                TableJson: '',
                TableName: TableName,
                TableID: 0,
                XmlContent: XmlContent,
                FlowFormRelationID: ID,
                FlowID: 0,
                OperationType: type
            };
            if (row) {
                obj.FlowID = row.FlowID;
                obj.TableID = row.RefTableID;
                let jsondata = this.formateData(row);
                obj.TableJson = JSON.stringify(jsondata);
                FlowOperation(obj).then((res) => {
                    this.$message.success(res);
                    this.GetTableDataListFn(this.TableRow);
                });
            } else {
                this.$refs.kfb
                    .getData()
                    .then((res) => {
                        this.confirmLoading = true;
                        this.visible = false;
                        obj.TableJson = JSON.stringify(res);
                        FlowOperation(obj).then((res) => {
                            this.$message.success(res);
                            this.GetFormListFn();
                        });
                        setTimeout(() => {
                            this.confirmLoading = false;
                        }, 300);
                    })
                    .catch((values) => {
                        console.log('验证未通过', values);
                    });
            }
        },
        GetFlowStartNodeBtnFn(id) {
            GetFlowStartNodeBtn(id).then((res) => {
                let str = res;
                this.operationBtnArr = str.split(',');
            });
        },
        formateData(row) {
            let Copy = JSON.stringify(row);
            Copy = JSON.parse(Copy);
            this.$delete(Copy, 'ID');
            this.$delete(Copy, 'FlowFormRelationID');
            this.$delete(Copy, 'FlowID');
            this.$delete(Copy, 'ProcessXml');
            this.$delete(Copy, 'RefTable');
            this.$delete(Copy, 'RefTableID');
            this.$delete(Copy, 'row_number');
            this.$delete(Copy, 'NodeBtn');
            this.$delete(Copy, 'empTurn');
            this.$delete(Copy, 'FlowStatus');
            return Copy;
        }
    },
    created() {},
    mounted() {
        // this.$bus.$emit('workFlowType', 'read');
        this.GetFormListFn();
    }
};
</script>

</style>