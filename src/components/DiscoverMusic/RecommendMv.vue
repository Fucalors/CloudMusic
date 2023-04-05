<template>
  <div class="privateContent">
    <div class="title">
      <span>{{ mvTitle }}</span>
    </div>
    <div class="content">
      <div class="recommendMv" v-for="item in recommend" :key="item">
        <img :src="item.picUrl" alt="" />
        <p>{{ item.name }}</p>
        <span v-for="item2 in item.artists" :key="item2">{{ item2.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
  //import  from '';
  import { recommendMv } from '@/server/MainApi/main'
  import { ref, onMounted } from 'vue'

  const recommend = ref([]) // 推荐MV
  const mvTitle = '推荐MV' //标题

  const getRecommendMv = async () => {
    try {
      //处理数据逻辑
      let res = await recommendMv()
      recommend.value = res.data.result
      // console.log(res.data)
    } catch (error) {
      //处理错误逻辑
      // console.log('获取Banner数据失败: ' + error.response.statusText + ': ' + error.message)
      console.error(error.message)
    }
  }

  onMounted(() => {
    getRecommendMv()
  })
</script>

<style lang="less" scoped>
  //@import url(); 引入公共css类

  .privateContent {
    // background-color: rgb(146, 134, 134);
    margin-top: 15px;

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
      display: grid;
      grid-template-rows: 1fr;
      grid-template-columns: repeat(2, 1fr);
      grid-row-gap: 10px;
      grid-column-gap: 10px;
      .recommendMv {
        width: 100%;
        height: auto;

        img {
          display: block;
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 10px;
          cursor: pointer;
        }
        p {
          margin-top: 6px;
        }
        span {
          text-align: left;
          color: #595353;
          display: inline-block;
        }
      }
    }
  }
</style>
