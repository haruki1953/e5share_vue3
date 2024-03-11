<script setup>
import { computed } from 'vue'
import { formatDate } from '@/utils/timeUtils'
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
      <el-col :span="14">
        <el-row class="user-avatar">
          <el-col :span="10">
            <el-avatar :size="64" :src="user.avatar" />
          </el-col>
          <el-col :span="14" class="tag-box">
            <aboutme-tag :user="user"></aboutme-tag>
          </el-col>
        </el-row>
        <el-row>
          <el-text tag="b">{{ user.nickname }}</el-text>
        </el-row>
        <el-row>
          <el-link type="info" :underline="false">
            @{{ user.username }}
          </el-link>
        </el-row>
      </el-col>
      <el-col :span="10" class="progress-container">
        <e5sharing-progress :user="user"></e5sharing-progress>
      </el-col>
    </el-row>
    <el-row class="row-bio" v-if="user.bio">
      <el-text tag="b"> 简介： </el-text>
      <el-text type="info">
        {{ user.bio }}
      </el-text>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-text tag="b"> e5订阅开始日： </el-text>
        <el-text type="info">{{ e5subscriptionDate }}</el-text>
      </el-col>
      <el-col :span="12">
        <el-text tag="b"> e5订阅结束日： </el-text>
        <el-text type="info">{{ e5expirationDate }}</el-text>
      </el-col>
    </el-row>
    <el-divider content-position="left">
      <el-text tag="b" type="primary" v-if="user.helping_users.length"
        >正在帮助 {{ user.helping_users.length }} 人</el-text
      >
      <el-text tag="b" type="primary" v-else>还没有帮助</el-text>
    </el-divider>
    <related-users :userIds="user.helping_users"></related-users>
  </el-card>
</template>

<style lang="scss" scoped>
.el-card {
  border-radius: 15px;
  margin: 0 20px 20px 0;
  .user-e5 {
    margin: 0 0 6px 5px;
    .user-avatar {
      margin: 4px 0;
    }
    .tag-box {
      display: flex;
      align-items: center;
    }
    .progress-container {
      display: flex;
      justify-content: flex-end;
    }
  }
  .row-bio {
    margin-bottom: 12px;
  }
  .el-divider {
    margin: 25px 0;
  }
}
</style>
