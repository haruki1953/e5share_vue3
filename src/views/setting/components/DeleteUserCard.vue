<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { removeLogin, loadAllData } from '@/utils/dataManage'
import { userDeleteUserService } from '@/api/user'

// 提交中状态标记
const isSubmitting = ref(false)

// 路由
const router = useRouter()

// 注销用户
const deleteUser = async () => {
  await ElMessageBox.confirm('您确认要注销用户吗', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  // 设置为提交中状态
  isSubmitting.value = true
  try {
    // 调用接口
    await userDeleteUserService()
    ElMessage.success('注销成功')
    // 跳转至首页
    await router.push('/home')
    // 退出登录
    await removeLogin()
    // 重新加载全部数据
    await loadAllData()
  } finally {
    // 无论提交成功或失败，都要解除提交中状态
    isSubmitting.value = false
  }
}
</script>
<template>
  <el-card shadow="hover">
    <template #header>
      <el-text tag="b" size="large"> 注销用户 </el-text>
    </template>
    <el-alert title="温馨提示" type="warning" show-icon :closable="false">
      <el-text type="warning" tag="b">
        “注销用户”非“退出登录”！注销用户后不可恢复，谨慎注销
      </el-text>
    </el-alert>
    <el-button type="warning" round @click="deleteUser" :loading="isSubmitting">
      注销用户
    </el-button>
  </el-card>
</template>

<style lang="scss" scoped>
.el-button {
  margin-top: 10px;
}
</style>
