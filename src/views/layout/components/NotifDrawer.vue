<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProfileStore } from '@/stores'
import NotifCard from './NotifCard.vue'
import ShareConfirmDialog from './ShareConfirmDialog.vue'

// 用户信息
const profileStore = useProfileStore()

// 控制抽屉显示隐藏
const visibleDrawer = ref(false)
const open = () => {
  // 显示抽屉
  visibleDrawer.value = true
  // 设置已读
  profileStore.markAllNotifAsRead()
}

defineExpose({
  open
})

// 对通知进行倒序排序
const sortedNotifications = computed(() => {
  return profileStore.notifications.slice().reverse()
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
        v-if="!profileStore.notifications.length"
      />
      <notif-card
        v-for="item in sortedNotifications"
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
