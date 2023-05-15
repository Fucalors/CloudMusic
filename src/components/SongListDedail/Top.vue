<template>
  <div class="top">
    <div class="top-left">
      <img :src="songListInfo.coverImgUrl" alt="" />
    </div>
    <div class="top-right">
      <div class="playList-name">
        <span class="tag">歌单</span>
        <span class="name">{{ songListInfo.name }}</span>
      </div>
      <div class="avatar">
        <img :src="songListInfo.creator.avatarUrl" alt="" srcset="" />
        <span class="avatar-name" @click="toUserDetails(songListInfo.userId)">
          {{ songListInfo.creator.nickname }}
        </span>
        <span class="create-time">创建时间: {{ convertTimestampToDateString(songListInfo.createTime) }}</span>
        <span class="create-time" style="margin-left: 10px">
          更新时间: {{ convertTimestampToDateString(songListInfo.trackUpdateTime) }}
        </span>
      </div>
      <div class="btn">
        <ul>
          <li>
            <i class="icons ri-play-circle-line"></i>
            <span>播放全部</span>
          </li>
          <li>
            <i class="icons ri-heart-line"></i>
            <span>收藏({{ playCount(songListInfo.subscribedCount) }})</span>
          </li>
          <li>
            <i class="icons ri-share-circle-line"></i>
            <span>分享({{ playCount(songListInfo.shareCount) }})</span>
          </li>
          <li>
            <i class="icons ri-download-cloud-2-line"></i>
            <span>下载全部</span>
          </li>
        </ul>
      </div>
      <div class="tags" v-if="songListInfo.tags">
        标签：
        <el-tag v-for="item in songListInfo.tags" :key="item">{{ item }}</el-tag>
        <el-tag type="danger" v-show="!songListInfo.tags.length">暂无标签</el-tag>
      </div>
      <div class="song-play">
        <div class="song">歌曲： {{ songListInfo.trackCount }}</div>
        <div class="play">播放： {{ playCount(songListInfo.playCount) }}</div>
      </div>
      <div class="introduction">
        简介：
        <span>{{ songListInfo.description || '作者没有编写简介哦。' }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router'
  import { convertTimestampToDateString, playCount } from '@/plugins/index' // 时间戳转换格式化函数
  // 定义变量 router 用来操作路由
  const router = useRouter()
  const props = defineProps(['songListInfo'])
  // 实现跳转到用户详细页面的方法
  const toUserDetails = (id) => {
    router.push({
      name: 'userdetail',
      query: { id: id }
    })
  }
</script>

<style lang="less" scoped>
  //@import url(); 引入公共css类
  .top {
    width: 100%;
    height: 250px;
    padding: 10px;
    display: flex;
    // background-color: aquamarine;
    .top-left {
      width: 230px;
      height: 230px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        border-radius: 10px;
      }
    }
    .top-right {
      width: calc(100% - 240px);
      margin-left: 10px;
      //   background-color: blue;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .playList-name {
        width: 100%;
        height: 35px;
        display: flex;
        align-items: center;
        // background-color: antiquewhite;
        .tag {
          display: inline-block;
          min-width: 36px;
          font-size: 12px;
          color: red;
          padding: 0px 5px;
          border: 1px solid red;
          border-radius: 4px;
          margin: 3px 5px 0 0;
        }
        .name {
          display: inline-block;
          font-size: 20px;
          font-weight: 700;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }
      .avatar {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        // background-color: rgb(177, 151, 151);
        // margin-bottom: 5px;
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: block;
          margin-right: 8px;
        }
        .avatar-name {
          color: #0f7efc;
          cursor: pointer;
          display: inline-block;
          margin-right: 16px;
        }
        .create-time {
          font-size: 12px;
          display: inline-block;
        }
      }
      .btn {
        width: 100%;
        height: 50px;
        // background-color: bisque;
        ul {
          width: 100%;
          height: 100%;
          list-style: none;
          display: flex;
          align-items: center;
          li {
            list-style: none;
            display: flex;
            align-items: center;
            width: fit-content;
            height: 40px;
            border-radius: 50px;
            border: 1px solid #eeeeee;
            margin-right: 10px;
            padding: 0 20px;
            cursor: pointer;
            &:hover {
              background-color: #eaeaea;
            }
            &:nth-child(1) {
              color: #fff;
              background-color: #d31d31;
              &:hover {
                background-color: #e52137;
              }
            }
            &:nth-child(1) .icons {
              color: #fff;
            }
            .icons {
              color: #5c5c5c;
              font-size: 21px;
              margin-right: 2px;
            }

            span {
              display: inline-block;
            }
          }
        }
      }
      .tags {
        width: 100%;
        height: 25px;
        display: flex;
        align-items: center;
        // background-color: #fff;
        span {
          margin-right: 6px;
          font-size: 13px;
        }
      }
      .song-play {
        width: 100%;
        height: 20px;
        display: flex;
        .song {
          margin-right: 19px;
        }
        .play {
          margin-right: 1px;
        }
      }
      .introduction {
        width: 100%;
        height: 25px;
        // background-color: #d31d31;
        //超出两行省略号
        display: -webkit-box;
        overflow: hidden;
        -webkit-box-orient: vertical;
        line-clamp: 1;
        -webkit-line-clamp: 1; //显示几行
      }
    }
  }
</style>
