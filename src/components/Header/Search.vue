<template>
  <div class="searchTip">
    <el-popover placement="bottom" popper-class="tao" width="365" trigger="click">
      <template #reference>
        <el-input
          placeholder="搜索"
          :prefix-icon="Search"
          v-model="searchWords"
          @input="keyWordsChange"></el-input>
        <!-- <el-input v-for="item in hotSearchs" key="item" :placeholder="item.first" :prefix-icon="Search"></el-input> -->
      </template>
      <HotSearch v-if="!searchWords" />
      <div class="history-tip" v-else>
        <div class="history">
          <div class="title">
            {{ historyTitle }}
          </div>
          <div class="history-content">
            <!-- <el-tag v-for="tag in searchWords" :key="tag" closable :type="tag.type">
              {{ tag }}
            </el-tag> -->
          </div>
        </div>
        <div class="tip">
          <!-- 歌曲 -->
          <div class="songs" v-if="info.searchKey">
            <div class="orders">
              <el-icon>
                <headset />
              </el-icon>
              单曲
            </div>
            <div class="songs-artists" v-for="item in info.searchKey.songs" :key="item">
              <span class="songs-name">{{ item.name }}</span>
              <span class="line">一</span>
              <span class="artists-name" v-for="item1 in item.artists" :key="item1">{{ item1.name }}</span>
            </div>
          </div>
          <!-- 歌单 -->
          <div class="songs" v-if="info.searchKey">
            <div class="orders">
              <el-icon>
                <headset />
              </el-icon>
              歌单
            </div>
            <div class="songs-artists" v-for="item in info.searchKey.playlists" :key="item">
              <!-- <img :src="item.coverImgUrl" alt="" /> -->
              <span class="songs-name">{{ item.name }}</span>
            </div>
          </div>
          <!-- 专辑 -->
          <div class="songs" v-if="info.searchKey">
            <div class="orders">
              <el-icon>
                <headset />
              </el-icon>
              专辑
            </div>
            <div class="songs-artists" v-for="item in info.searchKey.albums" :key="item">
              <span class="songs-name">{{ item.name }}</span>
              <span class="line">一</span>
              <span class="artists-name">
                {{ item.artist.name }}
              </span>
            </div>
          </div>
          <!-- 歌手 -->
          <div class="songs" v-if="info.searchKey">
            <div class="orders">
              <el-icon>
                <headset />
              </el-icon>
              歌手
            </div>
            <div class="songs-artists" v-for="item in info.searchKey.artists" :key="item">
              <span class="songs-name">{{ item.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </el-popover>
  </div>
</template>

<script setup>
  import { Search, Headset } from '@element-plus/icons-vue'
  import { searchMultimatch } from '@/server/MainApi/main'
  import { ref, onMounted, reactive } from 'vue'
  const searchWords = ref('') // 定义变量 keyWords 用来保存搜索的关键字
  const historyTitle = '搜索历史'
  const info = reactive({
    searchKey: {}, // 搜索建议
    keyWorldHistory: [] //搜索历史列表
  })
  // 定义定时器
  let time
  //搜索功能
  const getSearchMultimatch = async () => {
    try {
      let res = await searchMultimatch(searchWords.value)
      info.searchKey = res.data.result
      console.log(res.data.result)
    } catch (error) {
      console.error(error.message)
    }
  }
  // 定义搜索关键词变化的函数
  const keyWordsChange = () => {
    // 清空定时器
    clearTimeout(time)
    if (searchWords.value !== '') {
      time = setTimeout(() => {
        getSearchMultimatch(searchWords.value)
      }, 100)
    } else {
      // 清空searchTip
      info.searchKey = {}
    }
  }
  //   const enterKey = async () => {
  //     // 将当前搜索框中的关键字保存
  //     localStorage.setItem('searchWords', JSON.stringify(searchWords.value))

  //     // 判断，如果当关键字不为空串时才能进行搜索，否则进行提示
  //     if (searchWords.value) {
  //       // 跳转页面，并传递搜索的关键词
  //       //   router.push({
  //       //     name: 'searchSingle',
  //       //     params: {
  //       //       keywords: searchWords.value
  //       //     }
  //       //   })
  //     } else {
  //       ElMessage({
  //         message: '请输入有效的搜索关键字 ！',
  //         type: 'warning',
  //         grouping: true
  //       })
  //     }
  //   }
  onMounted(() => {
    getSearchMultimatch()
    // 取出本地保存的记录
    // searchWords.value = JSON.parse(localStorage.getItem('searchWords'))
    //   ? JSON.parse(localStorage.getItem('searchWords'))
    //   : []
  })
</script>

<style lang="less" scoped>
  .searchTip {
    width: 365px;
    :deep(.el-input) {
      // height: 28px;
      .el-input__wrapper {
        // border-radius: 50px;
        // background-color: #cfcfcf;
        // box-shadow: none;
        input {
          color: rgb(149, 149, 149);
          //   &::-webkit-input-placeholder {
          //     color: rgba(255, 255, 255);
          //   }
          //   &:-moz-placeholder {
          //     color: rgba(255, 255, 255);
          //   }
          //   &::-moz-placeholder {
          //     color: rgba(255, 255, 255);
          //   }
          //   &:-ms-input-placeholder {
          //     color: rgba(255, 255, 255);
          //   }
        }
        .el-input__prefix {
          color: rgb(128, 128, 128);
        }
      }
    }
  }
  .history-tip {
    width: 100%;
    height: 430px;
    border-radius: 4px;
    // background-color: aquamarine;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }
    .history {
      width: 100%;
      max-height: 130px;
      //   background-color: rgb(124, 185, 205);
      padding: 0 10px;
      margin-bottom: 5px;
      .title {
        height: 20px;
        padding-top: 3px;
        margin-bottom: 7px;
      }

      .history-content {
        width: 100%;
        height: 100%;
      }
    }
    .tip {
      width: 100%;
      padding-bottom: 2px;
      //   height: 100%;
      //   background-color: rgb(176, 201, 34);
      .songs {
        width: 100%;
        // background-color: antiquewhite;
        .orders {
          background-color: #eee;
          height: 35px;
          display: flex;
          align-items: center;
        }
        .songs-artists {
          width: 100%;
          height: 35px;
          display: flex;
          align-items: center;
          padding: 0 10px;
          cursor: pointer;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          &:hover {
            background-color: #f0f0f4;
          }
          img {
            width: 35px;
            height: 35px;
            border-radius: 2px;
            object-fit: cover;
            margin-right: 3px;
          }
          .songs-name {
            margin-left: 1px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .line {
            display: flex;
            align-items: center;
            font-size: 18px;
            font-weight: 400;
            margin: 0 5px;
          }
          .artists-name {
            display: inline-block;
            margin-right: 5px;
          }
        }
      }
    }
  }
</style>
