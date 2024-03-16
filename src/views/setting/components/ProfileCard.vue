<script setup>
import { ref } from 'vue'

// 表单组件
const form = ref()

// 用于提交的form数据对象
const profileForm = ref({
  nickname: '',
  contactInfo: '',
  bio: ''
})

// 校验规则
const rules = {
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { max: 32, message: '昵称长度不能超过32个字符', trigger: 'blur' }
  ],
  contactInfo: [
    { required: true, message: '请输入联系信息', trigger: 'blur' },
    { max: 500, message: '联系信息长度不能超过500个字符', trigger: 'blur' }
  ],
  bio: [
    { required: true, message: '请输入简介', trigger: 'blur' },
    { max: 500, message: '简介长度不能超过500个字符', trigger: 'blur' }
  ]
}

// 提交修改用户信息
const submitProfile = () => {
  // 调用修改用户信息的接口
  // ...
  ElMessage.success('修改成功')
}
</script>

<template>
  <el-card shadow="hover">
    <template #header>
      <el-text tag="b" size="large"> 修改用户信息 </el-text>
    </template>
    <el-form :model="profileForm" :rules="rules" ref="form" label-width="120px">
      <el-form-item label="昵称" prop="nickname">
        <el-input
          v-model="profileForm.nickname"
          placeholder="请输入昵称"
        ></el-input>
      </el-form-item>
      <el-form-item label="联系信息" prop="contactInfo">
        <el-input
          v-model="profileForm.contactInfo"
          placeholder="请输入联系信息"
        ></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="bio">
        <el-input
          v-model="profileForm.bio"
          type="textarea"
          placeholder="请输入简介"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitProfile">保存</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style lang="scss" scoped>
// .setting-card {
//   margin: 10px 20px 10px 5px;
//   border-radius: 20px;
// }
</style>
