import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/Index'

Vue.use(Router);

function createRouter() {
    const routes = [
        {
            path: '/',
            component: () => import('../components/Index.vue')
        },
        {
            path: '/index',
            component: () => import('../components/Index.vue')
        },
        {
            path: '/bar',
            component: () => import('../components/Bar.vue')
        },
        {
            path: '/foo',
            component: () => import('../components/Foo.vue')
        }
    ];

    const router = new Router({
        mode: 'history',
        routes
    })
    return router
}

export default createRouter;