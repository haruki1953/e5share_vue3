<script setup>
import { useUserStore } from '@/stores/index'
const userStore = useUserStore()
</script>

<template>
  <div>
    <router-view></router-view>
    我是app
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>

    <p>{{ userStore.token }}</p>
    <el-button @click="userStore.setToken('Bearer xxx')">登录</el-button>
    <el-button @click="userStore.removeToken()">退出</el-button>
  </div>
</template>

<style scoped></style>
