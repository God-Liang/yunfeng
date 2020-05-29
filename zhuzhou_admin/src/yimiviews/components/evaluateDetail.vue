<template>
  <div class="anesthesiaEvaluation">
    <div slot="footer" class="dialog-footer clearfix">
      <div style="float: left; line-height: 32px;padding-left: 12px;">
        评估详情
        <!-- <span style="color: #999;font-size:12px;">基本信息补充与手术信息确认</span> -->
      </div>
      <div style="float: right;">
        <el-button type="danger" class="buttonRadius auditColor" @click="doPrint">打印</el-button>
      </div>
    </div>
    <div class="scrollWrap" ref="imageWrapper">
      <div class="anesthesiaForm" style="padding: 20px;width: 650px;margin: 0 auto;background-color: #fff;">
        <h1 style="font-size: 16px;margin: 0 0 10px;letter-spacing: 6px;line-height: 20px;text-align: center;padding: 0;color: #333333;">株洲市中心医院</h1>
        <h3 style="font-size: 16px;margin: 0;letter-spacing: 6px;line-height: 20px;text-align: center;padding: 0;color: #333333;">麻醉术前访视记录</h3>
        <div style="width: 100%;display: inline-block;text-align: right;margin: 0 0 10px;">
          <span style="font-weight: normal;font-size: 13px;color: #333;width: 18%;text-align: left;display: inline-block;">住院号：{{anesthesiaForm.inHospNo}}</span>
        </div>
        <div style="padding-bottom: 8px;border-bottom: 1px dashed #D8D8D8;overflow: hidden;">
          <span style="font-weight: normal;font-size: 13px;color: #333;width: 18%;display: inline-block;float: left;">姓名：{{anesthesiaForm.patientName}}</span>
          <span style="font-weight: normal;font-size: 13px;color: #333;width: 15%;display: inline-block;float: left;">性别：{{anesthesiaForm.sexShow}}</span>
          <span style="font-weight: normal;font-size: 13px;color: #333;width: 15%;display: inline-block;float: left;">年龄：{{anesthesiaForm.age}}</span>
          <span style="font-weight: normal;font-size: 13px;color: #333;width: 31%;display: inline-block;float: left;">科室：{{anesthesiaForm.registerDept}}</span>
          <span style="font-weight: normal;font-size: 13px;color: #333;width: 18%;display: inline-block;float: right;">床号：{{anesthesiaForm.wardBedNo}}</span>
        </div>
        <div style="padding: 10px 0;">
          <div style="height: 30px;line-height: 30px;font-size: 13px;color: #333;font-weight: bold;">术前诊断：<span style="font-weight: normal;">{{anesthesiaForm.beforeDiagnosis}}</span></div>
          <div style="height: 30px;line-height: 30px;font-size: 13px;color: #333;font-weight: bold;">拟施手术：<span style="font-weight: normal;">{{anesthesiaForm.operationName}}</span></div>
          <div style="height: 30px;line-height: 30px;font-size: 13px;color: #333;font-weight: bold;">拟施麻醉：<span style="font-weight: normal;">{{anesthesiaForm.anesthetistTypeShow}}</span></div>
        </div>
        <div class="illnessInfo">
          <h5 style="margin: 0;font-size: 13px;line-height: 32px;color: #333;font-weight: normal;">一、患者情况评估：</h5>
          <p style="margin: 0;font-size: 13px;line-height: 30px;color: #333;">
            病史： 心脏管病史<span style="font-weight: normal;padding-right: 15px;"><input style="display: inline-block;margin-left: 15px;margin-right: 4px;" type="checkbox" name="medicalHistory" disabled :value="1">有<input style="display: inline-block;margin-left: 15px;margin-right: 4px;" type="checkbox" name="medicalHistory" disabled :value="0">无</span>
            呼吸系统病史<span style="font-weight: normal;padding-right: 15px;"><input style="display: inline-block;margin-left: 15px;margin-right: 4px;" type="checkbox" name="breathHistory" disabled :value="1">有<input style="display: inline-block;margin-left: 15px;margin-right: 4px;" type="checkbox" name="breathHistory" disabled :value="0">无</span>
            过敏史<span style="font-weight: normal;padding-right: 15px;"><input style="display: inline-block;margin-left: 15px;margin-right: 4px;" type="checkbox" name="allergyHistory" disabled :value="1">有<input style="display: inline-block;margin-left: 15px;margin-right: 4px;" type="checkbox" name="allergyHistory" disabled :value="0">无</span>
          </p>
          <p style="margin: 0;font-size: 13px;line-height: 30px;color: #333;">
            药物应用史<span style="font-weight: normal;padding-right: 15px;"><input style="display: inline-block;margin-left: 15px;margin-right: 4px;" type="checkbox" name="medicineHistory" disabled :value="1">有<input style="display: inline-block;margin-left: 15px;margin-right: 4px;" type="checkbox" name="medicineHistory" disabled :value="0">无</span>
            糖尿病史<span style="font-weight: normal;padding-right: 15px;"><input style="display: inline-block;margin-left: 15px;margin-right: 4px;" type="checkbox" name="diabetesHistory" disabled :value="1">有<input style="display: inline-block;margin-left: 15px;margin-right: 4px;" type="checkbox" name="diabetesHistory" disabled :value="0">无</span>
            麻醉手术史<span style="font-weight: normal;padding-right: 15px;"><input style="display: inline-block;margin-left: 15px;margin-right: 4px;" type="checkbox" name="anesthesiaHistory" disabled :value="1">有<input style="display: inline-block;margin-left: 15px;margin-right: 4px;" type="checkbox" name="anesthesiaHistory" disabled :value="0">无</span>等
          </p>
          <p style="margin: 0;font-size: 13px;line-height: 30px;color: #333;">
            患者基本情况： 血压 <span style="font-weight: normal;padding-right: 15px;"> <span style="display: inline-block;border-top: 0px;border-left: 0px;border-right: 0px;border-bottom: 1px solid #333333;outline: none;width: 75px;line-height: 14px;text-align: center;">{{anesthesiaForm.bloodPressure1}}</span> mmHg</span>
            血压 <span style="font-weight: normal;padding-right: 15px;"> <span style="display: inline-block;border-top: 0px;border-left: 0px;border-right: 0px;border-bottom: 1px solid #333333;outline: none;width: 75px;line-height: 14px;text-align: center;">{{anesthesiaForm.bloodPressure2}}</span> 次/分</span>
            呼吸 <span style="font-weight: normal;padding-right: 15px;"> <span style="display: inline-block;border-top: 0px;border-left: 0px;border-right: 0px;border-bottom: 1px solid #333333;outline: none;width: 75px;line-height: 14px;text-align: center;">{{anesthesiaForm.breathing}}</span> 次/分</span>
          </p>
          <p style="margin: 0;font-size: 13px;line-height: 30px;color: #333;">
            器官功能情况： 正常<span style="font-weight: normal;padding-right: 15px;"><input style="display: inline-block;margin-left: 15px;margin-right: 4px;" type="checkbox" name="organNormal" disabled :value="1">是<input style="display: inline-block;margin-left: 15px;margin-right: 4px;" type="checkbox" name="organNormal" disabled :value="0">否</span>
            异常<span style="font-weight: normal;padding-right: 15px;"><input style="display: inline-block;margin-left: 15px;margin-right: 4px;" type="checkbox" name="notNormalOrgan" disabled :value="1">轻<input style="display: inline-block;margin-left: 15px;margin-right: 4px;" type="checkbox" name="notNormalOrgan" disabled :value="2">中<input style="display: inline-block;margin-left: 15px;margin-right: 4px;" type="checkbox" name="notNormalOrgan" disabled :value="3">重</span>
          </p>
          <p style="margin: 0;font-size: 13px;line-height: 30px;color: #333;">其他情况：</p>
          <p style="margin: 0;font-size: 13px;line-height: 30px;color: #333;">
            <span name="otherSituation" id="otherSituation" style="display: block;width: 100%;resize: none;height:90px;border:0;outline:none;">{{anesthesiaForm.otherSituation}}</span>
          </p>
          <p style="margin: 0;font-size: 13px;line-height: 30px;color: #333;">麻醉分级及依据：</p>
          <p style="margin: 0;font-size: 13px;line-height: 30px;color: #333;">麻醉前评估分级为 <span style="font-weight: normal;padding-right: 0px;"><span style="display: inline-block;border-top: 0px;border-left: 0px;border-right: 0px;border-bottom: 1px solid #333333;outline: none;width: 75px;line-height: 14px;text-align: center;">{{anesthesiaForm.beforeAssessmentLevel}}</span> 级，</span>分级依据：</p>
          <p style="margin: 0;font-size: 13px;line-height: 30px;color: #333;">1、患者全身情况评估分级为 <span style="font-weight: normal;padding-right: 15px;"> <span style="display: inline-block;border-top: 0px;border-left: 0px;border-right: 0px;border-bottom: 1px solid #333333;outline: none;width: 75px;line-height: 14px;text-align: center;">{{anesthesiaForm.patientsAll}}</span> 级。</span></p>
          <p style="margin: 0;font-size: 13px;line-height: 30px;color: #333;">2、手术分级为 <span style="font-weight: normal;padding-right: 15px;"><span style="display: inline-block;border-top: 0px;border-left: 0px;border-right: 0px;border-bottom: 1px solid #333333;outline: none;width: 75px;line-height: 14px;text-align: center;">{{anesthesiaForm.surgeryAssessmentLevel}}</span> 级。</span></p>
          <p style="margin: 0;font-size: 13px;line-height: 30px;color: #333;">3、患者年龄为 <span style="font-weight: normal;padding-right: 15px;"><span style="display: inline-block;border-top: 0px;border-left: 0px;border-right: 0px;border-bottom: 1px solid #333333;outline: none;width: 75px;line-height: 14px;text-align: center;">{{anesthesiaForm.patientsAge}}</span></span></p>
          <p style="margin: 0;font-size: 13px;line-height: 30px;color: #333;">
            麻醉风险评估：麻醉前评估分级为 <span style="font-weight: normal;padding-right: 0px;"><span style="display: inline-block;border-top: 0px;border-left: 0px;border-right: 0px;border-bottom: 1px solid #333333;outline: none;width: 50px;line-height: 14px;text-align: center;">{{anesthesiaForm.riskAssessmentLevel}}</span>级，</span>
            在有效检测和监管下，麻醉危险性：<span style="font-weight: normal;padding-right: 15px;"><input style="margin-left: 0px;display: inline-block;margin-right: 4px;" type="checkbox" name="dangerous" disabled :value="1">轻<input type="checkbox" name="dangerous" style="display: inline-block;margin-right: 4px;margin-left: 10px;" disabled :value="2">中<input type="checkbox" name="dangerous" style="display: inline-block;margin-right: 4px;margin-left: 10px;" disabled :value="3">重</span>
          </p>
          <h5 style="margin: 0;font-size: 13px;line-height: 32px;color: #333;font-weight: normal;">二、麻醉计划：</h5>
          <p style="margin: 0;font-size: 13px;line-height: 30px;color: #333;">
            麻醉监测：<span style="font-weight: normal;padding-right: 15px;"><input style="display: inline-block;margin-left: 0px;margin-right: 4px;" type="checkbox" disabled :value="0" name="anesthesiaDetection">无创血压监测
              <input :value="1" disabled type="checkbox" name="anesthesiaDetection" style="margin-left: 8px;margin-right: 4px;display: inline-block;">心电图
              <input :value="2" disabled type="checkbox" name="anesthesiaDetection" style="margin-left: 8px;margin-right: 4px;display: inline-block;">脉搏血氧饱和度（sp02）
              <input :value="3" disabled type="checkbox" name="anesthesiaDetection" style="margin-left: 0px;margin-right: 4px;display: inline-block;">体温
              <input :value="4" disabled type="checkbox" name="anesthesiaDetection" style="margin-left: 8px;margin-right: 4px;display: inline-block;">尿量
              <input :value="5" disabled type="checkbox" name="anesthesiaDetection" style="margin-left: 8px;margin-right: 4px;display: inline-block;">有创血压监测<br>
              <input :value="6" disabled type="checkbox" name="anesthesiaDetection" style="margin-left: 65px;margin-right: 4px;display: inline-block;">中心静脉检测
              <input :value="7" disabled type="checkbox" name="anesthesiaDetection" style="margin-left: 8px;margin-right: 4px;display: inline-block;">血气分析
              <input :value="8" disabled type="checkbox" name="anesthesiaDetection" style="margin-left: 8px;margin-right: 4px;display: inline-block;">肌送检测
            </span>
          </p>
          <p style="margin: 0;font-size: 13px;line-height: 30px;color: #333;">
            麻醉有关的措施：<span style="font-weight: normal;padding-right: 15px;"><input type="checkbox" disabled :value="0" name="anesthesiaMeasures" style="margin-left: 0px;margin-right: 4px;display: inline-block;">气管内插管
              <input type="checkbox" disabled :value="1" name="anesthesiaMeasures" style="margin-left: 10px;margin-right: 4px;display: inline-block;">吼罩
              <input type="checkbox" disabled :value="2" name="anesthesiaMeasures" style="margin-left: 10px;margin-right: 4px;display: inline-block;">动脉穿刺
              <input type="checkbox" disabled :value="3" name="anesthesiaMeasures" style="margin-left: 10px;margin-right: 4px;display: inline-block;">中心静脉穿刺
              <input type="checkbox" disabled :value="4" name="anesthesiaMeasures" style="margin-left: 10px;margin-right: 4px;display: inline-block;">蛛网膜下腔穿刺（腰麻）<br>
              <input type="checkbox" disabled :value="5" name="anesthesiaMeasures" style="margin-left: 104px;margin-right: 4px;display: inline-block;">硬膜外置管
              <input type="checkbox" disabled :value="6" name="anesthesiaMeasures" style="margin-left: 10px;margin-right: 4px;display: inline-block;">控制性降压
              <input type="checkbox" disabled :value="7" name="anesthesiaMeasures" style="margin-left: 10px;margin-right: 4px;display: inline-block;">低温
              <input type="checkbox" disabled :value="8" name="anesthesiaMeasures" style="margin-left: 10px;margin-right: 4px;display: inline-block;">自体血回输
              <input type="checkbox" disabled :value="9" name="anesthesiaMeasures" style="margin-left: 10px;margin-right: 4px;display: inline-block;">神经阻滞
            </span>
          </p>
          <p style="margin: 0;font-size: 13px;line-height: 30px;color: #333;">其他：</p>
          <p style="margin: 0;font-size: 13px;line-height: 30px;color: #333;">
            <span name="anesthesiaOther" id="anesthesiaOther" style="width: 100%;resize: none;height:60px;border:0;outline:none;display:block;">{{anesthesiaForm.anesthesiaOther}}</span>
          </p>
          <p style="margin-right:30px;text-align:right;font-size: 13px;line-height: 30px;color: #333;">
            麻醉师签名：<span style="font-weight: normal;padding-right: 15px;"> <input type="text" style="width: 90px;display: inline-block;border-top: 0px;border-left: 0px;border-right: 0px;border-bottom: 1px solid #333333;outline: none;"></span>
          </p>
          <p style="margin-right:30px;text-align:right;font-size: 13px;line-height: 30px;color: #333;">
            日期：<span style="font-weight: normal;padding-right: 15px;"> <input type="text" style="width: 90px;display: inline-block;border-top: 0px;border-left: 0px;border-right: 0px;border-bottom: 1px solid #333333;outline: none;"></span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { getDetail } from '@/api/appointmentManage/anesthesia'
  export default {
    name: 'anesthesiaEvaluation',
    created() {},
    mounted() {
      if (this.$route.params.id) {
        // 评估详情
        getDetail(parseInt(this.$route.params.id)).then(res => {
          if (res.data.code === 200) {
            this.anesthesiaForm = JSON.parse(res.data.formResult.jsonResult)
            this.isAssignment('medicalHistory', this.anesthesiaForm.medicalHistory)
            this.isAssignment('breathHistory', this.anesthesiaForm.breathHistory)
            this.isAssignment('allergyHistory', this.anesthesiaForm.allergyHistory)
            this.isAssignment('medicineHistory', this.anesthesiaForm.medicineHistory)
            this.isAssignment('diabetesHistory', this.anesthesiaForm.diabetesHistory)
            this.isAssignment('anesthesiaHistory', this.anesthesiaForm.anesthesiaHistory)
            this.isAssignment('organNormal', this.anesthesiaForm.organNormal)
            this.isAssignment('notNormalOrgan', this.anesthesiaForm.notNormalOrgan)
            this.isAssignment('dangerous', this.anesthesiaForm.dangerous)
            this.isArrAssignment('anesthesiaDetection', this.anesthesiaForm.anesthesiaDetection)
            this.isArrAssignment('anesthesiaMeasures', this.anesthesiaForm.anesthesiaMeasures)
          }
        })
      }
    },
    data() {
      return {
        isOne: true,
        anesthesiaForm: {
          patientName: '', // 姓名
          sexShow: '', // 性别
          age: '', // 年龄
          bedNumber: '', // 床号
          beforeDiagnosis: '', // 术前诊断
          anesthetistTypeShow: '', // 麻醉方式
          operationName: '', // 手术名称
          wardBedNo: '', // 床号
          inHospNo: '', // 住院号
          visitDepartment: '', // 科室
          registerDept: '', // 主刀医生科室
          appointId: '',
          medicalHistory: null, // 心脏管病史
          breathHistory: null, // 呼吸系统病史
          allergyHistory: null, // 过敏史
          medicineHistory: null, // 药物应用史
          diabetesHistory: null, // 糖尿病史
          anesthesiaHistory: null, // 麻醉手术史
          bloodPressure1: '', // 血压
          bloodPressure2: '', // 血压
          breathing: '', // 呼吸
          organNormal: null, // 器官功能情况:正常
          notNormalOrgan: null, // 器官功能情况:异常
          otherSituation: '', // 其他情况
          beforeAssessmentLevel: '', // 麻醉前评估等级
          patientsAll: '', // 患者全身评估等级
          surgeryAssessmentLevel: '', // 手术评估等级
          patientsAge: '', // 患者年龄
          riskAssessmentLevel: '', // 风险评估等级
          anesthesiaDetection: '', // 麻醉检测
          anesthesiaMeasures: '', // 麻醉有关的措施
          dangerous: null, // 危险性
          anesthesiaOther: '' // 麻醉其他
        }
      }
    },
    methods: {
      doPrint() {
        const printHtml = document.querySelector('.scrollWrap').innerHTML
        const wind = window.open('', 'newwindow', 'height=400, width=800, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no')
        wind.document.body.innerHTML = printHtml
        wind.print()
        return false
      },
      anesthesiaMeasuresChange() {
        const anesthesiaMeasures = document.getElementsByName('anesthesiaMeasures')
        const anesthesiaMeasuresChecked = []
        for (var i = 0; i < anesthesiaMeasures.length; i++) {
          if (anesthesiaMeasures[i].checked) {
            anesthesiaMeasuresChecked.push(anesthesiaMeasures[i].value)
          }
        }
        this.anesthesiaForm.anesthesiaMeasures = anesthesiaMeasuresChecked === [] ? '' : anesthesiaMeasuresChecked.join(',')
      },
      anesthesiaDetectionChange() {
        const anesthesiaDetection = document.getElementsByName('anesthesiaDetection')
        const anesthesiaDetectionChecked = []
        for (var i = 0; i < anesthesiaDetection.length; i++) {
          if (anesthesiaDetection[i].checked) {
            anesthesiaDetectionChecked.push(anesthesiaDetection[i].value)
          }
        }
        this.anesthesiaForm.anesthesiaDetection = anesthesiaDetectionChecked === [] ? '' : anesthesiaDetectionChecked.join(',')
      },
      cancel() {
        this.$root.closeTag()
      },
      isAssignment(name, result) {
        const names = document.getElementsByName(name)
        for (var i = 0; i < names.length; i++) {
          if (parseInt(names[i].value) === result) {
            names[i].setAttribute('checked', 'checked')
          }
        }
      },
      isArrAssignment(name, result) {
        const names = document.getElementsByName(name)
        const results = result === '' ? [] : result.split(',')
        for (var i = 0; i < names.length; i++) {
          for (var j = 0; j < results.length; j++) {
            if (parseInt(names[i].value) === parseInt(results[j])) {
              names[i].setAttribute('checked', 'checked')
            }
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .anesthesiaEvaluation {
    height: 100%;
    background-color: #f0f2f5;
    padding: 0 15px 15px;
    .dialog-footer {
      padding: 10px 15px;
      background-color: #fff;
      margin: 0 -15px 15px;
    }
    .scrollWrap {
      height: calc(100% - 86px);
      overflow: auto;
      .anesthesiaForm {
        padding: 20px;
        width: 645px;
        h1 {
          font-size: 16px;
          margin: 0 0 10px;
          letter-spacing: 6px;
          line-height: 20px;
          text-align: center;
          padding: 0;
          color: #333333;
        }
        h3 {
          font-size: 16px;
          margin: 0 0 20px;
          line-height: 20px;
          letter-spacing: 6px;
          text-align: center;
          padding: 0;
          color: #333333;
        }
        .patientInfo {
          position: relative;
          padding-bottom: 10px;
          border-bottom: 1px dashed #D8D8D8;
          span {
            font-weight: normal;
            font-size: 13px;
            color: #333;
            width: 102px;
            display: inline-block;
            &.hospital {
              position: absolute;
              top: -24px;
              right: 0px;
            }
            &.department {
              width: 164px;
            }
          }
        }
        .surgeryInfo {
          padding: 10px 0;
          .infoCon {
            height: 32px;
            line-height: 32px;
            font-size: 13px;
            color: #333;
            font-weight: bold;
            span {
              font-weight: normal;
            }
          }
        }
        .illnessInfo {
          h5 {
            margin: 0;
            font-size: 13px;
            line-height: 32px;
            color: #333;
            font-weight: normal;
          }
          p {
            margin: 0;
            font-size: 13px;
            line-height: 32px;
            color: #333;
            label {
              font-weight: normal;
              padding-right: 15px;
              input[type="checkbox"] {
                display: inline-block;
                margin-left: 15px;
                margin-right: 4px;
              }
              input[type="text"] {
                display: inline-block;
                border-top: 0px;
                border-left: 0px;
                border-right: 0px;
                border-bottom: 1px solid #333333;
                outline: none;
                width: 75px;
              }
            }
          }
        }
      }
    }
  }
.buttonRadius {
  border-radius: 0;
  width: 90px;
  border: 0;
  color: #fff;
}
.sumbitColor {
  background-color: #0270f5;
}
.saveColor {
  background-color: #f5a623;
}
.auditColor {
  background-color: #ff5555;
}
</style>

