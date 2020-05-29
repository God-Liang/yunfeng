<template>
  <div class="surgeryRecord">
    <div class="sectionBox" ref="sectionBox">
      <h2>
        <span>住院信息</span>
      </h2>
      <div class="box">
        <el-row >
          <el-col :span="6">
            <div class="fontStyle">住院号：{{hospitalInfo.baseInfo.inHospNo}}</div>
          </el-col>
          <el-col :span="6">
            <div class="fontStyle">入院日期：{{hospitalInfo.baseInfo.inHospTime | fmtYMD}}</div>
          </el-col>
          <el-col :span="6">
            <div class="fontStyle">出院日期：{{hospitalInfo.baseInfo.outHospTime | fmtYMD}}</div>
          </el-col>
          <el-col :span="6">
            <div class="fontStyle">住院时长：{{hospitalInfo.baseInfo.inHospNum}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div class="fontStyle">转归情况：{{hospitalInfo.baseInfo.outCome}}</div>
          </el-col>
          <el-col :span="6">
            <div class="fontStyle">主治医生：{{hospitalInfo.baseInfo.doctorName}}</div>
          </el-col>
          <el-col :span="6">
            <div class="fontStyle">入院科室：{{hospitalInfo.baseInfo.deptName}}</div>
          </el-col>
          <el-col :span="6">
            <div class="fontStyle">病床号：{{hospitalInfo.baseInfo.bedNo}}</div>
          </el-col>
        </el-row>
        <i class="wire-lg"></i>
        <el-row>
          <el-col :span="24">
            <div class="fontStyle">入院诊断：{{hospitalInfo.baseInfo.beforeDiagnosis}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="fontStyle">出院小结：<el-button type="text" @click="lookImg(hospitalInfo.baseInfo.outResult)">点击查看</el-button></div>
          </el-col>
        </el-row>
      </div>
      <h2>
        <span>住院手术</span>
      </h2>
      <div class="box">
        <div class="content">
          <el-row type="flex" justify="space-around">
            <el-col :span="3" style="font-weight:bold;">
              <div class="fontStyle">手术日期</div>
            </el-col>
            <el-col :span="5" style="font-weight:bold;">
              <div class="fontStyle">手术名称</div>
            </el-col>
            <el-col :span="3" style="font-weight:bold;">
              <div class="fontStyle">手术医生</div>
            </el-col>
            <el-col :span="4" style="font-weight:bold;">
              <div class="fontStyle">麻醉方式</div>
            </el-col>
            <el-col :span="3" style="font-weight:bold;">
              <div class="fontStyle">手术级别</div>
            </el-col>
            <el-col :span="3" style="font-weight:bold;">
              <div class="fontStyle">切口愈合等级</div>
            </el-col>
            <el-col :span="3" style="font-weight:bold;">
              <div class="fontStyle">麻醉医生</div>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-around">
            <el-col :span="3">
              <div class="fontStyle">{{hospitalInfo.operationInfo.schedule | fmtYMD}}</div>
            </el-col>
            <el-col :span="5">
              <div class="fontStyle">{{hospitalInfo.operationInfo.operationName}}</div>
            </el-col>
            <el-col :span="3">
              <div class="fontStyle">{{hospitalInfo.operationInfo.doctorName}}</div>
            </el-col>
            <el-col :span="4">
              <div class="fontStyle" style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;" :title="hospitalInfo.operationInfo.anesthetistTypeShow">{{hospitalInfo.operationInfo.anesthetistTypeShow}}</div>
            </el-col>
            <el-col :span="3">
              <div class="fontStyle">{{hospitalInfo.operationInfo.asaLevelShow}}</div>
            </el-col>
            <el-col :span="3">
              <div class="fontStyle">{{hospitalInfo.operationInfo.incisionLevelShow}}</div>
            </el-col>
            <el-col :span="3">
              <div class="fontStyle">{{hospitalInfo.operationInfo.anesthetistName}}</div>
            </el-col>
          </el-row>
        </div>
      </div>
      <!--<h2>-->
        <!--<span>检查报告</span>-->
      <!--</h2>-->
      <!--<div class="box" v-for="itemObj in hospitalInfo.checkInfoList" :key="itemObj.checkId">-->
        <!--<div class="header">-->
          <!--<el-row>-->
            <!--<el-col :span="24">-->
              <!--<div class="fontStyle">报告单编号：{{itemObj.checkId}}</div>-->
            <!--</el-col>-->
          <!--</el-row>-->
        <!--</div>-->
        <!--<div class="content">-->
          <!--<el-row :gutter="20">-->
            <!--<el-col :span="6">-->
              <!--<div class="fontStyle">检查类型：{{itemObj.checkType}}</div>-->
            <!--</el-col>-->
            <!--<el-col :span="6">-->
              <!--<div class="fontStyle">检查项目：{{itemObj.checkItem}}</div>-->
            <!--</el-col>-->
            <!--<el-col :span="6">-->
              <!--<div class="fontStyle">报告时间：{{itemObj.checkDate}}</div>-->
            <!--</el-col>-->
            <!--<el-col :span="6">-->
              <!--<div class="fontStyle">开单医生：{{itemObj.checkDoctor}}</div>-->
            <!--</el-col>-->
          <!--</el-row>-->
          <!--<el-row :gutter="20">-->
            <!--<el-col :span="24">-->
              <!--<div class="fontStyle">开单科室：{{itemObj.checkDepartment}}</div>-->
            <!--</el-col>-->
          <!--</el-row>-->
          <!--<i class="wire-lg"></i>-->
          <!--<el-row :gutter="20">-->
            <!--<el-col :span="24">-->
              <!--<div class="fontStyle">检查结果：{{itemObj.checkResult}}</div>-->
            <!--</el-col>-->
          <!--</el-row>-->
          <!--<el-row :gutter="20">-->
            <!--<el-col :span="24">-->
              <!--<div class="fontStyle">检查描述：{{itemObj.checkDescription}}</div>-->
            <!--</el-col>-->
          <!--</el-row>-->
          <!--<el-row :gutter="20">-->
            <!--<el-col :span="24">-->
              <!--<div class="fontStyle">图文报告：<el-button type="text" @click="lookImg(itemObj.checkReportUrl)">点击查看</el-button></div>-->
            <!--</el-col>-->
          <!--</el-row>-->
        <!--</div>-->
      <!--</div>-->
      <h2>
        <span>检验报告</span>
      </h2>
      <div class="box" v-for="itemObj in hospitalInfo.inspectInfoList" :key="itemObj.inspectionId">
        <div class="header">
          <el-row>
            <el-col :span="24">
              <div class="fontStyle">报告单编号：{{itemObj.inspectionId}}</div>
            </el-col>
          </el-row>
        </div>
        <div class="content">
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="fontStyle">检验项目：{{itemObj.inspectItem}}</div>
            </el-col>
            <el-col :span="6">
              <div class="fontStyle">样本类型：{{itemObj.inspectSampleType}}</div>
            </el-col>
            <el-col :span="6">
              <div class="fontStyle">报告时间：{{itemObj.inspectDate}}</div>
            </el-col>
            <el-col :span="6">
              <div class="fontStyle">开单医生：{{itemObj.inspectDoctor}}</div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <div class="fontStyle">开单科室：{{itemObj.inspectDepartment}}</div>
            </el-col>
          </el-row>
          <i class="wire-lg"></i>
          <el-row type="flex" justify="space-around">
            <el-col :span="8" style="font-weight:bold;">
              <div class="fontStyle">项目</div>
            </el-col>
            <el-col :span="5" style="font-weight:bold;">
              <div class="fontStyle">异常标志</div>
            </el-col>
            <el-col :span="4" style="font-weight:bold;">
              <div class="fontStyle">检验结果值</div>
            </el-col>
            <el-col :span="3" style="font-weight:bold;">
              <div class="fontStyle">检验结果值单位</div>
            </el-col>
            <el-col :span="4" style="font-weight:bold;">
              <div class="fontStyle">参考范围</div>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-around" v-for="item in itemObj.inspectItems" :key="item.inspChildItem">
            <el-col :span="8">
              <div class="fontStyle">{{item.inspChildItem}}</div>
            </el-col>
            <el-col :span="5">
              <div class="fontStyle">{{item.isUnusual}}</div>
            </el-col>
            <el-col :span="4">
              <div class="fontStyle">{{item.inspResult}}</div>
            </el-col>
            <el-col :span="3">
              <div class="fontStyle">{{item.inspResultUnit}}</div>
            </el-col>
            <el-col :span="4">
              <div class="fontStyle">{{item.inspReferValue}}</div>
            </el-col>
          </el-row>
        </div>
      </div>
      <h2>
        <span>医嘱信息</span>
      </h2>
      <div class="box">
        <div class="content">
          <el-row :gutter="20">
            <el-col :span="24">
              <div class="fontStyle">筛选日期：
                <el-date-picker v-model="adviceTime" type="date" size="small"></el-date-picker>
              </div>
            </el-col>
          </el-row>
          <i class="wire-lg"></i>
          <el-row type="flex" justify="space-around">
            <el-col :span="7" style="font-weight:bold;">
              <div class="fontStyle">药品名称</div>
            </el-col>
            <el-col :span="3" style="font-weight:bold;">
              <div class="fontStyle">药品规格</div>
            </el-col>
            <el-col :span="2" style="font-weight:bold;">
              <div class="fontStyle">一次剂量</div>
            </el-col>
            <el-col :span="2" style="font-weight:bold;">
              <div class="fontStyle">使用频次</div>
            </el-col>
            <el-col :span="2" style="font-weight:bold;">
              <div class="fontStyle">用药途径</div>
            </el-col>
            <el-col :span="3" style="font-weight:bold;">
              <div class="fontStyle">开始日期</div>
            </el-col>
            <el-col :span="3" style="font-weight:bold;">
              <div class="fontStyle">结束日期</div>
            </el-col>
            <el-col :span="2" style="font-weight:bold;">
              <div class="fontStyle">开嘱医生</div>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-around" v-for="itemObj in hospitalInfo.doctorsAdviceList" :key="itemObj.adviceId">
            <el-col :span="7">
              <div class="fontStyle">{{itemObj.itemName}}</div>
            </el-col>
            <el-col :span="3">
              <div class="fontStyle">{{itemObj.drugSpec}}</div>
            </el-col>
            <el-col :span="2">
              <div class="fontStyle">{{itemObj.singleDose}}</div>
            </el-col>
            <el-col :span="2">
              <div class="fontStyle">{{itemObj.frequency}}</div>
            </el-col>
            <el-col :span="2">
              <div class="fontStyle">{{itemObj.drugWay}}</div>
            </el-col>
            <el-col :span="3">
              <div class="fontStyle">{{itemObj.nurseDoDate}}</div>
            </el-col>
            <el-col :span="3">
              <div class="fontStyle">{{itemObj.doctorStopTime}}</div>
            </el-col>
            <el-col :span="2">
              <div class="fontStyle">{{itemObj.doctorName}}</div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import surgeryInfo from '@/yimiviews/case/surgeryInfo'
import outpatient from '@/yimiviews/case/outpatient'
import inHospital from '@/yimiviews/case/inHospital'
export default {
  components: { surgeryInfo, outpatient, inHospital },
  props: ['hospitalInfo'],
  data() {
    return {
      activeTab: 'tab_0',
      adviceTime: ''
    }
  },
  mounted() {
    var CH = document.body.offsetHeight
    this.$refs.sectionBox.style.height = CH - 113 + 'px'
  },
  methods: {
    lookImg() {

    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../styles/case.scss";
.header {
  background-color: #f0f2f5;
  padding: 10px;
  margin: -20px -10px 10px;
  font-weight: 500;
  color: #000;
}
.content {
  padding-left: 10px;
}
.title {
  padding: 15px 0;
  color: #333;
}
.wire-lg {
  border: none;
  display: inline-block;
  width: 100%;
  height: 1px;
  background-color: rgba(242, 242, 242, 1);
  padding: 0;
  margin: 7px 0;
}
.el-row {
  padding: 5px 0;
}
.box {
  .el-row {
    .el-col {
      .fontStyle {
        font-size: 14px;
        color: #333;
      }
    }
  }
}
</style>


