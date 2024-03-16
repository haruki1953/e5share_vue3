<script setup>
import { ref } from 'vue'
const passwordForm = ref({
  oldPassword: '',
  newPassword: ''
})

// 提交修改密码
const submitPassword = () => {
  // 调用修改密码的接口
  // ...
  ElMessage.success('修改成功')
}
</script>
<template>
  <el-card shadow="hover">
    <template #header>
      <el-text tag="b" size="large"> 修改密码 </el-text>
    </template>
    <el-form :model="passwordForm" label-width="120px">
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input
          v-model="passwordForm.oldPassword"
          placeholder="请输入旧密码"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input
          v-model="passwordForm.newPassword"
          placeholder="请输入新密码"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitPassword">保存</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
