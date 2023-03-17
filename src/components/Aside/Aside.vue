<template>
  <el-scrollbar wrap-class="scrollbarHeight">
    <el-menu :default-active="$route.name" class="el-menu-vertical-demo" router active-text-color="red">
      <el-menu-item index="index" route="/index">
        <el-icon><Headset /></el-icon>
        <span>发现音乐</span>
      </el-menu-item>

      <el-menu-item index="main" route="/main">
        <el-icon><Collection /></el-icon>
        <span>新音乐</span>
      </el-menu-item>

      <el-menu-item index="fa" route="/fa">
        <el-icon><DocumentCopy /></el-icon>
        <span>歌单</span>
      </el-menu-item>

      <el-menu-item index="mv" route="/mv">
        <el-icon><VideoCamera /></el-icon>
        <span>MV</span>
      </el-menu-item>

      <el-menu-item-group>
        <template #title>
          <span>我的音乐</span>
        </template>
        <el-menu-item index="1-1">我喜欢</el-menu-item>
        <el-menu-item index="1-2">本地与下载</el-menu-item>
        <el-menu-item index="1-3">最近播放</el-menu-item>
      </el-menu-item-group>

      <el-menu-item-group>
        <template #title>
          <span>我的歌单</span>
        </template>
        <el-menu-item index="1-1">1</el-menu-item>
        <el-menu-item index="1-2">2</el-menu-item>
        <el-menu-item index="1-3">3</el-menu-item>
      </el-menu-item-group>
    </el-menu>
  </el-scrollbar>
</template>

<script setup>
  import {
    Document,
    Menu as IconMenu,
    Headset,
    Collection,
    DocumentCopy,
    VideoCamera
  } from '@element-plus/icons-vue'
  //   import { useRouter, useRoute } from 'vue-router'
  //   const router = useRouter()
  //   const route = useRoute()
  //   console.log(router)

  //   const myFunction = () => {
  //     // 函数体
  //     // console.log(this.$route)
  //   }
</script>

<style lang="less" scope>
  .scrollbarHeight {
    max-height: calc(100vh - 160px);
    width: 100%;
    background-color: white;
  }
  .el-scrollbar__bar.is-vertical {
    //滚动条宽度
    width: 0;
  }
</style>
