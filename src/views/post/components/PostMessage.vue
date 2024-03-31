<script setup>
import { Delete } from '@element-plus/icons-vue'
</script>

<template>
  <el-card class="message-card" shadow="hover">
    <template #header>
      <div class="post-header">
        <div class="user">
          <user-item :userId="1"></user-item>
        </div>
        <div class="button-time">
          <el-button class="del-button" type="danger" :icon="Delete" circle />
          <el-text type="info" size="small"> 2024-03-31 14:13 </el-text>
        </div>
      </div>
    </template>
    <div class="post-content">
      <el-popover effect="light" trigger="click" width="500px">
        <template #reference>
          <el-text tag="b" type="info" class="post-text" line-clamp="20">
            {{ '测试' }}
          </el-text>
        </template>
        {{ '测试' }}
      </el-popover>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.message-card {
  :deep() {
    .el-card__header {
      padding: 15px 20px;
    }
  }
}
.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .del-button {
    margin-right: 10px;
  }
}
.post-text {
  white-space: pre-line;
}
</style>
