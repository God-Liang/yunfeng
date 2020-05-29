<template>
  <div class="login-container">
      
    <div class="operateCenter">
      <div class="title-container">
        <h3 class="title">欢迎注册依米云管家</h3>
      </div>
      <div class="imgBox">
        <img src="../../assets/login/logo.png" alt="">
      </div>
        <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
         
          <el-form-item prop="name">
             <md-input name="name" placeholder="输入用户名" v-model="loginForm.name">用户名</md-input>
          </el-form-item>

          <el-form-item prop="pass">
            <md-input name="pass" placeholder="请输入密码" :type = 'passwordType' v-model="loginForm.pass" >密码</md-input>
            <span class="show-pwd" @click="showPwd">
              <svg-icon icon-class="eye" />
            </span>
          </el-form-item>
          <el-form-item prop="confirmPass">
            <md-input name="pass" placeholder="请确认密码" :type = 'confirmPassType' v-model="loginForm.confirmPass" >确认密码</md-input>
            <span class="show-pwd" @click="showConfirmPass">
              <svg-icon icon-class="eye" />
            </span>
          </el-form-item>
          <el-form-item prop="phone">
            <md-input name="pass" placeholder="请输入手机号" type = 'text' v-model="loginForm.phone" @keyup.enter.native="handleLogin">手机号</md-input>
          </el-form-item>

          <el-button class='loginButton' :loading="loading" @click.native.prevent="handleLogin">注册</el-button>
          <div class = 'login'>
            <router-link to = "/login">直接登录</router-link>
          </div>
        </el-form>
      </div>

    </div>
</template>

<script>
import mdInput from '@/components/MDinput'
import rules from '@/utils/rules'
export default {
  name: 'signUp',
  components: { mdInput },
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
    const validateconfirmPass = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码长度不能少于6位'))
      } else if (value !== this.loginForm.pass) {
        callback(new Error('两次密码不一样！'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        name: '',
        pass: '',
        confirmPass: '',
        phone: ''
      },
      loginRules: {
        name: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        pass: [{ required: true, trigger: ['blur', 'change'], validator: validatePassword }],
        confirmPass: [{ required: true, trigger: ['blur', 'change'], validator: validateconfirmPass }],
        phone: [{ required: true, message: '电话号码不能为空', trigger: ['blur', 'change'] }, rules.phone]
      },
      passwordType: 'password',
      confirmPassType: 'password',
      loading: false,
      showDialog: false
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = 'text'
      } else {
        this.passwordType = 'password'
      }
    },
    showConfirmPass() {
      if (this.confirmPassType === 'password') {
        this.confirmPassType = 'text'
      } else {
        this.confirmPassType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          // 注册提交接口
        //   signUp(this.loginForm)
        //     .then(res => {
        //       if (res.data.code === 200) {
        //         this.$router.push({ path: '/login' })
        //       } else {
        //         this.$message({
        //           message: res.data.msg,
        //           type: 'warning'
        //         })
        //       }
        //       this.loading = false
        //     })
        //     .catch(() => {
        //       this.loading = false
        //     })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
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
    .title-container{
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: -100px;
        .title {
          font-size: 26px;
          font-weight: 400;
          text-align: center;
          font-weight: bold;
          color: #00b1ac;
        }
    }
    .imgBox {
      width: 314px;
      height: 400px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
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
    margin-bottom: 0;
  }
  .login{
    float: right;
    color: #00b1ac;
    text-align: center;
    font-size: 12px;
    cursor: pointer;
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
    padding: 0 70px;
    background: #fff;
    font-size: 12px;
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
  
  .show-pwd {
    position: absolute;
    right: 10px;
    bottom: 0;
    font-size: 20px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .loginButton {
    margin-top: 20px;
    margin-bottom: 5px;
    padding: 15px 20px;
    width: 100%;
    background: #00b1ac;
    color: #fff;
  }
}
</style>
