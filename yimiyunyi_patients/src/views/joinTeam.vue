<template>
  <div class="lg-container" v-wechat-title="$route.meta.title">
    <div class="way">
      <p class="tit">方法一：扫描医生团队邀请二维码加入</p>
      <p>1、联系你的主诊医生获得医生邀请患者二维码</p>
      <img class="img_1" src="@/assets/img/img_1.png" alt />
      <p>2、使用微信【扫一扫】扫码医生二维码即可加入医学团队</p>
      <img class="img_2" src="@/assets/img/img_2.png" alt />
    </div>
  </div>
</template>
<script>
export default {
  name: 'component_name',
  data () {
    return {}
  },
  mounted () { },
  methods: {}
}
</script>
<style lang="scss" scoped>
.way {
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  //   align-items: flex-start;
  align-content: flex-start;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  background: #fff;
}
p {
  font-size: 12px;
  color: rgba(51, 51, 51, 1);
  line-height: 35px;
  width: 100%;
  text-align: left;
}
.tit {
  font-size: 15px;
}
.img_1 {
  width: 170px;
  height: 270px;
  margin-bottom: 30px;
}
.img_2 {
  width: 170px;
  height: 145px;
}
</style>
