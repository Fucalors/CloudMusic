<template>
  <div class="container">
    <h1>404</h1>
    <p>Oops! 页面找不到了.</p >
    <button @click="goHome">返回首页</button>
  </div>
</template>

<script setup>
const goHome = ()=> {
  window.location = '/';
}
</script>

<style lang="less" scoped>
  //@import url(); 引入公共css类
  * {
    margin: 0;
    padding: 0;
  }
  body {
    background-color: #f5f5f5;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  .container {
    text-align: center;
  }
  h1 {
    font-size: 12rem;
    color: #3f3f3f;
  }
  p {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
  button {
    padding: 1rem 2rem;
    background-color: #f09a9a;
    color: #fff;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: 0.3s;
  }
  button:hover {
    background-color: #e74c3c;
  }
</style>
