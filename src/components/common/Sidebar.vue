<template>
    <a-layout-sider width="200" style="background: #fff" v-model="collapsed" theme="light" collapsed-width="0">
        <a-menu
            theme="light"
            mode="inline"
            :open-keys="openNavList"
            @openChange="onOpenNav"
            :inline-collapsed="collapsed"
            :default-selected-keys="['1']"
        >
            <template v-for="item in leftMenuData">
                <a-menu-item v-if="!item.children" :key="item.key">
                    <router-link :to="item.path">{{ item.name }}</router-link>
                </a-menu-item>
                <sub-menu v-else :key="item.key" :menu-info="item" />
            </template>
        </a-menu>
    </a-layout-sider>
</template>

<script>
import bus from '../common/bus';
import SubMenu from './subMenu.vue';
export default {
    components: { SubMenu },
    data() {
        return {
            collapsed: false,
            openNavList: [],
            leftMenuData: [
                {
                    name: '系统首页',
                    key: '1',
                    path: '/dashboard',
                    icon: 'deployment-unit'
                },
                {
                    name: '自定义表单',
                    path: '2',
                    key: '2',
                    icon: 'setting',
                    children: [
                        { name: '绘制表单', path: '/KFormDesign', icon: 'setting', key: '2.1' },
                        {
                            name: '表单列表',
                            path: '/FormList',
                            icon: 'setting',
                            key: '2.2'
                        }
                    ]
                },
                {
                    name: '工作流',
                    path: '/workflow',
                    key: '3',
                    icon: 'setting'
                }
            ]
        };
    },
    created() {
        bus.$on('collapsed', (msg) => {
            this.collapsed = msg;
        });
    },
    computed: {},
    methods: {
        onOpenNav(e) {
            // console.log(e);
            let endKey = e.pop();
            this.openNavList = endKey ? [endKey] : [];
        }
    }
};
</script>

<style scoped>
</style>
