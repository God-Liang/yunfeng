<template>
  <div class="startPAE">
    <div slot="footer" class="dialog-footer clearfix">
      <div style="float: left; line-height: 32px;padding-left: 12px;">
        术前确认
        <span style='color: #999;font-size:12px;'>
          术前确认
        </span>
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
              <el-select v-model="dialogLeftTop1_3_data.beforeOptConfirm.doctorId" disabled filterable remote reserve-keyword placeholder="请选择" style='width: 196px;'
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
          </el-form>
        </div>
      </div>
      <div class="pathBox margin20" style="height:100px;margin: -20px 20px 0;"></div>
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
import { saveSurgery, areaList, getBeforeOptConfirmRel } from '@/api/appointmentManage/surgery'
import DictSelect from '@/views/form/dictSelect'
export default {
  components: { DictSelect, appointmentInfo, surgeryPath },
  created() {
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
      organizationList: [],
      selectDayItem: {},
      includes: _.includes,
      optRoomType: null,
      hospitalArea: null,
      bedRoomType: null,
      bedStatus: null,
      optRoomList: [],
      areaLists: [],
      optTime: ''
    }
  },
  methods: {
    async getPatientInfo() {
      read(this.$route.params.id).then(res => {
        this.appointmentInfo = res.data.data
        this.dialogLeftTop1_3_data.beforeOptConfirm.doctorId = res.data.data.operationRels[0].doctorId
        this.dialogLeftTop1_3_data.beforeOptConfirm.operationName = res.data.data.operationRels[0].operationName
        this.dialogLeftTop1_3_data.beforeOptConfirm.operationNo = res.data.data.operationRels[0].operationNo
      })
      const res = await getBeforeOptConfirmRel(this.$route.params.id)
      if (res.data.code === 200) {
        const data = res.data.data
        this.dialogLeftTop1_3_data.beforeOptConfirm.schedule = data.operationDate
        this.optTime = data.operationTime
        this.dialogLeftTop1_3_data.beforeOptConfirm.receiveArea = data.areaId
        this.dialogLeftTop1_3_data.beforeOptConfirm.subBedNum = data.bedName
        this.dialogLeftTop1_3_data.beforeOptConfirm.subOptRoom = data.operationRoomName
      }
    },
    selectAppointmentTime(week, day, dayItem) {
      this.appointmentTimeWeek = week
      this.appointmentTimeDay = day
      this.selectDayItem = dayItem
    },
    // 获取病区列表
    getAreaList() {
      areaList().then(res => {
        if (res.data.code === 200) {
          this.areaLists = res.data.list
        }
      })
    },
    generateDay(startDate) {
      const weekArr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      const weeks = []
      const now = startDate || new Date()
      const year = now.getFullYear()
      let weekday = now.getDay()
      let month = now.getMonth()
      let date = now.getDate()
      const endDay = new Date(year, month + 1, 0).getDate()
      month = month + 1
      for (var i = 0; i < 4; i++) {
        weeks.push({
          days: []
        })
        for (var j = 0; j < 7; j++) {
          if (date > endDay) {
            month = month + 1
            date = 1
          }
          if (weekday > 6) {
            weekday = 0
          }
          weeks[i]['days'].push({
            date: month + '.' + date,
            longDate: year + '.' + month + '.' + date,
            weekDay: weekArr[weekday]
          })
          date++
          weekday++
        }
      }
      return weeks
    },
    selectBed(item) {
      if (item.isUsed === 1 || (item.bedNo === this.dialogLeftTop1_3_data.beforeOptConfirm.subBedNum + '' ? 1 : 0) === 1) {
        return
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
          item.isUsed = 1
          const oldItem = _.find(this.bedArr, { bedNo: this.dialogLeftTop1_3_data.beforeOptConfirm.subBedNum + '' })
          if (oldItem) {
            oldItem.isUsed = 0
          }
          this.dialogLeftTop1_3_data.beforeOptConfirm.subBedNum = parseInt(item.bedNo)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消预约预约床位'
          })
        })
    },
    submitForm(formName, type) {
      var tipText = ['保存成功！', '提交成功！']
      this.dialogLeftTop1_3_data.id = this.$route.params.id
      this.dialogLeftTop1_3_data.type = type
      const postdata = JSON.parse(JSON.stringify(this.dialogLeftTop1_3_data))
      saveSurgery(postdata).then(res => {
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
    }
  },
  filters: {
    isSelected(val) {
      const isSelectedBed = ['空闲', '已预约']
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
      width: 23%;
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

