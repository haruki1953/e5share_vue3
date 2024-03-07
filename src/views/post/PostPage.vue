<script setup>
import { onMounted } from 'vue'
import { usePostsStore } from '@/stores'

// 动态
const postsStore = usePostsStore()

onMounted(() => {
  // 全部标记已读
  postsStore.markAllPostAsRead()
})
</script>
<template>PostsPage</template>
