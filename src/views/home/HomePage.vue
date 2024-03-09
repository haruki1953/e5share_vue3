<script setup></script>

<template>
  <el-row class="e5info-card" :gutter="20">
    <el-col :span="8">
      <el-card shadow="hover">
        <el-row class="user-e5">
          <el-col :span="14">
            <el-row class="">
              <el-avatar :size="64" />
            </el-row>
            <el-row>
              <el-text tag="b">昵称</el-text>
            </el-row>
            <el-row>
              <el-link type="info"> @username </el-link>
            </el-row>
          </el-col>
          <el-col :span="10" class="progress-container">
            <el-progress type="circle" :percentage="66">
              <span class="percentage-value">
                60/<el-text size="small">90</el-text>
              </span>
              <span class="percentage-label">剩余天数</span>
            </el-progress>
          </el-col>
        </el-row>
        <el-row class="row-bio">
          <el-text tag="b"> 简介： </el-text>
          <el-text type="info">
            简介简介简介简介简介简介简介简介简介简介简介简介简介简介
          </el-text>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-text tag="b"> e5订阅开始日： </el-text>
            <el-text type="info"> 2024/03/14 </el-text>
          </el-col>
          <el-col :span="12">
            <el-text tag="b"> e5订阅结束日： </el-text>
            <el-text type="info"> 2024/03/14 </el-text>
          </el-col>
        </el-row>
        <el-divider content-position="left">
          <el-text tag="b" type="primary">正在帮助 x 人</el-text>
        </el-divider>
        <div class="helping-container">
          <div v-for="(item, index) in 3" :key="index">
            <el-row class="helping-user">
              <el-avatar />
              <el-text tag="b">昵称</el-text>
              <el-link type="info"> @username </el-link>
            </el-row>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.e5info-card {
  padding-top: 10px;
  .el-card {
    border-radius: 15px;
    margin-bottom: 20px;
    .user-e5 {
      margin: 0 0 5px 5px;
      .el-avatar {
        margin: 4px 0 8px 0;
      }
      .progress-container {
        display: flex;
        justify-content: flex-end;
      }
      .percentage-value {
        display: block;
        margin-top: 10px;
        font-size: 28px;
      }
      .percentage-label {
        display: block;
        margin-top: 10px;
        font-size: 12px;
      }
    }
    .row-bio {
      margin-bottom: 10px;
    }
    .el-divider {
      margin: 25px 0;
    }
    .helping-container {
      margin: 0 10px;
      .helping-user {
        margin-bottom: 6px;
        .el-avatar {
          margin-right: 10px;
        }
        .el-text {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
