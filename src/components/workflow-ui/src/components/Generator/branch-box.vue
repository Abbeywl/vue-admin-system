<template>
    <div class="branch-box">
        <AddBranch @addCondition="addCondition" v-if="workflowtype == 'create'" />
        <slot>branch-box</slot>
    </div>
</template>
<script>
import AddBranch from './add-branch';
export default {
    name: 'BranchBox',
    components: {
        AddBranch
    },
    methods: {
        addCondition() {
            this.$emit('addCondition');
        },
        delNode() {
            this.$emit('delNode');
        }
    },
    props: {
        workflowtype: {
            type: String,
            default: 'create'
        }
    }
};
</script>
