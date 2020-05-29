<template>
  <div class="lg_wrap">
    <div class="contractContent" v-loading="pageLoading">
      <div class="contractList">
        <span class="frist">登录名：</span>
        <span v-if="compileMes">{{user.name}}</span>
        <el-input v-else v-model="user.name" size="small" style="width:200px"></el-input>
      </div>
      <div class="contractList">
        <span class="frist">姓名：</span>
        <span v-if="compileMes">{{user.nick}}</span>
        <el-input v-else v-model="user.nick" size="small" style="width:200px"></el-input>
      </div>
      <div class="contractList">
        <span class="frist">性别：</span>
        <span v-if="compileMes">{{user.sexShow}}</span>
        <dict-select v-else v-model="user.sexShow" placeholder="请选择性别" style='width: 200px'
                     dict-code="xb">
        </dict-select>
      </div>
      <div class="contractList">
        <span class="frist">电话：</span>
        <span v-if="compileMes">{{user.phone}}</span>
        <el-input v-else v-model="user.phone" size="small" style="width:200px"></el-input>
      </div>
      <div class="contractList">
        <span class="frist">邮箱：</span>
        <span v-if="compileMes">{{user.email}}</span>
        <el-input v-else v-model="user.email" size="small" style="width:200px"></el-input>
      </div>
      <el-button type="danger" size="small" style="margin-top:30px;" @click="dialogVisible=true">修改密码</el-button>
      <el-button type="primary" size="small" v-if="compile===false" @click='compile=true;compileMes=true'>取消</el-button>
      <el-button type="primary" size="small" v-if="compile" @click="compile=false;compileMes=false">编辑</el-button>
      <el-button type="success" size="small" v-else @click='amendMessage'>保存</el-button>
    </div>
    <el-dialog
      class="passBox"
      title="修改密码"
      :visible.sync="dialogVisible"
      width="600px"
      :before-close="handleClose">
      <el-form :model="passForm" :rules="passFormRules" ref="passForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="旧密码：" style="width:90%;" prop="oldPass">
          <el-input v-model="passForm.oldPass"></el-input>
        </el-form-item>
        <el-form-item label="新密码：" style="width:90%;" prop="newPass">
          <el-input v-model="passForm.newPass"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" style="width:90%;" prop="confirmPass">
          <el-input v-model="passForm.confirmPass"></el-input>
        </el-form-item>
        <el-form-item align="right" style="margin: 50px 0 0;">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('passForm')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getPersonCenter } from '@/api/login'
import { changePass, modifyUser } from '@/api/personcenter'
import crypto from 'crypto'
import DictSelect from '@/views/form/dictSelect'
export default {
  components: { DictSelect },
  data() {
    return {
      user: {},
      compile: true,
      compileMes: true,
      dialogVisible: false,
      passForm: {
        oldPass: '',
        newPass: '',
        confirmPass: ''
      },
      passFormRules: {
        oldPass: [{ required: true, message: '旧密码不能为空', trigger: 'blur' }],
        newPass: [{ required: true, message: '新密码不能为空', trigger: 'blur' },
          { min: 6, message: '最少六个字符', trigger: 'blur' }],
        confirmPass: [{ required: true, message: '确认密码不能为空', trigger: 'blur' },
          { min: 6, message: '最少六个字符', trigger: 'blur' }]
      },
      code: '',
      pageLoading: true
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      getPersonCenter().then(res => {
        this.user = res.data.user
        this.pageLoading = false
      })
    },
    amendMessage() {
      this.pageLoading = true
      if (this.user.sexShow === '男') {
        this.user.sexShow = 1
      }
      if (this.user.sexShow === '女') {
        this.user.sexShow = 2
      }
      const amendUser = {
        name: this.user.name,
        nick: this.user.nick,
        sex: this.user.sexShow,
        phone: this.user.phone,
        email: this.user.email,
        id: this.user.id
      }
      modifyUser(amendUser).then(res => {
        this.compileMes = true
        this.compile = true
        this.init()
      })
    },
    handleClose(done) {
      done()
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const md5 = crypto.createHash('md5')
          const md52 = crypto.createHash('md5')
          md5.update(this.passForm.oldPass)
          if (md5.digest('hex') === this.user.pass) {
            if (this.passForm.newPass === this.passForm.confirmPass) {
              md52.update(this.passForm.newPass)
              this.getCode()
              const data = {
                id: this.user.id,
                newPass: this.code[0] + this.code[1] + md52.digest('hex') + this.code[2] + this.code[3]
              }
              changePass(data).then(res => {
                if (res.data.code === 200) {
                  this.$confirm('密码修改成功，是否确认重新登陆?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {
                    this.$store.dispatch('LogOut').then(() => {
                      location.reload() // In order to re-instantiate the vue-router object to avoid bugs
                    })
                  }).catch(() => {
                    this.$message({
                      type: 'info',
                      message: '已取消删除'
                    })
                    location.reload()
                  })
                }
              })
            } else {
              this.$message({
                showClose: true,
                message: '两次密码不一样',
                type: 'error'
              })
            }
          } else {
            this.$message({
              showClose: true,
              message: '旧密码错误',
              type: 'error'
            })
          }
        } else {
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
<style lang="scss" scoped>
.contractContent {
  width: 100%;
  height: 100%;
  background-color: #fff;
  overflow: auto;
  padding: 35px;
  .contractList {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 15px;
    .svgSize {
      font-size: 30px;
    }
    .contractImg {
      width: 40px;
      height: 40px;
      display: inline-block;
    }
    .upload-demo {
      margin-left: 10px;
      span {
        font-size: 12px;
        color: #1890ff;
      }
    }
    span {
      font-size: 14px;
      color: #333333;
      height: 32px;
      line-height: 32px;
      &.frist {
        margin-right: 20px;
        width: 80px;
        display: inline-block;
        text-align: left;
      }
    }
  }
  h5 {
    margin: 0;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: #333;
    border-bottom: 1px solid #eee;
  }
  .qualification {
    margin-top: 20px;
    display: flex;
    justify-content: flex-start;
    .qualificationitem {
      width: 260px;
      height: 260px;
      text-align: center;
      display: flex;
      flex-direction: column;
      img {
        width: 100%;
        height: 100%;
        display: inline-block;
        background-color: red;
      }
    }
  }
}
.passBox{
  .passList{
    display: flex;
    justify-content: flex-start;
    line-height: 30px;
    margin-bottom: 20px;
    padding-left: 30px;
    &:last-child{
      margin-bottom: 0;
    }
    .frist {
      width: 80px;
      display: inline-block;
      text-align: left;
    }
  }
}
</style>
