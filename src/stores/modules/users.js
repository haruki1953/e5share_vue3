import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { publicGetUsersService } from '@/api/public'
import { parseUserInfo } from '@/utils/resDataHandle'
import { accountStatus } from '@/config'

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

    // 根据id查找用户
    const findUserById = (id) => {
      // 在用户列表中查找匹配的用户
      return userList.value.find((user) => user.id === id)
    }

    // 正在分享的用户
    // 正在分享的用户列表
    const sharingUsers = computed(() => {
      // 过滤正在分享的用户
      return userList.value.filter(
        (user) => user.account_status === accountStatus.sharing
      )
    })

    return {
      userList,
      getUsers,
      findUserById,
      sharingUsers
    }
  },
  {
    persist: true // 持久化
  }
)
