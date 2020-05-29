<template lang="pug">
  .lg-container(v-wechat-title="$route.meta.title")
    .status-img
      img(src="@/assets/status.png")
    p.mt24 您的信息已填写
    p.mb35 为了您有一个更好的康复治疗，请继续填写病历信息
    Button.lg-save-btn(type="primary" @click="onSave" color="#03A9AC") 填写病例
    router-link.lg-skip.color-main(:to="'/myDoctor?id='+this.id")  跳过
</template>
<script>
import { Button } from 'vant'
export default {
  components: { Button },
  data () {
    return {
      id: null,
      openId: null
    }
  },
  created () {
    if (this.$route.query.id) {
      this.id = this.$route.query.id
    }
  },
  methods: {
    onSave () {
      this.$router.push('/caseHistory?patientId=' + this.id)
    }
  }
}
</script>
<style lang="scss" scoped>
  .lg-container {
    padding-top: 63px;
    box-sizing: border-box;
    .status-img {
      width: 292px;
      height: 148px;
      margin: 0 auto;
      img {
        width: 100%;
        height: 100%;
      }
    }
    p {
      color: #888888;
      font-size: 13px;
      line-height: 18px;
      text-align: center;
      &.mb35 {
        margin-bottom: 35px;
      }
    }
    .lg-skip {
      font-size: 12px;
      padding: 0 20px;
      display: inline-block;
      display: flex;
      justify-content: flex-end;
      text-decoration: underline;
    }
  }
</style>
