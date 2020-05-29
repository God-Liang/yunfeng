<template>
  <div class="navbar">
    <div class="logo">
      <router-link to="/">
        <img class="imgLogo" src="@/assets/logo.png">
        <span class="logoTitle">依米云医</span>
      </router-link>
    </div>
    <div class="right-menu">
      <div class="userInfo">
        <div class="avatar">
          <img v-if="avatar" :src="avatar" alt>
          <span v-else>测</span>
        </div>
        <div class="nameBox">
          <p class="name">{{ name }}</p>
          <p class="type">{{ userInfo.nick }}</p>
        </div>
      </div>
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="settingBox">
          <img src="@/assets/setting.png" alt>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <span style="display:block;" @click="onLgNull">个人信息</span>
          </el-dropdown-item>
          <el-dropdown-item>
            <span style="display:block;" @click="onLgNull">机构信息</span>
          </el-dropdown-item>
          <el-dropdown-item>
            <span style="display:block;" @click="onLgNull">修改密码</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="logoutBox" @click="isLogout">
        <img src="@/assets/logout.png" alt>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device',
      'name',
      'orgName',
      'userInfo'
    ])
  },
  methods: {
    onLgNull() {
      this.$message({
        message: '暂未开放',
        type: 'warning'
      })
    },
    async logout() {
      const res = await this.$store.dispatch('user/logout')
      if (res.code === 200) {
        this.$notify({
          title: '消息',
          message: '退出成功',
          type: 'success'
        })
        setTimeout(() => {
          this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        }, 1000)
      }
    },
    isLogout() {
      this.$confirm('是否确定退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.logout()
      }).catch(() => {
        this.$notify({
          title: '消息',
          message: '已取消退出',
          type: 'info'
        })
      })
    }
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
      .imgLogo {
        width: 33px;
        height: 37px;
        vertical-align: middle;
        margin-bottom: 5px;
        margin-right: 10px;
        display: inline-block;
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
            margin-bottom: 2px;
          }
        }
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
