<template>
  <div class="lg_login">
    <div class="loginBox">
      <div class="logoLeft">
        <img src="../../assets/login/doctorLogo.png" alt>
      </div>
      <i class="loginXian"></i>
      <div class="loginRight">
        <h5>欢迎登录</h5>
        <el-form :model="loginForm" ref="loginForm">
          <el-form-item
            prop="name"
            :rules="{ required: true, message: '用户名不能为空', trigger: 'blur' }"
          >
            <span class="svg-container">
              <svg-icon icon-class="user"/>
            </span>
            <el-input
              name="username"
              v-model="loginForm.name"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="pass"
            :rules="[{ required: true, message: '密码不能为空', trigger: 'blur' },
                        { min: 6, message: '密码长度最少为6位', trigger: 'blur' }]"
          >
            <span class="svg-container svg-container_login">
              <svg-icon icon-class="password"/>
            </span>
            <el-input
              name="password"
              type="password"
              v-model="loginForm.pass"
              @keyup.enter.native="handleLogin"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item class="submit">
            <el-button :loading="loading" @click.native.prevent="handleLogin">立即登录</el-button>
          </el-form-item>
          <el-form-item class="last">
            <!--<router-link to="/retrieve">忘记密码</router-link>-->
            <!-- <i></i>
            <router-link to="/signUp">快速注册</router-link> -->
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import crypto from 'crypto'
export default {
  name: 'login2',
  data() {
    return {
      loginForm: {
        name: '',
        pass: ''
      },
      loading: false,
      code: ''
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          const loginForm = Object.assign({}, this.loginForm)
          const md5 = crypto.createHash('md5')
          md5.update(loginForm.pass)
          this.getCode() // 随机生成四个字符
          loginForm.pass = this.code[0] + this.code[1] + md5.digest('hex') + this.code[2] + this.code[3] // md5加密密码并拼接随机生成字符
          this.$store.dispatch('LoginByUsername', loginForm).then((res) => {
            if (res.data.code === 200) {
              this.$router.push({ path: '/' })
            } else {
              this.$message({
                message: res.data.msg,
                type: 'warning'
              })
              this.loginForm.pass = ''
            }
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getCode() {
      const selectChar = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
      const codeLength = 4
      for (let i = 0; i < codeLength; i++) {
        this.code += selectChar[Math.floor(Math.random() * 61)]
      }
    }
  }
}
</script>
<style lang="scss">
.lg_login {
  position: fixed;
  height: 100%;
  width: 100%;
  background: url("../../assets/login/doctorBg.png") no-repeat;
  background-size: 100% 100%;
  .loginBox {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    display: flex;
    justify-content: flex-start;
    width: 500px;
    height: 190px;
    z-index: 999;
    .logoLeft {
      width: calc(50% - 1px);
      img {
        width: 100%;
        padding-right: 35px;
        display: inline-block;
        margin-top: 55px;
      }
    }
    .loginXian {
      width: 1px;
      height: 100%;
      background-color: rgb(169, 168, 165);
    }
    .loginRight {
      width: 50%;
      padding-left: 35px;
      h5 {
        color: #fff;
        font-size: 16px;
        font-family: "微软雅黑";
        margin: 0;
        font-weight: normal;
        line-height: 20px;
        margin-bottom: 10px;
      }
      .el-form {
        .el-form-item {
          display: flex;
          justify-content: flex-start;
          margin-bottom: 20px;
          height: 32px;
          line-height: 30px;
          border-bottom: 1px solid #ccc;
          .el-form-item__content {
            line-height: 30px !important;
            .svg-container {
              color: #ffffff;
              font-size: 22px;
            }
            .svg-container_login {
              font-size: 16px;
              margin: 0 3px;
            }
            .el-input {
              width: 182px;
              height: 30px;
              line-height: 30px;
              .el-input__inner {
                background-color: transparent !important;
                border: none;
                color: #fff;
                border-radius: 0;
                height: 30px;
                line-height: 30px;
                padding: 0 5px;
              }
            }
          }
          &.submit {
            border: none;
            margin: 0 0 2px 0;
            .el-form-item__content {
              width: 215px;
              height: 30px;
              line-height: 30px;
              .el-button {
                width: 100%;
                background-color: rgb(83, 204, 212);
                border: none;
                color: #fff;
              }
            }
          }
          &.last {
            margin: 0;
            text-align: right;
            display: flex;
            justify-content: flex-end;
            height: 24px;
            border: 0;
            .el-form-item__content {
              color: #fff;
              font-size: 12px;
              i {
                height: 10px;
                width: 1px;
                background-color: #ccc;
                display: inline-block;
                vertical-align: middle;
                margin: 0 3px;
              }
            }
          }
        }
      }
    }
  }
  input {
    background-color: transparent;
    -webkit-text-fill-color: #fff;
  }
  input:focus {
    background: transparent;
  }
  input:-webkit-autofill {
    -webkit-animation: autofill-fix 1s infinite;
  }
  @-webkit-keyframes autofill-fix {
    from {
      background-color: transparent;
    }
    to {
      background-color: transparent;
    }
  }
}
</style>


