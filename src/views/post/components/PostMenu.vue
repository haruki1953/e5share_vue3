<script setup>
import { computed } from 'vue'

import { usePostsStore } from '@/stores'
import PostMenuItem from './PostMenuItem.vue'

defineProps({
  modelValue: {
    type: Number,
    required: true
  },
  // 控制切换时的加载
  isloading: {
    type: Boolean,
    required: true
  }
})
// v-model 与 更新加载状态事件
const emit = defineEmits(['update:modelValue', 'updateLoading'])

const postsStore = usePostsStore()
// 获取e5id列表
const e5idList = computed(() => {
  return postsStore.e5idList
})

// 选择动态
const postSelect = (e5id) => {
  emit('update:modelValue', e5id)
}
</script>

<template>
  <el-card class="post-menu" shadow="hover">
    <template #header>
      <el-text tag="b" size="large" type="primary"> 动态 </el-text>
    </template>
    <el-menu :default-active="String(modelValue)" v-if="e5idList.length">
      <el-menu-item
        v-for="item in e5idList"
        :key="item"
        :index="String(item)"
        @mousedown="postSelect(item)"
      >
        <PostMenuItem :e5id="item"></PostMenuItem>
      </el-menu-item>
    </el-menu>
    <el-empty description="暂无动态" :image-size="100" v-else />
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
    .el-menu-item {
      height: 100px;
      line-height: normal;
    }
  }
}
</style>
