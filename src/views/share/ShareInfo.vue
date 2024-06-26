<script setup>
import { computed, ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUsersStore, useProfileStore, useShareStore } from '@/stores'
import { accountStatus } from '@/config'
import ShareRegisterDrawer from './components/ShareRegisterDrawer.vue'
import ShareCancelDrawer from './components/ShareCancelDrawer.vue'
import ShareInfoUpdateDialog from './components/ShareInfoUpdateDialog.vue'
import ShareInfoAddDialog from './components/ShareInfoAddDialog.vue'
import StatusTag from './components/StatusTag.vue'

const usersStore = useUsersStore()
const profileStore = useProfileStore()
const shareStore = useShareStore()

// 要显示的数据，帮助自己的用户列表
const helpingByUsers = computed(() => {
  return usersStore.filterUsersByIds(profileStore.user.helping_by_users)
})
// 用户信息
const user = computed(() => {
  return profileStore.user
})
// 分享信息表格
const shareInfo = computed(() => {
  return shareStore.shareInfoList
})

// 分享登记抽屉 分享注销抽屉
const shareRegisterDrawerRef = ref()
const shareCancelDrawerRef = ref()
// 分享信息操作、添加对话框
const shareInfoUpdateDialogRef = ref()
const shareInfoAddDialogRef = ref()

// 根据路由参数快速添加用户
const route = useRoute()
const router = useRouter()
const addUserFromRoute = () => {
  const addUserId = Number(route.query.add)
  if (addUserId) {
    shareInfoAddDialogRef.value.open(addUserId)
    // 打开添加对话框后清除路由参数add
    // eslint-disable-next-line no-unused-vars
    const { add, ...newQuery } = { ...route.query }
    router.replace({ query: newQuery })
  }
}
onMounted(() => {
  addUserFromRoute()
})
// 监听路由参数变化
watch(
  () => route.query,
  () => {
    addUserFromRoute()
  }
)
</script>

<template>
  <el-scrollbar>
    <!-- E5分享管理栏 -->
    <el-card
      class="e5manage-card"
      v-if="profileStore.user.account_status === accountStatus.sharing"
    >
      <template #header>
        <div class="header-box">
          <el-text tag="b" size="large" type="primary"> 您正在分享： </el-text>
          <div class="header-button">
            <el-button
              type="primary"
              round
              @click="shareCancelDrawerRef.open()"
            >
              注销分享
            </el-button>
          </div>
        </div>
      </template>
      <share-cancel-drawer ref="shareCancelDrawerRef"></share-cancel-drawer>
      <!-- 当前用户信息 -->
      <el-row class="user-e5">
        <div>
          <el-row class="user-avatar">
            <div>
              <el-avatar :size="80" :src="user.avatar" />
            </div>
            <div class="tag-box">
              <aboutme-tag :user="user"></aboutme-tag>
            </div>
          </el-row>
          <el-row>
            <el-text size="large" tag="b">{{ user.nickname }}</el-text>
          </el-row>
          <el-row>
            <el-link
              type="info"
              :underline="false"
              @click="$router.push(`/user/${user.id}`)"
            >
              @{{ user.username }}
            </el-link>
          </el-row>
        </div>

        <div class="e5info-botton">
          <div class="button-box">
            <div class="button-col">
              <el-button
                type="primary"
                size="large"
                @click="$router.push('/setting?setting=e5')"
              >
                修改E5订阅信息
              </el-button>
            </div>
          </div>
          <e5sharing-progress :user="user"></e5sharing-progress>
        </div>
      </el-row>
      <!-- 分享信息表格 -->
      <div class="share-table">
        <el-table
          :data="shareInfo"
          table-layout="auto"
          empty-text="暂无分享信息"
        >
          <el-table-column label="用户">
            <template #default="scope">
              <user-item
                class="user-item"
                :userId="scope.row.userId"
              ></user-item>
            </template>
          </el-table-column>
          <el-table-column label="分享状态" width="100px">
            <template #default="scope">
              <status-tag :status="scope.row.status"></status-tag>
            </template>
          </el-table-column>
          <el-table-column label="备注">
            <template #default="scope">
              <el-text class="text-info" line-clamp="3">
                {{ scope.row.note }}
              </el-text>
            </template>
          </el-table-column>
          <el-table-column width="100px">
            <template #header>
              <el-button
                type="primary"
                round
                @click="shareInfoAddDialogRef.open()"
              >
                添加用户
              </el-button>
            </template>
            <template #default="scope">
              <el-button
                type="primary"
                round
                @click="shareInfoUpdateDialogRef.open(scope.row.userId)"
              >
                操作
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <share-info-update-dialog
          ref="shareInfoUpdateDialogRef"
        ></share-info-update-dialog>
        <share-info-add-dialog
          ref="shareInfoAddDialogRef"
        ></share-info-add-dialog>
      </div>
    </el-card>
    <el-card class="e5header-card" v-else>
      <div class="header-box">
        <el-text tag="b" size="large" type="primary"> 您还未开始分享 </el-text>
        <div class="header-button">
          <el-button
            type="primary"
            round
            @click="shareRegisterDrawerRef.open()"
          >
            登记分享
          </el-button>
        </div>
      </div>
      <share-register-drawer
        ref="shareRegisterDrawerRef"
      ></share-register-drawer>
    </el-card>

    <!-- 用户卡片容器 -->
    <usercard-container
      class="usercard-container"
      :dataList="helpingByUsers"
    ></usercard-container>
    <el-empty
      description="您还未被分享"
      v-if="
        profileStore.user.account_status !== accountStatus.sharing &&
        !helpingByUsers.length
      "
    />
  </el-scrollbar>
</template>

<style lang="scss" scoped>
.e5manage-card {
  margin: 0 20px 10px 20px;
  border-radius: 0 0 20px 20px;
  border-top-width: 0;
  :deep() {
    .el-card__body {
      padding: 30px;
    }
  }
}
.e5header-card {
  margin: 0 20px 10px 20px;
  border-radius: 0 0 20px 20px;
  border-top-width: 0;
}

.header-box {
  display: flex;
  justify-content: space-between;
}
.user-e5 {
  margin-left: 5px;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap; /* 不换行 */
  .user-avatar {
    display: flex;
    flex-wrap: nowrap; /* 不换行 */
    margin: 4px 0;
    .tag-box {
      height: 80px;
      display: flex;
      align-items: center;
      margin: 0 20px;
    }
  }
  .e5info-botton {
    display: flex;
    // flex-wrap: nowrap; /* 不换行 */
    .button-box {
      height: 126px;
      display: flex;
      align-items: center;
      margin: 0 20px;
      .button-col {
        display: flex;
        flex-direction: column;
        .el-button {
          margin: 3px;
        }
      }
    }
  }
}

.share-table {
  margin-top: 20px;
  .user-item {
    min-width: 200px;
  }
  .text-info {
    white-space: pre-line;
  }
}

.usercard-container {
  margin-top: 15px;
}
</style>
