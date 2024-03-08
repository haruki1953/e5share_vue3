<script setup>
import { Setting, ChatDotRound } from '@element-plus/icons-vue'
import { notificationType } from '@/config'
defineProps({
  notif: {
    required: true,
    type: Object
  }
})
</script>

<template>
  <!-- 系统通知 -->
  <el-card v-if="notif.type === notificationType.system" shadow="hover">
    <el-descriptions :title="'系统通知'" :column="3">
      <el-descriptions-item span="1">
        <el-text type="info" size="small">{{ notif.time }}</el-text>
      </el-descriptions-item>
      <el-descriptions-item span="2">
        <template #label>
          <el-icon :size="20"><Setting /></el-icon>
        </template>
        <el-text size="large">{{ notif.content }}</el-text>
      </el-descriptions-item>
    </el-descriptions>
  </el-card>
  <!-- e5分享申请通知 -->
  <el-card shadow="hover">
    <el-descriptions :title="'e5分享申请通知'" :column="3">
      <template #extra>
        <el-button type="primary">加入分享管理</el-button>
      </template>
      <el-descriptions-item span="1">
        <el-text type="info" size="small">2024-3-14 19:30</el-text>
      </el-descriptions-item>
      <el-descriptions-item span="2">
        <template #label>
          <el-icon :size="20"><ChatDotRound /></el-icon>
        </template>
        <el-text size="large">xxx向您申请</el-text>
      </el-descriptions-item>
      <el-descriptions-item span="1">
        <template #label><el-avatar /></template>
        kooriookami<br />
        @kooriookami
      </el-descriptions-item>
      <el-descriptions-item label="留言" span="2">
        测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测
        试测试测试测试测试测试测试测试测试测试测试测试测试测试
      </el-descriptions-item>
    </el-descriptions>
  </el-card>
</template>

<style lang="scss" scoped>
.el-card {
  border-radius: 15px;
  margin-bottom: 20px;
}
</style>
