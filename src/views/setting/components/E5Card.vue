<script setup>
import { ref } from 'vue'
const e5Form = ref({
  subscriptionDate: '',
  expirationDate: ''
})

// 提交修改E5订阅信息
const submitE5Subscription = () => {
  // 调用修改E5订阅信息的接口
  // ...
  ElMessage.success('修改成功')
}
</script>
<template>
  <el-card shadow="hover">
    <template #header>
      <el-text tag="b" size="large"> 修改E5订阅信息 </el-text>
    </template>
    <el-form :model="e5Form" label-width="120px">
      <el-form-item label="订阅开始日期" prop="subscriptionDate">
        <el-date-picker
          v-model="e5Form.subscriptionDate"
          type="date"
          placeholder="选择日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="订阅到期日期" prop="expirationDate">
        <el-date-picker
          v-model="e5Form.expirationDate"
          type="date"
          placeholder="选择日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitE5Subscription">保存</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
