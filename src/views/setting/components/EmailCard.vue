<script setup>
import { ref } from 'vue'
const emailForm = ref({
  email: ''
})

// 提交修改邮箱
const submitEmail = () => {
  // 调用修改邮箱的接口
  // ...
  ElMessage.success('修改成功')
}
</script>

<template>
  <el-card shadow="hover">
    <template #header>
      <el-text tag="b" size="large"> 修改邮箱 </el-text>
    </template>
    <el-form :model="emailForm" label-width="120px">
      <el-form-item label="新邮箱" prop="email">
        <el-input
          v-model="emailForm.email"
          placeholder="请输入新邮箱"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitEmail">保存</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
