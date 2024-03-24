<script setup>
import { shareInfoStatus } from '@/config'
defineProps({
  // 状态
  status: {
    required: true,
    type: String
  }
})
</script>
<template>
  <el-tag v-if="status === shareInfoStatus.unsent" type="info" effect="dark">
    未发送
  </el-tag>
  <el-tag v-if="status === 'sent'" type="primary" effect="dark">
    已发送
  </el-tag>
  <el-tag
    v-if="status === shareInfoStatus.pending_confirmation"
    type="warning"
    effect="dark"
  >
    待确认
  </el-tag>
  <el-tag
    v-if="status === shareInfoStatus.confirmed"
    type="success"
    effect="dark"
  >
    已确认
  </el-tag>
  <el-tag v-if="status === shareInfoStatus.stoped" type="danger" effect="dark">
    已停止
  </el-tag>
</template>

<style lang="scss" scoped></style>
