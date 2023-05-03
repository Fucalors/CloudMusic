<template>
  <div class="title" v-if="!songList.value">
    <span>{{ songListTitle }}</span>
  </div>
  <div class="content">
    <div class="songlist" v-for="item in songList" :key="item">
      <router-link :to="{ path: '/SongListDetail', query: { id: item.id } }">
        <el-card class="card" :body-style="{ padding: '0px' }" shadow="hover">
          <span class="playNum">
            <el-icon>
              <VideoPlay />
            </el-icon>
            {{ playCount(item.playCount) }}
          </span>
          <img class="image card-img" :src="item.picUrl" :alt="item.name" />
          <div class="content-name">
            <span class="content-style">
              {{ item.name }}
            </span>
          </div>
        </el-card>
      </router-link>
    </div>
  </div>
</template>

<script setup>
  import { VideoPlay } from '@element-plus/icons-vue'
  import { dailySongList } from '@/server/MainApi/main'
  import { playCount } from '@/plugins/index.js'
  import { ref, onMounted } from 'vue'

  const songList = ref([]) //歌单
  const songListTitle = '今日推荐歌单' //标题

  const getSongList = async () => {
    try {
      //处理数据逻辑
      let res = await dailySongList()
      songList.value = res.data.result

      //   console.log(res.data)
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
  .title {
    // background-color: red;
    margin-top: 40px;
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
    display: grid;
    grid-template-columns: repeat(auto-fill, 202px);
    // grid-template-rows: repeat(auto-fill, 305px);
    grid-row-gap: 15px;
    // grid-column-gap: 15px;
    justify-items: stretch;
    justify-content: space-between;
    .songlist {
      width: 202px;
      //   height: 306px;
      .card {
        // border: none;
        .playNum {
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
        .card-img {
          width: 100%;
          border-radius: 0px;
          object-fit: cover;
          cursor: pointer;
          display: block;
        }
        .content-name {
          padding: 5px 5px 8px 5px;
          cursor: pointer;
          .content-style {
            display: -webkit-box;
            text-overflow: ellipsis;
            overflow: hidden;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }
        }
      }
    }
  }
</style>
