<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUsersStore, useProfileStore } from '@/stores'
import { accountStatus } from '@/config'
import { formatDate, formatTime } from '@/utils/timeUtils'

const route = useRoute()
const usersStore = useUsersStore()
const profileStore = useProfileStore()

// 根据路由参数获取用户数据
const user = computed(() => {
  const userId = Number(route.params.id)
  if (isNaN(userId)) {
    return null
  }
  return usersStore.findUserById(userId)
})

// 是否显示申请按钮，当前用户状态为分享 && 当前用户未帮助登录用户 && 当前用户非登录用户
const shouldDisplayApplyButton = computed(() => {
  if (
    user.value.account_status === accountStatus.sharing &&
    !user.value.helping_users.includes(profileStore.user.id) &&
    user.value.id !== profileStore.user.id
  ) {
    return true
  }
  return false
})

// 是否显示查看分享信息按钮，当前用户为登录用户 || 当前用户正在被登录用户帮助
const shouldDisplayShareInfoButton = computed(() => {
  if (
    user.value.id === profileStore.user.id ||
    user.value.helped_by_users.includes(profileStore.user.id)
  ) {
    return true
  }
  return false
})
</script>
<template>
  <el-scrollbar>
    <el-card v-if="user" class="userinfo-card">
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
            <el-link type="info" :underline="false">
              @{{ user.username }}
            </el-link>
          </el-row>
        </div>

        <div class="e5info-botton">
          <div class="button-box">
            <div class="button-col">
              <el-button
                v-if="shouldDisplayApplyButton"
                type="primary"
                size="large"
              >
                向TA申请E5账号
              </el-button>
              <el-button
                v-if="shouldDisplayShareInfoButton"
                type="primary"
                size="large"
                @click="$router.push('/share')"
              >
                查看分享信息
              </el-button>
            </div>
          </div>
          <e5sharing-progress :user="user"></e5sharing-progress>
        </div>
      </el-row>
      <el-row>
        <el-col :lg="15" class="col-info">
          <el-row
            class="row-info"
            v-if="user.account_status === accountStatus.sharing"
          >
            <el-col :span="12">
              <el-text tag="b" size="large"> e5订阅开始日： </el-text>
              <el-text type="info" size="large">
                {{ formatDate(user.e5_subscription_date) }}
              </el-text>
            </el-col>
            <el-col :span="12">
              <el-text tag="b" size="large"> e5订阅结束日： </el-text>
              <el-text type="info" size="large">
                {{ formatDate(user.e5_expiration_date) }}
              </el-text>
            </el-col>
          </el-row>
          <el-row class="row-info">
            <el-col :span="12">
              <el-text tag="b" size="large"> 注册时间： </el-text>
              <el-text type="info" size="large">
                {{ formatTime(user.registered_at) }}
              </el-text>
            </el-col>
            <el-col :span="12">
              <el-text tag="b" size="large"> 上次登录： </el-text>
              <el-text type="info" size="large">
                {{ formatTime(user.last_login) }}
              </el-text>
            </el-col>
          </el-row>
          <el-row class="row-info">
            <el-text tag="b" size="large"> 简介： </el-text>
            <el-text class="text-info" type="info" size="large">
              {{ user.bio || '无' }}
            </el-text>
          </el-row>
          <el-row class="row-info">
            <el-text tag="b" size="large"> 联系方式： </el-text>
            <el-text class="text-info" type="info" size="large">
              {{ user.contact_info || '无' }}
            </el-text>
          </el-row>
        </el-col>
        <el-col :lg="9" class="col-list">
          <el-scrollbar max-height="800px">
            <el-row class="row-list">
              <el-divider content-position="left">
                <el-text
                  tag="b"
                  type="primary"
                  v-if="user.helping_users.length"
                >
                  TA正在帮助 {{ user.helping_users.length }} 人
                </el-text>
                <el-text tag="b" type="primary" v-else>
                  没有人正在被TA帮助
                </el-text>
              </el-divider>
              <related-users :userIds="user.helping_users"></related-users>
            </el-row>
            <el-row class="row-list">
              <el-divider content-position="left">
                <el-text
                  tag="b"
                  type="success"
                  v-if="user.helping_by_users.length"
                >
                  {{ user.helping_by_users.length }} 人正在帮助TA
                </el-text>
                <el-text tag="b" type="success" v-else>
                  没有人正在帮助TA
                </el-text>
              </el-divider>
              <related-users :userIds="user.helping_by_users"></related-users>
            </el-row>
            <el-row class="row-list">
              <el-divider content-position="left">
                <el-text tag="b" type="primary" v-if="user.helped_users.length">
                  TA帮助过 {{ user.helped_users.length }} 人
                </el-text>
                <el-text tag="b" type="primary" v-else>
                  没有人被TA帮助过
                </el-text>
              </el-divider>
              <related-users :userIds="user.helped_users"></related-users>
            </el-row>
            <el-row class="row-list">
              <el-divider content-position="left">
                <el-text
                  tag="b"
                  type="success"
                  v-if="user.helped_by_users.length"
                >
                  {{ user.helped_by_users.length }} 人帮助过TA
                </el-text>
                <el-text tag="b" type="success" v-else>
                  没有人帮助过TA
                </el-text>
              </el-divider>
              <related-users :userIds="user.helped_by_users"></related-users>
            </el-row>
          </el-scrollbar>
        </el-col>
      </el-row>
    </el-card>
    <el-empty v-else description="用户不存在">
      <el-button type="primary" size="large" @click="$router.push('/home')">
        返回首页
      </el-button>
    </el-empty>
  </el-scrollbar>
</template>

<style lang="scss" scoped>
.userinfo-card {
  margin: 10px 20px;
  padding: 10px;
  border-radius: 20px;
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
  .row-info {
    margin-top: 20px;
    .text-info {
      white-space: pre-line;
    }
  }

  .el-divider {
    margin: 50px 0 15px 0;
  }
}
</style>
