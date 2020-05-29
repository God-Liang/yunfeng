<template>
  <div>
    <div class="title">手术报到</div>
    <el-form label-width="120px" :inline="true">
      <el-form-item label="报到时间" prop="card">
        <el-input
          v-model="operationInfo.checkinTime"
          auto-complete="off"
          placeholder
          style="width: 196px"
        ></el-input>
      </el-form-item>

      <el-form-item label="接待人" prop="ID">
        <el-input
          v-model="operationInfo.checkinReceiver"
          auto-complete="off"
          placeholder
          style="width: 196px"
        ></el-input>
      </el-form-item>
      <br>
      <el-form-item label="是否已办理入院">
        <el-select
          v-model="operationInfo.checkinIsInHospital"
          placeholder="请选择"
          style="width: 196px"
        >
          <el-option label="是" value="1"></el-option>
          <el-option label="否" value="0"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="手术间" prop="name">
        <el-input
          v-model="operationInfo.checkinOperationRoom"
          auto-complete="off"
          placeholder
          style="width: 196px"
        ></el-input>
      </el-form-item>

      <el-form-item label="接收病房" prop="name">
        <el-input
          v-model="operationInfo.checkinReceiveRoom"
          auto-complete="off"
          placeholder
          style="width: 196px"
        ></el-input>
      </el-form-item>

      <el-form-item label="床位号" prop="name">
        <el-input
          v-model="operationInfo.checkinBedNo"
          auto-complete="off"
          placeholder
          style="width: 196px"
        ></el-input>
      </el-form-item>

      <div class="title">手术准备间</div>

      <el-form-item label="进入时间">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="operationInfo.prepareRoomEnterTime"
          style="width: 196px;"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="离开时间">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="operationInfo.prepareRoomExitTime"
          style="width: 196px;"
        ></el-date-picker>
      </el-form-item>
      <br>
      <el-form-item label="麻醉医生">
        <el-select
          v-model="operationInfo.prepareRoomAnaesthesiaDoctor"
          placeholder="请选择"
          style="width: 196px"
        >
          <el-option v-for="item in doctorList" :key="item.id" :label="item.nick" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="助理麻醉医生">
        <el-select v-model="operationInfo.prepareRoomAnaesthesiaAssistantDoctor" placeholder="请选择">
          <el-option v-for="item in doctorList" :key="item.id" :label="item.nick" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="麻醉方式">
        <el-select
          v-model="operationInfo.prepareRoomAnaesthesiaType"
          placeholder="请选择"
          style="width: 196px"
        >
          <el-option label="全身麻醉" value="1"></el-option>
          <el-option label="局部麻醉" value="0"></el-option>
        </el-select>
      </el-form-item>

      <div class="title">手术中</div>

      <el-form-item label="进入时间">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="operationInfo.inopEnterTime"
          style="width: 196px;"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="离开时间">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="operationInfo.inopExitTime"
          style="width: 196px;"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="手术间">
        <el-input
          v-model="operationInfo.inopOperationRoom"
          auto-complete="off"
          placeholder="请输入手术间"
        ></el-input>
      </el-form-item>
      <br>
      <el-form-item label="手术医生">
        <el-select
          v-model="operationInfo.inopOperationDoctorId"
          placeholder="请选择"
          style="width: 196px"
        >
          <el-option v-for="item in doctorList" :key="item.id" :label="item.nick" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="助理手术医生">
        <el-select v-model="operationInfo.inopAassistantDoctorId" placeholder="请选择">
          <el-option v-for="item in doctorList" :key="item.id" :label="item.nick" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <br>
      <el-form-item label="手术护士">
        <el-select
          v-model="operationInfo.inopOperationNurseId"
          placeholder="请选择"
          style="width: 196px"
        >
          <el-option v-for="item in doctorList" :key="item.id" :label="item.nick" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="助理手术护士">
        <el-select v-model="operationInfo.inopOperationAassistantNurseId" placeholder="请选择">
          <el-option v-for="item in doctorList" :key="item.id" :label="item.nick" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <div class="title">麻醉复苏</div>

      <el-form-item label="进入时间">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="operationInfo.reviveEnterTime"
          style="width: 196px;"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="离开时间">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="operationInfo.reviveExitTime"
          style="width: 196px;"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="手术护士">
        <el-select
          v-model="operationInfo.reviveOperationNurseId"
          placeholder="请选择"
          style="width: 196px"
        >
          <el-option label="是" value="1"></el-option>
          <el-option label="否" value="0"></el-option>
        </el-select>
      </el-form-item>

      <div class="title">病房留观</div>

      <el-form-item label="进入时间">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="operationInfo.watchEnterTime"
          style="width: 196px;"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="离开时间">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="operationInfo.watchExitTime"
          style="width: 196px;"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="接收病房">
        <el-select v-model="operationInfo.watchReceiveRoom" placeholder="请选择" style="width: 196px">
          <el-option label="是" value="1"></el-option>
          <el-option label="否" value="0"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="接受床位">
        <el-select v-model="operationInfo.watchReceiveBed" placeholder="请选择" style="width: 196px">
          <el-option label="是" value="1"></el-option>
          <el-option label="否" value="0"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="病房责任医生">
        <el-select v-model="operationInfo.watchDoctorId" placeholder="请选择" style="width: 196px">
          <el-option v-for="item in doctorList" :key="item.id" :label="item.nick" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="病房责任护士">
        <el-select v-model="operationInfo.watchNurseId" placeholder="请选择" style="width: 196px">
          <el-option v-for="item in doctorList" :key="item.id" :label="item.nick" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <div class="title">出院评估</div>

      <el-form-item label="评估时间">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="operationInfo.outHosAssessmentTime"
          style="width: 196px;"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="评估人">
        <el-select
          v-model="operationInfo.outHosAssessmenterId"
          placeholder="请选择"
          style="width: 196px"
        >
          <el-option label="是" value="1"></el-option>
          <el-option label="否" value="0"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="评估结果">
        <el-select
          v-model="operationInfo.outHosAssessmentResult"
          placeholder="请选择"
          style="width: 196px"
        >
          <el-option label="通过" value="1"></el-option>
          <el-option label="不通过" value="0"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getList } from '@/api/systemManage/user'
export default {
  data() {
    return {
      options: [],
      dialogLeftTop1_1_data_anesthesiaDoctorList: [],
      items: [],
      doctorList: []
    }
  },
  created() {
    this.getDoctorList()
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
        }
      })
    }
  },
  props: {
    operationInfo: {
      type: Object,
      default: function() {
        return {}
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss" scoped>
.title {
  padding: 15px 0;
  color: #333;
}
</style>


