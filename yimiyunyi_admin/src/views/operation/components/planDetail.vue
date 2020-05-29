<template lang="pug">
  .lg-container
    .lg-container-white
      el-container
        el-header
          h2 {{planInfo.name}}
            span.formName 版本V{{planInfo.version}}
          .operationBox
             el-button(type="primary" @click="getBack") 返回列表
        el-main
          .bgGray
            .planlnfo_box
              h3.planlnfo_box_title 方案信息
              el-row#lg-info
                el-col(:span="12")
                  span.labelNormal 适用手术：
                  span.labelVal {{planInfo.operationShow}}
                el-col(:span="12")
                  span.labelNormal 适用范围：
                  span.labelVal {{planInfo.departmentShow}}
              el-row#lg-info
                el-col(:span="12")
                  span.labelNormal 创建人：
                  span.labelVal {{planInfo.createName}}
                el-col(:span="12")
                  span.labelNormal 创建时间：
                  span.labelVal {{planInfo.createTime}}
              el-row#lg-info
                el-col(:span="24")
                  span.labelNormal 方案介绍：
                  span.labelVal {{planInfo.introduce}}
            .planlnfo_box
              h3.planlnfo_box_title 节点信息
              nodeInfo(:totalDay="totalDay" :list="nodeList" :isLook="true")

  </div>
</template>
<script>
import { getSolutionInfo } from '@/api/doctor'
import nodeInfo from '@/views/components/nodeInfo'
export default {
  components: { nodeInfo },
  data() {
    return {
      planInfo: {},
      nodeList: [],
      totalDay: 0
    }
  },
  created() {
    this.getSolutionInfo()
  },
  methods: {
    getBack() {
      this.$router.go(-1)
    },
    getSolutionInfo() {
      getSolutionInfo(parseInt(this.$route.params.id)).then(res => {
        if (res.code === 200) {
          this.planInfo = res.info.solution
          this.nodeList = res.info.solutionNodeList
          this.totalDay = this.getMaxDay()
        }
      })
    },
    getMaxDay() {
      const dayList = []
      this.nodeList.map(e => {
        e.formSolutionNodeItemList = e.formSolutionNodeItemList ? e.formSolutionNodeItemList : []
        e.visitSolutionNodeItemList = e.visitSolutionNodeItemList ? e.visitSolutionNodeItemList : []
        e.lbNum = e.formSolutionNodeItemList.length
        e.xjNum = e.visitSolutionNodeItemList.length
        dayList.push(e.intervalDay)
      })
      return Math.max(...dayList)
    }
  }
}
</script>
<style lang="scss" scoped>
.lg-container {
  padding: 0;
  .lg-container-white {
    padding: 0;
    overflow: auto;
    > .el-container {
      background-color: #f0f2f5;
      height: 100%;
      > .el-header {
        line-height: 60px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #e6e6e6;
        background-color: #fff;
        h2 {
          font-size: 16px;
          margin: 0;
          color: #333333;
          .formName {
            font-size: 13px;
            color: #888888;
            margin-left: 5px;
          }
        }
      }
      > .el-main {
        .bgGray {
          background-color: #fff;
          height: 100%;
          padding: 20px;
          border-radius: 4px;
          overflow: auto;
          .planlnfo_box {
            margin-bottom: 30px;
            &:last-child {
              margin-bottom: 0;
            }
            &_title {
              position: relative;
              line-height: 20px;
              padding-left: 10px;
              margin-bottom: 20px;
              font-size: 14px;
              font-weight: normal;
              &::after {
                position: absolute;
                left: 0;
                top: 0;
                display: block;
                content: "";
                width: 2px;
                height: 20px;
                background: #14b0b2;
              }
            }
          }
          #lg-info {
            .el-col {
              line-height: 24px;
              margin-bottom: 10px;
              display: inline-flex;
              justify-content: flex-start;
              align-items: center;
              a.labelVal {
                font-size: 12px;
                text-decoration: none;
                color: #35c4e8;
              }
              span {
                color: #666666;
                font-size: 14px;
                &.labelNormal {
                  margin-right: 5px;
                  width: 110px;
                  text-align: right;
                }
                &.labelVal {
                  flex: 1;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
