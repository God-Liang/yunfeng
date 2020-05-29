<template>
  <div class="surgeryRecord" ref="sectionBox">
    <div class="sectionBox">
      <h2>
        <span>预约信息</span>
      </h2>
      <div class="box">
        <div class="header">
          <el-row>
            <el-col :span="6">
              <div class="fontStyle">预约单号：{{appointment.appointNo}}</div>
            </el-col>
            <el-col :span="6">
              <div class="fontStyle">申请人： {{appointment.createUser}}</div>
            </el-col>
            <el-col :span="6">
              <div class="fontStyle">申请时间：{{appointment.createTime}}</div>
            </el-col>
            <el-col :span="6" align="center">
              <div class="fontStyle" style="color: #409EFF;">当前状态: &nbsp;{{appointment.appointmentStatus | statusFilter}}</div>
            </el-col>
          </el-row>
        </div>
        <div class="title">拟手术信息</div>
        <div class="content">
          <el-row>
            <el-col :span="6">
              <div class="fontStyle">拟手术名称：{{appointmentRel.operationName}}</div>
            </el-col>
            <el-col :span="6">
              <div class="fontStyle">拟主刀医生： {{appointmentRel.doctorName}}</div>
            </el-col>
            <el-col :span="6">
              <div class="fontStyle">联系方式：{{appointmentRel.doctorTel}}</div>
            </el-col>
            <el-col :span="6">
              <div class="fontStyle">手术助理：{{appointmentRel.asstDoctorIds}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <div class="fontStyle">侧 别：{{appointmentRel.operationSideShow}}</div>
            </el-col>
            <el-col :span="6">
              <div class="fontStyle">体 位: {{appointmentRel.operationPositionShow}}</div>
            </el-col>
            <el-col :span="6">
              <div class="fontStyle">部位：{{appointmentRel.bodyPositionShow}}</div>
            </el-col>
            <el-col :span="6">
              <div class="fontStyle">切口等级：{{appointmentRel.incisionLevelShow}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <div class="fontStyle">备 血：{{appointmentRel.preparedBlood}}</div>
            </el-col>
            <el-col :span="6">
              <div class="fontStyle">特殊感染: {{appointmentRel.specialInfectedShow}}</div>
            </el-col>
            <el-col :span="6">
              <div class="fontStyle">特殊要求：{{appointmentRel.specialRequirement}}</div>
            </el-col>
            <el-col :span="6">
              <div class="fontStyle">指导医生：{{appointmentRel.guideDoctorName}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <div class="fontStyle">常服抗凝药：{{appointmentRel.isNormalDrugShow}}</div>
            </el-col>
            <el-col :span="6">
              <div class="fontStyle">种 类: {{appointmentRel.normalDrugTypeShow}}</div>
            </el-col>
            <el-col :span="6">
              <div class="fontStyle">需术前停药：{{appointmentRel.stopDays}}</div>
            </el-col>
            <el-col :span="6">
              <div class="fontStyle">肝炎相关抗原：{{appointmentRel.hepatitisAntigenTypeShow}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <div class="fontStyle">植入物：{{appointmentRel.implantTypeShow}}</div>
            </el-col>
            <el-col :span="6">
              <div class="fontStyle">术前诊断: {{appointmentRel.beforeDiagnosis}}</div>
            </el-col>
            <el-col :span="6">
              <div class="fontStyle">术前其他诊断：{{appointmentRel.otherDiagnosis}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <div class="fontStyle">拟手术时间：{{appointmentRel.schedule | timeFilter}}&nbsp;{{appointmentRel.scheduleAmpm}}</div>
            </el-col>
            <el-col :span="6">
              <div class="fontStyle">拟手术间: {{appointmentRel.wardName}}</div>
            </el-col>
            <el-col :span="6">
              <div class="fontStyle">拟接收病房：{{appointmentRel.wardName}}</div>
            </el-col>
            <el-col :span="6">
              <div class="fontStyle">拟床位号：{{appointmentRel.wardBedNo}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <div class="fontStyle">拟行麻醉：{{appointmentRel.anesthetistTypeShow}}</div>
            </el-col>
            <el-col :span="6">
              <div class="fontStyle">ASA评级: {{appointmentRel.asaLevelShow}}</div>
            </el-col>
            <el-col :span="6">
              <div class="fontStyle">麻醉医生：{{appointmentRel.anesthetistName}}</div>
            </el-col>
            <el-col :span="6">
              <div class="fontStyle">麻醉医生电话：{{appointmentRel.anesthetistTel}}</div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div class="sectionBox">
      <h2>
        <span>手术信息</span>
      </h2>
      <div class="box">
        <div class="header">
          <el-row >
            <el-col :span="6">
              <div class="fontStyle">手术单号：{{operationInfo.operationNo}}</div>
            </el-col>
            <el-col :span="6">
              <div class="fontStyle">发送人： {{operationInfo.sender}}</div>
            </el-col>
            <el-col :span="6">
              <div class="fontStyle">发送时间：{{operationInfo.sendTime}}</div>
            </el-col>
          </el-row>
        </div>
        <surgery-info :operationInfo="operationInfo"></surgery-info>
      </div>
    </div>
    <div class="sectionBox">
      <h2>
        <span>手术路径文档</span>
      </h2>
      <div class="box">
        <data-check :appointment="appointment" :disabled="true" :dataList="dataList"></data-check>
      </div>
    </div>
  </div>
</template>
<script>
import surgeryInfo from '@/yimiviews/case/surgeryInfo'
import dataCheck from '@/yimiviews/components/dataCheck'
import { getList } from '@/api/systemManage/user'
import { readCheckList, checkDetail } from '@/api/appointmentManage/check'
import _ from 'lodash'
export default {
  components: { surgeryInfo, dataCheck },
  props: {
    appointment: { // 预约头部信息
    },
    appointmentRel: { // 预约具体信息
    },
    operationInfo: { // 手术信息
    }
  },
  data() {
    return {
      dataList: [
        { id: null, materialFromType: 0, materialName: 0, isChecked: 0, note: '', isPrinted: 0 },
        { id: null, materialFromType: 0, materialName: 1, isChecked: 0, note: '', isPrinted: 0 },
        { id: null, materialFromType: 0, materialName: 2, isChecked: 0, note: '', isPrinted: 0 },
        { id: null, materialFromType: 0, materialName: 3, isChecked: 0, note: '', isPrinted: 0 },
        { id: null, materialFromType: 0, materialName: 4, isChecked: 0, note: '', isPrinted: 0 },
        { id: null, materialFromType: 1, materialName: 5, isChecked: 0, note: '', isPrinted: 0 },
        { id: null, materialFromType: 1, materialName: 6, isChecked: 0, note: '', isPrinted: 0 },
        { id: null, materialFromType: 1, materialName: 7, isChecked: 0, note: '', isPrinted: 0 },
        { id: null, materialFromType: 1, materialName: 8, isChecked: 0, note: '', isPrinted: 0 },
        { id: null, materialFromType: 2, materialName: 9, isChecked: 0, note: '', isPrinted: 0 },
        { id: null, materialFromType: 3, materialName: 10, isChecked: 0, note: '', isPrinted: 0 }
      ],
      doctorList: []
    }
  },
  mounted() {
    var CH = document.body.offsetHeight
    this.$refs.sectionBox.style.height = CH - 78 + 'px'
    this.getDoctorList()
  },
  created() {
    this.getDataList()
  },
  filters: {
    statusFilter: (val) => {
      if (!val) return ''
      // 当前状态(预约申请：0，预约确认：1，麻醉评估：2，中心核对：3，入院前宣教：4，术前确认：5，手术报到：6，出院评估：7，完成：8)
      const statusNames = [
        { name: '预约申请', value: 0 },
        { name: '预约确认', value: 1 },
        { name: '麻醉评估', value: 2 },
        { name: '中心核对', value: 3 },
        { name: '入院前宣教', value: 4 },
        { name: '术前确认', value: 5 },
        { name: '手术报到', value: 6 },
        { name: '出院评估', value: 7 },
        { name: '完成', value: 8 }
      ]
      return statusNames[val].name
    },
    timeFilter: (val) => {
      if (!val) return ''
      if (val.indexOf('00:00:00') > -1) {
        const value = val.replace(' 00:00:00', '')
        return value
      }
    }
  },
  methods: {
    getDoctorList() {
      const query = {
        page: 1,
        limit: 99999
      }
      getList(query).then(res => {
        if (res.data.code === 200) {
          this.doctorList = res.data.list
          if (this.appointmentRel.asstDoctorIds) {
            const asstDoctorIds = this.appointmentRel.asstDoctorIds.split(',')
            const asstDoctorNames = []
            if (this.doctorList.length > 0) {
              asstDoctorIds.forEach(k => {
                this.doctorList.forEach(v => {
                  if (v.id === k) {
                    asstDoctorNames.push(v.nick)
                  }
                })
              })
              this.appointmentRel.asstDoctorIds = asstDoctorNames.join(',')
            }
          } else {
            this.appointmentRel.asstDoctorIds = ''
          }
        }
      })
    },
    getDataList() {
      readCheckList(this.dataList).then(res => {
        if (res.data.list.length > 0) {
          this.dataList = JSON.parse(JSON.stringify(_.forEach(this.dataList, data => {
            const result = _.find(res.data.list, { materialFromType: data.materialFromType, materialName: data.materialName })
            if (result) {
              data.materialFromTypeShow = result.materialFromTypeShow
              data.materialNameShow = result.materialNameShow
            }
            return data
          })))
        }
      }).then(x => {
        checkDetail(this.$route.query.id).then(res => {
          if (res.data.list.length > 0) {
            this.dataList = JSON.parse(JSON.stringify(_.forEach(this.dataList, data => {
              const result = _.find(res.data.list, { materialFromType: data.materialFromType, materialName: data.materialName })
              if (result) {
                data.isChecked = result.isChecked
                data.isPrinted = result.isPrinted
              }
              return data
            })))
          }
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../styles/case.scss";
.header {
  background-color: #f0f2f5;
  padding: 10px;
  margin: -20px -10px 10px;
  font-weight: 500;
  color: #000;
}
.title {
  padding: 15px 0;
  color: #333;
}
.el-row {
  padding: 5px 0;
}
.content {
  padding-left: 10px;
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
</style>


