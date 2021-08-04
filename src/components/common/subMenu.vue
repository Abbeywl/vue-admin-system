<!-- 子菜单 -->
<template>
    <a-sub-menu :key="menuInfo.path" v-bind="$props" v-on="$listeners">
        <span slot="title">
            <a-icon :type="menuInfo.icon" /><span>{{ menuInfo.name }}</span>
        </span>
        <template v-for="item in menuInfo.children">
            <!-- <a-menu-item v-if="!item.children" :key="item.path || item.name" @click="clickMenuTitle(item, element)"> -->
            <a-menu-item v-if="!item.children" :key="item.path || item.name">
                <!-- <a-icon type="pie-chart" /> -->
                <router-link :to="item.path">{{ item.name }}</router-link>
            </a-menu-item>
            <sub-menu v-else :key="item.path" :menu-info="item" />
        </template>
    </a-sub-menu>
</template>

<script>
import { Menu } from 'ant-design-vue';
export default {
    name: 'SubMenu',
    // 必须添加
    isSubMenu: true,
    props: {
        ...Menu.SubMenu.props,
        menuInfo: {
            type: Object,
            default: () => ({})
        }
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},

    methods: {
        clickMenuTitle(item, element) {
            //路由跳转，面包屑设置
            if ((element && element.path !== '') || item.path !== '') {
                this.$router.push({ name: element ? element.path : item.path });
            } else {
                this.$message.error('快马加班赶制中！');
            }
            this.reload();
        }
    }
};
</script>