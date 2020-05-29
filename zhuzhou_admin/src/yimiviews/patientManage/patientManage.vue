<template>
  <div class='wrap'>
    <el-tabs v-model="activePanel" type="card" @tab-click="handleClick" class='tabPanel'>
      <el-tab-pane label="待手术病人" name="await">
        <div class="filter-container">
          <div class= 'filterBox'>
            <div class='leftPart filterPart'>
              <el-checkbox class="filter-item todayCheckBox" style="margin-left:15px;" true-label="1" false-label="0" @change="handleFilter" v-model="filter.isToday">今日预约</el-checkbox>
            </div>
            <div class='rightPart filterPart'>
              <el-select clearable style="width: 120px" class="filter-item" v-model="filter.type">
                <el-option v-for="item in patientManageConst.keyWordList" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
              <el-input style="width: 220px;" class="filter-item" placeholder="请输入搜索条件" v-model="filter.keyWord"></el-input>
              <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
            </div>
          </div>
        </div>
        <complex-table
          :columnsType='"index"'
          columnsLabel="序号"
          :hasOperate="false"
          :list="tableList1"
          :totalList='totalList1'
          :theadList="patientManageConst.theadList1"
          @initListQuery='initListQuery'
          @getListByPagination='getListByPagination'>
        </complex-table>
      </el-tab-pane>
      <el-tab-pane label="历史病人" name="history">
        <div class="filter-container">
          <div class= 'filterBox'>
            <div class='leftPart filterPart'></div>
            <div class='rightPart filterPart'>
              <el-select clearable style="width: 150px" class="filter-item" v-model="filter2.appointStatus">
                <el-option label="手术完成" value= 1></el-option>
                <el-option label="退出日间" value= 2></el-option>
              </el-select>
              <el-select clearable style="width: 150px" class="filter-item" v-model="filter2.timeType">
                <el-option label="预约时间" value= 1></el-option>
                <el-option label="手术时间" value= 2></el-option>
              </el-select>
              <el-date-picker
                style="width:180px;"
                v-model="filter2.startTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
                :picker-options="startDatePicker"
              ></el-date-picker>
              <span>—</span>
              <el-date-picker
                style="width:180px;"
                v-model="filter2.endTime"
                type="date"
                value-format="yyyy-MM-dd"
                :picker-options="endDatePicker"
                placeholder="选择日期"
              ></el-date-picker>
              <el-select clearable style="width: 120px" class="filter-item" v-model="filter2.type">
                <el-option v-for="item in patientManageConst.keyWordList" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
              <el-input style="width: 220px;" class="filter-item" placeholder="请输入搜索条件" v-model="filter2.keyWord"></el-input>
              <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter2">搜索</el-button>
            </div>
          </div>
        </div>
        <complex-table
          :columnsType='"index"'
          columnsLabel="序号"
          :list='tableList2'
          :totalList='totalList2'
          :theadList="patientManageConst.theadList2"
          :hasOperate="false"
          @initListQuery='initListQuery'
          @getListByPagination='getListByPagination2'>
        </complex-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import complexTable from '@/views/table/complexTable'
  import waves from '@/directive/waves/index.js'
  import { patientManageConst } from '@/yimiviews/patientManage/columnsConst'
  import { pageList } from '@/api/patientManage/patientManage'
  export default {
    components: { complexTable },
    data() {
      return {
        patientManageConst,
        tableList1: [],
        tableList2: [],
        totalList1: 0,
        totalList2: 0,
        startDatePicker: this.beginDate(),
        endDatePicker: this.processDate(),
        filter: {
          keyWord: '',
          status: null,
          type: null,
          isToday: '1',
          isHistory: 0
        },
        filter2: {
          keyWord: '',
          appointStatus: null,
          timeType: null,
          startTime: '',
          endTime: '',
          status: null,
          type: null,
          isHistory: 1 // 历史预约
        },
        listQuery: {
          page: 1,
          limit: 10
        },
        listQuery2: {
          page: 1,
          limit: 10
        },
        activePanel: 'await'
      }
    },
    mounted() {
      this.handleFilter()
      this.handleFilter2()
    },
    methods: {
      initListQuery(listQuery) {
        this.listQuery = listQuery
        this.listQuery2 = listQuery
      },
      handleFilter() {
        const query = Object.assign({}, this.listQuery, this.filter)
        pageList(query).then(res => {
          if (res.data.code === 200) {
            this.tableList1 = res.data.list
            this.totalList1 = parseInt(res.data.total)
          }
        })
      },
      handleFilter2() {
        const query = Object.assign({}, this.listQuery2, this.filter2)
        pageList(query).then(res => {
          if (res.data.code === 200) {
            this.tableList2 = res.data.list
            this.totalList2 = parseInt(res.data.total)
          }
        })
      },
      // 分页加载
      getListByPagination(listQuery) {
        this.listQuery = listQuery
        this.handleFilter()
      },
      getListByPagination2(listQuery) {
        this.listQuery2 = listQuery
        this.handleFilter2()
      },
      handleClick(tab, event) {
        // this.handleFilter()
        // this.handleFilter2()
      },
      beginDate() {
        const _this = this
        return {
          disabledDate(time) {
            if (_this.filter2.endTime) {
              return new Date(_this.filter2.endTime).getTime() < time.getTime()
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
            if (_this.filter2.startTime) {
              return new Date(_this.filter2.startTime).getTime() > time.getTime()
            } else {
              return time.getTime() > Date.now() // 开始时间不选时，结束时间最大值小于等于当天
            }
          }
        }
      }
    },
    computed: {},
    directives: {
      waves
    }
  }
</script>
<style lang="scss" scope>
.tabPanel {
  height: 100%;
  background-color: #fff;
  padding-top: 10px;
  overflow: auto;
  .el-tabs__header {
    padding-left: 20px;
  }
}
.filterBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .filterPart {
    line-height: 2;
  }
}
</style>
