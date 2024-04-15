<script setup>
import { computed } from 'vue'
import { useUsersStore } from '@/stores'

// 用户列表
const usersStore = useUsersStore()

// 要显示的数据
const dataList = computed(() => {
  return usersStore.sharingUsers
})
</script>

<template>
  <el-scrollbar>
    <!-- 使用用户卡片容器 -->
    <usercard-container
      :dataList="dataList"
      :minCardCount="3"
    ></usercard-container>
  </el-scrollbar>
</template>

<style lang="scss" scoped></style>
