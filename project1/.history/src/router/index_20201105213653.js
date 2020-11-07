import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/layout/Layout.vue'

Vue.use(VueRouter)

const routes = [{
        path: '',
        name: 'Layout',
        component: Layout,
        children: [{
                path: '/',
                name: 'Index',
                component: () =>
                    import ('../views/layout/index/Index.vue'),
                meta: {
                    title: '首页',
                }
            },
            {
                path: '/publictext',
                name: 'PublicText',
                component: () =>
                    import ('../views/layout/publictext/PublicText.vue'),
                meta: {
                    title: '发表文章',
                }
            },
            {
                path: '/published',
                name: 'Published',
                component: () =>
                    import ('../views/layout/published/Published.vue'),
                meta: {
                    title: '已发布',
                }
            },
            {
                path: '/statistics',
                name: 'Statistics',
                component: () =>
                    import ('../views/layout/statistics/Statistics.vue'),
                meta: {
                    title: '统计',
                }
            },
            {
                path: '/tab',
                name: 'Tab',
                component: () =>
                    import ('../views/layout/tab/Tab.vue'),
                meta: {
                    title: '标签页',
                }
            },
            {
                path: '/export',
                name: 'Export',
                component: () =>
                    import ('../views/layout/export/Export.vue'),
                meta: {
                    title: '导出',
                }
            },
        ]
    },
    {
        path: '/about',
        name: 'About',
        component: () =>
            import ('../views/About.vue'),
        meta: {
            title: 'About'
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ('../views/login/Login.vue'),
        meta: {
            title: '登录',
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: () =>
            import ('../views/register/Register.vue'),
        meta: {
            title: '注册',
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, data, next) => {
    document.title = to.meta.title
    next()
})

export default router