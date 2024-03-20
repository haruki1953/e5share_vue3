<script setup>
import { ref, computed } from 'vue'
import { userRules } from '@/config/rules'
import { useProfileStore } from '@/stores'
import { loadUserData } from '@/utils/dataManage'
import { userUpdateEmailService } from '@/api/user'

// 表单组件
const form = ref()

// 用于提交的form数据对象
const emailForm = ref({
  email: ''
})

// 校验规则
const rules = { ...userRules }

const profileStore = useProfileStore()
// 显示原数据
const showOldData = () => {
  emailForm.value.email = profileStore.user.email
}
showOldData()

// 判断当前表单是否和原来相同
const isFormUnchanged = computed(() => {
  return emailForm.value.email === profileStore.user.email
})

// 提交中状态标记
const isSubmitting = ref(false)
// 提交修改邮箱
const submitEmail = async () => {
  // 设置为提交中状态
  isSubmitting.value = true
  try {
    // 预校验
    await form.value.validate()

    if (isFormUnchanged.value) {
      ElMessage('表单未修改')
      showOldData()
      return
    }
    // 调用修改邮箱的接口
    await userUpdateEmailService(emailForm.value)
    // 重新获取数据
    await loadUserData()
    showOldData()
    ElMessage.success('修改成功')
  } finally {
    // 无论提交成功或失败，都要解除提交中状态
    isSubmitting.value = false
  }
}

defineExpose({
  emailForm
})
</script>

<template>
  <el-card shadow="hover">
    <template #header>
      <el-text tag="b" size="large"> 修改邮箱 </el-text>
    </template>
    <el-form
      :model="emailForm"
      :rules="rules"
      ref="form"
      label-width="80px"
      size="large"
      autocomplete="off"
    >
      <el-form-item label="邮箱" prop="email">
        <el-input
          v-model="emailForm.email"
          placeholder="请输入新邮箱"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="isSubmitting" @click="submitEmail">
          保存
        </el-button>
        <el-button type="info" @click="showOldData"> 还原 </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
@/utils/dataManage
