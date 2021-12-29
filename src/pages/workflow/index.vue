<template>
    <div class="main">
        <!-- //<workflow :data="data" @ok="ok" /> -->
        <workflow :data.sync="data" @ok="ok" />
    </div>
</template>
<script>
import workflow from '../../components/workflow-ui/src/components/Generator/Main.vue';
// import '../../components/workflow-ui/lib/workflow-ui.css';
import '../../components/workflow-ui/src/assets/style.css';
export default {
    components: {
        workflow
    },
    data() {
        return {
            data: {
                title: '请假',
                node: {
                    name: '发起人',
                    type: 'start',
                    nodeId: 'sid-startevent',
                    properties: {
                        name: '所有人'
                    }
                }
            }
        };
    },
    watch: {
        data: {
            handler(val) {
                console.log('11111', data);
            },
            deep: true
        }
    },

    methods: {
        ok(data) {
            console.log(JSON.stringify(data));
        }
    },
    mounted() {
        this.$bus.$emit('workFlowType', 'edit');
    }
};
</script>
<style scoped>
.main {
    position: relative;
    height: 100%;
    width: 100%;
}
</style>