<script setup>
import { ref, computed } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { useUsersStore } from '@/stores'

// 用户列表
const usersStore = useUsersStore()

// 搜索值 用于绑定
const searchVal = ref('')

// 搜索键 用于生成显示的数据
const searchKey = ref('')

// 要显示的数据
const dataList = computed(() => {
  return usersStore.searchUsers(searchKey.value)
})

// 处理搜索按钮点击事件
const handleSearch = () => {
  searchKey.value = searchVal.value
}

// showAll 显示全部用户
const showAll = () => {
  searchVal.value = ''
  searchKey.value = ''
}
</script>

<template>
  <el-scrollbar>
    <!-- 搜索栏 -->
    <el-card class="search-card">
      <div class="search-row">
        <el-input
          v-model="searchVal"
          size="large"
          placeholder="搜索用户"
          :prefix-icon="Search"
          clearable
          @keydown.enter="handleSearch"
        />
        <el-button
          type="primary"
          size="large"
          :icon="Search"
          circle
          @click="handleSearch"
        />
      </div>
    </el-card>
    <!-- 用户卡片容器 -->
    <usercard-container :dataList="dataList"></usercard-container>
    <el-empty v-if="!dataList.length" description="未找到用户">
      <el-button type="primary" size="large" @click="showAll">
        显示全部用户
      </el-button>
    </el-empty>
  </el-scrollbar>
</template>

<style lang="scss" scoped>
.search-card {
  margin: 10px 20px 15px 0;
  border-radius: 15px;
  .search-row {
    display: flex;
    align-items: center;
  }
  .el-input {
    margin-right: 15px;
  }
  :deep() {
    .el-card__body {
      padding: 15px;
    }
  }
}
</style>
