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
</template>
<script setup></script>

<style lang="less" scoped>
  //.common-layout {
  //  width: 1366px;
  //}
  .el-container {
    background-color: red;
  }
  .el-header {
    height: 60px;
    //padding: 10px 0;
  }
  .el-aside {
    background-color: cadetblue;
  }
  .el-main {
    background-color: blueviolet;
    height: calc(100vh - 160px);
    overflow: auto;
    padding: 0;
  }
  .el-footer {
    width: 100%;
    height: 100px;
    background-color: antiquewhite;
    position: fixed;
    bottom: 0;
  }
</style>
