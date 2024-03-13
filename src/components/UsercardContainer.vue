<script setup>
import { computed } from 'vue'
const props = defineProps({
  // 要展示的用户对象列表
  dataList: {
    required: true,
    type: Array
  },
  // 最小卡片数
  minCardCount: {
    type: Number,
    default: 0
  }
})

// 骨架屏数量，数据少于最小卡片数时补充
const skeletonCount = computed(() => {
  return Math.max(0, props.minCardCount - props.dataList.length)
})
</script>

<template>
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
  // 视口宽度大于1400px时为3列
  @media (min-width: 1400px) {
    column-count: 3;
  }
  // 每个元素的样式
  .card-item {
    break-inside: avoid; // 避免元素跨列
    margin-bottom: 20px; // 行间距
  }
}
</style>
