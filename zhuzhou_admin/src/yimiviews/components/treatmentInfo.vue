<template>
  <div>
    <el-form label-width="120px" :inline="true" :rules="appointmentConfirmConst.treatmentInfo_rules" ref = 'treatmentInfoForm'
             :model="dialogLeftTop1_1_data">
      <el-form-item label="就诊卡号" prop="visitId">
        <el-input style='width: 196px' auto-complete="off" placeholder="请输入就诊卡号" v-model="dialogLeftTop1_1_data.visitId"></el-input>
      </el-form-item>
      <br/>
      <el-form-item label="患者姓名" prop="patientName">
        <el-input v-model="dialogLeftTop1_1_data.patientName" auto-complete="off" placeholder="请输入姓名" style='width: 196px'></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input v-model="dialogLeftTop1_1_data.phone" auto-complete="off" placeholder="请输入联系电话" style='width: 196px'></el-input>
      </el-form-item>
      <el-form-item label="身份证号" prop="idCard">
        <el-input v-model="dialogLeftTop1_1_data.idCard" auto-complete="off" placeholder="请输入身份证" style='width: 196px'></el-input>
      </el-form-item>
      <el-form-item label="出生日期" prop="birthday">
        <el-date-picker type="date" placeholder="选择日期" v-model="dialogLeftTop1_1_data.birthday"
                        style='width: 196px;' value-format="yyyy-MM-dd HH:mm:ss" :picker-options="startDatePicker"></el-date-picker>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <dict-select v-model="dialogLeftTop1_1_data.sex" placeholder="请选择性别" style='width: 196px' dict-code="xb">
        </dict-select>
      </el-form-item>
      <el-form-item label="就诊日期" prop="visitDate">
        <el-date-picker type="date" placeholder="选择日期" v-model="dialogLeftTop1_1_data.visitDate" style='width: 196px;'
                        value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
      </el-form-item>
      <el-form-item label="就诊科室" prop="visitDepartment">
        <el-select v-model="dialogLeftTop1_1_data.visitDepartment" placeholder="请选择就诊科室" style='width: 196px'
                   filterable :loading="loading">
          <el-option v-for='item in dialogLeftTop1_1_data_departmentList' :label="item.name" :value="item.id"
                     :key='item.id'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="就诊医生" prop="visitDoctorId">
        <el-select v-model="dialogLeftTop1_1_data.visitDoctorId" filterable placeholder="请选择就诊医生" style='width: 196px'
                   :loading="loading">
          <el-option v-for='item in dialogLeftTop1_1_data_doctorList' :label="item.nick" :value="item.id"
                     :key='item.id'></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="术前诊断" prop="beforeDiagnosisCode">
        <el-select v-model="dialogLeftTop1_1_data.beforeDiagnosisCode" :remote-method="getDiagnosis" filterable remote reserve-keyword placeholder="请选择诊断" style='width: 196px'>
          <el-option v-for='item in beforeDiagnosisList' :label="item.name + '(' + item.icd10 + ')'" :value="item.icd10" :key='item.icd10'></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import dictSelect from '@/views/form/dictSelect'
  import { appointmentConfirmConst } from '@/yimiviews/appointmentManage/columnsConst'
  import { getDoctorList } from '@/api/common/common'
  import { getDepartmentSelect } from '@/api/systemManage/user'
  import { redact } from '@/api/transferManage/transfer'
  import { getDiagnosis } from '@/api/common/common'
  export default {
    components: {
      dictSelect
    },
    data() {
      return {
        dialogLeftTop1_1_data_departmentList: [],
        dialogLeftTop1_1_data_doctorList: [],
        appointmentConfirmConst,
        loading: false,
        startDatePicker: this.beginDate(),
        beforeDiagnosisList: []
      }
    },
    props: {
      dialogLeftTop1_1_data: {
        type: Object,
        default: function() {
          return {}
        }
      },
      treatmentInfoTage: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      this.getDepartmentSelect()
      this.getDoctor(' ')
      this.getDiagnosis(' ')
      // 审核成功
      if (this.$route.query.passId) {
        redact({ id: this.$route.query.passId }).then((res) => {
          this.dialogLeftTop1_1_data.visitId = res.data.patient.visitId
          this.dialogLeftTop1_1_data.patientName = res.data.patient.patientName
          this.dialogLeftTop1_1_data.phone = res.data.patient.phone
          this.dialogLeftTop1_1_data.idCard = res.data.patient.idCard
          this.dialogLeftTop1_1_data.sex = res.data.patient.sex
          this.dialogLeftTop1_1_data.birthday = res.data.patient.birthday
        })
      }
    },
    watch: {
      treatmentInfoTage(val) {
        if (val) {
          this.$refs['treatmentInfoForm'].resetFields()
          this.$emit('treatmentChange', false)
        }
      }
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
        this.$refs['treatmentInfoForm'].validate((valid) => {
          if (valid) {
            validFlag = true
          }
        })
        return validFlag
      },
      // 选择科室列表
      getDepartmentSelect() {
        getDepartmentSelect().then(res => {
          this.dialogLeftTop1_1_data_departmentList = res.data.list
        })
      },
      getDoctor(query) {
        if (query !== '') {
          this.loading = true
          setTimeout(() => {
            getDoctorList({ keyword: query.toLowerCase(), type: 1 }).then((res) => {
              this.loading = false
              this.dialogLeftTop1_1_data_doctorList = res.data.list
            })
          }, 200)
        } else {
          this.dialogLeftTop1_1_data_doctorList = []
        }
      },
      // 获取诊断列表
      getDiagnosis(query) {
        if (query !== '') {
          this.loading = true
          setTimeout(() => {
            getDiagnosis({ inputCode: query.toLowerCase(), page: 1, limit: 10 }).then((res) => {
              this.loading = false
              this.beforeDiagnosisList = res.data.list
            })
          }, 200)
        } else {
          this.beforeDiagnosisList = []
        }
      }
    }
  }
</script>

