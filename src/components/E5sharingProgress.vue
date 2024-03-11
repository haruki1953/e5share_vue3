<script setup>
import { computed } from 'vue'

const props = defineProps({
  // 要展示的用户对象
  user: {
    required: true,
    type: Object
  }
})

// 开始日期与结束日期
const startDate = computed(() => new Date(props.user.e5_subscription_date))
const endDate = computed(() => new Date(props.user.e5_expiration_date))
// 总天数
const totalDays = computed(() =>
  Math.round((endDate.value - startDate.value) / (1000 * 60 * 60 * 24))
)
// 剩余天数
const remainingDays = computed(() =>
  Math.round((endDate.value - new Date()) / (1000 * 60 * 60 * 24))
)
// 进度值
const progressVal = computed(() =>
  Math.min(
    ((totalDays.value - remainingDays.value) / totalDays.value) * 100,
    100
  )
)
// 状态 剩余天数大于10时为空，小于时为warning，为小于等于0时为exception
const progressStatus = computed(() => {
  let status = '' // 默认为空状态
  if (remainingDays.value <= 10 && remainingDays.value > 0) {
    status = 'warning' // 警告状态
  } else if (remainingDays.value <= 0) {
    status = 'exception' // 异常状态
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
  <el-progress type="circle" :percentage="progressVal" :status="progressStatus">
    <div v-if="progressStatus === 'exception'">
      <el-text size="large">已过期</el-text>
    </div>
    <div v-else>
      <span class="percentage-value"
        >{{ remainingDays }}/<el-text size="small">{{ totalDays }}</el-text>
      </span>
      <el-text class="percentage-label">剩余天数</el-text>
    </div>
  </el-progress>
</template>

<style lang="scss" scoped>
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
