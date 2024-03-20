<script setup>
import { ref, computed } from 'vue'
import { useProfileStore } from '@/stores'
import { userUpdateProfileService } from '@/api/user'
import { loadUserData } from '@/utils/dataManage'
import { userRules } from '@/config/rules'

// 表单组件
const form = ref()

// 用于提交的form数据对象
const profileForm = ref({
  nickname: '',
  contactInfo: '',
  bio: ''
})

// 校验规则
const rules = { ...userRules }

const profileStore = useProfileStore()
// 显示原数据
const showOldData = () => {
  profileForm.value.nickname = profileStore.user.nickname
  profileForm.value.contactInfo = profileStore.user.contact_info
  profileForm.value.bio = profileStore.user.bio
}
showOldData()

// 清空
// const clearData = () => {
//   profileForm.value.nickname = ''
//   profileForm.value.contactInfo = ''
//   profileForm.value.bio = ''
// }

// 判断当前表单是否和原来相同
const isFormUnchanged = computed(() => {
  return (
    profileForm.value.nickname === profileStore.user.nickname &&
    profileForm.value.contactInfo === profileStore.user.contact_info &&
    profileForm.value.bio === profileStore.user.bio
  )
})

// 提交中状态标记
const isSubmitting = ref(false)
// 提交修改用户信息
const submitProfile = async () => {
  // 去除首尾空格
  profileForm.value.nickname = profileForm.value.nickname.trim()
  profileForm.value.contactInfo = profileForm.value.contactInfo.trim()
  profileForm.value.bio = profileForm.value.bio.trim()
  // 预校验
  await form.value.validate()

  if (isFormUnchanged.value) {
    ElMessage('表单未修改')
    showOldData()
    return
  }

  // 设置为提交中状态
  isSubmitting.value = true
  try {
    // 调用修改用户信息的接口
    await userUpdateProfileService(profileForm.value)
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
  profileForm
})
</script>

<template>
  <el-card shadow="hover">
    <template #header>
      <el-text tag="b" size="large"> 修改基本信息 </el-text>
    </template>
    <el-form
      :model="profileForm"
      :rules="rules"
      ref="form"
      label-width="80px"
      size="large"
      autocomplete="off"
    >
      <el-form-item label="昵称" prop="nickname">
        <el-input
          v-model="profileForm.nickname"
          placeholder="请输入昵称"
          maxlength="32"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="bio">
        <el-input
          v-model="profileForm.bio"
          type="textarea"
          placeholder="请输入简介"
          maxlength="500"
          show-word-limit
          :autosize="{ minRows: 2, maxRows: 6 }"
        ></el-input>
      </el-form-item>
      <el-form-item label="联系信息" prop="contactInfo">
        <el-input
          v-model="profileForm.contactInfo"
          type="textarea"
          placeholder="请输入联系信息"
          maxlength="500"
          show-word-limit
          :autosize="{ minRows: 3, maxRows: 6 }"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :loading="isSubmitting"
          @click="submitProfile"
        >
          保存
        </el-button>
        <el-button type="info" @click="showOldData"> 还原 </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
@/utils/dataManage
