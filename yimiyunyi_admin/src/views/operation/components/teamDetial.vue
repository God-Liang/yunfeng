<template lang="pug">
  .planDetial(v-loading="loading" element-loading-text="加载中...")
    .top
      img.img(v-if="info.avatar" :src="info.avatar")
      img.img(v-else src="@/assets/img/teamAvatar.png")
      .text
        .t1
          span {{info.name}}
          .lg-tag(v-if="!info.famousDoctor") 名医团队
        ul.t3
          li
            div.label 所在医院
            div.value ：{{info.hospital}}
          li
            div.label 创建人
            div.value ：{{info.ownerName}}
          li
            div.label 创建时间
            div.value ：{{info.createTime}}
    .tabs
      el-tabs(v-model="activeName" type="border-card" style="height:100%" @tab-click="handleClick")
        el-tab-pane(label="详情" name="1")
          teamInfo(:info="info").p20
        //- el-tab-pane(label="认证信息" name="2")
        //-   div.p20 敬请期待
        el-tab-pane(label="团队成员" name="3")
          teamMembers(:active="activeName").p20
        //- el-tab-pane(label="健康圈子" name="4")
        //-   healthCircles.p20
        //- el-tab-pane(label="服务与商城" name="5")
        //-   div.p20 敬请期待
</template>
<script>
import teamInfo from './teamInfo.vue'
import teamMembers from './teamMembers.vue'
import healthCircles from './healthCircles.vue'
import { read } from '@/api/common'
export default {
  name: 'ComponentName',
  components: { teamInfo, teamMembers, healthCircles },
  data() {
    return {
      activeName: '1',
      apiUri: 'followupTeam',
      info: {},
      loading: false
    }
  },
  mounted() {
    this.getInfo()
  },
  methods: {
    handleClick() { },
    getInfo() {
      const id = this.$route.params.id
      read(this.apiUri, id).then(res => {
        this.info = res.info
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
        margin-bottom: 10px;
        .lg-tag {
          width: 100px;
          margin-left: 10px;
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
