<template>
  <div>
    <el-form label-width="120px" :inline="true" :rules="appointmentConfirmConst.doorRegisterInfo_rules" ref="doorRegisterInfoForm"
             :model="doorRegisterInfoForm" :disabled="readonlyTage">
      <el-form-item label="就诊卡号" prop="visitId">
        <el-input style='width: 196px' auto-complete="off" placeholder="请输入就诊卡号" v-model="doorRegisterInfoForm.visitId"></el-input>
      </el-form-item>
      <el-form-item label="患者姓名" prop="patientName">
        <el-input v-model="doorRegisterInfoForm.patientName" auto-complete="off" placeholder="请输入姓名" style='width: 196px'></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input v-model="doorRegisterInfoForm.phone" auto-complete="off" placeholder="请输入联系电话" style='width: 196px'></el-input>
      </el-form-item>
      <el-form-item label="身份证号" prop="idCard">
        <el-input v-model="doorRegisterInfoForm.idCard" auto-complete="off" placeholder="请输入身份证" style='width: 196px'></el-input>
      </el-form-item>
      <el-form-item label="出生日期" prop="birthday">
        <el-date-picker type="date" placeholder="选择日期" v-model="doorRegisterInfoForm.birthday"
                        style='width: 196px;' value-format="yyyy-MM-dd HH:mm:ss" :picker-options="startDatePicker"></el-date-picker>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <dict-select v-model="doorRegisterInfoForm.sex" placeholder="请选择性别" style='width: 196px' dict-code="xb">
        </dict-select>
      </el-form-item>
      <el-form-item label="就诊日期" prop="visitDate">
        <el-date-picker type="date" placeholder="选择日期" v-model="doorRegisterInfoForm.visitDate" style='width: 196px;'
                        value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
      </el-form-item>
      <el-form-item label="门诊科室" prop="visitDepartmentId">
        <el-select v-model="doorRegisterInfoForm.visitDepartmentId" placeholder="请选择就诊科室" style='width: 196px'
                   getDiagnosis :loading="loading" @change="visitDepartmentChange">
          <el-option v-for='item in doorRegisterInfoForm_departmentList' :label="item.name" :value="item.id"
                     :key='item.id'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="门诊医生" prop="visitDoctor">
        <el-select v-model="doorRegisterInfoForm.visitDoctor" filterable remote reserve-keyword :remote-method="getDoctor" placeholder="请输入关键词搜索" style='width: 196px'
                   :loading="loading" @change="visitDoctorChange">
          <el-option v-for='item in doorRegisterInfoForm_doctorList' :label="item.nick" :value="item.nick"
                     :key='item.id'></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="门诊诊断" prop="visitDiagnosis">
        <el-select v-model="doorRegisterInfoForm.visitDiagnosis" @change="nameChange" :remote-method="getDiagnosis" filterable remote reserve-keyword placeholder="请输入开头字母查询" style='width: 196px'>
          <el-option v-for='item in doorRegisterInfoForm_visitDiagnosisist' :label="item.name + '(' + item.icd10 + ')'" :value="item.name" :key='item.icd10'></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import dictSelect from '@/views/form/dictSelect'
  import { appointmentConfirmConst } from '@/yimiviews/appointmentManage/columnsConst'
  import { getDiagnosis } from '@/api/common/common'
  import { userSelect } from '@/api/systemManage/user'
  import { getDepartmentSelect } from '@/api/systemManage/user'
  export default {
    components: {
      dictSelect
    },
    data() {
      return {
        doorRegisterInfoForm_departmentList: [],
        doorRegisterInfoForm_doctorList: [],
        doorRegisterInfoForm_visitDiagnosisist: [], // 门诊诊断列表
        appointmentConfirmConst,
        loading: false,
        selectedItem: [],
        startDatePicker: this.beginDate()
      }
    },
    props: {
      doorRegisterInfoForm: {
        type: Object,
        default: function() {
          return {}
        }
      },
      // 是否重置表单
      doorRegisterInfoTage: {
        type: Boolean,
        default: false
      },
      readonlyTage: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      doorRegisterInfoTage(val) {
        if (val) {
          this.$refs['doorRegisterInfoForm'].resetFields()
          this.$emit('doorRegisterInfoChange', false)
        }
      }
    },
    mounted() {
      this.getDepartmentSelect()
    },
    methods: {
      beginDate() {
        return {
          disabledDate(time) {
            return time.getTime() > Date.now()
          }
        }
      },
      submit() {
        let validFlag = false
        this.$refs['doorRegisterInfoForm'].validate((valid) => {
          if (valid) {
            validFlag = true
          }
        })
        return validFlag
      },
      // 选择科室列表
      getDepartmentSelect() {
        getDepartmentSelect().then(res => {
          this.doorRegisterInfoForm_departmentList = res.data.list
        })
      },
      // 选择医生列表
      getDoctor(query) {
        if (query !== '') {
          this.loading = true
          setTimeout(() => {
            userSelect({ keyword: query.toLowerCase(), type: 1 }).then((res) => {
              this.loading = false
              this.doorRegisterInfoForm_doctorList = res.data.list
            })
          }, 200)
        } else {
          this.doorRegisterInfoForm_doctorList = []
        }
      },
      // 获取诊断列表
      getDiagnosis(query) {
        if (query !== '') {
          this.loading = true
          setTimeout(() => {
            getDiagnosis({ inputCode: query.toLowerCase(), page: 1, limit: 10 }).then((res) => {
              this.loading = false
              this.doorRegisterInfoForm_visitDiagnosisist = res.data.list
            })
          }, 200)
        } else {
          this.doorRegisterInfoForm_visitDiagnosisist = []
        }
      },
      // 门诊诊断获取name
      nameChange(val) {
        this.$nextTick(() => {
          this.doorRegisterInfoForm.visitDiagnosis = val
        })
        this.doorRegisterInfoForm.visitDiagnosisCode = this.doorRegisterInfoForm_visitDiagnosisist.filter(v => v.name === this.doorRegisterInfoForm.visitDiagnosis)[0].icd10
      },
      // 门诊科室获取name
      visitDepartmentChange(val) {
        this.$nextTick(() => {
          this.doorRegisterInfoForm.visitDepartmentId = val
        })
        this.doorRegisterInfoForm.visitDepartment = this.doorRegisterInfoForm_departmentList.filter(v => v.id === this.doorRegisterInfoForm.visitDepartmentId)[0].name
      },
      // 门诊医生获取id
      visitDoctorChange(val) {
        this.$nextTick(() => {
          this.doorRegisterInfoForm.visitDoctor = val
        })
        this.doorRegisterInfoForm.visitDoctorId = this.doorRegisterInfoForm_doctorList.filter(v => v.nick === this.doorRegisterInfoForm.visitDoctor)[0].id
      }
    }
  }
</script>

