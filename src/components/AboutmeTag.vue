<script setup>
import { computed } from 'vue'
import { useProfileStore } from '@/stores'
const props = defineProps({
  // 要展示的用户对象
  user: {
    required: true,
    type: Object
  }
})

// 关于自己的信息
const profileStore = useProfileStore()
// 辅助函数，用于检查数组是否存在并包含指定的值
const isInArray = (array, value) => {
  return Array.isArray(array) && array.includes(value)
}
// 是否正在被当前用户帮助
const isHelpingByThisUser = computed(() => {
  return isInArray(profileStore.user?.helping_by_users, props.user.id)
})
// 是否正在帮助当前用户
const isHelpingThisUser = computed(() => {
  return isInArray(profileStore.user?.helping_users, props.user.id)
})
// 当前用户是否为自己
const isMyself = computed(() => {
  return profileStore.user?.id === props.user.id
})

// 导出信息
defineExpose({
  isHelpingByThisUser,
  isHelpingThisUser,
  isMyself
})
</script>

<template>
  <div>
    <el-tag type="success" v-if="isHelpingByThisUser">您正在被TA帮助</el-tag>
    <el-tag type="primary" v-if="isHelpingThisUser">您正在帮助TA</el-tag>
    <el-tag type="info" v-if="isMyself">您的分享</el-tag>
  </div>
</template>
