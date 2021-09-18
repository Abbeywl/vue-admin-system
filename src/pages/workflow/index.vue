<template>
    <div class="main">
        <workflow :data="data" @ok="ok" />
    </div>
</template>
<script>
import workflow from '../../components/workflow-ui/src/components/Generator';
import '../../components/workflow-ui/lib/workflow-ui.css';
// import workflow from '../../components/workflow-ui/src/components/Generator';
// import 'workflow-ui/lib/workflow-ui.css';

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
                    childNode: {}
                }
            }
        };
    },
    methods: {
        ok(data) {
            console.log(JSON.stringify(data));
        }
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