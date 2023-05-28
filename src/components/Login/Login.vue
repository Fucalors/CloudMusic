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
            <el-button :disabled="captchaCountdown > 0" link type="primary" @click="getCaptcha">
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
            <el-input v-model.trim="loginForm.password" autocomplete="off" type="password"></el-input>
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
            <el-input v-model="emailForm.password" autocomplete="off" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="emailLogin">邮箱登录</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="activeTab === 'tab4'">
        <div style="text-align: center">
          <el-image :src="QRCodeImg" fit="cover" style="width: 189px; height: 189px"></el-image>
          <p><el-button link type="primary" @click="QRCodeLogin">刷新二维码</el-button></p>
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
            <el-input v-model="registerForm.password" autocomplete="off" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input v-model="registerForm.confirmPassword" autocomplete="off" type="password"></el-input>
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
  import { useUserStore } from '@/stores/modules/userStore.js'
  import { useRouter } from 'vue-router'

  const router = useRouter() // 获取vue-router实例

  const usrStore = useUserStore() // 获取pinia useUserStore信息

  const activeTab = ref('tab1') // 定义一个响应式变量activeTab，初始值为字符串'tab1'

  const QRCodeImg = ref('') // 定义一个响应式变量QRCodeImg，初始值为空字符串
  const QRCodeLogin = async () => { // 定义一个异步函数QRCodeLogin
    try {
      let QRkeys = await getLoginQRKey() // 调用getLoginQRKey函数并等待返回结果
      let key = QRkeys.data.data.unikey // 从返回结果中获取unikey
      let CodeImg = await getQRCodeImgBase(key) // 调用getQRCodeImgBase函数并等待返回结果
      QRCodeImg.value = CodeImg.data.data.qrimg // 将返回结果中的qrimg赋值给QRCodeImg
      let timer // 定义计时器
      timer = setInterval(async () => { // 每3秒执行一次以下代码块
        let statusRes = await getCheckStatus(key) // 调用getCheckStatus函数并等待返回结果
        if (statusRes.data.code === 800) { // 如果返回结果中的code为800，则表示二维码已扫描并等待确认
          clearInterval(timer) // 关闭定时器
        } else if (statusRes.data.code === 801) { // 如果返回结果中的code为801，则表示二维码已过期
        } else if (statusRes.data.code === 802) { // 如果返回结果中的code为802，则表示二维码已失效
        } else if (statusRes.data.code === 803) { // 如果返回结果中的code为803，则表示登录已完成
          // 这一步会返回cookie
          const cookie = statusRes.data.cookie // 从返回结果中获取cookie
          localStorage.setItem('cookie', cookie) // 将cookie存储到localStorage中
          let loginStatus = await getLoginStatus(cookie) // 调用getLoginStatus函数并等待返回结果
          localStorage.setItem('userInfo', JSON.stringify(loginStatus.data.data)) // 将返回结果中的用户数据存储到localStorage中
          usrStore.changeLoginState(true) // 调用值为loginState的状态true
          router.push('/') // 跳转到根路径
          clearInterval(timer) // 关闭定时器
        } else {
          clearInterval(timer) // 关闭定时器
        }
      }, 3000)
    } catch (error) {
      throw error.message // 输出错误信息
    }
  }

  onMounted(() => {
    QRCodeLogin()
  })
  const captchaForm = reactive({
    // 验证码登录表单
    phone: '', // 手机号
    captcha: '' // 验证码
  })
  const captchaCountdown = ref(0) // 获取手机验证码计数器
  const getCaptcha = async () => {
    // 获取手机验证码
    try {
      let checkReg = await getTelIsRegister(captchaForm.phone) // 检查手机号是否已注册
      if (checkReg.data.exist === 1) { // 如果手机号已注册
        let res = await captcha(captchaForm.phone) // 获取验证码
        let time = 60 // 验证码有效时间
        setInterval(() => {
          captchaCountdown.value = --time // 更新验证码倒计时
          if (time < 0) {
            clearInterval(time) // 倒计时结束
          }
        }, 999)
        console.log(res) // 打印验证码
      } else {
        console.log('请先注册') // 手机号未注册
      }
    } catch (error) {}
  }
  const captchaLogin = async () => {
    // 手机验证码登录
    try {
      let checkRes = await getCheckCaptcha(captchaForm.phone, captchaForm.captcha) // 验证码校验
      console.log(checkRes.data.code)
      if (checkRes.data.code === 200) { // 验证码校验成功
        let res = await getTelLogin(captchaForm.phone, captchaForm.captcha) // 手机验证码登录
        console.log(res, '手机验证码登录，captchaLogin', captchaForm.phone, captchaForm.captcha)
      } else {
        console.log('验证码错误') // 验证码校验失败
      }
    } catch (error) {}
  }
  const loginForm = reactive({
    // 密码登录表单
    phone: '', // 账号
    password: '' // 密码
  })
  const login = async () => {
    // 密码登录
    try {
      let res = await getLoginPhone(loginForm.phone, loginForm.password) // 密码登录
      console.log(res)
      console.log('密码登录，login', loginForm.phone, loginForm.password)
    } catch (error) {}
  }
  const emailForm = reactive({
    // 邮箱登录表单
    email: '', // 邮箱
    password: '' // 密码
  })
  const emailLogin = async () => {
    // 邮箱登录
    try {
      let res = await getLoginEmail(emailForm.email, emailForm.password) // 邮箱登录
      console.log(res)
      console.log('邮箱登录，emailLogin', emailForm.email, emailForm.password)
    } catch (error) {}
  }

  const registerForm = reactive({
    // 注册表单
    nickname: '', // 昵称
    username: '', // 账号
    password: '', // 密码
    confirmPassword: '' // 确认密码
  })
  const register = async () => {
    // 注册
    console.log('注册，register')
    if (registerForm.password != registerForm.confirmPassword) { // 两次输入密码不一致
      registerForm.password = ''
      registerForm.confirmPassword = ''
    } else {
      let res = await telRegister(
          registerForm.nickname,
          registerForm.username,
          registerForm.password,
          registerForm.confirmPassword
      ) // 手机号注册
      console.log(res, '注册')
    }
  }
  const captchaRules = {
    // 验证码登录表单验证规则
    phone: [
      { required: true, message: '请输入手机号', trigger: 'blur' }, // 要求输入手机号，如果未输入则提示 '请输入手机号'，触发方式为失去焦点
      { pattern: /^1[3456789]d{9}$/, message: '请输入正确的手机号', trigger: 'blur' } // 要求输入的手机号符合正则表达式 /^1[3456789]d{9}$/，如果不符合则提示 '请输入正确的手机号'，触发方式为失去焦点
    ],
    captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }] // 要求输入验证码，如果未输入则提示 '请输入验证码'，触发方式为失去焦点
  }

  const loginRules = {
    // 密码登录表单验证规则
    phone: [{ required: true, message: '请输入账号', trigger: 'blur' }], // 要求输入账号信息，如果未输入则提示 '请输入账号'，触发方式为失去焦点
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' }, // 要求输入密码信息，如果未输入则提示 '请输入密码'，触发方式为失去焦点
      { min: 6, max: 20, message: '长度应为 6 到 20 个字符', trigger: 'blur' } // 要求密码长度为 6 到 20 个字符，如果不符合要求则提示 '长度应为 6 到 20 个字符'，触发方式为失去焦点
    ]
  }

  const loginEmailRules = {
    // 邮箱登录表单验证规则
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
    // 注册表单验证规则
    username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    confirmPassword: [
      { required: true, message: '请确认密码', trigger: 'blur' },
      {
        validator: (rule, value, callback) => {
          if (value !== registerForm.password) {
            callback(new Error('两次输入密码不一致')) // 两次输入密码不一致
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
