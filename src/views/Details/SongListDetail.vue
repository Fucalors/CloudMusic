<template>
  <Top :songListInfo="topInfo" />
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
  import { storeToRefs } from 'pinia' //为解构的pinia提供响应式数据支持
  import { getSongList, getSongLists } from '@/server/SongList/songList'
  import { useMusicStore } from '@/stores/modules/musicStore.js'
  import { useUserStore } from '@/stores/modules/userStore.js'

  const musicStore = useMusicStore() //获取pinia useMusicStore信息
  const usrStore = useUserStore() //获取pinia useUserStore信息

  const activeName = ref('first')

  const handleClick = (tab, event) => {
    // console.log(tab.paneName)
    // console.log(event)
    // console.log(loginStore)
    // musicStore.changeState(true)
    // loginStore.$patch({ loginState: (loginStore.loginState = true) })
    // loginStore.loginState = true
  }

  const songListInfo = ref({})
  const topInfo = ref({})
  let id = useRoute().query.id // 歌单 id
  const getSongListInfo = async () => {
    try {
      //处理数据逻辑
      let res = await getSongList(id)
      topInfo.value = res.data.playlist
      //   console.log(res.data.playlist)
      let ids = []
      // 未登录最多只展示二十首歌曲
      if (!usrStore.loginState) {
        // if (musicStore.musicPlayState){
        songListInfo.value = res.data.playlist.tracks
        musicStore.playList = res.data.playlist.tracks //改变pinia的值 实现播放歌单里的音乐
        // console.log(res.data.playlist.tracks)
        // }
      } else {
        // 登录了展示全部歌曲
        // 获取所有歌曲的 id
        let infoArr = res.data.playlist.trackIds
        // 取出 id 值保存在数组中
        for (let i = 0; i < infoArr.length; i++) {
          ids.push(infoArr[i].id)
        }
        // console.log(ids)
        // 获取歌曲
        let songRes = await getSongLists(ids)
        // console.log(songRes.data.songs)
        songListInfo.value = songRes.data.songs
        musicStore.playList = songRes.data.songs //改变pinia的值 实现播放歌单里的音乐
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  if ((topInfo.value.creator = '')) {
    topInfo.value = JSON.parse(sessionStorage.getItem('topInfo')).creator
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
