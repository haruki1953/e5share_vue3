<script setup>
import { ref } from 'vue'
import { Promotion } from '@element-plus/icons-vue'

const content = ref()
</script>

<template>
  <el-card shadow="hover" class="send-card">
    <div class="input-box">
      <el-input
        v-model="content"
        type="textarea"
        placeholder=""
        maxlength="500"
        show-word-limit
        :autosize="{ minRows: 3, maxRows: 6 }"
      ></el-input>
    </div>
    <div class="button-box">
      <el-button class="send-button" type="primary" round :icon="Promotion">
        发送动态
      </el-button>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.send-card {
  :deep() {
    .el-card__body {
      padding: 20px;
    }
  }
}

.button-box {
  margin-top: 10px;
  .send-button {
    width: 100%;
  }
}
</style>
