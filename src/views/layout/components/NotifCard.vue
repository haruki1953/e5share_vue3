<script setup>
import { computed } from 'vue'
import {
  Setting,
  ChatDotRound,
  CircleCheck,
  CircleClose,
  More
} from '@element-plus/icons-vue'
import { notificationType } from '@/config'
import { useProfileStore, useShareStore, useUsersStore } from '@/stores'
import { formatTime } from '@/utils/timeUtils'

const props = defineProps({
  // 通知对象
  notif: {
    required: true,
    type: Object
  },
  // 是否为 重要
  important: {
    type: Boolean,
    default: false
  }
})

// 添加分享事件 shareAdd、确认分享事件shareConfirm
const emit = defineEmits(['shareAdd', 'shareConfirm'])

// 用户列表
const usersStore = useUsersStore()
// 获取相关用户
const otherUser = computed(() => {
  if (props.notif?.otherInfo.otherUserId) {
    return usersStore.findUserForShow(props.notif.otherInfo.otherUserId)
  }
  return null
})

// 获取通知时间
const notifTime = computed(() => formatTime(props.notif.time))

// 通知类型
const notifType = computed(() => {
  switch (props.notif.type) {
    case notificationType.system:
      return '系统通知'
    case notificationType.e5_share_application:
      return 'e5分享申请通知'
    case notificationType.e5_share_confirmation:
      return 'e5分享确认通知'
    case notificationType.e5_share_completion:
      return 'e5分享完成通知'
    case notificationType.e5_share_closure:
      return 'e5分享注销通知'
    case notificationType.e5_share_sharer_stop:
      return 'e5账号主停止分享通知'
    case notificationType.e5_share_receiver_stop:
      return '用户停止接受分享通知'
    default:
      return '其他通知'
  }
})

// 根据通知类型返回相应的图标组件
const notifIcon = computed(() => {
  switch (props.notif.type) {
    case notificationType.system:
      return Setting // 设置图标
    case notificationType.e5_share_application:
      return ChatDotRound // 聊天图标
    case notificationType.e5_share_confirmation:
    case notificationType.e5_share_completion:
      return CircleCheck // 圆圈勾选图标
    case notificationType.e5_share_sharer_stop:
    case notificationType.e5_share_receiver_stop:
    case notificationType.e5_share_closure:
      return CircleClose // 圆圈关闭图标
    default:
      return More // 其他通知图标
  }
})

// 通知内容
const notifContent = computed(() => {
  switch (props.notif.type) {
    case notificationType.system:
      return props.notif.content
    case notificationType.e5_share_application:
      return `${otherUser.value.nickname} 向您申请获取e5子账号的分享`
    case notificationType.e5_share_confirmation:
      return `您正在接受 ${otherUser.value.nickname} 的分享吗，请确认`
    case notificationType.e5_share_completion:
      return `${otherUser.value.nickname} 已确认接受您的分享`
    case notificationType.e5_share_closure:
      return `${otherUser.value.nickname} 已取消其e5账号的分享`
    case notificationType.e5_share_sharer_stop:
      return `${otherUser.value.nickname} 已取消对您的分享`
    case notificationType.e5_share_receiver_stop:
      return `${otherUser.value.nickname} 已停止接受您的分享`
    default:
      return props.notif.content
  }
})

const shareStore = useShareStore()
// 是否已添加
const isAdded = computed(() => {
  return shareStore.findShareInfoByUserId(otherUser.value.id)
})

const profileStore = useProfileStore()
// 是否已确认
const isConfirmed = computed(() => {
  return otherUser.value?.helping_users.includes(profileStore.user.id)
})

// 是否已读
const isRead = computed(() => {
  return profileStore.isNotifRead(props.notif.id)
})
</script>

<template>
  <el-card shadow="hover">
    <template #header>
      <div class="header">
        <el-badge
          value="important"
          type="danger"
          v-if="important"
          @mouseenter="profileStore.markNotifAsRead(notif.id)"
        >
          <el-text tag="h1" size="large">{{ notifType }}</el-text>
        </el-badge>
        <el-badge
          value="new"
          type="primary"
          v-else-if="!isRead"
          @mouseenter="profileStore.markNotifAsRead(notif.id)"
        >
          <el-text tag="h1" size="large">{{ notifType }}</el-text>
        </el-badge>
        <el-text tag="h1" size="large" v-else>{{ notifType }}</el-text>
        <el-text type="info" size="small">{{ notifTime }}</el-text>
      </div>
    </template>
    <div class="content-button">
      <div class="icon-text">
        <el-icon :size="20">
          <!-- 根据通知类型显示不同的图标 -->
          <component :is="notifIcon" />
        </el-icon>
        <div>
          <el-text size="large"> {{ notifContent }} </el-text>
        </div>
      </div>
      <div>
        <!-- 按钮 根据通知类型显示 -->
        <div v-if="notif.type === notificationType.e5_share_application">
          <el-button type="primary" disabled v-if="isAdded"> 已添加 </el-button>
          <el-button
            type="primary"
            @click="emit('shareAdd', otherUser.id)"
            v-else
          >
            加入分享管理
          </el-button>
        </div>
        <div v-else-if="notif.type === notificationType.e5_share_confirmation">
          <el-button type="primary" disabled v-if="isConfirmed">
            分享已完成
          </el-button>
          <el-button
            type="primary"
            @click="emit('shareConfirm', otherUser.id)"
            v-else
          >
            确认
          </el-button>
        </div>
      </div>
    </div>

    <!-- 关联用户 留言 -->
    <el-container v-if="otherUser" class="user-container">
      <el-aside width="100px">
        <el-row class="user-avatar">
          <el-avatar :src="otherUser.avatar" />
        </el-row>
        <el-row>
          <el-text tag="b">{{ otherUser.nickname }}</el-text>
        </el-row>
        <el-row>
          <el-link
            type="info"
            :underline="false"
            @click="$router.push(`/user/${otherUser.id}`)"
          >
            @{{ otherUser.username }}
          </el-link>
        </el-row>
      </el-aside>
      <el-main>
        <div>
          <el-text tag="b">留言： </el-text>
          <div>
            <el-popover effect="light" trigger="click" width="300px">
              <template #reference>
                <el-text type="info" class="notif-message" line-clamp="9">
                  {{ notif.content || '无' }}
                </el-text>
              </template>
              {{ notif.content || '无' }}
            </el-popover>
          </div>
        </div>
      </el-main>
    </el-container>
  </el-card>
</template>

<style lang="scss" scoped>
.el-badge {
  :deep() {
    .el-badge__content {
      font-style: normal;
      line-height: 18px;
    }
  }
}

.el-card {
  border-radius: 15px;
  margin-bottom: 20px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .content-button {
    height: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon-text {
      display: flex;
      align-items: center;
      margin-right: 20px;
      .el-icon {
        margin-right: 10px;
      }
      .el-text {
        line-height: 20px;
      }
    }
  }
  .user-container {
    margin-top: 15px;
    .user-avatar {
      margin: 0 0 5px 5px;
    }
    .el-main {
      display: flex;
      align-items: center;
      padding: 0 20px;
    }
  }
  .notif-message {
    white-space: pre-line;
  }
}
</style>
