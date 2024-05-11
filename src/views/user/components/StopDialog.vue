<script setup>
import { ref } from 'vue'
import { shareRules } from '@/config/rules'
import { loadAllData } from '@/utils/dataManage'
import { shareStopReceivingService } from '@/api/share'

const props = defineProps({
  // e5帐号主的id
  e5id: {
    required: true,
    type: Number
  }
})

// 控制对话框显示隐藏
const dialogVisible = ref(false)
const open = () => {
  // 显示抽屉
  dialogVisible.value = true
}
// 导出open方法
defineExpose({
  open
})

// 表单组件
const form = ref()

// 用于提交的form数据对象
const stopForm = ref({
  e5id: props.e5id,
  message: ''
})

// 校验规则
const rules = { ...shareRules }

// 提交中状态标记
const isSubmitting = ref(false)
// 提交停止接受分享
const submitStop = async () => {
  // 去除首尾空格
  stopForm.value.message = stopForm.value.message.trim()
  // 预校验
  await form.value.validate()

  await ElMessageBox.confirm(
    '请事先联系E5账号主，或填写留言以说明情况',
    '您确认要停止接受分享吗',
    {
      type: 'warning',
      confirmButtonText: '确认',
      cancelButtonText: '取消'
    }
  )

  // 设置为提交中状态
  isSubmitting.value = true
  try {
    // 调用接口
    await shareStopReceivingService(stopForm.value)
    // 刷新数据
    await loadAllData()
    ElMessage.success('停止接受分享成功')
    // 关闭对话框
    dialogVisible.value = false
  } finally {
    // 无论提交成功或失败，都要解除提交中状态
    isSubmitting.value = false
  }
}
</script>

<template>
  <el-dialog v-model="dialogVisible" width="500px">
    <template #header>
      <user-item :userId="stopForm.e5id"></user-item>
    </template>
    <el-form
      :model="confirmForm"
      :rules="rules"
      ref="form"
      autocomplete="off"
      v-loading="isSubmitting"
    >
      <el-form-item prop="message">
        <el-input
          v-model="stopForm.message"
          type="textarea"
          placeholder="请输入留言"
          maxlength="500"
          show-word-limit
          :autosize="{ minRows: 3, maxRows: 6 }"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <div class="button-box">
          <div>
            <el-button size="large" type="danger" @click="submitStop">
              停止接受分享
            </el-button>
          </div>
          <div>
            <el-button size="large" type="info" @click="dialogVisible = false">
              取消
            </el-button>
          </div>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style lang="scss" scoped>
.button-box {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
