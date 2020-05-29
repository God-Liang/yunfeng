<template>
  <div class="login-container">
    <div class="operateCenter">
      <div class="imgBox">
        <img src="../../assets/login/logo.png" alt="">
      </div>
        <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
          <div class="title-container">
            <!-- <h3 class="title">医院日间手术管理平台</h3> -->
            <h3 class="title">依米云管家</h3>
          </div>
          <el-form-item prop="name">
            <span class="svg-container svg-container_login">
              <svg-icon icon-class="user" />
            </span>
            <el-input name="username" type="text" v-model="loginForm.name" autoComplete="on" placeholder="请输入用户名" />
          </el-form-item>

          <el-form-item prop="pass">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input name="password" :type="passwordType" @keyup.enter.native="handleLogin" v-model="loginForm.pass" autoComplete="on" placeholder="请输入密码" />
            <span class="show-pwd" @click="showPwd">
              <svg-icon icon-class="eye" />
            </span>
          </el-form-item>

          <el-button class='loginButton' :loading="loading" @click.native.prevent="handleLogin">登录</el-button>
          <div class = 'signUpWrap'>
            <span class = 'forgotPassword'>忘记密码</span><router-link to = '/signUp' class = 'signUp'>快速注册</router-link>
          </div>
        </el-form>
      </div>

    </div>
</template>

<script>

export default {
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码长度不能少于6位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        name: 'admin',
        pass: '666666'
      },
      loginRules: {
        name: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        pass: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('LoginByUsername', this.loginForm)
            .then(res => {
              if (res.data.code === 200) {
                this.$router.push({ path: '/' })
              } else {
                this.$message({
                  message: res.data.msg,
                  type: 'warning'
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
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" >
$bg: #2d3a4b;
$light_gray: #eee;

/* reset element-ui css */
.login-container {
  background: url("../../assets/login/bg.png");
  background-size: 100% 100%;
  .operateCenter {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    display: flex;
    width: 708px;
    height: 400px;
    .imgBox {
      width: 314px;
      height: 400px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      input {
        background: transparent;
        border: 0 !important;
        border: none;
        outline: 0;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        // color: $light_gray;
        color: $bg;
        height: 47px;
        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px #fff inset !important;
          -webkit-text-fill-color: $bg !important;
        }
      }
    }
    .el-form-item {
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      color: $bg;
    }
    .signUpWrap{
      float: right;
      color: #00b1ac;
      text-align: center;
      font-size: 12px;
      cursor: pointer;
      .forgotPassword{
        &::after{
          display: inline-block;
          content: '';
          width: 1px;
          height: 8px;
          background-color: #00b1ac;
          margin: 0 5px;
        }
      }
    }
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  .login-form {
    flex: 1;
    height: 100%;
    padding: 30px 70px;
    background: #fff;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    // padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    font-size: 24px;
    text-align: center;
    &_login {
      font-size: 30px;
    }
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $dark_gray;
      margin: 0px auto 20px auto;
      text-align: center;
      font-weight: bold;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 20px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .loginButton {
    margin-top: 50px;
    padding: 15px 20px;
    width: 100%;
    margin-bottom: 30px;
    background: #00b1ac;
    color: #fff;
  }
}
</style>
