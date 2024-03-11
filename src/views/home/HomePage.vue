<script setup>
import { computed } from 'vue'
import { useUsersStore } from '@/stores'

// 用户列表
const usersStore = useUsersStore()

// 要显示的数据
const dataList = computed(() => {
  const sharingUsers = usersStore.sharingUsers
  // 如果sharingUsers（user对象数组）小于5个，创建骨架屏对象补充
  const skeletonItems = Array.from(
    { length: Math.max(0, 5 - sharingUsers.length) },
    () => ({
      skeleton: true,
      // 骨架行数随机3-9
      rows: Math.floor(Math.random() * (9 - 3 + 1)) + 3
    })
  )
  // 合并 sharingUsers 和 skeletonItems
  return [...sharingUsers, ...skeletonItems]
})
</script>

<template>
  <el-scrollbar>
    <!-- 使用列布局 -->
    <div class="card-container">
      <div class="card-item" v-for="(item, index) in dataList" :key="index">
        <!-- 骨架屏 -->
        <user-skeleton v-if="item.skeleton" :rows="item.rows"></user-skeleton>
        <!-- 用户卡片 -->
        <user-card v-else :user="item"></user-card>
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
