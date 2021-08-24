<template>
    <div class="">
        <a-row>
            <a-col :span="18" class="btn_group">
                <a-button @click="showModal" type="primary"> 新增巡检点 </a-button>
                <a-button @click="handleAdd" type=""> 导入EXCEL </a-button>
                <a-button @click="handleAdd" type=""> 下载模板 </a-button>
            </a-col>

            <a-col :span="6" class="search">
                <a-input-search placeholder="搜索" style="width: 200px" @search="onSearch" />
            </a-col>
        </a-row>
        <a-row>
            <a-table :columns="columns" :data-source="data" rowKey="ID">
                <template slot="action" slot-scope="record" class="oprea">
                    <a class="" @click="operationEdit(record.ID)">编辑</a>
                    <a-divider type="vertical" />
                    <a class="" @click="operationDelete(record.ID)">删除</a>
                    <a-divider type="vertical" />
                    <a class="" @click="operationRead(record)">表单发起</a>
                </template>
            </a-table>
        </a-row>
        <a-modal
            :title="modalTitle"
            :visible="visible"
            :confirm-loading="confirmLoading"
            @ok="handleOk"
            @cancel="handleCancel"
            ok-text="保存"
            cancel-text="取消"
        >
            <k-form-build :value="jsonData" ref="kfb" />
        </a-modal>
    </div>
</template>

<script>
import formJson from './form.json';
import { GetFormList, DeleteFormInfo, SaveTableData } from '@/api/index.js';
const data = [];
const columns = [
    {
        title: '表单名称',
        dataIndex: 'MenuName',
        key: 'MenuName'
    },
    { title: '创建人', dataIndex: 'CreatorId', key: 'CreatorId' },
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
            jsonData: formJson,
            data,
            columns,
            visible: false,
            confirmLoading: false,
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
            modalTitle: '新增巡检点',
            tableName: '',
            tableParams: {
                isPaging: true,
                pageIndex: 1,
                pageSize: 10,
                pageTotalCount: 0,
                fuzzyQueryCondition: '',
                selectOrder: ''
            }
        };
    },
    computed: {},
    watch: {},
    methods: {
        GetFormListFn() {
            GetFormList(this.tableParams).then((res) => {
                this.data = res.rows;
            });
        },
        onSearch() {},

        handleAdd() {
            console.log(1);
        },
        operationEdit(key) {
            this.modalTitle = '编辑巡检点';
            this.visible = !this.visible;
            console.log(key);
        },
        operationDelete(key) {
            console.log(key);
            let _selt = this;
            this.$confirm({
                title: '提示',
                content: '确认删除？',
                okText: '确认',
                cancelText: '取消',
                onOk() {
                    DeleteFormInfo(key).then((res) => {
                        _selt.$message.success('删除成功');
                        _selt.GetFormListFn();
                    });
                }
            });
        },
        operationCopy(key) {
            console.log(key);
        },
        //表单发起点击
        operationRead(row) {
            let htmljson = JSON.parse(row.HtmlJson);
            this.tableName = row.TableName;
            this.modalTitle = row.MenuName;
            this.jsonData = htmljson;
            this.visible = !this.visible;
        },
        showModal() {
            this.visible = !this.visible;
            this.modalTitle = '新增巡检点';
        },
        handleOk() {
            this.$refs.kfb
                .getData()
                .then((res) => {
                    console.log(res);
                    this.confirmLoading = true;
                    this.visible = false;
                    this.confirmLoading = false;
                    this.SaveTableDataFn(JSON.stringify(res));
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
            let data = {
                tableName: this.tableName,
                formDataJson: formJson
            };
            SaveTableData(data).then((res) => {
                this.$message.success('发起成功');
            });
        }
    },
    created() {},
    mounted() {
        this.GetFormListFn();
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

//@import url(); 引入公共css类
</style>