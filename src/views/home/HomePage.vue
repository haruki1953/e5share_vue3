<script setup>
import { computed } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { useUsersStore } from '@/stores'
import E5sharingCard from './components/E5sharingCard.vue'
import E5sharingSkeleton from './components/E5sharingSkeleton.vue'

// 用户列表
const usersStore = useUsersStore()

// 要显示的数据
const dataList = computed(() => {
  const sharingUsers = usersStore.sharingUsers
  // 如果sharingUsers（user对象数组）小于六个，创建骨架屏对象补充
  const skeletonItems = Array.from(
    { length: Math.max(0, 6 - sharingUsers.length) },
    () => ({
      id: uuidv4(),
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
    <el-row class="card-container">
      <el-col v-for="item in dataList" :key="item.id" :span="8">
        <!-- 骨架屏 -->
        <e5sharing-skeleton
          v-if="item.skeleton"
          :rows="item.rows"
        ></e5sharing-skeleton>
        <!-- 用户卡片 -->
        <e5sharing-card v-else :user="item"></e5sharing-card>
      </el-col>
    </el-row>
  </el-scrollbar>
</template>

<style lang="scss" scoped>
.card-container {
  margin-top: 10px;
}
</style>
