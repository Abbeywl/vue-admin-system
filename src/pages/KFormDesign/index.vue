<template>
    <div class="main">
        <k-form-design toolbarsTop :showHead="false" style="height: 100%" @save="handleSave" />
    </div>
</template>

<script>
import '@/components/k-form-design/styles/form-design.less';
import { SaveFormTableInfo } from '@/api/index';

export default {
    components: {},
    data() {
        return {
            saveData: {
                id: 0,
                htmlJson: '',
                menuName: '测试表单添加',
                tableName: 'testFormAdd'
            }
        };
    },
    computed: {},
    watch: {},
    methods: {
        handleSave(values) {
            alert('触发保存方法');
            console.log(values);
            SaveFormTableInfo(this.saveData).then((res) => {
                console.log(res);
            });
        },
        async getdata() {
            const countData = await SaveFormTableInfo(this.saveData);
            if (countData.status == 1) {
                this.count = countData.count;
            } else {
                throw new Error('获取数据失败');
            }
        }
    },
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