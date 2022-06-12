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
                        name: 'recommend',
                        component: () => import('@/views/Recommend')
                    },
                    {
                        path: '/home/nav/plt',
                        name: 'platforms',
                        component: () => import('@/views/Platforms')
                    },
                    {
                        path:'/home/nav/:p',
                        name: 'platformRoom',
                        component: () => import('@/views/PlatformRoom')
                    }
                ]
            },
            {
                path: '/home/liveRoom',
                name: 'liveRoom',
                component: () => import('@/views/LiveRoom')
            }
        ]
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes: routes
})
export default router
