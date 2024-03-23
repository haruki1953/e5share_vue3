<script setup>
import { ref, computed } from 'vue'
import { useShareStore } from '@/stores'
import { shareRules } from '@/config/rules'
import { loadShareData } from '@/utils/dataManage'
import { shareUpdateInfoService, shareDeleteInfoService } from '@/api/share'
import { shareInfoCantDelStatus } from '@/config'

// 控制对话框显示隐藏
const dialogVisible = ref(false)
const open = (userId) => {
  shareInfoForm.value.userId = userId
  // userId不存在则返回，并打印信息
  if (!isUserIdExists.value) {
    console.warn('User ID does not exist in ShareInfo')
    return
  }
  // 显示数据
  showOldData()
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
const shareInfoForm = ref({
  userId: null,
  note: ''
})

// 校验规则
const rules = {
  ...shareRules
}

const shareStore = useShareStore()
// 用户id是否存在于分享信息
const isUserIdExists = computed(() => {
  const userId = shareInfoForm.value.userId
  if (!userId) return null
  if (!shareStore.findShareInfoByUserId(userId)) return null
  return userId
})

// 分享信息
const shareInfo = computed(() => {
  return shareStore.findShareInfoByUserId(shareInfoForm.value.userId)
})

// 显示原数据
const showOldData = () => {
  shareInfoForm.value.note = shareInfo.value.note
}

// 提交中状态标记
const isSubmitting = ref(false)

// 修改备注
const submitUpdateNote = async () => {
  // 去除首尾空格
  shareInfoForm.value.note = shareInfoForm.value.note.trim()
  // 预校验
  await form.value.validate()

  // 设置为提交中状态
  isSubmitting.value = true
  try {
    // 调用接口
    await shareUpdateInfoService(shareInfoForm.value)
    // 刷新数据
    await loadShareData()
    ElMessage.success('修改成功')
    // 关闭对话框
    dialogVisible.value = false
  } finally {
    // 无论提交成功或失败，都要解除提交中状态
    isSubmitting.value = false
  }
}

// 删除用户
const submitDelete = async () => {
  await ElMessageBox.confirm('您确认要删除么', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })

  // 设置为提交中状态
  isSubmitting.value = true
  try {
    // 调用接口
    await shareDeleteInfoService(shareInfoForm.value)
    // 刷新数据
    await loadShareData()
    ElMessage.success('删除成功')
    // 关闭对话框
    dialogVisible.value = false
  } finally {
    // 无论提交成功或失败，都要解除提交中状态
    isSubmitting.value = false
  }
}

// 是否不能删除
const isCantDel = computed(() => {
  return shareInfoCantDelStatus.includes(shareInfo.value.status)
})
</script>
<template>
  <el-dialog
    v-model="dialogVisible"
    title="操作用户"
    width="500px"
    v-if="isUserIdExists"
  >
    <template #header>
      <user-item :userId="isUserIdExists"></user-item>
    </template>
    <el-form
      :model="shareInfoForm"
      :rules="rules"
      ref="form"
      size="large"
      autocomplete="off"
      v-loading="isSubmitting"
    >
      <el-form-item prop="note">
        <el-input
          v-model="shareInfoForm.note"
          type="textarea"
          placeholder="请输入备注"
          maxlength="500"
          show-word-limit
          :autosize="{ minRows: 3, maxRows: 6 }"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <div class="button-box">
          <div>
            <el-button type="primary" @click="submitUpdateNote">
              修改备注
            </el-button>
            <el-button type="info" @click="showOldData"> 还原 </el-button>
          </div>
          <div>
            <el-tooltip
              content="当前分享状态为已确认，需先停止分享才能删除"
              v-if="isCantDel"
            >
              <el-button type="danger" plain disabled> 删除用户 </el-button>
            </el-tooltip>
            <el-button type="danger" plain @click="submitDelete" v-else>
              删除用户
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
