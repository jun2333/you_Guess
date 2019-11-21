import Vue from 'vue'
import Router from 'vue-router'
import Bar from '../components/Bar'

Vue.use(Router);

function createRouter() {
    const routes = [
        {
            path: '/bar',
            component: Bar
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