<template>
  <div class="statisticalAnalysis wrap" v-loading="loading" element-loading-text="拼命加载中">
    <el-tabs v-model="activePanel" type="card" @tab-click="handleClick" class="tabPanel">
      <el-tab-pane label="费用统计页面" name="cost">
        <div class="filter-container">
          <div class="filterBox">
            <div class="leftPart filterPart">
              <el-input v-model="inHospNo" placeholder="请输入住院号" size="small" style="width: 140px;"></el-input>
              <el-select v-model="departmentId" placeholder="科室选择" clearable size="small" style="width: 140px;">
                <el-option
                  v-for="item in departmentList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-select v-model="operationId" placeholder="手术选择" clearable size="small" style="width: 140px;">
                <el-option
                  v-for="item in operationList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-select v-model="costType" placeholder="手术选择" clearable size="small" style="width: 140px;">
                <el-option
                  v-for="item in costTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <div class="inlineBlock" v-show="isActive === 1">
                <el-date-picker
                  size="small"
                  style="margin-top:15px;width: 140px;"
                  v-model="startTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                  :picker-options="startDatePicker"
                ></el-date-picker>
                <span class="timeStriping" style="margin-top:15px;">—</span>
                <el-date-picker
                  size="small"
                  style="margin-right:15px;margin-top:15px;width: 140px;"
                  v-model="endTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  :picker-options="endDatePicker"
                  placeholder="选择日期"
                ></el-date-picker>
              </div>
              <div class="inlineBlock" v-show="isActive === 2">
                <el-date-picker
                  size="small"
                  style="margin-top:15px;width: 140px;"
                  v-model="startTime2"
                  type="month"
                  value-format="yyyy-MM"
                  placeholder="选择月份"
                  :picker-options="startDatePicker2"
                ></el-date-picker>
                <span class="timeStriping" style="margin-top:15px;">—</span>
                <el-date-picker
                  size="small"
                  style="margin-right:15px;margin-top:15px;width: 140px;"
                  v-model="endTime2"
                  type="month"
                  value-format="yyyy-MM"
                  :picker-options="endDatePicker2"
                  placeholder="选择月份"
                ></el-date-picker>
              </div>
              <div class="inlineBlock" v-show="isActive === 3">
                <el-date-picker
                  size="small"
                  style="margin-top:15px;width: 140px;"
                  v-model="startTime3"
                  type="year"
                  value-format="yyyy"
                  placeholder="选择年份"
                  :picker-options="startDatePicker3"
                ></el-date-picker>
                <span class="timeStriping" style="margin-top:15px;">—</span>
                <el-date-picker
                  size="small"
                  style="margin-right:15px;margin-top:15px;width: 140px;"
                  v-model="endTime3"
                  type="year"
                  value-format="yyyy"
                  :picker-options="endDatePicker3"
                  placeholder="选择年份"
                ></el-date-picker>
              </div>
              <el-button type="primary" v-waves icon="el-icon-search" size="small" @click="handleFilter">查询</el-button>
              <div class="timeBox">
                <span :class="isActive === 1 ? 'active' : ''" @click="timeClick(1)">日</span>
                <i></i>
                <span :class="isActive === 2 ? 'active' : ''" @click="timeClick(2)">月</span>
                <i></i>
                <span :class="isActive === 3 ? 'active' : ''" @click="timeClick(3)">年</span>
              </div>
            </div>
            <div class="rightPart filterPart"></div>
          </div>
        </div>
        <div class="echartBox" v-if="echartTage">
          <echart-line :analyze="analyze1"></echart-line>
        </div>
        <div class="nullBox" v-else>
          <span>暂无数据</span>
        </div>
        <div id="lgTotle">
          <complex-table
            :hasSelection="false"
            :list="tableList"
            :totalList="totalList"
            :theadList="theadList"
            :operationButtons="operationButtons"
            @operationEvent0="operationEvent0"
            @getListByPagination="getListByPagination"
            @initListQuery="initListQuery"
          ></complex-table>
          <table cellpadding="0" cellspacing="0" border="0">
            <tbody>
              <tr>
                <td rowspan="2">合计</td>
                <td>平均住院时长</td>
                <td>手术台次</td>
              </tr>
              <tr>
                <td>{{aveInHospTime.aveHour}}</td>
                <td>{{aveInHospTime.total}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="患者平均住院时间统计" name="hospitalTime">
        <div class="filter-container">
          <div class="filterBox">
            <div class="leftPart filterPart">
              <div class="inlineBlock" v-show="isActive === 1">
                <el-date-picker
                  style="margin-top:15px;"
                  v-model="startTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                  :picker-options="startDatePicker"
                ></el-date-picker>
                <span class="timeStriping" style="margin-top:15px;">—</span>
                <el-date-picker
                  style="margin-right:15px;margin-top:15px;"
                  v-model="endTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  :picker-options="endDatePicker"
                  placeholder="选择日期"
                ></el-date-picker>
              </div>
              <div class="inlineBlock" v-show="isActive === 2">
                <el-date-picker
                  style="margin-top:15px;"
                  v-model="startTime2"
                  type="month"
                  value-format="yyyy-MM-dd"
                  placeholder="选择月份"
                  :picker-options="startDatePicker2"
                ></el-date-picker>
                <span class="timeStriping" style="margin-top:15px;">—</span>
                <el-date-picker
                  style="margin-right:15px;margin-top:15px;"
                  v-model="endTime2"
                  type="month"
                  value-format="yyyy-MM-dd"
                  :picker-options="endDatePicker2"
                  placeholder="选择月份"
                ></el-date-picker>
              </div>
              <div class="inlineBlock" v-show="isActive === 3">
                <el-date-picker
                  style="margin-top:15px;"
                  v-model="startTime3"
                  type="year"
                  value-format="yyyy-MM-dd"
                  placeholder="选择年份"
                  :picker-options="startDatePicker3"
                ></el-date-picker>
                <span class="timeStriping" style="margin-top:15px;">—</span>
                <el-date-picker
                  style="margin-right:15px;margin-top:15px;"
                  v-model="endTime3"
                  type="year"
                  value-format="yyyy-MM-dd"
                  :picker-options="endDatePicker3"
                  placeholder="选择年份"
                ></el-date-picker>
              </div>
              <el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
              <div class="timeBox">
                <span :class="isActive === 1 ? 'active' : ''" @click="timeClick(1)">日</span>
                <i></i>
                <span :class="isActive === 2 ? 'active' : ''" @click="timeClick(2)">月</span>
                <i></i>
                <span :class="isActive === 3 ? 'active' : ''" @click="timeClick(3)">年</span>
              </div>
            </div>
            <div class="rightPart filterPart"></div>
          </div>
        </div>
        <div class="echartBox" v-if="echartTage">
          <echart-line :analyze="analyze2"></echart-line>
        </div>
        <div class="nullBox" v-else>
          <span>暂无数据</span>
        </div>
      </el-tab-pane>
      <el-tab-pane label="按病种统计日间手术台次" name="during">
        <div class="filter-container">
          <div class="filterBox">
            <div class="leftPart filterPart">
              <el-select
                v-model="operationType"
                multiple
                filterable
                allow-create
                default-first-option
                size="small"
                placeholder="请选择术种">
                <el-option
                  v-for="item in operationTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <div class="inlineBlock" v-show="isActive === 1">
                <el-date-picker
                  size="small"
                  style="margin-top:15px;"
                  v-model="startTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                  :picker-options="startDatePicker"
                ></el-date-picker>
                <span class="timeStriping" style="margin-top:15px;">—</span>
                <el-date-picker
                  size="small"
                  style="margin-right:15px;margin-top:15px;"
                  v-model="endTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  :picker-options="endDatePicker"
                  placeholder="选择日期"
                ></el-date-picker>
              </div>
              <div class="inlineBlock" v-show="isActive === 2">
                <el-date-picker
                  size="small"
                  style="margin-top:15px;"
                  v-model="startTime2"
                  type="month"
                  value-format="yyyy-MM-dd"
                  placeholder="选择月份"
                  :picker-options="startDatePicker2"
                ></el-date-picker>
                <span class="timeStriping" style="margin-top:15px;">—</span>
                <el-date-picker
                  size="small"
                  style="margin-right:15px;margin-top:15px;"
                  v-model="endTime2"
                  type="month"
                  value-format="yyyy-MM-dd"
                  :picker-options="endDatePicker2"
                  placeholder="选择月份"
                ></el-date-picker>
              </div>
              <div class="inlineBlock" v-show="isActive === 3">
                <el-date-picker
                  size="small"
                  style="margin-top:15px;"
                  v-model="startTime3"
                  type="year"
                  value-format="yyyy-MM-dd"
                  placeholder="选择年份"
                  :picker-options="startDatePicker3"
                ></el-date-picker>
                <span class="timeStriping" style="margin-top:15px;">—</span>
                <el-date-picker
                  size="small"
                  style="margin-right:15px;margin-top:15px;"
                  v-model="endTime3"
                  type="year"
                  value-format="yyyy-MM-dd"
                  :picker-options="endDatePicker3"
                  placeholder="选择年份"
                ></el-date-picker>
              </div>
              <el-button type="primary" v-waves size="small" icon="el-icon-search" @click="handleFilter">查询</el-button>
              <div class="timeBox">
                <span :class="isActive === 1 ? 'active' : ''" @click="timeClick(1)">日</span>
                <i></i>
                <span :class="isActive === 2 ? 'active' : ''" @click="timeClick(2)">月</span>
                <i></i>
                <span :class="isActive === 3 ? 'active' : ''" @click="timeClick(3)">年</span>
              </div>
            </div>
            <div class="rightPart filterPart"></div>
          </div>
        </div>
        <div class="echartBox" v-if="echartTage">
          <echart-line :analyze="analyze3"></echart-line>
        </div>
        <div class="nullBox" v-else>
          <span>暂无数据</span>
        </div>
        <div id="lgTabel">
          <div id="tabelHead">
            日间手术台次统计
          </div>
          <div id="tabelBody" v-if="diseaseList.length > 0">
            <ul>
              <li v-for="(item, index) in diseaseList" :key="index">
                <div class="tabelBox">
                  <span class="diseasesName" :title="item[0].xname">{{item[0].xname}}</span>
                  <span class="count">{{item[0].count}}</span>
                </div>
                <div class="tabelBox">
                  <span class="diseasesName" :title="item[1].xname">{{item[1].xname}}</span>
                  <span class="count">{{item[1].count}}</span>
                </div>
                <div class="tabelBox">
                  <span class="diseasesName" :title="item[2].xname">{{item[2].xname}}</span>
                  <span class="count">{{item[2].count}}</span>
                </div>
                <div class="tabelBox">
                  <span class="diseasesName" :title="item[3].xname">{{item[3].xname}}</span>
                  <span class="count">{{item[3].count}}</span>
                </div>
                <div class="tabelBox">
                  <span class="diseasesName" :title="item[4].xname">{{item[4].xname}}</span>
                  <span class="count">{{item[4].count}}</span>
                </div>
              </li>
            </ul>
          </div>
          <div class="lgNull" v-else>
            暂无数据
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="患者床位使用率" name="bedUse">
        <div class="filter-container">
          <div class="filterBox">
            <div class="leftPart filterPart">
              <div class="inlineBlock" v-show="isActive === 1">
                <el-date-picker
                  style="margin-top:15px;"
                  v-model="startTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                  :picker-options="startDatePicker"
                ></el-date-picker>
                <span class="timeStriping" style="margin-top:15px;">—</span>
                <el-date-picker
                  style="margin-right:15px;margin-top:15px;"
                  v-model="endTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  :picker-options="endDatePicker"
                  placeholder="选择日期"
                ></el-date-picker>
              </div>
              <div class="inlineBlock" v-show="isActive === 2">
                <el-date-picker
                  style="margin-top:15px;"
                  v-model="startTime2"
                  type="month"
                  value-format="yyyy-MM-dd"
                  placeholder="选择月份"
                  :picker-options="startDatePicker2"
                ></el-date-picker>
                <span class="timeStriping" style="margin-top:15px;">—</span>
                <el-date-picker
                  style="margin-right:15px;margin-top:15px;"
                  v-model="endTime2"
                  type="month"
                  value-format="yyyy-MM-dd"
                  :picker-options="endDatePicker2"
                  placeholder="选择月份"
                ></el-date-picker>
              </div>
              <div class="inlineBlock" v-show="isActive === 3">
                <el-date-picker
                  style="margin-top:15px;"
                  v-model="startTime3"
                  type="year"
                  value-format="yyyy-MM-dd"
                  placeholder="选择年份"
                  :picker-options="startDatePicker3"
                ></el-date-picker>
                <span class="timeStriping" style="margin-top:15px;">—</span>
                <el-date-picker
                  style="margin-right:15px;margin-top:15px;"
                  v-model="endTime3"
                  type="year"
                  value-format="yyyy-MM-dd"
                  :picker-options="endDatePicker3"
                  placeholder="选择年份"
                ></el-date-picker>
              </div>
              <el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
              <div class="timeBox">
                <span :class="isActive === 1 ? 'active' : ''" @click="timeClick(1)">日</span>
                <i></i>
                <span :class="isActive === 2 ? 'active' : ''" @click="timeClick(2)">月</span>
                <i></i>
                <span :class="isActive === 3 ? 'active' : ''" @click="timeClick(3)">年</span>
              </div>
            </div>
            <div class="rightPart filterPart"></div>
          </div>
        </div>
        <div class="echartBox" v-if="echartTage">
          <echart-line :analyze="analyze4"></echart-line>
        </div>
        <div class="nullBox" v-else>
          <span>暂无数据</span>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- Table -->
    <el-dialog title="详细" :visible.sync="dialogTableVisible" class="detailBox">
      <el-table :data="gridData" border>
        <el-table-column property="itemName" label="项目名称" align="center"></el-table-column>
        <el-table-column property="price" label="金额" align="center"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
import waves from '@/directive/waves/index.js'
import echartLine from '@/yimiviews/case/echartLine'
import echartBar from '@/yimiviews/case/echartBar'
import complexTable from '@/views/table/complexTable'
import { cost, averageInHospTime, surgeryCount, bedUseRate, getPage, aveInHospTime, getCostDetail } from '@/api/statistical/statisticalAnalysis'

export default {
  name: 'statisticalAnalysis',
  components: { echartLine, echartBar, complexTable },
  data() {
    return {
      activePanel: 'cost',
      startDatePicker: this.beginDate(),
      endDatePicker: this.processDate(),
      startDatePicker2: this.beginDate2(),
      endDatePicker2: this.processDate2(),
      startDatePicker3: this.beginDate3(),
      endDatePicker3: this.processDate3(),
      startTime: '',
      startTime2: '',
      startTime3: '',
      endTime: '',
      endTime2: '',
      endTime3: '',
      value1: '',
      value2: '',
      value3: '',
      isActive: 1,
      loading: true,
      analyze1: {
        title: '',
        subtext: '平均住院时间/天',
        key: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        value: [820, 932, 901, 934, 1290, 1330, 1320],
        color: '#508BFF',
        axisPointer: 'line',
        axisLabel: true,
        symbol: '',
        rotate: 0
      },
      analyze2: {
        title: '按病种统计日间手术台次',
        subtext: '台/次',
        key: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        value: [820, 932, 901, 934, 1290, 1330, 1320],
        color: '#FECD2E',
        axisPointer: 'line',
        axisLabel: true,
        symbol: '',
        rotate: 0
      },
      analyze3: {
        title: '',
        subtext: '单位：台',
        key: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        value: [820, 932, 901, 934, 1290, 1330, 1320],
        color: '#c9bffb',
        axisPointer: 'line',
        axisLabel: true,
        symbol: '',
        rotate: -10
      },
      analyze4: {
        title: '患者床位使用率',
        subtext: '',
        key: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        value: [820, 932, 901, 934, 1290, 1330, 1320],
        color: '#508BFF',
        axisPointer: 'line',
        axisLabel: true,
        symbol: '%',
        rotate: 0
      },
      echartTage: true,
      diseaseList: [],
      diseaseLength: 0,
      lengthArr: [],
      // 费用统计
      tableList: [],
      totalList: 0,
      theadList: [
        {
          label: 'patientName',
          text: '患者姓名'
        },
        {
          label: 'inHospNo',
          text: '住院号'
        },
        {
          label: 'visitDiagnosis',
          text: '诊断'
        },
        {
          label: 'visitDepartment',
          text: '门诊科室'
        },
        {
          label: 'visitDoctor',
          text: '门诊医生'
        },
        {
          label: 'operationName',
          text: '手术名称'
        },
        {
          label: 'doctorName',
          text: '主刀医生'
        },
        {
          label: 'hospTime',
          text: '住院时长'
        },
        {
          label: 'inHospTime',
          text: '入院时间'
        },
        {
          label: 'prices',
          text: '总费用'
        }
      ],
      operationButtons: [
        {
          name: 'details',
          text: '详细',
          id: 0,
          type: 'primary'
        }
      ],
      listQuery: {
        page: 1,
        limit: 5
      },
      inHospNo: '', // 住院号
      departmentId: null, // 科室
      operationId: null, // 手术
      costType: null, // 费用类型
      departmentList: [],
      operationList: [],
      costTypeList: [],
      aveInHospTime: { // 平均住院时长、手术台次
        total: 0,
        aveHour: 0
      },
      dialogTableVisible: false, // 详细窗口
      gridData: [], // 详细数据
      operationType: [], // 术种
      operationTypeList: []
    }
  },
  mounted() {
    // 默认时间
    this.startTime = this.getFullDate(new Date().setDate(1))
    this.endTime = this.getFullDate(new Date())
    this.getCost()
  },
  methods: {
    initListQuery(listQuery) {
      this.listQuery = listQuery
    },
    getListByPagination(listQuery) {
      this.listQuery = listQuery
      this.getList()
    },
    getList() {
      const query = Object.assign({
        inHospNo: this.inHospNo,
        departmentId: this.departmentId,
        operationId: this.operationId,
        costType: this.costType,
        dateType: this.isActive,
        startTime: this.isActive === 1 ? this.startTime : (this.isActive === 2 ? this.startTime2 : this.startTime3),
        endTime: this.isActive === 1 ? this.endTime : (this.isActive === 2 ? this.endTime2 : this.endTime3)
      }, this.listQuery)
      getPage(query).then(res => {
        if (res.data.code === 200) {
          this.tableList = res.data.list
          this.totalList = parseInt(res.data.total)
        }
      })
    },
    operationEvent0(row) {
      const query = {
        visitId: row.visitId,
        visitNum: row.visitNum,
        itemType: row.itemType
      }
      getCostDetail(query).then(res => {
        if (res.data.code === 200) {
          this.gridData = res.data.list
        }
      })
      this.dialogTableVisible = true
    },
    beginDate() {
      const _this = this
      return {
        disabledDate(time) {
          if (_this.endTime) {
            return new Date(_this.endTime).getTime() < time.getTime()
          } else {
            return time.getTime() > Date.now() // 开始时间不选时，结束时间最大值小于等于当天
          }
        }
      }
    },
    // 提出结束时间必须大于提出开始时间
    processDate() {
      const _this = this
      return {
        disabledDate(time) {
          if (_this.startTime) {
            return new Date(_this.startTime).getTime() > time.getTime()
          } else {
            return time.getTime() > Date.now() // 开始时间不选时，结束时间最大值小于等于当天
          }
        }
      }
    },
    beginDate2() {
      const _this = this
      return {
        disabledDate(time) {
          if (_this.endTime2) {
            return new Date(_this.endTime2).getTime() < time.getTime()
          } else {
            return time.getTime() > Date.now() // 开始时间不选时，结束时间最大值小于等于当天
          }
        }
      }
    },
    // 提出结束时间必须大于提出开始时间
    processDate2() {
      const _this = this
      return {
        disabledDate(time) {
          if (_this.startTime2) {
            return new Date(_this.startTime2).getTime() > time.getTime()
          } else {
            return time.getTime() > Date.now() // 开始时间不选时，结束时间最大值小于等于当天
          }
        }
      }
    },
    beginDate3() {
      const _this = this
      return {
        disabledDate(time) {
          if (_this.endTime3) {
            return new Date(_this.endTime3).getTime() < time.getTime()
          } else {
            return time.getTime() > Date.now() // 开始时间不选时，结束时间最大值小于等于当天
          }
        }
      }
    },
    // 提出结束时间必须大于提出开始时间
    processDate3() {
      const _this = this
      return {
        disabledDate(time) {
          if (_this.startTime3) {
            return new Date(_this.startTime3).getTime() > time.getTime()
          } else {
            return time.getTime() > Date.now() // 开始时间不选时，结束时间最大值小于等于当天
          }
        }
      }
    },
    // 获取时间
    getFullDate(targetDate) {
      var D, y, m, d
      if (targetDate) {
        D = new Date(targetDate)
        y = D.getFullYear()
        m = D.getMonth() + 1
        d = D.getDate()
      }
      m = m > 9 ? m : '0' + m
      d = d > 9 ? d : '0' + d
      return y + '-' + m + '-' + d
    },
    // 费用统计页面
    getCost() {
      const query = {
        inHospNo: this.inHospNo,
        departmentId: this.departmentId,
        operationId: this.operationId,
        costType: this.costType,
        dateType: this.isActive,
        startTime: this.isActive === 1 ? this.startTime : (this.isActive === 2 ? this.startTime2 : this.startTime3),
        endTime: this.isActive === 1 ? this.endTime : (this.isActive === 2 ? this.endTime2 : this.endTime3)
      }
      if (!query.startTime) {
        this.$message({
          message: '开始时间不能为空',
          type: 'warning'
        })
        return false
      }
      if (!query.endTime) {
        this.$message({
          message: '结束时间不能为空',
          type: 'warning'
        })
        return false
      }
      this.echartTage = true
      this.loading = true
      cost(query).then(res => {
        if (res.data.code === 200) {
          if (res.data.xList.length === 0 || res.data.xList.length === 0) {
            this.echartTage = false
          } else {
            this.echartTage = true
            this.analyze1.key = res.data.xList
            this.analyze1.value = res.data.yList
          }
          this.loading = false
        }
      })
    },
    // 患者平均住院时间统计
    getAverageInHospTime() {
      const query = {
        dateType: this.isActive,
        startTime: this.isActive === 1 ? this.startTime : (this.isActive === 2 ? this.startTime2 : this.startTime3),
        endTime: this.isActive === 1 ? this.endTime : (this.isActive === 2 ? this.endTime2 : this.endTime3)
      }
      if (!query.startTime) {
        this.$message({
          message: '开始时间不能为空',
          type: 'warning'
        })
        return false
      }
      if (!query.endTime) {
        this.$message({
          message: '结束时间不能为空',
          type: 'warning'
        })
        return false
      }
      this.echartTage = true
      this.loading = true
      averageInHospTime(query).then(res => {
        if (res.data.code === 200) {
          if (res.data.xList.length === 0 || res.data.xList.length === 0) {
            this.echartTage = false
          } else {
            this.echartTage = true
            this.analyze2.key = res.data.xList
            this.analyze2.value = res.data.yList
          }
          this.loading = false
        }
      })
    },
    // 按病种统计日间手术台次
    getSurgeryCount() {
      const query = {
        dateType: this.isActive,
        startTime: this.isActive === 1 ? this.startTime : (this.isActive === 2 ? this.startTime2 : this.startTime3),
        endTime: this.isActive === 1 ? this.endTime : (this.isActive === 2 ? this.endTime2 : this.endTime3)
      }
      if (!query.startTime) {
        this.$message({
          message: '开始时间不能为空',
          type: 'warning'
        })
        return false
      }
      if (!query.endTime) {
        this.$message({
          message: '结束时间不能为空',
          type: 'warning'
        })
        return false
      }
      this.echartTage = true
      this.loading = true
      this.diseaseList = []
      surgeryCount(query).then(res => {
        if (res.data.code === 200) {
          if (res.data.xList.length === 0 || res.data.xList.length === 0) {
            this.echartTage = false
          } else {
            this.echartTage = true
            this.analyze3.key = res.data.xList
            this.analyze3.value = res.data.yList
          }
          const diseaseList = res.data.list
          const start = 0
          const end = 5
          if (diseaseList.length > 0) {
            this.diseaseLength = Math.ceil(diseaseList.length / 5)
            for (var j = 0; j < this.diseaseLength; j++) {
              this.lengthArr.push(j)
              this.diseaseList[j] = []
              diseaseList.forEach((v, k) => {
                if (k >= (start + j * 5) && k < (end + j * 5)) {
                  this.diseaseList[j].push(v)
                }
              })
            }
          }
          this.diseaseList.forEach((v, i) => {
            while (v.length < 5) {
              v.push({
                xname: '',
                count: ''
              })
            }
          })
          console.log(this.diseaseList)
          this.loading = false
        }
      })
    },
    // 患者床位使用率
    getBedUseRate() {
      const query = {
        dateType: this.isActive,
        startTime: this.isActive === 1 ? this.startTime : (this.isActive === 2 ? this.startTime2 : this.startTime3),
        endTime: this.isActive === 1 ? this.endTime : (this.isActive === 2 ? this.endTime2 : this.endTime3)
      }
      if (!query.startTime) {
        this.$message({
          message: '开始时间不能为空',
          type: 'warning'
        })
        return false
      }
      if (!query.endTime) {
        this.$message({
          message: '结束时间不能为空',
          type: 'warning'
        })
        return false
      }
      this.echartTage = true
      this.loading = true
      bedUseRate(query).then(res => {
        if (res.data.code === 200) {
          if (res.data.xList.length === 0 || res.data.xList.length === 0) {
            this.echartTage = false
          } else {
            this.echartTage = true
            this.analyze4.key = res.data.xList
            this.analyze4.value = res.data.yList
          }
          this.loading = false
        }
      })
    },
    handleClick(tab, event) {
      switch (this.activePanel) {
        case 'cost':
          this.getCost()
          this.getList()
          this.getAveInHospTime()
          break
        case 'hospitalTime':
          this.getAverageInHospTime()
          break
        case 'during':
          this.getSurgeryCount()
          break
        case 'bedUse':
          this.getBedUseRate()
          break
        default:
          break
      }
    },
    handleFilter() {
      switch (this.activePanel) {
        case 'cost':
          this.getCost()
          this.getList()
          this.getAveInHospTime()
          break
        case 'hospitalTime':
          this.getAverageInHospTime()
          break
        case 'during':
          this.getSurgeryCount()
          break
        case 'bedUse':
          this.getBedUseRate()
          break
        default:
          break
      }
    },
    timeClick(val) {
      this.isActive = val
    },
    getAveInHospTime() {
      const query = {
        inHospNo: this.inHospNo,
        departmentId: this.departmentId,
        operationId: this.operationId,
        dateType: this.isActive,
        startTime: this.isActive === 1 ? this.startTime : (this.isActive === 2 ? this.startTime2 : this.startTime3),
        endTime: this.isActive === 1 ? this.endTime : (this.isActive === 2 ? this.endTime2 : this.endTime3)
      }
      aveInHospTime(query).then(res => {
        if (res.data.code === 200) {
          if (res.data.aveInHospTime) {
            this.aveInHospTime = res.data.aveInHospTime
          }
        }
      })
    }
  },
  directives: {
    waves
  }
}
</script>
<style lang="scss" scoped>
.wrap {
  .tabPanel {
    height: 100%;
    background-color: #fff;
    padding-top: 10px;
    overflow: auto;
    .filter-container {
      .filterBox {
        .leftPart {
          .inlineBlock {
            display: inline-block;
          }
          .timeBox {
            display: inline-block;
            margin-left: 20px;
            i {
              display: inline-block;
              width: 1px;
              height: 10px;
              background-color: #979797;
              vertical-align: middle;
              margin: 0 5px;
            }
            span {
              font-size: 14px;
              color: #111111;
              cursor: pointer;
              &.active {
                color: #508bff;
              }
            }
          }
        }
      }
    }
    .echartBox {
      padding: 0 20px;
    }
    .nullBox {
      width: 100%;
      height: 400px;
      line-height: 400px;
      text-align: center;
      span {
        color: #999;
        font-size: 14px;
      }
    }
    #lgTotle {
      padding: 0 50px;
      table {
        margin: 20px 20px 30px;
        border-collapse: collapse;
        border: 1px solid #eeeeee;
        width: calc(100% - 40px);
        tbody {
          tr {
            text-overflow: ellipsis;
            vertical-align: middle;
            td {
              border: 1px solid #eeeeee;
              padding: 12px 8px;
              box-sizing: border-box;
              text-overflow: ellipsis;
              vertical-align: middle;
              position: relative;
              text-align: left;
              flex: 1;
              text-align: center;
              outline: none;
              font-size: 14px;
              color: #666;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
    }
    #lgTabel {
      padding: 0 70px 0 30px;
      margin-top: 20px;
      #tabelHead {
        width: 100%;
        color: #4283ff;
        font-weight: bold;
        text-align: center;
        padding: 12px 0;
        font-size: 14px;
        background-color: #e9f0ff;
      }
      #tabelBody {
        width: 100%;
        ul {
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          list-style: none;
          margin: 0;
          padding: 0;
          border: 1px solid #eeeeee;
          border: 1px solid #eeeeee;
          li {
            width: 100%;
            display: inline-flex;
            justify-content: flex-start;
            &:last-child {
              .tabelBox {
                span {
                  border-bottom: 0;
                }
              }
            }
            .tabelBox {
              flex: 1;
              max-width: 20%;
              display: flex;
              justify-content: flex-start;
              &:last-child {
                span.count {
                  border-right: 0;
                }
              }
              span {
                font-size: 13px;
                color: #666;
                text-align: center;
                flex: 1;
                padding: 12px 8px;
                border-right: 1px solid #eeeeee;
                border-bottom: 1px solid #eeeeee;
                  &.diseasesName {
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                  }
              }
            }
          }
        }
      }
      .lgNull {
        width: 100%;
        padding: 16px 0;
        text-align: center;
        font-size: 12px;
        color: #666;
        border: 1px solid #eeeeee;
      }
    }
  }
}
</style>
<style lang="scss">
.tabPanel {
  .el-tabs__header {
    padding-left: 20px;
  }
}
.el-date-editor .el-range-separator {
  padding: 0;
}
.statisticalAnalysis {
  .el-select-dropdown__empty {
    font-size: 12px;
  }
}
// 详细
.detailBox {
  .el-dialog {
    .el-dialog__body {
      max-height: 600px;
      overflow-y: scroll;
    }
  }
}
</style>
