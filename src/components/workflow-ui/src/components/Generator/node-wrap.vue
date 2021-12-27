<template>
    <div class="node-wrap">
        <NodeWrapBox :node="node" @delNode="delNode" />
        <AddNodeBtnBox :node="node" @addnode="addnode" />
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
        }
    },
    watch: {
        node: {
            handler(val) {
                // console.log("====================", val);
            },
            deep: true
        }
    },
    methods: {
        addnode(node) {
            // console.log('node-wrap 新节点:')
            // console.log(node)
            this.$emit('addnode', node);
        },
        delNode() {
            this.$emit('delNode');
        }
    }
};
</script>
