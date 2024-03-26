<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useProfileStore, useUsersStore, useShareStore } from '@/stores'
import NotifCard from './NotifCard.vue'
import ShareConfirmDialog from './ShareConfirmDialog.vue'
import { StarFilled } from '@element-plus/icons-vue'

// 用户信息
const profileStore = useProfileStore()

// 控制抽屉显示隐藏
const visibleDrawer = ref(false)
const open = () => {
  // 显示抽屉
  visibleDrawer.value = true

  // 首次登录时（readNotifUuid为空）设置全部已读
  if (!profileStore.readNotifUuid.length) {
    profileStore.markAllNotifAsRead()
  }
}

// 重点通知
const importantNotif = ref(null)
const route = useRoute()
const shareStore = useShareStore()
const usersStore = useUsersStore()
onMounted(async () => {
  // 根据路由参数查找重点通知
  const notifUuid = route.query.notif
  if (!notifUuid) return
  const notif = profileStore.findNotifById(notifUuid)
  // 如果找到则将其保存在重点通知，打开抽屉
  if (notif) {
    importantNotif.value = notif
    open()
    return
  }

  // TODO 找不到则在 applyInfo confirmInfo 中寻找
  const applyInfo = shareStore.findApplyInfoByUuid(notifUuid)
  // 如果找到则弹出通知提示
  if (applyInfo) {
    const user = usersStore.findUserById(applyInfo.userId)
    ElNotification({
      title: `这是您与 @${user.username} 的分享申请链接`,
      message: applyInfo.link,
      type: 'info'
    })
    return
  }
  const confirmInfo = shareStore.findConfirmInfoByUuid(notifUuid)
  // 如果找到则弹出通知提示
  if (confirmInfo) {
    const user = usersStore.findUserById(confirmInfo.userId)
    ElNotification({
      title: `这是您与 @${user.username} 的分享确认链接`,
      message: confirmInfo.link,
      type: 'info'
    })
    return
  }

  ElNotification({
    title: '链接无效',
    type: 'warning'
  })
})

// 通知数据，倒序排序，剔除重点通知
const notifData = computed(() => {
  const notifs = profileStore.notifications.slice().reverse()
  if (importantNotif.value) {
    const index = notifs.findIndex(
      (notif) => notif.id === importantNotif.value.id
    )
    if (index !== -1) {
      notifs.splice(index, 1)
    }
  }
  return notifs
})

const router = useRouter()
// 添加分享：跳转至分享页面并带上add参数
const addShareInfo = (userId) => {
  router.push(`/share?add=${userId}`)
  // 关闭抽屉
  visibleDrawer.value = false
}

const shareConfirmDialogRef = ref()
// 确认接受分享，打开对话框
const confirmShare = (userId) => {
  shareConfirmDialogRef.value.open(userId)
}

defineExpose({
  open,
  importantNotif
})
</script>

<template>
  <el-drawer
    v-model="visibleDrawer"
    :with-header="false"
    title="通知"
    direction="rtl"
    size="600"
  >
    <el-scrollbar>
      <el-empty
        description="暂无通知"
        v-if="!notifData.length && !importantNotif"
      />
      <div class="important-notif" v-if="importantNotif">
        <notif-card
          :notif="importantNotif"
          important
          @shareAdd="addShareInfo"
          @shareConfirm="confirmShare"
        ></notif-card>
        <el-divider>
          <el-icon><star-filled /></el-icon>
        </el-divider>
      </div>
      <notif-card
        v-for="item in notifData"
        :key="item.id"
        :notif="item"
        @shareAdd="addShareInfo"
        @shareConfirm="confirmShare"
      ></notif-card>
    </el-scrollbar>
  </el-drawer>
  <share-confirm-dialog ref="shareConfirmDialogRef"></share-confirm-dialog>
</template>

<style lang="scss" scoped></style>
