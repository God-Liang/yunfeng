<template>
  <div class="records" v-loading="patientLoading" element-loading-text="拼命加载中">
    <div class="base">
      <div class="bgB">
        <div class="avatar">
          <ul>
            <li>
              <img v-if="baseInfo.patientInfo.sex === 1" src="@/assets/images/male.jpg" width="80px;" height="80px;">
              <img v-else-if="baseInfo.patientInfo.sex === 2" src="@/assets/images/female.jpg" width="80px;" height="80px;">
              <svg-icon class-name="international-icon" v-else class="avatar right_menu_item" icon-class="avatar"/>
              <div class="name">{{baseInfo.patientInfo.patientName}}</div>
              <span class="el-icon-phone-outline" @click="makePhone"></span>
            </li>
            <li>
              <span class="gender">{{baseInfo.patientInfo.sexShow}}</span>
              <i></i>
              <span class="age">{{baseInfo.patientInfo.age || 0}}</span>
              <i></i>
              <span class="telephone">{{baseInfo.patientInfo.phone}}</span>
            </li>
          </ul>
        </div>
      </div>

      <i class="lg_x"></i>
      <ul class="baseDetail" v-if="detailTage">
        <li class="surgeryBox">
          <p>
            <label>就诊卡号</label>
            <span :title="baseInfo.baseInfo.visitId">{{baseInfo.baseInfo.visitId}}</span>
          </p>
          <p>
            <label>身份证号</label>
            <span :title="baseInfo.patientInfo.idCard">{{baseInfo.patientInfo.idCard}}</span>
          </p>
        </li>
        <li class="surgeryBox">
          <p>
            <label>预约单号</label>
            <span :title="baseInfo.baseInfo.appointNo">{{baseInfo.baseInfo.appointNo}}</span>
          </p>
          <p>
            <label>手术名称</label>
            <span :title="baseInfo.baseInfo.operationName">{{baseInfo.baseInfo.operationName}}</span>
          </p>
          <p>
            <label>手术医生</label>
            <span :title="baseInfo.baseInfo.doctorName">{{baseInfo.baseInfo.doctorName}}</span>
          </p>
          <p>
            <label>手术时间</label>
            <span>{{baseInfo.baseInfo.schedule | timeFilter}}</span>
          </p>
          <p>
            <label>术前诊断</label>
            <span :title="baseInfo.baseInfo.beforeDiagnosis">{{baseInfo.baseInfo.beforeDiagnosis}}</span>
          </p>
          <p>
            <label>就诊医生</label>
            <span :title="baseInfo.baseInfo.register">{{register}}</span>
          </p>
          <p>
            <label>就诊科室</label>
            <span :title="registerDept">{{registerDept}}</span>
          </p>
          <p>
            <label>就诊日期</label>
            <span>{{baseInfo.baseInfo.createTime | fmtYMD}}</span>
          </p>
          <p>
            <label>麻醉方式</label>
            <span :title="baseInfo.baseInfo.anesthetistTypeShow">{{baseInfo.baseInfo.anesthetistTypeShow}}</span>
          </p>
        </li>
      </ul>
      <ul class="medicalPro" v-else>
        <li
          v-for="(item, index) in medicalMessages"
          :key="index"
          :class="medicalTage === index ? 'active' : ''"
          @click="medicalTage=index"
        >
          <div class="iconBox">
            <i class="el-icon-news"></i>
          </div>
          <div class="medicalMessage">
            <p>{{item.time | fmtYMD}}</p>
            <p>{{item.msg}}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="allInfo" ref="allInfo">
      <div class="exitDuring" @click="exitClick" v-show="baseInfo.baseInfo.appointmentStatus !== 100">
        退出日间
      </div>
      <el-tabs v-model="activeTab" @tab-click="tabClick">
        <el-tab-pane name="baseInfo">
          <span class="tab" slot="label">基本信息</span>
          <base-info :baseInfo="baseInfo" @update="update"></base-info>
        </el-tab-pane>
        <!--  -->
        <el-tab-pane name="medicalRecord">
          <span class="tab" slot="label">医疗档案</span>
          <medical-record v-show="medicalTage === 0" :medicalRecordInfo="medicalRecordInfo"></medical-record>
          <hospital-information v-show="medicalTage === 1" :hospitalInfo="hospitalInfo"></hospital-information>
        </el-tab-pane>
        <el-tab-pane name="followRecord">
          <span class="tab" slot="label">随访记录</span>
          <follow-record></follow-record>
        </el-tab-pane>
        <el-tab-pane name="PEARecord">
          <span class="tab" slot="label">宣教记录</span>
          <pae-record></pae-record>
        </el-tab-pane>
        <el-tab-pane name="messageRecord">
          <span class="tab" slot="label">短信记录</span>
          <message-record></message-record>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 退出日间 -->
    <el-dialog title="退出日间" :visible.sync="exitVisible" class='exitForm'>
      <el-form ref="exitForm" :rules="exitFormRules" :model="exitForm" label-width="80px">
        <el-form-item label="类型" prop="cancelType">
          <dict-select v-model="exitForm.cancelType" style="width: 50%;" placeholder="请选择取消类型" dict-code="exit_doms_type">
          </dict-select>
        </el-form-item>
        <el-form-item label="取消原因" prop="cancelReason">
          <dict-select v-model="exitForm.cancelReason" style="width: 50%;" placeholder="请选择取消原因" dict-code="exit_doms_reason" parent-code="exit_doms_type" :parent-id="exitForm.cancelType">
          </dict-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="exitForm.cancelNote"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitForm('exitForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import baseInfo from '@/yimiviews/case/baseInfo'
import surgeryRecord from '@/yimiviews/case/surgeryRecord'
import surgeryPath from '@/yimiviews/components/path'
import medicalRecord from '@/yimiviews/case/medicalRecord'
import hospitalInformation from '@/yimiviews/case/hospitalInformation'
import followRecord from '@/yimiviews/case/followRecord'
import paeRecord from '@/yimiviews/case/PAERecord'
import messageRecord from '@/yimiviews/case/messageRecord'
import formCreater from '@/yimiviews/case/formCreater'
import { getArchives, getBaseInfo, getInHospInfo, outDoms } from '@/api/patientArchives'
import DictSelect from '@/views/form/dictSelect'
const exitDefault = { // 退出日间原因表单
  cancelType: null,
  cancelReason: null,
  cancelNote: '',
  appointId: 0
}
export default {
  components: { DictSelect, baseInfo, formCreater, surgeryRecord, surgeryPath, medicalRecord, hospitalInformation, followRecord, paeRecord, messageRecord },
  created() {
    this.getPatientHistory()
  },
  mounted() {},
  data() {
    return {
      activeTab: 'baseInfo',
      base: {
        avatar: ''
      },
      baseInfo: { // 基本信息
        // 就诊信息
        baseInfo: {

        },
        // 患者信息
        patientInfo: {

        }
      },
      // 医疗档案门诊信息
      medicalRecordInfo: {
        baseInfo: {},
        checkInfoList: {},
        inspectInfoList: {},
        prescriptionInfoList: {}
      },
      // 医疗档案住院信息
      hospitalInfo: {
        baseInfo: {},
        checkInfoList: {},
        operationInfo: {},
        inspectInfoList: {},
        doctorsAdviceList: {}
      },
      caseInfo: {
        appointmentInfo: {},
        mainAppointmentRel: {},
        baseInfo: {
          patientName: '',
          sex: null,
          age: 0,
          phone: ''
        },
        medicalInfo: {},
        medicalRecord: [],
        operationInfo: {}
      },
      type: '',
      detailTage: true,
      medicalTage: 0,
      medicalMessages: [],
      // exitDuring: false,
      exitVisible: false,
      exitForm: { // 退出日间原因表单
        cancelType: null,
        cancelReason: null,
        cancelNote: '',
        appointId: parseInt(this.$route.params.id)
      },
      exitFormRules: {
        cancelType: [{ required: true, message: '此项不能为空', trigger: 'change' }],
        cancelReason: [{ required: true, message: '此项不能为空', trigger: 'change' }]
      },
      patientLoading: true,
      register: '',
      registerDept: ''
    }
  },
  filters: {
    timeFilter: (val) => {
      if (!val) return ''
      if (val.indexOf('00:00:00') > -1) {
        const value = val.replace(' 00:00:00', '')
        return value
      }
    }
  },
  methods: {
    // 拨打电话
    makePhone() {
      const phone = this.baseInfo.patientInfo.phone
      if (phone != null) {
        const url = location.origin + '/static/bb.html?phone=' + phone
        window.location.href = 'openIE:' + url
      }
    },
    tabClick(tab, event) {
      switch (this.activeTab) {
        case 'baseInfo':
          this.getPatientHistory()
          this.detailTage = true
          break
        case 'medicalRecord':
          this.getArchives()
          this.getInHospInfo()
          this.detailTage = false
          break
        case 'followRecord':
          this.detailTage = true
          break
        case 'PEARecord':
          this.detailTage = true
          break
        case 'messageRecord':
          this.detailTage = true
          break
        default:
          break
      }
    },
    getPatientHistory() {
      getBaseInfo(parseInt(this.$route.params.id)).then(res => {
        if (res.data.code === 200) {
          if (res.data.baseInfo.inHospTime && res.data.baseInfo.inHospTime > res.data.baseInfo.createTime) {
            this.medicalMessages = [{
              time: res.data.baseInfo.visitDate,
              msg: '门诊：' + res.data.baseInfo.visitDiagnosis
            },
            {
              time: res.data.baseInfo.inHospTime,
              msg: '住院：' + res.data.baseInfo.beforeDiagnosis
            }]
          } else {
            this.medicalMessages = [{
              time: res.data.baseInfo.visitDate,
              msg: '门诊：' + res.data.baseInfo.visitDiagnosis
            }]
          }
          this.register = res.data.register
          this.registerDept = res.data.registerDept
          this.baseInfo.baseInfo = res.data.baseInfo
          this.baseInfo.patientInfo = res.data.patientInfo
          this.baseInfo.patientInfo.liveAreaId = this.baseInfo.patientInfo.liveAreaId === null ? [] : this.baseInfo.patientInfo.liveAreaId.split(',') // 居住地址
          this.baseInfo.patientInfo.companyAreaId = this.baseInfo.patientInfo.companyAreaId === null ? [] : this.baseInfo.patientInfo.companyAreaId.split(',') // 单位地址
          this.baseInfo.patientInfo.birthAreaId = this.baseInfo.patientInfo.birthAreaId === null ? [] : this.baseInfo.patientInfo.birthAreaId.split(',') // 出生地
          this.baseInfo.patientInfo.refAreaId = this.baseInfo.patientInfo.refAreaId === null ? [] : this.baseInfo.patientInfo.refAreaId.split(',') // 联系人地址
          this.patientLoading = false
        }
      })
    },
    // 医疗档案信息
    getArchives() {
      getArchives(parseInt(this.$route.params.id)).then(res => {
        if (res.data.code === 200) {
          this.medicalRecordInfo = {
            baseInfo: res.data.baseInfo,
            checkInfoList: res.data.checkInfoList,
            inspectInfoList: res.data.inspectInfoList,
            prescriptionInfoList: res.data.prescriptionInfoList
          }
        }
      })
    },
    getInHospInfo() {
      getInHospInfo(parseInt(this.$route.params.id)).then(res => {
        if (res.data.code === 200) {
          this.hospitalInfo = {
            baseInfo: res.data.baseInfo,
            checkInfoList: res.data.checkInfoList,
            operationInfo: res.data.operationInfo,
            inspectInfoList: res.data.inspectInfoList,
            doctorsAdviceList: res.data.doctorsAdviceList
          }
        }
      })
    },
    // 退出日间
    exitClick() {
      if (this.baseInfo.baseInfo.appointmentStatus > 14 && this.baseInfo.baseInfo.appointmentStatus !== 90) {
        this.$message({
          message: '出院评估后不可退出',
          type: 'warning'
        })
        return false
      }
      this.exitVisible = true
    },
    // 退出日间保存
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = Object.assign({}, this.exitForm)
          outDoms(data).then(res => {
            if (res.data.code === 200) {
              this.$message({
                message: '成功退出日间',
                type: 'success'
              })
              this.getPatientHistory()
              this.cancel()
            }
          })
        } else {
          return false
        }
      })
    },
    cancel() {
      this.exitForm = exitDefault
      this.$refs['exitForm'].resetFields()
      this.exitVisible = false
    },
    update(val) {
      this.getPatientHistory()
    }
  }
}
</script>
<style lang="scss" scoped>
.records {
  height: 100%;
  box-sizing: border-box;
  position: relative;
  background-color: #f3f6ff;
  margin-top: 1px;
  .bg {
    background: #1bbc97;
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 290px;
    z-index: 1;
  }
  .base {
    float: left;
    background: #fff;
    width: 260px;
    height: 100%;
    position: absolute;
    z-index: 2;
    .bgB {
      background-color: #fff;
      .avatar {
        text-align: center;
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
          li {
            padding: 0;
            color: #333;
            font-size: 12px;
            margin: 15px 0;
            display: flex;
            justify-content: center;
            align-items: center;
            > img {
              width: 40px;
              height: 40px;
              border-radius: 50%;
              margin-right: 20px;
              display: inline-block;
            }
            .avatar {
              width: 40px;
              height: 40px;
              margin: 0;
              vertical-align: middle;
            }
            .name {
              font-size: 14px;
              font-weight: bold;
              cursor: pointer;
              &::after {
                content: '';
                display: inline-block;
                width: 1px;
                height: 12px;
                background-color: #ccc;
                margin: 0 10px 0 12px;
                vertical-align: middle;
              }
            }
            .el-icon-phone-outline {
              color: #1cb999;
              font-size: 16px;
              cursor: pointer;
            }
            .exitBox {
              width: 22px;
              position: relative;
              cursor: pointer;
              img {
                width: 100%;
                display: block;
              }
              .exit {
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                top: 30px;
                .transition-box {
                  position: relative;
                  width: 100px;
                  height: 36px;
                  line-height: 36px;
                  border: 1px solid #eee;
                  padding: 0;
                  color: #333;
                  background-color: #fff;
                  box-shadow: 0px 0px 20px #deede6;
                  &::before {
                    border: 8px solid transparent;
                    border-bottom: 8px solid #fff;
                    position: absolute;
                    content: "";
                    left: 50%;
                    margin-left: -10px;
                    bottom: 100%;
                  }
                }
              }
            }
            .gender {

            }
            i {
              width: 1px;
              height: 7px;
              background-color: rgb(220, 220, 220);
              margin: 0 10px;
            }
          }
        }
      }
    }
    .lg_x {
      width: 100%;
      height: 1px;
      margin: 20px 0;
      display: block;
      background: rgb(220, 220, 220);
    }
    ul.baseDetail {
      margin: 0;
      padding: 0 15px;
      li {
        list-style: none;
        margin: 0 0 20px;
        line-height: 32px;
        p{
          margin: 0;
          height: 32px;
          line-height: 32px;
          &:last-child {
            border: 0 !important;
          }
          label {
            font-weight: normal;
            color: #333;
            font-size: 14px;
            letter-spacing: 2px;
          }
          span{
            color: #333;
            font-size: 14px;
            letter-spacing: 2px;
          }
        }
        &.mesBox {
          padding: 0 15px;
          background-color: #fff4e8;
          border: 1px solid #eee;
          p{
            border-bottom: 1px solid #fff;
            height: 36px;
            line-height: 36px;
            span{
              float: right;
            }
          }
        }
        &.surgeryBox {
          border: 1px solid #eee;
          p{
            border-bottom: 1px dashed #eee;
            padding: 0 15px;
            label {
              font-weight: normal;
              color: #111;
              font-size: 12px;
              float: left;
            }
            span{
              color: #111;
              font-size: 12px;
              letter-spacing: 0px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              display: inline-block;
              width: 135px;
              float: left;
              padding-left: 10px;
            }
          }
        }
        span {
          font-size: 14px;
          font-weight: normal;
        }
      }
    }
    ul.medicalPro {
      list-style: none;
      position: relative;
      margin: 0;
      padding: 0;
      &::before {
        content: "";
        display: inline-block;
        position: absolute;
        left: 50px;
        top: 0;
        width: 1px;
        z-index: -1;
        background: #ccc;
      }
      li {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding-left: 35px;
        height: 66px;
        &.active {
          background-color: rgba(110, 234, 234, 0.1);
        }
        cursor: pointer;
        .iconBox {
          width: 30px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          border-radius: 50%;
          background: #409eff;
          margin-right: 20px;
          i {
            color: #fff;
          }
        }
        .medicalMessage {
          p {
            font-size: 14px;
            color: #333;
            margin: 0;
            line-height: 22px;
          }
        }
      }
    }
  }

  .allInfo {
    position: absolute;
    width: calc(100% - 260px);
    min-width: 720px;
    left: 260px;
    top: 0;
    box-sizing: border-box;
    box-shadow: 0 2px 5px #ccc;
    .tab {
      font-size: 20px;
      display: inline-block;
      height: 50px;
      line-height: 50px;
    }
    .exitDuring {
      position: absolute;
      right: 15px;
      top: 12px;
      width: 100px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      background-color: #1CB999;
      color: #fff;
      z-index: 9;
      font-size: 14px;
      cursor: pointer;
    }
  }
}
</style>
<style lang="scss">
.allInfo {
  .el-tabs {
    position: relative;
    width: 100%;
    .el-tabs__header {
      margin: 0;
      .el-tabs__nav-wrap {
        overflow: visible;
        &::after {
          display: none;
        }
        .el-tabs__nav-scroll {
          overflow: visible;
          .el-tabs__nav {
            float: none;
            background-color: #fff;
          }
          .el-tabs__active-bar {
            display: none;
          }
          .el-tabs__item {
            height: 60px;
            line-height: 60px;
            position: relative;
            &.is-active {
              background-color: #1cb999;
              &::after {
                content: "";
                position: absolute;
                left: 50%;
                bottom: -8px;
                display: block;
                width: 0;
                height: 0;
                margin-left: -6px;
                border-right: 6px solid transparent;
                border-left: 6px solid transparent;
                border-top: 8px solid #1cb999;
              }
              span {
                color: #fff;
                font-weight: bold;
              }
            }
            &.is-top {
              &:nth-child(2) {
                padding: 0 20px;
              }
              &:last-child {
                padding: 0 20px;
              }
            }
            span {
              font-size: 14px;
              color: #666666;
            }
          }
        }
      }
    }
    .el-tabs__content {
      overflow: scroll;
      width: 100%;
      padding: 0 15px;
      margin: 20px 0 0;

    }
  }
}
.el-textarea__inner {
  resize: none;
}
// #app .tags-view-container,
// #app .navbar {
//   display: none;
// }
</style>
