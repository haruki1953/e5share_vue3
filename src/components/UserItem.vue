<script setup>
import { computed } from 'vue'
import { useUsersStore } from '@/stores'
const props = defineProps({
  // 要展示的用户id
  userId: {
    required: true,
    type: Number
  },
  // 用户名链接是否可跳转，默认为true
  usernameLink: {
    type: Boolean,
    default: true
  }
})
const usersStore = useUsersStore()
// 获取用户
const user = computed(() => {
  // 根据id查找用户
  return usersStore.findUserById(props.userId)
})
</script>
<template>
  <div class="user-item">
    <div class="user-item"><el-avatar :src="user.avatar" /></div>
    <el-text tag="b"> {{ user.nickname }} </el-text>
    <el-link
      type="info"
      :underline="false"
      @click.stop="$router.push(`/user/${user.id}`)"
      v-if="usernameLink"
    >
      @{{ user.username }}
    </el-link>
    <el-link type="info" :underline="false" v-else>
      @{{ user.username }}
    </el-link>
  </div>
</template>
<style lang="scss" scoped>
.user-item {
  display: flex;
  align-items: center;
  .el-avatar {
    margin-right: 10px;
  }
  .el-text {
    margin-right: 5px;
  }
}
</style>
