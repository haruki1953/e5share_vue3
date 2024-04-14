<script setup>
import { usePostsStore, useUsersStore } from '@/stores'
import { computed } from 'vue'

const props = defineProps({
  e5id: {
    type: Number,
    required: true
  }
})

const usersStore = useUsersStore()
// e5帐号主用户数据
const e5User = computed(() => {
  return usersStore.findUserById(props.e5id)
})

// 在动态中的用户
const postUsersId = computed(() => {
  return [props.e5id, ...e5User.value.helping_users]
})
const postUsers = computed(() => {
  // 取后三个显示头像
  const start = Math.max(0, postUsersId.value.length - 3) // 起始索引
  return usersStore.mapUsersByIds(postUsersId.value.slice(start))
})

const postsStore = usePostsStore()
// 最近动态的文字信息
const lastContent = computed(() => {
  const content = postsStore.getE5PostLastContent(props.e5id)
  if (content) {
    return content
  }
  return '暂无消息'
})

// 未读通知数
const unreadCountInE5Posts = computed(() => {
  return postsStore.unreadCountInE5Posts(props.e5id)
})
</script>
<template>
  <el-badge
    :value="unreadCountInE5Posts"
    :max="9"
    type="primary"
    :hidden="!unreadCountInE5Posts"
    v-if="e5User"
  >
    <div class="post-info">
      <div class="user-box">
        <UserItem :userId="e5id" small :usernameLink="false"></UserItem>
      </div>
      <div class="info-box">
        <div class="content-box">
          <el-text type="info" size="small" truncated>
            {{ lastContent }}
          </el-text>
        </div>
        <div class="hrlping-box">
          <div class="avatar-list">
            <el-avatar
              :size="20"
              v-for="item in postUsers"
              :key="item.id"
              :src="item.avatar"
            ></el-avatar>
          </div>

          <el-text type="info" size="small" tag="b">
            {{ postUsersId.length }}人
          </el-text>
        </div>
      </div>
    </div>
  </el-badge>
</template>

<style lang="scss" scoped>
.el-badge {
  width: 100%;
  :deep() {
    .el-badge__content {
      font-style: normal;
      line-height: 18px;
    }
  }
}
.post-info {
  width: 100%;
  overflow: hidden;
}

.info-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 4px;
  .content-box {
    width: 160px;
  }
  .hrlping-box {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .avatar-list {
      margin-right: 5px;
      display: flex;
      .el-avatar {
        margin-left: -8px;
      }
    }
  }
}
</style>
