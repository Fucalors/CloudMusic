<template>
  <div class="searchbar">
    <el-popover placement="bottom" :width="450" trigger="click" popper-class="popper">
      <template #reference>
        <el-input
          v-model.trim="searchWords"
          @input="keyWordsChange"
          @keyup.enter.native="keyWordsChange"
          placeholder="歌名/人名"
          :prefix-icon="Search" />
      </template>
      <HotSearch v-if="!searchWords" />
      <div class="hot-search" v-else>
        <div class="top-title">热门搜索</div>
        <div class="song" v-if="info.searchKey">
          <div class="title" v-if="info.searchKey.songs">
            <el-icon><Headset /></el-icon>
            <span>单曲</span>
          </div>
          <div class="pops" v-if="info.searchKey.songs" v-for="item in info.searchKey.songs" :key="item">
            <div class="pops-text">
              <span>{{ item.name }}</span>
              <span class="line">一</span>
              <span class="artists-name" v-for="item1 in item.artists" :key="item1">{{ item1.name }}</span>
            </div>
          </div>
        </div>
        <!-- 歌单 -->
        <div class="song" v-if="info.searchKey">
          <div class="title" v-if="info.searchKey.playlists">
            <el-icon><Headset /></el-icon>
            <span>歌单</span>
          </div>
          <div class="pops" v-if="info.searchKey.playlists" v-for="item in info.searchKey.playlists" :key="item">
            <div class="pops-text">
              <span>{{ item.name }}</span>
            </div>
          </div>
        </div>
        <!-- 专辑 -->

        <div class="song" v-if="info.searchKey">
          <div class="title" v-if="info.searchKey.albums">
            <el-icon><Headset /></el-icon>
            <span>专辑</span>
          </div>
          <div class="pops" v-if="info.searchKey.albums" v-for="item in info.searchKey.albums" :key="item">
            <div class="pops-text">
              <span>{{ item.name }}</span>
              <span class="line">一</span>
              <span class="artists-name">{{ item.artist.name }}</span>
            </div>
          </div>
        </div>

        <!-- 歌手 -->
        <div class="song" v-if="info.searchKey">
          <div class="title" v-if="info.searchKey.artists">
            <el-icon><Headset /></el-icon>
            <span>歌手</span>
          </div>
          <div class="pops" v-if="info.searchKey.artists" v-for="item in info.searchKey.artists" :key="item">
            <div class="pops-text">
              <span>{{ item.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </el-popover>
  </div>
</template>
<script setup>
  import { Search, Headset } from '@element-plus/icons-vue'
  import { searchMultimatch } from '@/server/Main/main'
  import { ref, onMounted, reactive } from 'vue'
  const searchWords = ref('') // 定义变量 keyWords 用来保存搜索的关键字
  const historyTitle = '搜索内容'
  const popoverVisible = ref(false)
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
      // console.log(res.data.result)
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
    // getSearchMultimatch()
    // 取出本地保存的记录
    // searchWords.value = JSON.parse(localStorage.getItem('searchWords'))
    //   ? JSON.parse(localStorage.getItem('searchWords'))
    //   : []
  })
</script>
<style lang="less" scope>
  .searchbar {
    width: 450px;
    .el-input {
      .el-input__wrapper {
        border-radius: 50px;
        background-color: #9c1515;
        box-shadow: none;
        // &:hover {
        //   box-shadow: #eee;
        // }
        .el-input__inner {
          //   background-color: #9c1515;
          color: #eee;
          &:focus {
            outline: 0;
          }
        }
      }
      .el-input__prefix {
        .el-input__prefix-inner {
          color: #eee;
        }
      }
    }
  }
  //   .el-input {
  //     .el-input__wrapper {
  //       border-radius: 50px;
  //       //   border: 1px solid red;
  //       box-shadow: none;
  //       background-color: #9c1515;
  //       input {
  //         color: #d33333;
  //         &::-webkit-input-placeholder {
  //           color: rgb(38, 14, 214);
  //         }
  //         &:-ms-input-placeholder {
  //           color: rgb(170, 115, 115);
  //         }
  //         &::-moz-placeholder {
  //           color: rgb(225, 41, 41);
  //         }
  //       }
  //       .el-input__prefix {
  //         color: #e22222;
  //       }
  //     }
  //   }
</style>
