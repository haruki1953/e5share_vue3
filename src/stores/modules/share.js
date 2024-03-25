import { defineStore } from 'pinia'
import { ref } from 'vue'
import { shareGetInfoService } from '@/api/share'
import { parseShareInfo } from '@/utils/resDataHandle/shareData'
import { applyInfoExpirationTime } from '@/config'

export const useShareStore = defineStore(
  'e5share-share',
  () => {
    // 分享信息数组
    const shareInfoList = ref([])
    // 申请分享的返回信息
    const applyInfo = ref([])
    // 发送确认的返回信息
    const confirmInfo = ref([])

    // 请求获取分享信息
    const getShareInfo = async () => {
      const res = await shareGetInfoService()
      shareInfoList.value = parseShareInfo(res.data.data)
    }

    // 清除信息
    const removeShareInfo = () => {
      shareInfoList.value = []
    }

    // 根据用户id获取分享信息
    const findShareInfoByUserId = (userId) => {
      return shareInfoList.value.find(
        (shareInfo) => shareInfo.userId === userId
      )
    }

    // 添加申请信息
    const addApplyInfo = (userId, notifUuid) => {
      // 检查是否存在相同 userId 的信息
      const existingInfoIndex = applyInfo.value.findIndex(
        (info) => info.userId === userId
      )
      // 如果存在相同 userId 的信息，则删除该信息
      if (existingInfoIndex !== -1) {
        applyInfo.value.splice(existingInfoIndex, 1)
      }

      // 添加新的申请信息
      applyInfo.value.push({ userId, notifUuid, time: new Date() })
    }

    // 根据用户id获取申请信息
    const findApplyInfoByUserId = (userId) => {
      const info = applyInfo.value.find((info) => info.userId === userId)

      // 如果未找到匹配的申请信息，则返回null
      if (!info || !info.time) return null

      // 将time转为date对象方便使用
      info.time = new Date(info.time)

      // 获取当前日期时间
      const currentDate = new Date()
      // 计算申请信息的有效期截止时间
      const expirationDate = new Date(
        info.time.getTime() + applyInfoExpirationTime * 60 * 1000
      )
      // 如果当前日期时间大于有效期截止日期，则说明申请信息已过期，返回null
      if (currentDate > expirationDate) return null

      return info
    }

    return {
      shareInfoList,
      applyInfo,
      confirmInfo,
      getShareInfo,
      removeShareInfo,
      findShareInfoByUserId,
      addApplyInfo,
      findApplyInfoByUserId
    }
  },
  {
    persist: true // 持久化
  }
)
