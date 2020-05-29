<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
    <div class="logoWrap" >
      <div class="logo" :class = "{'open': !isCollapse}">
        <img class = 'logoImg'  src="../../../../assets/login/logo1.png" alt="">
      </div>
      <div class= 'text'>日间手术患者服务平台</div>
      <div class= 'text'>依米智慧医院</div>
    </div>
      <sidebar-item :routes="permission_routers"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
<style lang="scss" scoped>
.logoWrap{
  position: relative;
  padding-left: 50px;
  height: 50px;
  background-color: rgb(48, 65, 86);
  color: #fff; 
  font-size: 12px; 
  font-weight: 700;
  .logo{
    position: absolute;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    top: 7px;
    left: 0;
    background-color: #fff;
    text-align: center;
    line-height: 36px;
    .logoImg{
      margin-top: 3px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
    &.open{
      left: 7px;
    }
  }
  .text{
    line-height: 25px;
    width: 130px;
    overflow: hidden;
  }
}
</style>

