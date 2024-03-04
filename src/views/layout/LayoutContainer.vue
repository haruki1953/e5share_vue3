<script setup>
import {
  HomeFilled,
  Menu,
  Share,
  Comment,
  BellFilled,
  Tools
} from '@element-plus/icons-vue'
import { useAuthStore, useProfileStore } from '@/stores/index'
import { avatarConfig } from '@/config'
import { useRouter } from 'vue-router'

// 路由
const router = useRouter()
// 鉴权信息
const authStore = useAuthStore()
// 用户个人信息
const profileStore = useProfileStore()

// 请求获取数据
const fetchDataFromServer = async () => {
  // 登陆时获取用户信息
  if (authStore.token) {
    await profileStore.getProfile()
  }
}
fetchDataFromServer()

// 退出登录
const logout = async () => {
  // 退出操作
  await ElMessageBox.confirm('你确认要进行退出么', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })

  // 清除本地的数据 (token + 信息)
  authStore.removeToken()
  profileStore.removeProfile()
  // 跳转路由
  // router.push('/login')
}
</script>

<template>
  <el-container class="layout-container">
    <el-scrollbar noresize>
      <el-menu :default-active="$route.path" router :collapse="true">
        <div class="el-menu__logo"></div>
        <el-menu-item index="/home">
          <el-icon><HomeFilled /></el-icon>
          <template #title>首页</template>
        </el-menu-item>
        <el-menu-item index="/user-list">
          <el-icon><Menu /></el-icon>
          <template #title>用户列表</template>
        </el-menu-item>
        <el-menu-item index="/share">
          <el-icon><Share /></el-icon>
          <template #title>e5账号分享管理</template>
        </el-menu-item>
        <el-menu-item index="/post">
          <el-icon>
            <el-badge :value="99" :max="9" class="item" type="primary">
              <Comment />
            </el-badge>
          </el-icon>
          <template #title>动态</template>
        </el-menu-item>
        <el-menu-item>
          <el-icon>
            <el-badge :value="99" :max="9" class="item" type="primary">
              <BellFilled />
            </el-badge>
          </el-icon>
          <template #title>通知</template>
        </el-menu-item>
        <el-menu-item index="/setting">
          <el-icon><Tools /></el-icon>
          <template #title>设置</template>
        </el-menu-item>
        <div class="avatar-container">
          <el-popover
            :width="256"
            placement="right"
            :popperStyle="popoverStyle"
          >
            <template #reference>
              <el-avatar :src="profileStore.avatar" v-if="authStore.token" />
              <el-avatar :src="avatarConfig.defaultAvatar" v-else />
            </template>
            <template #default>
              <!-- 已登录 -->
              <div class="user-info-container" v-if="authStore.token">
                <el-avatar
                  :size="60"
                  :src="profileStore.avatar"
                  class="user-avatar"
                ></el-avatar>
                <div class="user-details">
                  <p class="user-name">
                    {{ profileStore.nickname }}
                  </p>
                  <p class="user-handle">@{{ profileStore.user.username }}</p>
                </div>
                <el-button @click="logout" type="primary" auto-insert-space>
                  退出登录
                </el-button>
              </div>
              <!-- 未登录 -->
              <div class="user-info-container" v-else>
                <el-avatar
                  :size="60"
                  :src="avatarConfig.defaultAvatar"
                  class="user-avatar"
                ></el-avatar>
                <div class="user-details">
                  <p class="user-name">未登录</p>
                </div>
                <el-button
                  @click="router.push('/login')"
                  type="primary"
                  auto-insert-space
                >
                  登录
                </el-button>
              </div>
            </template>
          </el-popover>
        </div>
      </el-menu>
    </el-scrollbar>
    <el-main>
      <el-scrollbar noresize>
        <router-view></router-view>
      </el-scrollbar>
    </el-main>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;

  .el-menu {
    padding-bottom: 30px;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
    background-color: #fff;
    // border-right: solid 1px #dcdfe6;
    // border-right: none;
    &__logo {
      height: 120px;
      background: url('@/assets/logo.png') no-repeat center / 40px auto;
    }
    .el-badge {
      font-style: normal;
      font-family:
        Inter,
        Helvetica Neue,
        Helvetica,
        PingFang SC,
        Hiragino Sans GB,
        Microsoft YaHei,
        \5fae\8f6f\96c5\9ed1,
        Arial,
        sans-serif;
    }

    .avatar-container {
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .el-main {
    --el-main-padding: 0;
    .el-scrollbar {
      padding: 0 20px;
    }
  }
}

.user-info-container {
  display: flex;
  gap: 16px;
  flex-direction: column;

  .user-avatar {
    cursor: pointer; // 当光标悬停在头像上时，显示小手指示
  }
  .user-details {
    .user-name {
      margin: 0;
      font-weight: 500;
    }

    .user-handle {
      margin: 0;
      font-size: 14px;
      color: var(--el-color-info);
    }
  }
}
</style>
