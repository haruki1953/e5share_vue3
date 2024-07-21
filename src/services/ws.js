import { wsConfig } from '@/config'
import { useProfileStore } from '@/stores'
import { loadE5PostsData } from '@/utils/dataManage'

const profileStore = useProfileStore()

export const setupWsService = () => {
  ws = new WebSocket(wsConfig.url)
  ws.addEventListener('message', handleMessage, false)
}

let ws = null

const handleMessage = (e) => {
  const msgData = JSON.parse(e.data)
  // 调用其他services或stores中的方法来操作数据
  if (msgData.type === 'update-e5post') {
    handleUpdateE5post(msgData)
  }
}

const handleUpdateE5post = async (msgData) => {
  // 是来自自己的更新则返回
  if (profileStore.user.id === msgData.data.fromUserId) {
    return
  }
  // 更新post
  await loadE5PostsData(msgData.data.updateE5postsId)
}
