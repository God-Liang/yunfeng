<template lang="pug">
  .login-container
    .lg-logo
      img(src="../../assets/login/logo.png" alt)
    h2 智能化自主随访 符合不同应用场景的随访方案
    .lg-login-content
      img.lg-home(src="../../assets/login/loginHome.png" alt)
      .lg-login-form
        h4 欢迎登录
        el-form(ref="loginForm" :model="loginForm" :rules="loginRules" label-width="0px")
          el-form-item.name(prop="username")
            img(src="../../assets/login/userName.png" alt)
            el-input#name(ref="username"
              v-model="loginForm.username"
              placeholder="请输入登录账户"
              name="username"
              type="text"
              tabindex="1"
              autocomplete="on"
              @keyup.enter.native="handleLogin")
          el-form-item.password(prop="password")
            img(src="../../assets/login/password.png" alt)
            el-input(:key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="请输入登录密码"
              name="password"
              tabindex="2"
              autocomplete="on"
              @blur="capsTooltip = false"
              @keyup.enter.native="handleLogin")
        .lg-login-operation
          el-checkbox.lg-remember(v-model="isRemember" @keyup.enter.native="handleLogin") 记住密码
          router-link(to="")
        el-button.lg-btn(:loading="loading" type="primary" @click="handleLogin" @keyup.enter.native="handleLogin") 登录
</template>

<script>

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不少于六个字符'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      redirect: undefined,
      otherQuery: {},
      isRemember: false
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  mounted() {
    if (localStorage.getItem('username')) {
      this.loginForm.username = localStorage.getItem('username')
    }
    if (localStorage.getItem('password')) {
      this.isRemember = true
      this.loginForm.password = localStorage.getItem('password')
    }
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    } else {
      this.$refs.password.focus()
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              if (this.isRemember) {
                localStorage.setItem('username', this.loginForm.username)
                localStorage.setItem('password', this.loginForm.password)
              } else {
                localStorage.setItem('username', this.loginForm.username)
                localStorage.setItem('password', '')
              }
              // this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.$router.push({ path: '/' })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  background-color: #f2f2f2;
  width: 100vw;
  height: 100vh;
  background: url("../../assets/login/loginBg.jpg") no-repeat;
  background-size: cover;
  .lg-logo {
    padding-top: 76px;
    text-align: center;
    img {
      width: 194px;
    }
  }
  h2 {
    color: #ffffff;
    font-size: 30px;
    line-height: 30px;
    font-weight: normal;
    margin: 37px 0 34px;
    text-align: center;
  }
  .lg-login-content {
    width: 1000px;
    height: 542px;
    margin: 0 auto;
    position: relative;
    display: flex;
    .lg-home {
      width: 1020px;
      position: absolute;
      left: -93px;
      top: -39px;
    }
    .lg-login-form {
      width: 492px;
      background-color: #fff;
      height: 542px;
      position: absolute;
      right: 0;
      top: 0;
      border-radius: 0 30px 30px 0;
      h4 {
        color: #333333;
        font-size: 30px;
        font-weight: normal;
        line-height: 30px;
        margin: 60px 0;
        text-align: center;
      }
    }
    .lg-login-operation {
      width: 350px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 20px auto 45px;
      a {
        color: #888888;
        font-size: 14px;
        text-decoration: underline;
      }
    }
    .lg-btn {
      width: 350px;
      margin: 0 auto;
      height: 50px;
      line-height: 50px;
      background-color: #03A9AC;
      padding: 0;
      font-size: 18px;
      display: block;
    }
  }
}
</style>
<style lang="scss">
.lg-login-form {
  .el-form {
    width: 350px;
    margin: 0 auto;
    .el-form-item {
      border-bottom: 1px solid #eeeeee;
      .el-form-item__content {
        padding: 15px 10px;
        display: flex;
        img {
          width: 28px;
          height: 30px;
        }
        .el-input {
          border: 0;
          outline: none;
          color: #333;
          font-size: 18px;
          margin-left: 10px;
          input {
            border: 0;
            outline: none;
            color: #333;
            background-color: #fff;
          }
        }
      }
      .el-form-item__error {
        padding-top: 5px;
      }
    }
  }
}
input:-webkit-autofill,
textarea:-webkit-autofill,
select:-webkit-autofill {
  -webkit-text-fill-color: #333 !important;
  -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
  background-color: transparent;
  background-image: none;
  transition: background-color 50000s ease-in-out 0s;
}
input {
  background-color: transparent;
}
.lg-remember {
  .el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: #03A9AC;
    border-color: #03A9AC;
  }
  .el-checkbox__label {
    color: #888888;
  }
  .el-checkbox__input.is-checked+.el-checkbox__label {
    color: #888888;
  }
}
</style>
