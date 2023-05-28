<template>
  <div class="newSong">
    <div class="title">
      <span>{{ newSongTitle }}</span>
    </div>
    <div class="content">
      <div class="musicList" v-for="item in newMusic" :key="item">
        <img :src="item.picUrl" alt="" />
        <div class="names" @dblclick="playMusic">
          <div class="musicName">
            <span>{{ item.song.name }}</span>
            <span v-for="alias in item.song.alias" :key="alias">{{ alias }}</span>
          </div>
          <div class="singerName">
            <span v-for="item2 in item.song.artists" :key="item2">{{ item2.name }}</span>
          </div>
          <div class="musicTime">时长：{{ convertMsToMinSec(item.song.duration) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { newSong, getSongUrl } from '@/server/Main/main'
  import { getSongListTrack } from '@/server/SongList/songList'
  import { convertMsToMinSec } from '@/plugins/index.js' // 歌曲时间函数
  import { ref, onMounted } from 'vue'
  //   import { useMusicStore } from '@/stores/modules/musicStore.js'
  //   const music = useMusicStore() //获取pinia信息
  const newMusic = ref([]) //推荐新音乐
  const newSongTitle = '推荐新音乐' //标题

  const getRecommendNewMusic = async () => {
    try {
      //处理数据逻辑
      let res = await newSong()
      newMusic.value = res.data.result
      //   let songs = await getSongListTrack()
      //   music.playList = res.data.result //改变pinia的值 实现播放歌单里的音乐
      //   console.log(res.data)
      //   console.log(songs.data.songs)
    } catch (error) {
      //处理错误逻辑
      // console.log('获取Banner数据失败: ' + error.response.statusText + ': ' + error.message)
      console.error(error.message)
    }
  }
  //   const musicUrl = async () => {
  //     try {
  //       //处理数据逻辑
  //       let res = await getSongUrl(2047807671)
  //       console.log(res.data)
  //     } catch (error) {
  //       //处理错误逻辑
  //       console.error(error.message)
  //     }
  //   }

  onMounted(() => {
    getRecommendNewMusic()
  })
</script>

<style lang="less" scoped>
  //@import url(); 引入公共css类
  .newSong {
    // background-color: rgb(146, 134, 134);
    margin-top: 15px;
    min-height: 390px;

    .title {
      // background-color: red;
      padding: 8px 0;
      margin-bottom: 12px;

      span {
        color: #212020;
        font-size: 18px;
        font-weight: 600;
        padding: 5px;
        border-bottom: 3px solid #333;
      }
    }

    .content {
      width: 100%;
      height: auto;
      display: grid;
      grid-template-columns: repeat(3, calc(33.33% - 10px));
      grid-gap: 10px;
    }

    .musicList {
      padding: 5px;
      background-color: #f5f5f5;
      height: 70px;
      border-radius: 8px;
      display: flex;

      img {
        width: 60px;
        height: 60px;
        aspect-ratio: 1 / 1;
        object-fit: cover;
        display: block;
        border-radius: 5px;
        margin-right: 8px;
      }

      .names {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .musicName {
          font-size: 14px;
          text-align: left;
          width: 100%;
          -webkit-line-clamp: 1;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          span:nth-child(2) {
            color: #8a8a8a;
            margin-left: 8px;
            font-size: 14px;
          }
        }

        .singerName {
          display: flex;
          span {
            font-size: 13px;
            color: #585858;
            margin-right: 8px;
          }
        }
        .musicTime {
          display: flex;
          justify-content: flex-end;
          font-size: 12px;
          color: #585858;
        }
      }
    }
  }
</style>
