import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
         {
            path: '/login',
            component: () => import('../pages/Login/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                 {
                    path: '/dashboard',
                    component: () => import('../pages/index/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/Internal',
                    component: () => import('../pages/Internal/Internal.vue'),
                    meta: { title: 'BIM协同' }
                },
                {
                    path: '/KFormDesign',
                    component: () => import('../pages/KFormDesign/index.vue'),
                    meta: { title: '表单案例' }
                },
                   {
                    path: '/KFormBuild',
                    component: () => import('../pages/KFormDesign/kFormBuild.vue'),
                    meta: { title: '表单绘制' }
                }
            ]
        },
       
        {
            path: '*',
            redirect: '/404'
        }
    ]
});