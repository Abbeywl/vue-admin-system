<template>
    <div class="main">
        <k-form-design toolbarsTop :showHead="true" style="height: 100%" @save="handleSave" ref="kfb" />
    </div>
</template>

<script>
import '@/components/k-form-design/styles/form-design.less';
import { SaveFormTableInfo } from '@/api/index';
const pinyin = require('js-pinyin');
export default {
    components: {},
    data() {
        return {
            titleVal: '',
            saveData: {
                FormXml: '',
                MenuName: '',
                TableName: ''
            }
        };
    },
    computed: {},
    watch: {},
    methods: {
        handleSave(values) {
            let jsonhtml = JSON.parse(values);

            if (this.titleVal == '') {
                this.$message.warning('请填写表单名称');
            } else if (jsonhtml.list.length == 0) {
                this.$message.warning('请选择控件');
            } else {
                this.saveData.FormXml = values;
                this.saveData.MenuName = this.titleVal;
                this.saveData.TableName = pinyin.getFullChars(this.titleVal);

                SaveFormTableInfo(this.saveData)
                    .then((res) => {
                        this.$message.success('保存成功');
                        //清空数据
                        this.$refs.kfb.handleReset(true);
                    })
                    .catch((err) => {
                        this.$message.success('保存失败');
                        console.log(err);
                    });
            }
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
        this.$refs['kfb'].$on('getTitleVal', (msg) => {
            this.titleVal = msg;
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