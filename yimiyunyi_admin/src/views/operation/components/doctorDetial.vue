<template lang="pug">
  .planDetial(v-loading="loading" element-loading-text="加载中...")
    .top
      img.img(v-if="info.avatar" :src="info.avatar")
      img.img(v-if="!info.avatar && info.sex === 0" src="@/assets/img/doctor.png")
      img.img(v-if="!info.avatar && info.sex === 1" src="@/assets/img/nurse.png")
      .text
        .t1
          span {{info.nick}}
          .t2 {{info.yimiNumber}}
          .lg-tag(v-if="info.famousDoctor === 1") 名医
        ul.t3
          li
            div.label 所在医院
            div.value ：{{info.doctorHospital}}
          li
            div.label 所在科室
            div.value ：{{info.department}}
          li
            div.label 联系电话
            div.value ：{{info.phone}}
        ul.t3
          li
            div.label 职称
            div.value ：{{info.professionCallShow}}
          li
            div.label 年龄
            div.value ：{{info.age}}岁
          li
            div.label 注册时间
            div.value ：{{info.createTime}}
    .tabs
      el-tabs(v-model="activeName" type="border-card" style="height:100%" @tab-click="handleClick")
        el-tab-pane(label="详情" name="1")
          doctorlnfo.p20(:info="info" :certificates="certificates" :active="activeName")
        el-tab-pane(label="认证信息" name="2")
          certificationInfo.p20(:info="info" :active="activeName")
        el-tab-pane(label="团队信息" name="3")
          doctorTeam.p20(:active="activeName")
        //- el-tab-pane(label="健康圈子" name="4")
        //-   healthCircles.p20(:active="activeName")
        el-tab-pane(label="登录日志" name="5")
          doctorLog.p20(:active="activeName")
</template>
<script>
import doctorTeam from './doctorTeam.vue'
import doctorlnfo from './doctorlnfo.vue'
import certificationInfo from './certificationInfo.vue'
import healthCircles from './healthCircles.vue'
import doctorLog from './doctorLog.vue'
import { info } from '@/api/doctor'
export default {
  name: 'ComponentName',
  components: { certificationInfo, doctorTeam, healthCircles, doctorlnfo, doctorLog },
  data() {
    return {
      activeName: '1',
      apiUri: 'adminDoctor',
      info: {},
      certificates: [],
      loading: true
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    handleClick() {},
    getInfo() {
      const id = this.$route.params.id
      info(id).then((res) => {
        this.info = res.info.doctor
        this.info.avatar = res.info.user.avatar
        this.info.nick = res.info.user.nick
        this.info.phone = res.info.user.phone
        this.info.sex = res.info.user.sex
        this.info.age = res.info.age
        this.info.createTime = res.info.user.createTime
        this.certificates = this.info.jobUrl ? this.info.jobUrl.split(',') : []
        this.loading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/mixin.scss';
.planDetial {
  width: 100%;
  height: 100%;
  background-color: #f0f2f5;
  .top {
    width: 100%;
    height: 130px;
    background: #fff;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 20px;
    .img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.35);
      margin: 0 30px;
      object-fit: cover;
    }
    .text {
      line-height: 30px;
      width: 870px;
      overflow: auto;
      .t1 {
        font-size: 20px;
        color: #000;
        font-weight: bold;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .lg-tag {
          width: 66px;
          height: 24px;
          line-height: 24px;
          background: url('../../../assets/img/tag.png');
          background-size: cover;
          color: #FFFFFF;
          font-size: 16px;
          text-align: center;
          padding-left: 5px;
        }
      }
      .t2 {
        font-size: 16px;
        margin: 0 10px;
        color: #888;
        font-weight: normal;
      }
      .t3 {
        font-size: 16px;
        color: #888;
        display: flex;
        justify-content: flex-start;
        li {
          display: flex;
          justify-content: flex-start;
          height: 24px;
          line-height: 24px;
          margin: 0 20px 0 0;
          .label {
            display: inline-block;
            vertical-align: top;
            width: 70px;
            text-align: justify;
            &::after {
              display: inline-block;
              width: 100%;
              content: '';
              height: 0;
            }
          }
          .value {
            min-width: 200px;
            @include ellipsis(1);
          }
        }
      }
    }
  }
  .tabs {
    height: calc(100% - 130px);
    padding: 20px;
    /deep/ .el-tabs__content {
      height: calc(100% - 40px);
      overflow: auto;
      padding: 0;
      .el-tab-pane {
        height: 100%;
      }
    }
  }
}
.p20 {
  padding: 20px;
}
</style>
