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
                    component: () => import('../pages/index'),
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
                    path: '/FormList',
                    component: () => import('../pages/FormList'),
                    meta: { title: '表单列表' }
                },
                {
                    path: '/workflow',
                    component: () => import('../pages/workflow'),
                    meta: { title: '工作流模板绘制' }
                },
                {
                    path: '/processInfo',
                    component: () => import('../pages/workflow/processInfo.vue'),
                    meta: { title: '模板列表' }
                },
                  {
                    path: '/launched',
                    component: () => import('../pages/workflow/launched.vue'),
                    meta: { title: '已发起' }
                },
                 {
                    path: '/senddetail',
                    component: () => import('../pages/workflow/senddetail.vue'),
                    meta: { title: '已发起记录' }
                }
            ]
        },
       
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
