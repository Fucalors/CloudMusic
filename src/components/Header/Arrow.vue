<template>
  <!--左右前进返回按钮-->
  <div class="arrowIcon">
    <i class="icon ri-arrow-left-s-line"></i>
    <i class="icon ri-arrow-right-s-line"></i>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
  //@import url(); 引入公共css类
  .arrowIcon {
    background-color: white;
    width: 85px;
    display: flex;
    justify-content: space-between;

    .icon {
      background-color: #efefef;
      border-radius: 50%;
      padding: 5px;
      font-size: 28px;
      font-weight: 500;
      cursor: pointer;
      color: #898989;
    }
  }
</style>
