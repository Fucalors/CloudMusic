<template>
  <div class="searchbar">
    <el-popover :width="450" placement="bottom" popper-class="popper" trigger="click">
      <template #reference>
        <el-input
          v-model.trim="searchWords"
          :prefix-icon="Search"
          placeholder="歌名/人名"
          @input="keyWordsChange"
          @keyup.enter.native="keyWordsChange" />
      </template>
      <HotSearch v-if="!searchWords" />
      <div v-else class="hot-search">
        <div class="top-title">热门搜索</div>
        <div v-if="info.searchKey" class="song">
          <div v-if="info.searchKey.songs" class="title">
            <el-icon><Headset /></el-icon>
            <span>单曲</span>
          </div>
          <div v-for="item in info.searchKey.songs" v-if="info.searchKey.songs" :key="item" class="pops">
            <div class="pops-text">
              <span>{{ item.name }}</span>
              <span class="line">一</span>
              <span v-for="item1 in item.artists" :key="item1" class="artists-name">{{ item1.name }}</span>
            </div>
          </div>
        </div>
        <!-- 歌单 -->
        <div v-if="info.searchKey" class="song">
          <div v-if="info.searchKey.playlists" class="title">
            <el-icon><Headset /></el-icon>
            <span>歌单</span>
          </div>
          <div v-for="item in info.searchKey.playlists" v-if="info.searchKey.playlists" :key="item" class="pops">
            <div class="pops-text">
              <span>{{ item.name }}</span>
            </div>
          </div>
        </div>
        <!-- 专辑 -->

        <div v-if="info.searchKey" class="song">
          <div v-if="info.searchKey.albums" class="title">
            <el-icon><Headset /></el-icon>
            <span>专辑</span>
          </div>
          <div v-for="item in info.searchKey.albums" v-if="info.searchKey.albums" :key="item" class="pops">
            <div class="pops-text">
              <span>{{ item.name }}</span>
              <span class="line">一</span>
              <span class="artists-name">{{ item.artist.name }}</span>
            </div>
          </div>
        </div>

        <!-- 歌手 -->
        <div v-if="info.searchKey" class="song">
          <div v-if="info.searchKey.artists" class="title">
            <el-icon><Headset /></el-icon>
            <span>歌手</span>
          </div>
          <div v-for="item in info.searchKey.artists" v-if="info.searchKey.artists" :key="item" class="pops">
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
  // 定义一个变量，存储搜索历史的标题
  const historyTitle = '搜索内容'
  // 定义一个响应式变量，存储弹出层的显示状态
  const popoverVisible = ref(false)
  // 定义一个响应式对象，存储搜索建议和搜索历史列表
  const info = reactive({
    searchKey: {}, // 搜索建议
    keyWorldHistory: [] //搜索历史列表
  })
  // 定义一个定时器变量
  let time
  // 定义一个异步函数，用于获取搜索建议
  const getSearchMultimatch = async () => {
    try {
      // 调用搜索建议的 API
      let res = await searchMultimatch(searchWords.value)
      // 将搜索建议保存到响应式对象中
      info.searchKey = res.data.result
      // console.log(res.data.result)
    } catch (error) {
      console.error(error.message)
    }
  }
  // 定义一个函数，用于监听搜索关键词的变化
  const keyWordsChange = () => {
    // 清空定时器
    clearTimeout(time)
    if (searchWords.value !== '') {
      // 设置定时器，延迟100ms后调用getSearchMultimatch函数获取搜索建议
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
