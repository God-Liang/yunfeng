<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
    <lgFooter></lgFooter>
  </div>
</template>
<script>
import lgFooter from '@/components/lgFooter.vue'
export default {
  name: 'App',
  components: {
    lgFooter
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  provide () {
    return {
      reload: this.reload
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
}
</script>
<style lang="scss">
#app {
  height: calc(100% + 2px);
  overflow: auto;
  -webkit-overflow-scrolling: touch; /*使得div内的超出滑动具有惯性，阻尼回弹等特性,否则滑动很生涩*/
}
</style>
