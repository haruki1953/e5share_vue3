<script setup>
import {
  HomeFilled,
  Menu,
  Share,
  Comment,
  BellFilled,
  Tools
} from '@element-plus/icons-vue'
// import avatar from '@/assets/default.png'
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
              <el-avatar
                src="https://avatars.githubusercontent.com/u/72015883?v=4"
              />
            </template>
            <template #default>
              <div class="user-info-container">
                <el-avatar
                  :size="60"
                  src="https://avatars.githubusercontent.com/u/72015883?v=4"
                  class="user-avatar"
                ></el-avatar>
                <div class="user-details">
                  <p class="user-name">Element Plus</p>
                  <p class="user-handle">@element-plus</p>
                </div>
                <el-button
                  type="primary"
                  class="logout-button"
                  auto-insert-space
                >
                  退出登录
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
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
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
