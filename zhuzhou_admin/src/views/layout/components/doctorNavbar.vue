<template>
  <!-- <el-menu class="navbar" mode="horizontal"> -->
  <div class="navbar" ref="navbar">
    <div class="left-menu">
      <hamburger
        class="hamburger-container"
        :toggleClick="toggleSideBar"
        :isActive="sidebar.opened"
      ></hamburger>
      <span>{{hospital}}</span>
      <i class="el-icon-arrow-down" v-if="siteTage" id="nameHidePanel" @click="siteClick"></i>
      <div class="siteBox" id="siteBox" v-if="siteTage">
        <i class="defaultY"></i>
        <div class="titleImg">
          <span>{{firstWord}}</span>
        </div>
        <div class="defaultStatus">默认</div>
        <span class="defaultText">{{hospital}}</span>
      </div>
    </div>
    <div class="right-menu">
      <el-badge class="messageYM">
        <img src="@/assets/images/workstation.jpg" @click="jumpToDoctorWor" alt="">
        <!-- <i class="el-icon-bell" @click="jumpToDoctorWor"></i> -->
      </el-badge>
      <el-badge :value="amount" class="messageYM">
        <img src="@/assets/images/notice.jpg" @click="accountMessage" alt="">
        <!-- <i class="el-icon-bell" @click="accountMessage"></i> -->
        <div class="accountBox" v-if="accountTage">
          <div class="accountTop">
            <h5>账户信息</h5>
            <i class="el-icon-close" @click="accountClose"></i>
          </div>
          <div class="accountCon">
            <div class="statusAll">
              <strong>全部标记已读</strong>
              <el-switch
                v-model="allStatus"
                active-value="1"
                inactive-value="0"
                active-color="#009933"
                inactive-color="#ddd"
                @change="getDispose($event)"
              ></el-switch>
            </div>
            <div class="statusMessage">
              <div class="messageItem" v-for="item in messageList" :key="item.id">
                <div class="message">
                  <i>{{item.msgSourceShow}}</i>
                  <span>{{item.content}}</span>
                </div>
                <div class="timeStatus">
                  <span>{{item.sendTime}}</span>
                  <span class="status">未读</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-badge>
      <div class="userBox" @click="adminClick">
        <img
          :src="avatar"
          v-if="avatar"
          alt
          style="width:30px;height:30px;vertical-align: middle;border-radius:50%;overflow:hidden;"
        >
        <svg-icon
          class-name="international-icon"
          v-else
          class="avatar right_menu_item"
          icon-class="avatar"
        />
        {{nick}}
        <i class="el-icon-arrow-down" id="adminHidePanel"></i>
      </div>
      <div class="adminBox" id="adminBox" v-if="adminTage">
        <span @click="personCenter" title="个人中心" class="logout right_menu_item">
          <svg-icon class-name="international-icon" icon-class="institution"/>个人中心
        </span>
        <span @click="organizationMessage" title="机构信息" class="logout right_menu_item">
          <svg-icon class-name="international-icon" icon-class="institution"/>机构信息
        </span>
        <span @click="logout" title="退出登录" class="logout right_menu_item">
          <svg-icon class-name="international-icon" icon-class="logout"/>退出系统
        </span>
      </div>
    </div>
    <el-dialog title="提示" width="40%" :visible.sync="dialogLeftTop1_2">
      <el-row>
        <el-col :span="12">心脏病史</el-col>
        <el-col :span="12">
          <el-checkbox true-label="1" false-label="0"></el-checkbox>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">高血压病史</el-col>
        <el-col :span="12">
          <el-checkbox true-label="1" false-label="0"></el-checkbox>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">长期服药史</el-col>
        <el-col :span="12">
          <el-checkbox true-label="1" false-label="0"></el-checkbox>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">大小便情况</el-col>
        <el-col :span="12">
          <el-checkbox true-label="1" false-label="0"></el-checkbox>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">月经情况</el-col>
        <el-col :span="12">
          <el-checkbox true-label="1" false-label="0"></el-checkbox>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-button type="primary" @click="confirmRead">已阅读</el-button>
        </el-col>
      </el-row>
    </el-dialog>
    <!-- </el-menu> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import LangSelect from '@/components/LangSelect'
import ThemePicker from '@/components/ThemePicker'
import { unreadList, dispose } from '@/api/informationManage/informationList'
import { myDetails } from '@/api/hospitalInfo'
import qs from 'qs'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    LangSelect,
    ThemePicker
  },
  props: {
    outermost1: {
      type: String,
      default: ''
    },
    outermost2: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'name', 'avatar', 'hospital', 'nick'])
  },
  data() {
    return {
      siteTage: false,
      adminTage: false,
      accountTage: false,
      dialogLeftTop1_2: false,
      allStatus: '',
      messageList: [],
      amount: 0,
      firstWord: ''
    }
  },
  mounted() {
    this.handleFilter()
    myDetails().then(res => {
      if (res.data.data !== null) {
        this.$store.commit('SET_HOSPITAL', res.data.data.hospitalName)
        this.firstWord = this.hospital.substr(0, 1)
      } else {
        this.$store.commit('SET_HOSPITAL', '默认')
        this.firstWord = this.hospital.substr(0, 1)
      }
    })
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // In order to re-instantiate the vue-router object to avoid bugs
      })
    },
    siteClick() {
      this.siteTage = false
    },
    adminClick() {
      this.adminTage = !this.adminTage
    },
    organizationMessage() {
      this.$router.push(`/transferServer/serverContract`)
    },
    personCenter() {
      this.$router.push(`/personCenter/personDetail`)
    },
    accountClose() {
      this.accountTage = false
    },
    accountMessage() {
      this.accountTage = true
    },
    getDispose(event) {
      if (this.allStatus) {
        this.allStatus = '1'
        this.$message({
          type: 'warning',
          message: '暂无未读信息'
        })
      } else {
        const ids = []
        this.messageList.forEach((val) => {
          ids.push(val.id)
        })
        dispose(qs.stringify({ ids: ids }, { arrayFormat: 'brackets' })).then(res => {
          this.$message({
            type: 'success',
            message: '全部标记已读'
          })
          this.handleFilter()
        })
      }
    },
    handleFilter() {
      unreadList().then((res) => {
        this.messageList = res.data.list
        this.amount = this.messageList.length
        if (this.amount > 0) {
          this.allStatus = '0'
        } else {
          this.allStatus = '1'
        }
      })
    },
    jumpToDoctorWor() {
      this.dialogLeftTop1_2 = true
    },
    confirmRead() {
      this.dialogLeftTop1_2 = false
      window.open('https://www.baidu.com/')
    }
  },
  watch: {
    outermost1: function(val, oldVal) {
      if (val === '0') {
        this.adminTage = false
      }
    },
    outermost2: function(val, oldVal) {
      if (val === '0') {
        this.siteTage = false
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 65px;
  line-height: 65px;
  border-radius: 0px !important;
  background-color: rgba(255, 255, 255, 1);
  display: flex;
  justify-content: space-between;
  .el-row {
    text-align: center;
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .left-menu {
    .hamburger-container {
      line-height: 74px;
      height: 65px;
      float: left;
      padding: 0 10px;
    }
    .breadcrumb-container {
      float: left;
    }
    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }
    > span {
      font-size: 16px;
      color: #a4a4a4;
    }
    > i {
      font-size: 14px;
      color: #fff;
    }
    .siteBox {
      height: 47px;
      position: absolute;
      top: 68px;
      left: 0;
      z-index: 999;
      width: 270px;
      background-color: #fff;
      display: flex;
      justify-content: space-around;
      align-items: center;
      box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.35);
      .defaultY {
        width: 10px;
        height: 10px;
        background-color: rgba(28, 192, 159, 1);
        border-radius: 50%;
        cursor: pointer;
      }
      .titleImg {
        width: 34px;
        height: 34px;
        border-radius: 50%;
        background-color: rgb(16, 141, 233);
        line-height: 34px;
        text-align: center;
        span {
          font-size: 16px;
          color: #fff;
        }
      }
      .defaultStatus {
        width: 42px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        font-size: 13px;
        color: #fff;
        background-color: rgba(255, 89, 24, 1);
        border-radius: 3px;
      }
      .defaultText {
        color: #333333;
        font-size: 14px;
        line-height: 47px;
      }
    }
  }
  .right-menu {
    height: 100%;
    padding-right: 10px;
    font-size: 14px;
    color: #a4a4a4;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    &:focus {
      outline: none;
    }
    .adminBox {
      position: absolute;
      right: 3px;
      top: 65px;
      width: 140px;
      z-index: 9999;
      padding: 10px;
      background-color: #fff;
      box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.35);
      display: flex;
      flex-wrap: wrap;
      span {
        width: 100%;
        color: #a4a4a4;
        font-size: 14px;
        display: inline-block;
        height: 45px;
        line-height: 45px;
        svg {
          font-size: 20px;
          vertical-align: middle;
          margin-right: 10px;
          color: #a4a4a4;
        }
      }
    }
    .userBox {
      cursor: pointer;
    }
    .right_menu_item {
      display: inline-block;
      width: 20px;
      height: 20px;
    }
    .avatar {
      width: 30px;
      height: 30px;
      margin: 0;
      vertical-align: middle;
    }
    .logout {
      height: 50px;
      cursor: pointer;
    }
    .screenfull {
      height: 20px;
    }
    .international {
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
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
<style rel="stylesheet/scss" lang="scss">
.el-dialog__header {
  line-height: normal;
}
.messageYM {
  margin-right: 30px;
  position: relative;
  sup {
    height: 14px;
    line-height: 14px;
    padding: 0 4px !important;
    border: none !important;
    background-color: rgb(255, 0, 0);
    top: 13px !important;
  }
  > i {
    font-size: 26px;
    color: #a4a4a4;
    cursor: pointer;
  }
  > img {
    height: 20px;
    display: inline-block;
    cursor: pointer;
    vertical-align: middle;
  }
  .accountBox {
    position: absolute;
    right: 0;
    top: 48px;
    width: 310px;
    background-color: #fff;
    z-index: 999;
    border: 1px solid #eee;
    .accountTop {
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      padding: 0 15px 0 25px;
      border-bottom: 1px solid #eee;
      h5 {
        margin: 0;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.65);
        font-weight: normal;
      }
      i {
        font-size: 18px;
        line-height: 50px;
        color: #a4a4a4;
        cursor: pointer;
      }
    }
    .accountCon {
      padding-top: 10px;
      .statusAll {
        display: flex;
        justify-content: space-between;
        height: 30px;
        line-height: 30px;
        padding: 0 15px;
        strong {
          color: #009933;
        }
        .el-switch {
          margin-top: 5px;
        }
      }
      .statusMessage {
        padding: 5px 15px 30px;
        .messageItem {
          margin-top: 30px;
          box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
          .message {
            display: flex;
            justify-content: space-between;
            padding: 5px 15px;
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
              margin-right: 15px;
              margin-top: 6px;
            }
            span {
              color: #a4a4a4;
              font-size: 12px;
              line-height: 18px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
            }
          }
          .timeStatus {
            display: flex;
            justify-content: space-between;
            padding: 5px 15px;
            span {
              color: #333;
              font-size: 12px;
              line-height: 18px;
              &.status {
                color: #009933;
                font-weight: bold;
              }
            }
          }
        }
      }
    }
  }
}

.el-icon-arrow-down {
  cursor: pointer;
}

// 一级菜单样式
.el-submenu__title {
  border-left: 6px solid rgba(28, 192, 159, 1);
  color: #fff !important;
}

// 二级菜单样式
#app .sidebar-container .el-submenu .el-menu-item {
  background-color: rgba(28, 192, 159, 1) !important;
  color: #fff !important;
  padding-left: 60px !important;
}

// 菜单悬浮样式
#app .sidebar-container .nest-menu .el-submenu > .el-submenu__title:hover,
#app .sidebar-container .el-submenu .el-menu-item:hover {
  background-color: rgba(255, 255, 255, 0.4) !important;
  color: #fff !important;
}

// 菜单选中样式
#app .sidebar-container .nest-menu .el-submenu > .el-submenu__title.is-active,
#app .sidebar-container .el-submenu .el-menu-item.is-active,
#app .sidebar-container a .el-menu-item.is-active {
  background-color: rgba(255, 255, 255, 0.4) !important;
  border-left: 6px solid #eab83c;
  color: #fff !important;
}

// 一级菜单悬浮样式
.el-submenu__title:hover {
  background-color: rgba(255, 255, 255, 0.4) !important;
  border-color: rgba(255, 255, 255, 0.05);
  color: #fff !important;
  box-sizing: border-box;
}

#app .sidebar-container a .el-menu-item:hover {
  background-color: rgba(255, 255, 255, 0.4) !important;
  border-left: 6px solid #eab83c;
  color: #fff !important;
  box-sizing: border-box;
}

// 菜单默认样式
#app .sidebar-container a .el-menu-item {
  color: #fff !important;
  border-left: 6px solid rgba(28, 192, 159, 1);
}

.el-menu--vertical .el-menu .el-menu-item:hover,
.el-menu--vertical .el-menu .el-menu-item.is-active {
  background-color: rgba(255, 255, 255, 0.4) !important;
  color: #fff !important;
}
.el-dialog__body {
  border-top: 1px solid #ddd;
}
</style>
