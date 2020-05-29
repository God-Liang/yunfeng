<template>
  <div class="lg_wrap">
    <div class="dashboard-editor-container">
      <el-container>
        <el-container>
          <el-header>
            <el-row>
              <el-col :span="7">
                <div class="patientBox">
                  <div class="title">
                    <span>上转病人例数</span>
                    <i class="el-icon-info"></i>
                  </div>
                  <div class="number">
                    <span>{{upTransferPatientCountThisYear}}</span>
                  </div>
                </div>
                <div class="image">
                  <analyze-one :analyze="analyze1" :height='"50px"'></analyze-one>
                </div>
                <div class="monthly">
                  <span>月均上转人数&nbsp;&nbsp; {{upTransferPatientCountAvgMonthy}}例</span>
                </div>
              </el-col>
              <el-col :span="7">
                <div class="patientBox">
                  <div class="title">
                    <span>接收病人例数</span>
                  </div>
                  <div class="number">
                    <span>{{receivePatientCountThisYear}}</span>
                  </div>
                </div>
                <div class="image">
                  <analyze-one :analyze="analyze2" :height='"50px"'></analyze-one>
                </div>
                <div class="monthly">
                  <span>月均接收人数&nbsp;&nbsp; {{receivePatientCountAvgMonthly}}例</span>
                </div>
              </el-col>
              <el-col :span="10" class="last">
                <div class="patientBoxs">
                  <div class="patientBox">
                    <div class="title">
                      <span>本月随访次数</span>
                    </div>
                    <div class="number">
                      <span>{{thisMonthFollow}}</span>
                      <i class="uparrows"></i>
                    </div>
                  </div>
                  <div class="patientBox">
                    <div class="title">
                      <span>本月远程复诊次数</span>
                    </div>
                    <div class="number">
                      <span>{{thisMonthRemoteRevisit}}</span>
                      <i class="uparrows"></i>
                    </div>
                  </div>
                </div>
                <div class="visit">
                  <div class="title">
                    <span>签约机构</span>
                  </div>
                  <div class="number">
                    <span>{{signHospitalCount}}家</span>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-header>
          <el-main v-loading="loading">
            <div class="navbar">
              <ul>
                <li :class="activeClass == index ? 'active':''" v-for="(itme,index) in timeArr" :key="index" @click="getItme(index)">
                  {{itme}}
                </li>
              </ul>
            </div>
            <el-menu
              :default-active="activeIndex"
              class="el-menu-demo"
              mode="horizontal"
              @select="handleSelect"
            >
              <el-menu-item index="1">上转病人</el-menu-item>
              <el-menu-item index="2">接收病人</el-menu-item>
            </el-menu>
            <div class="chartBox">
              <div
                class="chart-wrapper"
                style="box-sizing: border-box; flex: 1; margin-left: 16px;"
              >
                <analyze :analyze="analyze" :analyzeStatus='analyzeStatus' @getRanking='getRanking'></analyze>
              </div>
              <div class="rightTab">
                <h4>上转医疗机构排名</h4>
                <ul>
                  <li v-for="item in ranking" :key="item.hospitalId" :id="item.hospitalId">
                    <i>{{item.ranking}}</i>
                    <span>{{item.hospitalName}}</span>
                  </li>
                </ul>
              </div>
            </div>
          </el-main>
        </el-container>
        <el-aside>
          <h3>代办事项</h3>
          <ul class="commissionList">
            <li class="commissionitem">
              <h4>
                <i></i>
                <span>转诊业务</span>
              </h4>
              <span>上转待审核病人（ {{upTransferWaitCount}} ）</span>
              <span>下转待接收病人（ {{downTransferWaitCount}} ）</span>
            </li>
            <li class="commissionitem">
              <h4>
                <i></i>
                <span>康复管理</span>
              </h4>
              <span>今日随访计划（{{todayFollow}}）</span>
              <span>今日复诊预约（{{todayRevisit}}）</span>
            </li>
            <li class="commissionitem">
              <h4>
                <i></i>
                <span>签约业务</span>
              </h4>
              <span>新签约审核（{{newSignWait}}）</span>
            </li>
          </ul>
        </el-aside>
      </el-container>
    </div>
  </div>
</template>

<script>
import analyze from './components/analyze'
import analyzeOne from './components/analyze1'
import { myHome } from '@/api/myhome/'
export default {
  name: 'dashboard-admin2',
  components: {
    analyze,
    analyzeOne
  },
  data() {
    return {
      timeArr: ['今日', '本周', '本月', '全年'],
      activeClass: 3,
      upTransferPatientCountThisYear: 0,
      receivePatientCountThisYear: 0,
      upTransferPatientCountAvgMonthy: 0,
      receivePatientCountAvgMonthly: 0,
      thisMonthFollow: 0,
      thisMonthRemoteRevisit: 0,
      signHospitalCount: 0,
      todayFollow: 0,
      todayRevisit: 0,
      newSignWait: 0,
      downTransferWaitCount: 0,
      upTransferWaitCount: 0,
      activeIndex: '1',
      ranking: [],
      analyze: {
        name: '上传病人分析',
        title: '上传病人分析',
        xAxis: [],
        data: [],
        subtext: '单位：人次',
        axisTage: true,
        grid: {
          top: 80,
          left: '2%',
          right: '2%',
          bottom: '0',
          containLabel: true
        },
        yAxisTage: true,
        barWidth: '50%',
        seriesType: 'bar',
        boundaryGap: true,
        areaStyle: {
          color: '#fff'
        }
      },
      analyze1: {
        name: '上转病人例数',
        title: '',
        xAxis: ['10月', '11月', '12月', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月'],
        data: [79, 52, 200, 434, 390, 79, 52, 200, 434, 390, 200, 434],
        subtext: '',
        axisTage: false,
        grid: {
          top: '0',
          left: '-30px',
          right: '0',
          bottom: '0',
          containLabel: true
        },
        yAxisTage: false,
        barWidth: '60%',
        seriesType: 'line',
        boundaryGap: false,
        areaStyle: {
          color: '#975fe4'
        }
      },
      analyze2: {
        name: '接收病人例数',
        title: '',
        xAxis: ['10月', '11月', '12月', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月'],
        data: [79, 52, 200, 434, 390, 79, 52, 200, 434, 390, 200, 434],
        subtext: '',
        axisTage: false,
        grid: {
          top: '0',
          left: '-30px',
          right: '0',
          bottom: '0',
          containLabel: true
        },
        yAxisTage: false,
        barWidth: '60%',
        seriesType: 'bar',
        boundaryGap: true,
        areaStyle: {
          color: '#fff'
        }
      },
      analyzeStatus: {
        patient: 1,
        time: 3
      },
      loading: true
    }
  },
  created() {
    this.getMessage()
  },
  mounted() {},
  methods: {
    handleSelect(key, keyPath) {
      this.loading = true
      this.analyzeStatus.patient = parseInt(key)
    },
    getRanking(val) {
      this.ranking = val
      this.loading = false
    },
    getMessage() {
      myHome().then((res) => {
        this.upTransferPatientCountThisYear = res.data.data.upTransferPatientCountThisYear
        this.receivePatientCountThisYear = res.data.data.receivePatientCountThisYear
        this.upTransferPatientCountAvgMonthy = res.data.data.upTransferPatientCountAvgMonthy
        this.receivePatientCountAvgMonthly = res.data.data.receivePatientCountAvgMonthly
        this.thisMonthFollow = res.data.data.thisMonthFollow
        this.thisMonthRemoteRevisit = res.data.data.thisMonthRemoteRevisit
        this.signHospitalCount = res.data.data.signHospitalCount
        this.todayFollow = res.data.data.todoItems.recoverManage.todayFollow
        this.todayRevisit = res.data.data.todoItems.recoverManage.todayRevisit
        this.newSignWait = res.data.data.todoItems.signBiz.newSignWait
        this.upTransferWaitCount = res.data.data.todoItems.transferBiz.upTransferWaitCount
        this.downTransferWaitCount = res.data.data.todoItems.transferBiz.downTransferWaitCount
      })
    },
    getItme(index) {
      this.loading = true
      this.activeClass = index
      this.analyzeStatus.time = index
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.lg_wrap {
  .dashboard-editor-container {
    background-color: rgb(255, 255, 255);
    height: 100%;
    padding: 25px 20px 25px 25px;
    border-radius: 4px;
    .el-container {
      height: 100%;
      .el-aside {
        width: 228px !important;
        padding: 10px;
        border: 1px solid rgba(233, 233, 233, 1);
        border-radius: 2px;
        h3 {
          font-size: 16px;
          height: 50px;
          line-height: 50px;
          margin: 0 0 15px 0;
          padding-left: 30px;
          border-bottom: 1px solid rgba(233, 233, 233, 1);
          color: rgb(51, 51, 51);
        }
        .commissionList {
          padding-left: 5px;
          .commissionitem {
            list-style: none;
            display: flex;
            flex-direction: column;
            h4 {
              font-size: 14px;
              margin: 5px 0;
              color: rgb(51, 51, 51);
              i {
                width: 7px;
                height: 30px;
                display: inline-block;
                background-color: rgba(255, 89, 24, 1);
                vertical-align: middle;
                margin-right: 15px;
              }
            }
            > span {
              margin-left: 22px;
              font-size: 12px;
              height: 36px;
              line-height: 36px;
              color: rgb(51, 51, 51);
            }
          }
        }
      }
      .is-vertical {
        padding-right: 20px;
        .el-header {
          padding: 0;
          height: 190px !important;
          margin-bottom: 20px;
          .el-row {
            height: 100%;
            &:after {
              display: none;
            }
            &:before {
              display: none;
            }
            display: flex;
            justify-content: space-between;
            .el-col {
              padding: 15px 15px 0 15px;
              margin-right: 20px;
              border: 1px solid rgba(233, 233, 233, 1);
              border-radius: 2px;
              &.last {
                margin-right: 0;
              }
              .patientBox {
                display: flex;
                flex-direction: column;
                .title {
                  display: flex;
                  justify-content: space-between;
                  margin-bottom: 10px;
                  span {
                    font-size: 14px;
                    color: rgba(0, 0, 0, 0.43);
                  }
                  i {
                    color: rgba(0, 0, 0, 0.43);
                  }
                }
                .number {
                  font-size: 30px;
                  color: rgba(0, 0, 0, 0.85);
                  line-height: 38px;
                  margin-bottom: 15px;
                  span {
                    display: inline-block;
                    height: 38px;
                    line-height: 38px;
                  }
                  i {
                    display: inline-block;
                    border-bottom: 6px solid rgba(82, 196, 26, 0.65);
                    border-right: 8px solid transparent;
                    border-left: 8px solid transparent;
                    border-radius: 2px;
                    vertical-align: middle;
                    margin-left: -3px;
                  }
                }
              }
              .image {
                width: 100%;
                height: 25px;
                canvas {
                  left: -30px !important;
                }
              }
              .monthly {
                border-top: 1px solid rgba(233, 233, 233, 1);
                height: 38px;
                line-height: 38px;
                margin-top: 15px;
                font-size: 14px;
                color: rgba(0, 0, 0, 0.65);
              }
              .patientBoxs {
                display: flex;
                justify-content: space-between;
                .patientBox {
                  display: inline-block;
                }
              }
              .visit {
                .title {
                  margin: 10px 0;
                  font-size: 14px;
                  color: rgba(0, 0, 0, 0.43);
                }
                .number {
                  font-size: 30px;
                  color: rgba(0, 0, 0, 0.85);
                }
              }
            }
          }
        }
        .el-main {
          border: 1px solid rgba(233, 233, 233, 1);
          border-radius: 2px;
          padding: 10px;
          position: relative;
          .ranking {
            width: 300px;
          }
          .navbar {
            position: absolute;
            right: 150px;
            top: 10px;
            z-index: 999;
            ul {
              list-style: none;
              display: flex;
              justify-content: flex-start;
              padding: 0;
              margin: 0;
              li {
                font-size: 14px;
                margin: 0 10px;
                height: 60px;
                line-height: 60px;
                color: rgba(0, 0, 0, 0.65);
                cursor: pointer;
                &.active{
                  color:#409eff;
                }
              }
            }
          }
          .el-menu {
            .el-menu-item {
              &.is-active {
                color: #409eff;
              }
            }
          }
          .chartBox {
            display: flex;
            justify-content: flex-start;
            padding: 0 20px;
            margin-top: 30px;
            .chart-wrapper {
            }
            .rightTab {
              width: 270px;
              height: 40px;
              h4 {
                font-size: 16px;
                color: rgba(0, 0, 0, 0.85);
                margin: 0;
              }
              ul {
                list-style: none;
                display: flex;
                flex-direction: column;
                li {
                  height: 38px;
                  line-height: 38px;
                  i {
                    width: 20px;
                    height: 20px;
                    line-height: 20px;
                    text-align: center;
                    font-style: normal;
                    border-radius: 50%;
                    display: inline-block;
                    background-color: #f0f2f5;
                    color: rgba(0, 0, 0, 0.65);
                    font-size: 13px;
                    margin-right: 30px;
                    &:nth-child(1){
                      background-color: #314659;
                      color: #fff;
                    }
                    &:nth-child(2){
                      background-color: #314659;
                      color: #fff;
                    }
                    &:nth-child(3){
                      background-color: #314659;
                      color: #fff;
                    }
                  }
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
