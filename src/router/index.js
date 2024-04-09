import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores'
import { publicRoutes } from '@/config'
import { ref } from 'vue'
import { webName } from '@/config'

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
    {
      path: '/login',
      component: () => import('@/views/login/LoginPage.vue'),
      meta: { title: `登录 | ${webName}` }
    }, // 登录页
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: '/home',
      children: [
        {
          path: '/home',
          component: () => import('@/views/home/HomePage.vue'),
          meta: { title: `主页 | ${webName}` }
        },
        {
          path: '/user-list',
          component: () => import('@/views/user/UserList.vue'),
          meta: { title: `用户列表 | ${webName}` }
        },
        {
          path: '/user/:id',
          component: () => import('@/views/user/UserPage.vue'),
          meta: { title: `用户 | ${webName}` }
        },
        {
          path: '/post',
          component: () => import('@/views/post/PostPage.vue'),
          meta: { title: `动态 | ${webName}` }
        },
        {
          path: '/share',
          component: () => import('@/views/share/ShareInfo.vue'),
          meta: { title: `分享管理 | ${webName}` }
        },
        {
          path: '/setting',
          component: () => import('@/views/setting/SettingPage.vue'),
          meta: { title: `设置 | ${webName}` }
        }
      ]
    }
  ]
})

// 路由加载标识
export const isLoading = ref(false)

// 路由访问拦截
router.beforeEach((to) => {
  isLoading.value = true

  // 根据路由设置页面标题
  document.title = to.meta.title || webName

  // 路由不存在，拦截到首页
  if (router.resolve(to.path).matched.length === 0) {
    return '/home'
  }
  // 如果没有token, 且访问的不是公开页面，拦截到登录，其他情况正常放行
  const authStore = useAuthStore()
  if (!authStore.token && !publicRoutes.includes(to.path)) return '/login'
})

router.afterEach(() => {
  isLoading.value = false
})

export default router
