<template>
  <div class="container">
    <Banner />
    <Songlist />
    <RecommendMv />
    <Newsong />
    <Privatecontent />
  </div>
</template>
<script setup>
  //   import Privatecontent from '../../components/DiscoverMusic/Privatecontent.vue'
  //   import RecommendMv from '../../components/DiscoverMusic/RecommendMv.vue'
</script>

<style lang="less" scoped>
  .container {
    width: 100%;
    height: 100%;
  }
  .container::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    background-color: #cccccc; /* 滚动条背景颜色 */
    border-radius: 5px;
  }

  .container::-webkit-scrollbar-track {
    border-radius: 5px;
    background: #f1f1f1;
    /* -webkit-box-shadow:inset 00 6px rgba(0,0,0,0.7); */
  }

  .container::-webkit-scrollbar-thumb {
    border-radius: 5px;
    /* -webkit-box-shadow:inset 00 6px rgba(0,0,0,.8); */
    transition: 0.3s ease-in-out;
    background-color: #cccccc; /* 滚动条颜色 */
  }
</style>
