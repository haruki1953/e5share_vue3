<script setup>
import { computed, onMounted } from 'vue'
import { usePostsStore } from '@/stores'
import PostMenuItem from './PostMenuItem.vue'

defineProps({
  modelValue: {
    type: Number,
    required: true
  }
})
const emit = defineEmits(['update:modelValue'])

const postsStore = usePostsStore()
// 获取e5id列表
const e5idList = computed(() => {
  return postsStore.e5idList
})

// 选择动态
const postSelect = (e5id) => {
  emit('update:modelValue', e5id)
}

// 初始化e5id
onMounted(() => {
  if (e5idList.value.length) {
    postSelect(e5idList.value[0])
  }
})
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
        @click="postSelect(item)"
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
