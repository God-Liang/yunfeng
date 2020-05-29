<template>
  <div class="baseInfo" ref="sectionBox">
    <div class="sectionBox">
      <h2>
        <span>基本信息</span>
        <div class="applicant">
          <span>操作：</span>
          <i v-if="disabled" @click="editInfo" style="cursor: pointer;">编辑</i>
          <i v-else @click="sumbitInfo" style="cursor: pointer;">保存</i>
        </div>
      </h2>
      <div class="box">
        <base-info :dialogLeftTop1_3_data="baseInfo.patientInfo" :disabled="disabled"></base-info>
      </div>
    </div>
    <div class="sectionBox">
      <h2>
        <span>手术流程</span>
        <div class="applicant">
          <span>状态：</span>
          <i style="cursor: pointer;">{{baseInfo.baseInfo.appointmentStatus | getStatusName}}</i>
        </div>
      </h2>
      <div class="box">
        <surgery-path :appointment="appointment"></surgery-path>
      </div>
    </div>
  </div>
</template>
<script>
import baseInfo from '@/yimiviews/components/baseInfo'
import treatmentInfo from '@/yimiviews/components/treatmentInfo'
import surgeryPath from '@/yimiviews/components/path'
import { update } from '@/api/patientArchives'
import _ from 'lodash'
export default {
  components: { baseInfo, treatmentInfo, surgeryPath },
  data() {
    return {
      // 流程路径
      appointment: {
        path: 0
      },
      // 就诊信息
      dialogLeftTop1_1_data: {
        visitId: '',
        patientName: '',
        phone: '',
        idCard: '',
        birthday: '',
        sex: null,
        visitDate: '',
        visitDepartment: null,
        visitDoctorId: null,
        beforeDiagnosisCode: null
      },
      // 基本信息
      dialogLeftTop1_3_data: {},
      disabled: true
    }
  },
  props: ['baseInfo'],
  filters: {
    getStatusName(status) {
      // 当前状态(门诊预约：0，预约登记：1，登记审核：2，预约处理：3，处理审核：4，手术预送：5，手术预送审核：6，手术确认：7，入院宣教：8，手术报到：9，麻醉评估：10，中心核对：11，患者交接：12，出院评估：13，术后随访：14，完成：15，退出日间：100)
      const statusNames = [
        { name: '门诊预约', value: 0 },
        { name: '预约登记', value: 1 },
        { name: '登记审核', value: 2 },
        { name: '预约处理', value: 3 },
        { name: '处理审核', value: 4 },
        { name: '手术预送', value: 5 },
        { name: '手术预送审核', value: 6 },
        { name: '手术确认', value: 7 },
        { name: '入院宣教', value: 8 },
        { name: '手术报到', value: 9 },
        { name: '麻醉评估', value: 10 },
        { name: '中心核对', value: 11 },
        { name: '患者交接', value: 12 },
        { name: '出院评估', value: 13 },
        { name: '术后随访', value: 14 },
        { name: '完成', value: 15 },
        { name: '手术报到后', value: 90 },
        { name: '退出日间', value: 100 }
      ]
      const result = _.find(statusNames, { value: status })
      return result ? result.name : ''
    }
  },
  mounted() {
    var CH = document.body.offsetHeight
    this.$refs.sectionBox.style.height = CH - 190 + 'px'
    this.appointment.path = this.baseInfo.baseInfo.appointmentStatus
  },
  methods: {
    editInfo() {
      this.disabled = false
    },
    sumbitInfo() {
      const patientInfo = {
        patientName: '',
        phone: '',
        idCard: '',
        sex: null,
        birthday: '',
        marry: null,
        educationalLevel: null,
        backupTel: '',
        nationality: null,
        nation: null,
        birthAreaId: [],
        liveAreaId: [],
        liveStreet: '',
        liveDetailAddr: '',
        occupation: null,
        companyName: '',
        companyTel: '',
        companyAreaId: [],
        companyStreet: '',
        companyDetialAddr: '',
        refName: '',
        refTel: '',
        refRelation: null,
        refAreaId: [],
        refStreet: '',
        refDetialAddr: '',
        id: null
      }
      for (const key in patientInfo) {
        if (patientInfo.hasOwnProperty(key)) {
          patientInfo[key] = this.baseInfo.patientInfo[key]
        }
      }
      patientInfo.liveAreaId = patientInfo.liveAreaId === [] ? '' : patientInfo.liveAreaId.join(',')
      patientInfo.companyAreaId = patientInfo.companyAreaId === [] ? '' : patientInfo.companyAreaId.join(',')
      patientInfo.birthAreaId = patientInfo.birthAreaId === [] ? '' : patientInfo.birthAreaId.join(',')
      patientInfo.refAreaId = patientInfo.refAreaId === [] ? '' : patientInfo.refAreaId.join(',')
      patientInfo.appointRelId = this.baseInfo.baseInfo.id
      patientInfo.patientId = this.baseInfo.baseInfo.patientId
      update(patientInfo).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: '编辑成功',
            type: 'success'
          })
          this.disabled = true
        }
        this.$emit('update', true)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../styles/case.scss";
.baseInfo {
  overflow: auto;
}
.applicant {
  padding: 0;
  margin: 0;
  float: right;
  height: 60px;
  line-height: 60px;
  font-size: 16px;
  color: #666;
  font-weight: normal;
  i {
    font-weight: normal;
    color: #306EED;
    font-style: normal;
  }
}
</style>
