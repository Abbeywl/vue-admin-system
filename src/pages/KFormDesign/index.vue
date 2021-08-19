<template>
    <div class="main">
        <k-form-design toolbarsTop :showHead="true" style="height: 100%" @save="handleSave" ref="title" />
    </div>
</template>

<script>
import '@/components/k-form-design/styles/form-design.less';
import { SaveFormTableInfo } from '@/api/index';

export default {
    components: {},
    data() {
        return {
            titleVal: '',
            saveData: {
                id: 0,
                htmlJson: '',
                menuName: '',
                tableName: 'testFormAdd',
                form: true
            }
        };
    },
    computed: {},
    watch: {},
    methods: {
        handleSave(values) {
            if (this.titleVal == '') {
                alert(1);
            } else {
                this.saveData.htmlJson = values;
                this.saveData.menuName = this.titleVal;
                console.log(this.saveData);
                SaveFormTableInfo(this.saveData).then((res) => {
                    console.log(res);
                });
            }
            console.log(values);
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
    mounted() {
        this.$refs['title'].$on('getTitleVal', (msg) => {
            this.titleVal = msg;
            console.log('msg===', msg);
        });
    },
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