<template>
    <div class="">
        <a-row>
            <a-col :span="21" class="btn_group">
                <a-button @click="showModal" type="primary"> 新建巡检点 </a-button>
                <a-button @click="handleAdd" type=""> 导入EXCEL </a-button>
                <a-button @click="handleAdd" type=""> 下载模板 </a-button>
            </a-col>
            <a-col :span="3">
                <a-input-search placeholder="搜索" style="width: 200px" @search="onSearch" />
            </a-col>
        </a-row>
        <a-row>
            <a-table :columns="columns" :data-source="data" :scroll="{ x: 1000, y: 600 }">
                <template slot-scope="record" slot="tag">
                    <span class="tag">
                        <a-tag v-if="record == '文字0'" class="invalid">作废</a-tag>
                        <a-tag v-else>正常</a-tag>
                    </span>
                </template>
                <template slot="action" slot-scope="record" class="oprea">
                    <a :data-id="record.key" class="" @click="operationEdit(record.key)">编辑</a>
                    <a-divider type="vertical" />
                    <a :data-id="record.key" class="" @click="operationDelete(record.key)">删除</a>
                    <a-divider type="vertical" />
                    <a :data-id="record.key" class="" @click="operationCopy(record.key)">复制</a>
                    <a-divider type="vertical" />
                    <a :data-id="record.key" class="" @click="operationDisable(record.key)">停用</a>
                </template>
            </a-table>
        </a-row>
        <a-modal title="新建巡检点" :visible="visible" :confirm-loading="confirmLoading" @ok="handleOk" @cancel="handleCancel">
            <a-form-model ref="ruleForm" :model="form" :rules="rules">
                <a-form-model-item ref="precinct" label="管理区" prop="precinct" labelAlign="left" v-bind="layout">
                    <a-input
                        v-model="form.precinct"
                        @blur="
                            () => {
                                $refs.precinct.onFieldBlur();
                            }
                        "
                    />
                </a-form-model-item>
                <a-form-model-item ref="name" label="巡检点名称" prop="name" labelAlign="left" v-bind="layout">
                    <a-input
                        v-model="form.name"
                        @blur="
                            () => {
                                $refs.name.onFieldBlur();
                            }
                        "
                    />
                </a-form-model-item>
                <a-form-model-item ref="No" label="巡检点编号" prop="No" labelAlign="left" v-bind="layout">
                    <a-input
                        v-model="form.No"
                        @blur="
                            () => {
                                $refs.No.onFieldBlur();
                            }
                        "
                    />
                </a-form-model-item>
                <a-form-model-item ref="import" label="检查要点" prop="import" labelAlign="left" v-bind="layout">
                    <a-input v-model="form.import" />
                </a-form-model-item>
                <a-form-model-item ref="signIn" label="签到方式" prop="signIn" labelAlign="left" v-bind="layout">
                    <a-checkbox-group v-model="form.type">
                        <a-checkbox value="1" name="type"> 定点自拍 </a-checkbox>
                        <a-checkbox value="2" name="type"> NFC </a-checkbox>
                        <a-checkbox value="3" name="type"> 蓝牙 </a-checkbox>
                    </a-checkbox-group>
                </a-form-model-item>
            </a-form-model>
        </a-modal>
    </div>
</template>

<script>
import { SaveFormTableInfo } from '@/api/index';

const data = [];
const columns = [
    { title: '管理區', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
    { title: '巡檢點名稱', width: 110, dataIndex: 'age', key: 'age' },
    { title: '巡檢點編號', dataIndex: 'address', key: '1', width: 150 },
    { title: '檢查要點', dataIndex: 'address', key: '2', width: 150 },
    { title: '簽到方式', dataIndex: 'address', key: '3', width: 150 },
    {
        title: '狀態',
        dataIndex: 'address',
        key: '5',
        width: 150,
        scopedSlots: {
            customRender: 'tag'
        }
    },
    {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 200,
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
            data,
            columns,
            ModalText: '新建巡检点',
            visible: false,
            confirmLoading: false,
            form: {
                precinct: '',
                name: '',
                No: '',
                import: '',
                type: []
            },
            rules: {
                precinct: [{ required: true, message: '请输入管理区', trigger: 'blur' }],
                name: [{ required: true, message: '请输入巡检点名称', trigger: 'blur' }],
                No: [{ required: true, message: '请输入编号', trigger: 'blur' }],
                type: [
                    {
                        type: 'array',
                        required: true,
                        message: '请选择签到方式',
                        trigger: 'change'
                    }
                ]
            },
            layout: {
                labelCol: { span: 6 },
                wrapperCol: { span: 18 }
            }
        };
    },
    computed: {},
    watch: {},
    methods: {
        getDataTest() {
            var data = {
                htmlJson: 'ssss',
                menuName: '测试表单添加',
                tableName: 'testFormAdd',
                form: true
            };
            SaveFormTableInfo(data).then((res) => {
                console.log(res);
            });
        },
        onSearch() {},

        handleAdd() {
            console.log(1);
        },
        operationEdit(key) {
            console.log(key);
        },
        operationDelete(key) {
            console.log(key);
        },
        operationCopy(key) {
            console.log(key);
        },
        operationDisable(key) {
            console.log(key);
        },
        showModal() {
            this.visible = true;
        },
        handleOk(e) {
            this.ModalText = 'The modal will be closed after two seconds';
            this.confirmLoading = true;
            setTimeout(() => {
                this.visible = false;
                this.confirmLoading = false;
            }, 2000);
        },
        handleCancel(e) {
            console.log('Clicked cancel button');
            this.visible = false;
        }
    },
    created() {
        this.getDataTest();
    },
    mounted() {},
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
.tag {
    span {
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