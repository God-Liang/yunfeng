<template>
  <div class="lg_retrieve">
    <div class="logoTop">
      <div class="logo">
        <img src="../../assets/login/doctorLogo.png" alt>
        <i></i>
        <span>找回密码</span>
      </div>
      <div class="signBox">
        <router-link to="/login">登录</router-link>
        <i></i>
        <router-link to="/signUp">注册</router-link>
      </div>
    </div>
    <div class="retrieveBox">
      <el-steps :active="retrieveNum" align-center>
        <el-step title="填写账号"></el-step>
        <el-step title="身份验证"></el-step>
        <el-step title="设置新密码"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <div class="steps">
        <div class="steplist" v-if="retrieveNum === 1">
          <h5>请填写您需要找回的用户名</h5>
          <el-input v-model="account" size="small" placeholder="用户名"></el-input>
          <div class="authCode">
            <el-input v-model="authCode" size="small" placeholder="验证码"></el-input>
            <span id="code">{{code}}</span>
            <span @click="change">换一张</span>
          </div>
        </div>
        <div class="steplist" v-if="retrieveNum === 2">
          <h5>请填写您绑定帐号的手机号</h5>
          <el-input v-model="phone" size="small" placeholder="手机号" disabled></el-input>
          <div class="authCode">
            <el-input v-model="phoneAuthCode" size="small" placeholder="验证码"></el-input>
            <span id="gain" v-if="getCodePage" @click="getPhoneCode">获取验证码</span>
            <span id="gain" v-else>{{count}}s</span>
          </div>
        </div>
        <div class="steplist" v-if="retrieveNum === 3">
          <h5>请设置新密码</h5>
          <span style="color:#f00;font-size:12px;line-height:20px;" v-if="passwordTage">密码长度不能少于6位</span>
          <el-input v-model="password" type="password" size="small" style="margin-bottom:25px;"></el-input>
          <h5>请再次输入密码</h5>
          <span style="color:#f00;font-size:12px;line-height:20px;" v-if="affirmPasswordTage">两次密码不一致</span>
          <el-input v-model="affirmPassword" type="password" size="small"></el-input>
        </div>
        <div class="steplist" v-if="retrieveNum === 4">
          <div class="succeedBox">
            <img src="../../assets/login/succeed.png" alt="">
            <p>密码修改成功</p>
          </div>
        </div>
        <div class="nextStep" v-if="noAccomplish" @click="nextStep">下一步</div>
      </div>
    </div>
  </div>
</template>
<script>
import { getAuthCode, getPass, verification, checkUserIsExist } from '@/api/myhome/'
import qs from 'qs'
import crypto from 'crypto'
export default {
  name: 'signUp2',
  mounted() {
    this.getCode()
  },
  data() {
    return {
      retrieveNum: 1,
      noAccomplish: true,
      account: '',
      code: '',
      authCode: '',
      phone: '',
      notePhone: '',
      phoneAuthCode: '',
      password: '',
      affirmPassword: '',
      passwordTage: false,
      affirmPasswordTage: false,
      getCodePage: true,
      count: '0'
    }
  },
  methods: {
    nextStep() {
      if (this.retrieveNum === 1) {
        if (this.account === '') {
          this.$message({
            type: 'warning',
            message: '账号不能为空'
          })
          return false
        }
        if (this.authCode === '') {
          this.$message({
            type: 'warning',
            message: '验证码不能为空'
          })
          return false
        }
        if (this.authCode.toLowerCase() !== this.code.toLowerCase()) {
          this.$message({
            type: 'warning',
            message: '请输入正确的验证码'
          })
          return false
        }
        checkUserIsExist({ username: this.account }).then(res => {
          if (res.data.code === 200) {
            this.notePhone = res.data.phone
            const start = res.data.phone.slice(0, 7)
            this.phone = start + '****'
          } else {
            this.retrieveNum--
            this.account = ''
          }
        })
      }
      if (this.retrieveNum === 2) {
        if (this.phone === '') {
          this.$message({
            type: 'warning',
            message: '请输入手机号'
          })
          return false
        }
        if (this.phoneAuthCode === '') {
          this.$message({
            type: 'warning',
            message: '请输入验证码'
          })
          return false
        }
        verification({ phone: this.notePhone, code: this.phoneAuthCode }).then((res) => {
          if (res.data.code !== 200) {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
            return false
          }
        })
      }
      this.retrieveNum++
      if (this.retrieveNum === 4) {
        this.noAccomplish = false
        const md5 = crypto.createHash('md5')
        md5.update(this.password)
        this.getCode() // 随机生成四个字符
        this.password = this.code[0] + this.code[1] + md5.digest('hex') + this.code[2] + this.code[3] // md5加密密码并拼接随机生成字符
        const data = qs.stringify({ name: this.account, phone: this.notePhone, pass: this.password }, { arrayFormat: 'brackets' })
        getPass(data).then((res) => {
          if (res.data.code !== 200) {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
            this.retrieveNum--
            this.noAccomplish = true
          } else {
            setTimeout(() => {
              this.$router.push('/login')
            }, 1000)
          }
        })
      }
    },
    getCode() {
      const selectChar = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
      const codeLength = 4
      for (let i = 0; i < codeLength; i++) {
        this.code += selectChar[Math.floor(Math.random() * 61)]
      }
    },
    change() {
      this.code = ''
      this.getCode()
    },
    getPhoneCode() {
      const data = qs.stringify({ phone: this.notePhone }, { arrayFormat: 'brackets' })
      getAuthCode(data).then((res) => {
        this.$message({
          type: 'success',
          message: '发送成功'
        })
      })
      this.count = 60
      this.getCodePage = false
      const auth_timetimer = setInterval(() => {
        this.count--
        if (this.count <= 0) {
          this.getCodePage = true
          clearInterval(auth_timetimer)
        }
      }, 1000)
    }
  },
  watch: {
    password(val, oldVal) {
      if (val.length < 6) {
        this.passwordTage = true
      } else {
        this.passwordTage = false
      }
    },
    affirmPassword(val, oldVal) {
      if (val !== this.password) {
        this.affirmPasswordTage = true
      } else {
        this.affirmPasswordTage = false
      }
    }
  }
}
</script>
<style lang="scss">
.lg_retrieve {
  .logoTop {
    width: calc(100% - 40px);
    height: 70px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #53ccd4;
    .logo {
      width: 100%;
      height: 70px;
      display: flex;
      justify-content: flex-start;
      img {
        display: inline-block;
        width: 135px;
        margin: 10px 0;
      }
      i {
        width: 1px;
        height: 12px;
        margin: 28px 20px 0;
        background-color: #4ebdb2;
        display: inline-block;
        vertical-align: middle;
      }
      span {
        line-height: 68px;
        display: inline-block;
        font-size: 14px;
        font-family: "黑体";
        color: #111;
      }
    }
    .signBox {
      width: 120px;
      display: flex;
      justify-content: flex-start;
      a {
        color: #4ebdb2;
        font-size: 14px;
        line-height: 68px;
      }
      i {
        width: 1px;
        height: 10px;
        background-color: #4ebdb2;
        margin: 30px 5px 0;
      }
    }
  }
  .retrieveBox {
    width: 700px;
    padding: 30px 0 0;
    margin: 0 auto;
    .steps {
      padding: 0 150px;
      .steplist {
        margin-top: 50px;
        h5 {
          font-size: 14px;
          font-family: "黑体";
          font-weight: normal;
          color: #bababa;
          margin: 0 0 20px;
        }
        .el-input input {
          border-radius: 0;
          &.focus {
            border-color: #4ebdb2;
          }
        }
        .authCode {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
          .el-input input {
            border-radius: 0;
            &.focus {
              border-color: #4ebdb2;
            }
          }
          span {
            width: 70px;
            height: 30px;
            line-height: 30px;
            display: inline-block;
            color: #ababab;
            font-size: 14px;
            cursor: pointer;
            &#code {
              color: #fff;
              background-image: -webkit-linear-gradient(top, #0b02aa, #4ebdb2);
              font-size: 12px;
              text-align: center;
              cursor: auto;
              margin: 0 15px;
            }
            &#gain{
              width: 140px;
              color:#fff;
              background-color: #4ebdb2;
              text-align: center;
              margin-left: 30px;
            }
          }
        }
        .succeedBox{
          width: 100%;
          text-align: center;
          img{
            width: 55px;
            height: 55px;
          }
          p{
            font-size: 12px;
          }
        }
        
      }
      .nextStep {
        text-align: center;
        font-size: 14px;
        color: #fff;
        background-color: #4ebdb2;
        border-radius: 4px;
        display: inline-block;
        padding: 8px 50px;
        cursor: pointer;
        margin-top: 30px;
        margin-left: 80px;
      }
    }
  }
  input::placeholder {
    color: #bababa;
    font-size: 12px;
  }
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px white inset;
    border: 1px solid #ccc !important ;
  }
  .el-step__title {
    font-size: 14px;
  }
  .el-step{
    .el-step__head{
      color: #ababab;
      border-color: #ababab;
    }
    .is-finish{
      color: #4ebdb2;
      border-color: #4ebdb2;
    }
  }
  input:focus{
    border-color:#4ebdb2;
  }
  .el-step__title{
    color: #ababab;
  }
  .is-finish{
    color:#4ebdb2;
  }
}
</style>