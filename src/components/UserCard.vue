<script setup>
import { computed } from 'vue'
import { formatDate } from '@/utils/timeUtils'
import { accountStatus } from '@/config'
const props = defineProps({
  // 要展示的用户对象
  user: {
    required: true,
    type: Object
  }
})

// e5订阅开始日与结束日
const e5subscriptionDate = computed(() =>
  formatDate(props.user.e5_subscription_date)
)
const e5expirationDate = computed(() =>
  formatDate(props.user.e5_expiration_date)
)
</script>

<template>
  <el-card shadow="hover" @click="$router.push(`/user/${user.id}`)">
    <el-row class="user-e5">
      <div>
        <el-row class="user-avatar">
          <div>
            <el-avatar :size="64" :src="user.avatar" />
          </div>
          <div class="tag-box">
            <aboutme-tag :user="user"></aboutme-tag>
          </div>
        </el-row>
        <el-row>
          <el-text tag="b">
            {{ user.nickname }}
          </el-text>
        </el-row>
        <el-row>
          <el-link type="info" :underline="false">
            @{{ user.username }}
          </el-link>
        </el-row>
      </div>

      <e5sharing-progress :user="user"></e5sharing-progress>
    </el-row>
    <el-row class="row-info" v-if="user.bio">
      <el-text tag="b"> 简介： </el-text>
      <el-text class="text-info" type="info" line-clamp="5">
        {{ user.bio }}
      </el-text>
    </el-row>
    <el-row class="row-info" v-if="user.contact_info">
      <el-text tag="b"> 联系方式： </el-text>
      <el-text class="text-info" type="info" line-clamp="5">
        {{ user.contact_info }}
      </el-text>
    </el-row>
    <div v-if="user.account_status === accountStatus.sharing">
      <el-row class="row-info">
        <el-col :span="12">
          <el-text tag="b"> E5订阅开始日： </el-text>
          <el-text type="info"> {{ e5subscriptionDate }} </el-text>
        </el-col>
        <el-col :span="12">
          <el-text tag="b"> E5订阅结束日： </el-text>
          <el-text type="info"> {{ e5expirationDate }} </el-text>
        </el-col>
      </el-row>
      <el-divider content-position="left">
        <el-text tag="b" type="primary" v-if="user.helping_users.length">
          正在帮助 {{ user.helping_users.length }} 人
        </el-text>
        <el-text tag="b" type="primary" v-else> 还没有帮助 </el-text>
      </el-divider>
      <related-users :userIds="user.helping_users"></related-users>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.el-card {
  border-radius: 15px;
  .user-e5 {
    height: 126px;
    margin-left: 5px;
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap; /* 不换行 */
    .user-avatar {
      display: flex;
      flex-wrap: nowrap; /* 不换行 */
      margin: 4px 0;
      .tag-box {
        height: 64px;
        display: flex;
        align-items: center;
        margin: 0 10px;
      }
    }
  }
  .row-info {
    margin-top: 12px;
    .text-info {
      white-space: pre-line;
    }
  }
  .el-divider {
    margin-top: 24px;
  }
}
</style>
