<template lang="pug">
  .lg-container(v-wechat-title="$route.meta.title")
    .logo-container
      img(src="@/assets/logo.png")
    p 依米云医公众号，是由专业医疗医生团队面向患者的随访工具。
    p 依米云医，以医生团队来对患者进行随访‘了解患者近况并给予咨询指导意见，通过医生团队对诊治后的病人保持联系或要求病人定期来医院复查，对病人的疾病疗效、发展状况继续进行追踪观察，以便病人能够有一个更好的康复治疗。
    p 依米云医，把专家带回家，让您的康复省心、安心、放心！
    .lg-wx-phone
      a.lg-phone(href="tel:0571-86719136")
        img(src="@/assets/phone.png")
        span 客服电话
      .lg-wx(ref="copyWx" @click="onCopyWx" data-clipboard-text="15900552531")
        img(src="@/assets/wx.png")
        span 客服微信
    Popup(v-model="isShow")
      .lg-qrcode
        img(width="150" src="@/assets/team/qrcode.png")
        span 请扫描二维码，添加客服微信
  </div>
</template>
<script>
import { Notify, Popup } from 'vant'
import Clipboard from 'clipboard' // 复制
export default {
  components: { Popup },
  data () {
    return {
      isShow: false
    }
  },
  methods: {
    onCopyWx () {
      const that = this
      new Clipboard('.lg-wx').on('success', function (e) {
        Notify({ type: 'success', message: '客服微信已复制到粘贴板' })
      })
      new Clipboard('.lg-wx').on('error', function (e) {
        that.isShow = true
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.lg-container {
  background-color: #fff;
  .logo-container {
    text-align: center;
    padding: 42px 0 48px;
    img {
      width: 76px;
      height: 78px;
    }
  }
  p {
    padding: 0 20px;
    color: #333333;
    font-size: 12px;
    margin-bottom: 15px;
    line-height: 18px;
    &::before {
      content: "";
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #03a9ac;
      margin-right: 10px;
    }
  }
  .lg-wx-phone {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 42px;
    display: flex;
    .lg-phone {
      width: 50%;
      border-right: 1px solid #fff;
      box-sizing: border-box;
      background: #03a9ac;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        color: #fff;
        font-size: 13px;
      }
      img {
        width: 16px;
        height: 16px;
        margin-right: 6px;
      }
    }
    .lg-wx {
      width: 50%;
      border-left: 1px solid #fff;
      box-sizing: border-box;
      background: #03a9ac;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        color: #fff;
        font-size: 13px;
      }
      img {
        width: 20px;
        height: 16px;
        margin-right: 6px;
      }
    }
  }
  .lg-qrcode {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 250px;
    width: 250px;
    span {
      font-size: 14px;
      color: #333333;
      margin-top: 20px;
    }
  }
}
</style>
