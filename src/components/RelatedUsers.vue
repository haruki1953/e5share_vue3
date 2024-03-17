<script setup>
import { computed } from 'vue'
import { useUsersStore } from '@/stores'
const props = defineProps({
  // 要展示的用户列表的id数组
  userIds: {
    required: true,
    type: Array
  }
})

const usersStore = useUsersStore()
// 获取用户列表
const userList = computed(() => {
  // 根据数组 user.helping_users ，通过usersStore.findUserById获取用户对象
  return props.userIds.map((userId) => usersStore.findUserById(userId))
})
</script>
<template>
  <ul class="list-container">
    <li v-for="item in userList" :key="item.id" class="user-item">
      <div><el-avatar :src="item.avatar" /></div>
      <el-text tag="b">{{ item.nickname }}</el-text>
      <el-link
        type="info"
        :underline="false"
        @click.stop="$router.push(`/user/${item.id}`)"
        >@{{ item.username }}</el-link
      >
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.list-container {
  list-style: none;
  padding: 0;
  margin: 0 10px;
  .user-item {
    display: flex;
    align-items: center;
    margin-top: 10px;
    .el-avatar {
      margin-right: 10px;
    }
    .el-text {
      margin-right: 5px;
    }
  }
}
</style>
