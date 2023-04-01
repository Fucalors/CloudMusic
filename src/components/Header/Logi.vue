<template>
  <div class="avatar">
    <el-avatar :size="40" src="https://empty" @error="errorHandler" @click="centerDialogVisible = true">
      <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
    </el-avatar>
  </div>
  <!-- 登录 -->
  <el-dialog v-model="centerDialogVisible" title="网易云音乐" width="30%" center>
    <Login />
  </el-dialog>
</template>

<script setup>
  //import  from '';
  import { ref } from 'vue'
  const errorHandler = () => true //图片加载失败时的回退行为。

  const centerDialogVisible = ref(false) //单击头像事件
</script>

<style lang="less" scoped>
  //@import url(); 引入公共css类
  .avatar {
    cursor: pointer;

    .dialog-footer button:first-child {
      margin-right: 10px;
    }
  }
</style>
