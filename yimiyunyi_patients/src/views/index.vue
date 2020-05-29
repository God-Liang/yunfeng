<template lang="pug">
  .lg-container(v-wechat-title="$route.meta.title")
    .lg-notice 为了团队更好的提供服务，请务必输入患者本人的真实姓名
    CellGroup
      Field.h50(v-model="data.name" clearable label="姓名" placeholder="请输入患者本人真实姓名")
      Field.h40(v-model="data.sexShow" label="性别" readonly @click="onSexShow" placeholder="请选择性别")
      Field.h40(v-model="data.birthday" label="出生日期" readonly placeholder="请选择出生日期" @click="isShow=true")
      Field.h50(v-model="data.phone" clearable label="手机号" placeholder="请输入您的手机号")
        Button(slot="button" size="small" type="primary" :disabled="isPhone" @click="onSend" color="#03A9AC") {{sendTitle}}
      Field.h50(v-model="data.code" center clearable label="验证码" placeholder="请输入验证码")
    p.lg-hint.mt8 一个身份证号只能注册一个身份，注册后无法变更
    p.lg-hint 请认真考虑您要注册的身份
    Button.lg-save-btn.mt90(type="primary" @click="onSave" color="#03A9AC") 确定
    .lg-agreement 点击“确定”代表已阅读并同意
      span 《依米云医服务协议》
    lg-picker(:isShow="showPicker" :defaultIndex="defaultIndex" :columns="columns" @cancel="onCancel" @confirm="onConfirm")
    lg-datetime-picker(v-model="data.birthday" :isShow="isShow" :max-date="maxDate" @confirm="onBirthdayConfirm" @cancel="isShow=false")
</template>
<script>
import { sendCode, myCreate, readOpenId } from '@/api/info'

import { Field, CellGroup, Button, Toast } from 'vant'
export default {
  components: { Field, CellGroup, Button },
  data () {
    return {
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
      data: {
        openId: '',
        name: '',
        phone: '',
        code: '',
        sex: null,
        sexShow: '',
        birthday: ''
      },
      isPhone: false,
      sendTitle: '发送验证码',
      time: 60,
      showPicker: false,
      isShow: false,
      defaultIndex: 0,
      sexColumns: [{
        text: '男'
      },
      {
        text: '女'
      }],
      columns: []
    }
  },
  mounted () {
    if (this.$route.query.openId) {
      this.data.openId = this.$route.query.openId
      this.readInfo()
    }
  },
  methods: {
    readInfo () {
      readOpenId(this.data.openId).then(res => {
        if (res.code === 200) {
          if (res.info && res.info.phone) {
            this.$router.replace('/perfectInfo?openId=' + this.data.openId)
            // this.$router.push('/homePage?openId=' + this.data.openId)
          }
        } else {
          Toast.fail(res.msg)
        }
      })
    },
    // 发送验证码
    onSend () {
      if (!this.$validate.isPhone(this.data.phone)) {
        Toast('请输入正确的11位手机号')
        return false
      }
      sendCode(this.data.phone).then(res => {
        if (res.code === 200) {
          Toast('发送成功')
          this.onsetTimeout()
        } else {
          Toast.fail(res.msg)
        }
      })
    },
    // 倒计时
    onsetTimeout () {
      if (this.time === 0) {
        this.isPhone = false
        this.sendTitle = '发送验证码'
        this.time = 60
      } else {
        this.isPhone = true
        this.sendTitle = '重新发送(' + this.time + ')'
        this.time--
        setTimeout(() => {
          this.onsetTimeout()
        }, 1000)
      }
    },
    // 表单提交
    onSave () {
      const rules = [
        { name: 'name', type: 'required', errmsg: '请输入姓名' },
        { name: 'sexShow', type: 'required', errmsg: '请选择性别' },
        { name: 'birthday', type: 'required', errmsg: '请输入出生日期' },
        { name: 'phone', required: true, type: 'phone', errmsg: '请输入正确的11位手机号' },
        { name: 'code', required: true, type: 'inviteCode', errmsg: '请正确输入验证码' }
      ]
      const validateResult = this.$validate.validate(this.data, rules)
      if (!validateResult.isOk) {
        Toast(validateResult.errmsg)
        return false
      }
      Toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      myCreate(this.data).then(res => {
        if (res.code === 200) {
          setTimeout(() => {
            Toast.clear()
            this.$router.push('/perfectInfo?openId=' + this.data.openId)
          }, 200)
        } else {
          Toast.fail(res.msg)
        }
      })
    },
    // 性别
    onSexShow () {
      this.parameter = 'sexShow'
      this.columns = this.sexColumns
      this.getDefaultIndex()
      this.showPicker = true
    },
    getDefaultIndex () {
      if (this.data[this.parameter]) {
        this.columns.map((v, i) => {
          if (v.text === this.data[this.parameter]) {
            this.defaultIndex = i
          }
        })
      }
    },
    onCancel () {
      this.showPicker = false
      // 还原默认
      this.columns = []
      this.defaultIndex = 0
    },
    onConfirm (value) {
      this.showPicker = false
      this.data[this.parameter] = value
      // 性别处理
      if (this.parameter === 'sexShow') {
        this.sexColumns.map((v, i) => {
          if (v.text === this.data.sexShow) {
            this.data.sex = i
          }
        })
      }
      // 还原默认
      this.columns = []
      this.defaultIndex = 0
    },
    // 日期保存
    onBirthdayConfirm (val) {
      this.data.birthday = this.parseTime(val, '{y}-{m}-{d}')
      this.isShow = false
    }
  }
}
</script>
<style lang="scss" scoped>
.lg-container {
  .lg-notice {
    background: rgba(252, 229, 231, 1);
    height: 28px;
    line-height: 28px;
    width: 100%;
    padding-left: 20px;
    font-size: 12px;
    color: #ff0016;
    box-sizing: border-box;
  }
  .mt90 {
    margin-top: 94px;
  }
  .lg-hint {
    color: #bcbcbc;
    font-size: 12px;
    text-align: center;
    line-height: 18px;
    &.mt8 {
      margin-top: 8px;
    }
  }
  .lg-agreement {
    font-size: 12px;
    color: #BCBCBC;
    text-align: center;
    span {
      color: #03A9AC;
    }
  }
}
</style>
