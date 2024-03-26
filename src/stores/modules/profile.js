import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { userGetInfoService } from '@/api/user'
import { parseUserInfo, parseUserNotification } from '@/utils/resDataHandle'

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

    // 请求获取用户信息
    const getProfile = async () => {
      const res = await userGetInfoService() // 请求获取数据

      // 解析用户信息
      user.value = parseUserInfo(res.data.data)

      // 解析通知信息
      notifications.value = parseUserNotification(res.data.data)
    }

    // 清除信息
    const removeProfile = () => {
      user.value = {}
      notifications.value = []
      readNotifUuid.value = []
    }

    // 获取未读通知数
    const unreadNotifCount = computed(() => {
      return notifications.value.filter(
        (notification) => !readNotifUuid.value.includes(notification.id)
      ).length
    })

    // 判断通知是否已读
    const isNotifRead = (id) => {
      return readNotifUuid.value.includes(id)
    }
    // 设置单个通知为已读
    const markNotifAsRead = (id) => {
      // 不是已读再设置
      if (!isNotifRead(id)) {
        readNotifUuid.value.push(id)
      }
    }

    // 设置全部通知为已读
    const markAllNotifAsRead = () => {
      if (!unreadNotifCount.value) return // 没有未读则返回
      readNotifUuid.value = notifications.value.map(
        (notification) => notification.id
      )
    }

    // 根据id查找通知
    const findNotifById = (id) => {
      return notifications.value.find((notif) => notif.id === id)
    }

    return {
      user,
      notifications,
      readNotifUuid,
      getProfile,
      removeProfile,
      unreadNotifCount,
      isNotifRead,
      markNotifAsRead,
      markAllNotifAsRead,
      findNotifById
    }
  },
  {
    persist: true // 持久化
  }
)
