import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        redirect: '/home/nav/rec'
    },
    {
        path: '/home',
        name: '主页',
        component: () => import('@/views/Home'),
        redirect: '/home/nav/rec',
        children: [
            {
                path: '/home/nav',
                name: '导航',
                component: () => import('@/views/Nav'),
                children: [
                    {
                        path: '/home/nav/rec',
                        name: '推荐',
                        component: () => import('@/views/Recommend')
                    }
                ]
            }
        ]
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes: routes
})
export default router