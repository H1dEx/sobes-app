import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {path: '/', component: () => import('../views/List.vue')},
        {path: '/add', component: () => import('../views/Create.vue')},
        {path: '/login', component: () => import('../views/Authorize.vue')},
        {path: '/logout', component: () => import('../views/Logout.vue')}
    ],
    mode: 'history',
    base: process.env.BASE_URL,

})

export default router
