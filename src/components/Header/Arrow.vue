<template>
  <!--左右前进返回按钮-->
  <div class="arrowIcon">
    <i class="icon left ri-arrow-left-s-line" @click="$router.go(-1)"></i>
    <i class="icon right ri-arrow-right-s-line" @click="$router.go(1)"></i>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
  //@import url(); 引入公共css类
  .arrowIcon {
    width: 100px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .icon {
      background-color: #9c1515;
      border-radius: 50%;
      width: 45px;
      height: 45px;

      font-size: 40px;
      display: flex;
      align-items: center;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      color: #b0b0b0;
      &:hover {
        color: #868686;
      }
    }
    .left::before {
      margin-left: 1px;
    }
    .right::before {
      margin-left: 4px;
    }
  }
</style>
