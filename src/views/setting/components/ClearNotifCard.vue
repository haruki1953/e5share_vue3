<script setup>
import { ref } from 'vue'
import { loadProfileData } from '@/utils/dataManage'
import { userClearNotifService } from '@/api/user'

// 提交中状态标记
const isSubmitting = ref(false)
// 清空通知
const clearNotif = async () => {
  await ElMessageBox.confirm('您确认要清空通知吗', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  // 设置为提交中状态
  isSubmitting.value = true
  try {
    // 调用接口
    await userClearNotifService()
    // 重新获取数据
    await loadProfileData()
    ElMessage.success('清空通知成功')
  } finally {
    // 无论提交成功或失败，都要解除提交中状态
    isSubmitting.value = false
  }
}
</script>
<template>
  <el-card shadow="hover">
    <template #header>
      <el-text tag="b" size="large"> 清空通知 </el-text>
    </template>
    <el-alert title="温馨提示" type="info" show-icon :closable="false">
      <el-text type="info" tag="b"> 通知过多时，可在此清空通知 </el-text>
    </el-alert>
    <el-button type="info" round @click="clearNotif" :loading="isSubmitting">
      清空通知
    </el-button>
  </el-card>
</template>

<style lang="scss" scoped>
.el-button {
  margin-top: 10px;
}
</style>
