<template>
    <div id="SIDE_MODAL">
        <div v-if="dialog1" class="side-modal-wrapper">
            <!-- <div class="side-modal-mask" /> -->
            <!-- <div class="side-modal"> -->
            <a-drawer placement="right" :closable="false" :visible="dialog1" @close="onClose" :width="720">
                <div class="side-modal-header">
                    <div class="ant-row-flex ant-row-flex-middle editable-text-field">
                        <div class="ant-col ant-col-17 editable-text-col">
                            <a-input placeholder="" v-model="node.name" />
                        </div>
                    </div>
                </div>
                <div class="side-modal-body">
                    <div class="side-modal-body-content">
                        <ul class="tab-tilte">
                            <li :class="{ active: cur == 0 }" @click="cur = 0">发起人</li>
                            <li :class="{ active: cur == 1 }" @click="cur = 1" v-show="node.type != 'notifier'">设置</li>
                        </ul>
                        <div class="tab-content">
                            <div v-show="cur == 0">
                                <a-row>
                                    <a-col :span="6">
                                        <a-button type="primary" @click="addRole('role', targetRoleKeys)"> 添加角色 </a-button>
                                    </a-col>
                                </a-row>
                                <a-row>
                                    <a-button
                                        v-for="(item, index) of targetRoleKeys"
                                        :key="index + 'fdf'"
                                        class="btn"
                                        @click="addRole('', targetRoleKeys)"
                                    >
                                        {{ item }}
                                    </a-button>
                                </a-row>
                                <a-row>
                                    <a-col :span="6">
                                        <a-button type="primary" @click="addRole('user', targetUserKeys)"> 添加用户 </a-button>
                                    </a-col>
                                </a-row>
                                <a-row>
                                    <a-button
                                        v-for="(item, index) of targetUserKeys"
                                        :key="index + 'fdf'"
                                        class="btn"
                                        @click="addRole('', targetUserKeys)"
                                    >
                                        {{ item }}
                                    </a-button>
                                </a-row>
                            </div>
                            <div v-show="cur == 1" class="setting">
                                <div>
                                    <a-checkbox-group class="width_100" v-model="checkedValues" @change="onChange">
                                        <a-row :gutter="[0, 15]">
                                            <a-col :span="1">
                                                <a-checkbox :default-checked="false" value="submit" />
                                            </a-col>
                                            <a-col :span="4">
                                                <span>提交</span>
                                            </a-col>
                                            <a-col :span="19">
                                                <a-input :value="submitVal" />
                                            </a-col>
                                        </a-row>
                                        <a-row :gutter="[0, 15]" v-show="node.type == 'start'">
                                            <a-col :span="1">
                                                <a-checkbox :default-checked="false" value="draft" />
                                            </a-col>
                                            <a-col :span="4">
                                                <span>草稿</span>
                                            </a-col>
                                            <a-col :span="19">
                                                <a-input placeholder="草稿" :value="draftVal" />
                                            </a-col>
                                        </a-row>
                                        <a-row :gutter="[0, 15]">
                                            <a-col :span="1">
                                                <a-checkbox :default-checked="false" value="recall" />
                                            </a-col>
                                            <a-col :span="4">
                                                <span>撤回</span>
                                            </a-col>
                                            <a-col :span="19">
                                                <a-input :value="recallVal" />
                                            </a-col>
                                        </a-row>
                                        <a-row :gutter="[0, 15]" v-show="node.type != 'start'">
                                            <a-col :span="1">
                                                <a-checkbox :default-checked="false" value="fallback" />
                                            </a-col>
                                            <a-col :span="4">
                                                <span>退回</span>
                                            </a-col>
                                            <a-col :span="19">
                                                <a-input :value="backVal" />
                                            </a-col>
                                        </a-row>
                                        <a-row :gutter="[0, 15]" v-show="node.type == 'start'">
                                            <a-col :span="1">
                                                <a-checkbox :default-checked="false" value="urged" />
                                            </a-col>
                                            <a-col :span="4">
                                                <span>催办</span>
                                            </a-col>
                                            <a-col :span="19">
                                                <a-input :value="urgedVal" />
                                            </a-col>
                                        </a-row>
                                    </a-checkbox-group>
                                </div>
                                <div v-show="node.type != 'condition' && node.type != 'start' && node.type != 'approver'">
                                    <h2 class="t_left">审批方式</h2>
                                    <a-row>
                                        <a-radio-group v-model="approval" @change="approvalOnChange">
                                            <a-radio value="or" class="radio_m"> 或签（一名审批人同意或拒绝即可） </a-radio>
                                            <a-radio value="add" class="radio_m">
                                                会签（无序会签，当审批达到会签比例时，则该审批通过）
                                            </a-radio>
                                        </a-radio-group>
                                    </a-row>
                                </div>
                            </div>
                        </div>
                        <textarea type="text" :value="JSON.stringify(properties)" style="width: 100%; height: 100px; margin-top: 10px" />
                    </div>
                </div>

                <div class="side-modal-footer">
                    <button type="button" class="ant-btn ant-btn-default" @click="cancel">
                        <span>取 消</span></button
                    ><button type="button" class="ant-btn ant-btn-primary" @click="save">
                        <span>保 存</span>
                    </button>
                </div>
            </a-drawer>
            <!-- </div> -->
            <addUserModal ref="addUserModal" :visible="visible" @selectFun="selectFun" />
        </div>
    </div>
</template>
<script>
// import AModal from './../AModal/AModal'
import addUserModal from '../AddUserModal';
// import addRoleModal from '../addRoleModal'
export default {
    components: {
        // AModal]
        addUserModal
        // addRoleModal
    },
    props: {
        dialog: {
            type: Boolean,
            default: false
        },
        properties: {
            type: Object,
            default: undefined
        },
        node: {
            type: Object,
            default: undefined
        }
    },
    data: () => ({
        visible: false,
        Rolevisible: false,
        dialog1: false,
        targetRoleKeys: [], // 默认角色
        targetUserKeys: [], // 默认用户
        checkedValues: [], // 设置选中项
        cur: 0, // 默认选中第一个tab
        showAddRole: false,
        selectRole: [],
        currentApp: 'target_management',
        currentAction: 'or',
        temp: {}, // 深拷贝一个node
        properties1: {
            type: 'notifier',
            name: '请选择抄送人',
            otherInfor: {
                userList: [],
                roleList: []
            },
            setCheckType: [],
            setCheckVal: {
                // submit: '提交',
                // draft: '草稿',
                // recall: '撤回',
                // urged: '催办'
            }
        },
        submitVal: '提交',
        draftVal: '草稿',
        recallVal: '撤回',
        urgedVal: '催办',
        backVal: '退回',
        approval: 'or', // 审批方式
        typeName: '' // 类型名称（如抄送人）
    }),
    watch: {
        dialog(val) {
            this.dialog1 = val;
        },
        dialog1(val) {
            this.$emit('update:dialog', val);
            if (val) this.setValue();
        },
        properties: {
            handler(val) {},
            deep: true
        }
    },
    mounted() {
        if (this.properties) {
            this.properties1 = this.properties;
        } else {
            return false;
        }
        this.setValue();
    },
    methods: {
        setValue() {
            if (this.properties1.setCheckVal) {
                this.submitVal = !this.properties1.setCheckVal.submit ? this.submitVal : this.properties1.setCheckVal.submit;
                this.draftVal = !this.properties1.setCheckVal.draft ? this.draftVal : this.properties1.setCheckVal.draft;
                this.recallVal = !this.properties1.setCheckVal.recall ? this.recallVal : this.properties1.setCheckVal.recall;
                this.urgedVal = !this.properties1.setCheckVal.urged ? this.urgedVal : this.properties1.setCheckVal.urged;
                this.backVal = !this.properties1.setCheckVal.back ? this.backVal : this.properties1.setCheckVal.back;
            }
            if (this.properties1.otherInfor) {
                this.targetRoleKeys = this.properties1.otherInfor.roleList;
                this.targetUserKeys = this.properties1.otherInfor.userList;
            }
            if (this.properties1) this.checkedValues = this.properties1.setCheckType;
            Object.assign(this.temp, this.properties1);
        },
        // 添加角色
        addRole(type, _targetKeys) {
            this.$refs.addUserModal.getAddType(type, _targetKeys);
            this.visible = true;
        },
        onClose() {
            this.dialog1 = false;
        },
        onChange(checkedValues) {
            this.checkedValues = checkedValues;
        },
        approvalOnChange(e) {
            this.approval = e.target.value;
            console.log('radio checked', this.approval);
        },
        init() {},
        // 保存审核人
        save() {
            var setCheckType = this.checkedValues;
            var otherInfor = {
                userList: this.targetUserKeys,
                roleList: this.targetRoleKeys
            };
            this.dialog1 = false;
            this.properties1.name = this.targetUserKeys;
            this.properties1.otherInfor = otherInfor;
            this.properties1.setCheckType = setCheckType;
            // this.properties1.approval = this.approval;
            Object.assign(this.temp, this.properties1);
            console.log(this.properties1);
            this.$emit('setProperties', this.properties1);
        },
        cancel() {
            this.dialog1 = false;
            this.properties1 = {};
            Object.assign(this.properties1, this.temp);
            // this.init()
            this.$emit('setProperties', this.properties1);
        },
        // 获取角色key
        selectFun(issave, val, type) {
            this.visible = !this.visible;
            if (!issave) return;
            this.selectRole = [...val];
            this.targetKeys = this.selectRole;
            switch (type) {
                case 'user':
                    this.targetUserKeys = this.selectRole;
                    break;
                default:
                    this.targetRoleKeys = this.selectRole;
                    break;
            }
            console.log('接收值', type, this.selectRole);
        }
    }
};
</script>

<style scoped>
ul {
    display: block;
    width: 100%;
    overflow: hidden;
    border-bottom: 1px solid #ccc;
}
ul li {
    display: block;
    margin: 0;
    padding: 0;
    list-style: none;
}
.tab-tilte {
    width: 100%;
}
.tab-tilte li {
    float: left;
    width: 25%;
    padding: 10px 0;
    text-align: center;
    cursor: pointer;
}
/* 点击对应的标题添加对应的背景颜色 */
.tab-tilte .active {
    border-bottom: 2px solid #09f;
    color: #09f;
}
.tab-content {
    padding-top: 20px;
}
.tab-content div button {
    margin-bottom: 15px;
    margin-right: 10px;
}
/* .setting {
  display: flex;
} */
.radio_m {
    display: block;
    height: 30px;
    line-height: 30px;
    text-align: left;
}
</style>