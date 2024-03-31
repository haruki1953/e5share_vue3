<script setup>
import 'element-plus/theme-chalk/display.css'
import { ref, onMounted } from 'vue'
import { usePostsStore } from '@/stores'
import { contactInfo, friendshipLinks } from '@/config'
import PostMenu from './components/PostMenu.vue'
import PostSend from './components/PostSend.vue'
import PostMessage from './components/PostMessage.vue'

// 动态
const postsStore = usePostsStore()

onMounted(() => {
  // 全部标记已读
  postsStore.markAllPostAsRead()
})

// 选中的e5帐号主id
const e5id = ref(0)
</script>
<template>
  <el-container>
    <el-aside>
      <el-scrollbar>
        <!-- 动态菜单栏 -->
        <PostMenu class="post-menu" v-model="e5id"></PostMenu>
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
            <PostSend class="send-card hidden-lg-and-up"></PostSend>
            <!-- 消息卡片 -->
            <PostMessage class="post-card"></PostMessage>
            <PostMessage class="post-card"></PostMessage>
          </el-scrollbar>
        </el-col>
        <!-- 动态发送卡片 大屏时显示在右侧 -->
        <el-col :span="10" class="user-col hidden-md-and-down">
          <el-scrollbar>
            <PostSend class="send-card"></PostSend>
            <user-card :user="1" class="user-card"></user-card>
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
