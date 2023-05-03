<template>
  <div class="time">
    <span>{{ CurrentTime }}</span>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { getCurrentTime } from '../../plugins/index.js'
  const CurrentTime = ref() //当前时间
  setInterval(() => {
    //当前时间
    CurrentTime.value = getCurrentTime()
    // console.log(CurrentTime.value)
  }, 1000)
</script>

<style lang="less" scoped>
  //@import url(); 引入公共css类
  .time {
    width: 260px;
    text-align: center;
    span {
      display: block;
      letter-spacing: -7px;
      animation: showup 5s forwards ease-out;
      font-weight: 600;
    }
  }
  @keyframes showup {
    from {
      letter-spacing: -7px;
    }
    to {
      letter-spacing: 1px;
    }
  }
</style>
