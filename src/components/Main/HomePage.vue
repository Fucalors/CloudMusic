<template>
  <div class="container">
    <div class="banner" @click="Tip">
      <el-carousel :interval="3000" type="card" indicator-position="none" height="250px">
        <el-carousel-item v-for="banners in bannerImg" :key="banners">
          <img :src="banners.imageUrl" :alt="banners.typeTitle" />
          <!-- <el-image :src="item.pic" fit="cover" /> -->
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
  import { banner } from '../../request/MainApi/main'
  import { ref } from 'vue'

  const bannerImg = ref([]) //图片加载

  const getBanner = async () => {
    //图片加载
    await banner()
      .then((res) => {
        //处理数据逻辑

        bannerImg.value = res.data.banners
        // console.log(res.data)
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
  const Tip = (banners) => {
    // 此功能不完善
    ElMessage({
      message: '暂不支持单击跳转，敬请期待啦。',
      type: 'warning',
      grouping: true, //分组归类
      showClose: true //支持关闭
    })
    // console.log(banners)
  }
  getBanner()
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
