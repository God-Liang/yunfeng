<template>
    <div class="appointmentInfo">
        <el-row :gutter="20">
            <el-col :span="12">
                <h2 class='title' style="font-weight: normal; font-size: 20px; line-height: 30px;">
                    <img src="/static/tinymce4.7.5/skins/lightgray/img/appointment.png" alt="">
                    预约单号：{{appointment.appointNo}}
                </h2>
                </el-col>
            <el-col :span="12">
                <h2 style="font-weight: normal; font-size: 16px; padding: 10px 0;">
                    状态：<span style="color: #409EFF;">{{appointment.appointmentStatus}}</span>
                </h2>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="6"><div class='item'><span class='bold'>申 请 人：</span> {{appointment.appointmentLogs[0].operator}}</div></el-col>
            <el-col :span="6"><div  class='item'><span class='bold'>拟手术名称：</span>{{appointment.operationName}}</div></el-col>
            <el-col :span="6"><div  class='item'><span class='bold'>申请时间：</span>{{appointment.appointmentLogs[0].operatorTime}}</div></el-col>
            <el-col :span="6"><div  class='item'><span class='bold'>拟主刀医生：</span>{{appointment.operateDoctor}}</div></el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="6"><div  class='item'><span class='bold'>患者姓名：</span>{{appointment.patientName}}</div></el-col>
            <el-col :span="6"><div  class='item'><span class='bold'>联系方式：</span>{{appointment.telephone}}</div></el-col>
            <el-col :span="6"><div  class='item'><span class='bold'>诊断：</span>{{appointment.diagnose}}</div></el-col>
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
    appointment: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    getStatusName(status) {
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
      const result = _.find(statusNames, { value: status })
      return result ? result.name : ''
    }
  }
}
</script>
<style lang="scss">
.appointmentInfo{
    .title img{
        width: 30px;
        height:30px;
        vertical-align: top;
    }
    .item{
        padding: 10px 0;
        margin-left: 40px;
    }
}
</style>

