<script setup>
import { computed } from 'vue'

const props = defineProps({
  // 内容的行数
  rows: {
    type: Number,
    // 默认值为空，如果未传行数，则随机生成
    default: null
  }
})

// 如果 props.rows 为空，则生成随机3-9作为行数
const skeletonRows = computed(() =>
  props.rows ? props.rows : Math.floor(Math.random() * (9 - 3 + 1)) + 3
)
</script>

<template>
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
      <el-skeleton :rows="skeletonRows" animated />
    </el-row>
  </el-card>
</template>

<style lang="scss" scoped>
.el-card {
  border-radius: 15px;
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
</style>
