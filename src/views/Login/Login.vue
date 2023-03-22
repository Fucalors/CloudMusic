<template>
  <div class="login-container">
    <div class="login-box">
      <h2>网易云音乐</h2>
      <form>
        <div class="form-group">
          <input type="text" placeholder="手机号/邮箱" />
        </div>
        <div class="form-group">
          <input type="password" placeholder="密码" />
        </div>
        <button class="login-btn">登录</button>
      </form>
      <div class="more-login">
        <span>社交账号登录</span>
        <ul>
          <li><i class="iconfont icon-weibo"></i></li>
          <li><i class="iconfont icon-weixin"></i></li>
          <li><i class="iconfont icon-qq"></i></li>
        </ul>
      </div>
      <div class="register">
        <a href="#">立即注册</a>
        <a href="#">忘记密码？</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f2f2f2;
  }

  .login-box {
    width: 400px;
    padding: 30px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .login-box h2 {
    text-align: center;
    margin-bottom: 20px;
  }

  .form-group {
    margin-bottom: 20px;
  }

  .form-group input {
    width: 100%;
    height: 40px;
    padding: 0 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
  }

  .login-btn {
    width: 100%;
    height: 40px;
    margin-top: 20px;
    background-color: #d33a31;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .more-login {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
  }

  .more-login span {
    font-size: 12px;
    color: #999;
  }

  .more-login ul {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .more-login ul li {
    margin: 0 10px;
    font-size: 20px;
    color: #d33a31;
    cursor: pointer;
  }

  .register {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
  }

  .register a {
    font-size: 12px;
    color: #999;
    text-decoration: none;
  }
</style>
