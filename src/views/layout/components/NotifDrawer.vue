<script setup>
import { ref } from 'vue'
import { useProfileStore } from '@/stores'

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
</script>

<template>
  <el-drawer
    v-model="visibleDrawer"
    title="通知"
    direction="rtl"
    size="50%"
  ></el-drawer>
</template>

<style lang="scss" scoped></style>
