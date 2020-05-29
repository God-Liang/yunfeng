<template lang="pug">
  .lg-container(v-wechat-title="$route.meta.title")
    .team-container
      .team-bg
        .team-box
          .team-avatar
            img(v-if="!teamInfo.avatar" src="@/assets/team/teamAvatar.png")
            img(v-else :src="teamInfo.avatar")
          .team-info
            .team-name {{teamInfo.name || '暂无名称'}}
            .team-info-box
              .team-level {{teamInfo.hospitalLevel || '暂无等级'}}
              .team-hospital.ellipsis.w160 {{teamInfo.hospital || '暂无所在医院'}}
            .team-goodAt.ellipsis.w220 擅长手术：{{teamInfo.operation || '暂无'}}
          .team-attention
            Icon(name="like" size="16" color="#fff")
            span.attentionNum {{teamInfo.likeCount}}
        .switch-team(@click="onNav")
          img(src="@/assets/team/switch.png")
          span 切换团队
    .team-doctors
      Icon.doctor-more(v-if="doctorList.length > 5" color="#B9B9B9" size="16" name="arrow")
      .doctor-list
        .doctor-item(:class="item.type === 3 ? 'active' : ''" v-for="(item, index) in doctorList" :key="index" @click="onNavDoctor(item)")
          .doctor-avatar
            span.avatar-replace {{item.name | disposeStr}}
          span.doctor-name {{item.name}}
          span.doctor-jobTitle {{item.jobType || '暂无职务'}}
    .team-function
      router-link.team-introduce(:to="'/teamDetails?teamId='+teamInfo.id")
        h5 团队介绍
        span 了解团队详情
        img(src="@/assets/team/details.png")
      .team-fun-box
        .team-appointment
          .appointment-left
            span.team-title 手术预约
            .team-btn
              .team-btn-box
          img(src="@/assets/team/appointment.png")
        .team-consulting
          .consulting-left
            span.team-title 在线咨询
            .team-btn
              .team-btn-box
          img(src="@/assets/team/consulting.png")
    .team-more-func
      .team-func-list
        .team-func-item
          span 健康商场
          img.health(src="@/assets/team/health.png")
        .team-func-item
          span 体检报告解读
          img.love(src="@/assets/team/love.png")
        .team-func-item
          span 健康圈子
          img.pentagram(src="@/assets/team/pentagram.png")
</template>
<script>
import { Icon, Toast } from 'vant'
import { getDefaultTeamInfo, getDoctors } from '@/api/team'
import { readOpenId } from '@/api/info'
export default {
  components: { Icon },
  data () {
    return {
      openId: '',
      id: '', // 患者ID
      teamInfo: {
        id: '', // 团队ID
        avatar: '', // 团队头像
        department: '', // 所在医院科室
        description: '', // 团队描述
        disease: '', // 擅长疾病
        hospital: '', // 所在医院
        hospitalLevel: '', // 医院等级
        likeCount: 0, // 收藏次数
        managerIds: '', // 管理员id集合
        name: '', // 团队名字
        operation: '', // 擅长手术
        ownerId: null, // 团队拥有者ID
        ownerName: '', // 团队拥有者名称
        type: null, // 团队类型
        typeShow: '' // 团队类型
      },
      doctorList: []
    }
  },
  mounted () {
    if (this.$route.query.openId) {
      this.openId = this.$route.query.openId
      this.readInfo()
    }
  },
  methods: {
    onNav () {
      this.$router.push('/myDoctor?openId=' + this.openId)
    },
    onNavDoctor (data) {
      this.$router.push('/doctorDetails?doctorId=' + data.userId)
    },
    async readInfo () {
      Toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      // 患者信息
      const e1 = await readOpenId(this.openId)
      if (e1.code === 200) {
        this.id = e1.info.id
        if (!e1.info.phone) {
          this.$router.push('/?openId=' + this.openId)
        }
        // 默认团队信息
        const e2 = await getDefaultTeamInfo(e1.info.id)
        if (e2.code === 200) {
          if (e2.info) {
            for (const key in this.teamInfo) {
              if (e2.info.hasOwnProperty(key)) {
                this.teamInfo[key] = e2.info[key]
              }
            }
            // 团队队员列表
            const e3 = await getDoctors(this.teamInfo.id)
            if (e3.code === 200) {
              this.doctorList = e3.list
            }
          } else {
            this.$router.push('/myDoctor?openId=' + this.openId)
          }
        }
      }
      Toast.clear()
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
    .team-bg {
      background: linear-gradient(
        -90deg,
        rgba(92, 204, 205, 1),
        rgba(3, 169, 172, 1)
      );
      width: 100%;
      height: 125px;
      padding: 10px;
      box-sizing: border-box;
      border-radius: 5px;
    }
    .team-box {
      width: 100%;
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      padding-bottom: 8px;
      border-bottom: 1px solid #fff;
      .team-avatar {
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
      .team-info {
        display: flex;
        flex: 1;
        flex-direction: column;
        margin: 0 10px;
        .team-name {
          color: #ffffff;
          font-size: 15px;
        }
        .team-info-box {
          display: flex;
          align-items: center;
          margin: 4px 0;
          .team-level {
            background-color: #ffbb3f;
            font-size: 10px;
            color: #ffffff;
            padding: 0 8px;
            height: 18px;
            line-height: 18px;
            border-radius: 8px;
          }
          .team-hospital {
            color: #ffffff;
            font-size: 12px;
            line-height: 14px;
            margin-left: 5px;
          }
        }
        .team-goodAt {
          color: #ffffff;
          font-size: 12px;
          line-height: 14px;
        }
      }
      .team-attention {
        height: 62px;
        display: flex;
        .attentionNum {
          font-size: 12px;
          color: #ffffff;
          margin-top: 5px;
          margin-left: 4px;
        }
        .van-icon {
          margin-top: 3px;
        }
      }
    }
    .switch-team {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 18px;
        height: 13px;
      }
      span {
        color: #fff;
        font-size: 12px;
        margin-left: 5px;
      }
    }
  }
  .team-doctors {
    width: 100vw;
    padding: 15px 30px 15px 20px;
    box-sizing: border-box;
    background-color: #fff;
    position: relative;
    .doctor-more {
      position: absolute;
      right: 12px;
      top: 20px;
    }
    .doctor-list {
      width: 100%;
      overflow-x: scroll;
      white-space: nowrap;
      .doctor-item {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        margin-right: 20px;
        height: 80px;
        &.active {
          .doctor-avatar {
            position: relative;
            &::before {
              content: "";
              display: inline-block;
              position: absolute;
              left: -6px;
              bottom: -2px;
              background: url("../assets/team/creator.png") no-repeat;
              background-size: cover;
              width: 50px;
              height: 15px;
            }
          }
        }
        .doctor-avatar {
          border-radius: 50%;
          width: 40px;
          height: 40px;
          .avatar-replace {
            width: 40px;
            height: 40px;
            line-height: 40px;
            border-radius: 50%;
            text-align: center;
            overflow: hidden;
            background: linear-gradient(
              90deg,
              rgba(58, 182, 240, 0.96),
              rgba(76, 208, 227, 0.96)
            );
            color: #ffffff;
            font-size: 12px;
            display: inline-block;
          }
        }
        .doctor-name {
          color: #333333;
          font-size: 12px;
          line-height: 12px;
          margin: 8px 0 5px;
        }
        .doctor-jobTitle {
          color: #888888;
          font-size: 12px;
          line-height: 12px;
        }
      }
    }
  }
  .team-function {
    display: flex;
    width: 100vw;
    padding-left: 6px;
    height: 222px;
    box-sizing: border-box;
    margin: 10px 0;
    .team-introduce {
      background-color: #fff;
      display: flex;
      flex-direction: column;
      padding: 28px 4px 0 10px;
      border-right: 1px solid #ededed;
      h5 {
        color: #fc5e5e;
        font-size: 17px;
      }
      span {
        color: #888888;
        font-size: 12px;
        margin: 8px 0 20px;
      }
      img {
        width: 143px;
        height: 101px;
      }
    }
    .team-fun-box {
      flex: 1;
      display: flex;
      flex-direction: column;
      .team-appointment {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
        background-color: #fff;
        padding: 0 10px 0 15px;
        border-bottom: 1px solid #ededed;
        .appointment-left {
          width: 80px;
          .team-title {
            color: #21c4f7;
            font-size: 15px;
          }
          .team-btn {
            width: 60px;
            height: 20px;
            margin-top: 10px;
            box-sizing: border-box;
            padding: 1px;
            border-radius: 10px;
            background: linear-gradient(
              0deg,
              rgba(91, 157, 232, 0.6) 0%,
              rgba(0, 204, 195, 0.6) 100%
            );
            .team-btn-box {
              width: 100%;
              height: 100%;
              border-radius: 10px;
              background: #fff;
              position: relative;
              line-height: 18px;
              &::before {
                content: '立即预约';
                display: inline-block;
                width: 60px;
                height: 18px;
                text-align: center;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                font-size: 12px;
                color: rgba(161, 161, 161, 1);
                background: linear-gradient(
                  0deg,
                  rgba(91, 157, 232, 0.6) 0%,
                  rgba(0, 204, 195, 0.6) 100%
                );
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
              }
            }
          }
        }
        img {
          width: 93px;
          height: 65px;
        }
      }
      .team-consulting {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
        background-color: #fff;
        padding: 0 10px 0 15px;
        .consulting-left {
          width: 80px;
          .team-title {
            color: #FFC947;
            font-size: 15px;
          }
          .team-btn {
            margin-top: 10px;
            width: 60px;
            height: 20px;
            box-sizing: border-box;
            padding: 1px;
            border-radius: 10px;
            background: linear-gradient(
              0deg,
              rgba(249, 133, 108, 0.6) 0%,
              rgba(249, 153, 49, 0.6) 100%
            );
            .team-btn-box {
              width: 100%;
              height: 100%;
              border-radius: 10px;
              background: #fff;
              position: relative;
              line-height: 18px;
              &::before {
                content: '立即咨询';
                display: inline-block;
                width: 60px;
                height: 18px;
                text-align: center;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                font-size: 12px;
                color: rgba(161, 161, 161, 1);
                background: linear-gradient(
                  0deg,
                  rgba(249, 133, 108, 0.6) 0%,
              rgba(249, 153, 49, 0.6) 100%
                );
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
              }
            }
          }
        }
        img {
          width: 93px;
          height: 65px;
        }
      }
    }
  }
  .team-more-func {
    width: 100vw;
    height: 105px;
    background-color: #fff;
    .team-func-list {
      height: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .team-func-item {
        box-sizing: border-box;
        padding: 20px 0 26px;
        height: 100%;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        span {
          color: #333333;
          font-size: 13px;
          line-height: 13px;
        }
        .health {
          width: 43px;
          height: 28px;
        }
        .love {
          width: 32px;
          height: 30px;
        }
        .pentagram {
          width: 30px;
          height: 29px;
        }
      }
    }
  }
}
</style>
