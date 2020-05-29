<template>
  <div class="lg_signUp" v-loading="signUpLoading">
    <div class="logoTop">
      <div class="logo">
        <img src="../../assets/login/doctorLogo.png" alt>
      </div>
    </div>
    <h2>欢迎注册依米云管家</h2>
    <div class="signUpBox">
      <div class="signIn">
        <span>已有依米云管家账号？</span>
        <router-link to="/login">立即登录</router-link>
      </div>
      <el-form
        class="login-form"
        autocomplete="on"
        :model="loginForm"
        :rules="loginRules"
        label-width="100px"
        ref="loginForm"
      >
        <el-form-item label="机构类型：" prop="organizationType" v-show="show">
          <dict-select
            v-model="loginForm.organizationType"
            placeholder
            style="width:100%;"
            dict-code="jgxz"
          ></dict-select>
        </el-form-item>
        <el-form-item label="机构名称：" prop="organizationName" v-show="show">
          <el-input name="organizationName" v-model="loginForm.organizationName"></el-input>
        </el-form-item>
        <el-form-item label="用户名：" prop="name" v-show="show">
          <el-input name="name" v-model="loginForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="pass" v-show="show">
          <el-input name="pass" type="password" v-model="loginForm.pass"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="confirmPass" v-show="show">
          <el-input name="confirmPass" type="password" v-model="loginForm.confirmPass"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名：" prop="realName" v-show="show">
          <el-input v-model="loginForm.realName"></el-input>
        </el-form-item>
        <el-form-item label="性别：" prop="gender" v-show="show">
          <dict-select v-model="loginForm.gender" placeholder style="width:100%;" dict-code="xb"></dict-select>
        </el-form-item>
        <el-form-item label="手机号：" prop="phone" v-show="show">
          <el-input
            name="phone"
            type="text"
            v-model="loginForm.phone"
            @keyup.enter.native="handleLogin"
          ></el-input>
        </el-form-item>
        <el-form-item label="验证码：" id="code" prop="code" v-show="show">
          <el-input name="code" v-model="loginForm.code"></el-input>
          <el-button v-if="getCodePage" class="getcode" size="small" @click="getCode">获取验证码</el-button>
          <el-button v-else size="small" class="getcode">{{count}}s</el-button>
        </el-form-item>
        <el-form-item label="机构资质：" prop="accessory" v-show="!show">
          <el-upload
            class="upload-demo"
            :action="upLoadImage"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-success="handleSuccess"
            :before-upload="beforeUpload"
            :file-list="aptitudeFileList"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <span style="color:#999;margin-left:10px;">请上传营业执照</span>
          </el-upload>
        </el-form-item>
        <el-form-item label="地址：" v-show="!show" prop="companyArea">
          <el-cascader
            placeholder="试试搜索：地名"
            :options="options"
            filterable
            change-on-select
            v-model="patient.companyAreaId"
            @change="companyAreaIdChange"
            style="width: 100%;"
          ></el-cascader>
          <el-input
            v-model="patient.companyDetialAddr"
            auto-complete="off"
            placeholder="详细地址"
            style="width: 100%;"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" v-show="!show">
          <el-input name="email" v-model="loginForm.email"></el-input>
        </el-form-item>
        <el-form-item label="传真：" v-show="!show">
          <el-input name="fax" v-model="loginForm.fax"></el-input>
        </el-form-item>
        <el-button class="loginButton" @click="show = false" v-show="show">下一步</el-button>
        <el-button class="loginButton" @click="show = true" v-show="!show">上一步</el-button>
        <el-button
          class="loginButton"
          style="margin-top:50px;background-color: #4ebdb2;"
          :loading="loading"
          @click.native.prevent="handleLogin"
          v-show="!show"
        >注册</el-button>
        <p v-show="!show">
          点击注册，表示同意我们的
          <i>使用条款</i>
        </p>
      </el-form>
    </div>
  </div>
</template>
<script>
// import rules from '@/utils/rules'
import DictSelect from '@/views/form/dictSelect'
import { organizationName, signUp, getAuthCode, verification } from '@/api/myhome/'
import { getAreaList } from '@/api/common/common'
import qs from 'qs'
import crypto from 'crypto'
export default {
  name: 'signUp2',
  components: { DictSelect },
  mounted() {
    this.getArea()
  },
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
      upLoadImage: this.$store.state.app.BASE_API + '/attachment/upLoadImage',
      loginForm: {
        name: '',
        pass: '',
        confirmPass: '',
        phone: '',
        organizationType: '',
        organizationName: '',
        realName: '',
        gender: '',
        code: '',
        companyArea: ''
      },
      loginRules: {
        organizationType: [{ required: true, message: '请选择机构类型', trigger: ['blur', 'change'] }],
        name: [{ required: true, trigger: 'blur', validator: validateUsername }],
        pass: [{ required: true, trigger: ['blur', 'change'], validator: validatePassword }],
        confirmPass: [{ required: true, trigger: ['blur', 'change'], validator: validateconfirmPass }],
        organizationName: [{ required: true, message: '请输入机构名称', trigger: ['blur', 'change'] }],
        realName: [{ required: true, message: '请输入真实姓名', trigger: ['blur', 'change'] }],
        gender: [{ required: true, message: '请选择您的性别', trigger: ['blur', 'change'] }],
        code: [{ required: true, message: '验证码不能为空', trigger: ['blur', 'change'] }],
        companyArea: [{ required: true, message: '地址不能为空', trigger: ['blur', 'change'] }]
        // accessory: [{ required: true, message: '机构资质不能为空', trigger: ['blur', 'change'] }]
      },
      passwordType: 'password',
      confirmPassType: 'password',
      loading: false,
      showDialog: false,
      organizationList: [],
      organizationNameList: [],
      getCodePage: true,
      count: '0',
      organizationTypeList: [
        {
          value: '1',
          label: '医疗机构'
        },
        {
          value: '2',
          label: '社区机构'
        }
      ],
      uploadUrl: '', // 图片上传地址
      aptitudeFileList: [],
      showTage: [],
      show: true,
      accessory: '',
      patient: {
        companyAreaId: [],
        companyDetialAddr: ''
      },
      options: [],
      code: '',
      signUpLoading: false
    }
  },
  methods: {
    // 上传图片之前
    beforeUpload(file) {
      if (this.showTage.length <= 3) {
        this.signUpLoading = true
      } else {
        this.$message({
          type: 'warning',
          message: '最多上传三份'
        })
        return false
      }
    },
    handleRemove(file, fileList) {
      this.showTage = fileList
      this.signUpLoading = false
    },
    beforeRemove(file, fileList) {
      this.signUpLoading = true
    },
    handlePreview(file) {},
    handleSuccess(res, file, fileList) {
      if (res.code === 200) {
        this.signUpLoading = false
        this.showTage = fileList
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          verification({ phone: this.loginForm.phone, code: this.loginForm.code }).then((res) => {
            if (res.data.code !== 200) {
              this.$message({
                type: 'error',
                message: res.data.msg
              })
            } else {
              this.loading = true
              const md5 = crypto.createHash('md5')
              md5.update(this.loginForm.pass)
              this.getRandomCode() // 随机生成四个字符
              const data = {
                orgType: parseInt(this.loginForm.organizationType),
                orgName: this.loginForm.organizationName,
                username: this.loginForm.name,
                nick: this.loginForm.realName,
                pass: this.code[0] + this.code[1] + md5.digest('hex') + this.code[2] + this.code[3],
                phone: this.loginForm.phone,
                gender: parseInt(this.loginForm.gender),
                fax: this.loginForm.fax,
                email: this.loginForm.email,
                attachmentIds: '1',
                addressIds: this.patient.companyAreaId.join(','),
                address: this.patient.companyDetialAddr
              }
              signUp(data).then((res) => {
                if (res.data.code === 200) {
                  this.$message({
                    type: 'success',
                    message: '注册成功待审核'
                  })
                  this.resetForm('loginForm')
                  setTimeout(() => {
                    this.$router.push('/login')
                  }, 5000)
                } else {
                  this.loading = false
                }
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getRandomCode() {
      const selectChar = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
      const codeLength = 4
      for (let i = 0; i < codeLength; i++) {
        this.code += selectChar[Math.floor(Math.random() * 61)]
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    getCode() {
      const data = qs.stringify({ phone: this.loginForm.phone }, { arrayFormat: 'brackets' })
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
    },
    refreshEduRecord(val) {
      organizationName({ signType: val }).then((res) => {
        this.organizationNameList = res.data.list
      })
    },
    getArea() {
      getAreaList().then((res) => {
        this.options = res.data.list
        this.loadingOptions = false
      })
    },
    companyAreaIdChange(val) {
      this.loginForm.companyArea = val
    }
  }
}
</script>
<style lang="scss">
.lg_signUp {
  .logoTop {
    width: 100%;
    height: 400px;
    padding: 0 20px;
    background: url("../../assets/login/signUp.png") no-repeat;
    background-size: cover;
    .logo {
      width: 100%;
      height: 70px;
      border-bottom: 1px solid #53ccd4;
      img {
        display: inline-block;
        width: 135px;
        margin-top: 10px;
      }
    }
  }
  h2 {
    color: #fff;
    text-align: center;
    margin: -240px 0 25px;
    font-size: 18px;
    text-shadow: -1px 1px #666;
    font-family: "黑体";
  }
  .signUpBox {
    width: 660px;
    height: 640px;
    background-color: #fff;
    margin: 0 auto;
    box-shadow: 2px 2px 10px #ccc;
    padding: 30px 115px;
    .signIn {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 20px;
      span {
        font-size: 12px;
        color: #bababa;
        font-family: "黑体";
      }
      a {
        color: #4ebdb2;
        font-family: "黑体";
        font-size: 13px;
      }
    }
    .el-form {
      .el-form-item {
        margin-bottom: 20px;
        &#code {
          .el-form-item__content {
            display: flex;
            justify-content: space-between;
            > .el-button {
              margin-left: 30px;
              margin-top: 2px;
              height: 32px;
              border-radius: 0;
              &:focus {
                color: #606266;
                background-color: #fff;
                border-color: #dcdfe6;
              }
              &:hover {
                color: #606266;
                background-color: #fff;
                border-color: #dcdfe6;
              }
            }
            .getcode {
              width: 120px;
              padding: 0;
            }
          }
        }
        .el-input--medium .el-input__inner {
          height: 32px;
          line-height: 30px;
          border-radius: 0;
          color: #bababa;
          font-size: 12px;
        }
      }
      > .el-button {
        width: 60%;
        margin: 30px auto 0;
        display: block;
        border: 0;
        background-color: #409eff;
        color: #fff;
      }

      p {
        font-size: 12px;
        text-align: center;
        color: #aaa;
        i {
          color: #4ebdb2;
          font-style: normal;
        }
      }
    }
  }
  input::placeholder {
    color: #bababa;
    font-size: 12px;
  }
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px white inset;
    border: 1px solid #ccc !important;
  }
  .el-radio {
    color: #bababa;
  }
  .el-radio__input.is-checked .el-radio__inner {
    border-color: #4ebdb2;
    background: #4ebdb2;
  }
  .el-radio__input.is-checked + .el-radio__label {
    color: #4ebdb2;
  }
  .el-upload-list {
    display: flex;
    justify-content: flex-start;
    .el-upload-list__item {
      width: auto;
      margin-right: 10px;
      padding: 10px 0px 10px 90px;
      .el-upload-list__item-name {
        display: none;
      }
      .el-upload-list__item-status-label {
        z-index: 9;
      }
      .el-icon-close {
        background-color: #fff;
        z-index: 9;
      }
    }
  }
}
</style>