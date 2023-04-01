<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div class="left">
          <Logo />
          <Arrow />
        </div>
        <div class="right">
          <Search />
          <Logi />
        </div>
        <!-- <Header />
         -->
      </el-header>

      <el-container>
        <el-aside width="180px">
          <AsideMenu />
        </el-aside>
        <el-main>
          <RouterView></RouterView>
        </el-main>
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
    font-size: 16px;
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
    width: 1366px;
    min-width: 1250px;
    height: 100vh;
    margin: 0 auto; //居中
    min-height: 600px;
  }
  .el-container {
    background-color: rgb(228, 231, 237);
  }
  .el-header {
    height: 65px;
    padding: 0;
    margin-bottom: 10px;
    background-color: white;
    border-radius: 0 0 10px 10px;
    width: 100%;
    display: flex;
    .left {
      width: 35%;
      height: 100%;
      display: flex;
      align-items: center;
    }
    .right {
      width: 65%;
      height: 100%;
      display: flex;
      align-items: center;
      display: flex;
      align-items: center;
    }
  }
  .el-aside {
    // background-color: rgb(228, 231, 237);
    max-height: calc(100vh - 200px);
    background-color: transparent;
    border-radius: 10px;
  }
  .el-main {
    // background-color: rgb(228, 231, 237);
    background-color: white;
    border-radius: 10px;
    margin-left: 10px;
    max-height: calc(100vh - 200px);
    overflow: hidden;
    padding: 0 10px;
  }
  .el-footer {
    height: 100px;
    background-color: rgb(252, 252, 252);
    margin-top: 20px;
    // position: fixed;
    // bottom: 0;
    border-radius: 10px;
    z-index: 999;
  }
</style>
