<script setup>
import 'element-plus/theme-chalk/display.css'
import { onMounted } from 'vue'
import { usePostsStore } from '@/stores'
import { contactInfo, friendshipLinks } from '@/config'

// 动态
const postsStore = usePostsStore()

onMounted(() => {
  // 全部标记已读
  postsStore.markAllPostAsRead()
})
</script>
<template>
  <el-container>
    <el-aside>
      <el-scrollbar>
        <!-- 动态菜单栏 -->
        <el-card class="post-tab" shadow="hover">
          <template #header>
            <el-text tag="b" size="large" type="primary"> 动态 </el-text>
          </template>
        </el-card>
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
            <user-card :user="1" class="post-card hidden-lg-and-up"></user-card>
            <!-- 消息卡片 -->
          </el-scrollbar>
        </el-col>
        <!-- 动态发送卡片 大屏时显示在右侧 -->
        <el-col :span="10" class="user-col hidden-md-and-down">
          <el-scrollbar>
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

.post-tab {
  margin: 10px 5px 10px 20px;
  border-radius: 20px;
  :deep() {
    .el-card__body {
      padding: 0;
    }
  }
  .el-menu {
    border-right: none;
    :deep() {
      .is-active {
        background-color: #d9ecff;
      }
    }
  }
}

.links-card {
  margin: 10px 5px 10px 20px;
  border-radius: 20px;
}

.post-main {
  padding: 0 15px 0 0;
  .post-col {
    height: 100vh;
    .post-card {
      margin: 10px 5px 20px 5px;
      border-radius: 20px;
    }
  }
  .user-col {
    height: 100vh;
    .user-card {
      margin: 10px 5px 20px 5px;
    }
  }
}
</style>
