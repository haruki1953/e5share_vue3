<script setup>
import { computed } from 'vue'
import { accountStatus } from '@/config'
import { formatDate, dateRound } from '@/utils/timeUtils'

const props = defineProps({
  // 要展示的用户对象
  user: {
    required: true,
    type: Object
  }
})

// 开始日期与结束日期，formatDate去掉时间应该比较好
const startDate = computed(
  () => new Date(formatDate(props.user.e5_subscription_date))
)
const endDate = computed(
  () => new Date(formatDate(props.user.e5_expiration_date))
)
// 总天数
const totalDays = computed(() =>
  Math.round((endDate.value - startDate.value) / (1000 * 60 * 60 * 24))
)
// 剩余天数
const remainingDays = computed(() =>
  Math.round((endDate.value - dateRound(new Date())) / (1000 * 60 * 60 * 24))
)
// 进度值
const progressVal = computed(() => {
  if (startDate.value > dateRound(new Date())) {
    return 0 // 未开始状态，即订阅开始日期晚于当前日期
  }
  return Math.min(
    ((totalDays.value - remainingDays.value) / totalDays.value) * 100,
    100
  )
})
// 状态 剩余天数大于10时为空，小于时为warning，为小于等于0时为exception
const progressStatus = computed(() => {
  let status = '' // 默认为空状态
  if (remainingDays.value <= 10 && remainingDays.value > 0) {
    status = 'warning' // 警告状态
  } else if (remainingDays.value <= 0) {
    status = 'exception' // 异常状态
  } else if (startDate.value > dateRound(new Date())) {
    status = 'notStarted' // 未开始状态，即订阅开始日期晚于当前日期
  }
  return status
})

// 导出信息
defineExpose({
  startDate,
  endDate,
  totalDays,
  remainingDays,
  progressVal,
  progressStatus
})
</script>

<template>
  <el-progress
    v-if="user.account_status === accountStatus.sharing"
    type="circle"
    :percentage="progressVal"
    :status="progressStatus"
  >
    <div v-if="progressStatus === 'exception'">
      <el-text size="large">已过期</el-text>
    </div>
    <div v-else-if="progressStatus === 'notStarted'">
      <el-text size="large">未开始</el-text>
    </div>
    <div v-else>
      <span class="percentage-value"
        >{{ remainingDays }}/<el-text size="small">{{ totalDays }}</el-text>
      </span>
      <el-text class="percentage-label">剩余天数</el-text>
    </div>
  </el-progress>
  <el-progress v-else type="circle" :percentage="0">
    <el-text size="large">未分享</el-text>
  </el-progress>
</template>

<style lang="scss" scoped>
.el-progress {
  display: flex;
  align-items: center;
}
.percentage-value {
  display: block;
  margin-top: 10px;
  font-size: 28px;
}
.percentage-label {
  display: block;
  margin-top: 10px;
  font-size: 12px;
}
</style>
