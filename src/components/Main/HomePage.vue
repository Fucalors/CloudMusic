<template>
  <div class="container">
    <div class="banner">
      <el-carousel :interval="3000" type="card" indicator-position="none" height="250px">
        <el-carousel-item v-for="item in blocks" :key="item">
          <img :src="item.pic" :alt="item.typeTitle" />
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>

  <!-- <div>
    首页-发现 说明 : 调用此接口 , 可获取 APP 首页信息 接口地址 : /homepage/block/page 可选参数 : refresh:
    是否刷新数据,默认为 false cursor: 上一条数据返回的 cursor
  </div> -->
</template>

<script setup>
  import { banner, homePage } from '../../request/MainApi/main'
  import { ref } from 'vue'

  const banners = ref([]) //图片加载
  const blocks = ref([]) //图片加载

  const getBannerRight = async () => {
    //图片加载
    await banner()
      .then((res) => {
        //处理数据逻辑
        banners.value = res.data.banners
        // console.log(res)
      })
      .catch((error) => {
        //处理错误逻辑
        console.log(error + ' 请求banner数据失败')
      })
  }
  const getHomePage = async () => {
    //图片加载
    await homePage()
      .then((res) => {
        //处理数据逻辑
        blocks.value = res.data.data.blocks[0].extInfo.banners
        console.log(res.data.data.blocks[0].extInfo.banners)
      })
      .catch((error) => {
        //处理错误逻辑
        console.log(error + ' 请求HomePage数据失败')
      })
  }
  getBannerRight()
  getHomePage()
</script>

<style lang="less" scoped>
  //@import url(); 引入公共css类
  .container {
    width: 100%;
    height: 100%;
    padding: 10px;
    background-color: rgb(234, 233, 233);
    overflow: hidden;
    .banner {
      width: 100%;
      //   height: auto;
      background-color: rgb(224, 74, 74);
      border-radius: 12px;
      img {
        display: block;
        width: 100%;
        height: 250px;
        object-fit: cover;
      }
    }
  }
</style>
