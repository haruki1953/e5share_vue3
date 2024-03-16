<script setup>
// // 头像上传前的钩子函数
// const beforeAvatarUpload = (file) => {
//   const isJPG = file.type === 'image/jpeg'
//   const isLt2M = file.size / 1024 / 1024 < 2

//   if (!isJPG) {
//     ElMessage.error('上传头像图片只能是 JPG 格式!')
//   }
//   if (!isLt2M) {
//     ElMessage.error('上传头像图片大小不能超过 2MB!')
//   }
//   return isJPG && isLt2M
// }

// // 头像上传成功后的回调函数
// const handleAvatarSuccess = (response, file) => {
//   const avatarUrl = response.data.url // 根据实际的接口返回值获取头像 URL
//   ElMessage.success('头像上传成功')
// }

// // 头像上传失败后的回调函数
// const handleAvatarError = (err, file) => {
//   ElMessage.error('头像上传失败')
// }

// const avatarUrl = ref('') // 用于显示头像的 URL
</script>

<template>
  <el-card shadow="hover">
    <template #header>
      <el-text tag="b" size="large"> 修改头像 </el-text>
    </template>
  </el-card>
</template>
