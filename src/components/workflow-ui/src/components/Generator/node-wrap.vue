<template>
    <div class="node-wrap">
        <NodeWrapBox :node="node" @delNode="delNode" :workflowtype="workflowtype" />
        <AddNodeBtnBox :node="node" @addnode="addnode" :workflowtype="workflowtype" />
    </div>
</template>
<script>
import NodeWrapBox from './node-wrap-box';
import AddNodeBtnBox from './add-node-btn-box';
export default {
    name: 'NodeWrap',
    components: {
        NodeWrapBox,
        AddNodeBtnBox
    },
    props: {
        node: {
            type: Object,
            default: undefined
        },
        workflowtype: {
            type: String,
            default: 'create'
        }
    },
    // watch: {
    //     node: {
    //         handler(newName, oldName) {
    //             console.log('node-wrap', newName);
    //             console.log('node-wrap oldName', oldName);
    //         },
    //         deep: true
    //     }
    // },
    methods: {
        addnode(node) {
            this.$emit('addnode', node);
        },
        delNode() {
            this.$emit('delNode');
        }
    }
};
</script>
