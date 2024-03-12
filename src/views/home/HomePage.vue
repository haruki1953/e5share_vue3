<script setup>
import { computed } from 'vue'
import { useUsersStore } from '@/stores'

// 用户列表
const usersStore = useUsersStore()

// 要显示的数据
const dataList = computed(() => {
  return usersStore.sharingUsers
})

// 骨架屏数量，首页卡片小于5个时补充
const skeletonCount = computed(() => {
  return Math.max(0, 5 - dataList.value.length)
})
</script>

<template>
  <el-scrollbar>
    <!-- 使用列布局 -->
    <div class="card-container">
      <div v-for="item in dataList" :key="item.id" class="card-item">
        <!-- 用户卡片 -->
        <user-card :user="item"></user-card>
      </div>
      <div v-for="index in skeletonCount" :key="index" class="card-item">
        <!-- 骨架屏 -->
        <user-skeleton></user-skeleton>
      </div>
    </div>
  </el-scrollbar>
</template>

<style lang="scss" scoped>
.card-container {
  margin: 10px 20px 10px 0;
  // 使用列布局
  column-count: 1; // 列数 默认为1列
  column-gap: 20px; // 列间距
  // 视口宽度大于900px时为2列
  @media (min-width: 900px) {
    column-count: 2;
  }
  // 视口宽度大于1300px时为3列
  @media (min-width: 1300px) {
    column-count: 3;
  }
  // 每个元素的样式
  .card-item {
    break-inside: avoid; // 避免元素跨列
    margin-bottom: 20px; // 行间距
  }
}
</style>
