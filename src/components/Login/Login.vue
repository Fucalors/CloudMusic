<template>
  <div class="login-box">
    <div class="left-TabList">
      <ul>
        <li :class="{ li_active: activeTab === 'tab1' }" @click="activeTab = 'tab1'">验证码登录</li>
        <li :class="{ li_active: activeTab === 'tab2' }" @click="activeTab = 'tab2'">密码登录</li>
        <li :class="{ li_active: activeTab === 'tab3' }" @click="activeTab = 'tab3'">邮箱登录</li>
        <li :class="{ li_active: activeTab === 'tab4' }" @click="activeTab = 'tab4'">扫码登录</li>
        <li :class="{ li_active: activeTab === 'tab5' }" @click="activeTab = 'tab5'">注册</li>
      </ul>
    </div>
    <div class="right-TabContent">
      <div v-if="activeTab === 'tab1'">
        <el-form :model="captchaForm" :rules="captchaRules" label-width="80px">
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="captchaForm.phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="captcha">
            <el-input v-model="captchaForm.captcha" autocomplete="off"></el-input>
            <el-button type="primary" link @click="getCaptcha" :disabled="captchaCountdown > 0">
              {{ captchaCountdown > 0 ? captchaCountdown + 's' : '获取验证码' }}
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="captchaLogin">手机登录</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="activeTab === 'tab2'">
        <el-form :model="loginForm" :rules="loginRules" label-width="80px">
          <el-form-item label="账号" prop="phone">
            <el-input v-model.trim="loginForm.phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model.trim="loginForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login">密码登录</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="activeTab === 'tab3'">
        <el-form :rules="loginEmailRules" label-width="80px">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="emailForm.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="emailForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="emailLogin">邮箱登录</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="activeTab === 'tab4'">
        <div style="text-align: center">
          <el-image :src="QRCodeImg" style="width: 189px; height: 189px" fit="cover"></el-image>
          <p><el-button type="primary" link @click="QRCodeLogin">刷新二维码</el-button></p>
          <p style="margin-top: 10px">
            请使用
            <a style="color: #d31d31; cursor: pointer">网易云音乐</a>
            APP扫描二维码登录
          </p>
        </div>
      </div>
      <div v-if="activeTab === 'tab5'">
        <el-form :model="registerForm" :rules="registerRules" label-width="80px">
          <el-form-item label="昵称" prop="username">
            <el-input v-model="registerForm.nickname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="账号" prop="username">
            <el-input v-model="registerForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="registerForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input type="password" v-model="registerForm.confirmPassword" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="register">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { reactive, ref, onMounted } from 'vue'
  import { getLoginQRKey, getQRCodeImgBase, getCheckStatus, getLoginStatus } from '@/server/Login/login' //二维码登录
  import { captcha, getCheckCaptcha, getTelIsRegister, getTelLogin } from '@/server/Login/login' //二维码登录
  import { getLoginPhone, getLoginEmail } from '@/server/Login/login' //二维码登录
  import { useCounterStore } from '@/stores/counter.js'
  //   import { useRouter } from 'vue-router'
  // 定义变量 router 用来进行路由相关操作
  //   const router = useRouter()
  //   const userID = useCounterStore()
  //   console.log(userID)
  const loginStore = useCounterStore() //改变登录状态
  //   console.log(loginStore)

  const activeTab = ref('tab1') //选项卡

  const QRCodeImg = ref('') //二维码图片
  const QRCodeLogin = async () => {
    try {
      let QRkeys = await getLoginQRKey() // 获取key
      let key = QRkeys.data.data.unikey
      let CodeImg = await getQRCodeImgBase(key) // 获取二维码(key)
      QRCodeImg.value = CodeImg.data.data.qrimg //将二维码显示
      let timer // 定义计时器
      timer = setInterval(async () => {
        let statusRes = await getCheckStatus(key) // 二维码检测扫码状态接口(key)
        //   console.log(statusRes.data)
        if (statusRes.data.code === 800) {
          //   console.log(statusRes.data.code + ':' + statusRes.data.message)
          clearInterval(timer) //关闭定时器
        } else if (statusRes.data.code === 801) {
          //   console.log(statusRes.data.code + ':' + statusRes.data.message)
        } else if (statusRes.data.code === 802) {
          //   console.log(statusRes.data.code + ':' + statusRes.data.message)
        } else if (statusRes.data.code === 803) {
          // 这一步会返回cookie
          //   console.log(statusRes.data.code + ':' + statusRes.data.message)
          const cookie = statusRes.data.cookie //若登录成功则拿到cookie
          localStorage.setItem('cookie', cookie) //把cookie保存到localStorage中
          let loginStatus = await getLoginStatus(cookie) // 获取登录状态(cookie)
          // console.log(loginStatus.data.data) //拿到cookie获取cookie的用户数据(用户数据)
          localStorage.setItem('userInfo', JSON.stringify(loginStatus.data.data)) //把loginStatus.data.data(用户数据)保存到localStorage中
          loginStore.$state.loginState = true // 调用值为loginState的状态true
          clearInterval(timer) //关闭定时器
          //   router.go(0)
        } else {
          console.log(statusRes.data.code + ':' + statusRes.data.message)
          clearInterval(timer) //关闭定时器
        }
      }, 3000)
    } catch (error) {
      console.log(error)
    }
  }

  onMounted(() => {
    QRCodeLogin()
  })
  const captchaForm = reactive({
    // 验证码登录
    phone: '',
    captcha: ''
  })
  const captchaCountdown = ref(0) // 获取手机验证码计数器
  const getCaptcha = async () => {
    //获取手机验证码
    try {
      let checkReg = await getTelIsRegister(captchaForm.phone)
      if (checkReg.data.exist === 1) {
        let res = await captcha(captchaForm.phone)
        let time = 60
        setInterval(() => {
          captchaCountdown.value = --time
          if (time < 0) {
            clearInterval(time)
          }
        }, 999)
        console.log(res)
      } else {
        console.log('请先注册')
      }
    } catch (error) {}
  }
  const captchaLogin = async () => {
    //手机验证码登录
    try {
      let checkRes = await getCheckCaptcha(captchaForm.phone, captchaForm.captcha)
      console.log(checkRes.data.code)
      if (checkRes.data.code === 200) {
        let res = await getTelLogin(captchaForm.phone, captchaForm.captcha)
        console.log(res, '手机验证码登录，captchaLogin', captchaForm.phone, captchaForm.captcha)
      } else {
        console.log('验证码错误')
      }
    } catch (error) {}
  }
  const loginForm = reactive({
    phone: '',
    password: ''
  })
  const login = async () => {
    //密码登录
    try {
      let res = await getLoginPhone(loginForm.phone, loginForm.password)
      console.log(res)
      console.log('密码登录，login', loginForm.phone, loginForm.password)
    } catch (error) {}
  }
  const emailForm = reactive({
    email: '',
    password: ''
  })
  const emailLogin = async () => {
    // 邮箱登录
    try {
      let res = await getLoginEmail(emailForm.email, emailForm.password)
      console.log(res)
      console.log('邮箱登录，emailLogin', emailForm.email, emailForm.password)
    } catch (error) {}
  }

  const registerForm = reactive({
    //注册
    nickname: '',
    username: '',
    password: '',
    confirmPassword: ''
  })
  const register = async () => {
    //注册
    console.log('注册，register')
    if (registerForm.password != registerForm.confirmPassword) {
      registerForm.password = ''
      registerForm.confirmPassword = ''
    } else {
      let res = await telRegister(
        registerForm.nickname,
        registerForm.username,
        registerForm.password,
        registerForm.confirmPassword
      )
      console.log(res, '注册')
    }
  }
  const captchaRules = {
    // 验证码登录验证规则
    phone: [
      { required: true, message: '请输入手机号', trigger: 'blur' },
      { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
    ],
    captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
  }

  const loginRules = {
    // 登录表单验证规则:rules
    phone: [{ required: true, message: '请输入账号', trigger: 'blur' }],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 6, max: 20, message: 'Length should be 6 to 20', trigger: 'blur' }
    ]
  }

  const loginEmailRules = {
    // 邮箱登录
    email: [
      { required: true, message: '请输入邮箱', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱格式', trigger: ['blur', 'change'] }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
    ]
  }

  const registerRules = {
    // 注册规则
    username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    confirmPassword: [
      { required: true, message: '请确认密码', trigger: 'blur' },
      {
        validator: (rule, value, callback) => {
          if (value !== registerForm.password) {
            callback(new Error('两次输入密码不一致'))
          } else {
            callback()
          }
        },
        trigger: 'blur'
      }
    ]
  }
</script>

<style lang="less" scoped>
  .login-box {
    // width: 600px;
    // height: 400px;
    display: flex;
    margin: auto;
    .left-TabList {
      width: 100px;
      height: 100%;
      ul {
        width: 100%;
        height: 100%;
        border-right: 2px solid rgba(240, 240, 240, 0.9);
        li {
          width: 100%;
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          font-size: 16px;
          font-weight: 500;
          &:hover {
            background-color: rgba(240, 240, 240, 0.9);
          }
        }
        .li_active {
          background-color: rgba(240, 240, 240, 0.8);
          color: red;
        }
      }
    }
    .right-TabContent {
      width: calc(100% - 150px);
      height: 100%;
    }
  }
  .box {
    width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px #ccc;
  }
</style>
