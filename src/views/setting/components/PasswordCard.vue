<script setup>
import { ref } from 'vue'
import { userRules } from '@/config/rules'
import { userUpdatePasswordService } from '@/api/user'

// 表单组件
const form = ref()

const passwordForm = ref({
  oldPassword: '',
  newPassword: '',
  rePassword: ''
})

// 校验规则
const rules = {
  oldPassword: userRules.password,
  newPassword: [
    ...userRules.password,
    {
      validator: (rule, value, callback) => {
        // newPassword 与 oldPassword 不能一致
        if (value === passwordForm.value.oldPassword) {
          callback(new Error('新密码 与 旧密码 不能一致'))
        } else {
          callback() // 就算校验成功，也需要callback
        }
      },
      trigger: 'blur'
    }
  ],
  rePassword: [
    {
      validator: (rule, value, callback) => {
        // 判断 value 和 当前 passwordForm 中收集的 newPassword 是否一致
        if (value !== passwordForm.value.newPassword) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback() // 就算校验成功，也需要callback
        }
      },
      trigger: 'blur'
    }
  ]
}

// 提交中状态标记
const isSubmitting = ref(false)
// 提交修改密码
const submitPassword = async () => {
  // 预校验
  await form.value.validate()

  // 设置为提交中状态
  isSubmitting.value = true
  try {
    // 调用修改密码的接口
    await userUpdatePasswordService(passwordForm.value)
    ElMessage.success('修改成功')
  } finally {
    // 无论提交成功或失败，都要解除提交中状态
    isSubmitting.value = false
    // 重置表单
    form.value.resetFields()
  }
}
</script>
<template>
  <el-card shadow="hover">
    <template #header>
      <el-text tag="b" size="large"> 修改密码 </el-text>
    </template>
    <el-form
      :model="passwordForm"
      :rules="rules"
      ref="form"
      label-width="80px"
      size="large"
      autocomplete="off"
    >
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input
          v-model="passwordForm.oldPassword"
          placeholder="请输入旧密码"
          type="password"
          @keydown.enter.prevent
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input
          v-model="passwordForm.newPassword"
          placeholder="请输入新密码"
          type="password"
          @keydown.enter.prevent
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="rePassword">
        <el-input
          v-model="passwordForm.rePassword"
          placeholder="请确认密码"
          type="password"
          @keydown.enter.prevent
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitPassword">保存</el-button>
        <el-button type="info" @click="form.resetFields()"> 取消 </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
