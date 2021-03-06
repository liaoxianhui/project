import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: () =>
            import ('../views/About.vue')
    },
    {
        path: 'login',
        name: 'login',
        component: () =>
            import ('../views/login/Login.vue'),
        meta: {
            title: '登录',
        }
    },
    {
        path: 'register',
        name: 'register',
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