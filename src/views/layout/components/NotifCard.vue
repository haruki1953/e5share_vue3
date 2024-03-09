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
import { useUsersStore } from '@/stores'
import { formatTime } from '@/utils/timeUtils'

const props = defineProps({
  notif: {
    required: true,
    type: Object
  }
})

// 用户列表
const usersStore = useUsersStore()

// 获取相关用户
const otherUser = computed(() => {
  if (props.notif?.otherInfo.otherUserId) {
    return usersStore.findUserById(props.notif.otherInfo.otherUserId)
  }
  return null
})

// 获取通知时间
const notifTime = computed(() => formatTime(props.notif.time))
</script>

<template>
  <!-- 系统通知 -->
  <el-card v-if="notif.type === notificationType.system" shadow="hover">
    <el-descriptions :title="'系统通知'" :column="3">
      <el-descriptions-item span="1">
        <el-text type="info" size="small">{{ notifTime }}</el-text>
      </el-descriptions-item>
      <el-descriptions-item span="2">
        <template #label>
          <el-icon :size="20"><Setting /></el-icon>
        </template>
        <el-text size="large">{{ notif.content }}</el-text>
      </el-descriptions-item>
    </el-descriptions>
  </el-card>
  <!-- e5分享申请通知 -->
  <el-card
    v-else-if="notif.type === notificationType.e5_share_application"
    shadow="hover"
  >
    <el-descriptions :title="'e5分享申请通知'" :column="3">
      <template #extra>
        <el-button type="primary">加入分享管理</el-button>
      </template>
      <el-descriptions-item span="1">
        <el-text type="info" size="small">{{ notifTime }}</el-text>
      </el-descriptions-item>
      <el-descriptions-item span="2">
        <template #label>
          <el-icon :size="20"><ChatDotRound /></el-icon>
        </template>
        <el-text size="large">
          {{ otherUser.nickname }} 向您申请获取e5子账号的分享
        </el-text>
      </el-descriptions-item>
      <el-descriptions-item span="1">
        <template #label><el-avatar :src="otherUser.avatar" /></template>
        <div>
          <el-row>
            <el-text>{{ otherUser.nickname }}</el-text>
          </el-row>
          <el-row>
            <el-link @click="$router.push(`/user/${otherUser.id}`)" type="info">
              @{{ otherUser.username }}
            </el-link>
          </el-row>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="留言：" span="2">
        {{ notif.content }}
      </el-descriptions-item>
    </el-descriptions>
  </el-card>
  <!-- e5分享确认通知 -->
  <el-card
    v-else-if="notif.type === notificationType.e5_share_confirmation"
    shadow="hover"
  >
    <el-descriptions :title="'e5分享确认通知'" :column="3">
      <template #extra>
        <el-button type="primary">确认</el-button>
      </template>
      <el-descriptions-item span="1">
        <el-text type="info" size="small">{{ notifTime }}</el-text>
      </el-descriptions-item>
      <el-descriptions-item span="2">
        <template #label>
          <el-icon :size="20"><CircleCheck /></el-icon>
        </template>
        <el-text size="large">
          您正在接受 {{ otherUser.nickname }} 的分享吗，请确认
        </el-text>
      </el-descriptions-item>
      <el-descriptions-item span="1">
        <template #label><el-avatar :src="otherUser.avatar" /></template>
        <div>
          <el-row>
            <el-text>{{ otherUser.nickname }}</el-text>
          </el-row>
          <el-row>
            <el-link @click="$router.push(`/user/${otherUser.id}`)" type="info">
              @{{ otherUser.username }}
            </el-link>
          </el-row>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="留言：" span="2">
        {{ notif.content }}
      </el-descriptions-item>
    </el-descriptions>
  </el-card>
  <!-- e5分享完成通知 -->
  <el-card
    v-else-if="notif.type === notificationType.e5_share_completion"
    shadow="hover"
  >
    <el-descriptions :title="'e5分享完成通知'" :column="3">
      <template #extra>
        <el-button @click="$router.push('/share')" type="primary">
          查看
        </el-button>
      </template>
      <el-descriptions-item span="1">
        <el-text type="info" size="small">{{ notifTime }}</el-text>
      </el-descriptions-item>
      <el-descriptions-item span="2">
        <template #label>
          <el-icon :size="20"><CircleCheck /></el-icon>
        </template>
        <el-text size="large">
          {{ otherUser.nickname }} 已确认接受您的分享
        </el-text>
      </el-descriptions-item>
      <el-descriptions-item span="1">
        <template #label><el-avatar :src="otherUser.avatar" /></template>
        <div>
          <el-row>
            <el-text>{{ otherUser.nickname }}</el-text>
          </el-row>
          <el-row>
            <el-link @click="$router.push(`/user/${otherUser.id}`)" type="info">
              @{{ otherUser.username }}
            </el-link>
          </el-row>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="留言：" span="2">
        {{ notif.content }}
      </el-descriptions-item>
    </el-descriptions>
  </el-card>
  <!-- e5分享注销通知 -->
  <el-card
    v-else-if="notif.type === notificationType.e5_share_closure"
    shadow="hover"
  >
    <el-descriptions :title="'e5分享注销通知'" :column="3">
      <el-descriptions-item span="1">
        <el-text type="info" size="small">{{ notifTime }}</el-text>
      </el-descriptions-item>
      <el-descriptions-item span="2">
        <template #label>
          <el-icon :size="20"><CircleClose /></el-icon>
        </template>
        <el-text size="large">
          {{ otherUser.nickname }} 已取消其e5账号的分享
        </el-text>
      </el-descriptions-item>
      <el-descriptions-item span="1">
        <template #label><el-avatar :src="otherUser.avatar" /></template>
        <div>
          <el-row>
            <el-text>{{ otherUser.nickname }}</el-text>
          </el-row>
          <el-row>
            <el-link @click="$router.push(`/user/${otherUser.id}`)" type="info">
              @{{ otherUser.username }}
            </el-link>
          </el-row>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="留言：" span="2">
        {{ notif.content }}
      </el-descriptions-item>
    </el-descriptions>
  </el-card>
  <!-- e5账号主停止分享通知 -->
  <el-card
    v-else-if="notif.type === notificationType.e5_share_sharer_stop"
    shadow="hover"
  >
    <el-descriptions :title="'e5账号主停止分享通知'" :column="3">
      <el-descriptions-item span="1">
        <el-text type="info" size="small">{{ notifTime }}</el-text>
      </el-descriptions-item>
      <el-descriptions-item span="2">
        <template #label>
          <el-icon :size="20"><CircleClose /></el-icon>
        </template>
        <el-text size="large">
          {{ otherUser.nickname }} 已取消对您的分享
        </el-text>
      </el-descriptions-item>
      <el-descriptions-item span="1">
        <template #label><el-avatar :src="otherUser.avatar" /></template>
        <div>
          <el-row>
            <el-text>{{ otherUser.nickname }}</el-text>
          </el-row>
          <el-row>
            <el-link @click="$router.push(`/user/${otherUser.id}`)" type="info">
              @{{ otherUser.username }}
            </el-link>
          </el-row>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="留言：" span="2">
        {{ notif.content }}
      </el-descriptions-item>
    </el-descriptions>
  </el-card>
  <!-- 用户停止接受分享通知 -->
  <el-card
    v-else-if="notif.type === notificationType.e5_share_receiver_stop"
    shadow="hover"
  >
    <el-descriptions :title="'用户停止接受分享通知'" :column="3">
      <template #extra>
        <el-button @click="$router.push('/share')" type="primary">
          查看
        </el-button>
      </template>
      <el-descriptions-item span="1">
        <el-text type="info" size="small">{{ notifTime }}</el-text>
      </el-descriptions-item>
      <el-descriptions-item span="2">
        <template #label>
          <el-icon :size="20"><CircleClose /></el-icon>
        </template>
        <el-text size="large">
          {{ otherUser.nickname }} 已停止接受您的分享
        </el-text>
      </el-descriptions-item>
      <el-descriptions-item span="1">
        <template #label><el-avatar :src="otherUser.avatar" /></template>
        <div>
          <el-row>
            <el-text>{{ otherUser.nickname }}</el-text>
          </el-row>
          <el-row>
            <el-link @click="$router.push(`/user/${otherUser.id}`)" type="info">
              @{{ otherUser.username }}
            </el-link>
          </el-row>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="留言：" span="2">
        {{ notif.content }}
      </el-descriptions-item>
    </el-descriptions>
  </el-card>
  <!-- 其他通知 -->
  <el-card v-else shadow="hover">
    <el-descriptions :title="'其他通知'" :column="3">
      <el-descriptions-item span="1">
        <el-text type="info" size="small">{{ notifTime }}</el-text>
      </el-descriptions-item>
      <el-descriptions-item span="2">
        <template #label>
          <el-icon :size="20"><More /></el-icon>
        </template>
        <el-text size="large">{{ notif.content }}</el-text>
      </el-descriptions-item>
    </el-descriptions>
  </el-card>
</template>

<style lang="scss" scoped>
.el-card {
  border-radius: 15px;
  margin-bottom: 20px;
}
</style>
