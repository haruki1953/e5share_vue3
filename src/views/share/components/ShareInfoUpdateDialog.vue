<script setup>
import { ref, computed } from 'vue'
import { useShareStore } from '@/stores'
import { shareRules } from '@/config/rules'
import { loadShareData, loadUserData } from '@/utils/dataManage'
import {
  shareUpdateInfoService,
  shareDeleteInfoService,
  shareConfmSendService,
  shareStopSharingService
} from '@/api/share'
import { shareInfoCantDelStatus, shareInfoStatus } from '@/config'
import StatusTag from './StatusTag.vue'

// 控制对话框显示隐藏
const dialogVisible = ref(false)
const open = (userId) => {
  // 重置表单
  shareInfoForm.value.userId = userId
  shareInfoForm.value.note = ''
  shareInfoForm.value.message = ''
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
  note: '',
  message: ''
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

// 判断备注是否和原来相同
const isNoteUnchanged = computed(() => {
  return shareInfoForm.value.note === shareInfo.value.note
})

// 修改备注
const submitUpdateNote = async () => {
  // 去除首尾空格
  shareInfoForm.value.note = shareInfoForm.value.note.trim()
  // 预校验
  await form.value.validate()

  if (isNoteUnchanged.value) {
    ElMessage('表单未修改')
    showOldData()
    return
  }

  // 设置为提交中状态
  isSubmitting.value = true
  try {
    // 调用接口
    await shareUpdateInfoService(shareInfoForm.value)
    // 刷新数据
    await loadShareData()
    showOldData()
    ElMessage.success('修改成功')
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

// 分享进度
const shareStep = computed(() => {
  let stepVal = 0
  switch (shareInfo.value.status) {
    case shareInfoStatus.unsent:
      stepVal = 0
      break
    case shareInfoStatus.pending_confirmation:
      stepVal = 1
      break
    case shareInfoStatus.confirmed:
      stepVal = 2
      break
    default:
      break
  }
  return stepVal
})

// 发送确认
const submitSendConfirm = async () => {
  // 去除首尾空格
  shareInfoForm.value.message = shareInfoForm.value.message.trim()
  // 预校验
  await form.value.validate()

  await ElMessageBox.confirm(
    '请与用户取得联系，并告知其E5子账号信息',
    '您确认要发送分享确认吗',
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
    await shareConfmSendService(shareInfoForm.value)
    // TODO 处理返回信息

    // 刷新数据
    await loadShareData()
    showOldData()
    ElMessage.success('确认信息发送成功')
  } finally {
    // 无论提交成功或失败，都要解除提交中状态
    isSubmitting.value = false
  }
}

// 停止分享
const submitStopShareing = async () => {
  // 去除首尾空格
  shareInfoForm.value.message = shareInfoForm.value.message.trim()
  // 预校验
  await form.value.validate()

  await ElMessageBox.confirm('请事先告知用户', '您确认要停止对用户的分享吗', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })

  // 设置为提交中状态
  isSubmitting.value = true
  try {
    // 调用接口
    await shareStopSharingService(shareInfoForm.value)
    // 刷新数据
    await Promise.all([loadUserData(), loadShareData()])
    showOldData()
    ElMessage.success('停止分享成功')
  } finally {
    // 无论提交成功或失败，都要解除提交中状态
    isSubmitting.value = false
  }
}
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
            <el-button size="large" type="primary" @click="submitUpdateNote">
              修改备注
            </el-button>
            <el-button size="large" type="info" @click="showOldData">
              还原
            </el-button>
          </div>
          <div>
            <el-tooltip content="需停止分享后才能删除" v-if="isCantDel">
              <el-button size="large" type="danger" plain disabled>
                删除用户
              </el-button>
            </el-tooltip>
            <el-button
              size="large"
              type="danger"
              plain
              @click="submitDelete"
              v-else
            >
              删除用户
            </el-button>
          </div>
        </div>
      </el-form-item>
      <!-- 状态 -->
      <el-divider content-position="left">
        <el-text tag="b" size="large"> 当前状态为： </el-text>
        <status-tag :status="shareInfo.status" size="default"></status-tag>
      </el-divider>
      <!-- 已停止的提示 -->
      <el-alert
        type="info"
        show-icon
        :closable="false"
        v-if="shareInfo.status === shareInfoStatus.stoped"
      >
        <p>如果需重新分享，请删除后重新添加</p>
      </el-alert>
      <!-- 进度 -->
      <el-steps :active="shareStep" align-center v-else>
        <el-step description="发送分享确认">
          <template #title>
            <status-tag
              :status="shareStep > 0 ? 'sent' : shareInfoStatus.unsent"
            ></status-tag>
          </template>
        </el-step>
        <el-step
          description="用户接受确认"
          :status="shareStep > 1 ? 'success' : ''"
        >
          <template #title>
            <status-tag
              :status="
                shareStep > 1
                  ? shareInfoStatus.confirmed
                  : shareInfoStatus.pending_confirmation
              "
            ></status-tag>
          </template>
        </el-step>
      </el-steps>
      <!-- 发送确认表单 -->
      <div
        class="share-form"
        v-if="shareInfo.status === shareInfoStatus.unsent"
      >
        <el-form-item>
          <el-text tag="b" size="large" class="form-title">
            发送分享确认
          </el-text>
        </el-form-item>
        <el-form-item prop="message">
          <el-input
            v-model="shareInfoForm.message"
            type="textarea"
            placeholder="请输入留言"
            maxlength="500"
            show-word-limit
            :autosize="{ minRows: 3, maxRows: 6 }"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="large" type="primary" @click="submitSendConfirm">
            发送
          </el-button>
        </el-form-item>
      </div>
      <!-- 停止分享表单 -->
      <div
        class="share-form"
        v-if="shareInfo.status === shareInfoStatus.confirmed"
      >
        <el-form-item>
          <el-text tag="b" size="large" class="form-title"> 停止分享 </el-text>
        </el-form-item>
        <el-form-item prop="message">
          <el-input
            v-model="shareInfoForm.message"
            type="textarea"
            placeholder="请输入留言"
            maxlength="500"
            show-word-limit
            :autosize="{ minRows: 3, maxRows: 6 }"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="large" type="danger" @click="submitStopShareing">
            停止分享
          </el-button>
        </el-form-item>
      </div>
    </el-form>
  </el-dialog>
</template>
<style lang="scss" scoped>
.button-box {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.el-divider {
  margin-top: 50px;
}

.el-step {
  margin-top: 20px;
}

.share-form {
  margin-top: 20px;
}
</style>
