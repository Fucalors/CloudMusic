<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-container>
        <el-aside width="200px">
          <AsideMenu />
        </el-aside>
        <el-container>
          <el-main>
            <RouterView></RouterView>
          </el-main>
        </el-container>
      </el-container>
      <el-footer>
        <Footer />
      </el-footer>
    </el-container>
  </div>
  <!-- <RouterView /> -->
</template>
<script setup>
  //   import { RouterView } from 'vue-router'
</script>

<style lang="less">
  * {
    margin: 0;
    padding: 0;
    user-select: none;
    box-sizing: border-box;
  }

  html,
  body {
    // width: 100vw;
    // height: 100vh;
    // min-height: 100vh;
    background-color: rgb(228, 231, 237);
  }

  img {
    //vertical-align: top;
    border: none;
  }

  .icon {
    font-size: 23px;
  }
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    overflow: hidden;
  }
  .common-layout {
    // width: 1366px;
    min-width: 1250px;
    height: 100%;
    min-height: 600px;
  }
  .el-container {
    background-color: rgb(228, 231, 237);
  }
  .el-header {
    height: 60px;
    padding: 0;
  }
  .el-aside {
    background-color: rgb(228, 231, 237);
  }
  .el-main {
    background-color: rgb(228, 231, 237);
    height: calc(100vh - 160px);
    overflow: auto;
    padding: 0;
  }
  .el-footer {
    width: 100%;
    height: 100px;
    background-color: rgb(228, 231, 237);
    position: fixed;
    bottom: 0;
    border-top: 2px solid #bfbfbf;
    z-index: 999;
  }
</style>
