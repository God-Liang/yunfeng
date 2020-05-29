<template>
  <div class="anesthesiaEvaluation">
    <div slot="footer" class="dialog-footer clearfix">
      <div style="float: left; line-height: 32px;padding-left: 12px;">
        出院评估
      </div>
      <div style="float: right;">
        <el-button type="primary" @click="doPrint">打印</el-button>
        <el-button type="warning" @click="submitForm('1')">保存</el-button>
        <el-button type="danger" @click="submitForm('2')">提交</el-button>
      </div>
    </div>
    <div class="scrollWrap">
      <div class="leaveForm" style="padding: 20px;width: 650px;margin: 0 auto;background-color: #fff;">
        <h1 style="font-size: 16px;margin: 0;letter-spacing: 6px;line-height: 20px;text-align: center;color: #333333;">株洲市中心医院</h1>
        <hr style="border: none;display:block;width:100%;background-color:#111;height:1px;margin: 10px 0;">
        <h3 style="font-size: 16px;margin: 0 0 20px;letter-spacing: 6px;line-height: 20px;text-align: center;padding: 0;color: #333333;">日间手术患者出院评估表</h3>
        <div style="margin-bottom: 25px;">
          <span style="font-weight: normal;font-size: 13px;color: #333;width: 18%;display: inline-block;">姓名：{{leaveForm.patientName}}</span>
          <span style="font-weight: normal;font-size: 13px;color: #333;width: 31%;display: inline-block;">科室：{{leaveForm.registerDept}}</span>
          <span style="font-weight: normal;font-size: 13px;color: #333;width: 18%;display: inline-block;">床号：{{leaveForm.wardBedNo}}</span>
          <span style="font-weight: normal;font-size: 13px;color: #333;width: 30%;display: inline-block;">住院号：{{leaveForm.inHospNo}}</span>
        </div>
        <div style="margin-bottom: 25px;">
          <span style="font-weight: normal;font-size: 13px;color: #333;width: 100%;display: inline-block;">手术名称：{{leaveForm.operationName}}</span>
        </div>
        <div style="margin-bottom: 25px;">
          <span style="font-weight: normal;font-size: 13px;color: #333;width: 100%;display: inline-block;">手术日期：{{leaveForm.schedule | fmtYMD}}</span>
        </div>
        <div style="margin-bottom: 25px;">
          <span style="font-weight: normal;font-size: 13px;color: #333;width: 100%;display: inline-block;">评估时间：{{leaveForm.operateTime}}</span>
        </div>
        <h5 style="color:#333333;font-size:14px;margin: 0 0 25px;">各类之和达到9分方可办理出院手续</h5>
        <table cellspacing="0" cellpadding="0" style="border-collapse:collapse; margin-left:0pt;width:100%;">
          <tr style="height:18.15pt">
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:20%"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:宋体; font-size:10.5pt">分类</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:45%"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:宋体; font-size:10.5pt">评分标准</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:35%"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:宋体; font-size:10.5pt">评分</span>
              </p>
            </td>
          </tr>
          <tr>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:20%"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:宋体; font-size:14px">生命体征</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:45%"
            >
              <p style="margin:10px 0 0; orphans:0; text-align:left; widows:0">
                <span style="font-family:宋体; font-size:12px;line-height:28px;">2=血压和心率稳定在术前水平20%以内</span>
              </p>
              <p style="margin:0pt; orphans:0; text-align:left; widows:0">
                <span style="font-family:宋体; font-size:12px;line-height:28px;">1=血压和心率稳定在术前基础率22%-40%</span>
              </p>
              <p style="margin:0 0 10px; orphans:0; text-align:left; widows:0">
                <span style="font-family:宋体; font-size:12px;line-height:28px;">0=血压和心率稳定在术前基础值>40%</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:35%"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span class="inputForm1" style="font-size:16px;text-align:center;">{{leaveForm.lifePhysical}}</span>
                <el-select style="width: 120px;display:none;" class="inputForm2" v-model="leaveForm.lifePhysical">
                  <el-option :value="0"></el-option>
                  <el-option :value="1"></el-option>
                  <el-option :value="2"></el-option>
                </el-select>
              </p>
            </td>
          </tr>
          <tr>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:20%"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:宋体; font-size:14px">活动水平</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:45%"
            >
              <p style="margin:10px 0 0; orphans:0; text-align:left; widows:0">
                <span style="font-family:宋体; font-size:12px;line-height:28px;">2=步态稳定，无头晕</span>
              </p>
              <p style="margin:0pt; orphans:0; text-align:left; widows:0">
                <span style="font-family:宋体; font-size:12px;line-height:28px;">1=需要搀扶</span>
              </p>
              <p style="margin:0 0 10px; orphans:0; text-align:left; widows:0">
                <span style="font-family:宋体; font-size:12px;line-height:28px;">0=不能行走</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:35%"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span class="inputForm1" style="font-size:16px;text-align:center;">{{leaveForm.activityLevel}}</span>
                <el-select style="width: 120px;display:none;" class="inputForm2" v-model="leaveForm.activityLevel">
                  <el-option :value="0"></el-option>
                  <el-option :value="1"></el-option>
                  <el-option :value="2"></el-option>
                </el-select>
              </p>
            </td>
          </tr>
          <tr>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:20%"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:宋体; font-size:14px">恶心呕吐</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:45%"
            >
              <p style="margin:10px 0 0; orphans:0; text-align:left; widows:0">
                <span style="font-family:宋体; font-size:12px;line-height:28px;">2=无或轻度呕吐，经口服药治疗有效</span>
              </p>
              <p style="margin:0pt; orphans:0; text-align:left; widows:0">
                <span style="font-family:宋体; font-size:12px;line-height:28px;">1=中度恶心呕吐，经肌肉治疗有效</span>
              </p>
              <p style="margin:0 0 10px; orphans:0; text-align:left; widows:0">
                <span style="font-family:宋体; font-size:12px;line-height:28px;">0=重度恶心呕吐，需连续反复治疗</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:35%"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span class="inputForm1" style="font-size:16px;text-align:center;">{{leaveForm.nauseaVomiting}}</span>
                <el-select style="width: 120px;display:none;" class="inputForm2" v-model="leaveForm.nauseaVomiting">
                  <el-option :value="0"></el-option>
                  <el-option :value="1"></el-option>
                  <el-option :value="2"></el-option>
                </el-select>
              </p>
            </td>
          </tr>
          <tr>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:20%"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:宋体; font-size:14px">疼痛</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:45%"
            >
              <p style="margin:10px 0 0; orphans:0; text-align:left; widows:0">
                <span style="font-family:宋体; font-size:12px;line-height:28px;">2=无痛或轻度疼痛，口服用药能止痛</span>
              </p>
              <p style="margin:0pt; orphans:0; text-align:left; widows:0">
                <span style="font-family:宋体; font-size:12px;line-height:28px;">1=中度疼痛</span>
              </p>
              <p style="margin:0 0 10px; orphans:0; text-align:left; widows:0">
                <span style="font-family:宋体; font-size:12px;line-height:28px;">0=重度疼痛</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:35%"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span class="inputForm1" style="font-size:16px;text-align:center;">{{leaveForm.pain}}</span>
                <el-select style="width: 120px;display:none;" class="inputForm2" v-model="leaveForm.pain">
                  <el-option :value="0"></el-option>
                  <el-option :value="1"></el-option>
                  <el-option :value="2"></el-option>
                </el-select>
              </p>
            </td>
          </tr>
          <tr>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:20%"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:宋体; font-size:14px">外科出血</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:45%"
            >
              <p style="margin:10px 0 0; orphans:0; text-align:left; widows:0">
                <span style="font-family:宋体; font-size:12px;line-height:28px;">2=轻度，无需更换敷料</span>
              </p>
              <p style="margin:0pt; orphans:0; text-align:left; widows:0">
                <span style="font-family:宋体; font-size:12px;line-height:28px;">1=中度，需要更换2次敷料</span>
              </p>
              <p style="margin:0 0 10px; orphans:0; text-align:left; widows:0">
                <span style="font-family:宋体; font-size:12px;line-height:28px;">0=重度，需要更换3次以上敷料</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:35%"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span class="inputForm1" style="font-size:16px;text-align:center;">{{leaveForm.surgicalBleeding}}</span>
                <el-select style="width: 120px;display:none;" class="inputForm2" v-model="leaveForm.surgicalBleeding">
                  <el-option :value="0"></el-option>
                  <el-option :value="1"></el-option>
                  <el-option :value="2"></el-option>
                </el-select>
              </p>
            </td>
          </tr>
          <tr style="height:30px;line-height:30px;">
            <td
              colspan="2"
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:65%"
            >
              <p style="height:30px;margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-size:14px;text-align:center;">合计</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:35%"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-size:16px;text-align:center;">{{leaveForm.combinedNum}}</span>
              </p>
            </td>
          </tr>
          <tr style="height:30px;line-height:30px;">
            <td
              colspan="2"
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:65%"
            >
              <p style="height:30px;margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-size:14px;text-align:center;">评价人签字</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:35%"
            >
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-size:16px;text-align:center;"></span>
              </p>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
  import { save, readDetail } from '@/api/patientManage/hospitalAssessment'
  export default {
    name: 'anesthesiaEvaluation',
    created() {},
    mounted() {
      if (this.$route.params.id) {
        readDetail(parseInt(this.$route.params.id)).then(res => {
          if (res.data.code === 200) {
            this.leaveForm.registerDept = res.data.registerDept
            for (const key in this.leaveForm) {
              if (res.data.appointmentOperationRel.hasOwnProperty(key)) {
                this.leaveForm[key] = res.data.appointmentOperationRel[key]
              }
            }
            if (res.data.formResult) {
              this.leaveForm = JSON.parse(res.data.formResult.jsonResult)
              this.leaveForm.operateTime = res.data.formResult.operateTime
            }
          }
        })
      }
    },
    data() {
      return {
        isOne: true,
        leaveForm: {
          patientName: '', // 姓名
          bedNumber: '', // 床号
          anesthetistTypeShow: '', // 麻醉方式
          operationName: '', // 手术名称
          wardBedNo: '', // 床号
          inHospNo: '', // 住院号
          registerDept: '', // 科室
          schedule: '', // 手术时间
          appointId: '',
          operateTime: this.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'), // 评估时间
          appointmentStatus: '',
          lifePhysical: 0, // 生命体制
          activityLevel: 0, // 活动水平
          nauseaVomiting: 0, // 恶心呕吐
          pain: 0, // 疼痛
          surgicalBleeding: 0, // 外科出血
          combinedNum: 0 // 合计
        }
      }
    },
    methods: {
      doPrint() {
        const printHtml = document.querySelector('.leaveForm').innerHTML
        const wind = window.open('', 'newwindow', 'height=400, width=800, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no')
        wind.document.body.innerHTML = printHtml
        wind.print()
        return false
      },
      submitForm(type) {
        if (parseInt(this.leaveForm.combinedNum) < 9) {
          this.$message({
            message: '情况不达标不可办理出院手续',
            type: 'warning'
          })
          return false
        }
        const data = {
          appointId: this.leaveForm.appointId,
          formInfoId: 1,
          jsonResult: JSON.stringify(this.leaveForm),
          htmlContent: document.querySelector('.scrollWrap').innerHTML
        }
        if (type === '1') {
          data.appointmentStatus = this.leaveForm.appointmentStatus
          save(data).then(res => {
            if (res.data.code === 200) {
              this.$message({
                message: '保存成功',
                type: 'success'
              })
              this.cancel()
            }
          })
        }
        if (type === '2') {
          this.$confirm('评估提交后不可再修改，是否确认?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            data.isPass = this.leaveForm.combinedNum > 8 ? 1 : 0
            data.appointmentStatus = 14
            save(data).then(res => {
              if (res.data.code === 200) {
                this.$message({
                  message: '提交成功',
                  type: 'success'
                })
                this.cancel()
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消提交'
            })
          })
        }
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
      formatDate(lgDate, fmt) {
        let date
        if (lgDate) {
          date = new Date(lgDate)
        } else {
          date = new Date()
        }
        if (/(y+)/.test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
        }
        const o = {
          'M+': date.getMonth() + 1,
          'd+': date.getDate(),
          'h+': date.getHours(),
          'm+': date.getMinutes(),
          's+': date.getSeconds()
        }
        for (const k in o) {
          if (new RegExp(`(${k})`).test(fmt)) {
            const str = o[k] + ''
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : this.padLeftZero(str))
          }
        }
        return fmt
      },
      padLeftZero(str) {
        return ('00' + str).substr(str.length)
      }
    },
    watch: {
      leaveForm: {
        handler(newValue, oldValue) {
          this.leaveForm.combinedNum = parseInt(this.leaveForm.lifePhysical) + parseInt(this.leaveForm.activityLevel) + parseInt(this.leaveForm.nauseaVomiting) + parseInt(this.leaveForm.pain) + parseInt(this.leaveForm.surgicalBleeding)
        },
        deep: true
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
      }
    }
  }
  .inputForm1 {
    display: none;
  }
  .inputForm2 {
    display: inline-block !important;
    &::placeholder {
      font-size: 13px;
      color: #ccc;
    }
  }
</style>

