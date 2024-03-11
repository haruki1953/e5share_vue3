<script setup>
import { ref, computed } from 'vue'
import { useProfileStore } from '@/stores'
import NotifCard from './NotifCard.vue'

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

// 对通知进行倒序排序
const sortedNotifications = computed(() => {
  return profileStore.notifications.slice().reverse()
})

defineExpose({
  open
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
        v-if="!profileStore.notifications.length"
      />
      <notif-card
        v-for="item in sortedNotifications"
        :key="item.id"
        :notif="item"
      ></notif-card>
    </el-scrollbar>
  </el-drawer>
</template>

<style lang="scss" scoped></style>
