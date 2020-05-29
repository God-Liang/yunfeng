<template lang="pug">
  .dashboard-container
    .content
      .welcome
        .left
        .right
        h1 欢迎来到
        p 依米云医后台管理系统
      .logo

</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'

export default {
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters(['roles'])
  },
  created() {
    if (!this.roles.includes('admin')) {
      this.currentRole = 'editorDashboard'
    }
  }
}
</script>
<style lang="scss" scoped>
.dashboard-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  color: #333333;
  .content {
    width: 880px;
    height: 420px;
    border-radius: 20px;
    box-shadow: 0px 5px 50px 0px rgba(186, 186, 186, 0.5);
    position: relative;
    .welcome {
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 1);
      position: relative;
      overflow: hidden;
      border-radius: 20px;
      display: flex;
      justify-content: center;
      align-content: center;
      flex-wrap: wrap;
      .left {
        position: absolute;
        left: -280px;
        top: -270px;
        width: 500px;
        height: 500px;
        background: rgba(92, 204, 205, 0.5);
        border-radius: 50%;
      }
      .right {
        position: absolute;
        right: -320px;
        bottom: -310px;
        width: 500px;
        height: 500px;
        background: #03a9ac;
        border-radius: 50%;
      }
      h1 {
        text-align: center;
        color: #03a9ac;
        font-size: 60px;
        width: 100%;
      }
      p {
        width: 100%;
        text-align: center;
        color: #03a9ac;
        font-size: 46px;
        font-weight: bold;
        background: linear-gradient(
          270deg,
          rgba(92, 204, 205, 1) 0%,
          rgba(3, 169, 172, 1) 100%
        );
        background-clip: text;
        -webkit-text-fill-color: transparent;
        margin: 0;
      }
    }
    .logo {
      position: absolute;
      left: calc(50% - 75px);
      top: -75px;
      width: 150px;
      height: 150px;
      background: url(~@/assets/img/logo_w.png) no-repeat center;
    }
  }
}
</style>
