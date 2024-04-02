<script setup>
import { ref, computed } from 'vue'
import { loadE5PostsData } from '@/utils/dataManage'
import { postsSendPostService, postsClearPostService } from '@/api/posts'
import {
  ChatLineSquare,
  Setting,
  Notification,
  ChatDotSquare,
  Delete
} from '@element-plus/icons-vue'
import { usePostsStore, useProfileStore } from '@/stores'

const props = defineProps({
  e5id: {
    type: Number,
    required: true
  },
  // 控制按钮是否禁用
  isloading: {
    type: Boolean,
    required: true
  }
})
// 更新加载状态事件
const emit = defineEmits(['updateLoading'])

const content = ref('')

// 发送帖子
const postSend = async () => {
  // 去除首尾空格，为空返回
  content.value = content.value.trim()
  if (!content.value) {
    return ElMessage('内容为空')
  }
  // 设置为提交中状态
  emit('updateLoading', true)
  try {
    // 调用接口
    await postsSendPostService(props.e5id, content.value)
    // 清空content
    content.value = ''
    // 重新请求当前动态
    await loadE5PostsData(props.e5id)
    ElMessage.success('发送成功')
  } finally {
    // 无论提交成功或失败，都要解除提交中状态
    emit('updateLoading', false)
  }
}

// 控制设置对话框显示隐藏
const dialogVisible = ref(false)
// 显示对话框
const openSetting = () => {
  dialogVisible.value = true
}
// 关闭对话框
const closeSetting = () => {
  dialogVisible.value = false
}

const postsStore = usePostsStore()
// e5id是否存在于动态
const isE5idExists = computed(() => {
  return postsStore.e5idList.includes(props.e5id)
})

const profileStore = useProfileStore()
// 登录用户是否为e5帐号主，据此显示清空动态按钮
const isE5Master = computed(() => {
  return props.e5id === profileStore.user.id
})

// 清空动态
const postClear = async () => {
  await ElMessageBox.confirm('您确认要清空动态吗', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  // 设置为提交中状态
  emit('updateLoading', true)
  try {
    // 调用接口
    await postsClearPostService()
    // 重新请求当前动态
    await loadE5PostsData(props.e5id)
    ElMessage.success('清空成功')
    // 关闭对话框
    closeSetting()
  } finally {
    // 无论提交成功或失败，都要解除提交中状态
    emit('updateLoading', false)
  }
}

// 本动态全部已读
const markE5PostsAsRead = () => {
  postsStore.markE5PostsAsRead(props.e5id)
  closeSetting()
}

// 所有动态全部已读
const markAllPostAsRead = () => {
  postsStore.markAllPostAsRead()
  closeSetting()
}
</script>

<template>
  <el-card shadow="hover" class="send-card">
    <div class="input-box">
      <el-input
        v-model="content"
        type="textarea"
        placeholder=""
        maxlength="500"
        show-word-limit
        :autosize="{ minRows: 3, maxRows: 6 }"
      ></el-input>
    </div>
    <div class="button-box">
      <el-button type="info" :icon="Setting" circle @click="openSetting" />
      <el-button
        class="send-button"
        type="primary"
        round
        :icon="ChatLineSquare"
        :disabled="isloading"
        @click="postSend"
      >
        发送动态
      </el-button>
    </div>
    <el-dialog v-model="dialogVisible" width="400px" v-if="isE5idExists">
      <template #header>
        <user-item :userId="e5id" small></user-item>
      </template>
      <el-row>
        <el-button
          class="setting-button"
          type="info"
          round
          :icon="Notification"
          @click="markE5PostsAsRead"
        >
          本动态全部已读
        </el-button>
      </el-row>
      <el-row>
        <el-button
          class="setting-button"
          type="info"
          round
          :icon="ChatDotSquare"
          @click="markAllPostAsRead"
        >
          所有动态全部已读
        </el-button>
      </el-row>
      <el-row>
        <el-button
          class="setting-button"
          type="danger"
          round
          :icon="Delete"
          v-if="isE5Master"
          @click="postClear"
        >
          清空动态
        </el-button>
      </el-row>
      <el-row>
        <el-alert
          title="关于“动态”"
          type="info"
          description="类似 X 的社群？可以充当公告栏，被帮助的用户也可以发言。
          聊天的话还是去 Discord 比较好，联系管理员可以为您创建频道"
          show-icon
          :closable="false"
        />
      </el-row>
    </el-dialog>
  </el-card>
</template>

<style lang="scss" scoped>
.send-card {
  :deep() {
    .el-card__body {
      padding: 20px;
    }
  }
}

.button-box {
  margin-top: 10px;
  display: flex;
  flex-wrap: nowrap;
  .send-button {
    width: 100%;
  }
}

.setting-button {
  margin-bottom: 15px;
  width: 100%;
}
</style>
