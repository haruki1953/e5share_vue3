<script setup>
defineProps({
  // 要展示的用户列表的id数组
  userIds: {
    required: true,
    type: Array
  }
})
</script>
<template>
  <ul class="list-container">
    <li v-for="item in userIds" :key="item" class="user-item">
      <user-item :userId="item"></user-item>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.list-container {
  list-style: none;
  padding: 0;
  margin: 0 10px;
  .user-item {
    margin-top: 10px;
  }
}
</style>
