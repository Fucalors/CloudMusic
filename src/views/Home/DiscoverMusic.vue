<template>
  <el-scrollbar>
    <div class="container">
      <Banner />
      <Songlist />
      <Newsong />
    </div>
  </el-scrollbar>
</template>
<script setup></script>

<style lang="less" scoped>
  .container {
    width: 100%;
    // width: calc(1366px - 200px); //限制宽度
    height: 100%;
    // padding: 10px;
    // background-color: rgb(228, 231, 237);
    overflow: hidden;
  }
</style>
