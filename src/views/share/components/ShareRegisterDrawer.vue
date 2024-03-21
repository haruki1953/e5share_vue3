<script setup>
import { ref, nextTick } from 'vue'
import { shareRegisterService } from '@/api/share'

// 控制抽屉显示隐藏
const visibleDrawer = ref(false)
const open = () => {
  // 显示抽屉
  visibleDrawer.value = true
  // 使用 nextTick 延迟执行 初始化数据 方法
  nextTick(() => {
    showOldData()
  })
}

// 日期字符串，用于提交
const e5Form = ref({
  subscriptionDate: '',
  expirationDate: ''
})

// 日期选择表单的引用
const e5dateFormRef = ref()

// 显示初始化订阅信息 默认为90天
const showOldData = () => {
  e5dateFormRef.value.calculateDates(90, 90)
}

// 提交中状态标记
const isSubmitting = ref(false)
// 提交修改E5订阅信息
const submitE5info = async () => {
  // 设置为提交中状态
  isSubmitting.value = true
  try {
    // 调用修改E5订阅信息的接口
    await shareRegisterService(e5Form.value)
    ElMessage.success('登记成功')
    // 关闭抽屉
  } finally {
    // 无论提交成功或失败，都要解除提交中状态
    isSubmitting.value = false
  }
}

// 导出open方法
defineExpose({
  open
})
</script>

<template>
  <el-drawer
    v-model="visibleDrawer"
    :with-header="false"
    direction="rtl"
    size="600"
  >
    <el-scrollbar>
      <!-- 登记表单 -->
      <div class="register-form">
        <el-text tag="h1" size="large" class="form-title"
          >设置E5订阅信息 | 登记分享</el-text
        >
        <e5date-form v-model="e5Form" ref="e5dateFormRef">
          <template #buttons>
            <el-button
              size="large"
              type="primary"
              @click="submitE5info"
              :loading="isSubmitting"
            >
              登记
            </el-button>
            <el-button size="large" type="info" @click="showOldData">
              还原
            </el-button>
          </template>
        </e5date-form>
      </div>
      <!-- 帮助信息 -->
      <div class="help-docs"></div>
    </el-scrollbar>
  </el-drawer>
</template>

<style lang="scss" scoped>
.form-title {
  margin-bottom: 20px;
}
</style>
