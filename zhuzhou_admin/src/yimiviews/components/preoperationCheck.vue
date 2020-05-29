<template>
  <div class="startPAE">
    <div slot="footer" class="dialog-footer clearfix">
      <div style="float: left; line-height: 32px;padding-left: 12px;">
        术前确认
        <span style='color: #999;font-size:12px;'>
          术前确认
        </span>
      </div>
      <div style="float: right;">
        <!-- <el-button type="primary" @click="submitForm('dialogLeftTop1_3_data',0)">保存</el-button> -->
        <el-button type="success" @click="submitForm('dialogLeftTop1_3_data',1)">确认提交</el-button>
        <el-button type="info" @click="cancel">取 消</el-button>
      </div>
    </div>
    <div class="scrollWrap" ref='scrollWrap'>
      <div class="appointmentInfoBox">
        <div class="box">
          <appointment-info :appointment='appointmentInfo'></appointment-info>
        </div>
      </div>

      <div class="pathBox margin20">
        <div class="box">
          <h3>手术路径</h3>
          <surgery-path :appointment='appointment'></surgery-path>
        </div>
      </div>
      <div class="pathBox margin20">
        <div class="box">

          <el-form :model="dialogLeftTop1_3_data" ref='dialogLeftTop1_3_data' :show-message=true :rules="appointmentConfirmConst.dialogLeftTop1_1_data_rules" :inline="true">
            <h3>
              <span>术前确认</span>
            </h3>
            <el-form-item label="主刀医生" :label-width="formLabelWidth" prop="card">
              <el-select v-model="dialogLeftTop1_3_data.beforeOptConfirm.doctorId" disabled filterable remote reserve-keyword placeholder="" style='width: 196px;'
                         :remote-method="getDoctor" :loading="loading">
                <el-option v-for='item in dialogLeftTop1_1_data_doctorList' :label="item.nick" :value="item.id"
                           :key='item.id'></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="拟行手术" :label-width="formLabelWidth" prop="card">
              <el-input v-model="dialogLeftTop1_3_data.beforeOptConfirm.operationName" style='width: 196px;' disabled auto-complete="off" ></el-input>
              <!-- <el-select v-model="dialogLeftTop1_3_data.beforeOptConfirm.operationNo" filterable remote reserve-keyword placeholder="请选择" style='width: 196px;'
                         :remote-method="getOperation" :loading="loading">
                <el-option v-for='item in operateSurgeryList' :label="item.name" :value="item.id"
                           :key='item.id'></el-option>
              </el-select> -->
            </el-form-item>
            <el-form-item label="拟手术日期" :label-width="formLabelWidth">
              <el-date-picker type="date" placeholder="" v-model="dialogLeftTop1_3_data.beforeOptConfirm.schedule" disabled value-format="yyyy-MM-dd HH:mm:ss" style='width: 196px;'></el-date-picker>
            </el-form-item>
            <el-form-item label="手术时间" :label-width="formLabelWidth" prop="card">
              <el-input v-model="optTime" style='width: 196px;' auto-complete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="手术间" :label-width="formLabelWidth" prop="card">
              <el-input :value="dialogLeftTop1_3_data.beforeOptConfirm.subOptRoom" style='width: 196px;' auto-complete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="拟接收病区" :label-width="formLabelWidth" prop="card">
              <el-select v-model="dialogLeftTop1_3_data.beforeOptConfirm.receiveArea" placeholder="" style='width: 196px' disabled>
                  <el-option v-for='item in areaLists' :label="item.name" :value="item.id"
                             :key='item.id'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="拟预约床位" :label-width="formLabelWidth" prop="card">
              <el-input :value="dialogLeftTop1_3_data.beforeOptConfirm.subBedNum" style='width: 196px;' auto-complete="off" disabled></el-input>
            </el-form-item>
            <div class="timeBox">
              <ul class="appointmentTimeItem">
                <li :class='dialogLeftTop1_3_data.beforeOptConfirm.schedule === item.time ? "appointmentTime active" : "appointmentTime"' v-for="(item, index) in weeksArr" :key="index" @click="appointmentClick(item)">
                  <p class="myAppointment">{{ item.label }}</p>
                  <img v-if="dialogLeftTop1_3_data.beforeOptConfirm.schedule === item.time" src="/static/tinymce4.7.5/skins/lightgray/img/appointmentTimeSelected.png" alt="">
                  <img v-else src="/static/tinymce4.7.5/skins/lightgray/img/appointmentTimeOption.png" alt="">
                </li>
              </ul>
              <span class="el-icon-arrow-left prev" @click="prevTime"></span>
              <span class="el-icon-arrow-right next" @click="nextTime"></span>
            </div>
            <h3>
              <span>手术时间选择</span>
            </h3>
              <el-form-item label="" v-if="timingArr.length > 0" :label-width="formLabelWidth">
                <el-radio-group v-model="optTime" @change="findOptRoom">
                  <el-radio :label="item.operationTime" v-for="item in timingArr" :key="item.id"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item v-else label="" id="emptyData" :label-width="formLabelWidth">
                <span>暂未安排手术</span>
              </el-form-item>
            <h3>
              <span>手术间选择</span>
            </h3>
            <div class="selectRoom">
              <el-form-item label="手术间类型" :label-width="formLabelWidth">
                <dict-select v-model="optRoomType" :disabled="optTime ? false : true" placeholder="请先选择手术时间" style='width: 196px' dict-code="ssslb" clearable @change="findOptRoom">
                </dict-select>
              </el-form-item>
              <div class="rooms">
                <el-form-item label="房间号" :label-width="formLabelWidth">
                  <el-radio-group v-model="dialogLeftTop1_3_data.beforeOptConfirm.subOptRoomId" size="medium" @change="changeSubOptRoom">
                    <el-radio v-for='item in optRoomList' :label="item.id" :key="item.id" border>{{item.name}}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
            </div>
            <h3>
              <span>床位选择</span>
            </h3>
            <div>
              <el-form-item label="病区" :label-width="formLabelWidth">
                <el-select v-model="hospitalArea" placeholder="请选择" style='width: 196px' @change="queryBed();getWardList();dialogLeftTop1_3_data.beforeOptConfirm.receiveArea = hospitalArea">
                  <el-option v-for='item in areaLists' :label="item.name" :value="item.id"
                             :key='item.id'></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="病房" :label-width="formLabelWidth">
                <el-select v-model="wardId" placeholder="请选择" style='width: 196px' clearable @change="wardChange">
                  <el-option v-for='item in wardList' :label="item.wardName" :value="item.id"
                             :key='item.id'></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="病房类型" :label-width="formLabelWidth">
                <dict-select v-model="bedRoomType" placeholder="根据病房自动选择" style='width: 196px' :disabled="true" dict-code="bffl" @change="queryBed()">
                </dict-select>
              </el-form-item>
              <el-form-item label="床位状态" :label-width="formLabelWidth">
                <dict-select v-model="bedStatus" placeholder="请选择" style='width: 196px' clearable dict-code="bed_state" @change="queryBed()">
                </dict-select>
              </el-form-item>
              <ul class="clearfix selectBed">
                <li class=' fl' :class='{active: item.status === 0}' v-for='item in bedArr' :key='item.id' @click='selectBed(item)'>
                  <p>{{item.wardName + ' ' + item.bedNo}}
                    <span>{{(item.status && (item.bedNo === dialogLeftTop1_3_data.beforeOptConfirm.subBedNum ? 0 : 1)) | isSelected}}</span>
                  </p>
                  <div class="imgBox">
                    <img v-if='item.status === 1 && (item.bedNo === dialogLeftTop1_3_data.beforeOptConfirm.subBedNum ? 1 : 0) === 0' src="/static/tinymce4.7.5/skins/lightgray/img/room.png" alt="">
                    <img v-else src="/static/tinymce4.7.5/skins/lightgray/img/roomSelected.png" alt="">
                  </div>
                </li>
              </ul>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import appointmentInfo from '@/yimiviews/components/appointmentInfo'
import surgeryPath from '@/yimiviews/components/path'
import _ from 'lodash'
import { appointmentConfirmConst } from '@/yimiviews/appointmentManage/columnsConst'
import { read } from '@/api/appointmentManage/appointmentConfirm'
import { getDoctorList, getOperationList } from '@/api/common/common'
import { saveSurgery, areaList, getDoctorScheduleOperation, findOptRoom, getWardList, getFindOperationBed, getBeforeOptConfirmRel } from '@/api/appointmentManage/surgery'
import DictSelect from '@/views/form/dictSelect'
export default {
  components: { DictSelect, appointmentInfo, surgeryPath },
  created() {
    this.currentTime = new Date().getTime()
    this.weeksArr = this.getWeeks(new Date(this.currentTime))
    this.dialogLeftTop1_3_data.beforeOptConfirm.schedule = this.fun_date(new Date(this.currentTime))
    this.getPatientInfo()
    this.getAreaList()
    this.getDoctor(' ')
    this.getOperation(' ')
  },
  mounted() {
    this.setAppMainHeight()
  },
  data() {
    return {
      appointmentInfo: {},
      appointment: {
        path: 5
      },
      checkbox: [],
      appointmentTimeWeek: 1,
      appointmentTimeDay: 1,
      appointmentConfirmConst,
      dialogLeftTop1_3_data: {
        id: '',
        type: '',
        beforeOptConfirm: {
          id: '',
          appointNo: '',
          doctorName: '',
          doctorId: '',
          operationName: '',
          operationNo: '',
          operationDatetime: '',
          subOptRoom: '',
          receiveArea: null,
          subBedNum: '',
          optNo: '',
          scheduleOrder: 0
        },
        surgeryTime: {
          orderInAm: [],
          orderInPm: []
        },
        surgeryRoom: {
          roomType: '',
          rooms: []
        },
        surgeryBed: {}
      },
      formLabelWidth: '120px',
      today: '',
      weekday: '',
      weeks: [],
      bedArr: [],
      dialogLeftTop1_1_data_doctorList: [],
      loading: false,
      operateSurgeryList: [],
      selectDayItem: {},
      includes: _.includes,
      optRoomType: null,
      hospitalArea: null,
      bedRoomType: null,
      bedStatus: null,
      optRoomList: [],
      areaLists: [],
      currentTime: null,
      weeksArr: [],
      timingArr: [],
      optTime: null,
      wardList: [],
      wardId: null,
      wardName: ''
    }
  },
  methods: {
    getPatientInfo() {
      read(this.$route.params.id).then(res => {
        this.appointmentInfo = res.data.data
        this.dialogLeftTop1_3_data.beforeOptConfirm.doctorId = res.data.data.operationRels[0].doctorId
        this.dialogLeftTop1_3_data.beforeOptConfirm.operationName = res.data.data.operationRels[0].operationName
        this.dialogLeftTop1_3_data.beforeOptConfirm.operationNo = res.data.data.operationRels[0].operationNo
        this.dialogLeftTop1_3_data.beforeOptConfirm.appointNo = res.data.data.operationRels[0].appointNo
        this.getDoctorScheduleOperation()
      })
    },
    getBeforeOptConfirmRel() {
      getBeforeOptConfirmRel().then(res => {
        if (res.data.code === 200) {
          // this.dialogLeftTop1_3_data.beforeOptConfirm = {
          //   appointNo: "N201903140003",
          //   subBedNumId: 12,
          //   subBedNum: "2号床位",
          //   doctorId: 2,
          //   schedule: "2019-03-16",
          //   subOptRoomId: 4,
          //   subOptRoom: "2号手术间",
          //   wardId: null,
          //   receiveArea: 11
          // }
          // this.optTime = "8:00-11:00"
          // this.hospitalArea = 11
          // this.wardId = null
          this.findOptRoom()
          const oldItem = _.find(this.bedArr, { bedNo: this.dialogLeftTop1_3_data.beforeOptConfirm.subBedNum + '' })
          if (oldItem) {
            oldItem.status = 0
          }
        }
      })
    },
    // 获取病区列表
    getAreaList() {
      areaList().then(res => {
        if (res.data.code === 200) {
          this.areaLists = res.data.list
          this.dialogLeftTop1_3_data.beforeOptConfirm.receiveArea = res.data.list[0].id
          this.hospitalArea = res.data.list[0].id
          this.queryBed()
          this.getWardList()
        }
      })
    },
    // 预约床位
    selectBed(item) {
      if (item.status === 0 || (item.bedNo === this.dialogLeftTop1_3_data.beforeOptConfirm.subBedNum + '' ? 1 : 0) === 1) {
        this.$message({
          type: 'warning',
          message: '当前床位已被预约，请选择其他床位'
        })
        return false
      }
      this.$confirm('是否预约此床位?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '床位选择成功'
          })
          item.status = 0
          const oldItem = _.find(this.bedArr, { bedNo: this.dialogLeftTop1_3_data.beforeOptConfirm.subBedNum + '' })
          if (oldItem) {
            oldItem.status = 1
          }
          this.dialogLeftTop1_3_data.beforeOptConfirm.subBedNum = item.bedNo
          this.dialogLeftTop1_3_data.beforeOptConfirm.subBedNumId = item.id
          this.dialogLeftTop1_3_data.beforeOptConfirm.wardId = item.wardId
          this.dialogLeftTop1_3_data.beforeOptConfirm.wardName = item.wardName
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消预约预约床位'
          })
        })
    },
    submitForm(formName, type) {
      if (!this.optTime) {
        this.$message({
          type: 'warning',
          message: '请选择手术时间'
        })
        return false
      }
      if (!this.dialogLeftTop1_3_data.beforeOptConfirm.subOptRoomId) {
        this.$message({
          type: 'warning',
          message: '手术间不能为空'
        })
        return false
      }
      if (!this.dialogLeftTop1_3_data.beforeOptConfirm.subBedNumId) {
        this.$message({
          type: 'warning',
          message: '请选择床位'
        })
        return false
      }
      var tipText = ['保存成功！', '提交成功！']
      this.dialogLeftTop1_3_data.id = this.$route.params.id
      this.dialogLeftTop1_3_data.type = type
      const data = {
        id: parseInt(this.$route.params.id),
        type: type,
        beforeOptConfirmRel: {
          appointNo: this.dialogLeftTop1_3_data.beforeOptConfirm.appointNo, // 预约单号
          doctorId: this.dialogLeftTop1_3_data.beforeOptConfirm.doctorId, // 医生ID
          operationRoomId: this.dialogLeftTop1_3_data.beforeOptConfirm.subOptRoomId, // 手术间ID
          operationRoomName: this.dialogLeftTop1_3_data.beforeOptConfirm.subOptRoom, // 手术间
          operationDate: this.dialogLeftTop1_3_data.beforeOptConfirm.schedule + ' 00:00:00', // 手术日期
          operationTime: this.optTime, // 手术时间段
          areaId: this.hospitalArea, // 病区
          wardId: this.dialogLeftTop1_3_data.beforeOptConfirm.wardId, // 病房
          wardName: this.dialogLeftTop1_3_data.beforeOptConfirm.wardName,
          bedId: this.dialogLeftTop1_3_data.beforeOptConfirm.subBedNumId, // 病床ID
          bedName: this.dialogLeftTop1_3_data.beforeOptConfirm.subBedNum // 病床
        }
      }
      saveSurgery(data).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: tipText[type],
            type: 'success',
            duration: 2000
          })
          if (type === 1) {
            this.$root.closeTag()
          }
        } else {
          this.$message({
            message: res.data.msg,
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    cancel() {
      this.$root.closeTag()
    },
    setAppMainHeight() {
      const bodyHeight = document.body.offsetHeight
      const appMainHeight = bodyHeight - 180
      this.$refs.scrollWrap.style.height = appMainHeight + 'px'
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
    // 获取所有病床
    queryBed() {
      getFindOperationBed({
        areaId: this.hospitalArea,
        wardId: this.wardId,
        wardType: this.bedRoomType,
        bedStatus: this.bedStatus
      }).then(res => {
        if (res.data.code === 200) {
          this.bedArr = res.data.list
        }
      })
    },
    // 获取时间格式 月.日 （星期）
    timeDispose(time) {
      const weekArr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      const month = (time.getMonth() + 1) >= 10 ? time.getMonth() + 1 : '0' + (time.getMonth() + 1)
      const date = time.getDate() >= 10 ? time.getDate() : '0' + time.getDate()
      const day = weekArr[time.getDay()]
      return month + '.' + date + '（' + day + '）'
    },
    // 获取时间格式 年月日
    fun_date(time) {
      const year = time.getFullYear()
      const month = (time.getMonth() + 1) >= 10 ? time.getMonth() + 1 : '0' + (time.getMonth() + 1)
      const date = time.getDate() >= 10 ? time.getDate() : '0' + time.getDate()
      return year + '-' + month + '-' + date
    },
    // 获取前后一星期的时间数组
    getWeeks(time) {
      const date = []
      for (var index = 0; index < 7; index++) {
        // this.timeDispose(new Date(time.getTime() + 3600 * 1000 * 24 * index))
        date.push({
          label: this.timeDispose(new Date(time.getTime() + 3600 * 1000 * 24 * index)),
          time: this.fun_date(new Date(time.getTime() + 3600 * 1000 * 24 * index))
        })
      }
      return date
    },
    // 点击选中某个时间
    appointmentClick(val) {
      this.dialogLeftTop1_3_data.beforeOptConfirm.schedule = val.time
      this.optTime = ''
      this.optRoomList = []
      this.dialogLeftTop1_3_data.beforeOptConfirm.subOptRoom = ''
      this.dialogLeftTop1_3_data.beforeOptConfirm.subOptRoomId = null
      this.dialogLeftTop1_3_data.beforeOptConfirm.subBedNum = ''
      this.dialogLeftTop1_3_data.beforeOptConfirm.subBedNumId = null
      this.getDoctorScheduleOperation()
    },
    // 上一周
    prevTime() {
      if (this.weeksArr[0].time === this.fun_date(new Date())) {
        this.$message({
          message: '只能查看今天之后的时间',
          type: 'warning'
        })
        return false
      }
      this.currentTime = this.currentTime - 3600 * 1000 * 24 * 7
      this.weeksArr = this.getWeeks(new Date(this.currentTime))
    },
    // 下一周
    nextTime() {
      this.currentTime = this.currentTime + 3600 * 1000 * 24 * 7
      this.weeksArr = this.getWeeks(new Date(this.currentTime))
    },
    // 选择某一个手术间
    changeSubOptRoom() {
      this.dialogLeftTop1_3_data.beforeOptConfirm.subOptRoom = _.find(this.optRoomList, { id: this.dialogLeftTop1_3_data.beforeOptConfirm.subOptRoomId }).name
    },
    // 获取所有手术间
    findOptRoom() {
      const query = {
        optDate: this.dialogLeftTop1_3_data.beforeOptConfirm.schedule,
        optTime: this.optTime,
        optRoomType: this.optRoomType
      }
      findOptRoom(query).then(res => {
        if (res.data.code === 200) {
          this.optRoomList = res.data.list.filter(v => v.isUsed === 0)
          this.dialogLeftTop1_3_data.beforeOptConfirm.subOptRoomId = ''
          this.dialogLeftTop1_3_data.beforeOptConfirm.subOptRoom = ''
        }
      })
    },
    // 手术时间选择
    getDoctorScheduleOperation() {
      const query = {
        doctorId: this.dialogLeftTop1_3_data.beforeOptConfirm.doctorId,
        operationDate: this.dialogLeftTop1_3_data.beforeOptConfirm.schedule
      }
      getDoctorScheduleOperation(query).then(res => {
        if (res.data.code === 200) {
          this.timingArr = res.data.list
        }
      })
    },
    // 获取病房类别
    getWardList() {
      getWardList(this.hospitalArea).then((res) => {
        if (res.data.code === 200) {
          this.wardList = res.data.list
        }
      })
    },
    // 选择病房
    wardChange(val) {
      this.queryBed()
      this.dialogLeftTop1_3_data.beforeOptConfirm.wardId = val
      this.dialogLeftTop1_3_data.beforeOptConfirm.wardName = this.wardList.find(v => v.id === val).wardName
      this.bedRoomType = this.wardList.find(v => v.id === val).wardType
    }
  },
  filters: {
    isSelected(val) {
      const isSelectedBed = ['已预约', '空闲']
      return isSelectedBed[val]
    }
  },
  computed: {
    am_pm_order: {
      get() {
        const date = this.dialogLeftTop1_3_data.beforeOptConfirm.schedule || ''
        return (date.replace(' 00:00:00', '').replace(/-/g, '.') +
          (this.dialogLeftTop1_3_data.beforeOptConfirm.ampmType === 0 ? '_am_' : '_pm_') +
          this.dialogLeftTop1_3_data.beforeOptConfirm.scheduleOrder)
      },
      set(newValue) {
        if (!newValue) return
        this.dialogLeftTop1_3_data.beforeOptConfirm.ampmType = newValue.indexOf('am_') > -1 ? 0 : 1
        this.dialogLeftTop1_3_data.beforeOptConfirm.scheduleOrder = parseInt(newValue.replace(/\d+.\d+.\d+_[ap]m_/, ''))
        const date = _.first(newValue.match(/\d+.\d+.\d+/))
        if (date) this.dialogLeftTop1_3_data.beforeOptConfirm.schedule = date.replace(/./g, '-') + ' 00:00:00'
      }
    }
  }
}
</script>
<style lang="scss">
.startPAE {
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
    padding: 10px;
    background-color: #fff;
    margin-bottom: 20px;
  }
  .appointmentInfoBox {
    background-color: #fff;
    margin: 0 20px;
  }
  .timeBox {
    padding: 0 30px;
    height: 90px !important;
    position: relative;
    .prev {
      position: absolute;
      left: 5px;
      top: 10px;
      height: 70px;
      width: 20px;
      line-height: 70px;
      background-color: rgba(31,45,61,.11);
      display: inline-block;
      text-align: center;
      border-radius: 4px;
      color:#fff;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      &:hover{
        background-color: rgba(31,45,61,.4);
      }
    }
    .next{
      position: absolute;
      right: 5px;
      top: 10px;
      text-align: center;
      border-radius: 4px;
      height: 70px;
      width: 20px;
      line-height: 70px;
      background-color: rgba(31,45,61,.11);
      display: inline-block;
      color:#fff;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      &:hover{
        background-color: rgba(31,45,61,.4);
      }
    }
    .appointmentTimeItem {
      display: flex;
      padding: 0 0 15px 0;
      border-bottom: 1px dashed #ddd;
      .appointmentTime {
        flex: 1;
        position: relative;
        list-style: none;
        text-align: center;
        cursor: pointer;
        &:after {
          display: block;
          content: "";
          position: absolute;
          left: 50%;
          margin-left: -2px;
          top: 60px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: 1px solid #ddd;
        }
        &.active {
          color: #fff;
        }
        &.active:after {
          background: #409eff;
        }
        .myAppointment {
          position: absolute;
          padding: 0;
          margin: 0;
          width: 100%;
          height: 100%;
          line-height: 38px;
          text-align: center;
          z-index: 20;
          font-size: 13px;
        }
      }
    }
  }
  .morning {
    flex: 1;
    margin: 0 20px;
    height: 38px;
    line-height: 38px;
    border: 1px solid #ddd;
    text-align: center;
    list-style: none;
  }
  h4 {
    margin: 0 0 10px 60px;
  }
  .selectRoom {
    li {
      cursor: pointer;
      position: relative;
      i.el-icon-success {
        position: absolute;
        right: -5px;
        bottom: -5px;
        &.active {
          color: #409eff;
        }
      }
    }
  }
  .selectBed {
    li {
      width: 300px;
      list-style: none;
      margin: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      cursor: pointer;
      p {
        margin: 0;
        padding: 15px;
        border-bottom: 1px solid #ddd;
        span {
          float: right;
          margin-right: 10px;
          &:before {
            display: inline-block;
            content: "";
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #ddd;
            margin-right: 10px;
          }
        }
      }
      &:hover {
        border-color: #409eff;
        p {
          border-bottom-color: #409eff;
        }
      }
      &.active {
        border-color: #409eff;
        p {
          color: #409eff;
          border-bottom: 1px solid #409eff;
          span {
            &:before {
              background: #409eff;
            }
          }
        }
      }
    }
    .imgBox {
      width: 100%;
      height: 150px;
      line-height: 150px;
      text-align: center;
      img {
        width: 45%;
        vertical-align: middle;
      }
    }
  }
}
</style>
<style lang="scss">
#emptyData{
  width:100%;
  .el-form-item__content{
    display: block;
    span{
      display: block;
      width: 100%;
      text-align: center;
      color:#ddd;
    }
  }
}
</style>

