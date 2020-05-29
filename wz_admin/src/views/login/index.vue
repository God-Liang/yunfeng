<template>
  <div class="contentBox flexBox flexRow">
    <div class="form flexBox flexColumn custo">
      <el-form
        ref="loginForm"
        :model="loginForm"
        label-position="left"
        :rules="loginRules"
        class="demo-ruleForm"
        style="box-sizing: content-box;"
      >
        <h2 style="font-weight:400;margin-top: 0;">欢迎登录</h2>
        <el-form-item prop="username">
          <img src="~@/assets/userImg.png" alt="">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入登录账户"
            @keyup.enter.native="handleLogin"
          />
        </el-form-item>
        <el-form-item prop="password">
          <img src="~@/assets/paswImg.png" alt="">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入登录密码"
            @keyup.enter.native="handleLogin"
          />
        </el-form-item>
        <el-button :loading="loading" type="primary" @click="handleLogin">
          登录
        </el-button>
      </el-form>
      <div class="czBox">
        <router-link to="/register">注册</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error('用户名不能为空！'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error('密码不能为空！'))
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
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          sessionStorage.setItem('redirect', query.redirect)
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (
          (shiftKey && key >= 'a' && key <= 'z') ||
          (!shiftKey && key >= 'A' && key <= 'Z')
        ) {
          this.capsTooltip = true
        } else {
          this.capsTooltip = false
        }
      }
      if (key === 'CapsLock' && this.capsTooltip === true) {
        this.capsTooltip = false
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
              // details/organInfo/0
              if (userInfo.examine === 2) {
                this.$router.push({
                  path: `/`,
                  query: this.otherQuery
                })
              } else {
                this.$router.push({
                  path: `/details/organInfo/${userInfo.org_id}`,
                  query: this.otherQuery
                })
              }
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
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  }
}
</script>
<style lang="scss" scoped>
.czBox {
  width: 40%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 5%;
  line-height: 40px;
  a {
    font-size: 14px;
    color: #03a9ac;
  }
}
</style>
<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
.flexColumn {
  flex-direction: column;
}
.flexBox {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.contentBox {
  background: url("~@/assets/loginBg.png");
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .form {
    width: 1000px;
    height: 540px;
    background: url("~@/assets/loginImg.png");
    background-size: 100% 100%;
    -webkit-border-radius: 30px;
    -moz-border-radius: 30px;
    border-radius: 30px;
    -webkit-box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.3);

    .el-form {
      width: 40%;
      padding: 0 5%;
      float: right;

      h2 {
        text-align: center;
        font-size: 32px;
        margin-bottom: 50px;
      }

      .el-form-item {
        border-bottom: 1px solid #eee;
        padding: 15px 0;
        /deep/ .el-input {
          width: 90%;
          float: right;
        }
        /deep/ .el-input__inner {
          border: none;
        }
        img {
          float: left;
          width: 28px;
          margin-top: 5px;
        }

        /deep/ .el-form-item__error {
          top: 75%;
          left: 60px;
        }
      }

      .el-button {
        width: 100%;
        margin-top: 50px;
        line-height: 48px;
        height: 50px;
        padding: 0;

        /deep/ span {
          font-size: 18px;
        }
      }
    }
  }
  .custo {
    align-items: flex-end !important;
  }
}
</style>
