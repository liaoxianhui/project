import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            title: 'Home'
        }
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