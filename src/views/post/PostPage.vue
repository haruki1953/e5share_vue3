<script setup>
import 'element-plus/theme-chalk/display.css'
import { ref, onMounted, computed } from 'vue'
import { usePostsStore, useUsersStore } from '@/stores'
import { contactInfo, friendshipLinks } from '@/config'
import PostMenu from './components/PostMenu.vue'
import PostSend from './components/PostSend.vue'
import PostMessage from './components/PostMessage.vue'
import { postsDelPostService } from '@/api/posts'
import { loadE5PostsData } from '@/utils/dataManage'

// 动态
const postsStore = usePostsStore()

onMounted(() => {
  // 首次登录时（readPostUuid为空）设置全部已读
  if (!postsStore.readPostUuid.length) {
    postsStore.markAllPostAsRead()
  }
})

// 选中的e5帐号主id
const e5id = ref(0)

const usersStore = useUsersStore()
// e5帐号主信息
const e5User = computed(() => {
  const user = usersStore.findUserById(e5id.value)
  return user ? user : null
})

// e5动态信息、倒序
const e5Posts = computed(() => {
  const posts = postsStore.findE5PostsByE5id(e5id.value)
  if (posts && posts.length) {
    return posts.slice().reverse()
  }
  return []
})

// 加载中状态标记
const isloading = ref(false)
// 删除帖子
const postDel = async (post) => {
  await ElMessageBox.confirm(`您确认要删除吗：[${post.content}]`, '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })

  // 设置为提交中状态
  isloading.value = true
  try {
    // 调用接口
    await postsDelPostService(e5id.value, post.id)
    // 重新请求当前动态
    await loadE5PostsData(e5id.value)
    ElMessage.success('删除成功')
  } finally {
    // 无论提交成功或失败，都要解除提交中状态
    isloading.value = false
  }
}

// 更新加载状态
const updateLoading = (val) => {
  isloading.value = val
}
</script>
<template>
  <el-container>
    <el-aside>
      <el-scrollbar>
        <!-- 动态菜单栏 -->
        <PostMenu v-model="e5id" class="post-menu"></PostMenu>
        <!-- 联系方式卡片 -->
        <links-card
          :dataObj="contactInfo"
          title="联系方式 | 交流讨论 | 问题反馈"
          class="links-card"
        ></links-card>
        <!-- 友情链接 -->
        <links-card
          :dataObj="friendshipLinks"
          title="广告位（bushi）"
          class="links-card"
        ></links-card>
      </el-scrollbar>
    </el-aside>
    <el-main class="post-main">
      <el-row>
        <el-col :lg="14" class="post-col">
          <el-scrollbar>
            <!-- 动态发送卡片 小屏时显示在顶部 -->
            <PostSend
              class="send-card hidden-lg-and-up"
              :e5id="e5id"
              :isloading="isloading"
              @updateLoading="updateLoading"
            ></PostSend>
            <!-- 消息卡片列表 -->
            <div v-loading="isloading" v-if="e5Posts.length">
              <PostMessage
                class="post-card"
                v-for="item in e5Posts"
                :key="item.id"
                :post="item"
                :e5id="e5id"
                @postDel="postDel"
              ></PostMessage>
            </div>
            <el-empty description="暂无消息" v-else />
          </el-scrollbar>
        </el-col>
        <!-- 动态发送卡片 大屏时显示在右侧 -->
        <el-col :span="10" class="user-col hidden-md-and-down">
          <el-scrollbar>
            <PostSend
              class="send-card"
              :e5id="e5id"
              :isloading="isloading"
              @updateLoading="updateLoading"
            ></PostSend>
            <user-card
              v-if="e5User"
              :user="e5User"
              class="user-card"
            ></user-card>
          </el-scrollbar>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<style lang="scss" scoped>
.el-container {
  height: 100vh;
}

.post-menu {
  margin: 0 5px 10px 20px;
  border-radius: 0 0 20px 20px;
  border-top-width: 0;
}

.links-card {
  margin: 10px 5px 10px 20px;
  border-radius: 20px;
}

.send-card {
  margin: 0px 5px 10px 5px;
  border-radius: 0 0 20px 20px;
  border-top-width: 0;
}

.post-main {
  padding: 0 15px 0 0;
  .post-col {
    height: 100vh;
    .post-card {
      margin: 10px 5px 10px 5px;
      border-radius: 20px;
      // border-top-width: 1px;
    }
  }
  .user-col {
    height: 100vh;
    .user-card {
      margin: 10px 5px 10px 5px;
      border-radius: 20px;
    }
  }
}
</style>
