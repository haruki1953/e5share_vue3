import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { publicGetUsersService } from '@/api/public'
import { userGetLastLoginTimeService } from '@/api/user'
import { parseUserInfo } from '@/utils/resDataHandle'
import { accountStatus, avatarConfig } from '@/config'

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

    // 当找不到时，返回不存在用户的对象，用于显示可能不存在的用户时不报错
    const findUserForShow = (id) => {
      let user = findUserById(id)
      if (!user) {
        user = {
          isUser: false,
          id,
          username: '用户不存在',
          nickname: '用户不存在',
          account_status: 'active',
          avatar: avatarConfig.emptyAvatar,
          bio: '',
          contact_info: '',
          e5_expiration_date: null,
          e5_subscription_date: null,
          email: '',
          registered_at: '',
          helped_by_users: [],
          helped_users: [],
          helping_by_users: [],
          helping_users: []
        }
      }
      return user
    }

    // 根据id数组返回用户列表 （不重复）
    const filterUsersByIds = (idList) => {
      // 使用 Array.filter 方法过滤出与给定id数组匹配的用户
      return userList.value.filter((user) => idList.includes(user.id))
    }
    // （保留顺序）
    const mapUsersByIds = (idList) => {
      return idList.map((id) => findUserById(id))
    }

    // 正在分享的用户列表
    const sharingUsers = computed(() => {
      // 过滤正在分享的用户
      return userList.value.filter(
        (user) => user.account_status === accountStatus.sharing
      )
    })

    // 搜索用户
    const searchUsers = (key) => {
      if (!key) {
        // 如果关键字为空，返回所有用户列表
        return userList.value
      }
      // 过滤用户列表，匹配关键字的用户
      return userList.value.filter((user) => {
        return (
          user.id.toString().includes(key) ||
          user.username.includes(key) ||
          user.nickname.includes(key) ||
          user.email.includes(key) ||
          (user.contact_info && user.contact_info.includes(key)) ||
          (user.bio && user.bio.includes(key))
        )
      })
    }

    // 获取用户最后登录时间
    const getLastLoginTime = async (userId) => {
      const res = await userGetLastLoginTimeService(userId)
      const userIndex = userList.value.findIndex((user) => user.id === userId)
      if (userIndex !== -1) userList.value[userIndex].last_login = res.data.data
    }

    return {
      userList,
      getUsers,
      findUserById,
      findUserForShow,
      filterUsersByIds,
      mapUsersByIds,
      sharingUsers,
      searchUsers,
      getLastLoginTime
    }
  },
  {
    persist: true // 持久化
  }
)
