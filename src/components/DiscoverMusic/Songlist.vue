<template>
  <div class="dailySongList">
    <div class="title">
      <span>今日推荐歌单</span>
    </div>
    <el-row :gutter="20">
      <el-col :span="4" v-for="list in songList" :key="list">
        <div class="grid-content">
          <span class="playCount">
            <el-icon>
              <VideoPlay />
            </el-icon>
            {{ playCount(list.playCount) }}
          </span>
          <img class="imgc" :src="list.picUrl" :alt="list.name" />
        </div>
        <span class="songListName">{{ list.name }}</span>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
  import { VideoPlay } from '@element-plus/icons-vue'
  import { dailySongList } from '@/server/MainApi/main'
  import { playCount } from '@/plugins/index.js'
  import { ref, onMounted } from 'vue'

  const songList = ref([]) //歌单

  const getSongList = async () => {
    try {
      //处理数据逻辑
      let res = await dailySongList()
      songList.value = res.data.result
      // console.log(res.data)
    } catch (error) {
      //处理错误逻辑
      // console.log('获取Banner数据失败: ' + error.response.statusText + ': ' + error.message)
      console.error(error.message)
    }
  }

  onMounted(() => {
    getSongList()
  })
</script>

<style lang="less" scoped>
  //@import url(); 引入公共css类

  .dailySongList {
    margin-top: 40px;

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

    .el-row {
      &:last-child {
        margin-bottom: 0;
      }

      .el-col {
        display: block;
        margin-bottom: 20px;

        .grid-content {
          background: rgb(228, 231, 237);
          border-radius: 4px;
          height: auto;
          max-width: 200px;
          min-width: 100px;
          max-height: 200px;
          min-height: 100px;
          aspect-ratio: 1 / 1; //使其始终保持宽高比
          //   box-shadow: 0px 0px 5px 3px rgb(169, 169, 169);
          //   -webkit-box-shadow: 0px 0px 5px 3px rgb(169, 169, 169);
          //   -moz-box-shadow: 0px 0px 5px 3px rgb(169, 169, 169);
          position: relative;

          .playCount {
            display: flex;
            position: absolute;
            background-color: rgba(0, 0, 0, 0.4);
            align-items: center;
            padding: 0 5px;
            border-radius: 3px;
            color: #fff;
            font-size: 13px;
            z-index: 2;

            i {
              color: red;
              margin-right: 2px;
            }
          }

          img {
            display: block;
            border-radius: 4px;
            width: 100%;
            height: 100%;
            aspect-ratio: 1 / 1; //使其始终保持宽高比
            object-fit: cover;
            cursor: pointer;
          }
        }

        .grid-content:hover {
          box-shadow: 0 30px 28px -16px rgba(0, 0, 0, 0.26);
        }

        .songListName {
          text-align: left;
          margin-top: 6px;
          -webkit-line-clamp: 2; //（用来限制在一个块元素显示的文本的行数，2 表示最多显示 2 行。为了实现该效果，它需要组合其他的 WebKit 属性）
          display: -webkit-box; //（和 1 结合使用，将对象作为弹性伸缩盒子模型显示 ）
          -webkit-box-orient: vertical; //（和 1 结合使用 ，设置或检索伸缩盒对象的子元素的排列方式 ）
          overflow: hidden; //（文本溢出限定的宽度就隐藏内容）
          text-overflow: ellipsis; //（多行文本的情况下，用省略号 “…” 隐藏溢出范围的文本)
        }
      }
    }
  }
</style>
