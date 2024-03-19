<script setup>
import { computed } from 'vue'
import { useUsersStore, useProfileStore } from '@/stores'
import { accountStatus } from '@/config'

const usersStore = useUsersStore()
const profileStore = useProfileStore()

// 要显示的数据，帮助自己的用户列表
const helpingByUsers = computed(() => {
  return usersStore.filterUsersByIds(profileStore.user.helping_by_users)
})

// 用户信息
const user = computed(() => {
  return profileStore.user
})
</script>

<template>
  <el-scrollbar>
    <!-- E5分享管理栏 -->
    <el-card
      class="e5manage-card"
      v-if="profileStore.user.account_status === accountStatus.sharing"
    >
      <template #header>
        <div class="header-box">
          <el-text tag="b" size="large" type="primary"> 您正在分享： </el-text>
          <div class="header-button">
            <el-button type="primary" round> 说明 / 注销分享 </el-button>
          </div>
        </div>
      </template>
      <el-row class="user-e5">
        <div>
          <el-row class="user-avatar">
            <div>
              <el-avatar :size="80" :src="user.avatar" />
            </div>
            <div class="tag-box">
              <aboutme-tag :user="user"></aboutme-tag>
            </div>
          </el-row>
          <el-row>
            <el-text size="large" tag="b">{{ user.nickname }}</el-text>
          </el-row>
          <el-row>
            <el-link
              type="info"
              :underline="false"
              @click="$router.push(`/user/${user.id}`)"
            >
              @{{ user.username }}
            </el-link>
          </el-row>
        </div>

        <div class="e5info-botton">
          <div class="button-box">
            <div class="button-col">
              <el-button
                type="primary"
                size="large"
                @click="$router.push('/setting')"
              >
                修改E5订阅信息
              </el-button>
            </div>
          </div>
          <e5sharing-progress :user="user"></e5sharing-progress>
        </div>
      </el-row>
      <div class="helping-table"></div>
    </el-card>
    <el-card class="e5manage-card" v-else>
      <div class="header-box">
        <el-text tag="b" size="large" type="primary"> 您还未开始分享 </el-text>
        <div class="header-button">
          <el-button type="primary" round> 说明 / 登记分享 </el-button>
        </div>
      </div>
    </el-card>

    <!-- 用户卡片容器 -->
    <usercard-container :dataList="helpingByUsers"></usercard-container>
  </el-scrollbar>
</template>

<style lang="scss" scoped>
.e5manage-card {
  margin: 10px 20px;
  border-radius: 20px;
  :deep() {
    .el-card__body {
      padding: 30px;
    }
  }
  .header-box {
    display: flex;
    justify-content: space-between;
  }
  .user-e5 {
    margin-left: 5px;
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap; /* 不换行 */
    .user-avatar {
      display: flex;
      flex-wrap: nowrap; /* 不换行 */
      margin: 4px 0;
      .tag-box {
        height: 80px;
        display: flex;
        align-items: center;
        margin: 0 20px;
      }
    }
    .e5info-botton {
      display: flex;
      // flex-wrap: nowrap; /* 不换行 */
      .button-box {
        height: 126px;
        display: flex;
        align-items: center;
        margin: 0 20px;
        .button-col {
          display: flex;
          flex-direction: column;
          .el-button {
            margin: 3px;
          }
        }
      }
    }
  }
}
</style>
