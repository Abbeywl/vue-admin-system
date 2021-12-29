<template>
    <a-modal
        :title="addType == 'user' ? '添加用户' : '添加角色'"
        :visible="visible"
        :confirm-loading="confirmLoading"
        ok-text="确认"
        cancel-text="取消"
        :width="600"
        @ok="handleOk"
        @cancel="handleCancel"
    >
        <a-transfer
            :data-source="mockData"
            show-search
            :list-style="{
                width: '250px',
                height: '300px'
            }"
            :filter-option="filterOption"
            :target-keys="targetKeys"
            :render="(item) => item.title"
            @change="handleChange"
            @search="handleSearch"
        />
    </a-modal>
</template>
<script>
var treeData = [
    { key: 'userdata', title: 'userdata' },
    { key: '设计单位专业负责人', title: '设计单位专业负责人' },
    { key: '设计单位项目经理', title: '设计单位项目经理' },
    { key: 'BIM技术服务单位平台信息管理员', title: 'BIM技术服务单位平台信息管理员' },
    { key: 'BIM技术服务单位项目经理', title: 'BIM技术服务单位项目经理' }
];
export default {
    props: {
        visible: {
            type: Boolean
        }
    },
    data() {
        return { confirmLoading: false, mockData: treeData, targetKeys: [], addType: 'user' };
    },
    mounted() {},
    methods: {
        getAddType(type, _targetKeys) {
            console.log('触发', type, _targetKeys);
            this.targetKeys = [];
            this.targetKeys = _targetKeys;
            this.addType = type;
            switch (type) {
                case 'role':
                    this.mockData = treeData;
                    break;
                case 'user':
                    this.mockData = [
                        { key: '张胜男', title: '张胜男' },
                        { key: '夏挺帅', title: '夏挺帅' },
                        { key: '李书福', title: '李书福' },
                        { key: '司傅', title: '司傅' },
                        { key: '孙菲菲', title: '孙菲菲' }
                    ];
                    break;
                default:
                    break;
            }
        },

        filterOption(inputValue, option) {
            return option.description.indexOf(inputValue) > -1;
        },
        handleChange(targetKeys, direction, moveKeys) {
            console.log(targetKeys, direction, moveKeys);
            this.targetKeys = targetKeys;
        },
        handleSearch(dir, value) {
            console.log('search:', dir, value);
        },
        handleOk(e) {
            this.confirmLoading = true;
            setTimeout(() => {
                // this.visible = false;
                this.confirmLoading = false;
            }, 2000);
            // 传给父组件最终选中值
            this.$emit('selectFun', true, this.targetKeys, this.addType);
        },
        handleCancel(e) {
            this.$emit('selectFun', false, '', this.addType);
        }
    }
};
</script>