import { defineStore } from 'pinia'
import { ref } from 'vue'
import { shareGetInfoService } from '@/api/share'
import { parseShareInfo } from '@/utils/resDataHandle/shareData'

export const useShareStore = defineStore(
  'e5share-share',
  () => {
    // 分享信息数组
    const shareInfoList = ref([])

    // 请求获取分享信息
    const getShareInfo = async () => {
      const res = await shareGetInfoService()
      shareInfoList.value = parseShareInfo(res.data.data)
    }

    // 清除信息
    const removeShareInfo = () => {
      shareInfoList.value = []
    }
    return {
      shareInfoList,
      getShareInfo,
      removeShareInfo
    }
  },
  {
    persist: true // 持久化
  }
)
