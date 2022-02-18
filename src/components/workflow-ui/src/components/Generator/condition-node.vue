<template>
    <div class="condition-node">
        <ConditionNodeBox
            :node="node"
            @addnode="addnode"
            @delConditionNode="delConditionNode"
            @addConditionFactor="addConditionFactor"
            @updateCondition="updateCondition"
            :workflowtype="workflowtype"
        />
    </div>
</template>
<script>
import ConditionNodeBox from './condition-node-box';
export default {
    name: 'ConditionNode',
    components: {
        ConditionNodeBox
    },
    props: {
        value: {
            type: Number,
            default: 1
        },
        text: {
            type: String,
            default: '请设置审批人'
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
    watch: {
        workflowtype: {
            handler(newval, oldval) {
                console.log(newval, oldval);
            }
        }
    },
    methods: {
        addnode(node) {
            this.$emit('addnode', node);
        },
        delConditionNode() {
            this.$emit('delConditionNode');
        },
        addConditionFactor(node) {
            this.$emit('addConditionFactor', node);
        },
        updateCondition(node) {
            this.$emit('updateCondition', node);
        }
    },
    mounted() {}
};
</script>
