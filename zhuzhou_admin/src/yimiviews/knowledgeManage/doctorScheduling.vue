<template>
  <div class="wrap" v-loading="uploading" :element-loading-text="textLoading">
    <div class="flexWrap">
      <div class="leftWrap" v-loading="sortLoading">
        <div class="app-button-container">
          <el-button type="primary" @click="applicationBeforeWeek()">应用前一周排班数据</el-button>
          <el-button type="primary" @click="handleDownload()">导入排班</el-button>
          <el-button type="primary" @click="dialogCreateShow()">新增排班</el-button>
          <el-upload
            class="uploadScheduling"
            :action="action"
            :before-upload="beforeUpload"
            :show-file-list="false"
            :headers="myHeaders"
            style="margin: 0 10px;display: none;"
            ref="uploadScheduling"
            :on-success="handleSuccess"
            :file-list="fileList">
            <el-button type="primary">导入排班</el-button>
          </el-upload>
        </div>

        <div class="filter-container">
          <div class="filterBox">
            <div class="leftPart filterPart">
              <el-button @click="upWeek">上一周</el-button>
              <el-button @click="thisWeek">本周</el-button>
              <el-button @click="downWeek">下一周</el-button>
            </div>
            <div class="rightPart filterPart">
              <el-date-picker
                v-model="filter.scheduleDate"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
              <el-button
                type="primary"
                v-waves
                icon="el-icon-search"
                @click="handleFilter"
              >搜索</el-button>
            </div>
          </div>
        </div>
        <div class="block">
          <div class="sliderWrap">
            <ul class="appointmentTimeItem">
              <li class="appointmentTime">
                <p></p>
                <p v-for="(item, index) in weekDay" :key="index">{{item}} ({{currentTime[index]}})</p>
              </li>
              <li class="appointmentTime">
                <p>上午</p>
                <p
                  class="work"
                  style="cursor: pointer;"
                  v-for="(item, index) in amschedulingList"
                  :key="index"
                  @click="dialogCreateShow(item, 0)"
                >
                  {{item.optTypeShow}}
                  <span class="badge" v-if="item.optType === 1">{{item.optNo}}台</span>
                </p>
              </li>
              <li class="appointmentTime">
                <p>下午</p>
                <p
                  class="work"
                  style="cursor: pointer;"
                  v-for="(item, index) in pmschedulingList"
                  :key="index"
                  @click="dialogCreateShow(item, 1)"
                >
                  {{item.optTypeShow}}
                  <span class="badge" v-if="item.optType === 1">{{item.optNo}}台</span>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="rightWrap">
        <category :data="filterData" classfiy="医生列表" @selectedType="selectedType" @searchKey="searchKey" :classLoading="classLoading"></category>
      </div>
    </div>

    <!-- 新增 -->
    <el-dialog
      :title="dialogCreateTitle"
      :visible.sync="dialogCreate"
      id="schedu"
      @close="cancel()"
    >
      <el-form
        ref="dialogCreateData"
        :rules="rules"
        :model="dialogCreateData"
        label-width="120px"
        :inline="true"
      >
        <el-form-item label="医生:" prop="doctorId">
          <el-select
            v-model="dialogCreateData.doctorId"
            filterable
            remote
            reserve-keyword
            placeholder="请选择"
            :remote-method="getDoctor"
            :loading="loading"
            style="width: 196px;"
            @change="getDoctorName"
          >
            <el-option
              v-for="item in dialogLeftTop1_1_data_doctorList"
              :label="item.nick"
              :value="item.id"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排班日期:" prop="scheduleDate">
          <el-date-picker
            v-model="dialogCreateData.scheduleDate"
            type="date"
            :picker-options="startDatePicker"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期"
            style="width: 196px;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="上下午:" prop="ampmType">
          <el-select
            v-model="dialogCreateData.ampmType"
            placeholder="请选择上下午"
            ref="ampmType"
            style="width: 196px;"
            @change="ampmTypeChange"
          >
            <el-option label="上午" :value="0"></el-option>
            <el-option label="下午" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="坐班类型:" prop="optType">
          <dict-select
            v-model="dialogCreateData.optType"
            placeholder
            @change="optChange"
            style="width:196px;"
            dict-code="opt_type"
          ></dict-select>
        </el-form-item>
        <el-form-item v-show="dialogCreateData.optType === 1" label="手术台数:" prop="optNo">
          <el-input-number
            v-model="dialogCreateData.optNo"
            :min="1"
            style="width: 196px;"
            label="输入手术台数"
          ></el-input-number>
        </el-form-item>
        <el-form-item :label="'手术'+ (index + 1) +' 时间段:'" v-show="false" prop="timeBucket" v-for="(item, index) in dialogCreateData.optNo" :key="index">
          <el-time-select
            style="width: 196px;"
            v-model="startTime[index]"
            :editable="false"
            @focus="startFocus(index)"
            :picker-options="{
              start: endTime[index - 1] ? endTime[index - 1] : start,
              step: '01:00',
              end: end
            }">
          </el-time-select>
          <el-time-select
            style="width: 196px;"
            v-model="endTime[index]"
            :editable="false"
            @focus="endFocus(index)"
            :picker-options="{
              start: start,
              step: '01:00',
              end: end,
              minTime: startTime[index]
            }">
          </el-time-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="dialogCreateSubmit('dialogCreateData')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves/index.js'
import complexTable from '@/views/table/complexTable'
import category from 'yimiviews/components/category'
import { pending, create, update, read, useLastWeekSchedule } from '@/api/knowledgeManage/doctorScheduling'
import { getDoctorList } from '@/api/common/common'
import DictSelect from '@/views/form/dictSelect'
import { getToken } from '@/utils/auth'
export default {
  directives: { waves },
  components: { category, complexTable, DictSelect },
  created() {
    this.initSelect()
    this.getDoctor(' ')
  },
  mounted() {
    this.generateDay()
  },
  data() {
    return {
      filter: {
        scheduleDate: ''
      },
      dialogCreate: false,
      start: '08:00',
      end: '20:00',
      startTime: [],
      endTime: [],
      timeBucket: [],
      dialogCreateTitle: '新增排班信息',
      dialogCreateData: {
        scheduleDate: '',
        doctorId: null,
        doctorName: '',
        id: null,
        optNo: null,
        optType: null
      },
      // 排班表
      amschedulingList: [],
      pmschedulingList: [],
      weekDay: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      currentTime: [],
      options: [],
      dialogLeftTop1_1_data_doctorList: [],
      loading: false,
      rules: {
        doctorId: [{ required: true, message: '请选择医生', trigger: ['blur'] }],
        scheduleDate: [{ required: true, message: '请选择排班日期', trigger: 'change' }],
        ampmType: [{ required: true, message: '请选择上下午', trigger: 'change' }],
        optType: [{ required: true, message: '请选择坐班类型', trigger: 'change' }],
        optNo: [{ required: true, message: '手术台数不能为空', trigger: ['blur', 'change'] }]
      },
      whetherAdd: false,
      filterData: [],
      classLoading: true,
      startDatePicker: this.beginDate(),
      fileList: [], // 上传列表
      action: this.$store.state.app.BASE_API + '/excel/uploadDoctorSchedule',
      myHeaders: { 'token': getToken() },
      uploading: false,
      textLoading: '',
      sortLoading: true,
      submitTage: false
    }
  },
  watch: {
    dialogCreateData: {
      handler(newVal, oldVal) {
        this.submitTage = false
      },
      deep: true
    },
    startTime(newVal, oldVal) {
      this.submitTage = false
    },
    endTime(newVal, oldVal) {
      this.submitTage = false
    }
  },
  methods: {
    // 导入
    beforeUpload(file) {
      this.uploading = true
      this.textLoading = '导入加载中...'
    },
    handleSuccess(res, file, fileList) {
      if (res.code === 200) {
        this.uploading = false
        this.$message({
          message: '导入成功',
          type: 'success'
        })
        this.$refs.uploadScheduling.clearFiles()
        this.handleFilter()
      } else {
        this.$message({
          message: res.msg,
          type: 'warning'
        })
        this.$refs.uploadScheduling.clearFiles()
        this.uploading = false
      }
    },
    beginDate() {
      return {
        disabledDate(time) {
          return time.getTime() + 3600 * 1000 * 24 < Date.now() // 预约手术时间为当前时间之后的时间
        }
      }
    },
    ampmTypeChange(val) {
      this.dialogCreateData.ampmType = val
      this.dialogCreateData.optNo = 1
      this.startTime = []
      this.endTime = []
      if (val === 0) {
        this.start = '08:00'
        this.end = '12:00'
      } else {
        this.start = '12:00'
        this.end = '20:00'
      }
    },
    startFocus(key) {
      if ((key + 1) < parseInt(this.dialogCreateData.optNo)) {
        for (let index = key; index <= parseInt(this.dialogCreateData.optNo) - 1; index++) {
          if (index !== key) {
            this.startTime[index] = null
          }
          this.endTime[index] = null
        }
      }
    },
    endFocus(key) {
      if ((key + 1) < parseInt(this.dialogCreateData.optNo)) {
        for (let index = key; index <= parseInt(this.dialogCreateData.optNo) - 1; index++) {
          if (index !== key) {
            this.startTime[index] = null
            this.endTime[index] = null
          }
        }
      }
    },
    optChange(val) {
      this.startTime = []
      this.endTime = []
      this.dialogCreateData.optNo = null
    },
    // 右侧医生名字及医生ID
    selectedType(selected) {
      this.$nextTick(() => {
        this.dialogCreateData.doctorId = selected.value
        this.dialogCreateData.doctorName = selected.label
        this.handleFilter()
      })
    },
    // 右侧分类数据
    initSelect() {
      getDoctorList({ type: 1 }).then((res) => {
        this.options = res.data.list.map(item => {
          return { label: item.nick, value: item.id }
        })
        this.filterData = this.options // 过滤数据
        this.dialogCreateData.doctorId = this.options[0].value
        this.dialogCreateData.doctorName = this.options[0].label
        this.classLoading = false
        this.handleFilter()
      })
    },
    // 输入框过滤
    searchKey(keyWord) {
      this.filterData = this.options.filter(v => v.label.indexOf(keyWord) > -1)
    },
    // 新增-编辑
    dialogCreateShow(item, amPmNum) {
      if (item) {
        const scheduleDate = new Date(item.scheduleDate).getTime()
        const currentDate = new Date().getTime()
        if (!item.doctorId) {
          this.$message({
            message: '暂无排班',
            type: 'warning'
          })
          return false
        }
        if (scheduleDate < currentDate) {
          this.$message({
            message: '历史排班不可编辑',
            type: 'warning'
          })
          return false
        }
        read(item.id).then(res => {
          if (res.data.code === 200) {
            this.dialogCreateTitle = '编辑排班信息'
            this.dialogCreateData = Object.assign({ ampmType: amPmNum }, item)
            if (this.dialogCreateData.ampmType === 0) {
              this.start = '08:00'
              this.end = '12:00'
            } else {
              this.start = '12:00'
              this.end = '20:00'
            }
            if (this.dialogCreateData.optTime) {
              const optTimeArr = this.dialogCreateData.optTime.split(',')
              const startTime = []
              const endTime = []
              optTimeArr.forEach(v => {
                const timeArr = v.split('-')
                startTime.push(timeArr[0])
                endTime.push(timeArr[1])
              })
              this.startTime = startTime
              this.endTime = endTime
            } else {
              this.startTime = []
              this.endTime = []
            }
            this.dialogCreate = true
            this.whetherAdd = false
          }
        })
      } else {
        this.dialogCreate = true
        this.dialogCreateTitle = '新增排班信息'
        this.whetherAdd = true
        this.dialogCreateData.scheduleDate = ''
        this.dialogCreateData.optNo = null
        this.dialogCreateData.optType = null
        this.dialogCreateData.id = null
        this.dialogCreateData.ampmType = null
        this.timeShow = []
      }
    },
    // 保存
    dialogCreateSubmit(formName) {
      if (this.dialogCreateData.optType === 1) {
        if (this.startTime.length !== this.dialogCreateData.optNo) {
          this.startTime = this.startTime.slice(0, this.dialogCreateData.optNo)
        }
        if (this.endTime.length !== this.dialogCreateData.optNo) {
          this.endTime = this.endTime.slice(0, this.dialogCreateData.optNo)
        }
        if (this.startTime.length === 0) {
          this.submitTage = true
        }
        if (this.endTime.length === 0) {
          this.submitTage = true
        }
        this.startTime.forEach(v => {
          if (v === null) {
            this.submitTage = true
          }
        })
        this.endTime.forEach(v => {
          if (v === null) {
            this.submitTage = true
          }
        })
      }
      this.$refs[formName].validate((valid) => {
        // if (this.submitTage) {
        //   this.$message({
        //     message: '手术时间段不能有空',
        //     type: 'warning'
        //   })
        //   return false
        // }
        if (valid) {
          const data = Object.assign({}, this.dialogCreateData)
          data.scheduleDate = data.scheduleDate + ' 00:00:00'
          const timeArr = []
          this.startTime.forEach((v, k) => {
            const timeList = v + '-' + this.endTime[k]
            timeArr.push(timeList)
          })
          data.optTime = timeArr.join(',')
          if (this.whetherAdd) {
            create(data).then((res) => {
              if (res.data.code === 200) {
                this.$message({
                  message: '新增成功',
                  type: 'success'
                })
                this.cancel()
                this.handleFilter()
              }
            })
          } else {
            update(data).then(res => {
              if (res.data.code === 200) {
                this.$message({
                  message: '更改成功',
                  type: 'success'
                })
                this.cancel()
                this.handleFilter()
              }
            })
          }
        }
      })
    },
    generateDay(start, end) {

    },
    /**
     * 获取表格信息
     */
    handleFilter() {
      this.sortLoading = true
      var doctorId = this.dialogCreateData.doctorId
      if (!doctorId) {
        this.$message({
          message: '暂无医生',
          type: 'warning'
        })
        return
      }
      if (this.filter.scheduleDate === '' || this.filter.scheduleDate === null) {
        this.filter.scheduleDate = this.formatDate(new Date(), 'yyyy-MM-dd')
      }
      const query = Object.assign({ doctorId: doctorId }, this.filter)
      this.currentTime = this.getWeek(this.filter.scheduleDate)
      pending(query).then(res => {
        if (res.data.code === 200) {
          const data = res.data
          this.amschedulingList = data.am
          this.pmschedulingList = data.pm
          this.sortLoading = false
        }
      })
    },
    // 获取前后一星期
    getWeek(date) {
      var new_Date = new Date(date)
      var timesStamp = new_Date.getTime()
      var currenDay = new_Date.getDay()
      var dates = []
      for (var i = 0; i < 7; i++) {
        dates.push(this.formatDate(new Date(new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 6) % 7)).toLocaleDateString().replace(/[年月]/g, '-').replace(/[日上下午]/g, '')), 'MM.dd'))
      }
      return dates
    },
    cancel() {
      const defaultForm = {
        scheduleDate: '',
        id: null,
        optNo: null,
        optType: null
      }
      this.dialogCreateData = Object.assign({}, this.dialogCreateData, defaultForm)
      this.startTime = []
      this.endTime = []
      this.$refs['dialogCreateData'].resetFields()
      this.dialogCreate = false
    },
    // 右侧的添加分类提交
    addCategorySubmit(formData) {
      //  要写个提交的接口    formData为提交的数据
    },
    /**
     * 获取当前时间
     * 格式: y-年 M-月 d-日 h-时 m-分 s-秒
     */
    formatDate(date, fmt) {
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      const o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'H+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
      }
      for (const k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
          const str = o[k] + ''
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : this.padLeftZero(str))
        }
      }
      return fmt
    },
    padLeftZero(str) {
      return ('00' + str).substr(str.length)
    },
    // 获取所有医生
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
    // 根据医生ID获取医生名称
    getDoctorName(val) {
      this.dialogCreateData.doctorName = this.dialogLeftTop1_1_data_doctorList.filter(v => v.id === val)[0].name
    },
    // 上一周
    upWeek() {
      this.filter.scheduleDate = this.GetDay(this.filter.scheduleDate, -7)
      this.handleFilter()
    },
    // 下一周
    downWeek() {
      this.filter.scheduleDate = this.GetDay(this.filter.scheduleDate, 7)
      this.handleFilter()
    },
    // 本周
    thisWeek() {
      this.filter.scheduleDate = this.formatDate(new Date(), 'yyyy-MM-dd')
      this.handleFilter()
    },
    GetDay(date, day) {
      const time = new Date(date)
      time.setDate(time.getDate() + day)
      const y = time.getFullYear()
      const m = (time.getMonth() + 1) < 10 ? '0' + (time.getMonth() + 1) : (time.getMonth() + 1)
      const d = time.getDate() < 10 ? '0' + (time.getDate()) : (time.getDate())
      return y + '-' + m + '-' + d
    },
    // 应用上一周排班数据
    applicationBeforeWeek() {
      if (!this.filter.scheduleDate) {
        this.$message({
          message: '应用的时间不能为空，请选择应用的时间',
          type: 'warning'
        })
        return false
      }
      useLastWeekSchedule({ doctorId: this.dialogCreateData.doctorId, date: this.filter.scheduleDate }).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: '应用成功',
            type: 'success'
          })
          this.handleFilter()
        }
      })
    },
    handleDownload() {
      this.$confirm('是否下载医生排班模板?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '直接导入',
        type: 'warning'
      }).then(() => {
        this.uploading = true
        this.textLoading = '医生排班模板导出中...'
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['医生ID', '医生名称', '排班日期', '上午下午', '排班类型', '手术时间段']
          const filterVal = ['doctorId', 'doctorName', 'scheduleDate', 'ampmType', 'optType', 'optTime']
          const list = [
            {
              doctorId: 2,
              doctorName: '医疗机构管理员',
              scheduleDate: '2019/3/18',
              ampmType: '上午',
              optType: '手术',
              optTime: '08:00-11:00,11:00-12:00'
            },
            {
              doctorId: 2,
              doctorName: '医疗机构管理员',
              scheduleDate: '2019/3/24',
              ampmType: '下午',
              optType: '手术',
              optTime: '12:00-14:00'
            }
          ]
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: '医生排班模板',
            autoWidth: true
          })
          this.uploading = false
        })
      }).catch(() => {
        document.getElementsByClassName('el-upload__input')[0].click()
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        return v[j]
      }))
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  .flexWrap {
    display: flex;
    height: 100%;
    background-color: #fff;
    overflow-y: scroll;
    .leftWrap {
      flex: 10;
    }
    .rightWrap {
      flex: 2;
    }
  }
  .filterBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .filterPart {
      line-height: 2;
      .el-date-editor .el-range-separator {
        width: 40px;
      }
    }
  }
  .dialogLeftTop1_1 {
    .el-select {
      display: block;
    }
  }
  .editor-container {
    // min-height: 500px;
    margin: 0 0 30px;
    .editor-upload-btn-container {
      text-align: right;
      margin-right: 10px;
      .editor-upload-btn {
        display: inline-block;
      }
    }
  }
  //   排班表
  .block {
    display: flex;
    .AMOrPM {
      width: 120px;
      height: 152px;
      margin: 16px 0 16px 20px;
      border: 1px solid #ddd;
      p {
        margin: 0;
        height: 50px;
        line-height: 50px;
        text-align: center;
        border-bottom: 1px solid #ddd;
      }
    }
    .sliderWrap {
      flex: 1;
      .appointmentTimeItem {
        display: flex;
        flex-direction: column;
        padding: 0 20px;
        min-width: 1100px;
        .appointmentTime {
          flex: 1;
          list-style: none;
          margin: 0;
          border-top: 1px solid #ddd;
          border-right: 1px solid #ddd;
          text-align: center;
          display: flex;
          justify-content: space-around;
          &:last-child {
            border-bottom: 1px solid #ddd;
          }
          p {
            flex: 1;
            margin: 0;
            height: 50px;
            line-height: 50px;
            border-left: 1px solid #ddd;
            &.work {
              position: relative;
              .badge {
                position: absolute;
                right: 2px;
                bottom: 2px;
                height: 16px;
                line-height: 12px;
                padding: 2px 5px;
                font-size: 12px;
                color: #fff;
                border-radius: 4px;
                background-color: #f56c6c;
              }
            }
          }
        }
      }
    }
  }
}
</style>
<style lang="scss">
#schedu {
  .el-dialog{
    min-width: 650px;
  }
}
.uploadScheduling{
  display: inline-block;
}
</style>
