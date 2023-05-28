<template>
  <div class="music-player">
    <div class="music-info">
      <img :src="musicStore.playList[musicStore.playListIndex].al.picUrl" alt="cover" class="imgCover" />
      <div class="song-info">
        <p class="song-name">{{ musicStore.playList[musicStore.playListIndex].name }}</p>
        <p class="singer">
          {{ musicStore.playList[musicStore.playListIndex].ar[0].name }}
        </p>
      </div>
    </div>

    <div class="music-controls">
      <div class="progress-bar">
        <div class="progress">
          <el-slider v-model="musicStore.currentTime" :max="duration" :show-tooltip="false" />
          {{ convertMsToMinSec(musicStore.playList[musicStore.playListIndex].dt) }}
        </div>
      </div>
      <div class="buttons">
        <button class="prev" @click="prev">
          <i class="ri-skip-back-line"></i>
        </button>
        <button class="play-pause" @click="play">
          <i v-if="musicStore.playShow" class="ri-play-line"></i>
          <i v-else="musicStore.playShow" class="ri-pause-line"></i>
        </button>
        <button class="next" @click="next">
          <i class="ri-skip-forward-line"></i>
        </button>
      </div>
    </div>

    <audio
      ref="audio"
      :src="`https://music.163.com/song/media/outer/url?id=${
        musicStore.playList[musicStore.playListIndex].id
      }.mp3`"></audio>
  </div>
</template>

<script setup>
  import { reactive, ref,toRefs, computed, onMounted, watchEffect, watch } from 'vue'
  import { convertMsToMinSec } from '@/plugins/index.js' //秒转分
  import { useMusicStore } from '@/stores/modules/musicStore.js'
  import { getSongUrl, getSongDetail } from '@/server/Main/main'
  const musicStore = useMusicStore() //获取音乐管理器信息 (store) 或 pinia中的音乐管理器模
  const musicIndex = musicStore.playListIndex
  const audio = ref(null) // 音频标签
  const duration = ref(0) // 歌曲时长
  const playState = computed({
    // 定义计算属性 playState 用来保存歌曲的播放状态（从vuex中获取）
    get() {
      return musicStore.musicPlayState
    },
    set(val) {
      return val
    }
  })
  const playlist = computed({
    // 定义计算属性 playlist 用来保存播放列表的数据（从vuex中获取）currentSrc
    get() {
      return musicStore.playList
    }
  })
  //   console.log(playlist)
  // 播放监听
  const play = () => {
    // 判断播放还是暂停
    if (audio.value.paused) { // 如果音频是暂停状态
      audio.value.play() // 播放音频
      duration.value = audio.value.duration // 设置音频总时长
      setInterval(() => {
        //进度条
        musicStore.changeCurrentTime(audio.value.currentTime) // 更新音频当前播放时间
      }, 1000) // 每隔一秒钟更新一次
      musicStore.changeMusicPlayState(true) // 改变音乐播放状态为播放中
      musicStore.changePlayShow(false) // 改变Pinia的值，显示为播放按钮
    } else { // 如果音频正在播放
      audio.value.pause() // 暂停音频播放
      musicStore.changeMusicPlayState(false) // 改变音乐播放状态为暂停
      musicStore.changePlayShow(true) // 改变Pinia的值，显示为暂停按钮
    }
  }
  const next = () => {
    // 下一首
    musicStore.playListIndex++  // 播放列表索引加1
    audio.value.autoplay = true  // 设置自动播放
    musicStore.changeMusicPlayState(true)  // 改变音乐播放状态
    if (musicStore.playListIndex == musicStore.playList.length) {  // 如果播放列表索引等于播放列表长度
      musicStore.playListIndex = 0  // 将播放列表索引重置为0
    }
  }
  const prev = () => {
    // 上一首
    musicStore.playListIndex--  // 播放列表索引减1
    audio.value.autoplay = true  // 设置自动播放
    musicStore.changeMusicPlayState(true)  // 改变音乐播放状态
    if (musicStore.playListIndex < 0) {  // 如果播放列表索引小于0
      musicStore.playListIndex = musicStore.playList.length - 1  // 将播放列表索引重置为播放列表长度减1
    }
  }
  // 监视播放状态
  watchEffect(() => {
    if (musicStore.playListIndex) {
      musicStore.changePlayShow(false)  // 如果播放列表索引不为0，则改变pinia的值显示为播放按钮
    }
    if (musicIndex !== musicStore.playListIndex) {
      // 双击播放
      audio.value.autoplay = true  // 设置自动播放
    }
  })


  //   const getmusics = async () => {
  //     let res = await getSongUrl(33894312)
  //     console.log(res)
  //   }
  //   const getsong = async () => {
  //     let res = await getSongDetail(2014336709)
  //     console.log(res)
  //   }
  // TODO: 2023/5/23 播放按钮
  onMounted(() => {
    // getmusics()
    // getsong()
    if (audio.value.paused) {
      musicStore.changePlayShow(true)//改变pinia的值显示为播放按钮
    }
  })
</script>

<style lang="less" scoped>
  .music-player {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 90px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
    .music-info {
      display: flex;
      align-items: center;
      .imgCover {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin-right: 20px;
        object-fit: cover;
        background-color: #ff4d4f;
      }
      .song-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        .song-name {
          font-size: 16px;
          font-weight: 500;
          margin-bottom: 5px;
        }

        .singer {
          font-size: 14px;
          color: #999;
        }
      }
    }
    .music-controls {
      display: flex;
      align-items: center;
      .progress-bar {
        width: 300px;
        height: 45px;
        background-color: #eee;
        margin-right: 20px;
        //position: relative;
        .progress {
          height: 100%;
          background-color: #fff;
          //position: absolute;
          //left: 0;
          //top: 0;
        }
      }
      .buttons {
        display: flex;
        align-items: center;
        button {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: none;
          background-color: transparent;
          margin-right: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          transition: all 0.3s ease;
          &:hover {
            background-color: #f5f5f5;
          }
          i {
            font-size: 20px;
            color: #333;
          }
          .play-pause i {
            font-size: 24px;
          }
          .play-pause.playing i {
            transform: rotate(15deg);
          }
        }
      }
    }
    // audio {
    //   //   position: relative;
    //   //   top: 0;
    //   //   display: none;
    // }
  }
</style>
