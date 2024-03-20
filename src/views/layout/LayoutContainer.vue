<script setup>
import { ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import {
  HomeFilled,
  Menu,
  Share,
  Comment,
  BellFilled,
  Tools
} from '@element-plus/icons-vue'
import { useAuthStore, useProfileStore, usePostsStore } from '@/stores'
import { loadAllData } from '@/utils/dataManage'
import { avatarConfig, logoImage } from '@/config'
import NotifDrawer from './components/NotifDrawer.vue'
import { removeLogin } from '@/utils/dataManage'

// 路由
const router = useRouter()
// 鉴权信息
const authStore = useAuthStore()
// 用户个人信息
const profileStore = useProfileStore()
// 动态列表
const postsStore = usePostsStore()

// 请求获取数据
loadAllData()

// 退出登录
const logout = async () => {
  // 退出操作
  // await ElMessageBox.confirm('你确认要进行退出么', '温馨提示', {
  //   type: 'warning',
  //   confirmButtonText: '确认',
  //   cancelButtonText: '取消'
  // })

  // 退出前跳转到首页
  await router.push('/home')
  // 在下一个渲染周期执行清除本地登录的数据
  await nextTick()
  await removeLogin()

  // 跳转路由
  // router.push('/login')
}

// 通知抽屉
const notifDrawerRef = ref()
const openNotifDrawer = () => {
  // 登录访问拦截
  if (!authStore.token) router.push('/login')
  notifDrawerRef.value.open()
}
</script>

<template>
  <el-container class="layout-container">
    <el-aside width="65px">
      <el-scrollbar>
        <el-menu :default-active="$route.path" router :collapse="true">
          <div
            class="el-menu__logo"
            :style="{ backgroundImage: `url(${logoImage})` }"
          ></div>
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
            <template #title>E5分享管理</template>
          </el-menu-item>
          <el-menu-item index="/post">
            <el-icon v-if="postsStore.unreadPostCount">
              <el-badge
                :value="postsStore.unreadPostCount"
                :max="9"
                class="item"
                type="primary"
              >
                <Comment />
              </el-badge>
            </el-icon>
            <el-icon v-else>
              <Comment />
            </el-icon>
            <template #title>动态</template>
          </el-menu-item>
          <el-menu-item @click="openNotifDrawer">
            <el-icon v-if="profileStore.unreadNotifCount">
              <el-badge
                :value="profileStore.unreadNotifCount"
                :max="9"
                class="item"
                type="primary"
              >
                <BellFilled />
              </el-badge>
            </el-icon>
            <el-icon v-else>
              <BellFilled />
            </el-icon>
            <template #title>通知</template>
          </el-menu-item>
          <el-menu-item index="/setting">
            <el-icon><Tools /></el-icon>
            <template #title>设置</template>
          </el-menu-item>
          <div class="avatar-container">
            <el-popover :width="256" placement="right">
              <template #reference>
                <el-avatar
                  :src="profileStore.user.avatar"
                  v-if="authStore.token"
                />
                <el-avatar :src="avatarConfig.defaultAvatar" v-else />
              </template>
              <template #default>
                <!-- 已登录 -->
                <div class="user-info-container" v-if="authStore.token">
                  <el-row>
                    <el-avatar
                      :size="60"
                      :src="profileStore.user.avatar"
                      class="user-avatar"
                      @click="$router.push(`/user/${profileStore.user.id}`)"
                    ></el-avatar>
                  </el-row>
                  <el-row>
                    <el-text tag="b">{{ profileStore.user.nickname }}</el-text>
                  </el-row>
                  <el-row>
                    <el-link
                      type="info"
                      :underline="false"
                      @click="$router.push(`/user/${profileStore.user.id}`)"
                    >
                      @{{ profileStore.user.username }}
                    </el-link>
                  </el-row>

                  <el-button @click="logout" type="primary" auto-insert-space>
                    退出登录
                  </el-button>
                </div>
                <!-- 未登录 -->
                <div class="user-info-container" v-else>
                  <el-row>
                    <el-avatar
                      :size="60"
                      :src="avatarConfig.defaultAvatar"
                      class="user-avatar"
                      @click="router.push('/login')"
                    ></el-avatar>
                  </el-row>
                  <el-row>
                    <el-text tag="b">未登录</el-text>
                  </el-row>
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
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
  <!-- 通知抽屉 -->
  <notif-drawer ref="notifDrawerRef"></notif-drawer>
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
      background-repeat: no-repeat;
      background-position: center;
      background-size: 40px auto;
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
    padding: 0;
  }
}

.user-info-container {
  display: flex;
  flex-direction: column;
  .user-avatar {
    margin-bottom: 8px;
    cursor: pointer; // 当光标悬停在头像上时，显示小手指示
  }
  .el-button {
    margin-top: 10px;
  }
}
</style>
@/utils/dataManage
