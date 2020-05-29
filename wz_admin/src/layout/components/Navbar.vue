<template>
  <div class="navbar">
    <div class="logo">
      <router-link to="/">
        <img src="@/assets/logo.png">
        <span class="logoTitle">云蜂医链供应商管理平台</span>
      </router-link>
    </div>
    <div class="right-menu">
      <div class="userInfo">
        <div class="avatar">
          <img v-if="avatar" :src="avatar" alt>
          <span v-else>{{ userInfo.nickname == null ? " " : userInfo.nickname[0] }}</span>
        </div>
        <div class="nameBox">
          <p class="name">{{ userInfo.nickname == null ? "未填写" : userInfo.nickname }}</p>
          <p class="type">{{ userInfo.org_name }}</p>
        </div>
      </div>
      <el-badge
        id="messageYM"
        :value="amount"
        :max="99"
        :hidden="hidden"
        class="messageYM"
      >
        <img
          id="messageImg"
          src="@/assets/hint.png"
          alt
          @click="accountMessage"
        >
      </el-badge>
      <div id="messageBox" class="messageBox">
        <transition name="el-zoom-in-top">
          <el-card v-show="show3" class="box-card">
            <div slot="header" class="clearfix">
              <span>留言</span>
              <el-button class="already" type="text" @click="allClick">
                标记全部已读</el-button>
            </div>
            <div class="statusMessage">
              <div
                v-for="item in messageList"
                :key="item.id"
                class="messageItem"
                @click="onReply(item.id)"
              >
                <div class="message">
                  <i>{{ item.object_type_name }}</i>
                  <span>{{ item.msg_content }}</span>
                </div>
                <div class="timeStatus">
                  <span>{{ item.create_date }}</span>
                  <span class="status">未读</span>
                </div>
              </div>
              <div v-if="messageList.length === 0" class="nullMes">
                暂无未读信息
              </div>
            </div>
          </el-card>
        </transition>
      </div>
      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="settingBox">
          <img src="@/assets/setting.png" alt>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <span style="display:block;" @click="onPersonalInfo">个人信息</span>
          </el-dropdown-item>
          <el-dropdown-item>
            <span style="display:block;" @click="onLgNull">机构信息</span>
          </el-dropdown-item>
          <el-dropdown-item>
            <span style="display:block;" @click="onSetting">修改密码</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="logoutBox" @click="logout">
        <img src="@/assets/logout.png" alt>
      </div>
      <!-- <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/profile/index">
            <el-dropdown-item>Profile</el-dropdown-item>
          </router-link>
          <router-link to="/">
            <el-dropdown-item>Dashboard</el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://github.com/PanJiaChen/vue-element-admin/">
            <el-dropdown-item>Github</el-dropdown-item>
          </a>
          <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
            <el-dropdown-item>Docs</el-dropdown-item>
          </a>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">Log Out</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>-->
    </div>
    <el-dialog
      id="passDialog"
      title="修改密码"
      :visible.sync="dialogFormVisible"
      width="650px"
    >
      <img src="@/assets/pass.png" alt>
      <div class="right" style="padding-top:20px;">
        <p class="title">修改密码</p>
        <el-form
          ref="passForm"
          :model="passForm"
          :rules="passRules"
          label-width="0px"
        >
          <el-form-item label prop="old_pwd">
            <el-input
              v-model="passForm.old_pwd"
              size="default"
              placeholder="请输入原密码"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label prop="new_pwd">
            <el-input
              v-model="passForm.new_pwd"
              size="default"
              placeholder="请输入新密码"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label prop="confirm_pwd">
            <el-input
              v-model="passForm.confirm_pwd"
              size="default"
              placeholder="确认新密码"
              autocomplete="off"
            />
          </el-form-item>
          <el-button
            type="primary"
            size="default"
            @click="submitPass('passForm')"
          >确 定</el-button>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { amendPass } from '@/api/login'
import { list, msgReadAll } from '@/api/common'
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('确认新密码'))
      } else {
        if (value !== this.passForm.new_pwd) {
          callback(new Error('两次密码不一致'))
        } else {
          callback()
        }
      }
    }
    return {
      amount: 0,
      show3: false,
      hidden: true,
      messageList: [],
      passForm: {
        old_pwd: '',
        new_pwd: '',
        confirm_pwd: ''
      },
      passRules: {
        old_pwd: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
        new_pwd: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
        confirm_pwd: [{ validator: validatePass, trigger: 'blur' }]
      },
      dialogFormVisible: false,
      userInfo: {}
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar', 'device'])
  },
  created() {
    this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
  },
  mounted() {
    this.$nextTick(() => {
      document.addEventListener('click', e => {
        const messageBox = document.getElementById('messageBox')
        const messageYM = document.getElementById('messageYM')
        const messageImg = document.getElementById('messageImg')
        if (messageBox && messageYM && messageImg) {
          if (
            messageBox.contains(e.target) ||
            messageYM.contains(e.target) ||
            messageImg.contains(e.target)
          ) {
            if (this.show3) {
              this.show3 = true
            } else {
              this.show3 = false
            }
          } else {
            this.show3 = false
          }
        }
      })
    })
    this.getList()
  },
  methods: {
    onSetting() {
      this.passForm = {
        old_pwd: '',
        new_pwd: '',
        confirm_pwd: ''
      }
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['passForm'].clearValidate()
      })
    },
    onLgNull() {
      // this.$message({
      //   message: '暂未开放',
      //   type: 'warning'
      // })
      this.$router.push(`/details/organInfo/${this.userInfo.org_id}`)
    },
    onPersonalInfo() {
      this.$router.push('/details/personalInfo')
    },
    submitPass(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const data = Object.assign({}, this.passForm)
          // delete data.confirm_pwd
          amendPass(data).then(res => {
            this.$alert('密码修改成功，请重新登录！', '', {
              confirmButtonText: '确定',
              showClose: false,
              callback: action => {
                this.logout()
              }
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    accountMessage() {
      this.show3 = !this.show3
    },
    getList() {
      const data = {
        current: 1,
        pageSize: 10,
        'input.isread': 0
      }
      list('msg', data).then(res => {
        this.messageList = res.data.list
        this.amount = res.data.total_count
        if (this.messageList.length > 0) {
          this.hidden = false
        } else {
          this.hidden = true
        }
      })
    },
    // 标记全部已读信息
    allClick() {
      if (this.messageList.length > 0) {
        msgReadAll().then(res => {
          this.getList()
          this.$notify({
            title: '成功',
            message: '全部已标记为已读',
            type: 'success',
            duration: 2000
          })
        })
      }
    },
    onReply(id) {}
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 80px;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  width: 100%;
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    from(#03a9ac),
    to(#5ccccd)
  );
  background: linear-gradient(90deg, #03a9ac 0, #5ccccd);
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .logo {
    a {
      display: block;
      .logoTitle {
        color: #fff;
        font-size: 24px;
        display: inline-block;
      }
      img {
        width: 33px;
        height: 37px;
        vertical-align: middle;
        margin-bottom: 5px;
        margin-right: 10px;
      }
    }
  }
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    &:focus {
      outline: none;
    }
    .userInfo {
      display: flex;
      justify-content: flex-start;
      margin-right: 20px;
      .avatar {
        width: 36px;
        height: 36px;
        line-height: 36px;
        border-radius: 50%;
        overflow: hidden;
        span {
          font-size: 18px;
          color: #14b0b2;
          width: 36px;
          height: 36px;
          display: inline-block;
          text-align: center;
          background-color: #eee;
        }
        img {
          width: 36px;
          height: 36px;
          display: inline-block;
        }
      }
      .nameBox {
        height: 36px;
        margin-left: 5px;
        p {
          line-height: 14px;
          color: #fff;
          font-size: 12px;
          margin: 0;
          &.name {
            font-size: 14px;
            line-height: 18px;
            margin-bottom: 3px;
          }
        }
      }
    }
    .messageYM {
      margin-right: 25px;
      height: 26px;
      position: relative;
      img {
        width: 28px;
        height: 26px;
        display: inline-block;
        cursor: pointer;
        vertical-align: top;
      }
    }
    .settingBox {
      height: 24px;
      img {
        width: 24px;
        height: 24px;
        display: inline-block;
        cursor: pointer;
        vertical-align: top;
      }
    }
    .logoutBox {
      margin-right: 20px;
      height: 24px;
      img {
        width: 24px;
        height: 24px;
        display: inline-block;
        cursor: pointer;
        vertical-align: top;
      }
    }
    .right-menu-item {
      display: inline-block;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.messageBox {
  width: 300px;
  position: absolute;
  right: 100px;
  top: 80px;
  z-index: 999;
  .box-card {
    .el-card__header {
      line-height: 1;
      .already {
        float: right;
        padding: 0;
        cursor: pointer;
      }
    }
    .el-card__body {
      max-height: 300px;
      overflow: hidden;
      padding: 15px 0;
    }
  }
  .statusMessage {
    height: 100%;
    padding: 5px 20px;
    overflow: auto;
    .nullMes {
      font-size: 14px;
      color: #999;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .messageItem {
      margin-bottom: 10px;
      box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
      cursor: pointer;
      &:last-child {
        margin-bottom: 0;
      }
      .message {
        display: flex;
        justify-content: space-between;
        padding: 5px 10px;
        i {
          width: 80px;
          height: 25px;
          line-height: 25px;
          text-align: center;
          display: inline-block;
          border-radius: 4px;
          color: #fff;
          font-size: 12px;
          font-style: normal;
          background-color: rgba(16, 141, 233, 0.376470588235294);
          margin-right: 10px;
          margin-top: 6px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        span {
          width: 168px;
          color: #a4a4a4;
          font-size: 12px;
          line-height: 18px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
        }
      }
      .timeStatus {
        display: flex;
        justify-content: space-between;
        padding: 5px 10px;
        span {
          color: #333;
          font-size: 12px;
          line-height: 18px;
          &.status {
            color: #ff4949;
            font-weight: bold;
          }
        }
      }
    }
  }
}
#passDialog {
  .el-dialog__header {
    display: none;
  }
  .el-dialog__body {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    img {
      width: 278px;
      height: 192px;
      display: inline-block;
      margin-top: 50px;
    }
    .right {
      margin-left: 20px;
      width: 300px;
      .title {
        text-align: center;
        font-size: 20px;
        color: #52d1dd;
        margin: 0;
      }
      .el-form {
        margin-top: 20px;
        text-align: center;
      }
    }
  }
}
</style>
