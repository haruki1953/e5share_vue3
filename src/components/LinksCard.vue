<script setup>
defineProps({
  // 标题
  title: {
    type: String,
    default: '' // 如果未提供标题，则默认为空字符串
  },
  // 要展示的数据
  dataObj: {
    required: true,
    type: Object
  }
})

// 打开链接
const openLink = (url) => {
  window.open(url, '_blank')
}
</script>
<template>
  <el-card shadow="hover">
    <template #header v-if="$slots.header || title">
      <slot name="header"> </slot>
      <el-text
        v-if="!$slots.header && title"
        tag="b"
        size="large"
        type="primary"
      >
        {{ title }}
      </el-text>
    </template>
    <el-menu>
      <el-menu-item
        v-for="linkKey in Object.keys(dataObj)"
        :key="linkKey"
        @click="openLink(dataObj[linkKey].link)"
      >
        <el-tooltip
          :content="dataObj[linkKey].description"
          effect="light"
          placement="right"
        >
          <div>
            <el-icon v-if="dataObj[linkKey].fontawesomeClass">
              <i :class="dataObj[linkKey].fontawesomeClass"></i>
            </el-icon>
            <el-icon v-else-if="dataObj[linkKey].logoUrl" class="logo-box">
              <div
                class="logo"
                :style="{
                  backgroundImage: `url(${dataObj[linkKey].logoUrl})`
                }"
              ></div>
            </el-icon>
            <el-text tag="b" size="large">
              {{ dataObj[linkKey].name }}
            </el-text>
          </div>
        </el-tooltip>
      </el-menu-item>
    </el-menu>
  </el-card>
</template>

<style lang="scss" scoped>
.el-card {
  :deep() {
    .el-card__body {
      padding: 0;
    }
  }
  .el-menu {
    border-right: none;
  }
  .logo-box {
    width: 28px;
    .logo {
      width: 28px;
      height: 28px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 28px auto;
    }
  }
}
</style>
