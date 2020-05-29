<template>
  <!-- <el-menu class="navbar" mode="horizontal"> -->
  <div class="navbar">
    <hamburger
      class="hamburger-container"
      :toggleClick="toggleSideBar"
      :isActive="sidebar.opened"
    ></hamburger>
    <span>{{hospital}}</span>

    <div class="right-menu">
      <el-dropdown
        trigger="click"
        @command="handleCommand"
      >
        <span class="el-dropdown-link">
          <svg-icon
            class-name='international-icon'
            class='avatar right_menu_item'
            icon-class="avatar"
          /> {{name}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for='system in systems'
            :class="{active: system.id == currentSystemId}"
            :key="system.id"
            :command='system.id'
          >{{system.name}}</el-dropdown-item>
          <el-dropdown-item :command='"logout"'>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  mounted() {},
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'avatar',
      'hospital',
      'systems',
      'currentSystemId'
    ])
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
    handleCommand(id) {
      if (id === 'logout') {
        this.logout()
      } else {
        this.$store.dispatch('ChangeRoles', id).then(() => {
          switch (id) {
            case 1:
              this.$router.push('/')
              break
            case 2:
              this.$router.push('/')
              break
          }
          window.location.reload()
        })
      }
    }
  }
}
</script>
<style>
.el-dropdown-menu__item.active {
  color: #fff;
  background: #b3d8ff;
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
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
  .right-menu {
    float: right;
    height: 100%;
    padding-right: 10px;
    cursor: pointer;
    &:focus {
      outline: none;
    }
    .right_menu_item {
      display: inline-block;
      width: 20px;
      height: 20px;
      margin: 0 8px;
    }
    .avatar {
      width: 20px;
      height: 20px;
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
