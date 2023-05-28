<template>
  <el-config-provider :locale="zhCn">
    <div class="common-layout">
      <el-container>
        <el-header>
          <div class="header-left">
            <Logo />
            <Arrow />
          </div>
          <div class="header-right">
            <Search />
            <Avatar />
            <Time />
          </div>
        </el-header>
        <el-container>
          <el-aside width="200px"><AsideMenu /></el-aside>
          <el-container>
            <el-main>
              <RouterView></RouterView>
            </el-main>
          </el-container>
        </el-container>
        <el-footer><Footer /></el-footer>
      </el-container>
    </div>
  </el-config-provider>
</template>
<script setup>
  import zhCn from 'element-plus/dist/locale/zh-cn.mjs' // 国际化
  import { useUserStore } from '@/stores/modules/userStore.js' //获取pinia useUserStore信息
  import {  getLoginStatus } from '@/server/Login/login'
  import {getCurrentInstance, onMounted, version} from 'vue' //  暴露当前所使用的 Vue 版本。
  console.log('Vue版本号:' + version)
  // import { RouterView } from 'vue-router'
  //   import { getCurrentInstance } from 'vue'
  //   let app = getCurrentInstance()
  //   console.log(app)
  //   console.log(app.appContext.app.config.globalProperties.$loading)
  //自动登录

  const loginStatus=useUserStore()
  const cookie = localStorage.getItem('cookie')
  const token = localStorage.getItem('token')
  const login = async () =>{
    let Status = await getLoginStatus(cookie) // 获取登录状态(cookie)
    console.log(Status)
  }
  if (cookie || token){
      login()
      loginStatus.changeLoginState(true)
  }else{
    loginStatus.changeLoginState(false)
  }
</script>

<style lang="less">
  @import url('assets/main.css');

  .common-layout {
    /* width: 1280px; */
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    height: 100vh;
    font-weight: normal;
  }
  .el-container {
    width: 100%;
  }
  /* Style the header, main, and footer elements */
  .el-header {
    height: 70px;
    padding: 5px 0;
    background-color: #d33a31;
    color: #ffd4b9;
    display: flex;
    align-items: center;
  }
  .header-left {
    width: 30%;
    height: 100%;
    display: flex;
    align-items: center;
  }
  .header-right {
    width: 70%;
    height: 100%;
    display: flex;
    align-items: center;
  }

  /* Style the left and right panels */
  .el-aside {
    height: 100%;
    border-right: 1px solid #cccccc;
    max-height: calc(100vh - 160px);
  }
  .el-main {
    // max-width: 1080px;
    max-height: calc(100vh - 160px);
    // background-color: #e8e8e8;
    padding: 10px 10px 0 10px;
    &::-webkit-scrollbar {
      width: 8px;
      height: 5px;
      background-color: #cccccc; /* 滚动条背景颜色 */
      border-radius: 5px;
    }

    &::-webkit-scrollbar-track {
      border-radius: 5px;
      background: #f1f1f1;
      /* -webkit-box-shadow:inset 00 6px rgba(0,0,0,0.7); */
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      /* -webkit-box-shadow:inset 00 6px rgba(0,0,0,.8); */
      transition: 0.3s ease-in-out;
      background-color: #cccccc; /* 滚动条颜色 */
    }
  }

  .el-footer {
    width: 100%;
    height: 90px;
    background-color: #ffd4b9;
    display: flex;
    align-items: center;
    position: fixed;
    bottom: 0;
    border-top: 1px solid #fff;
    flex-shrink: 0; //粘性页脚
  }
  .el-popper {
    width: 365px;
    padding: 0 !important;
    height: 430px !important;
  }
</style>
