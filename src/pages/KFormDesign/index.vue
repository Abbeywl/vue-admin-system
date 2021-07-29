<template>
    <div class="main">
        <k-form-design toolbarsTop :showHead="false" style="height: 100%" />
    </div>
</template>

<script>
import '@/components/k-form-design/styles/form-design.less';
import KFormDesign from '@/components/k-form-design/packages';
export default {
    install(Vue) {
        Vue.component('KFormDesign', KFormDesign);
    },
    components: {},
    data() {
        return {};
    },
    computed: {},
    watch: {},
    methods: {},
    created() {},
    mounted() {},
    beforeCreate() {},
    beforeMount() {},
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {},
    destroyed() {},
    activated() {}
};
</script>
<style lang='less' scoped >
.main {
    height: 100%;
}
</style>