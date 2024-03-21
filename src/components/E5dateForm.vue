<script setup>
import { ref, computed } from 'vue'
import { formatDate } from '@/utils/timeUtils'

// 选择e5日期的表单
// modelValue包含两个属性 subscriptionDate expirationDate 为日期字符串，如2024-03-21
const props = defineProps({
  modelValue: {
    type: Object,
    validator: (value) => {
      // 验证 modelValue 是否包含 subscriptionDate 和 expirationDate 属性
      return 'subscriptionDate' in value && 'expirationDate' in value
    }
  }
})
const emit = defineEmits(['update:modelValue'])

// 是否为直接选择日期
const isSelectedDate = ref(false)

// 获取 开始日期 结束日期
const startDate = computed(() => new Date(props.modelValue.subscriptionDate))
const endDate = computed(() => new Date(props.modelValue.expirationDate))
// 设置日期
const setDate = (startDate, endDate) => {
  emit('update:modelValue', {
    subscriptionDate: formatDate(startDate),
    expirationDate: formatDate(endDate)
  })
}

// 根据总天数和剩余天数计算日期
const calculateDates = (totalDays, remainingDays) => {
  const now = new Date()
  const newStartDate = new Date()
  newStartDate.setDate(now.getDate() - (totalDays - remainingDays))
  const newEndDate = new Date()
  newEndDate.setDate(now.getDate() + remainingDays)
  setDate(newStartDate, newEndDate)
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
    // 如果总天数小于剩余天数，则剩余天数为总天数
    if (val < remainingDays.value) {
      return calculateDates(val, val)
    }
    calculateDates(val, remainingDays.value)
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
      val[1].setDate(val[1].getDate() + 1)
    }
    setDate(val[0], val[1])
  }
})

defineExpose({
  calculateDates,
  totalDays,
  remainingDays
})
</script>

<template>
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
        <slot name="buttons"></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
