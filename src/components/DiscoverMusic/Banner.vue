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
  import { banner } from '@/server/MainApi/main'
  import { ref, onMounted } from 'vue'

  const bannerImg = ref([]) //图片加载

  const handleChange = (banners) => {
    //当前索引
    // console.log(banners)
  }

  const getBanner = async () => {
    try {
      //处理数据逻辑
      let res = await banner()
      bannerImg.value = res.data.banners
      // console.log(res.data)
    } catch (error) {
      //处理错误逻辑
      // console.log('获取Banner数据失败: ' + error.response.statusText + ': ' + error.message)
      console.error(error.message)
    }
  }

  onMounted(() => {
    getBanner()
  })

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
