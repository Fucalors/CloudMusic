<template>
  <div class="avatar">
    <!-- 使用element-ui的Avatar组件，设置大小和点击事件 -->
    <el-avatar :size="40" src="https://empty" @click="centerDialogVisible = true" @error="errorHandler">
      <!-- 显示用户头像 -->
      <img :src="userInfo.profile.avatarUrl" />
    </el-avatar>
  </div>
  <!-- 登录弹窗 -->
  <el-dialog v-model="centerDialogVisible" center title="网易云音乐" width="35%">
    <Login />
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
// 从localStorage中获取用户信息
const userInfo = JSON.parse(localStorage.getItem('userInfo'))
// 图片加载失败时的回退行为
const errorHandler = () => true
// 控制登录弹窗是否显示
const centerDialogVisible = ref(false)
</script>

<style lang="less" scoped>
.avatar {
  // 设置鼠标样式为手型
  cursor: pointer;
  // 左边距为80px
  margin-left: 80px;
  // 设置dialog-footer中第一个按钮的右边距为10px
  .dialog-footer button:first-child {
    margin-right: 10px;
  }
}
</style>