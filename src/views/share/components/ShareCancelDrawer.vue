<script setup>
import { ref } from 'vue'
import { shareRules } from '@/config/rules'
import { loadUserData } from '@/utils/dataManage'
import { shareCancelService } from '@/api/share'
import { useShareStore } from '@/stores'

// 控制抽屉显示隐藏
const visibleDrawer = ref(false)
const open = () => {
  // 显示抽屉
  visibleDrawer.value = true
}

// 导出open方法
defineExpose({
  open
})

// 表单组件
const form = ref()

// 用于提交的form数据对象
const cancelForm = ref({
  message: ''
})

// 校验规则
const rules = { ...shareRules }

// 提交中状态标记
const isSubmitting = ref(false)

const shareStore = useShareStore()
// 提交注销分享
const submitCancel = async () => {
  // 去除首尾空格
  cancelForm.value.message = cancelForm.value.message.trim()
  // 预校验
  await form.value.validate()

  await ElMessageBox.confirm('您确认要注销分享么', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })

  // 设置为提交中状态
  isSubmitting.value = true
  try {
    // 调用接口
    await shareCancelService(cancelForm.value)
    // 清除本地分享信息
    shareStore.removeInfoOnCancelShare()
    // 刷新数据
    await loadUserData()
    ElMessage.success('注销成功')
  } finally {
    // 无论提交成功或失败，都要解除提交中状态
    isSubmitting.value = false
  }
}
</script>

<template>
  <el-drawer
    v-model="visibleDrawer"
    :with-header="false"
    title="注销分享"
    direction="rtl"
    size="600"
  >
    <el-scrollbar>
      <!-- 注销表单 -->
      <div class="cancel-form">
        <el-text tag="h1" size="large" class="form-title"> 注销分享 </el-text>
        <el-form
          :model="cancelForm"
          :rules="rules"
          ref="form"
          size="large"
          autocomplete="off"
        >
          <el-space fill>
            <el-alert type="info" show-icon :closable="false">
              <p>注销分享将取消对所有用户的分享，请填写留言以说明情况</p>
            </el-alert>
            <el-form-item prop="message">
              <el-input
                v-model="cancelForm.message"
                type="textarea"
                placeholder="请输入留言"
                maxlength="500"
                show-word-limit
                :autosize="{ minRows: 3, maxRows: 6 }"
              ></el-input>
            </el-form-item>
          </el-space>
          <el-form-item>
            <el-button
              type="danger"
              :loading="isSubmitting"
              @click="submitCancel"
            >
              注销分享
            </el-button>
          </el-form-item>
        </el-form>
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
