<template>
  <section ref='appMain' class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key"></router-view>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  mounted() {
    if (this.$route.path === '/case/case') {
      this.setCaseAppMainHeight()
    } else {
      this.setAppMainHeight()
    }
  },
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.fullPath
    }
  },
  watch: {
    $route() {
      if (this.$route.path === '/case/case') {
        this.setCaseAppMainHeight()
      } else {
        this.setAppMainHeight()
      }
    }
  },
  methods: {
    setAppMainHeight() {
      const bodyHeight = document.body.offsetHeight
      const appMainHeight = bodyHeight - 90
      this.$refs.appMain.style.height = appMainHeight + 'px'
    },
    setCaseAppMainHeight() {
      const bodyHeight = document.body.offsetHeight
      const appMainHeight = bodyHeight
      this.$refs.appMain.style.height = appMainHeight + 'px'
    }
  }
}
</script>
<style>
  .app-main{
    /* min-height: 100%; */
    overflow: hidden;
  }
</style>

