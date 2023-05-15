<template>
  <Top :songListInfo="songListInfo" />
  <div class="content">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="歌曲列表" name="first"><MusicList :songList="songListInfo" /></el-tab-pane>
      <el-tab-pane label="评论" name="second"><Comment /></el-tab-pane>
      <el-tab-pane label="收藏者" name="third"><Subscribers /></el-tab-pane>
    </el-tabs>
  </div>
  <!-- <MusicList :songList="songListInfo" /> -->
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { getSongList, getSongListComment } from '@/server/SongList/songList'
  const activeName = ref('first')

  const handleClick = (tab, event) => {
    // console.log(tab.props.label)
  }
  const songListInfo = ref({})
  //   const comment = ref({})

  let id = useRoute().query.id // 歌单 id
  const getSongListInfo = async () => {
    try {
      //处理数据逻辑
      let res = await getSongList(id)
      let comment = await getSongListComment(id)
      songListInfo.value = res.data.playlist
      //   comment.value = res.playlist
      //   console.log(res.data)
    } catch (error) {
      console.error(error.message)
    }
  }
  if ((songListInfo.value.creator = '')) {
    songListInfo.value = JSON.parse(sessionStorage.getItem('songListInfo')).creator
  }
  onMounted(() => {
    getSongListInfo()
  })
</script>

<style lang="less" scoped>
  //@import url(); 引入公共css类
  .content {
    width: 100%;
    // height: 100%;
    // background-color: bisque;
    .demo-tabs > .el-tabs__content {
      padding: 32px;
      color: #6b778c;
      font-size: 32px;
      font-weight: 600;
      //   .el-tabs__nav {
      //     background-color: #fff;
      //     .el-tabs__active-bar {
      //       height: 2px;
      //       background-color: #ec4141;
      //     }
      //   }
    }
  }
</style>
