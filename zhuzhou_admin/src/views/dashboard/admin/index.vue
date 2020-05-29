<template>
  <div class="dashboard-editor-container">
    <el-row class="panel-group">
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-people">
            <img src="@/assets/images/index1.png" alt>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">今日手术台数</div>
            <div class="countBox">
              <count-to
                :start-val="0"
                :end-val="num01"
                :duration="2600"
                suffix="台"
                class="card-panel-num"
              />
              <!-- <router-link to="/patientManage/patientManage">查看详情</router-link> -->
            </div>
            <div class="decorationBox decorationBox1">
              <span></span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-message">
            <img src="@/assets/images/index2.png" alt>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">今日预约病人</div>
            <div class="countBox">
              <div>
                <count-to
                  :start-val="0"
                  :end-val="num02"
                  :duration="2600"
                  suffix="人"
                  class="card-panel-num"
                />
              </div>
              <!-- <router-link to="/appointmentManage/appointmentConfirm">查看详情</router-link> -->
            </div>
            <div class="decorationBox decorationBox2">
              <span></span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-money">
            <img src="@/assets/images/index3.png" alt>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">今日待随访任务</div>
            <div class="countBox">
              <count-to
                :start-val="0"
                :end-val="num04"
                :duration="2600"
                suffix="台"
                class="card-panel-num"
              />
              <!-- <router-link to="/followupManage/followup">查看详情</router-link> -->
            </div>
            <div class="decorationBox decorationBox3">
              <span></span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-shopping">
            <img src="@/assets/images/index4.png" alt>
          </div>
          <div class="card-panel-description verticalBar">
            <div class="card-panel-text">日间手术准入式</div>
            <div class="countBox">
              <count-to
                :start-val="0"
                :end-val="num05"
                :duration="2600"
                suffix="台"
                class="card-panel-num"
              />
            </div>
            <div class="decorationBox decorationBox4">
              <span></span>
            </div>
          </div>
          <!-- <div class="duringTitle">
            <p>日间床位数</p>
            <span>12</span>
            <p>开展病种数</p>
            <span>12</span>
          </div> -->
        </div>
      </el-col>
    </el-row>
    <el-row class="chartsBox">
      <el-col :span="12" class="box1">
        <lg-chart :analyze="analyze1"></lg-chart>
      </el-col>
      <el-col :span="12" class="box2">
        <lg-chart :analyze="analyze2"></lg-chart>
      </el-col>
    </el-row>
    <el-row class="progressBox">
      <el-col :span="14" class="box1">
        <h4>近30日（全院）日间手术退出率</h4>
        <div class="exitBox">
          <section>
            <el-progress type="circle" :percentage="num08" :stroke-width="10"></el-progress>
            <p>入院前取消率</p>
          </section>
          <section>
            <el-progress type="circle" :percentage="num09" :stroke-width="10"></el-progress>
            <p>术后退出率</p>
          </section>
          <section>
            <el-progress type="circle" :percentage="num10" :stroke-width="10"></el-progress>
            <p>患者爽约率</p>
          </section>
        </div>
      </el-col>
      <el-col :span="10" class="box2">
        <h4>近30日（全院）日间手术取消因素占比</h4>
        <div class="factorsBox">
          <h2>
            <span>总手术例数</span>
            <span class="numBox">{{num11}}例</span>
          </h2>
          <section>
            <label>患者因素</label>
            <el-progress :percentage="num12" :stroke-width="10" color="rgb(78, 140, 255)"></el-progress>
          </section>
          <section>
            <label>术后因素</label>
            <el-progress :percentage="num13" :stroke-width="10" color="rgb(123, 170, 255)"></el-progress>
          </section>
          <section>
            <label>疾病因素</label>
            <el-progress :percentage="num14" :stroke-width="10" color="rgb(36, 213, 114）"></el-progress>
          </section>
          <section>
            <label>特殊因素</label>
            <el-progress :percentage="num15" :stroke-width="10" color="rgb(255, 200, 119)"></el-progress>
          </section>
          <section>
            <label>生理因素</label>
            <el-progress :percentage="num16" :stroke-width="10" color="rgb(255, 78, 111)"></el-progress>
          </section>
          <section>
            <label>其他</label>
            <el-progress :percentage="num17" :stroke-width="10" color="rgb(197, 74, 254)"></el-progress>
          </section>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import lgChart from './components/lgChart'
import { getCount } from '@/api/myhome/index'
import CountTo from 'vue-count-to'

export default {
  name: 'dashboard-admin',
  components: {
    lgChart,
    CountTo
  },
  data() {
    return {
      num01: 0, // 今日待手术台次
      num02: 0, // 今日预约病人
      num03: 0, // 术前确认病人
      num04: 0, // 今日待随访任务
      num05: 0, // 日间手术准入术式
      num08: 0, // 入院前取消率
      num09: 0, // 术后退出率
      num10: 0, // 患者爽约率
      num11: 0, // 总手术例数
      num12: 0, // 患者因数
      num13: 0, // 术后因素
      num14: 0, // 疾病因素
      num15: 0, // 特殊因素
      num16: 0, // 生理因素
      num17: 0, // 其他
      analyze1: {
        title: '近30日（全院）日间手术预约例数',
        key: [],
        value: [],
        color: '#5e5eff',
        bgColor: '#8a8aff'
      },
      analyze2: {
        title: '近30日（全院）日间手术完成例数',
        key: [],
        value: [],
        color: '#ffba52',
        bgColor: '#ffdfaf'
      }
    }
  },
  mounted() {
    this.getCount()
  },
  methods: {
    getCount() {
      getCount().then(res => {
        if (res.data.code === 200) {
          const item = res.data.data
          this.num01 = item.num01
          this.num02 = item.num02
          this.num03 = item.num03
          this.num04 = item.num04
          this.num05 = item.num05
          this.num08 = item.num08
          this.num09 = item.num09
          this.num10 = item.num10
          this.num11 = item.num11
          this.num12 = item.num12
          this.num13 = item.num13
          this.num14 = item.num14
          this.num15 = item.num15
          this.num16 = item.num16
          this.num17 = item.num17
          const analyze1 = item.num06
          const analyze2 = item.num07
          const keys1 = []
          const value1 = []
          const keys2 = []
          const value2 = []
          analyze1.forEach(v => {
            for (const key in v) {
              keys1.push(key)
              value1.push(v[key])
            }
          })
          analyze2.forEach(v => {
            for (const key in v) {
              keys2.push(key)
              value2.push(v[key])
            }
          })
          this.analyze1.key = keys1
          this.analyze1.value = value1
          this.analyze2.key = keys2
          this.analyze2.value = value2
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 15px;
  background-color: rgb(240, 242, 245);
  .welcome {
    text-align: center;
    height: 100px;
    line-height: 100px;
    background-color: #fff;
    margin-bottom: 10px;
  }
  .chart-wrapper {
    background-color: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  .card-panel-col {
    margin-bottom: 15px;
  }
  .card-panel {
    height: 120px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    padding: 0 20px 0 10px;
    border-color: rgba(0, 0, 0, 0.05);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .icon-people {
      background-color: rgb(251, 94, 94);
    }
    .icon-message {
      background-color: rgb(85, 164, 255);
    }
    .icon-money {
      background-color: rgb(255, 186, 82);
    }
    .icon-shopping {
      background-color: rgb(47, 198, 167);
    }
    .card-panel-icon-wrapper {
      width: 60px;
      height: 60px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 10px;
    }
    .card-panel-icon {
      font-size: 48px;
    }
    .card-panel-description {
      flex: 1;
      position: relative;
      &.verticalBar {
        padding-right: 20px;
        // &:after {
        //   display: block;
        //   content: "";
        //   width: 1px;
        //   height: 70px;
        //   background-color: #eee;
        //   position: absolute;
        //   right: 0;
        //   top: 8px;
        //   margin-left: 10px;
        // }
      }
      .card-panel-text {
        line-height: 18px;
        color: #a2a2a2;
        font-size: 16px;
        margin-bottom: 12px;
        font-weight: normal;
      }
      .countBox {
        margin-bottom: 12px;
        display: flex;
        justify-content: space-between;
        padding-right: 2px;
        .card-panel-num {
          font-size: 20px;
          color: #8a8a8a;
          font-weight: normal;
        }
        span {
          font-size: 20px;
        }
        a {
          display: inline-block;
          width: 68px;
          height: 26px;
          line-height: 26px;
          color: #fff;
          background-color: rgb(100, 155, 255);
          text-align: center;
          border-radius: 4px;
          font-size: 14px;
          margin: 0 2px;
        }
      }
      .decorationBox {
        position: relative;
        width: 100%;
        height: 4px;
        background: rgb(229, 229, 229);
        span {
          position: absolute;
          left: 0;
          top: 0;
          width: 20%;
          height: 4px;
        }
        &.decorationBox1 {
          span {
            background-color: rgb(251, 94, 94);
          }
        }
        &.decorationBox2 {
          span {
            background-color: rgb(85, 164, 255);
          }
        }
        &.decorationBox3 {
          span {
            background-color: rgb(255, 186, 82);
          }
        }
        &.decorationBox4 {
          span {
            background-color: rgb(47, 198, 167);
          }
        }
      }
    }
    .duringTitle {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-left: 20px;
      p {
        font-size: 16px;
        color: #bbb;
        margin: 5px 0;
      }
      span {
        padding: 1px 0;
        border-radius: 4px;
        text-align: center;
        font-size: 14px;
        background: #649bff;
        color: #fff;
        width: 80%;
      }
    }
  }
}
.chartsBox{
  display: flex;
  margin-bottom: 15px;
  .el-col{
    background-color: #fff;
    padding: 20px 0 0 10px;
    box-sizing: border-box;
    &.box1{
      margin-right: 7.5px;
    }
    &.box2{
      margin-left: 7.5px;
    }
  }
}
.progressBox{
  display: flex;
  margin-bottom: 15px;
  .el-col{
    background-color: #fff;
    padding: 20px 30px;
    &.box1{
      margin-right: 7.5px;
    }
    &.box2{
      margin-left: 7.5px;
    }
    h4{
      color: #8a8a8a;
      font-size: 14px;
      margin: 0;
    }
    .exitBox{
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-top: 65px;
      section{
        p{
          text-align: center;
          color:#8a8a8a;
          font-size: 14px;
          font-weight: bold;
        }
      }
    }
    .factorsBox{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      h2{
        display: flex;
        justify-content: space-between;
        margin: 14px 0 8px;
        font-size: 14px;
        color: #8a8a8a;
      }
      section{
        display: flex;
        justify-content: space-between;
        margin: 8px 0;
        label{
          font-size:14px;
          color:#8a8a8a;
          margin-right: 10px;
          width: 56px;
          display: block;
          text-align: right;
        }
        .el-progress{
          flex: 1;
        }
      }
    }
  }
}
@media screen and (min-width: 1200px) and (max-width:1290px){
  .panel-group .card-panel .card-panel-description .card-panel-text{
    font-size: 15px;
  }
  .panel-group .card-panel .card-panel-description .countBox .card-panel-num{
    font-size: 18px;
  }
  .panel-group .card-panel{
    padding: 0 12px 0 10px;
  }
}
</style>
