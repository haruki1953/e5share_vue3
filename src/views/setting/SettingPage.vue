<script setup>
import { ref } from 'vue'

const editUserInfoCard = ref()
const editAvatarCard = ref()
const editEmailCard = ref()
const editPasswordCard = ref()
const editE5SubscriptionCard = ref()

//
const userInfoForm = ref({
  nickname: '',
  contactInfo: '',
  bio: ''
})

const emailForm = ref({
  email: ''
})

const passwordForm = ref({
  oldPassword: '',
  newPassword: ''
})

const e5SubscriptionForm = ref({
  subscriptionDate: '',
  expirationDate: ''
})

// 提交修改用户信息
const submitUserInfo = () => {
  // 调用修改用户信息的接口
  // ...
  ElMessage.success('修改成功')
}

// 提交修改邮箱
const submitEmail = () => {
  // 调用修改邮箱的接口
  // ...
  ElMessage.success('修改成功')
}

// 提交修改密码
const submitPassword = () => {
  // 调用修改密码的接口
  // ...
  ElMessage.success('修改成功')
}

// 提交修改E5订阅信息
const submitE5Subscription = () => {
  // 调用修改E5订阅信息的接口
  // ...
  ElMessage.success('修改成功')
}

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
  <el-container>
    <el-aside>
      <el-scrollbar>
        <el-card class="setting-tab" shadow="hover">
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
          >
            <el-menu-item index="1">
              <el-text tag="b" size="large">修改用户信息</el-text>
            </el-menu-item>
            <el-menu-item index="2">
              <el-text tag="b" size="large">修改头像</el-text>
            </el-menu-item>
            <el-menu-item index="3">
              <el-text tag="b" size="large">修改邮箱</el-text>
            </el-menu-item>
            <el-menu-item index="4">
              <el-text tag="b" size="large">修改密码</el-text>
            </el-menu-item>
            <el-menu-item index="5">
              <el-text tag="b" size="large">修改E5订阅信息</el-text>
            </el-menu-item>
          </el-menu>
        </el-card>
      </el-scrollbar>
    </el-aside>
    <el-main class="setting-main">
      <el-scrollbar>
        <!-- 修改用户信息 -->
        <el-card ref="editUserInfoCard" class="setting-card" shadow="hover">
          <el-form :model="userInfoForm" label-width="120px">
            <el-form-item label="昵称" prop="nickname">
              <el-input
                v-model="userInfoForm.nickname"
                placeholder="请输入昵称"
              ></el-input>
            </el-form-item>
            <el-form-item label="联系信息" prop="contactInfo">
              <el-input
                v-model="userInfoForm.contactInfo"
                placeholder="请输入联系信息"
              ></el-input>
            </el-form-item>
            <el-form-item label="简介" prop="bio">
              <el-input
                v-model="userInfoForm.bio"
                type="textarea"
                placeholder="请输入简介"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitUserInfo">保存</el-button>
            </el-form-item>
          </el-form>
        </el-card>

        <!-- 修改头像 -->
        <el-card ref="editAvatarCard" class="setting-card" shadow="hover">
          <!-- <el-upload
            class="avatar-uploader"
            action="/user/avatar"
            :headers="{ Authorization: 'Bearer ' + token }"
            :before-upload="beforeAvatarUpload"
            :show-file-list="false"
          >
            <img v-if="avatarUrl" :src="avatarUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload> -->
        </el-card>

        <!-- 修改邮箱 -->
        <el-card ref="editEmailCard" class="setting-card" shadow="hover">
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

        <!-- 修改密码 -->
        <el-card ref="editPasswordCard" class="setting-card" shadow="hover">
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

        <!-- 修改E5订阅信息 -->
        <el-card
          ref="editE5SubscriptionCard"
          class="setting-card"
          shadow="hover"
        >
          <el-form :model="e5SubscriptionForm" label-width="120px">
            <el-form-item label="订阅开始日期" prop="subscriptionDate">
              <el-date-picker
                v-model="e5SubscriptionForm.subscriptionDate"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="订阅到期日期" prop="expirationDate">
              <el-date-picker
                v-model="e5SubscriptionForm.expirationDate"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitE5Subscription"
                >保存</el-button
              >
            </el-form-item>
          </el-form>
        </el-card>
      </el-scrollbar>
    </el-main>
  </el-container>
</template>

<style lang="scss" scoped>
.setting-tab {
  margin: 10px 5px 10px 20px;
  border-radius: 20px;
  :deep() {
    .el-card__body {
      padding: 30px 0;
    }
  }
  .el-menu {
    border-right: none;
    :deep() {
      .is-active {
        background-color: #ecf5ff;
      }
    }
  }
}

.setting-main {
  padding: 0;
  height: 100vh;
}

.setting-card {
  margin: 10px 20px 10px 5px;
  padding: 10px;
  border-radius: 20px;
}
</style>
