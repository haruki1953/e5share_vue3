<script setup>
import { computed } from 'vue'
import { formatDate } from '@/utils/timeUtils'
import { useProfileStore, useUsersStore } from '@/stores'
const props = defineProps({
  // 要展示的用户对象
  user: {
    required: true,
    type: Object
  },
  // 自己的信息 选填 默认为null
  myProfile: {
    type: Object,
    default: null
  }
})

// 通过开始日期与结束日期，返回进度信息对象
// 包含：进度值（100为满）、剩余天数、总天数、开始日期与结束日期字符串、状态
const progressInfo = computed(() => {
  const startDate = new Date(props.user.e5_subscription_date)
  const endDate = new Date(props.user.e5_expiration_date)

  const totalDays = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24))
  const remainingDays = Math.round(
    (endDate - new Date()) / (1000 * 60 * 60 * 24)
  )
  const progress = Math.min(
    ((totalDays - remainingDays) / totalDays) * 100,
    100
  )

  // 状态 剩余天数大于10时为空，小于时为warning，为小于等于0时为exception
  let status = '' // 默认为空状态
  if (remainingDays <= 10 && remainingDays > 0) {
    status = 'warning' // 警告状态
  } else if (remainingDays <= 0) {
    status = 'exception' // 异常状态
  }

  return {
    progress: progress,
    remainingDays: remainingDays,
    totalDays: totalDays,
    startDate: formatDate(props.user.e5_subscription_date),
    endDate: formatDate(props.user.e5_expiration_date),
    status
  }
})

// 关于自己的信息
const profileStore = useProfileStore()
// 辅助函数，用于检查数组是否存在并包含指定的值
const isInArray = (array, value) => {
  return Array.isArray(array) && array.includes(value)
}
// 是否正在被当前用户帮助
const isHelpingByThisUser = computed(() => {
  return isInArray(profileStore.user?.helping_by_users, props.user.id)
})
// 是否正在帮助当前用户
const isHelpingThisUser = computed(() => {
  return isInArray(profileStore.user?.helping_users, props.user.id)
})
// 当前用户是否为自己
const isMyself = computed(() => {
  return profileStore.user?.id === props.user.id
})

const usersStore = useUsersStore()
// 正在帮助的用户列表
const helpingUsers = computed(() => {
  // 根据数组 user.helping_users: [6] ，通过usersStore.findUserById获取用户对象
  return props.user.helping_users.map((userId) =>
    usersStore.findUserById(userId)
  )
})
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
            <div>
              <el-tag type="success" v-if="isHelpingByThisUser"
                >您正在被TA帮助</el-tag
              >
              <el-tag type="primary" v-if="isHelpingThisUser"
                >您正在帮助TA</el-tag
              >
              <el-tag type="info" v-if="isMyself">您的分享</el-tag>
            </div>
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
        <el-progress
          type="circle"
          :percentage="progressInfo.progress"
          :status="progressInfo.status"
        >
          <div v-if="progressInfo.status === 'exception'">
            <el-text size="large">已过期</el-text>
          </div>
          <div v-else>
            <span class="percentage-value"
              >{{ progressInfo.remainingDays }}/<el-text size="small">{{
                progressInfo.totalDays
              }}</el-text>
            </span>
            <el-text class="percentage-label">剩余天数</el-text>
          </div>
        </el-progress>
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
        <el-text type="info">{{ progressInfo.startDate }}</el-text>
      </el-col>
      <el-col :span="12">
        <el-text tag="b"> e5订阅结束日： </el-text>
        <el-text type="info">{{ progressInfo.endDate }}</el-text>
      </el-col>
    </el-row>
    <el-divider content-position="left">
      <el-text tag="b" type="primary" v-if="helpingUsers.length"
        >正在帮助 {{ helpingUsers.length }} 人</el-text
      >
      <el-text tag="b" type="primary" v-else>还没有帮助</el-text>
    </el-divider>
    <div class="helping-container">
      <div v-for="helpingUser in helpingUsers" :key="helpingUser.id">
        <el-row class="helping-user">
          <el-avatar :src="helpingUser.avatar" />
          <el-text tag="b">{{ helpingUser.nickname }}</el-text>
          <el-link
            type="info"
            :underline="false"
            @click.stop="$router.push(`/user/${helpingUser.id}`)"
            >@{{ helpingUser.username }}</el-link
          >
        </el-row>
      </div>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.el-card {
  border-radius: 15px;
  margin: 0 20px 20px 0;
  .user-e5 {
    margin: 0 0 6px 5px;
    .user-avatar {
      margin: 4px 0px 8px 0;
    }
    .tag-box {
      display: flex;
      align-items: center;
    }
    .progress-container {
      display: flex;
      justify-content: flex-end;
      .percentage-value {
        display: block;
        margin-top: 10px;
        font-size: 28px;
      }
      .percentage-label {
        display: block;
        margin-top: 10px;
        font-size: 12px;
      }
    }
  }
  .row-bio {
    margin-bottom: 12px;
  }
  .el-divider {
    margin: 25px 0;
  }
  .helping-container {
    margin: 0 10px;
    .helping-user {
      margin-bottom: 6px;
      .el-avatar {
        margin-right: 10px;
      }
      .el-text {
        margin-right: 10px;
      }
    }
  }
}
</style>
