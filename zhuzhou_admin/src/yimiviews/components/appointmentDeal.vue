<template>
  <div class="appointmentDeal" v-loading="globalLoading" element-loading-text="数据加载中...">
    <div slot="footer" class="dialog-footer clearfix">
      <div style="float: left; line-height: 32px;">
        预约处理
        <span style="color: #999;font-size:12px;">基本信息补充与手术信息确认</span>
      </div>
      <div style="float: right;">
        <el-button type="warning" class="buttonRadius saveColor" :loading="sumbitLoading" @click="submitForm('operationInfo',1)">保存</el-button>
        <el-button type="primary" class="buttonRadius sumbitColor" :loading="sumbitLoading" v-show="statusTage === 3" @click="submitForm('operationInfo',2)">提交</el-button>
        <el-button type="danger" class="buttonRadius auditColor" :loading="sumbitLoading" v-show="statusTage === 4" @click="submitForm('operationInfo', 2)">审核</el-button>
      </div>
    </div>
    <div class="scrollWrap" ref="scrollWrap">
      <div class="appointmentInfoBox">
        <div class="box">
          <appointment-info :appointmentMessaage="appointmentMessaage"></appointment-info>
        </div>
      </div>
      <div class="baseInfoBox margin20">
        <div class="box">
          <h3>
            <span>信息补充</span>
          </h3>
          <base-info ref="baseInfoForm" :dialogLeftTop1_3_data="dialogLeftTop1_3_data"></base-info>
        </div>
      </div>
      <div class="baseInfoBox margin20">
        <div class="box">
          <h3>
            <span>预约手术</span>
          </h3>
          <el-form
            label-width="120px"
            ref="operationInfo"
            :inline="true"
            :rules="appointmentConfirmConst.operationInfo_rules"
            :model="operationInfo"
          >
            <!-- <el-form-item label="麻醉医生" prop="anesthetistName">
              <el-select
                  v-model="operationInfo.anesthetistName"
                  filterable
                  placeholder="请输入关键词搜索"
                  style="width: 196px"
                  remote
                  reserve-keyword
                  :remote-method="getAnesthesiaDoctor"
                  :loading="loading"
                  @change="doctorAnesthesiaChange">
                <el-option
                  v-for="surgery in dialogLeftTop1_1_data_anesthesiaDoctorList"
                  :label="surgery.nick"
                  :value="surgery.nick"
                  :key="surgery.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="麻醉医生电话" prop="anesthetistTel">
              <el-input
                v-model="operationInfo.anesthetistTel"
                auto-complete="off"
                style="width: 196px"
                placeholder="请输入备用电话"></el-input>
            </el-form-item> -->
            <el-form-item label="主刀医生" :label-width="formLabelWidth" prop="doctorName">
              <el-select
                v-model.number="operationInfo.doctorName"
                placeholder="请输入关键词搜索"
                style="width: 196px"
                filterable
                remote
                reserve-keyword
                :remote-method="getDoctor"
                :loading="loading"
                @change="doctorChange"
              >
                <el-option
                  v-for="item in dialogLeftTop1_1_data_operateDoctorList"
                  :label="item.nick"
                  :value="item.nick"
                  :key="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="预约手术时间" prop="schedule">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="operationInfo.schedule"
                style="width: 196px;"
                value-format="yyyy-MM-dd HH:mm:ss"
                :picker-options="endDatePicker"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="手术室" :label-width="formLabelWidth" prop="operationRoomId">
              <el-select v-model="operationInfo.operationRoomId" filterable placeholder="请选择手术室" style='width: 196px' @focus="roomFocus" @change="roomChange">
                <el-option v-for='item in operationRoomList' :label="item.name" :value="item.id" :key='item.id'></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import appointmentInfo from '@/yimiviews/components/appointmentInfo'
import baseInfo from '@/yimiviews/components/baseInfo'
import { appointmentConfirmConst } from '@/yimiviews/appointmentManage/columnsConst'
import { pending } from '@/api/appointmentManage/appointmentRegistration'
import { read, save, getDoctorScheduleSelect, getOptNum } from '@/api/appointmentManage/appointmentConfirm'
import { getDoctorList } from '@/api/common/common'
export default {
  components: { appointmentInfo, baseInfo },
  mounted() {
    this.getPatientInfo()
    this.getPend()
    this.setAppMainHeight()
  },
  data() {
    return {
      appointmentConfirmConst,
      sumbitLoading: false,
      loading: false,
      dialogLeftTop1_3_data: {
        patientName: '', // 患者姓名
        phone: '', // 手机号
        idCard: '', // 身份证号
        sex: null, // 性别
        birthday: '', // 出生日期
        liveAreaId: null, // 居住地址
        liveStreet: '',
        liveDetailAddr: '',
        marry: null, // 婚姻
        educationalLevel: null, // 文化程度
        backupTel: '', // 备用电话
        nationality: null, // 国籍
        nation: null, // 民族
        birthAreaId: null, // 出生地
        occupation: null, // 职业
        companyName: '', // 单位名称
        companyTel: '', // 单位电话
        companyAreaId: null, // 单位地址
        companyStreet: '',
        companyDetialAddr: '',
        refName: '', // 联系人
        refTel: '', // 联系电话
        refRelation: null, // 关系
        refAreaId: null, // 联系人地址
        refStreet: '',
        refDetialAddr: '',
        appointRelId: null,
        patientId: null,
        appointmentStatusArray: ''
      },
      operationInfo: {
        schedule: '', // 预约手术时间
        doctorId: null, // 医生
        doctorName: '',
        operationRoomId: null, // 手术间
        appointId: null,
        appointNo: '', // 预约单号
        // anesthetistId: null, // 麻醉医生
        // anesthetistName: '',
        appointmentStatus: null // 预约状态
        // anesthetistTel: '' // 麻醉医生联系方式
      },
      appointmentMessaage: {
        appointNo: '',
        appointmentStatus: '',
        createName: '',
        operationName: '',
        doctorName: '',
        doctorId: null,
        createTime: '',
        patientName: '',
        phone: '',
        beforeDiagnosis: '',
        visitDiagnosis: '',
        anesthetistTypeShow: ''
      },
      dialogLeftTop1_1_data_anesthesiaDoctorList: [],
      dialogLeftTop1_1_data_operateDoctorList: [],
      operationRoomList: [],
      props: {
        value: 'value',
        children: 'children'
      },
      formLabelWidth: '120px',
      statusTage: 3, // 当前状态 默认预约处理
      endDatePicker: this.processDate2(),
      globalLoading: true
    }
  },
  methods: {
    getPatientInfo() {
      read(this.$route.params.id).then(res => {
        this.globalLoading = false
        if (res.data.code === 200) {
          for (const key in this.appointmentMessaage) {
            if (this.appointmentMessaage.hasOwnProperty(key)) {
              this.appointmentMessaage[key] = res.data.obj[key]
            }
          }
          for (const key in this.dialogLeftTop1_3_data) {
            if (this.dialogLeftTop1_3_data.hasOwnProperty(key)) {
              this.dialogLeftTop1_3_data[key] = res.data.obj[key]
            }
          }
          for (const key in this.operationInfo) {
            if (this.operationInfo.hasOwnProperty(key)) {
              this.operationInfo[key] = res.data.obj[key]
            }
          }
          // 数据转换
          this.statusTage = res.data.obj.appointmentStatus
          this.dialogLeftTop1_3_data.liveAreaId = this.dialogLeftTop1_3_data.liveAreaId === null ? [] : this.dialogLeftTop1_3_data.liveAreaId.split(',') // 居住地址
          this.dialogLeftTop1_3_data.companyAreaId = this.dialogLeftTop1_3_data.companyAreaId === null ? [] : this.dialogLeftTop1_3_data.companyAreaId.split(',') // 单位地址
          this.dialogLeftTop1_3_data.birthAreaId = this.dialogLeftTop1_3_data.birthAreaId === null ? [] : this.dialogLeftTop1_3_data.birthAreaId.split(',') // 出生地
          this.dialogLeftTop1_3_data.refAreaId = this.dialogLeftTop1_3_data.refAreaId === null ? [] : this.dialogLeftTop1_3_data.refAreaId.split(',') // 联系人地址
          // 是否是门诊登记
          const appointmentStatusArray = this.dialogLeftTop1_3_data.appointmentStatusArray.split(',')
          if (appointmentStatusArray.indexOf('0') > -1) {
            return true
          } else {
            this.getDoctorScheduleSelect()
          }
        }
      })
    },
    // 医生列表
    getDoctor(query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          getDoctorList({ keyword: query.toLowerCase(), type: 1 }).then((res) => {
            if (res.data.code === 200) {
              this.loading = false
              this.dialogLeftTop1_1_data_operateDoctorList = res.data.list
              this.getDoctorScheduleSelect()
            }
          })
        }, 200)
      } else {
        this.dialogLeftTop1_1_data_operateDoctorList = []
      }
    },
    getAnesthesiaDoctor(query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          getDoctorList({ keyword: query.toLowerCase(), type: 1 }).then((res) => {
            this.loading = false
            this.dialogLeftTop1_1_data_anesthesiaDoctorList = res.data.list
          })
        }, 200)
      } else {
        this.dialogLeftTop1_1_data_anesthesiaDoctorList = []
      }
    },
    cancel() {
      this.$store.commit('SET_SECONDARYJUMP', '/appointmentManage/appointmentConfirm')
      this.$root.closeTag()
    },
    submitForm(formName, status) {
      const query = {
        schedule: this.operationInfo.schedule,
        operationRoomId: this.operationInfo.operationRoomId
      }
      getOptNum(query).then(res => {
        if (res.data.code === 200) {
          if (res.data.allNum === res.data.remNum) {
            this.$message({
              type: 'warning',
              message: '抱歉，该手术室已无台次，请重新选择'
            })
            this.operationInfo.operationRoomId = null
            return false
          }
        }
      })
      const baseInfoValid = this.$refs['baseInfoForm'].submit()
      this.$refs[formName].validate((valid) => {
        if (valid && baseInfoValid) {
          this.sumbitLoading = true
          const data = Object.assign({}, this.dialogLeftTop1_3_data, this.operationInfo)
          data.id = parseInt(this.$route.params.id)
          data.operationRoomName = this.operationRoomList.filter(v => v.id === data.operationRoomId)[0].name
          data.liveAreaId = data.liveAreaId === [] ? '' : data.liveAreaId.join(',')
          data.companyAreaId = data.companyAreaId === [] ? '' : data.companyAreaId.join(',')
          data.birthAreaId = data.birthAreaId === [] ? '' : data.birthAreaId.join(',')
          data.refAreaId = data.refAreaId === [] ? '' : data.refAreaId.join(',')
          switch (status) {
            case 1: // 暂存
              data.appointmentStatus = data.appointmentStatus
              break
            case 2: // 提交
              data.appointmentStatus++
              break
            default:
              break
          }
          save(data).then(res => {
            if (res.data.code === 200) {
              this.$message({
                message: status === 1 ? '保存成功' : '提交成功',
                type: 'success'
              })
              this.sumbitLoading = false
              this.cancel()
            }
          })
        }
      })
    },
    setAppMainHeight() {
      const bodyHeight = document.body.offsetHeight
      const appMainHeight = bodyHeight - 180
      this.$refs.scrollWrap.style.height = appMainHeight + 'px'
    },
    // 手术室列表
    getPend() {
      pending({ optRoomType: null, keywords: '', page: 1, limit: 10 }).then((res) => {
        if (res.data.code === 200) {
          this.loading = false
          this.operationRoomList = res.data.list
        }
      })
    },
    // 门诊医生获取id
    doctorChange(val) {
      this.operationInfo.doctorId = this.dialogLeftTop1_1_data_operateDoctorList.filter(v => v.nick === this.operationInfo.doctorName)[0].id
      this.getDoctorScheduleSelect()
    },
    doctorAnesthesiaChange(val) {
      this.operationInfo.anesthetistId = this.dialogLeftTop1_1_data_anesthesiaDoctorList.filter(v => v.nick === this.operationInfo.anesthetistName)[0].id
    },
    fmtYMD(time) {
      if (time) {
        const date = new Date(time)
        const year = date.getFullYear()
        const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
        const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
        return year + '-' + month + '-' + day
      } else {
        return
      }
    },
    getDoctorScheduleSelect() {
      getDoctorScheduleSelect(this.operationInfo.doctorId).then(res => {
        if (res.data.code === 200) {
          const list = res.data.list
          if (list.length === 0) {
            this.$message({
              message: '拟主刀医生暂无排班',
              type: 'warning'
            })
            this.endDatePicker = this.processDate1([])
            return false
          }
          const timeList = []
          list.forEach(v => {
            timeList.push(this.fmtYMD(v.scheduleDate))
          })
          this.endDatePicker = this.processDate1(timeList)
        }
      })
    },
    // 预约登记 时间只能选择排班的时间
    processDate1(timeList) {
      return {
        disabledDate(time) {
          const date = new Date(time)
          const year = date.getFullYear()
          const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
          const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
          const timeYMD = year + '-' + month + '-' + day
          if (timeList.filter(v => v === timeYMD).length > 0 && time.getTime() + 3600 * 1000 * 24 > Date.now()) {
            return false
          } else {
            return true
          }
        }
      }
    },
    // 门诊登记  时间只能选择今天及今天之后的时间
    processDate2() {
      return {
        disabledDate(time) {
          return time.getTime() + 3600 * 1000 * 24 < Date.now()
        }
      }
    },
    roomFocus() {
      if (!this.operationInfo.schedule) {
        this.$message({
          message: '请先选择预约手术时间',
          type: 'warning'
        })
        return false
      }
    },
    roomChange(val) {
      const query = {
        schedule: this.operationInfo.schedule,
        operationRoomId: val
      }
      getOptNum(query).then(res => {
        if (res.data.code === 200) {
          this.$confirm('该手术室有' + res.data.allNum + '台次，已预约' + res.data.remNum + '台次，是否确认选择当前手术室', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {}).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消选择'
            })
            this.operationInfo.operationRoomId = null
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scope>
.appointmentDeal {
  padding-bottom: 20px;
  background-color: #f0f2f5;
  .margin20 {
    margin: 20px;
    background-color: #fff;
  }
  .box {
    padding: 20px;
  }
  .scrollWrap {
    min-height: 100%;
    overflow: auto;
  }
  .dialog-footer {
    padding: 10px 20px;
    background-color: #fff;
    margin-bottom: 20px;
  }
  .appointmentInfoBox {
    background-color: #fff;
    margin: 0 20px;
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

