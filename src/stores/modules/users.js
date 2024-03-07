import { defineStore } from 'pinia'
import { ref } from 'vue'
import { publicGetUsersService } from '@/api/public'
import { parseUserInfo } from '@/utils/resDataHandle'

export const useUsersStore = defineStore(
  'e5share-users',
  () => {
    // 用户列表，保存所有用户
    const userList = ref([])

    // 请求获取全部用户
    const getUsers = async () => {
      const res = await publicGetUsersService()
      // 清空用户列表
      userList.value = []
      // 遍历解析用户信息，保存
      res.data.data.forEach((userData) => {
        userList.value.push(parseUserInfo(userData))
      })
      // console.log(userList.value)
    }

    return {
      userList,
      getUsers
    }
  },
  {
    persist: true // 持久化
  }
)
