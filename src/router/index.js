import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores'
import { publicRoutes } from '@/config'
import { ref } from 'vue'

// createRouter 创建路由实例
// 配置 history 模式
// 1. history模式：createWebHistory     地址栏不带 #
// 2. hash模式：   createWebHashHistory 地址栏带 #
// console.log(import.meta.env.DEV)

// vite 中的环境变量 import.meta.env.BASE_URL  就是 vite.config.js 中的 base 配置项

// 异步组件

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: () => import('@/views/login/LoginPage.vue') }, // 登录页
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: '/home',
      children: [
        {
          path: '/home',
          component: () => import('@/views/home/HomePage.vue')
        },
        {
          path: '/user-list',
          component: () => import('@/views/user/UserList.vue')
        },
        {
          path: '/user/:id',
          component: () => import('@/views/user/UserPage.vue')
        },
        {
          path: '/post',
          component: () => import('@/views/post/PostPage.vue')
        },
        {
          path: '/share',
          component: () => import('@/views/share/ShareInfo.vue')
        },
        {
          path: '/setting',
          component: () => import('@/views/setting/SettingPage.vue')
        }
      ]
    }
  ]
})

// 路由访问拦截
router.beforeEach((to) => {
  // 路由不存在，拦截到首页
  if (router.resolve(to.path).matched.length === 0) {
    return '/home'
  }
  // 如果没有token, 且访问的不是公开页面，拦截到登录，其他情况正常放行
  const authStore = useAuthStore()
  if (!authStore.token && !publicRoutes.includes(to.path)) return '/login'
})

// 路由加载标识
export const isLoading = ref(false)

router.beforeEach(() => {
  isLoading.value = true
})

router.afterEach(() => {
  isLoading.value = false
})

export default router
