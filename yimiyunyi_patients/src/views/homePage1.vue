<template lang="pug">
  .lg-container(v-wechat-title="$route.meta.title")
    .my-container
      .my-container-bg(@click="onNavHome")
        .my-info
          .my-info-avatar
            img(v-if="!myInfo.avatar&&!myInfo.sex" src="@/assets/team/man.jpg")
            img(v-else-if="!myInfo.avatar&&myInfo.sex" src="@/assets/team/woman.jpg")
            img(v-else :src="myInfo.avatar")
          .my-info-box
            .my-info-box-name {{myInfo.name}}
            .my-info-box-more
              router-link(:to="'/perfectInfo?openId='+myInfo.openId+'&title=补充个人资料'") {{title}}
          Icon.doctor-more(color="#FFFFFF" size="16" name="arrow")
    .related-container
      .related-box
        .related-box-item(@click="onExpect")
          img.related-box-item-img(src="@/assets/mine/order.png")
          p.related-box-item-text 我的订单（0）
        .related-box-item(@click="onExpect")
          img.related-box-item-img(src="@/assets/mine/coupons.png")
          p.related-box-item-text 我的优惠卷（0）
        .related-box-item(@click="onExpect")
          img.related-box-item-img(src="@/assets/mine/account.png")
          p.related-box-item-text 我的账户（0.00）
      .data-container
        .data-container-box
          router-link.data-container-box-left(:to="'/healthRecords?id='+myInfo.id")
            .healthRecords-box
              h5 健康档案
              p.title 病例就诊记录
          .data-container-box-right
            router-link.myDoctor-box(:to="'/team?openId='+myInfo.openId")
              h5 我的医生
              p.title 医生团队随时沟通
            router-link.followup-box(:to="'/followupRecord?openId='+myInfo.openId")
              h5 随访记录
              p.title 医生随访情况
      .operation-guide(@click="onExpect")
        .operation-guide-box
          h5 操作指南
          span.title 快速上手指导
          img(src="@/assets/mine/operation.png")
      .other-box
        .other-box-item.collections(@click="onExpect")
          img.other-box-item-img(src="@/assets/mine/collections.png")
          p.other-box-item-text 收藏夹
        .other-box-item.payRecords(@click="onExpect")
          img.other-box-item-img(src="@/assets/mine/payRecords.png")
          p.other-box-item-text 付费记录
        .other-box-item.opinions(@click="onExpect")
          img.other-box-item-img(src="@/assets/mine/opinions.png")
          p.other-box-item-text 意见与反馈
</template>
<script>
import { Icon, Toast } from 'vant'
import { readOpenId } from '@/api/info'
export default {
  components: { Icon },
  data () {
    return {
      myInfo: {
        openId: '',
        avatar: ''
      },
      title: '个人资料'
    }
  },
  mounted () {
    if (this.$route.query.openId) {
      this.myInfo.openId = this.$route.query.openId
      this.readInfo()
    }
  },
  methods: {
    onNavHome () {
      this.$router.push('/perfectInfo?openId=' + this.myInfo.openId + '&title=' + this.title)
    },
    readInfo () {
      Toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      readOpenId(this.myInfo.openId).then(res => {
        Toast.clear()
        if (res.code === 200) {
          if (res.info) {
            this.myInfo = res.info
            if (!res.info.phone) {
              this.$router.push('/?openId=' + this.myInfo.openId)
            }
            const obj = {
              name: '', // 姓名
              phone: '', // 手机号
              sexShow: '', // 性别
              birthday: '', // 出生日期
              height: '', // 身高
              weight: '', // 体重
              bim: '', // BIM
              waistline: '', // 腰围
              smoker: '', // 吸烟史
              drinker: '', // 饮酒史
              liver: '', // 肝功能
              kidney: '', // 肾功能
              marryStatus: '', // 婚姻状况
              fertilityState: '', // 生育状况
              chronicDisease: [], // 慢性病
              familyDisease: [], // 家族病史
              drugAllergy: [], // 药物过敏
              foodAllergy: [], // 食物/接触物过敏
              habit: [] // 个人习惯
            }
            for (const key in obj) {
              if (this.myInfo.hasOwnProperty(key)) {
                if (this.myInfo[key] === '' || this.myInfo[key] === null || this.myInfo[key].length === 0) {
                  this.title = '补充个人资料'
                }
              }
            }
          }
        } else {
          Toast.fail(res.msg)
        }
      })
    },
    onExpect () {
      Toast('敬请期待')
    }
  }
}
</script>
<style lang="scss" scoped>
.lg-container {
  background: #fff;
  .my-container {
    padding: 10px;
    width: 100vw;
    box-sizing: border-box;
    background-color: #f4f4f4;
    &-bg {
      background: linear-gradient(
        -90deg,
        rgba(92, 204, 205, 1),
        rgba(3, 169, 172, 1)
      );
      width: 100%;
      height: 90px;
      padding: 10px;
      box-sizing: border-box;
      border-radius: 5px;
      .my-info {
        width: 100%;
        display: flex;
        align-items: center;
        &-avatar {
          img {
            width: 65px;
            height: 65px;
          }
        }
        &-box {
          display: inline-flex;
          flex: 1;
          flex-direction: column;
          margin: 0 10px;
          &-name {
            color: #ffffff;
            font-size: 15px;
            margin-bottom: 13px;
          }
          &-more {
            a {
              color: #ffffff;
              font-size: 12px;
              line-height: 12px;
              text-decoration: underline;
            }
          }
        }
      }
    }
  }
  .related-container {
    .related-box {
      height: 90px;
      width: 100vw;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 20px 7px;
      box-sizing: border-box;
      &-item {
        text-align: center;
        &-img {
          width: 45px;
          height: 45px;
          margin-bottom: 8px;
        }
        &-text {
          color: #333333;
          font-size: 12px;
        }
      }
    }
    .data-container {
      width: 100vw;
      padding: 0 10px;
      margin: 13px 0 18px;
      box-sizing: border-box;
      &-box {
        width: 100%;
        display: flex;
        &-left {
          flex: 1;
          margin-right: 10px;
          .healthRecords-box {
            width: 100%;
            height: 200px;
            background: url("../assets/mine/healthRecords.png") no-repeat;
            background-size: cover;
            padding: 28px 0 0 13px;
            box-sizing: border-box;
            h5 {
              color: #ffffff;
              font-size: 17px;
            }
            .title {
              color: #ffffff;
              font-size: 11px;
              margin-top: 8px;
            }
          }
        }
        &-right {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .myDoctor-box {
            width: 100%;
            height: 95px;
            background: url("../assets/mine/myDoctor.png") no-repeat;
            background-size: cover;
            padding: 28px 0 0 13px;
            box-sizing: border-box;
            h5 {
              color: #ffffff;
              font-size: 17px;
            }
            .title {
              color: #ffffff;
              font-size: 11px;
              margin-top: 8px;
            }
          }
          .followup-box {
            width: 100%;
            height: 95px;
            background: url("../assets/mine/followup.png") no-repeat;
            background-size: cover;
            padding: 28px 0 0 13px;
            box-sizing: border-box;
            h5 {
              color: #ffffff;
              font-size: 17px;
            }
            .title {
              color: #ffffff;
              font-size: 11px;
              margin-top: 8px;
            }
          }
        }
      }
    }
    .operation-guide {
      padding: 0 10px;
      box-sizing: border-box;
      width: 100vw;
      &-box {
        position: relative;
        height: 62px;
        line-height: 62px;
        width: 100%;
        padding-left: 24px;
        box-sizing: border-box;
        background: linear-gradient(
              90deg,
              #F77584,
              #FFCA3B
            );
        border-radius: 32px;
        h5 {
          color: #ffffff;
          font-size: 17px;
          display: inline-block;
          margin-right: 6px;
        }
        .title {
          color: #ffffff;
          font-size: 11px;
          margin-top: 8px;
        }
        img {
          width: 95px;
          height: 78px;
          position: absolute;
          right: 36px;
          top: -8px;
        }
      }
    }
    .other-box {
      width: 100vw;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px 16px;
      box-sizing: border-box;
      margin-top: 20px;
      &-item {
        width: 101px;
        height: 80px;
        border-radius: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        &.collections {
          background:linear-gradient(91deg,rgba(181,169,251,1) 0%,rgba(203,194,255,1) 100%);
          img {
            width: 35px;
            height: 30px;
          }
        }
        &.payRecords {
          background:linear-gradient(91deg,rgba(253,151,176,1) 0%,rgba(255,195,183,1) 100%);
          img {
            width: 35px;
            height: 32px;
          }
        }
        &.opinions {
          background:linear-gradient(91deg,rgba(244,197,123,1) 0%,rgba(255,213,149,1) 100%);
          img {
            width: 31px;
            height: 31px;
          }
        }
        &-img {
          margin-bottom: 6px;
        }
        &-text {
          color: #ffffff;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
