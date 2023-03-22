<template>
  <div class="header">
    <el-row align="left">
      <el-col :span="4">
        <img src="./assets/logo.png" alt="logo" class="logo" />
      </el-col>
      <el-col :span="16">
        <div class="search-box">
          <el-input placeholder="请输入搜索内容" prefix-icon="el-icon-search" clearable></el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="user-info">
          <el-avatar src="./assets/avatar.png" size="medium" fit="cover"></el-avatar>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
  .header {
    height: 60px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logo {
    height: 40px;
  }

  .search-box {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .user-info {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
