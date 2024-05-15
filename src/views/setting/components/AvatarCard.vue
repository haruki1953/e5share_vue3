<script setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { userUpdateAvatarService } from '@/api/user'
import { loadUserData } from '@/utils/dataManage'
import { avatarRule } from '@/config/rules'

const avatarObj = ref('') // 图片对象用于提交
const avatarUrl = ref('') // 用于预览

// 图片选择
const onSelectFile = (uploadFile) => {
  const { allowedTypes, typeError, maxSize, sizeError } = avatarRule
  // 检查文件类型是否允许
  if (!allowedTypes.includes(uploadFile.raw.type)) {
    ElMessage.error(typeError)
    return
  }
  // 检查文件大小是否超过限制
  if (uploadFile.raw.size > maxSize) {
    ElMessage.error(sizeError)
    return
  }

  // 创建本地预览的地址
  avatarUrl.value = URL.createObjectURL(uploadFile.raw)
  // 将图片对象存入 avatarObj 将来用于提交
  avatarObj.value = uploadFile.raw
}

// 取消
const clearAvatar = () => {
  avatarObj.value = ''
  avatarUrl.value = ''
}

// 提交中状态标记
const isSubmitting = ref(false)
// 图片上传
const submitAvatar = async () => {
  // 设置为提交中状态
  isSubmitting.value = true
  try {
    // 注意：当前接口，需要的是 formData 对象
    // 将普通对象 => 转换成 => formData对象
    const fd = new FormData()
    fd.append('avatar', avatarObj.value)
    // 调用接口
    await userUpdateAvatarService(fd)
    // 清除
    clearAvatar()
    // 重新获取数据
    await loadUserData()
    ElMessage.success('修改成功')
  } finally {
    // 无论提交成功或失败，都要解除提交中状态
    isSubmitting.value = false
  }
}

defineExpose({
  avatarUrl
})
</script>

<template>
  <el-card shadow="hover">
    <template #header>
      <el-text tag="b" size="large"> 修改头像 </el-text>
    </template>
    <div v-loading="isSubmitting">
      <el-upload
        class="avatar-uploader"
        :show-file-list="false"
        :auto-upload="false"
        :on-change="onSelectFile"
      >
        <div
          v-if="avatarUrl"
          :style="{ backgroundImage: `url(${avatarUrl})` }"
          class="avatar"
        ></div>
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>

      <div v-if="avatarUrl" class="button-box">
        <el-button type="primary" size="large" @click="submitAvatar">
          保存
        </el-button>
        <el-button type="info" size="large" @click="clearAvatar">
          取消
        </el-button>
      </div>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.el-card {
  :deep() {
    .el-card__body {
      display: flex; /* 使用 Flexbox 布局 */
      justify-content: center; /* 水平居中对齐 */
    }
  }
}
.button-box {
  display: flex; /* 使用 Flexbox 布局 */
  justify-content: center;
  margin-top: 10px;
}
.avatar-uploader {
  :deep() {
    .avatar {
      width: 256px;
      height: 256px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 256px;
      height: 256px;
      text-align: center;
    }
  }
}
</style>
