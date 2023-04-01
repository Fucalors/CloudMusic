<template>
  <div class="header">
    <!-- logo -->
    <div class="logo">
      <i class="icon ri-netease-cloud-music-fill"></i>
      <span>网易云音乐</span>
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
    </div>
    <!-- 登录 -->
    <el-dialog v-model="centerDialogVisible" title="网易云音乐" width="30%" center>
      <Login />
    </el-dialog>

    <div>{{ CurrentTime }}</div>
  </div>
</template>

<script setup>
  import { storeToRefs } from 'pinia'
  import { useCounterStore } from '@/stores/counter'
  import { ref } from 'vue'
  import { Search } from '@element-plus/icons-vue'
  import { getCurrentTime } from '../../plugins/index.js'
  // import {banner} from '../../request/index'
  // access the `store` variable anywhere in the component ✨
  const store = useCounterStore() //实例化仓库
  const { count } = storeToRefs(store) //简化store

  const searchContent = ref('') //搜索
  const CurrentTime = ref() //当前时间
  setInterval(() => {
    //当前时间
    CurrentTime.value = getCurrentTime()
    // console.log(CurrentTime.value)
  }, 1000)

  // console.log(searchContent)
  const errorHandler = () => true //图片加载失败时的回退行为。

  const centerDialogVisible = ref(false) //单击头像事件
  //登录

  //   const Login = () => {
  //     const usereamil = ref('')
  //     const password = ref('')
  //     console.log(usereamil + password)
  //   }
</script>

<style lang="less" scoped>
  .header {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    // background-color: #37bdd7;

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

    .arrowIcon {
      background-color: white;
      width: 85px;
      display: flex;
      justify-content: space-between;

      .icon {
        background-color: #efefef;
        border-radius: 50%;
        padding: 5px;
        font-size: 28px;
        font-weight: 500;
        cursor: pointer;
      }
    }

    .serach {
      color: #000;
    }

    .avatar {
      cursor: pointer;

      .dialog-footer button:first-child {
        margin-right: 10px;
      }
    }
  }
</style>
