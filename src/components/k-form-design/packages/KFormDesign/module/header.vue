<!--
 * @Description: 头部
 * @Author: kcz
 * @Date: 2019-12-30 00:37:05
 * @LastEditors: kcz
 * @LastEditTime: 2020-03-26 20:18:56
 -->
<template>
    <header class="header"><a-input placeholder="请输入表单名称" v-model="title" @change="titleChange(false)" /></header>
</template>
<script>
export default {
    props: {
        // title: {
        //     type: String,
        //     default: '表单设计器 --by kcz'
        // }
    },
    data() {
        return {
            title: ''
        };
    },
    methods: {
        titleChange(isDel) {
            if (isDel) this.title = '';
            this.title = this.title.replace(/[^\u4e00-\u9fa5a-zA-Z0-9\w]/g, '').trim();
            this.$emit('getTitle', this.title);
        }
    }
};
</script>
<style scoped>
.header {
    margin: 0 auto;
}
input {
    text-align: center;
    width: 300px;
}
</style>