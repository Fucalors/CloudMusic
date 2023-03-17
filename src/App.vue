<template>
  <RouterView />
</template>
<script setup>
  //   import { RouterView } from 'vue-router'
</script>

<style lang="less">
  * {
    margin: 0;
    padding: 0;
    user-select: none;
    box-sizing: border-box;
  }

  html,
  body {
    width: 100vw;
    height: 100vh;
    min-height: 100vh;
  }

  img {
    //vertical-align: top;
    border: none;
  }

  .icon {
    font-size: 23px;
  }
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    overflow: hidden;
  }
</style>
