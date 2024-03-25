<script setup>
import { ref, computed } from 'vue'
import { shareRules } from '@/config/rules'
import { loadAllData } from '@/utils/dataManage'
import { useUsersStore } from '@/stores'
import { shareConfirmAcceptService } from '@/api/share'

const userStore = useUsersStore()
// 用户id是否存在
const isUserIdExists = computed(() => {
  const userId = confirmForm.value.e5id
  if (!userId) return null
  if (!userStore.findUserById(userId)) return null
  return userId
})

// 控制对话框显示隐藏
const dialogVisible = ref(false)
const open = (userId) => {
  // 重置表单
  confirmForm.value.e5id = userId
  confirmForm.value.message = ''
  // userId不存在则返回，并打印信息
  if (!isUserIdExists.value) {
    console.warn('User ID does not exist in ShareInfo')
    return
  }
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
const confirmForm = ref({
  e5id: null,
  message: ''
})

// 校验规则
const rules = {
  ...shareRules
}

// 提交中状态标记
const isSubmitting = ref(false)

// 接受确认
const submitConfirm = async () => {
  // 去除首尾空格
  confirmForm.value.message = confirmForm.value.message.trim()
  // 预校验
  await form.value.validate()

  // 设置为提交中状态
  isSubmitting.value = true
  try {
    // 调用接口
    await shareConfirmAcceptService(confirmForm.value)
    // TODO 处理返回信息

    // 刷新数据
    await loadAllData()
    ElMessage.success('确认成功')
    // 关闭对话框
    dialogVisible.value = false
  } finally {
    // 无论提交成功或失败，都要解除提交中状态
    isSubmitting.value = false
  }
}
</script>
<template>
  <el-dialog v-model="dialogVisible" width="500px" v-if="isUserIdExists">
    <template #header>
      <user-item :userId="confirmForm.e5id"></user-item>
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
          v-model="confirmForm.message"
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
            <el-button size="large" type="primary" @click="submitConfirm">
              确认接受分享
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
