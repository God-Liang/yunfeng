<template>
  <div class="confirmWrapDoor" v-loading="sumbitLoading" element-loading-text="数据提交中，请稍等...">
    <div slot="header" class="dialog-header clearfix">
      <div class="title">门诊登记</div>
      <div class="buttonBox">
        <el-button
          type="primary"
          class="buttonRadius sumbitColor"
          :loading="sumbitLoading"
          v-waves
          @click="submitForm('doorRegisterForm')"
        >提交</el-button>
      </div>
    </div>
    <div class="scrollWrap" ref="appMain">
      <div class="searchBox">
        <el-input placeholder="请输入就诊卡号" v-model="MedicalNumber">
          <i slot="prefix" @click="searchClick" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
      <div class="imgBox" v-show="isEmpty">
        <img src="@/assets/images/appointmentEmpty.jpg" alt>
        <span>很遗憾未查询到数据...</span>
      </div>
      <div v-show="!isEmpty">
        <h3 class="h3title">
          <span>门诊信息</span>
          <p class="applicant">
            <span>申请人：</span>
            <b>{{APPLICANT_NAME}}</b>
            <i></i>
            <span @click="readonlyTage=false" style="cursor: pointer;">编辑</span>
          </p>
        </h3>
        <doorRegister-info
          :doorRegisterInfoForm="doorRegisterInfoForm"
          :readonlyTage="readonlyTage"
          ref="doorRegisterInfo"
          :doorRegisterInfoTage="doorRegisterInfoTage"
          @doorRegisterInfoChange="doorRegisterInfoChange"
        ></doorRegister-info>
        <el-form
          label-width="120px"
          :inline="true"
          :rules="doorRegisterRules"
          ref="doorRegisterForm"
          :model="doorRegisterForm"
        >
          <el-form-item label="拟手术名称" prop="operationNo">
            <el-select
              v-model="doorRegisterForm.operationNo"
              placeholder="请选择拟行手术"
              style="width: 196px"
              filterable
              remote
              reserve-keyword
              :remote-method="getOperation"
              :loading="loading"
              @change="getDoctor(nick)"
            >
              <el-option
                v-for="item in operateSurgeryList"
                :label="item.name"
                :value="item.id"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="拟手术医生" prop="doctorId">
            <el-select
              v-model="doorRegisterForm.doctorId"
              placeholder="请输入关键词搜索"
              style="width: 196px"
              filterable
              remote
              reserve-keyword
              :remote-method="getDoctor"
              :loading="loading"
              @focus="doctorIdFocus"
            >
              <el-option
                v-for="item in operateDoctorList"
                :label="item.nick"
                :value="item.id"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="拟麻醉方式" prop="anesthetistType">
            <el-cascader
              style="width: 196px"
              :options="anesthetistList"
              @active-item-change="activeChange"
              :props="props"
              v-model="doorRegisterForm.anesthetistType"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="拟手术时间" prop="schedule">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="doorRegisterForm.schedule"
              style="width: 196px;"
              value-format="yyyy-MM-dd HH:mm:ss"
              :picker-options="endDatePicker"
            ></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import doorRegisterInfo from '@/yimiviews/components/doorRegisterInfo'
import dictSelect from '@/views/form/dictSelect'
import { getDoctorList, getOperationList, getHisBaseInfo } from '@/api/common/common'
import { dictionary } from '@/api/knowledgeManage/dictionary'
import { save, getSecond } from '@/api/appointmentManage/doorRegister'
import { mapGetters } from 'vuex'
import waves from '@/directive/waves/index.js'
const doorRegisterInfoDefult = {
  visitId: '',
  patientName: '',
  phone: '',
  idCard: '',
  sex: null,
  birthday: '',
  visitDate: '',
  visitDepartmentId: null,
  visitDoctorId: null,
  visitDoctor: '',
  visitDiagnosisCode: null
}
const doorRegisterDefult = {
  doctorId: null,
  operationNo: null,
  anesthetistType: [],
  schedule: ''
}
export default {
  name: 'doorRegister',
  components: { doorRegisterInfo, dictSelect },
  data() {
    return {
      MedicalNumber: '', // 就诊卡号
      loading: false,
      readonlyTage: true,
      doorRegisterInfoForm: {
        visitId: '',
        patientName: '',
        phone: '',
        idCard: '',
        sex: null,
        birthday: '',
        visitDate: '',
        visitDepartmentId: null,
        visitDoctorId: null,
        visitDoctor: '',
        visitDiagnosisCode: null
      },
      doorRegisterRules: {
        doctorId: { required: true, message: '请选择拟手术医生', trigger: 'change' },
        operationNo: { required: true, message: '请选择拟手术名称', trigger: 'change' },
        anesthetistType: { required: true, message: '请选择拟麻醉方式', trigger: 'change' },
        schedule: { required: true, message: '请选择拟手术时间', trigger: 'change' }
      },
      doorRegisterForm: Object.assign({}, doorRegisterDefult),
      operateDoctorList: [], // 医生列表
      operateSurgeryList: [], // 手术列表
      anesthetistList: [], // 麻醉方式列表
      props: {
        value: 'value',
        children: 'children'
      },
      sumbitLoading: false,
      doorRegisterInfoTage: false,
      isEmpty: false,
      endDatePicker: this.processDate()
    }
  },
  mounted() {
    this.getOperation(' ')
    this.getAnesthetistList()
    this.setAppMainHeight()
  },
  computed: {
    APPLICANT_NAME() {
      this.doorRegisterForm.createName = this.$store.getters.nick
      return this.$store.getters.nick
    },
    ...mapGetters([
      'userId',
      'nick'
    ])
  },
  directives: {
    waves
  },
  methods: {
    // 医生列表
    getDoctor(query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          getDoctorList({ keyword: query.toLowerCase(), operationId: this.doorRegisterForm.operationNo, type: 1 }).then(res => {
            if (res.data.code === 200) {
              this.loading = false
              this.operateDoctorList = res.data.list
              this.doorRegisterForm.doctorId = null
              this.doorRegisterForm.doctorName = ''
              // 判断当前角色是否可以做该手术
              if (this.operateDoctorList && this.operateDoctorList.length > 0) {
                this.operateDoctorList.forEach(v => {
                  if (v.nick === this.nick) { // 可以做选中的手术就默认选中当前角色
                    this.doorRegisterForm.doctorId = this.userId
                    this.doorRegisterForm.doctorName = this.nick
                  }
                })
              } else {
                this.doorRegisterForm.doctorId = null
                this.doorRegisterForm.doctorName = ''
              }
            }
          })
        }, 200)
      } else {
        this.operateDoctorList = []
      }
    },
    // 手术列表
    getOperation(query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          getOperationList({ keyword: query.toLowerCase() }).then((res) => {
            this.loading = false
            this.operateSurgeryList = res.data.list
          })
        }, 200)
      } else {
        this.operateSurgeryList = []
      }
    },
    // 选择手术先选择医生
    doctorIdFocus() {
      if (!this.doorRegisterForm.operationNo) {
        this.$message({
          message: '请先选择拟手术名称',
          type: 'warning'
        })
      }
    },
    // 搜索
    searchClick() {
      getHisBaseInfo({ visitId: this.MedicalNumber }).then(res => {
        if (res.data.code === 200) {
          if (!res.data.baseInfo) {
            this.isEmpty = true
          } else {
            this.isEmpty = false
            this.doorRegisterInfoForm = res.data.baseInfo
            this.doorRegisterInfoForm.visitDiagnosis = this.doorRegisterInfoForm.diagnosis
          }
        }
      })
    },
    // 提交
    submitForm(formName) {
      const doorRegisterValid = this.$refs.doorRegisterInfo.submit()
      this.$refs[formName].validate((valid) => {
        if (valid && doorRegisterValid) {
          this.sumbitLoading = true
          const data = Object.assign({}, this.doorRegisterInfoForm, this.doorRegisterForm)
          // 通过数据id获取name
          data.doctorName = this.operateDoctorList.filter(v => v.id === data.doctorId)[0].nick
          data.operationName = this.operateSurgeryList.filter(v => v.id === data.operationNo)[0].name
          this.anesthetistList.forEach(v1 => {
            if (v1.value === data.anesthetistType[0]) {
              v1.children.forEach(v2 => {
                if (v2.value === data.anesthetistType[1]) {
                  data.anesthetistTypeShow = v2.label
                }
              })
            }
          })
          data.anesthetistTypeParentId = data.anesthetistType[0]
          data.anesthetistType = data.anesthetistType[1]
          const anesthetistTypeShow = []
          this.anesthetistList.forEach(v => {
            if (v.value === data.anesthetistTypeParentId) {
              anesthetistTypeShow[0] = v.label
            }
            v.children.forEach(v2 => {
              if (v2.value === data.anesthetistType) {
                anesthetistTypeShow[1] = v.label
              }
            })
          })
          data.anesthetistTypeShow = anesthetistTypeShow.join('/') // 麻醉方式名称
          data.appointmentStatus = 0 // 门诊登记默认状态为0
          save(data).then(res => {
            if (res.data.code === 200) {
              this.sumbitLoading = false
              this.doorRegisterInfoForm = doorRegisterInfoDefult
              this.doorRegisterForm = doorRegisterDefult
              this.doorRegisterInfoTage = true
              this.resetForm('doorRegisterForm')
              this.$message({
                message: '提交成功',
                type: 'success'
              })
            }
          })
        }
      })
    },
    // 取消校验效果
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    doorRegisterInfoChange(val) {
      this.doorRegisterInfoTage = val
    },
    // 麻醉一级列表
    getAnesthetistList() {
      dictionary({ type: 'mzlbdl' }).then(res => {
        if (res.data.code === 200) {
          this.anesthetistList = res.data.list
          this.anesthetistList.map(v => {
            v.children = []
          })
        }
      })
    },
    // 通过一级列表获取二级列表
    activeChange(val) {
      getSecond(val[0]).then(res => {
        if (res.data.code === 200) {
          var data = res.data.list
          data.forEach(v => {
            delete v.children
          })
          this.anesthetistList.forEach((e, i) => {
            if (e.value === val[0]) {
              this.$set(this.anesthetistList[i], 'children', data)
            }
          })
        }
      })
    },
    setAppMainHeight() {
      const bodyHeight = document.body.offsetHeight
      const appMainHeight = bodyHeight - 196
      this.$refs.appMain.style.height = appMainHeight + 'px'
    },
    // 提出结束时间必须大于当前时间
    processDate() {
      return {
        disabledDate(time) {
          return time.getTime() + 3600 * 1000 * 24 < Date.now()
        }
      }
    }
  }
}
</script>
<style lang="scss" scope>
.confirmWrapDoor {
  background-color: #f0f2f5;
  padding: 15px;
  height: calc(100% - 15px);
  .dialog-header {
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #979797;
    padding: 0 20px;
    background-color: #fff;
    .title {
      float: left;
      font-size: 20px;
      color: #333;
      font-weight: bold;
    }
    .buttonBox {
      float: right;
    }
  }
  .imgBox {
    background-color: #fff;
    overflow: auto;
    height: calc(100% - 60px);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    span {
      margin-top: 30px;
      font-size: 16px;
      color: #979797;
      padding-bottom: 100px;
    }
  }
  .scrollWrap {
    background-color: #fff;
    overflow: auto;
    height: 100%;
    padding: 0 15px 0 20px;
    .searchBox {
      display: flex;
      justify-content: flex-start;
      height: 95px;
      .el-input {
        width: 600px;
        margin: 30px auto 10px;
        input {
          height: 40px;
          line-height: 40px;
          border-radius: 0;
          font-size: 16px;
        }
        .el-input__prefix {
          left: auto;
          right: 0;
          width: 80px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          background: #1cc09f;
          color: #fff;
          cursor: pointer;
          i {
            font-size: 24px;
            line-height: 36px;
            display: block;
            width: 100%;
          }
        }
      }
      .el-button {
        margin-left: 15px;
      }
    }
    h3 {
      padding: 0 15px 0 0;
      font-weight: normal;
      font-size: 16px;
      color: #fff;
      margin: 0 0 30px;
      & > span {
        display: inline-block;
        width: 122px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        background: #4a90e2;
      }
      &.h3title {
        border-bottom: 2px solid #4a90e2;
        .applicant {
          padding: 0;
          margin: 0;
          float: right;
          height: 30px;
          line-height: 30px;
          font-size: 16px;
          color: #666;
          i {
            height: 10px;
            width: 1px;
            display: inline-block;
            background-color: #666;
            margin: 0 8px;
          }
          b {
            font-weight: normal;
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
</style>
