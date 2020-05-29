<template>
  <div class="anesthesiaEvaluation">
    <div slot="footer" class="dialog-footer clearfix">
      <div style="float: left; line-height: 32px;padding-left: 12px;">
        麻醉评估
        <span style="color: #999;font-size:12px;">麻醉术前访视记录</span>
      </div>
      <div style="float: right;">
        <el-button type="primary" class="buttonRadius sumbitColor" @click="submitForm">提交</el-button>
      </div>
    </div>
    <div class="scrollWrap">
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
            病史： 心脏管病史<span style="font-weight: normal;padding-right: 15px;"><input style="display: inline-block;margin-left: 15px;margin-right: 4px;" type="checkbox" name="medicalHistory" :checked="anesthesiaForm.medicalHistory === 1" @change="isOne ? anesthesiaForm.medicalHistory=1 : anesthesiaForm.medicalHistory=null" :value="1">有<input style="display: inline-block;margin-left: 15px;margin-right: 4px;" type="checkbox" name="medicalHistory" :checked="anesthesiaForm.medicalHistory === 0" @change="isOne ? anesthesiaForm.medicalHistory=0 : anesthesiaForm.medicalHistory=null" :value="0">无</span>
            呼吸系统病史<span style="font-weight: normal;padding-right: 15px;"><input style="display: inline-block;margin-left: 15px;margin-right: 4px;" type="checkbox" name="breathHistory" :checked="anesthesiaForm.breathHistory === 1" @change="anesthesiaForm.breathHistory=1">有<input style="display: inline-block;margin-left: 15px;margin-right: 4px;" type="checkbox" name="breathHistory" :checked="anesthesiaForm.breathHistory === 0" @change="anesthesiaForm.breathHistory=0">无</span>
            过敏史<span style="font-weight: normal;padding-right: 15px;"><input style="display: inline-block;margin-left: 15px;margin-right: 4px;" type="checkbox" name="allergyHistory" :checked="anesthesiaForm.allergyHistory === 1" @change="anesthesiaForm.allergyHistory=1">有<input style="display: inline-block;margin-left: 15px;margin-right: 4px;" type="checkbox" name="allergyHistory" :checked="anesthesiaForm.allergyHistory === 0" @change="anesthesiaForm.allergyHistory=0">无</span>
          </p>
          <p style="margin: 0;font-size: 13px;line-height: 30px;color: #333;">
            药物应用史<span style="font-weight: normal;padding-right: 15px;"><input style="display: inline-block;margin-left: 15px;margin-right: 4px;" type="checkbox" name="medicineHistory" :checked="anesthesiaForm.medicineHistory === 1" @change="anesthesiaForm.medicineHistory=1">有<input style="display: inline-block;margin-left: 15px;margin-right: 4px;" type="checkbox" name="medicineHistory" :checked="anesthesiaForm.medicineHistory === 0" @change="anesthesiaForm.medicineHistory=0">无</span>
            糖尿病史<span style="font-weight: normal;padding-right: 15px;"><input style="display: inline-block;margin-left: 15px;margin-right: 4px;" type="checkbox" name="diabetesHistory" :checked="anesthesiaForm.diabetesHistory === 1" @change="anesthesiaForm.diabetesHistory=1">有<input style="display: inline-block;margin-left: 15px;margin-right: 4px;" type="checkbox" name="diabetesHistory" :checked="anesthesiaForm.diabetesHistory === 0" @change="anesthesiaForm.diabetesHistory=0">无</span>
            麻醉手术史<span style="font-weight: normal;padding-right: 15px;"><input style="display: inline-block;margin-left: 15px;margin-right: 4px;" type="checkbox" name="anesthesiaHistory" :checked="anesthesiaForm.anesthesiaHistory === 1" @change="anesthesiaForm.anesthesiaHistory=1">有<input style="display: inline-block;margin-left: 15px;margin-right: 4px;" type="checkbox" name="anesthesiaHistory" :checked="anesthesiaForm.anesthesiaHistory === 0" @change="anesthesiaForm.anesthesiaHistory=0">无</span>等
          </p>
          <p style="margin: 0;font-size: 13px;line-height: 30px;color: #333;">
            患者基本情况： 血压 <span style="font-weight: normal;padding-right: 15px;"> <input style="display: inline-block;border-top: 0px;border-left: 0px;border-right: 0px;border-bottom: 1px solid #333333;outline: none;width: 75px;" v-model="anesthesiaForm.bloodPressure1" type="text"> mmHg</span>
            血压 <span style="font-weight: normal;padding-right: 15px;"> <input style="display: inline-block;border-top: 0px;border-left: 0px;border-right: 0px;border-bottom: 1px solid #333333;outline: none;width: 75px;" v-model="anesthesiaForm.bloodPressure2" type="text"> 次/分</span>
            呼吸 <span style="font-weight: normal;padding-right: 15px;"> <input style="display: inline-block;border-top: 0px;border-left: 0px;border-right: 0px;border-bottom: 1px solid #333333;outline: none;width: 75px;" v-model="anesthesiaForm.breathing" type="text"> 次/分</span>
          </p>
          <p style="margin: 0;font-size: 13px;line-height: 30px;color: #333;">
            器官功能情况： 正常<span style="font-weight: normal;padding-right: 15px;"><input style="display: inline-block;margin-left: 15px;margin-right: 4px;" type="checkbox" name="organNormal" :checked="anesthesiaForm.organNormal === 1" @change="anesthesiaForm.organNormal=1">是<input style="display: inline-block;margin-left: 15px;margin-right: 4px;" type="checkbox" name="organNormal" :checked="anesthesiaForm.organNormal === 0" @change="anesthesiaForm.organNormal=0">否</span>
            异常<span style="font-weight: normal;padding-right: 15px;"><input style="display: inline-block;margin-left: 15px;margin-right: 4px;" type="checkbox" name="notNormalOrgan" :checked="anesthesiaForm.notNormalOrgan === 1" @change="anesthesiaForm.notNormalOrgan=1">轻<input style="display: inline-block;margin-left: 15px;margin-right: 4px;" type="checkbox" name="notNormalOrgan" :checked="anesthesiaForm.notNormalOrgan === 2" @change="anesthesiaForm.notNormalOrgan=2">中<input style="display: inline-block;margin-left: 15px;margin-right: 4px;" type="checkbox" name="notNormalOrgan" :checked="anesthesiaForm.notNormalOrgan === 3" @change="anesthesiaForm.notNormalOrgan=3">重</span>
          </p>
          <p style="margin: 0;font-size: 13px;line-height: 30px;color: #333;">其他情况：</p>
          <p style="margin: 0;font-size: 13px;line-height: 30px;color: #333;">
            <textarea name="otherSituation" id="otherSituation" v-model="anesthesiaForm.otherSituation" style="width: 100%;resize: none;height:90px;border:0;outline:none;"></textarea>
          </p>
          <p style="margin: 0;font-size: 13px;line-height: 30px;color: #333;">麻醉分级及依据：</p>
          <p style="margin: 0;font-size: 13px;line-height: 30px;color: #333;">麻醉前评估分级为 <span style="font-weight: normal;padding-right: 0px;"><input style="display: inline-block;border-top: 0px;border-left: 0px;border-right: 0px;border-bottom: 1px solid #333333;outline: none;width: 75px;" type="text" v-model="anesthesiaForm.beforeAssessmentLevel"> 级，</span>分级依据：</p>
          <p style="margin: 0;font-size: 13px;line-height: 30px;color: #333;">1、患者全身情况评估分级为 <span style="font-weight: normal;padding-right: 15px;"> <input style="display: inline-block;border-top: 0px;border-left: 0px;border-right: 0px;border-bottom: 1px solid #333333;outline: none;width: 75px;" type="text" v-model="anesthesiaForm.patientsAll"> 级。</span></p>
          <p style="margin: 0;font-size: 13px;line-height: 30px;color: #333;">2、手术分级为 <span style="font-weight: normal;padding-right: 15px;"><input style="display: inline-block;border-top: 0px;border-left: 0px;border-right: 0px;border-bottom: 1px solid #333333;outline: none;width: 75px;" type="text" v-model="anesthesiaForm.surgeryAssessmentLevel"> 级。</span></p>
          <p style="margin: 0;font-size: 13px;line-height: 30px;color: #333;">3、患者年龄为 <span style="font-weight: normal;padding-right: 15px;"><input style="display: inline-block;border-top: 0px;border-left: 0px;border-right: 0px;border-bottom: 1px solid #333333;outline: none;width: 75px;" type="text" v-model="anesthesiaForm.patientsAge"></span></p>
          <p style="margin: 0;font-size: 13px;line-height: 30px;color: #333;">
            麻醉风险评估：麻醉前评估分级为 <span style="font-weight: normal;padding-right: 0px;"><input v-model="anesthesiaForm.riskAssessmentLevel" type="text" style="display: inline-block;border-top: 0px;border-left: 0px;border-right: 0px;border-bottom: 1px solid #333333;outline: none;width: 50px;"> 级，</span>
            在有效检测和监管下，麻醉危险性：<span style="font-weight: normal;padding-right: 15px;"><input style="margin-left: 0px;display: inline-block;margin-right: 4px;" type="checkbox" name="dangerous" :checked="anesthesiaForm.dangerous === 1" @change="anesthesiaForm.dangerous=1">轻<input type="checkbox" name="dangerous" style="display: inline-block;margin-right: 4px;margin-left: 10px;" :checked="anesthesiaForm.dangerous === 2" @change="anesthesiaForm.dangerous=2">中<input type="checkbox" name="dangerous" style="display: inline-block;margin-right: 4px;margin-left: 10px;" :checked="anesthesiaForm.dangerous === 3" @change="anesthesiaForm.dangerous=3">重</span>
          </p>
          <h5 style="margin: 0;font-size: 13px;line-height: 32px;color: #333;font-weight: normal;">二、麻醉计划：</h5>
          <p style="margin: 0;font-size: 13px;line-height: 30px;color: #333;">
            麻醉监测：<span style="font-weight: normal;padding-right: 15px;"><input style="display: inline-block;margin-left: 0px;margin-right: 4px;" type="checkbox" :value="0" @change="anesthesiaDetectionChange" name="anesthesiaDetection">无创血压监测
              <input :value="1" @change="anesthesiaDetectionChange" type="checkbox" name="anesthesiaDetection" style="margin-left: 8px;margin-right: 4px;display: inline-block;">心电图
              <input :value="2" @change="anesthesiaDetectionChange" type="checkbox" name="anesthesiaDetection" style="margin-left: 8px;margin-right: 4px;display: inline-block;">脉搏血氧饱和度（sp02）
              <input :value="3" @change="anesthesiaDetectionChange" type="checkbox" name="anesthesiaDetection" style="margin-left: 0px;margin-right: 4px;display: inline-block;">体温
              <input :value="4" @change="anesthesiaDetectionChange" type="checkbox" name="anesthesiaDetection" style="margin-left: 8px;margin-right: 4px;display: inline-block;">尿量
              <input :value="5" @change="anesthesiaDetectionChange" type="checkbox" name="anesthesiaDetection" style="margin-left: 8px;margin-right: 4px;display: inline-block;">有创血压监测<br>
              <input :value="6" @change="anesthesiaDetectionChange" type="checkbox" name="anesthesiaDetection" style="margin-left: 65px;margin-right: 4px;display: inline-block;">中心静脉检测
              <input :value="7" @change="anesthesiaDetectionChange" type="checkbox" name="anesthesiaDetection" style="margin-left: 8px;margin-right: 4px;display: inline-block;">血气分析
              <input :value="8" @change="anesthesiaDetectionChange" type="checkbox" name="anesthesiaDetection" style="margin-left: 8px;margin-right: 4px;display: inline-block;">肌送检测
            </span>
          </p>
          <p style="margin: 0;font-size: 13px;line-height: 30px;color: #333;">
            麻醉有关的措施：<span style="font-weight: normal;padding-right: 15px;"><input type="checkbox" @change="anesthesiaMeasuresChange" :value="0" name="anesthesiaMeasures" style="margin-left: 0px;margin-right: 4px;display: inline-block;">气管内插管
              <input @change="anesthesiaMeasuresChange" type="checkbox" :value="1" name="anesthesiaMeasures" style="margin-left: 10px;margin-right: 4px;display: inline-block;">吼罩
              <input @change="anesthesiaMeasuresChange" type="checkbox" :value="2" name="anesthesiaMeasures" style="margin-left: 10px;margin-right: 4px;display: inline-block;">动脉穿刺
              <input @change="anesthesiaMeasuresChange" type="checkbox" :value="3" name="anesthesiaMeasures" style="margin-left: 10px;margin-right: 4px;display: inline-block;">中心静脉穿刺
              <input @change="anesthesiaMeasuresChange" type="checkbox" :value="4" name="anesthesiaMeasures" style="margin-left: 10px;margin-right: 4px;display: inline-block;">蛛网膜下腔穿刺（腰麻）<br>
              <input @change="anesthesiaMeasuresChange" type="checkbox" :value="5" name="anesthesiaMeasures" style="margin-left: 104px;margin-right: 4px;display: inline-block;">硬膜外置管
              <input @change="anesthesiaMeasuresChange" type="checkbox" :value="6" name="anesthesiaMeasures" style="margin-left: 10px;margin-right: 4px;display: inline-block;">控制性降压
              <input @change="anesthesiaMeasuresChange" type="checkbox" :value="7" name="anesthesiaMeasures" style="margin-left: 10px;margin-right: 4px;display: inline-block;">低温
              <input @change="anesthesiaMeasuresChange" type="checkbox" :value="8" name="anesthesiaMeasures" style="margin-left: 10px;margin-right: 4px;display: inline-block;">自体血回输
              <input @change="anesthesiaMeasuresChange" type="checkbox" :value="9" name="anesthesiaMeasures" style="margin-left: 10px;margin-right: 4px;display: inline-block;">神经阻滞
            </span>
          </p>
          <p style="margin: 0;font-size: 13px;line-height: 30px;color: #333;">其他：</p>
          <p style="margin: 0;font-size: 13px;line-height: 30px;color: #333;">
            <textarea name="anesthesiaOther" id="anesthesiaOther" v-model="anesthesiaForm.anesthesiaOther" style="width: 100%;resize: none;height:60px;border:0;outline:none;"></textarea>
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
  import { read, save } from '@/api/appointmentManage/anesthesia'
  export default {
    name: 'anesthesiaEvaluation',
    created() {},
    mounted() {
      if (this.$route.params.id) {
        read(parseInt(this.$route.params.id)).then(res => {
          if (res.data.code === 200) {
            for (const key in this.anesthesiaForm) {
              if (res.data.obj.hasOwnProperty(key)) {
                this.anesthesiaForm[key] = res.data.obj[key]
              }
            }
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
          beforeDiagnosis: '', // 术前诊断
          anesthetistTypeShow: '', // 麻醉方式
          operationName: '', // 手术名称
          wardBedNo: '', // 床号
          inHospNo: '', // 住院号
          visitDepartment: '', // 科室
          registerDept: '', // 主刀医生科室
          appointId: '', // 预约id
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
      submitForm() {
        const data = {
          appointId: this.anesthesiaForm.appointId,
          formInfoId: 1,
          jsonResult: JSON.stringify(this.anesthesiaForm),
          htmlContent: document.querySelector('.scrollWrap').innerHTML
        }
        save(data).then(res => {
          if (res.data.code === 200) {
            this.$message({
              message: '提交成功',
              type: 'success'
            })
            this.cancel()
          }
        })
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
        this.$store.commit('SET_SECONDARYJUMP', '/optReady/anesthesia')
        this.$root.closeTag()
      }
    }
  }
</script>
<style lang="scss" scope>
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

