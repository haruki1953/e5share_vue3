<script setup>
import { ref, computed } from 'vue'
import { Edit } from '@element-plus/icons-vue'
import { shareRules } from '@/config/rules'
import { loadShareData } from '@/utils/dataManage'
import { useUsersStore, useProfileStore, useShareStore } from '@/stores'
import { shareAddInfoService } from '@/api/share'

// 控制对话框显示隐藏
const dialogVisible = ref(false)
const open = (userId) => {
  // 存在userId时自动填入
  if (userId) {
    addInfoForm.value.userId = userId
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
const addInfoForm = ref({
  userId: null,
  note: ''
})
// 用于搜索
const searchKey = ref('')

const userStore = useUsersStore()
// 用户id是否存在
const isUserIdExists = computed(() => {
  const userId = addInfoForm.value.userId
  if (!userId) return null
  if (!userStore.findUserById(userId)) return null
  return userId
})

const profileStore = useProfileStore()
const shareStore = useShareStore()
// 校验规则
const rules = {
  ...shareRules,
  userId: [
    { required: true, message: '请选择用户', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        // 判断用户id是否存在
        if (!isUserIdExists.value) {
          callback(new Error('用户不存在'))
        } else {
          callback() // 就算校验成功，也需要callback
        }
      },
      trigger: 'blur'
    },
    {
      validator: (rule, value, callback) => {
        // 判断用户id是否为自己
        if (value === profileStore.user.id) {
          callback(new Error('不能添加自己'))
        } else {
          callback() // 就算校验成功，也需要callback
        }
      },
      trigger: 'blur'
    },
    {
      validator: (rule, value, callback) => {
        // 判断用户id是否已存在与分享信息
        if (shareStore.findShareInfoByUserId(value)) {
          callback(new Error('用户已存在于分享信息'))
        } else {
          callback() // 就算校验成功，也需要callback
        }
      },
      trigger: 'blur'
    }
  ]
}

// 输入建议方法
const querySearch = (queryString, cb) => {
  cb(userStore.searchUsers(queryString))
}

// 选择的处理函数
const handleSelect = (item) => {
  addInfoForm.value.userId = item.id
}

// 重新选择，重置表单
const resetForm = () => {
  form.value.resetFields()
  searchKey.value = ''
  addInfoForm.value.userId = null
  addInfoForm.value.note = ''
}

// 提交中状态标记
const isSubmitting = ref(false)
// 提交添加分享信息
const submitAddInfo = async () => {
  // 去除首尾空格
  addInfoForm.value.note = addInfoForm.value.note.trim()
  // 预校验
  await form.value.validate()

  // 设置为提交中状态
  isSubmitting.value = true
  try {
    // 调用接口
    await shareAddInfoService(addInfoForm.value)
    // 刷新数据
    await loadShareData()
    ElMessage.success('添加成功')
    // 重置数据，关闭对话框
    resetForm()
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
      <el-text tag="h1" size="large" class="form-title"> 添加用户 </el-text>
    </template>
    <el-form
      :model="addInfoForm"
      :rules="rules"
      ref="form"
      size="large"
      autocomplete="off"
    >
      <el-form-item prop="userId">
        <div class="user-item" v-if="isUserIdExists">
          <user-item :userId="isUserIdExists"></user-item>
        </div>
        <div class="user-search" v-else>
          <el-autocomplete
            v-model="searchKey"
            :fetch-suggestions="querySearch"
            placeholder="搜索用户 | 选择用户"
            @select="handleSelect"
            @keydown.enter.prevent
          >
            <template #suffix>
              <el-icon class="el-input__icon">
                <Edit />
              </el-icon>
            </template>
            <template #default="{ item }">
              <user-item
                :userId="item.id"
                class="user-select"
                :usernameLink="false"
              ></user-item>
            </template>
          </el-autocomplete>
        </div>
      </el-form-item>
      <el-form-item prop="note">
        <el-input
          v-model="addInfoForm.note"
          type="textarea"
          placeholder="请输入备注"
          maxlength="500"
          show-word-limit
          :autosize="{ minRows: 3, maxRows: 6 }"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <div class="button-box">
          <el-button
            type="primary"
            :loading="isSubmitting"
            @click="submitAddInfo"
          >
            添加
          </el-button>
          <el-button type="info" @click="resetForm"> 重新选择 </el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style lang="scss" scoped>
.user-search {
  margin: 0 auto;
}
.user-item {
  margin: 0 auto;
}
.button-box {
  margin: 0 auto;
}
.user-select {
  margin: 10px 0;
}
</style>
