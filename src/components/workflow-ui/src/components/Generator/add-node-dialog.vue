<template>
    <div style="position: absolute; top: 0px; left: 0px; width: 100%">
        <div>
            <div v-if="dialog" class="ant-popover ant-popover-placement-rightTop" style="left: 55%; top: 55%; transform-origin: -4px 0px">
                <div class="ant-popover-content">
                    <div class="ant-popover-arrow" />
                    <div class="ant-popover-inner" role="tooltip">
                        <div>
                            <div class="ant-popover-inner-content">
                                <div class="add-node-popover" data-spm-anchor-id="0.0.0.i102.2f244490UdKR44">
                                    <div class="add-node-popover-header">
                                        <i
                                            aria-label="icon: close"
                                            tabindex="-1"
                                            class="anticon anticon-close add-node-popover-close"
                                            @click="dialog1 = false"
                                        >
                                            <svg
                                                viewBox="64 64 896 896"
                                                focusable="false"
                                                class=""
                                                data-icon="close"
                                                width="1em"
                                                height="1em"
                                                fill="currentColor"
                                                aria-hidden="true"
                                                data-spm-anchor-id="0.0.0.i103.2f244490UdKR44"
                                            >
                                                <path
                                                    d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"
                                                />
                                            </svg>
                                        </i>
                                    </div>
                                    <div class="add-node-popover-body">
                                        <a
                                            v-for="(n, index) in nodes"
                                            :key="index"
                                            :class="'add-node-popover-item ' + n.type"
                                            @click="click(n)"
                                        >
                                            <div class="item-wrapper">
                                                <span class="iconfont">
                                                    <svg
                                                        class=""
                                                        viewBox="64 64 896 896"
                                                        fill="currentColor"
                                                        aria-hidden="true"
                                                        width="1em"
                                                        height="1em"
                                                        style="overflow: initial"
                                                    >
                                                        <path :d="n.svgpath" />
                                                    </svg>
                                                </span>
                                            </div>
                                            <p>{{ n.label }}</p>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        dialog: {
            type: Boolean,
            default: false
        },
        node: {
            type: Object,
            default: undefined
        }
    },
    data: () => ({
        dialog1: false,
        nodes: [
            {
                type: 'approver',
                label: '审批人',
                svgpath:
                    'M644.8 581.568l160.64 187.456A64 64 0 0 1 756.842667 874.666667H267.157333a64 64 0 0 1-48.597333-105.642667l160.661333-187.434667c18.922667 11.52 39.466667 20.629333 61.205334 26.944L267.157333 810.666667H480v-128h64v128h212.842667l-173.269334-202.133334a254.613333 254.613333 0 0 0 61.226667-26.965333zM512 149.333333c117.824 0 213.333333 95.509333 213.333333 213.333334s-95.509333 213.333333-213.333333 213.333333-213.333333-95.509333-213.333333-213.333333S394.176 149.333333 512 149.333333z m0 64a149.333333 149.333333 0 1 0 0 298.666667 149.333333 149.333333 0 0 0 0-298.666667z'
            },
            {
                type: 'notifier',
                label: '抄送人',
                svgpath:
                    'M309.461333 205.994667a68.778667 68.778667 0 0 1 34.965334 18.837333l153.813333 153.813333 0.042667-0.085333 45.248 45.248-0.064 0.085333 161.557333 161.557334 0.064-0.085334 45.269333 45.290667-168.490666 168.533333c-48.597333 48.576-129.792 46.208-181.333334-5.333333L88.021333 481.28c-25.792-25.770667-26.986667-66.346667-2.688-90.666667a59.818667 59.818667 0 0 1 33.92-16.810666l102.912-14.805334 14.784-102.912c4.992-34.709333 37.461333-57.130667 72.533334-50.090666z m-11.690666 62.698666l-19.413334 146.496-146.538666 19.413334L446.848 749.653333c25.962667 25.962667 66.432 27.626667 90.368 3.690667l122.581333-122.602667-362.026666-362.026666z m525.44-3.84l101.205333 101.248a64 64 0 0 1 0 90.517334l-143.872 143.872-45.290667-45.290667 143.914667-143.850667-101.226667-101.226666a85.333333 85.333333 0 0 0-120.682666 0l-83.562667 83.52-45.226667-45.248 83.541334-83.52a149.333333 149.333333 0 0 1 211.2 0z'
            },
            {
                type: 'route',
                label: '会签',
                svgpath:
                    'M568.896 149.333333a64 64 0 0 1 64 64v113.770667a64 64 0 0 1-64 64H544v48.597333h140.501333a96 96 0 0 1 95.893334 91.477334l0.106666 4.522666-0.021333 79.402667H810.666667a64 64 0 0 1 64 64v113.792a64 64 0 0 1-64 64h-113.770667a64 64 0 0 1-64-64v-113.792a64 64 0 0 1 64-64h19.584l0.021333-79.125333-0.149333-3.349334a32 32 0 0 0-31.850667-28.928l-348.864 0.021334c-17.664 0.746667-31.36 15.68-30.592 34.688l-0.021333 76.693333h22.08a64 64 0 0 1 64 64v113.792a64 64 0 0 1-64 64H213.333333a64 64 0 0 1-64-64v-113.792a64 64 0 0 1 64-64h27.690667l0.042667-75.349333a96 96 0 0 1 87.36-99.669334l4.501333-0.298666a96 96 0 0 1 4.053333-0.085334H480v-48.597333h-24.896a64 64 0 0 1-64-64V213.333333a64 64 0 0 1 64-64h113.792zM327.104 679.104H213.333333v113.792h113.770667v-113.792z m483.562667 0h-113.770667v113.792H810.666667v-113.792zM568.896 213.333333h-113.792v113.770667h113.792V213.333333z'
            },
            // {
            //   type: "back",
            //   label: "退回",
            //   svgpath:
            //     "M531.2 0C480 0 428.8 6.4 384 25.6l19.2 57.6C441.6 64 486.4 57.6 531.2 57.6c236.8 0 435.2 192 435.2 435.2s-192 435.2-435.2 435.2-435.2-192-435.2-435.2c0-12.8 0-32 0-44.8C108.8 448 121.6 448 128 448c70.4 0 128-57.6 128-128s-57.6-128-128-128c-70.4 0-128 57.6-128 128 0 38.4 19.2 76.8 44.8 102.4C44.8 441.6 44.8 467.2 44.8 492.8c0 268.8 217.6 492.8 492.8 492.8S1024 761.6 1024 492.8C1024 217.6 806.4 0 531.2 0zM57.6 320c0-38.4 32-70.4 70.4-70.4 38.4 0 70.4 32 70.4 70.4S166.4 390.4 128 390.4c-6.4 0-12.8 0-19.2 0 0 0 0 0 0 0L96 384C76.8 371.2 57.6 345.6 57.6 320zM416 345.6C384 300.8 358.4 268.8 345.6 249.6L313.6 268.8c19.2 25.6 38.4 57.6 70.4 102.4L416 345.6zM467.2 595.2c0 12.8-6.4 25.6-12.8 32l32 38.4c6.4-6.4 19.2-12.8 25.6-19.2C544 640 576 620.8 608 608c0-12.8 0-25.6 0-38.4C569.6 588.8 537.6 601.6 505.6 614.4L505.6 480l179.2 0 0 12.8 38.4 0L723.2 262.4l-256 0L467.2 595.2zM505.6 294.4l179.2 0 0 57.6L505.6 352 505.6 294.4zM505.6 390.4l179.2 0L684.8 448 505.6 448 505.6 390.4zM281.6 691.2l19.2 44.8c25.6-32 44.8-57.6 64-70.4 25.6 38.4 64 57.6 121.6 57.6 96 0 192 0 288 0 6.4-12.8 12.8-32 12.8-38.4-102.4 0-198.4 6.4-294.4 0-51.2 0-83.2-19.2-102.4-51.2L390.4 422.4 288 422.4l0 38.4 57.6 0 0 172.8C332.8 640 307.2 659.2 281.6 691.2zM742.4 492.8C710.4 512 672 524.8 640 544 614.4 531.2 588.8 512 563.2 499.2L544 524.8c76.8 44.8 140.8 89.6 198.4 134.4L768 620.8c-25.6-12.8-57.6-32-89.6-57.6 32-12.8 64-25.6 96-38.4L742.4 492.8z",
            // },
            // {
            //   type: "recall",
            //   label: "撤回",
            //   svgpath:
            //     "M507.426133 156.4672c-4.2496-0.119467-8.413867 0.119467-12.6464 0.136533V56.661333c0-27.392-30.651733-43.6224-53.316266-28.245333L82.756267 272.0256a34.133333 34.133333 0 0 0 0 56.4736l358.741333 243.592533c22.664533 15.394133 53.316267-0.836267 53.316267-28.245333v-101.0688c172.834133-2.0992 316.5696 118.545067 323.515733 274.551467 5.3248 119.671467-71.424 225.757867-185.207467 274.756266-2.065067 0.887467-4.232533 2.628267-4.0448 6.178134 0.1536 2.901333 3.106133 3.754667 5.7344 2.9696C816.930133 947.677867 951.005867 790.306133 956.074667 600.917333c6.365867-238.660267-194.491733-437.640533-448.648534-444.450133z",
            // },
            {
                type: 'shunt',
                label: '或签',
                svgpath:
                    'M128.692 320.223v383.66h319.395v-383.66H128.692z m255.426 319.659h-192.08V383.79h192.08v256.092zM575.119 320.223v383.66h319.395v-383.66H575.119z m255.426 319.659h-192.08V383.79h192.08v256.092zM481.078 62.263h63.844v895.69h-63.844z'
            }
        ]
    }),
    watch: {
        dialog(val) {
            this.dialog1 = val;
        },
        dialog1(val) {
            this.$emit('update:dialog', val);
        }
    },
    methods: {
        click(item) {
            this.dialog1 = false;
            switch (item.type) {
                case 'approver':
                    this.addApprover(item);
                    break;
                case 'route':
                    this.addRoute(item);
                    break;
                case 'notifier':
                    this.addNotifier(item);
                    break;
                case 'back':
                    this.addBack(item);
                    break;
                case 'recall':
                    this.addRecall(item);
                    break;
                case 'shunt':
                    // this.addShunt(item);
                    this.addRouteShunt(item);
                    break;
                default:
                    this.$Message.error('暂时不支持');
                    break;
            }
        },
        addApprover(item) {
            // console.log('父节点:')
            // console.log(this.node)
            var node = {
                name: '审批人',
                prevId: this.node.nodeId,
                nodeId: '' + new Date().getTime(),
                type: 'approver',
                status: '',
                properties: {
                    // type: 'approver',
                    // name: '请选择审批人',
                    // otherInfor: {
                    //     userList: [],
                    //     roleList: []
                    // },
                    // setCheckType: [],
                    // setCheckVal: {
                    //     submit: '提交',
                    //     draft: '草稿',
                    //     recall: '撤回',
                    //     urged: '催办'
                    // }
                }
            };
            // console.log('新的审批节点:')
            // console.log(node)
            this.$emit('addnode', node);
        },
        addBack(item) {
            // console.log('父节点:')
            // console.log(this.node)
            var node = {
                name: '退回操作',
                prevId: this.node.nodeId,
                nodeId: '' + new Date().getTime(),
                type: 'back',
                status: '',
                properties: {
                    type: 'back',
                    name: '退回'
                }
            };
            // console.log('新的审批节点:')
            // console.log(node)
            this.$emit('addnode', node);
        },
        addRecall(item) {
            // console.log('父节点:')
            // console.log(this.node)
            var node = {
                name: '撤回操作',
                prevId: this.node.nodeId,
                nodeId: '' + new Date().getTime(),
                type: 'recall',
                status: '',
                properties: {
                    type: 'recall',
                    name: '撤回'
                }
            }; // console.log('新的审批节点:')
            // console.log(node)

            this.$emit('addnode', node);
        },
        addNotifier(item) {
            var node = {
                name: '抄送人',
                prevId: this.node.nodeId,
                nodeId: '' + new Date().getTime(),
                type: 'notifier',
                status: '',
                properties: {
                    // type: 'notifier',
                    // name: '请选择抄送人',
                    // otherInfor: {
                    //     userList: [],
                    //     roleList: []
                    // },
                    // setCheckType: [],
                    // setCheckVal: {
                    //     submit: '提交',
                    //     draft: '草稿',
                    //     recall: '撤回',
                    //     urged: '催办'
                    // }
                }
            };
            this.$emit('addnode', node);
        },
        addRoute(item) {
            var nodeId = new Date().getTime();
            var node = {
                type: 'route',
                status: '',
                approval: 'joinsign',
                prevId: this.node.nodeId,
                nodeId: '' + nodeId,
                conditionNodes: [
                    {
                        name: '审核',
                        type: 'condition',
                        prevId: '' + nodeId,
                        nodeId: '' + (nodeId + 10)
                    },
                    {
                        name: '审核',
                        type: 'condition',
                        prevId: '' + (nodeId + 10),
                        nodeId: '' + (nodeId + 20)
                    }
                ]
            };
            this.$emit('addnode', node);
        },
        addRouteShunt(item) {
            var nodeId = new Date().getTime();
            var node = {
                type: 'route',
                status: '',
                approval: 'orsign',
                prevId: this.node.nodeId,
                nodeId: '' + nodeId,
                conditionNodes: [
                    {
                        name: '审核',
                        type: 'condition',
                        prevId: '' + nodeId,
                        nodeId: '' + (nodeId + 10)
                    },
                    {
                        name: '审核',
                        type: 'condition',
                        prevId: '' + (nodeId + 10),
                        nodeId: '' + (nodeId + 20)
                    }
                ]
            };
            this.$emit('addnode', node);
        }
        // addShunt(item) {
        //     var nodeId = new Date().getTime();
        //     var node = {
        //         type: 'shunt',
        //         prevId: this.node.nodeId,
        //         nodeId: '' + nodeId,
        //         approval: 'shunt',
        //         conditionNodes: [
        //             {
        //                 name: '审批人',
        //                 type: 'conditionShunt',
        //                 prevId: '' + nodeId,
        //                 nodeId: '' + (nodeId + 10)
        //             },
        //             {
        //                 name: '审批人',
        //                 type: 'conditionShunt',
        //                 prevId: '' + (nodeId + 10),
        //                 nodeId: '' + (nodeId + 20)
        //             }
        //         ]
        //     };
        //     this.$emit('addnode', node);
        // }
    }
};
</script>
