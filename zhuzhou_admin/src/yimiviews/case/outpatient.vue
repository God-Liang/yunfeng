<template>
    <div class= 'outpatient'>
        <div class = 'sectionBox' ref="sectionBox">
            <h2>
                <span>就诊信息</span>
            </h2>
            <div class="box">
                <el-row :gutter="20">
                    <el-col :span="6"><div>就诊日期：{{record.medicalInfo.clinicDate}}</div></el-col>
                    <el-col :span="6"><div>就诊类型：{{record.medicalInfo.clinicType}}</div></el-col>
                    <el-col :span="6"><div>接诊医生：{{record.medicalInfo.doctor}}</div></el-col>
                    <el-col :span="6"><div>就诊科室：{{record.medicalInfo.clinicDepartment}}</div></el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="6"><div>门诊诊断：{{record.medicalInfo.clinicDiagnosis}}</div></el-col>
                    <el-col :span="6"><div>现病史: {{record.medicalInfo.hpi}}</div></el-col>
                    <el-col :span="6"><div>体格检查：{{record.medicalInfo.physicalCheck}}</div></el-col>
                </el-row>
            </div>

            <h2>
                <span>门诊处方</span>
            </h2>
            <div class="box" v-for="recipe in record.clinicRecipes" :key="recipe.id">
                <div class= 'header'>
                    <el-row :gutter="20">
                        <el-col :span="6"><div>处方号：{{recipe.prescription}}</div></el-col>
                    </el-row>
                </div>
                <el-row :gutter="20">
                    <el-col :span="6"><div>处方类别：{{recipe.prescriptionCategory}}</div></el-col>
                    <el-col :span="6"><div>开单医生： {{recipe.billedDoctor}}</div></el-col>
                    <el-col :span="6"><div>开方日期：{{recipe.dateOfPrescribing}}</div></el-col>
                    <el-col :span="6"><div>开单科室：{{recipe.billingDepartment}}</div></el-col>
                </el-row>
                <div class="boxTable">
                    <el-row :gutter="20">
                        <el-col :span="5" ><div>药品名称</div></el-col>
                        <el-col :span="4" ><div>药品规格</div></el-col>
                        <el-col :span="3" ><div>单次剂量</div></el-col>
                        <el-col :span="3" ><div>总量</div></el-col>
                        <el-col :span="3" ><div>使用频次</div></el-col>
                        <el-col :span="3" ><div>用药途径</div></el-col>
                        <el-col :span="3" ><div>药品剂型</div></el-col>
                    </el-row>
                    <el-row :gutter="20" v-for = 'item in recipe.itemList' :key="item.id">
                        <el-col :span="5" ><div>{{item.drugName}}</div></el-col>
                        <el-col :span="4" ><div>{{item.drugSpecifications}}</div></el-col>
                        <el-col :span="3" ><div>{{item.aSingleDose}}</div></el-col>
                        <el-col :span="3" ><div>{{item.theTotal}}</div></el-col>
                        <el-col :span="3" ><div>{{item.frequencyOfUsage}}</div></el-col>
                        <el-col :span="3" ><div>{{item.drugUseWay}}</div></el-col>
                        <el-col :span="3" ><div>{{item.pharmaceuticalDosageForms}}</div></el-col>
                    </el-row>
                </div>
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
            </div>
            <h2>
                <span>检验报告</span>
            </h2>
            <div class="box" v-for="report in record.inspectionReports" :key="'inspection_'+report.id">
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
                    <el-row :gutter="20" v-for = 'item in report.itemList' :key="'advice_'+item.id">
                        <el-col :span="5" ><div>{{item.project}}</div></el-col>
                        <el-col :span="5" ><div>{{item.abnormalSign}}</div></el-col>
                        <el-col :span="5" ><div>{{item.inspectionResultValue}}</div></el-col>
                        <el-col :span="5" ><div>{{item.inspectionUnitOfTheResultValue}}</div></el-col>
                        <el-col :span="4" ><div>{{item.referenceRange}}</div></el-col>
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
      items: [],
      items2: []
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


