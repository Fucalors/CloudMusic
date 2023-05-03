<template>
  <div class="login-box">
    <form @submit.prevent="login">
      <div class="form-group">
        <input v-model.trim="username" type="text" placeholder="手机号/邮箱" />
        <!-- display error message if it exists -->
        <!-- <div v-if="errorMessage" style="color: red">{{ errorMessage }}</div> -->
      </div>

      <div class="form-group">
        <input v-model.trim="password" type="password" placeholder="密码" />
        <!-- display error message if password is empty -->
        <!-- <div v-if="password === ''" style="color: red">密码填写错误</div> -->
      </div>
      <button class="login-btn" type="primary">登录</button>
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
</template>

<script setup>
  import { ref, reactive, onMounted } from 'vue'
  import { validateEmail, validatePhoneNumber } from '@/plugins/index.js'
  import { getLoginEmail } from '@/server/Login/login.js'
  import { useCounterStore } from '@/stores/counter'
  const username = ref('')
  const password = ref('')
  let errorMessage = ''
  //   const store = useCounterStore()
  //   console.log(store)
  const login = async () => {
    // if (validateEmail(username.value)) {
    //   console.log('username is an email')
    // } else if (validatePhoneNumber(username.value)) {
    //   console.log('username is a phone number')
    // } else {
    //   console.log('错误')
    //   username.value = ''
    //   password.value = ''
    // }

    try {
      console.log(username.value, password.value)
      //   const value = { email: username.value, password: password.value }
      let res = await useCounterStore().getLogin(username.value, password.value)
      //   let res = await useCounterStore().dispatch('getLogin', { email: username.value, password: password.value })
      // const res = await getLoginEmail(value)
      console.log(res)
      //   console.log(value)
      //   const response = await axios.post('/api/login', {
      //     username: state.username,
      //     password: state.password
      //   })
      //   if (response.data.success) {
      //     // redirect to main page
      //     // window.location.href = '/main'
      //   } else {
      //     state.errorMessage = response.data.message
      //   }
      /** 分割 */
      //   if (res.data.code === 200) {
      //     this.$store.commit('updateIsLogin', true)
      //     this.$store.commit('updateToken', res.data.token)
      //     // 获取用户信息
      //     let result = await getUserDetail(res.data.account.id)
      //     console.log(result)
      //     // 把用户信息保存到本地
      //     sessionStorage.setItem('result', JSON.stringify(result))
      //     this.$store.commit('updateUser', result)
      //     this.$router.push('/UserInfo')
    } catch (error) {
      console.error(error)
      errorMessage = '登录时出错。请稍后再试。'
    }
  }
</script>

<style lang="less" scoped>
  .login-box {
    width: 400px;
    padding: 30px;
    /* padding: 20px; */
    margin: 0px auto;
    background-color: #fff;
    border-radius: 5px;
    border: 1px solid #ccc;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    form {
      .form-group {
        margin-bottom: 20px;
        input {
          width: 100%;
          height: 40px;
          padding: 0 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          outline: none;
        }
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
    }
    .more-login {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px;
      span {
        font-size: 12px;
        color: #999;
      }
      ul {
        display: flex;
        justify-content: center;
        align-items: center;
        li {
          margin: 0 10px;
          font-size: 20px;
          color: #d33a31;
          cursor: pointer;
        }
      }
    }
    .register {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px;
      a {
        font-size: 12px;
        color: #999;
        text-decoration: none;
      }
    }
  }
</style>
