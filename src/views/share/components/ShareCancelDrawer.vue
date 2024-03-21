<script setup>
import { ref } from 'vue'
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
      <div class="register-form"></div>
      <!-- 帮助信息 -->
      <div class="help-docs"></div>
    </el-scrollbar>
  </el-drawer>
</template>

<style lang="scss" scoped></style>
