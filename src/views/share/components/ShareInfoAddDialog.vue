<script setup>
import { ref } from 'vue'
// 控制对话框显示隐藏
const dialogVisible = ref(false)
const open = (userId) => {
  // 存在userId时自动填入
  console.log(userId)
  // 显示抽屉
  dialogVisible.value = true
}

// 导出open方法
defineExpose({
  open
})
</script>
<template>
  <el-dialog v-model="dialogVisible" title="添加用户" width="500"></el-dialog>
</template>
