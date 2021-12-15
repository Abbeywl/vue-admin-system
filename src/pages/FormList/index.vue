<template>
    <div class="" style="height: 100">
        <a-row>
            <a-col :span="18" class="btn_group">
                <a-button @click="isAdd = !isAdd" type="primary"> {{ !isAdd ? '新增' : '返回' }} </a-button>
                <!-- <a-button @click="handleAdd" type=""> 导入EXCEL </a-button>
                <a-button @click="handleAdd" type=""> 下载模板 </a-button> -->
            </a-col>

            <a-col :span="6" class="search">
                <a-input-search placeholder="搜索" style="width: 200px" @search="onSearch" />
            </a-col>
        </a-row>
        <a-row v-show="isAdd">
            <k-form-design toolbarsTop :showHead="true" style="height: 100%" @save="handleSave" ref="kfd" />
        </a-row>
        <a-row v-show="!isAdd">
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
                    <!-- <a class="" @click="operationEdit(record)">编辑</a>
                    <a-divider type="vertical" /> -->
                    <a class="" @click="operationDelete(record)">删除</a>
                    <a-divider type="vertical" />
                    <a class="" @click="operationRead(record)">表单发起</a>
                    <a-divider type="vertical" />
                    <a class="" @click="operationHistory(record)">历史记录</a>
                </template>
            </a-table>
        </a-row>
        <a-modal :title="DetailEdit ? '记录' : '表单发起'" :visible="visible" :width="800" @cancel="handleCancel">
            <template slot="footer">
                <a-button key="back" @click="handleCancel" v-show="detailFooter"> 取消 </a-button>
                <a-button key="submit" type="primary" :loading="confirmLoading" @click="handleOk" v-show="detailFooter"> 保存 </a-button>
            </template>
            <k-form-build :value="jsonData" ref="kfBulid" v-show="isForm" />
            <a-table
                v-show="!isForm"
                :columns="historyColumns"
                :data-source="historyData"
                :rowKey="
                    (record, index) => {
                        return index;
                    }
                "
            >
                <template slot="detailAction" slot-scope="record" class="oprea">
                    <a class="" @click="operation('DetailEdit', record)">编辑</a>
                    <a-divider type="vertical" />
                    <a class="" @click="operation('DetailDelete', record)">删除</a>
                </template>
            </a-table>
        </a-modal>
    </div>
</template>

<script>
import formJson from './form.json';
import '@/components/k-form-design/styles/form-design.less';
import {
    GetFormList,
    DeleteFormInfo,
    SaveTableData,
    GetTableDataList,
    UpdateTableDataInfo,
    DeleteTableDataInfo,
    SaveFormTableInfo
} from '@/api/index.js';
const pinyin = require('js-pinyin');

const data = [];
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
const historyColumns = [
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
for (let i = 0; i < 100; i++) {
    data.push({
        key: i,
        name: `Edrward ${i}`,
        age: 32,
        address: `文字${i}`
    });
}
export default {
    components: {},
    data() {
        return {
            isAdd: false,
            jsonData: {},
            data,
            columns,
            historyColumns,
            detailFooter: false,
            historyData: [],
            visible: false,
            isForm: true,
            confirmLoading: false,
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
            modalTitle: '新增巡检点',
            tableName: '',

            tableParams: {
                IsPaging: true,
                PageIndex: 0,
                PageSize: 10
            },
            rowID: 0,
            TableRow: {},
            DetailEdit: false,
            detailId: 0,
            titleVal: '',
            saveData: {
                FormXml: '',
                MenuName: '',
                TableName: ''
            }
        };
    },
    computed: {},
    watch: {},
    methods: {
        handleSave(values) {
            let jsonhtml = JSON.parse(values);

            if (this.titleVal == '') {
                this.$message.warning('请填写表单名称');
            } else if (jsonhtml.list.length == 0) {
                this.$message.warning('请选择控件');
            } else {
                this.saveData.FormXml = values;
                this.saveData.MenuName = this.titleVal;
                this.saveData.TableName = pinyin.getFullChars(this.titleVal);

                SaveFormTableInfo(this.saveData)
                    .then((res) => {
                        this.$message.success('保存成功');
                        //清空数据
                        this.$refs.kfd.handleReset(true);
                    })
                    .catch((err) => {
                        this.$message.success('保存失败');
                        console.log(err);
                    });
            }
        },
        async getdata() {
            const countData = await SaveFormTableInfo(this.saveData);
            if (countData.status == 1) {
                this.count = countData.count;
            } else {
                throw new Error('获取数据失败');
            }
        },
        GetFormListFn() {
            GetFormList(this.tableParams).then((res) => {
                this.data = res.rows;
            });
        },

        GetTableDataListFn(tableName) {
            let obj = {
                IsPaging: true,
                PageIndex: 1,
                PageSize: 10,
                TableName: tableName
            };
            GetTableDataList(obj).then((res) => {
                let columnsArr = [];

                let column = JSON.parse(res.column);
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
                this.historyData = res.rows;
            });
        },
        onSearch() {},

        handleAdd() {
            console.log(1);
        },
        operation(type, row) {
            let { ID } = row;
            let { TableName } = this.TableRow;
            this.detailId = ID;

            switch (type) {
                case 'DetailEdit':
                    this.isForm = true;
                    this.detailFooter = true;
                    this.DetailEdit = true;
                    let Copy = JSON.stringify(row);
                    Copy = JSON.parse(Copy);
                    this.$delete(Copy, 'ID');

                    // 使用k-form-design组件的form属性修改表单数据
                    let parentTableRow = this.TableRow;
                    let htmljson = JSON.parse(parentTableRow.FormXml);
                    this.tableName = parentTableRow.TableName;
                    this.modalTitle = parentTableRow.MenuName;
                    this.jsonData = htmljson;
                    this.$nextTick(function () {
                        this.$refs.kfBulid.form.setFieldsValue(Copy);
                    });

                    break;
                default:
                    let _selt = this;
                    this.$confirm({
                        title: '提示',
                        content: '确认删除？',
                        okText: '确认',
                        cancelText: '取消',
                        async onOk() {
                            DeleteTableDataInfo(ID, TableName).then((res) => {
                                _selt.$message.success('删除成功');
                            });
                        }
                    });
                    break;
            }
        },
        operationEdit(row) {
            this.DetailEdit = false;
            this.TableRow = row;
            let { ID } = row;
            this.modalTitle = '编辑';
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
                    DeleteFormInfo(ID).then((res) => {
                        _selt.$message.success('删除成功');
                        _selt.GetFormListFn();
                    });
                }
            });
        },
        operationHistory(row) {
            this.detailFooter = false;
            this.DetailEdit = true;
            this.isForm = false;
            this.TableRow = row;
            this.rowID = row.ID;
            this.visible = !this.visible;
            this.GetTableDataListFn(row.TableName);
        },
        //表单发起点击
        operationRead(row) {
            this.TableRow = row;
            this.rowID = row.ID;
            this.isForm = true;
            this.DetailEdit = false;
            this.detailFooter = true;
            let htmljson = JSON.parse(row.FormXml);
            this.tableName = row.TableName;
            this.modalTitle = row.MenuName;
            this.jsonData = htmljson;
            this.visible = !this.visible;
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
                    if (!this.DetailEdit) {
                        this.SaveTableDataFn(data);
                    } else {
                        UpdateTableDataInfo(update).then((res) => {
                            this.$message.success('编辑成功');
                        });
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
        this.$refs['kfd'].$on('getTitleVal', (msg) => {
            this.titleVal = msg;
        });
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