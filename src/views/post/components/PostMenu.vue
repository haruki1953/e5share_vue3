<script setup>
// import { ref, computed } from 'vue'
// import { usePostsStore } from '@/stores'

// const props = defineProps({
//   e5id: {
//     type: Number,
//     required: true
//   }
// })

// const postsStore = usePostsStore()
// // 获取e5id列表
// const e5idList = computed(() => {
//   return postsStore.e5idList
// })
</script>

<template>
  <el-card class="post-menu" shadow="hover">
    <template #header>
      <el-text tag="b" size="large" type="primary"> 动态 </el-text>
    </template>
    <el-menu :default-active="e5id">
      <el-menu-item :index="1"> </el-menu-item>
    </el-menu>
  </el-card>
</template>

<style lang="scss" scoped>
.post-menu {
  :deep() {
    .el-card__body {
      padding: 0;
    }
  }
  .el-menu {
    border-right: none;
    :deep() {
      .is-active {
        background-color: #d9ecff;
      }
    }
  }
}
</style>
