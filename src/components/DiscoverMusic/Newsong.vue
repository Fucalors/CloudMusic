<template>
  <div class="newSong">
    <div class="title">
      <span>推荐新音乐</span>
    </div>
    <div class="container">
      <div class="musicList" v-for="item in newMusic" :key="item">
        <img :src="item.picUrl" alt="" />
        <div class="names">
          <div class="musicName">
            <span>{{ item.song.name }}</span>
            <span v-for="alias in item.song.alias" :key="alias">{{ alias }}</span>
          </div>
          <div class="singerName">
            <span v-for="item2 in item.song.artists" :key="item2">{{ item2.name }}</span>
          </div>
          <div class="musicTime">{{ convertMsToMinSec(item.song.duration) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { newSong } from '../../request/MainApi/main'
  import { convertMsToMinSec } from '../../plugin/index.js' // 歌曲时间函数
  import { ref } from 'vue'

  const newMusic = ref([]) //推荐新音乐

  const getRecommendNewMusic = async () => {
    //获取推荐新音乐
    await newSong()
      .then((res) => {
        //处理数据逻辑
        newMusic.value = res.data.result
        console.log(res.data)
      })
      .catch((error) => {
        //处理错误逻辑
        console.log(error + ' 请求HomePage数据失败')
        // 界面错误提示
        ElMessage({
          message: '获取数据失败，请稍后再试。',
          type: 'error',
          grouping: true, //分组归类
          showClose: true //支持关闭
        })
      })
  }
  getRecommendNewMusic()
</script>

<style lang="less" scoped>
  //@import url(); 引入公共css类
  .newSong {
    // background-color: rgb(146, 134, 134);
    margin-top: 15px;
    .title {
      // background-color: red;
      padding: 8px 0;
      margin-bottom: 7px; // 原12px,因为已有5px外边距所以是7px。5px来自.container。
      span {
        color: #212020;
        font-size: 18px;
        font-weight: 600;
        padding: 5px;
        border-bottom: 3px solid #333;
      }
    }
    .container {
      width: 100%;
      //   display: flex;
      .musicList {
        width: calc(calc(100% / 3) - 10px);
        padding: 5px;
        background-color: #f5f5f5;
        height: 70px;
        margin: 5px;
        border-radius: 8px;
        display: flex;
        float: left;
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
            font-size: 16px;
            text-align: left;
            width: 100%;
            -webkit-line-clamp: 1; //（用来限制在一个块元素显示的文本的行数，2 表示最多显示 2 行。为了实现该效果，它需要组合其他的 WebKit 属性）
            display: -webkit-box; //（和 1 结合使用，将对象作为弹性伸缩盒子模型显示 ）
            -webkit-box-orient: vertical; //（和 1 结合使用 ，设置或检索伸缩盒对象的子元素的排列方式 ）
            overflow: hidden; //（文本溢出限定的宽度就隐藏内容）
            text-overflow: ellipsis; //（多行文本的情况下，用省略号 “…” 隐藏溢出范围的文本)
            span:nth-child(2) {
              color: #8a8a8a;
              margin-left: 8px;
              font-size: 15px;
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
            font-size: 13px;
            color: #585858;
          }
        }
      }
    }
  }
</style>
