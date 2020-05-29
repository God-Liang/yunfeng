<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#1cc09f"
      text-color="#fff"
      active-text-color="#fff"
    >
      <div class="logoWrap" :class="{'logoWrapOpen': isCollapse}">
        <div class="logo" :class="{'open': !isCollapse}">
          <img class="logoImg" src="@/assets/login/login_two.png" alt>
        </div>
        <!-- <div class="text" v-if="!isCollapse">依米云管家</div> -->
        <div class="text" v-if="!isCollapse">医院日间手术管理平台</div>
        <!-- <div class="userBox" v-if="!isCollapse">
          <img class="userImg" :src="avatar" v-if="avatar" :alt="nick">
          <div class="svgSize" v-else>
            <svg-icon class-name="international-icon" class="avatar right_menu_item" icon-class="avatar"/>
          </div>
        </div>
        <p v-if="!isCollapse">{{nick}}</p> -->
        <!-- <i class="el-icon-arrow-down" id="adminHidePanel"></i> -->
      </div>
      <sidebar-item :routes="permission_routers"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './doctorSidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar',
      'avatar',
      'nick'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
<style lang="scss" scoped>
.logoWrap {
  position: relative;
  height: 100px;
  background-color: rgba(28, 192, 159, 1);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  align-items: center;
  &.logoWrapOpen{
    height: 80px;
  }
  .logo {
    width: 47px;
    margin-top: 18px;
    text-align: center;
    font-weight: bold;
    .logoImg {
      width: 100%;
    }
  }
  .text {
    line-height: 24px;
    font-size: 14px;
    overflow: hidden;
  }
  .userBox {
    .userImg{
      width:40px;
      height:40px;
      margin-top: 18px;
      vertical-align: middle;
      border-radius:50%;
      overflow:hidden;
    }
    .svgSize{
      font-size: 60px;
    }
  }
  p{
    font-size: 12px;
    font-weight: normal;
  }
}
</style>

