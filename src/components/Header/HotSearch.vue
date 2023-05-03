<template>
  <div class="container">
    <div class="title" v-if="dataLoaded">
      <h3>{{ hotTitle }}</h3>
      <img :src="hotIcon" alt="hot" />
    </div>
    <div class="content" v-for="(item, index) in hotSearch" :key="item" :class="{ winner: index - 2 <= 0 }">
      <div class="list">{{ index + 1 }}</div>
      <div class="name">
        <div class="searchWord">
          {{ item.searchWord }}
          <span>{{ item.score }}</span>
        </div>
        <div class="alt">{{ item.content }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
  //import  from '';
  import { ref, onMounted } from 'vue'
  import { hotSearchDetail } from '@/server/MainApi/main'
  const hotSearch = ref([])
  const hotIcon = ref('') //Hot图片
  const hotTitle = '热搜榜' //标题
  const dataLoaded = ref('false') //避免标题渲染快
  const getHotSearch = async () => {
    try {
      //处理数据逻辑
      let res = await hotSearchDetail()
      hotSearch.value = res.data.data
      hotIcon.value = res.data.data[0].iconUrl //Hot图片
      //   console.log(res.data)
    } catch (error) {
      //处理错误逻辑
      // console.log('获取Banner数据失败: ' + error.response.statusText + ': ' + error.message)
      console.error(error.message)
    }
  }
  onMounted(() => {
    getHotSearch()
    dataLoaded.value = true //避免标题渲染快
  })
</script>

<style lang="less" scoped>
  //@import url(); 引入公共css类
  .container {
    width: 100%;
    padding-bottom: 2px;
    // height: 100%;
    // background-color: red;
    height: 430px;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }
    .title {
      width: 100%;
      height: 25px;
      display: flex;
      align-items: center;
      padding: 10px;
      h3 {
        display: inline-block;
        margin-right: 2px;
      }
      img {
        width: auto;
        height: 25px;
        max-height: 25px;
      }
    }
    .content {
      width: 100%;
      height: 55px;
      //   background-color: white;
      padding: 5px 0;
      display: flex;
      cursor: pointer;
      border-bottom: 1px solid #f0f0f4;
      &:hover {
        background-color: #f0f0f4;
      }
      .list {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        margin-right: 3px;
      }
      .name {
        display: flex;
        flex-direction: column;
        justify-content: center;
        .searchWord {
          span {
            font-weight: 500;
            font-size: 13px;
            color: #818181;
          }
        }
        .searchWord,
        .alt {
          width: 300px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
    .winner {
      .list {
        font-size: 16px;
        color: red;
      }
      .searchWord {
        font-size: 16px;
        font-weight: 700;
      }
    }
  }
</style>
