<script setup>
import 'element-plus/theme-chalk/display.css'
import { ref, nextTick, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ProfileCard from './components/ProfileCard.vue'
import AvatarCard from './components/AvatarCard.vue'
import EmailCard from './components/EmailCard.vue'
import PasswordCard from './components/PasswordCard.vue'
import E5Card from './components/E5Card.vue'
import { contactInfo, friendshipLinks, accountStatus } from '@/config'
import { useProfileStore } from '@/stores'

const editProfileCard = ref()
const editAvatarCard = ref()
const editEmailCard = ref()
const editPasswordCard = ref()
const editE5Card = ref()

const profileStore = useProfileStore()
// 预览用户信息
const previewUser = computed(() => {
  const user = { ...profileStore.user }
  // 通过 ref 访问子组件中暴露的属性
  // 基本信息
  const profileForm = editProfileCard.value?.profileForm
  if (profileForm) {
    user.nickname = profileForm.nickname
    user.contact_info = profileForm.contactInfo
    user.bio = profileForm.bio
  }
  // 头像
  const avatarUrl = editAvatarCard.value?.avatarUrl
  if (avatarUrl) {
    user.avatar = avatarUrl
  }
  // e5订阅日期
  const e5Form = editE5Card.value?.e5Form
  if (e5Form) {
    user.e5_subscription_date = e5Form.subscriptionDate
    user.e5_expiration_date = e5Form.expirationDate
  }
  return user
})

// 设置菜单项的活动状态
const activeMenuItem = ref('1')

// scrollToCard 函数，根据传入卡片的引用进行滚动
const scrollToCard = (cardRef) => {
  nextTick(() => {
    if (cardRef) {
      // 如果卡片引用存在，则执行滚动
      cardRef.$el.scrollIntoView({ behavior: 'smooth' })
    }
  })
}

// 设置菜单项的活动状态
const setActiveMenuItem = (index) => {
  activeMenuItem.value = index
}

const route = useRoute()
onMounted(() => {
  // 判断参数，滚动至对应卡片
  switch (route.query.setting) {
    case 'e5':
      scrollToCard(editE5Card.value)
      setActiveMenuItem(5)
      break
  }
})
</script>

<template>
  <el-container>
    <el-aside>
      <el-scrollbar>
        <el-card class="setting-tab" shadow="hover">
          <template #header>
            <el-text tag="b" size="large" type="primary"> 设置 </el-text>
          </template>
          <el-menu :default-active="activeMenuItem">
            <!-- 根据卡片引用对象中的键值来触发滚动 -->
            <el-menu-item index="1" @click="scrollToCard(editProfileCard)">
              <el-text tag="b" size="large"> 修改基本信息 </el-text>
            </el-menu-item>
            <el-menu-item index="2" @click="scrollToCard(editAvatarCard)">
              <el-text tag="b" size="large"> 修改头像 </el-text>
            </el-menu-item>
            <el-menu-item index="3" @click="scrollToCard(editEmailCard)">
              <el-text tag="b" size="large"> 修改邮箱 </el-text>
            </el-menu-item>
            <el-menu-item index="4" @click="scrollToCard(editPasswordCard)">
              <el-text tag="b" size="large"> 修改密码 </el-text>
            </el-menu-item>
            <el-menu-item
              index="5"
              @click="scrollToCard(editE5Card)"
              :disabled="
                profileStore.user.account_status !== accountStatus.sharing
              "
            >
              <el-text tag="b" size="large"> 修改E5订阅信息 </el-text>
            </el-menu-item>
            <el-menu-item @click="$router.push('/share')">
              <el-text tag="b" size="large"> E5分享管理 </el-text>
            </el-menu-item>
          </el-menu>
        </el-card>
        <!-- 联系方式卡片 -->
        <links-card
          :dataObj="contactInfo"
          title="联系方式 | 交流讨论 | 问题反馈"
          class="links-card"
        ></links-card>
        <!-- 友情链接 -->
        <links-card
          :dataObj="friendshipLinks"
          title="广告位（bushi）"
          class="links-card"
        ></links-card>
      </el-scrollbar>
    </el-aside>
    <el-main class="setting-main">
      <el-row>
        <el-col :lg="14" class="setting-col">
          <el-scrollbar>
            <!-- 预览卡片 小屏时显示在顶部 -->
            <user-card
              :user="previewUser"
              class="setting-card hidden-lg-and-up"
            ></user-card>

            <!-- 修改基本信息 -->
            <profile-card
              ref="editProfileCard"
              class="setting-card"
              @mouseenter="setActiveMenuItem('1')"
            ></profile-card>

            <!-- 修改头像 -->
            <avatar-card
              ref="editAvatarCard"
              class="setting-card"
              @mouseenter="setActiveMenuItem('2')"
            ></avatar-card>

            <!-- 修改邮箱 -->
            <email-card
              ref="editEmailCard"
              class="setting-card"
              @mouseenter="setActiveMenuItem('3')"
            ></email-card>

            <!-- 修改密码 -->
            <password-card
              ref="editPasswordCard"
              class="setting-card"
              @mouseenter="setActiveMenuItem('4')"
            ></password-card>

            <!-- 修改E5订阅信息 -->
            <e5-card
              ref="editE5Card"
              class="setting-card"
              @mouseenter="setActiveMenuItem('5')"
              v-if="profileStore.user.account_status === accountStatus.sharing"
            ></e5-card>
          </el-scrollbar>
        </el-col>
        <!-- 预览卡片 大屏时显示在右侧 -->
        <el-col :span="10" class="user-col hidden-md-and-down">
          <el-scrollbar>
            <user-card :user="previewUser" class="user-card"></user-card>
          </el-scrollbar>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<style lang="scss" scoped>
.el-container {
  height: 100vh;
}

.setting-tab {
  margin: 10px 5px 10px 20px;
  border-radius: 20px;
  :deep() {
    .el-card__body {
      padding: 0;
    }
  }
  .el-menu {
    border-right: none;
    :deep() {
      .is-active {
        background-color: #d9ecff;
      }
    }
  }
}

.links-card {
  margin: 10px 5px 10px 20px;
  border-radius: 20px;
}

.setting-main {
  padding: 0 15px 0 0;
  .setting-col {
    height: 100vh;
    .setting-card {
      margin: 10px 5px 20px 5px;
      border-radius: 20px;
    }
  }
  .user-col {
    height: 100vh;
    .user-card {
      margin: 10px 5px 20px 5px;
    }
  }
}
</style>
