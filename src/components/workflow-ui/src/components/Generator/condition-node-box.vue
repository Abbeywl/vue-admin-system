<template>
    <div class="condition-node-box">
        <div class="auto-judge node_8f5e_917f">
            <div class="sort-left">&lt;</div>
            <div class="title-wrapper">
                <span style="float: right; color: white" @click="delConditionNode" v-show="workflowtype != 'read'">X</span>
                <input
                    type="text"
                    v-model="node.name"
                    class="editable-title"
                    data-spm-anchor-id="0.0.0.i35.2f244490ZxXSWD"
                    @change="changeTitle(node.name)"
                />
            </div>
            <div class="content" @click="show = true">
                <div class="text">
                    <span v-for="(item, idx) of textName" :key="idx">
                        {{ item }}
                        <a-divider type="vertical" />
                    </span>
                </div>
            </div>
        </div>
        <AddNodeBtn :node="node" @addnode="addnode" v-show="workflowtype != 'read'" />
        <!-- <AddNodeCondition :show.sync="show" :properties="node.properties" :parentNode="node" @on-success="setPropertiesOK" /> -->
        <AddNodeApprover
            v-if="node.type != 'back' && node.type != 'recall'"
            :dialog.sync="show"
            :properties="node.properties"
            :node="node"
            @setProperties="setProperties"
        />
    </div>
</template>
<script>
import AddNodeBtn from './add-node-btn';
import AddNodeCondition from './add-node-condition';
import AddNodeApprover from '../Generator/add-node-approver.vue';

export default {
    components: {
        AddNodeBtn,
        AddNodeCondition,
        AddNodeApprover
    },
    props: {
        text: {
            type: String,
            default: '请设置条件'
        },
        node: {
            type: Object,
            default: undefined
        },
        workflowtype: {
            type: String,
            default: 'create'
        }
    },
    data: () => ({
        show: false,
        textName: []
    }),
    watch: {
        node: {
            handler(val) {
                this.node = val;
            },
            deep: true
        }
    },
    beforeMount() {
        if (!this.node.properties) {
            this.node.properties = {
                conditions: [[]]
            };
        }
    },
    mounted() {
        this.getText();
    },

    methods: {
        addnode(node) {
            this.$emit('addnode', node);
        },
        delConditionNode() {
            this.$emit('delConditionNode');
        },
        setProperties(properties) {
            this.getText();
            this.node.properties = properties;
            this.$emit('addConditionFactor', this.node);
            // this.show = true;
        },
        changeTitle() {},
        setPropertiesOK(properties) {
            this.node.properties = properties;
            this.$emit('addConditionFactor', this.node);
        },
        getText() {
            // var str = this.node.type === 'condition' ? '请设置条件' : '请设置审批人';
            var str = '请设置审批人';
            this.textName.push(str);
            this.textName = Array.from(new Set(this.textName));
            if (this.node.properties.otherInfor) {
                if (this.node.properties.otherInfor.userList.length > 0 || this.node.properties.otherInfor.roleList.length > 0) {
                    this.textName = [...this.node.properties.otherInfor.userList, ...this.node.properties.otherInfor.roleList];
                }
            }
        }
    }
};
</script>
