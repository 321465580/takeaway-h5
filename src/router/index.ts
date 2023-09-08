import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/tabs',
            name: 'tabs',
            component: () => import('../views/tabs/TabsView.vue'),
            children: [
                {
                    path: '/home',
                    name: 'home',
                    component: () => import('../views/tabs/home/HomeView.vue')
                },
                {
                    path: '/order',
                    name: 'order',
                    component: () => import('../views/tabs/order/OrderView.vue')
                },
                {
                    path: '/my',
                    name: 'my',
                    component: () => import('../views/tabs/my/MyView.vue')
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/login/LoginView.vue')
        },
        {
            path: '/shop/:id',
            name: 'shop',
            component: () => import('../views/shop/ShopView.vue')
        }
        
    ]
})

export default router