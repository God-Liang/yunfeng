<template>
  <div class="appointmentInfo">
    <ul class="titleBox">
      <li>
        预约单号：
        <span class="title">{{appointmentMessaage.appointNo}}</span>
      </li>
      <li>
        状态：
        <span style="color: #409EFF;">{{this.getStatusName(appointmentMessaage.appointmentStatus)}}</span>
      </li>
    </ul>
    <el-row class="messageBox">
      <el-col :span="8">
        <div class="item">
          <span class="bold">申 请 人：</span>
          {{appointmentMessaage.createName}}
        </div>
      </el-col>
      <el-col :span="8">
        <div class="item">
          <span class="bold">拟手术名称：</span>
          {{appointmentMessaage.operationName}}
        </div>
      </el-col>
      <el-col :span="8">
        <div class="item">
          <span class="bold">拟主刀医生：</span>
          {{appointmentMessaage.doctorName}}
        </div>
      </el-col>
    </el-row>
    <el-row class="messageBox">
      <el-col :span="8">
        <div class="item">
          <span class="bold">申请时间：</span>
          {{appointmentMessaage.createTime}}
        </div>
      </el-col>
      <el-col :span="8">
        <div class="item">
          <span class="bold">患者姓名：</span>
          {{appointmentMessaage.patientName}}
        </div>
      </el-col>
      <el-col :span="8">
        <div class="item">
          <span class="bold">联系方式：</span>
          {{appointmentMessaage.phone}}
        </div>
      </el-col>
    </el-row>
    <el-row class="messageBox">
      <el-col :span="8">
        <div class="item">
          <span class="bold">拟麻醉方式：</span>
          {{appointmentMessaage.anesthetistTypeShow}}
        </div>
      </el-col>
      <el-col :span="16">
        <div class="item">
          <span class="bold">术前诊断：</span>
          {{appointmentMessaage.beforeDiagnosis}}
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  data() {
    return {
    }
  },
  props: {
    appointmentMessaage: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
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
  }
}
</script>
<style lang="scss" scope>
.appointmentInfo {
  padding: 0 15px 0 5px;
  .titleBox {
    display: flex;
    justify-content: space-between;
    height: 54px;
    margin: 0;
    padding: 0 20px;
    border-bottom: 1px solid #eeeeee;
    list-style: none;
    li {
      color: #333;
      height: 54px;
      line-height: 54px;
      font-size: 14px;
      font-weight: bold;
      span {
        margin: 0;
        padding: 0;
        color: #666;
        font-weight: normal;
      }
    }
  }
  .messageBox {
    padding: 0 20px;
    &:last-child {
      .el-col {
        margin-bottom: 30px;
      }
    }
    .el-col {
      margin-top: 20px;
      .item {
        font-size: 13px;
        color: #666;
      }
    }
  }
}
</style>

