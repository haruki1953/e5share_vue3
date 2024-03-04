import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { profileGetInfoService } from '@/api/profile'
import { avatarConfig } from '@/config'

// 用户信息模块
export const useProfileStore = defineStore(
  'e5share-profile',
  () => {
    // 用户信息
    const user = ref({})

    // 通知
    const notifications = ref([])
    // 已读通知uuid
    const readNotifUuid = ref([])

    // 头像完整地址
    const avatar = ref('')

    // 昵称
    const nickname = ref('')

    // 请求获取用户信息
    const getProfile = async () => {
      const res = await profileGetInfoService() // 请求获取数据
      user.value = res.data.data

      // 请求的notifications为字符串，将其转为js对象
      notifications.value = JSON.parse(user.value.notifications)

      // 拼接头像完整地址（如果有）
      if (user.value.avatar) {
        // 创建基础 URL 对象
        const baseURL = new URL(avatarConfig.baseURL)
        // 将用户头像路径添加到基础 URL 的路径中
        baseURL.pathname += user.value.avatar
        // 保存完整的 URL
        avatar.value = baseURL.toString()
      } else {
        // 没有时则为默认头像
        avatar.value = avatarConfig.defaultAvatar
      }

      // 处理昵称，如果没有时则为username
      nickname.value = user.value.nickname || user.value.username
    }

    // 清除信息
    const removeProfile = () => {
      user.value = {}
      notifications.value = []
      readNotifUuid.value = []
      avatar.value = ''
      nickname.value = ''
    }

    // 获取未读通知数
    const unreadNotifCount = computed(() => {
      return notifications.value.filter(
        (notification) => !readNotifUuid.value.includes(notification.id)
      ).length
    })

    // 设置单个通知为已读
    const markNotifAsRead = (id) => {
      if (!readNotifUuid.value.includes(id)) {
        readNotifUuid.value.push(id)
      }
    }

    // 设置全部通知为已读
    const markAllNotifAsRead = () => {
      readNotifUuid.value = notifications.value.map(
        (notification) => notification.id
      )
    }

    return {
      user,
      notifications,
      readNotifUuid,
      avatar,
      nickname,
      getProfile,
      removeProfile,
      unreadNotifCount,
      markNotifAsRead,
      markAllNotifAsRead
    }
  },
  {
    persist: true // 持久化
  }
)
