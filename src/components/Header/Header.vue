<template>
  <div class="header">
    <!-- logo -->
    <div class="logo">
      <i class="icon ri-netease-cloud-music-fill"></i>
      <span @click="getBanner()">网易云音乐</span>
    </div>

    <!--左右前进返回按钮-->
    <div class="arrowIcon">
      <i class="icon ri-arrow-left-s-line"></i>
      <i class="icon ri-arrow-right-s-line"></i>
    </div>

    <!--搜素框-->
    <div class="search">
      <el-input
        v-model="searchContent"
        class="w-50 m-2"
        size="large"
        placeholder="搜索"
        :prefix-icon="Search"
        clearable />
    </div>

    <!--头像-->

    <div class="avatar">
      <el-avatar :size="40" src="https://empty" @error="errorHandler" @click="centerDialogVisible = true">
        <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
      </el-avatar>

      <el-dialog v-model="centerDialogVisible" title="请登录" width="30%" center>
        <span>
          <el-input v-model="usereamil" placeholder="eamil" clearable />
          <el-input v-model="password" type="password" placeholder="Please input password" show-password />
        </span>

        <template #footer>
          <span class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="Login">登录</el-button>
          </span>
        </template>
      </el-dialog>
    </div>

    <div></div>
  </div>
</template>

<script setup>
  import { storeToRefs } from 'pinia'
  import { useCounterStore } from '@/stores/counter'
  import { ref } from 'vue'
  import { Search } from '@element-plus/icons-vue'
  // import {banner} from '../../request/index'
  // access the `store` variable anywhere in the component ✨
  const store = useCounterStore() //实例化仓库
  const { count } = storeToRefs(store) //简化store

  const searchContent = ref('') //搜索
  // console.log(searchContent)
  const errorHandler = () => true //图片加载失败时的回退行为。

  const centerDialogVisible = ref(false) //单击头像事件
  //登录

  const Login = () => {
    const usereamil = ref('')
    const password = ref('')
    console.log(usereamil + password)
  }

  // const getBanner = async () => {  //图片加载
  //   await banner().then(res => {
  //     //处理数据逻辑
  //     console.log(res)
  //   }).catch(error => {
  //     //处理错误逻辑
  //     console.log(error + ' 请求数据失败')
  //   })
  //   // getBanner()
  // }
</script>

<style lang="less" scoped>
  .header {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    background-color: #37bdd7;

    .logo {
      width: 180px;
      display: flex;
      align-items: center;

      .icon {
        font-size: 28px;
        color: #ff0000;
      }

      span {
        margin-top: -2px;
      }
    }

    .arrowIcon {
      background-color: white;
      width: 85px;
      display: flex;
      justify-content: space-between;

      .icon {
        background-color: #cdbcbc;
        border-radius: 50%;
        padding: 5px;
        font-size: 28px;
        font-weight: 500;
        cursor: pointer;
      }
    }

    .serach {
    }

    .avatar {
      cursor: pointer;

      .dialog-footer button:first-child {
        margin-right: 10px;
      }
    }
  }
</style>
