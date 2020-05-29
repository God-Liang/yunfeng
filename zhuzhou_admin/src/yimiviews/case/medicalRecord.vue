<template>
  <div class="surgeryRecord" ref="sectionBox">
    <div class="sectionBox">
      <h2>
        <span>就诊信息</span>
      </h2>
      <div class="box">
        <el-row>
          <el-col :span="6">
            <div class="fontStyle">就诊日期：{{medicalRecordInfo.baseInfo.visitDate | fmtYMD}}</div>
          </el-col>
          <el-col :span="6">
            <div class="fontStyle">就诊类型：门诊</div>
          </el-col>
          <el-col :span="6">
            <div class="fontStyle">就诊医生：{{medicalRecordInfo.baseInfo.visitDoctor}}</div>
          </el-col>
          <el-col :span="6">
            <div class="fontStyle">就诊科室：{{medicalRecordInfo.baseInfo.visitDepartment}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="fontStyle">门诊诊断：{{medicalRecordInfo.baseInfo.visitDiagnosis}}</div>
          </el-col>
        </el-row>
        <i class="wire-lg"></i>
        <el-row>
          <el-col :span="24">
            <div class="fontStyle">现病史：测试数据</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="fontStyle">体格检查：测试数据</div>
          </el-col>
        </el-row>
      </div>
      <h2>
        <span>门诊处方</span>
      </h2>
      <div class="box" v-for="itemObj in medicalRecordInfo.prescriptionInfoList" :key="itemObj.prescriptionId">
        <div class="header">
          <el-row>
            <el-col :span="24">
              <div class="fontStyle">处方编号：{{itemObj.prescriptionId}}</div>
            </el-col>
          </el-row>
        </div>
        <div class="content">
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="fontStyle">处方类别：{{itemObj.prescrType}}</div>
            </el-col>
            <el-col :span="6">
              <div class="fontStyle">开单医生：{{itemObj.prescrDoctorName}}</div>
            </el-col>
            <el-col :span="6">
              <div class="fontStyle">开单日期：{{itemObj.prescrDate}}</div>
            </el-col>
            <el-col :span="6">
              <div class="fontStyle">开单科室：{{itemObj.prescrDepartment}}</div>
            </el-col>
          </el-row>
          <i class="wire-lg"></i>
          <el-row type="flex" justify="space-around">
            <el-col :span="8" style="font-weight:bold;">
              <div class="fontStyle">药品名称</div>
            </el-col>
            <el-col :span="5" style="font-weight:bold;">
              <div class="fontStyle">药品规格</div>
            </el-col>
            <el-col :span="3" style="font-weight:bold;">
              <div class="fontStyle">单次剂量</div>
            </el-col>
            <el-col :span="2" style="font-weight:bold;">
              <div class="fontStyle">总量</div>
            </el-col>
            <el-col :span="2" style="font-weight:bold;">
              <div class="fontStyle">使用频次</div>
            </el-col>
            <el-col :span="3" style="font-weight:bold;">
              <div class="fontStyle">用药途径</div>
            </el-col>
            <el-col :span="2" style="font-weight:bold;">
              <div class="fontStyle">药品剂型</div>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-around" v-for="item in itemObj.prescriptionItems" :key="item.drugCode">
            <el-col :span="8">
              <div class="fontStyle">{{item.drugName}}</div>
            </el-col>
            <el-col :span="5">
              <div class="fontStyle">{{item.drugSpec}}</div>
            </el-col>
            <el-col :span="3">
              <div class="fontStyle">{{item.singleDose}}</div>
            </el-col>
            <el-col :span="2">
              <div class="fontStyle">{{item.total}}</div>
            </el-col>
            <el-col :span="2">
              <div class="fontStyle">{{item.frequency}}</div>
            </el-col>
            <el-col :span="3">
              <div class="fontStyle">{{item.useDrugPath}}</div>
            </el-col>
            <el-col :span="2">
              <div class="fontStyle">{{item.drugType}}</div>
            </el-col>
          </el-row>
        </div>
      </div>
      <!--<h2>-->
        <!--<span>检查报告</span>-->
      <!--</h2>-->
      <!--<div class="box" v-for="itemObj in medicalRecordInfo.checkInfoList" :key="itemObj.checkId">-->
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
      <div class="box" v-for="itemObj in medicalRecordInfo.inspectInfoList" :key="itemObj.inspectionId">
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
          <el-row type="flex" justify="space-around" v-for="(item, index) in itemObj.inspectItems" :key="'detection' + index">
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
    </div>
  </div>
</template>
<script>
import surgeryInfo from '@/yimiviews/case/surgeryInfo'
import outpatient from '@/yimiviews/case/outpatient'
import inHospital from '@/yimiviews/case/inHospital'
export default {
  components: { surgeryInfo, outpatient, inHospital },
  props: ['medicalRecordInfo'],
  data() {
    return {
      activeTab: 'tab_0'
    }
  },
  mounted() {
    var CH = document.body.offsetHeight
    this.$refs.sectionBox.style.height = CH - 98 + 'px'
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


