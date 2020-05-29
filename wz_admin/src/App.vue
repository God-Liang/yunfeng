<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    const userInfo = sessionStorage.getItem('userInfo')
    console.log(123123123, userInfo)
  }
}
</script>
<style>
.el-dialog__body {
  padding-top: 0;
}
</style>
