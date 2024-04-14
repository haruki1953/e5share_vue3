<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProfileStore } from '@/stores'
import { loadUserData } from '@/utils/dataManage'
import { formatDate } from '@/utils/timeUtils'
import { userUpdateE5infoService } from '@/api/user'

// 日期字符串，用于导出与提交
const e5Form = ref({
  subscriptionDate: '',
  expirationDate: ''
})
defineExpose({
  e5Form
})

// 日期选择表单的引用
const e5dateFormRef = ref()

const profileStore = useProfileStore()
// 显示初始化订阅信息，并判断是否合法
const showOldData = () => {
  // 获取用户信息
  const subDate = formatDate(profileStore.user.e5_subscription_date)
  const expDate = formatDate(profileStore.user.e5_expiration_date)
  // 数据非法时 设置默认为90天
  if (!subDate || !expDate) return e5dateFormRef.value.calculateDates(90, 90)
  // 数据有效
  e5Form.value.subscriptionDate = subDate
  e5Form.value.expirationDate = expDate
}
onMounted(() => {
  showOldData()
})

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
    await loadUserData()
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
      <div class="tittle-button">
        <el-text tag="b" size="large"> 修改E5订阅信息 </el-text>
        <el-button
          type="info"
          round
          size="small"
          @click="$router.push('/share')"
        >
          E5分享管理
        </el-button>
      </div>
    </template>
    <e5date-form v-model="e5Form" ref="e5dateFormRef">
      <template #buttons>
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
      </template>
    </e5date-form>
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
.tittle-button {
  display: flex;
  justify-content: space-between;
}
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
@/utils/dataManage
