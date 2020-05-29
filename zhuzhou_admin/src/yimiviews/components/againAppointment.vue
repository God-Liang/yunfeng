<template>
  <div class="confirmWrap">
    <div slot="header" class="dialog-header clearfix">
      <div class="title">登记预约</div>
      <div class="buttonBox">
        <el-button
          type="primary"
          class="buttonRadius sumbitColor"
          :loading="sumbitLoading"
          v-waves
          @click="submitForm('dialogLeftTop1_1_data')"
        >提交</el-button>
      </div>
    </div>
    <div class="scrollWrap" ref="appMain">
      <div class="searchBox">
        <el-input placeholder="请输入就诊卡号" v-model="input4">
          <i slot="prefix" @click="searchClick" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
      <el-form
        :model="dialogLeftTop1_1_data"
        ref="dialogLeftTop1_1_data"
        :show-message="true"
        :rules="appointmentConfirmConst.dialogLeftTop1_1_data_rules"
        :inline="true"
        style="padding: 0 15px 0 20px"
      >
        <!-- 门诊信息 -->
        <h3 class="h3title">
          <span>门诊信息</span>
          <p class="applicant">
            <span>申请人：</span>
            <b>{{this.createName}}</b>
            <i></i>
            <span @click="readonlyTage=false" style="cursor: pointer;">编辑</span>
          </p>
        </h3>
        <doorRegister-info
          :doorRegisterInfoForm="doorRegisterInfoForm"
          ref="doorRegisterInfo"
          :readonlyTage="readonlyTage"
        ></doorRegister-info>
        <!-- 检验报告 -->
        <div class="reportBox">
          <el-button type="primary" class="lookReport" @click="isReport = !isReport">点击查看检验检查报告</el-button>
          <el-collapse-transition>
            <div class="sectionBox" v-show="isReport">
              <h2>
                <span>检查报告</span>
              </h2>
              <div class="box">
                <div class="header">
                  <el-row>
                    <el-col :span="24">
                      <div class="fontStyle">报告单编号：49d0dcba-869a-4db9-8d4f-a7e6009ac321</div>
                    </el-col>
                  </el-row>
                </div>
                <div class="content">
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <div class="fontStyle">检查类型：CR</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="fontStyle">检查项目：口腔CT</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="fontStyle">报告时间：2017-10-13</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="fontStyle">开单医生：王凯</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="24">
                      <div class="fontStyle">开单科室：口腔科</div>
                    </el-col>
                  </el-row>
                  <i class="wire-lg"></i>
                  <el-row :gutter="20">
                    <el-col :span="24">
                      <div class="fontStyle">检查结果：测试数据</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="24">
                      <div class="fontStyle">检查描述：测试数据</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="24">
                      <div class="fontStyle">
                        图文报告：
                        <el-button type="text" @click="lookImg">点击查看</el-button>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <h2>
                <span>检验报告</span>
              </h2>
              <div class="box">
                <div class="header">
                  <el-row>
                    <el-col :span="24">
                      <div class="fontStyle">报告单编号：20180722G0045781</div>
                    </el-col>
                  </el-row>
                </div>
                <div class="content">
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <div class="fontStyle">检验项目：尿肾功能</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="fontStyle">样本类型：尿液</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="fontStyle">报告时间：2017-10-13</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="fontStyle">开单医生：王凯</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="24">
                      <div class="fontStyle">开单科室：口腔科</div>
                    </el-col>
                  </el-row>
                  <i class="wire-lg"></i>
                  <el-row type="flex" justify="space-around">
                    <el-col :span="8" style="font-weight:bold;">
                      <div class="fontStyle">项目</div>
                    </el-col>
                    <el-col :span="5" style="font-weight:bold;">
                      <div class="fontStyle">异常标志</div>
                    </el-col>
                    <el-col :span="4" style="font-weight:bold;">
                      <div class="fontStyle">检验结果值</div>
                    </el-col>
                    <el-col :span="3" style="font-weight:bold;">
                      <div class="fontStyle">检验结果值单位</div>
                    </el-col>
                    <el-col :span="4" style="font-weight:bold;">
                      <div class="fontStyle">参考范围</div>
                    </el-col>
                  </el-row>
                  <el-row type="flex" justify="space-around">
                    <el-col :span="8">
                      <div class="fontStyle">尿微量白蛋白</div>
                    </el-col>
                    <el-col :span="5">
                      <div class="fontStyle"></div>
                    </el-col>
                    <el-col :span="4">
                      <div class="fontStyle">&lt;2.00</div>
                    </el-col>
                    <el-col :span="3">
                      <div class="fontStyle">mg/L</div>
                    </el-col>
                    <el-col :span="4">
                      <div class="fontStyle">&lt;19.0</div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </div>
          </el-collapse-transition>
        </div>
        <!-- 拟手术信息 -->
        <h3 class="h3title">
          <span class="h3title">拟手术信息</span>
        </h3>
        <el-form-item label="拟行手术" :label-width="formLabelWidth" prop="operationNo">
          <el-select
            v-model="dialogLeftTop1_1_data.operationNo"
            placeholder="请选择执行手术"
            style="width: 196px"
            filterable
            remote
            reserve-keyword
            :remote-method="getOperation"
            :loading="loading"
            @change="dialogLeftTop1_1_data.doctorId=null;dialogLeftTop1_1_data.doctorTel='';dialogLeftTop1_1_data_operateDoctorList=[]"
          >
            <el-option
              v-for="item in dialogLeftTop1_1_data_operateSurgeryList"
              :label="item.name"
              :value="item.id"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="主刀医生" :label-width="formLabelWidth" prop="doctorId">
          <el-select
            v-model.number="dialogLeftTop1_1_data.doctorId"
            placeholder="请选择医生"
            style="width: 196px"
            filterable
            remote
            reserve-keyword
            :remote-method="getDoctor"
            :loading="loading"
            @focus="doctorIdFocus"
            @change="getPhone"
          >
            <el-option
              v-for="item in dialogLeftTop1_1_data_operateDoctorList"
              :label="item.nick"
              :value="item.id"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth" prop="doctorTel">
          <el-input
            v-model="dialogLeftTop1_1_data.doctorTel"
            auto-complete="off"
            placeholder="请输入联系电话"
            style="width: 196px"
          ></el-input>
        </el-form-item>
        <el-form-item label="拟行麻醉" :label-width="formLabelWidth" prop="anesthetistType">
          <el-cascader
            style="width: 196px"
            :options="anesthetistList"
            @active-item-change="activeChange"
            :props="props"
            v-model="dialogLeftTop1_1_data.anesthetistType"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="ASA评级" :label-width="formLabelWidth" prop="asaLevel">
          <dict-select
            v-model="dialogLeftTop1_1_data.asaLevel"
            placeholder="请选择ASA评级"
            style="width: 196px"
            dict-code="asapj"
          ></dict-select>
        </el-form-item>
        <el-form-item label="侧别" :label-width="formLabelWidth" prop="operationSide">
          <dict-select
            v-model="dialogLeftTop1_1_data.operationSide"
            placeholder="请选择"
            style="width: 196px"
            dict-code="cb"
          ></dict-select>
        </el-form-item>
        <el-form-item label="体位" :label-width="formLabelWidth" prop="operationPosition">
          <dict-select
            v-model="dialogLeftTop1_1_data.operationPosition"
            placeholder="请选择"
            style="width: 196px"
            dict-code="tw"
          ></dict-select>
        </el-form-item>
        <el-form-item label="术前诊断" :label-width="formLabelWidth" prop="beforeDiagnosis">
          <el-select v-model="dialogLeftTop1_1_data.beforeDiagnosis" @change="beforeDiagnosisChange" :remote-method="getDiagnosis" filterable remote reserve-keyword placeholder="请输入开头字母查询" style='width: 196px'>
            <el-option v-for='item in doorRegisterInfoForm_beforeDiagnosis' :label="item.name + '(' + item.icd10 + ')'" :value="item.name" :key='item.icd10'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="切口等级" :label-width="formLabelWidth" prop="incisionLevel">
          <dict-select
            v-model="dialogLeftTop1_1_data.incisionLevel"
            placeholder="请选择"
            style="width: 196px"
            dict-code="qkdj"
          ></dict-select>
        </el-form-item>
        <el-form-item label="特殊感染" :label-width="formLabelWidth" prop="specialInfected">
          <dict-select
            v-model="dialogLeftTop1_1_data.specialInfected"
            placeholder="请选择"
            style="width: 196px"
            dict-code="tsgr"
          ></dict-select>
        </el-form-item>
        <el-form-item label="特殊要求" :label-width="formLabelWidth" prop="specialRequirement">
          <el-input
            v-model="dialogLeftTop1_1_data.specialRequirement"
            auto-complete="off"
            placeholder="请输入特殊要求"
            style="width: 196px"
          ></el-input>
        </el-form-item>
        <el-form-item label="部位" :label-width="formLabelWidth">
          <dict-select
            v-model="dialogLeftTop1_1_data.bodyPosition"
            multiple
            placeholder="请选择"
            style="width: 196px"
            dict-code="bw"
          ></dict-select>
        </el-form-item>
        <el-form-item label="备血" :label-width="formLabelWidth" prop="preparedBlood">
          <el-input
            v-model="dialogLeftTop1_1_data.preparedBlood"
            auto-complete="off"
            placeholder="请输入备血"
            style="width: 196px"
          ></el-input>
        </el-form-item>
        <el-form-item label="指导医生" :label-width="formLabelWidth" prop="guideDoctorName">
          <el-select
            v-model="dialogLeftTop1_1_data.guideDoctorId"
            placeholder="请选择指导医生"
            style="width: 196px"
            filterable
            remote
            reserve-keyword
            :remote-method="getGuideDoctor"
            :loading="loading"
          >
            <el-option
              v-for="item in dialogLeftTop1_1_data_guide_operateDoctorList"
              :label="item.nick"
              :value="item.id"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手术助理" :label-width="formLabelWidth" prop="asstDoctorIds">
          <el-select
            v-model="dialogLeftTop1_1_data.asstDoctorIds"
            multiple
            placeholder="请选择"
            style="width: 196px"
            filterable
            remote
            reserve-keyword
            :remote-method="getAssistantDoctor"
            :loading="loading"
          >
            <el-option
              v-for="item in dialogLeftTop1_1_data_assistant_operateDoctorList"
              :label="item.nick"
              :value="item.id"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="常服抗凝药" :label-width="formLabelWidth">
          <template>
            <el-radio-group v-model="dialogLeftTop1_1_data.isNormalDrug">
              <el-radio :label="0">无</el-radio>
              <el-radio :label="1">有</el-radio>
            </el-radio-group>
          </template>
        </el-form-item>
        <el-form-item label="种类" :label-width="formLabelWidth">
          <template>
            <el-radio-group v-model="dialogLeftTop1_1_data.normalDrugType">
              <el-radio :label="0">阿司匹林</el-radio>
              <el-radio :label="1">波立维</el-radio>
              <el-radio :label="2">其他</el-radio>
              <el-input
                v-model="dialogLeftTop1_1_data.otherDrug"
                v-if="dialogLeftTop1_1_data.normalDrugType == '2'"
                style="display: inline-block; width:200px;"
              ></el-input>
            </el-radio-group>
          </template>
        </el-form-item>
        <el-form-item label="需术前停药" :label-width="formLabelWidth" prop="stopDays">
          <el-input
            v-model="dialogLeftTop1_1_data.stopDays"
            auto-complete="off"
            placeholder="天数"
            style="width: 196px"
          ></el-input>
        </el-form-item>
        <el-form-item label="肝炎相关抗原" :label-width="formLabelWidth">
          <template>
            <el-radio-group v-model="dialogLeftTop1_1_data.hepatitisAntigenType">
              <el-radio :label="0">阴性</el-radio>
              <el-radio :label="1">阳性</el-radio>
              <el-radio :label="2">未报告</el-radio>
            </el-radio-group>
          </template>
        </el-form-item>
        <el-form-item label="植入物" :label-width="formLabelWidth">
          <template>
            <el-radio-group v-model="dialogLeftTop1_1_data.implantType">
              <el-radio :label="1">异物植入物</el-radio>
              <el-radio :label="2">人工植入物</el-radio>
              <el-radio :label="0">无</el-radio>
            </el-radio-group>
          </template>
        </el-form-item>
        <el-form-item label="术前其他诊断" :label-width="formLabelWidth" prop="otherDiagnosis">
          <el-select v-model="dialogLeftTop1_1_data.otherDiagnosis" :remote-method="getOtherDiagnosis" multiple filterable remote reserve-keyword placeholder="请输入开头字母查询" style='width: 400px'>
            <el-option v-for='item in doorRegisterInfoForm_beforeOtherDiagnosis' :label="item.name + '(' + item.icd10 + ')'" :value="item.name" :key='item.icd10'></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import doorRegisterInfo from '@/yimiviews/components/doorRegisterInfo'
import dictSelect from '@/views/form/dictSelect'
import { appointmentConfirmConst } from '@/yimiviews/appointmentManage/columnsConst'
import { read, againRegister } from '@/api/appointmentManage/appointmentRegistration'
import { dictionary } from '@/api/knowledgeManage/dictionary'
import { getDoctorList, getOperationList, getDiagnosis } from '@/api/common/common'
import { userRead } from '@/api/systemManage/user'
import { getSecond } from '@/api/appointmentManage/doorRegister'
import waves from '@/directive/waves/index.js'
import { mapGetters } from 'vuex'
export default {
  components: { doorRegisterInfo, dictSelect },
  data() {
    return {
      readonlyTage: true,
      formLabelWidth: '120px',
      appointmentConfirmConst,
      doorRegisterInfoForm: {},
      loading: false,
      sumbitLoading: false,
      createName: '',
      dialogLeftTop1_1_data: {
        // id: null,
        // appointNo: '',
        operationNo: '',
        operationName: '',
        doctorName: '',
        doctorId: '',
        doctorTel: '',
        guideDoctorName: '',
        guideDoctorId: '',
        asstDoctorIds: [],
        operationSide: '',
        operationPosition: '',
        bodyPosition: [],
        incisionRecord: '',
        incisionLevel: null,
        preparedBlood: '',
        specialInfected: null,
        specialRequirement: '',
        isNormalDrug: null,
        normalDrugType: null,
        otherDrug: '',
        stopDays: '',
        hepatitisAntigenType: '',
        implantType: '',
        beforeDiagnosis: '',
        beforeDiagnosisCode: null,
        otherDiagnosis: [],
        anesthetistType: [],
        asaLevel: null,
        anesthetistName: '',
        anesthetistId: '',
        anesthetistTel: '',
        // schedule: '',
        // scheduleAmpm: '',
        // wardId: '',
        // wardName: '',
        // wardBedNo: '',
        // isDeleted: '',
        // isMainInfo: 1,
        // medicare: '',
        patientId: ''
        // patientName: '',
        // phone: '',
        // idCard: '',
        // sex: '',
        // birthday: '',
        // visitDate: '',
        // visitDepartment: '',
        // visitDoctor: '',
        // diagnosis: ''
      },
      dialogLeftTop1_1_data_operateSurgeryList: [], // 手术列表
      dialogLeftTop1_1_data_operateDoctorList: [], // 医生列表
      dialogLeftTop1_1_data_guide_operateDoctorList: [], // 指导医生列表
      dialogLeftTop1_1_data_assistant_operateDoctorList: [], // 手术助理列表
      doorRegisterInfoForm_beforeDiagnosis: [], // 术前诊断列表
      doorRegisterInfoForm_beforeOtherDiagnosis: [], // 术前其他诊断列表
      input4: '',
      isReport: false, // 查看检验报告
      statusTage: 1, // 当前状态 默认预约登记
      anesthetistList: [],
      props: {
        value: 'value',
        children: 'children'
      }
    }
  },
  directives: {
    waves
  },
  created() {
    this.getAnesthetistList()
    // 非新预约登记
    if (this.$route.params.id && parseInt(this.$route.params.id) !== -1) {
      read(this.$route.params.id).then(res => {
        if (res.data.code === 200) {
          const anesthetistType = [res.data.obj.anesthetistTypeParentId, res.data.obj.anesthetistType]
          // 获取拟手术信息
          for (const key in this.dialogLeftTop1_1_data) {
            if (this.dialogLeftTop1_1_data.hasOwnProperty(key)) {
              this.dialogLeftTop1_1_data[key] = res.data.obj[key]
            }
          }
          this.dialogLeftTop1_1_data.anesthetistType = anesthetistType
          this.createName = res.data.obj.createName
          getSecond(this.dialogLeftTop1_1_data.anesthetistTypeParentId).then(res => {
            if (res.data.code === 200) {
              this.anesthetistList.map(e => {
                if (e.value === this.dialogLeftTop1_1_data.anesthetistTypeParentId) {
                  e.children = res.data.list
                }
              })
            }
          })
          this.doorRegisterInfoForm = { // 获取门诊信息
            visitId: '',
            patientName: '',
            phone: '',
            idCard: '',
            sex: null,
            birthday: '',
            visitDate: '',
            visitDepartmentId: null,
            visitDepartment: '',
            visitDoctorId: null,
            visitDoctor: '',
            visitDiagnosisCode: null,
            visitDiagnosis: ''
          }
          for (const key in this.doorRegisterInfoForm) {
            if (this.doorRegisterInfoForm.hasOwnProperty(key)) {
              this.doorRegisterInfoForm[key] = res.data.obj[key]
            }
          }
          // 根据医生获取手术列表
          this.getOperation(' ')
          // 获取医生列表
          this.getDoctor(this.dialogLeftTop1_1_data.doctorName)
          // 数据类型调整
          this.dialogLeftTop1_1_data.bodyPosition = this.dialogLeftTop1_1_data.bodyPosition === '' ? [] : this.dialogLeftTop1_1_data.bodyPosition.split(',') // 部位
          if (this.dialogLeftTop1_1_data.bodyPosition.length > 0) {
            this.dialogLeftTop1_1_data.bodyPosition.forEach((v, i) => {
              this.dialogLeftTop1_1_data.bodyPosition[i] = parseInt(v)
            })
          }
          this.dialogLeftTop1_1_data.asstDoctorIds = this.dialogLeftTop1_1_data.asstDoctorIds === null ? [] : this.dialogLeftTop1_1_data.asstDoctorIds.split(',') // 手术助理
          if (this.dialogLeftTop1_1_data.asstDoctorIds.length > 0) {
            this.dialogLeftTop1_1_data.asstDoctorIds.forEach((v, i) => {
              this.dialogLeftTop1_1_data.asstDoctorIds[i] = parseInt(v)
            })
          }
          this.dialogLeftTop1_1_data.otherDiagnosis = this.dialogLeftTop1_1_data.otherDiagnosis === '' ? [] : this.dialogLeftTop1_1_data.otherDiagnosis.split(',') // 术前其他诊断
        }
      })
    } else {
      this.createName = this.$store.getters.nick
      this.getOperation(' ') // 初始化医生列表
    }
  },
  mounted() {
    this.setAppMainHeight()
    this.getGuideDoctor(' ')
    this.getAssistantDoctor(' ')
  },
  methods: {
    cancel() {
      this.$store.commit('SET_SECONDARYJUMP', '/appointmentManage/appointmentRegistration')
      this.$root.closeTag()
    },
    doctorIdFocus() {
      if (!this.dialogLeftTop1_1_data.operationNo) {
        this.$message({
          message: '请先选择拟行手术',
          type: 'warning'
        })
      }
    },
    submitForm(formName, status) {
      const doorRegisterValid = this.$refs.doorRegisterInfo.submit()
      this.$refs[formName].validate((valid) => {
        if (valid && doorRegisterValid) {
          this.sumbitLoading = true
          const data = Object.assign({}, this.dialogLeftTop1_1_data, this.doorRegisterInfoForm)
          // 数据类型调整
          data.bodyPosition = data.bodyPosition === [] ? '' : data.bodyPosition.join(',') // 部位
          data.asstDoctorIds = data.asstDoctorIds === [] ? '' : data.asstDoctorIds.join(',') // 手术助理
          data.otherDiagnosis = data.otherDiagnosis === [] ? '' : data.otherDiagnosis.join(',') // 术前其他诊断
          this.anesthetistList.forEach(v1 => {
            if (v1.value === data.anesthetistType[0]) {
              v1.children.forEach(v2 => {
                if (v2.value === data.anesthetistType[1]) {
                  data.anesthetistTypeShow = v2.label
                }
              })
            }
          })
          data.anesthetistTypeParentId = data.anesthetistType[0] // 麻醉方式父id
          data.anesthetistType = data.anesthetistType[1] // 麻醉方式
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
          // 通过数据id获取name
          data.doctorName = this.dialogLeftTop1_1_data_operateDoctorList.filter(v => v.id === data.doctorId)[0].nick
          data.operationName = this.dialogLeftTop1_1_data_operateSurgeryList.filter(v => v.id === data.operationNo)[0].name
          // data.appointId = null
          againRegister(data).then(res => {
            if (res.data.code === 200) {
              this.$message({
                message: '成功重新预约',
                type: 'success'
              })
              this.cancel()
            }
          })
        }
      })
    },
    // 根据医生获取手术列表
    getOperation(query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          getOperationList({ keyword: query.toLowerCase() }).then((res) => {
            if (res.data.code === 200) {
              this.loading = false
              this.dialogLeftTop1_1_data_operateSurgeryList = res.data.list
            }
          })
        }, 200)
      } else {
        this.dialogLeftTop1_1_data_operateSurgeryList = []
      }
    },
    // 医生列表
    getDoctor(query, type) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          getDoctorList({ keyword: query.toLowerCase(), operationId: this.dialogLeftTop1_1_data.operationNo, type: 2 }).then(res => {
            if (res.data.code === 200) {
              this.loading = false
              this.dialogLeftTop1_1_data_operateDoctorList = res.data.list
              // 是否是门诊登记
              const appointmentStatusArray = this.dialogLeftTop1_1_data.appointmentStatusArray ? this.dialogLeftTop1_1_data.appointmentStatusArray.split(',') : []
              if (appointmentStatusArray.indexOf('0') > -1) {
                let isDoctor = false // 是否存在该医生
                this.dialogLeftTop1_1_data_operateDoctorList.forEach(v => {
                  if (v.nick === this.dialogLeftTop1_1_data.doctorName) {
                    isDoctor = true
                  }
                })
                if (!isDoctor && this.dialogLeftTop1_1_data.doctorId) {
                  this.dialogLeftTop1_1_data_operateDoctorList.push({
                    id: this.dialogLeftTop1_1_data.doctorId,
                    nick: this.dialogLeftTop1_1_data.doctorName
                  })
                }
              }
              if (this.dialogLeftTop1_1_data.doctorTel === '' && this.dialogLeftTop1_1_data.doctorId) {
                this.getPhone()
              }
            }
          })
        }, 200)
      } else {
        this.dialogLeftTop1_1_data_operateDoctorList = []
      }
    },
    // 获取指导医生列表
    getGuideDoctor(query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          getDoctorList({ keyword: query.toLowerCase(), type: 1 }).then((res) => {
            this.loading = false
            this.dialogLeftTop1_1_data_guide_operateDoctorList = res.data.list
          })
        }, 200)
      } else {
        this.dialogLeftTop1_1_data_guide_operateDoctorList = []
      }
    },
    // 获取手术助理列表
    getAssistantDoctor(query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          getDoctorList({ keyword: query.toLowerCase(), type: 1 }).then((res) => {
            this.loading = false
            this.dialogLeftTop1_1_data_assistant_operateDoctorList = res.data.list
          })
        }, 200)
      } else {
        this.dialogLeftTop1_1_data_assistant_operateDoctorList = []
      }
    },
    getPhone() {
      // 根据医生获取手机号
      userRead(this.dialogLeftTop1_1_data.doctorId).then((res) => {
        if (res.data.code === 200) {
          this.dialogLeftTop1_1_data.doctorTel = res.data.user.phone
        }
      })
    },
    // 查看图文报告
    lookImg() {

    },
    // 搜索
    searchClick() {
      this.doorRegisterInfoForm = {
        visitId: Math.floor(Math.random() * 1000),
        patientName: '张三',
        phone: '18337120129',
        idCard: '410211199810211012',
        sex: 1,
        birthday: '2011-01-04 00:00:00',
        visitDate: '2020-03-10 00:00:00',
        visitDepartmentId: 2,
        visitDoctorId: 2,
        visitDoctor: '',
        visitDiagnosisCode: '1032',
        visitDiagnosis: '尿路感染'
      }
    },
    // 麻醉一级列表
    getAnesthetistList() {
      dictionary({ type: 'mzlbdl' }).then(res => {
        if (res.data.code === 200) {
          this.anesthetistList = res.data.list
        }
      })
    },
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
    // 获取诊断列表
    getDiagnosis(query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          getDiagnosis({ inputCode: query.toLowerCase(), page: 1, limit: 10 }).then(res => {
            this.loading = false
            if (res.data.code === 200) {
              this.doorRegisterInfoForm_beforeDiagnosis = res.data.list
            }
          })
        }, 200)
      } else {
        this.doorRegisterInfoForm_beforeDiagnosis = []
      }
    },
    // 获取其他诊断列表
    getOtherDiagnosis(query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          getDiagnosis({ inputCode: query.toLowerCase(), page: 1, limit: 10 }).then(res => {
            this.loading = false
            if (res.data.code === 200) {
              this.doorRegisterInfoForm_beforeOtherDiagnosis = res.data.list
            }
          })
        }, 200)
      } else {
        this.doorRegisterInfoForm_beforeOtherDiagnosis = []
      }
    },
    beforeDiagnosisChange(val) {
      this.dialogLeftTop1_1_data.beforeDiagnosisCode = this.doorRegisterInfoForm_beforeDiagnosis.filter(v => v.name === this.dialogLeftTop1_1_data.beforeDiagnosis)[0].icd10
    }
  },
  computed: {
    APPLICANT_NAME() {
      this.createName = this.$store.getters.nick
      return this.$store.getters.nick
    },
    ...mapGetters([
      'userId',
      'nick'
    ])
  }
}
</script>
<style lang="scss" scope>
@import "../../styles/case.scss";
.confirmWrap {
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
  .scrollWrap {
    background-color: #fff;
    overflow: auto;
    height: 100%;
  }
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
  .reportBox {
    margin: 15px 0;
    .lookReport {
      margin: 0 auto;
      display: block;
      border-radius: 0;
      width: 166px;
      height: 40px;
      line-height: 40px;
      padding: 0;
      background-color: #ff6162;
      border: 0;
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
// 检查报告
.el-row {
  padding: 5px 0;
}
.box {
  .el-row {
    .el-col {
      .fontStyle {
        font-size: 14px;
        color: #333;
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


