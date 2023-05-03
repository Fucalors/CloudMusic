<template>
  <div class="scrollbar">
    <el-menu :default-active="$route.name" router active-text-color="red">
      <el-menu-item index="discovermusic">
        <el-icon><Headset /></el-icon>
        <span>发现音乐</span>
      </el-menu-item>

      <el-menu-item index="newmusic">
        <el-icon><Collection /></el-icon>
        <span>新音乐</span>
      </el-menu-item>

      <el-menu-item index="songlist">
        <el-icon><DocumentCopy /></el-icon>
        <span>歌单</span>
      </el-menu-item>

      <el-menu-item index="mv">
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
  </div>
</template>

<script setup>
  import { Headset, Collection, DocumentCopy, VideoCamera } from '@element-plus/icons-vue'
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
  .scrollbar {
    width: 100%;
    height: 100%;
    overflow: hidden;
    /* 滚动条样式 */
    &::-webkit-scrollbar {
      width: 5px;
      height: 10px;
    }
    /* Track */
    &::-webkit-scrollbar-track {
      background: #f1f1f1;
    }
    /* Handle */
    &::-webkit-scrollbar-thumb {
      background-color: #cccccc;
      border-radius: 4px;
    }
    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background-color: #aaaaaa;
    }
    &:hover {
      overflow-y: scroll;
    }
    .el-menu {
      // background-color: rgb(73, 112, 189);
      // background-color: white;
      // border-radius: 10px;
      color: rgb(69, 170, 29);
    }
  }
</style>
