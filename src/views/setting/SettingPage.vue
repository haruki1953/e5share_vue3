<script setup>
import { ref, nextTick } from 'vue'
import ProfileCard from './components/ProfileCard.vue'
import AvatarCard from './components/AvatarCard.vue'
import EmailCard from './components/EmailCard.vue'
import PasswordCard from './components/PasswordCard.vue'
import E5Card from './components/E5Card.vue'
import { contactInfo, friendshipLinks } from '@/config'

const editProfileCard = ref()
const editAvatarCard = ref()
const editEmailCard = ref()
const editPasswordCard = ref()
const editE5Card = ref()

// 设置菜单项的活动状态
const activeMenuItem = ref('1')

// scrollToCard 函数，根据传入卡片的引用名称进行滚动
const scrollToCard = (refName) => {
  nextTick(() => {
    const cardRef = eval(refName)
    if (cardRef && cardRef.value) {
      // 如果卡片引用存在且不为 null，则执行滚动
      cardRef.value.$el.scrollIntoView({ behavior: 'smooth' })
    }
  })
}

// 设置菜单项的活动状态
const setActiveMenuItem = (index) => {
  activeMenuItem.value = index
}
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
            <el-menu-item index="1" @click="scrollToCard('editProfileCard')">
              <el-text tag="b" size="large">修改用户信息</el-text>
            </el-menu-item>
            <el-menu-item index="2" @click="scrollToCard('editAvatarCard')">
              <el-text tag="b" size="large">修改头像</el-text>
            </el-menu-item>
            <el-menu-item index="3" @click="scrollToCard('editEmailCard')">
              <el-text tag="b" size="large">修改邮箱</el-text>
            </el-menu-item>
            <el-menu-item index="4" @click="scrollToCard('editPasswordCard')">
              <el-text tag="b" size="large">修改密码</el-text>
            </el-menu-item>
            <el-menu-item index="5" @click="scrollToCard('editE5Card')">
              <el-text tag="b" size="large">修改E5订阅信息</el-text>
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
      <el-scrollbar>
        <!-- 修改用户信息 -->
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
        ></e5-card>
      </el-scrollbar>
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
        background-color: #ecf5ff;
      }
    }
  }
}

.links-card {
  margin: 10px 5px 10px 20px;
  border-radius: 20px;
}

.setting-main {
  padding: 0;
}

.setting-card {
  margin: 10px 20px 20px 5px;
  border-radius: 20px;
}
</style>
