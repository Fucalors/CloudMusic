<template>
  <div class="banner" @click="Tip">
    <el-carousel @change="handleChange" :interval="3000" type="card" indicator-position="none" height="200px">
      <el-carousel-item v-for="banners in bannerImg" :key="banners">
        <img :src="banners.imageUrl" :alt="banners.typeTitle" />
        <!-- <el-image :src="item.pic" fit="cover" /> -->
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup>
  import { banner } from '../../request/MainApi/main'
  import { ref } from 'vue'

  const bannerImg = ref([]) //图片加载

  const handleChange = (banners) => {
    //当前索引
    // console.log(banners)
  }

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
  .banner {
    width: 100%;
    height: 200px;
    //   background-color: rgb(224, 74, 74);
    border-radius: 10px;
    margin-top: 5px;

    img {
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 10px;
      object-fit: cover;
    }
  }
</style>
