<template>
    <div class= 'outpatient'>
        <div class = 'sectionBox' ref="sectionBox">
          <h2>
              <span>住院信息</span>
          </h2>
          <div class="box">
              <el-row :gutter="20">
                  <el-col :span="6"><div>住院号：{{record.medicalInfo.inTheHospital}}</div></el-col>
                  <el-col :span="6"><div>入院日期：{{record.medicalInfo.dateOfAdmission}}</div></el-col>
                  <el-col :span="6"><div>出院日期：{{record.medicalInfo.dischargeDate}}</div></el-col>
                  <el-col :span="6"><div>住院天数：{{record.medicalInfo.hospitalizationDays}}</div></el-col>
              </el-row>
              <el-row :gutter="20">
                  <el-col :span="6"><div>转归情况：{{record.medicalInfo.outcomeIs}}</div></el-col>
                  <el-col :span="6"><div>主治医生: {{record.medicalInfo.theAttendingPhysician}}</div></el-col>
                  <el-col :span="6"><div>入院科室：{{record.medicalInfo.hospitalDepartments}}</div></el-col>
                  <el-col :span="6"><div>病床号：{{record.medicalInfo.theBed}}</div></el-col>
              </el-row>
              <el-row :gutter="20">
                  <el-col :span="6"><div>入院诊断：{{record.medicalInfo.hospitalDiagnosis}}</div></el-col>
                  <el-col :span="6"><div>出院小结: {{record.medicalInfo.dischargeSummary}}</div></el-col>
              </el-row>
          </div>

          <h2>
              <span>住院手术</span>
          </h2>
          <div class="box">
              <el-row :gutter="20">
                  <el-col :span="6"><div>手术日期：{{record.inHosSurgerie.dateOfSurgery}}</div></el-col>
                  <el-col :span="6"><div>手术名称：{{record.inHosSurgerie.operationName}}</div></el-col>
                  <el-col :span="6"><div>手术医生：{{record.inHosSurgerie.theSurgeon}}</div></el-col>
                  <el-col :span="6"><div>麻醉方式：{{record.inHosSurgerie.anesthesia}}</div></el-col>
              </el-row>
              <el-row :gutter="20">
                  <el-col :span="6"><div>手术级别：{{record.inHosSurgerie.theOperationLevel}}</div></el-col>
                  <el-col :span="6"><div>切口愈合等级：{{record.inHosSurgerie.incisionHealingLevel}}</div></el-col>
                  <el-col :span="6"><div>麻醉医生：{{record.inHosSurgerie.theClinician}}</div></el-col>
              </el-row>
          </div>
          <h2>
              <span>检查报告</span>
          </h2>
          <div class="box" v-for="report in record.checkReports" :key="'check_'+report.id">
              <div class= 'header'>
                  <el-row :gutter="20">
                      <el-col :span="6"><div>报告单编号：{{report.eportCardNumber}}</div></el-col>
                  </el-row>
              </div>
              <el-row :gutter="20">
                  <el-col :span="6"><div>检查类别：{{report.checkTheCategories}}</div></el-col>
                  <el-col :span="6"><div>检查项目： {{report.checkTheProject}}</div></el-col>
                  <el-col :span="6"><div>报告时间：{{report.reportOnTime}}</div></el-col>
                  <el-col :span="6"><div>开单医生：{{report.billedForTheDoctor}}</div></el-col>
              </el-row>
              <el-row :gutter="20">
                  <el-col :span="6"><div>开单科室：{{report.billingDepartment}}</div></el-col>
              </el-row>
              <div class="boxTable">
                  <el-row :gutter="20">
                      <el-col :span="5" ><div>检查结果：{{report.checkTheResult}}</div></el-col>
                  </el-row>
                  <el-row :gutter="20">
                      <el-col :span="5" ><div>检查描述：{{report.checkTheDescription}}</div></el-col>
                  </el-row>
                  <el-row :gutter="20">
                      <el-col :span="5" ><div>图文报告：{{report.graphicReport}}</div></el-col>
                  </el-row>
              </div>
          </div>
          <h2>
              <span>检验报告</span>
          </h2>
          <div class="box"  v-for="report in record.inspectionReports" :key="'inspection_'+report.id">
              <div class= 'header'>
                  <el-row :gutter="20">
                      <el-col :span="6"><div>报告单编号：{{report.reportCardNumber}}</div></el-col>
                  </el-row>
              </div>
              <el-row :gutter="20">
                  <el-col :span="6"><div>检验项目： {{report.inspectionItems}}</div></el-col>
                  <el-col :span="6"><div>样本类型：{{report.sampleType}}</div></el-col>
                  <el-col :span="6"><div>报告时间：{{report.reportOnTime}}</div></el-col>
                  <el-col :span="6"><div>开单医生：{{report.billedForTheDoctor}}</div></el-col>
              </el-row>
              <el-row :gutter="20">
                  <el-col :span="6"><div>开单科室：{{report.billingDepartment}}</div></el-col>
              </el-row>
              <div class="boxTable">
                  <el-row :gutter="20">
                      <el-col :span="5" ><div>项目</div></el-col>
                      <el-col :span="5" ><div>异常标志</div></el-col>
                      <el-col :span="5" ><div>检验结果值</div></el-col>
                      <el-col :span="5" ><div>检验结果值单位</div></el-col>
                      <el-col :span="4" ><div>参考范围</div></el-col>
                  </el-row>
                  <el-row :gutter="20" v-for = 'item in report.itemList' :key="item.id">
                      <el-col :span="5" ><div>{{item.project}}</div></el-col>
                      <el-col :span="5" ><div>{{item.abnormalSign}}</div></el-col>
                      <el-col :span="5" ><div>{{item.inspectionResultValue}}</div></el-col>
                      <el-col :span="5" ><div>{{item.inspectionUnitOfTheResultValue}}</div></el-col>
                      <el-col :span="4" ><div>{{item.referenceRange}}</div></el-col>
                  </el-row>
              </div>
          </div>
          <h2>
              <span>医嘱信息</span>
          </h2>
          <div class="box">
              <el-form>
                  <el-date-picker
                      v-model="value1"
                      type="date"
                      placeholder="选择日期">
                  </el-date-picker>
              </el-form>
              <div class="boxTable">
                  <el-row :gutter="20">
                      <el-col :span="4" ><div>药品名称</div></el-col>
                      <el-col :span="4" ><div>药品规格</div></el-col>
                      <el-col :span="2" ><div>一次剂量</div></el-col>
                      <el-col :span="3" ><div>使用频次</div></el-col>
                      <el-col :span="2" ><div>用药途径</div></el-col>
                      <el-col :span="3" ><div>开始日期</div></el-col>
                      <el-col :span="3" ><div>结束日期</div></el-col>
                      <el-col :span="3" ><div>开嘱医生</div></el-col>
                  </el-row>
                  <el-row :gutter="20" v-for = 'item in record.adviceInfo' :key="'advice_'+item.id">
                      <el-col :span="4" ><div>{{item.drugName}}</div></el-col>
                      <el-col :span="4" ><div>{{item.drugSpecifications}}</div></el-col>
                      <el-col :span="2" ><div>{{item.aDose}}</div></el-col>
                      <el-col :span="3" ><div>{{item.frequencyOfUsage}}</div></el-col>
                      <el-col :span="2" ><div>{{item.drugUseWay}}</div></el-col>
                      <el-col :span="3" ><div>{{item.startDate}}</div></el-col>
                      <el-col :span="3" ><div>{{item.endDate}}</div></el-col>
                      <el-col :span="3" ><div>{{item.openToldTheDoctor}}</div></el-col>
                  </el-row>
              </div>
          </div>
        </div>
    </div>
</template>
<script>
import surgeryInfo from '@/yimiviews/case/surgeryInfo'
export default {
  components: { surgeryInfo },
  data() {
    return {
      activeTab: null,
      value1: ''
    }
  },
  props: {
    record: {}
  },
  mounted() {
    const CH = document.body.offsetHeight
    this.$refs.sectionBox.style.height = CH - 225 + 'px'
  }
}
</script>
<style lang="scss" scoped>
@import '../../styles/case.scss';
.boxTable{
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    padding: 10px 0;
}
    .header{
        background-color: #f0f2f5;
        padding:10px;
        margin:-20px -10px 10px;
        font-weight: 500;
        color: #000;
    }
    .title{
        padding: 15px 0;
        color: #333;
    }
    .el-row{
        padding: 5px 0;
        .el-col{
            min-height: 18px;
        }
    }
</style>


