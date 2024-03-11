<script setup>
defineProps({
  // 内容的行数
  rows: {
    required: true,
    type: Number
  }
})
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
      <!-- 骨架随机3-9 -->
      <el-skeleton :rows="rows" animated />
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
