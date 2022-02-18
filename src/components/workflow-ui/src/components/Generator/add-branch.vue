<template>
    <button class="add-branch" @click="addCondition">添加节点</button>
</template>
<script>
export default {
    name: 'AddBranch',
    methods: {
        addCondition() {
            this.$emit('addCondition');
        }
    }
};
</script>
