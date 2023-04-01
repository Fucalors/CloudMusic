<template>
  <!-- logo -->
  <div class="logo">
    <i class="icon ri-netease-cloud-music-fill"></i>
    <span>网易云音乐</span>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
  //@import url(); 引入公共css类
  .logo {
    width: 180px;
    display: flex;
    align-items: center;
    padding-left: 20px;

    .icon {
      font-size: 28px;
      color: #ff0000;
    }

    span {
      margin-top: -2px;
    }
  }
</style>
