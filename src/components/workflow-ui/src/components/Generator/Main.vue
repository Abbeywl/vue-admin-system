<template>
    <div>
        <div class="fd-nav" v-if="titleIsShow">
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
            <div class="fd-nav-right">
                <button type="button" class="ant-btn button-preview" @click="preview">
                    <span>保 存</span>
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
                        :style="`transform: ${zoomStyle.transform}; transform-origin: 50% 0px 0px;`"
                    >
                        <Node v-for="(item, index) in items" :key="index" :node="item" @addnode="addnode" @delNode="delNode(item)" />
                        <EndNode />
                        <AModal :dialog.sync="viewModal">
                            <pre style="font-family: Monaco, Menlo, Consolas, Bitstream Vera Sans Mono, monospace; font-size: 14px">{{
                                JSON.stringify(data1.node, null, 4)
                            }}</pre>
                        </AModal>
                        <ErrorsModal :dialog.sync="errorsModal" :data="errors" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import AModal from './../AModal/AModal';
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
        AModal,
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
        titleIsShow: {
            type: Boolean,
            default: true
        }
    },
    data: () => ({
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
            handler(val, newval) {
                if (!val.node) {
                    val.node = defaultData;
                }
                this.data1.node = val.node;
                this.iteratorData(this.data1.node);
            },
            deep: true
        }
    },
    mounted() {
        if (this.data && this.data.node) {
            this.data1 = this.data;
        }
        // if (!this.data1.node) {
        this.initialNode();
        // }
        this.iteratorData(this.data1.node);
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
            // console.log('添加节点:' + node.nodeId)
            addNewNode(node, this.data1.node, this.items);
            this.key++;
        },
        delNode(node) {
            // wanglan  console.log("删除节点:" + node.properties.actionerRules[0].labelNames);
            if (!titleIsShow) {
                this.$message.warning('只能删除不可查看！');
                return false;
            }
            delNode(node, this.data1.node, this.items);
            this.key++;
            // this.iteratorData(this.data1.node)
            // console.log(this.data1.node)
            // console.log(this.items)
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
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
