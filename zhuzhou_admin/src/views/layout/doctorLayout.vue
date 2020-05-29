<template>
  <div class="app-wrapper" :class="classObj" @click="hidePanel">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
    <doctor-sidebar class="sidebar-container"></doctor-sidebar>
    <div class="main-container">
      <doctor-navbar :outermost1="outermost1" :outermost2="outermost2"></doctor-navbar>
      <doctor-tags-view></doctor-tags-view>
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import { doctorNavbar, doctorSidebar, AppMain, doctorTagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  components: {
    doctorNavbar,
    doctorSidebar,
    AppMain,
    doctorTagsView
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  data() {
    return {
      outermost1: '',
      outermost2: ''
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('closeSideBar', { withoutAnimation: false })
    },
    hidePanel() {
      var sB = document.getElementById('siteBox')
      var aB = document.getElementById('adminBox')
      var nH = document.getElementById('nameHidePanel')
      var aH = document.getElementById('adminHidePanel')
      if (!aB) {
        this.outermost1 = ''
      }
      if (aB && aH) {
        if (!aB.contains(event.target) || !aH.contains(event.target)) {
          this.outermost1 = '0'
        }
      }
      if (!sB) {
        this.outermost2 = ''
      }
      if (sB && nH) {
        if (!sB.contains(event.target) || !nH.contains(event.target)) {
          this.outermost2 = '0'
        }
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
    .main-container{
        height: 100% !important;
        overflow: hidden !important;
    }
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style>
