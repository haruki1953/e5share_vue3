<script setup>
import { computed } from 'vue'
import { useUsersStore } from '@/stores'
import E5sharingCard from './components/E5sharingCard.vue'

// 用户列表
const usersStore = useUsersStore()

// 骨架屏的数量：当分享用户不足6个时补充
const skeletonCount = computed(() => {
  const sharingUsersCount = usersStore.sharingUsers.length
  return Math.max(6 - sharingUsersCount, 0)
})
</script>

<template>
  <el-scrollbar>
    <el-row class="card-container">
      <el-col v-for="item in usersStore.sharingUsers" :key="item.id" :span="8">
        <e5sharing-card :user="item"></e5sharing-card>
      </el-col>
      <!-- 骨架屏 -->
      <el-col v-for="index in skeletonCount" :key="index" :span="8">
        <el-card shadow="hover">
          <el-row class="user-e5">
            <el-col :span="10">
              <el-row class="user-avatar">
                <el-skeleton style="--el-skeleton-circle-size: 64px" animated>
                  <template #template>
                    <el-skeleton-item variant="circle" />
                  </template>
                </el-skeleton>
              </el-row>
            </el-col>
            <el-col :span="14" class="progress-container">
              <el-skeleton style="--el-skeleton-circle-size: 126px" animated>
                <template #template>
                  <el-skeleton-item variant="circle" />
                </template>
              </el-skeleton>
            </el-col>
          </el-row>
          <el-row>
            <!-- 骨架随机3-9 -->
            <el-skeleton
              :rows="Math.floor(Math.random() * (10 - 3 + 1)) + 3"
              animated
            />
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </el-scrollbar>
</template>

<style lang="scss" scoped>
.card-container {
  margin-top: 10px;
  .el-card {
    border-radius: 15px;
    margin: 0 20px 20px 0;
    .user-e5 {
      margin: 0 0 6px 5px;
      .user-avatar {
        margin: 4px 0 8px 0;
      }
      .progress-container {
        display: flex;
        justify-content: flex-end;
        .el-skeleton {
          display: flex;
          justify-content: flex-end;
        }
      }
    }
  }
}
</style>
