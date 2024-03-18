<script setup>
import { ref, computed } from 'vue'
import { useProfileStore } from '@/stores'
import { loadData } from '@/utils/initial'
import { formatDate } from '@/utils/timeUtils'
import { userUpdateE5infoService } from '@/api/user'

// 是否为直接选择日期
const isSelectedDate = ref(false)

// 日期字符串，用于导出与提交
const e5Form = ref({
  subscriptionDate: '',
  expirationDate: ''
})
defineExpose({
  e5Form
})

// 计算属性
// 开始日期
const startDate = computed({
  get: () => new Date(e5Form.value.subscriptionDate),
  set: (val) => {
    e5Form.value.subscriptionDate = formatDate(val)
  }
})
// 结束日期
const endDate = computed({
  get: () => new Date(e5Form.value.expirationDate),
  set: (val) => {
    e5Form.value.expirationDate = formatDate(val)
  }
})

// 根据总天数和剩余天数计算日期
function calculateDates(totalDays, remainingDays) {
  const now = new Date()
  const newStartDate = new Date()
  newStartDate.setDate(now.getDate() - (totalDays - remainingDays))
  const newEndDate = new Date()
  newEndDate.setDate(now.getDate() + remainingDays)
  startDate.value = newStartDate
  endDate.value = newEndDate
}
// 总天数
const totalDays = computed({
  get: () => {
    const days = Math.round(
      (endDate.value - startDate.value) / (1000 * 60 * 60 * 24)
    )
    return days >= 1 ? days : 1
  },
  set: (val) => {
    calculateDates(val, val)
  }
})
// 剩余天数
const remainingDays = computed({
  get: () => {
    const days = Math.round(
      (endDate.value - new Date()) / (1000 * 60 * 60 * 24)
    )
    return days >= 0 ? days : 0
  },
  set: (val) => {
    calculateDates(totalDays.value, val)
  }
})

// 日期范围选择器绑定的计算属性
const daterange = computed({
  get: () => [startDate.value, endDate.value],
  set: (val) => {
    if (!val) {
      return
    }
    if (formatDate(val[0]) === formatDate(val[1])) {
      // val[1].setDate(val[1].getDate() + 1)
    }
    startDate.value = val[0]
    endDate.value = val[1]
  }
})

const profileStore = useProfileStore()
// 显示初始化订阅信息，并判断是否合法
const showOldData = () => {
  // 获取用户信息
  const subDate = formatDate(profileStore.user.e5_subscription_date)
  const expDate = formatDate(profileStore.user.e5_expiration_date)
  // 数据非法时 设置默认为90天
  if (!subDate || !expDate) return calculateDates(90, 90)
  // 数据有效
  startDate.value = subDate
  endDate.value = expDate
}
showOldData()

// 判断当前表单是否和原来相同
const isFormUnchanged = computed(() => {
  return (
    e5Form.value.subscriptionDate ===
      formatDate(profileStore.user.e5_subscription_date) &&
    e5Form.value.expirationDate ===
      formatDate(profileStore.user.e5_expiration_date)
  )
})

// 提交中状态标记
const isSubmitting = ref(false)
// 提交修改E5订阅信息
const submitE5info = async () => {
  if (isFormUnchanged.value) {
    ElMessage('表单未修改')
    showOldData()
    return
  }
  // 设置为提交中状态
  isSubmitting.value = true
  try {
    // 调用修改E5订阅信息的接口
    await userUpdateE5infoService(e5Form.value)
    // 重新获取数据
    await loadData()
    showOldData()
    ElMessage.success('修改成功')
  } finally {
    // 无论提交成功或失败，都要解除提交中状态
    isSubmitting.value = false
  }
}
</script>
<template>
  <el-card shadow="hover">
    <template #header>
      <el-text tag="b" size="large"> 修改E5订阅信息 </el-text>
    </template>
    <div class="form-box">
      <div v-if="isSelectedDate" class="picker-box">
        <el-date-picker
          v-model="daterange"
          type="daterange"
          size="large"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          unlink-panels
          :clearable="false"
        />
      </div>
      <div v-else class="num-box">
        <div>
          <el-text>总天数</el-text>
          <el-slider
            v-model="totalDays"
            :min="1"
            :max="365"
            :step="1"
            step-strictly
            show-input
            size="large"
          />
        </div>
        <div>
          <el-text>剩余天数</el-text>
          <el-slider
            v-model="remainingDays"
            :min="0"
            :max="totalDays"
            :step="1"
            step-strictly
            show-input
            size="large"
          />
        </div>
      </div>
      <div class="button-box">
        <el-checkbox v-model="isSelectedDate"> 直接选择日期 </el-checkbox>
        <div>
          <el-button
            size="large"
            type="primary"
            @click="submitE5info"
            :loading="isSubmitting"
          >
            保存
          </el-button>
          <el-button size="large" type="info" @click="showOldData">
            还原
          </el-button>
        </div>
      </div>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
// .el-card {
//   :deep() {
//     .el-card__body {
//       display: flex;
//       justify-content: center;
//     }
//   }
// }

.form-box {
  margin: 10px 20px;
  .picker-box {
    display: flex;
    justify-content: center;
  }
  .button-box {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }
}
</style>
