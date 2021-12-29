<template>
    <div>
        <NodeWrap
            v-if="node.type == 'start' || node.type == 'approver' || node.type == 'notifier'"
            :node.sync="node"
            @addnode="addnode"
            @delNode="delNode"
            @getaa="getaa"
        />
        <ConditionNode
            v-if="node.type == 'condition' || node.type == 'conditionShunt'"
            :node.sync="node"
            @addnode="addnode"
            @delConditionNode="delConditionNode"
            @addConditionFactor="addConditionFactor"
        />
        <!-- <ShuntNode
            v-if="node.type == 'shunt'"
            :node.sync="node"
            @addnode="addnode"
            @delConditionNode="delConditionNode"
            @addConditionFactor="addConditionFactor"
        /> -->
        <BranchWrap v-if="node.type == 'route' || node.type == 'shunt'" :node.sync="node" @addnode="addnode" @delNode="delNode" />
        <BackNode v-if="node.type == 'back' || node.type == 'recall'" :node.sync="node" @addnode="addnode" @delNode="delNode" />
    </div>
</template>
<script>
import NodeWrap from './node-wrap';
import ConditionNode from './condition-node';
import ShuntNode from '../ShuntNode/shunt-node.vue';
import BranchWrap from './branch-wrap';
import BackNode from '../BackNode';
export default {
    name: 'Node',
    components: {
        NodeWrap,
        BranchWrap,
        ConditionNode,
        BackNode,
        ShuntNode
    },
    props: {
        node: {
            type: Object,
            default: undefined
        }
    },
    watch: {
        node: {
            handler(val) {},
            deep: true
        }
    },
    mounted() {
        this.$bus.$on('workFlowType', (data) => {
            console.log('数据加载完', data);
        });
    },
    methods: {
        getaa() {
            console.log('====================', this.node);
            this.$emit('getb', this.node);
        },
        addnode(node) {
            this.$emit('addnode', node);
        },
        delNode() {
            this.$emit('delNode');
        },
        delConditionNode() {
            this.$emit('delConditionNode');
        },
        addConditionFactor(node) {
            this.$emit('addConditionFactor', node);
            this.node = node;
            // console.log(this.node)
        }
    }
};
</script>
