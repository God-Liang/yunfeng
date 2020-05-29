<template lang="pug">
  .lg-container(v-wechat-title="$route.meta.title")
    .team-container
      .team-container-bg(@click="onNav")
        .team-info
          .team-info-avatar
            img(v-if="!teamInfo.avatar" src="@/assets/team/teamAvatar.png")
            img(v-else :src="teamInfo.avatar")
          .team-info-box
            .team-name {{teamInfo.name || '暂无名称'}}
            .team-info-box-more.mt5.mb5
              span.team-info-box-more-level(v-if="teamInfo.hospitalLevel") {{teamInfo.hospitalLevel}}
              span.team-info-box-more-hospital.ellipsis.w160 {{teamInfo.hospital || '暂无所在医院'}}
            .team-info-goodAt.ellipsis.w240 擅长手术：{{teamInfo.operation || '暂无'}}
    .team-info-more.team-info-explain
      .team-info-more-head
        img.team-info-more-head-explain(src="@/assets/team/explain.png")
        span.team-info-more-head-title 团队说明
      .team-info-more-con {{teamInfo.description || '暂无团队说明'}}
    .team-info-more
      .team-info-more-head
        img.team-info-more-head-operation(src="@/assets/team/operation.png")
        span.team-info-more-head-title 擅长手术
      .team-info-more-con {{teamInfo.operation || '暂无擅长手术'}}
    .team-info-more
      .team-info-more-head
        img.team-info-more-head-disease(src="@/assets/team/disease.png")
        span.team-info-more-head-title 擅长疾病
      .team-info-more-con {{teamInfo.disease || '暂无擅长疾病'}}
    .team-info-more
      .team-info-more-head
        img.team-info-more-head-remarks(src="@/assets/team/remarks.png")
        span.team-info-more-head-title 团队寄语
      .team-info-more-con {{teamInfo.explain || '暂无团队寄语'}}
</template>
<script>
import { getTeamInfo } from '@/api/team'
import { Toast } from 'vant'
export default {
  data () {
    return {
      teamInfo: {
        id: null
      }
    }
  },
  mounted () {
    this.teamInfo.id = this.$route.query.teamId
    this.getTeamInfo()
  },
  methods: {
    onNav () {
      // 默认团队
      if (this.$route.query.openId) {
        this.$router.push('/team?openId=' + this.$route.query.openId)
      }
    },
    getTeamInfo () {
      Toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      getTeamInfo(this.teamInfo.id).then(res => {
        Toast.clear()
        if (res.code === 200) {
          this.teamInfo = res.info
        } else {
          Toast.fail(res.msg)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.lg-container {
  .team-container {
    padding: 10px;
    width: 100vw;
    box-sizing: border-box;
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
      .team-info {
        width: 100%;
        display: flex;
        align-items: center;
        &-avatar {
          border-radius: 50%;
          overflow: hidden;
          width: 65px;
          height: 65px;
          position: relative;
          img {
            width: 65px;
            height: 65px;
            object-fit: cover;
          }
        }
        &-box {
          display: flex;
          flex: 1;
          flex-direction: column;
          margin: 0 10px;
          .team-name {
            color: #ffffff;
            font-size: 15px;
          }
          &-more {
            display: flex;
            align-items: center;
            &-level {
              background-color: #ffbb3f;
              font-size: 10px;
              color: #ffffff;
              padding: 3px 8px;
              line-height: 10px;
              border-radius: 8px;
            }
            &-hospital {
              color: #ffffff;
              font-size: 12px;
              line-height: 16px;
              margin-left: 5px;
            }
          }
        }
        .team-info-goodAt {
          color: #ffffff;
          font-size: 12px;
          line-height: 12px;
        }
      }
    }
  }
  .team-info-more {
    width: 100vw;
    background-color: #fff;
    padding: 15px 20px;
    box-sizing: border-box;
    margin-bottom: 1px;
    &.team-info-explain {
      padding: 15px 20px 40px;
    }
    &-head {
      display: flex;
      align-items: center;
      &-explain {
        width: 15px;
        height: 12px;
      }
      &-operation {
        width: 14px;
        height: 14px;
      }
      &-disease {
        width: 15px;
        height: 14px;
      }
      &-remarks {
        width: 14px;
        height: 13px;
      }
      &-title {
        color: #333333;
        font-size: 13px;
        margin-left: 8px;
      }
    }
    &-con {
      color: #888888;
      font-size: 12px;
      line-height: 14px;
      margin-top: 10px;
    }
  }
}
</style>
