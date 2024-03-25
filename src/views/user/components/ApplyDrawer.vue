<script setup>
import { ref } from 'vue'
import { shareRules } from '@/config/rules'
import { shareApplicationService } from '@/api/share'
import { useShareStore } from '@/stores'

const props = defineProps({
  // e5帐号主的id
  e5id: {
    required: true,
    type: Number
  }
})
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
const applyForm = ref({
  e5id: props.e5id,
  message: ''
})

// 校验规则
const rules = { ...shareRules }

// 提交中状态标记
const isSubmitting = ref(false)

const shareStore = useShareStore()
// 提交分享申请
const submitApply = async () => {
  // 去除首尾空格
  applyForm.value.message = applyForm.value.message.trim()
  // 预校验
  await form.value.validate()

  await ElMessageBox.confirm('您确认要发送申请么', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })

  // 设置为提交中状态
  isSubmitting.value = true
  try {
    // 调用接口
    const res = await shareApplicationService(applyForm.value)
    // 处理返回的数据
    shareStore.addApplyInfo(applyForm.value.e5id, res.data.data.id)

    ElMessage.success('申请发送成功')
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
    direction="rtl"
    size="600"
  >
    <!-- 申请表单 -->
    <div class="cancel-form">
      <el-text tag="h1" size="large" class="form-title"> 申请E5账号 </el-text>
      <el-form
        :model="applyForm"
        :rules="rules"
        ref="form"
        size="large"
        autocomplete="off"
      >
        <el-space fill>
          <el-alert type="info" show-icon :closable="false">
            <p>请在发送申请后，根据联系方式与E5账号主取得联系。</p>
          </el-alert>
          <el-form-item prop="message">
            <el-input
              v-model="applyForm.message"
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
            type="primary"
            :loading="isSubmitting"
            @click="submitApply"
          >
            发送申请
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 帮助信息 -->
    <div class="help-docs"></div>
  </el-drawer>
</template>

<style lang="scss" scoped>
.form-title {
  margin-bottom: 20px;
}
</style>
