<template>
    <div>
        <div class="fd-nav">
            <div class="fd-nav-left">
                <div class="fd-nav-back" @click="colse">
                    <i aria-label="icon: left" class="anticon anticon-left"
                        ><svg
                            viewBox="64 64 896 896"
                            focusable="false"
                            class=""
                            data-icon="left"
                            width="1em"
                            height="1em"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"
                            /></svg
                    ></i>
                </div>
                <input type="text" class="flowTitle" v-model="data1.title" />
            </div>
            <div class="fd-nav-center">
                <div class="fd-nav-container">
                    <div class="fd-nav-item"><span class="order-num">1</span>{{ title }}</div>
                </div>
            </div>
            {{ workflowType1 }}{{ '===' }}
            <div class="fd-nav-right" v-show="flowtype == 'create'">
                <button type="button" class="ant-btn button-preview" @click="preview">
                    <span>预览JSON</span>
                </button>
                <button type="button" class="ant-btn button-preview" @click="save">
                    <span>发 布</span>
                </button>
            </div>
        </div>
        <div class="fd-nav-content">
            <div class="dingflow-design">
                <div class="zoom">
                    <div class="zoom-out" @click="zoom(-10)" />
                    <span>{{ zoomValue || 100 }}%</span>
                    <div class="zoom-in" @click="zoom(10)" />
                </div>
                <div class="ie-polyfill-container">
                    <div
                        id="box-scale"
                        :key="key"
                        class="box-scale"
                        :style="`transform: ${zoomStyle.transform}; transform-origin: 50% 0px 0px;pointer-events: ${
                            flowtype != 'create' ? 'auto' : 'auto'
                        };`"
                    >
                        <Node
                            v-for="(item, index) of items"
                            :key="index"
                            :node="item"
                            @addnode="addnode"
                            @delNode="delNode(item)"
                            :workflowtype="workflowType1"
                            ref="nodeTem"
                        />
                        <EndNode />
                        <a-modal title="预览" :visible="viewModal" @cancel="handleCancel">
                            <pre>{{ JSON.stringify(data1.node, null, 4) }}</pre>
                            <template slot="footer">
                                <a-button key="back" @click="handleCancel"> 取消 </a-button>
                            </template>
                        </a-modal>
                        <!-- <AModal :dialog.sync="viewModal">
                            <pre style="font-family: Monaco, Menlo, Consolas, Bitstream Vera Sans Mono, monospace; font-size: 14px">{{
                                JSON.stringify(data1.node, null, 4)
                            }}</pre>
                        </AModal> -->
                        <ErrorsModal :dialog.sync="errorsModal" :data="errors" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// import AModal from './../AModal/AModal';
import EndNode from './end-node';
import ErrorsModal from './errors-modal';
import { iteratorData, addNewNode, delNode, checkData } from './process';
const defaultData = {
    title: '请假',
    node: {
        name: '发起人',
        type: 'start',
        nodeId: 'sid-startevent',
        properties: {
            name: '所有人'
        }
    }
};
export default {
    name: 'WorkflowUi',
    components: {
        EndNode,
        // AModal,
        ErrorsModal
    },
    props: {
        data: {
            type: Object,
            default: undefined
        },
        title: {
            type: String,
            default: '工作流'
        },
        workflowType1: {
            type: String,
            default: 'create'
        }
    },
    data: () => ({
        flowtype: 'create',
        items: [],
        key: 0,
        errorsModal: false,
        errors: [],
        viewModal: false,
        zoomValue: 100,
        zoomStyle: {
            transform: 1
        },
        data1: {
            // title: '请假',
            // node: {
            // name: '发起人',
            // type: 'start',
            // nodeId: 'sid-startevent',
            // properties: {
            //     type: 'start',
            //     name: '所有人',
            //     otherInfor: {
            //         userList: [],
            //         roleList: []
            //     },
            //     setCheckType: ['提交', '草稿'],
            //     setCheckVal: {
            //         submit: '提交',
            //         draft: '草稿',
            //         recall: '撤回',
            //         urged: '催办'
            //     }
            // },
            // childNode: {}
            // }
        }
    }),
    watch: {
        data: {
            handler(newval, oldval) {
                if (!newval.node) {
                    newval.node = defaultData;
                }
                this.data1 = {};
                this.data1 = { node: newval.node };
                this.iteratorData(this.data1.node);
            },
            deep: true
        },
        workflowType1(val, newval) {
            this.$bus.$emit('workFlowType', 'create');
        }
    },
    beforeUpdate() {
        console.log('workflowtype1111', this.workflowType1);
    },
    mounted() {
        if (this.data && this.data.node) {
            this.data1 = this.data;
            this.iteratorData(this.data1.node);
        }
        let that = this;
        this.$bus.$on('workFlowType', (data) => {
            that.flowtype = data;
        });
        // if (!this.data1.node) {
        // this.initialNode();
        // }
        // this.iteratorData(this.data1.node);
    },
    methods: {
        initialNode() {
            if (!this.data1.node) {
                this.data1.node = {
                    name: '发起人',
                    type: 'start',
                    nodeId: 'sid-startevent',
                    properties: {
                        name: '所有人'
                    }
                };
            }
        },
        refreshData(data) {},
        iteratorData(data) {
            this.items = [];
            iteratorData(this.items, data);
        },
        addnode(node) {
            addNewNode(node, this.data1.node, this.items);
            this.key++;
        },
        delNode(node) {
            // wanglan  console.log("删除节点:" + node.properties.actionerRules[0].labelNames);
            delNode(node, this.data1.node, this.items);
            this.key++;

            // this.iteratorData(this.data1.node)
        },
        save() {
            console.log('最外层', this.data1);
            //  var errors = checkData(this.data1.node);
            // if (errors.length > 0) {
            //     this.errorsModal = true;
            //     this.errors = errors;
            //     return;
            // }
            this.$emit('ok', this.data1);
        },
        preview() {
            // console.log(this.data1.node);
            // var errors = checkData(this.data1.node);
            // if (errors.length > 0) {
            //     this.errorsModal = true;
            //     this.errors = errors;
            //     return;
            // }
            this.viewModal = true;
        },
        // 缩放
        zoom(v) {
            let zv = (this.zoomValue || 100) + v;
            if (zv < 20) zv = 20;
            else if (zv > 200) zv = 200;
            this.zoomValue = zv;
            this.zoomStyle = { transform: `scale(${zv / 100})` };
        },
        colse() {
            this.$parent.closeFn();
        },
        handleCancel() {
            this.viewModal = false;
            this.$emit('close');
        },
        changeType(type) {
            this.flowtype = type;
            console.log(type);
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nopointer {
    pointer-events: none;
}
</style>
