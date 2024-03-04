import { defineStore } from 'pinia'
import { ref } from 'vue'

// 鉴权模块
export const useAuthStore = defineStore(
  'e5share-auth',
  () => {
    const token = ref('') // 定义 token
    const setToken = (t) => {
      // 设置 token
      token.value = t
    }
    const removeToken = () => {
      token.value = ''
    }
    return {
      token,
      setToken,
      removeToken
    }
  },
  {
    persist: true // 持久化
  }
)
