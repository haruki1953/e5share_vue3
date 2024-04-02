<script setup>
import { computed } from 'vue'
import { Delete } from '@element-plus/icons-vue'
import { formatTime } from '@/utils/timeUtils'
import { usePostsStore, useProfileStore } from '@/stores'

const props = defineProps({
  // 帖子信息
  post: {
    type: Object,
    required: true
  },
  e5id: {
    type: Number,
    required: true
  }
})
// 删除动态事件 postDel
const emit = defineEmits(['postDel'])

const profileStore = useProfileStore()
// 是否显示删除按钮
const shouldShowDelButton = computed(() => {
  const userId = profileStore.user.id
  if (userId === props.e5id || userId === props.post.userId) {
    return true
  }
  return false
})

const postsStore = usePostsStore()
// 是否已读
const isRead = computed(() => {
  return postsStore.isPostRead(props.post.id)
})
</script>

<template>
  <el-card class="message-card" shadow="hover">
    <template #header>
      <div class="post-header">
        <el-badge
          value="new"
          type="primary"
          v-if="!isRead"
          @mouseenter="postsStore.markPostAsRead(post.id)"
        >
          <div class="user">
            <user-item :userId="post.userId" small></user-item>
          </div>
        </el-badge>
        <div class="user" v-else>
          <user-item :userId="post.userId" small></user-item>
        </div>
        <div class="button-time">
          <el-button
            class="del-button"
            type="danger"
            :icon="Delete"
            circle
            @click="emit('postDel', post)"
            v-if="shouldShowDelButton"
          />
          <el-text type="info" size="small">
            {{ formatTime(post.time) }}
          </el-text>
        </div>
      </div>
    </template>
    <div class="post-content">
      <el-popover effect="light" trigger="click" width="500px">
        <template #reference>
          <el-text tag="b" type="info" class="post-text" line-clamp="20">
            {{ post.content }}
          </el-text>
        </template>
        {{ post.content }}
      </el-popover>
    </div>
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
.message-card {
  :deep() {
    .el-card__header {
      padding: 15px 20px;
    }
  }
}
.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .button-time {
    white-space: nowrap;
    margin-left: 10px;
    .del-button {
      margin-right: 10px;
    }
  }
}
.post-text {
  white-space: pre-line;
}
</style>
