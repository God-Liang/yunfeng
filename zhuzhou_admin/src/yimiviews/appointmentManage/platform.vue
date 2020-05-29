<template>
<div class="wrap">
  <el-tabs v-model="activePanel" type="card" @tab-click="handleClick" class='tabPanel'>
    <el-tab-pane label="待处理预约" name="pending">

      <div class="filter-container">
        <div class= 'filterBox'>
          <div class='leftPart filterPart'>
            <el-checkbox class="filter-item" style="margin-left:15px;" @change="todayAppointment" v-model="filter.todayFlag">今日预约</el-checkbox>
          </div>
          <div class='rightPart filterPart'>
            <el-select clearable style="width: 120px" class="filter-item" v-model="filter.type">
              <el-option label="患者姓名" value="0"></el-option>
              <el-option label="手机号后四位" value="1"></el-option>
              <el-option label="就诊卡号" value="2"></el-option>
            </el-select>
            <el-input style="width: 220px;" class="filter-item" placeholder="请输入搜索条件" v-model="filter.keyWord">
            </el-input>
            <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
          </div>
        </div>
      </div>
      <complex-table 
        :hasSelection= false 
        :list = 'tableList1' 
        :theadList = "platformConst.theadList1"
        :totalList = 'totalList1'
        :operationButtons = 'platformConst.operationButtons1'
        @initListQuery = 'initListQuery'
        @getListByPagination = 'getTableList1'>
      </complex-table>
    </el-tab-pane>

    <el-tab-pane label="历史预约病人" name="done">
      <div class="filter-container">
        <div class= 'filterBox'>
          <div class='leftPart filterPart'></div>
          <div class='rightPart filterPart'>
            <el-select clearable style="width: 120px" class="filter-item" v-model="filter2.type">
              <el-option label="患者姓名" value="0"></el-option>
              <el-option label="手机号后四位" value="1"></el-option>
              <el-option label="就诊卡号" value="2"></el-option>
            </el-select>
            <el-input style="width: 220px;" class="filter-item" placeholder="请输入搜索条件" v-model="filter2.keyWord">
            </el-input>
            <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter2">搜索</el-button>
          </div>
        </div>
      </div>
      <complex-table 
        :hasSelection= false
        :list = 'tableList2' 
        :totalList = 'totalList2'
        :operationButtons = 'platformConst.operationButtons2'
        :theadList = "platformConst.theadList1"
        @initListQuery = 'initListQuery'
        @getListByPagination = 'getTableList2'>
      </complex-table>
    </el-tab-pane>

  </el-tabs>
</div>
</template>
<script>
  import complexTable from '@/views/table/complexTable'
  import waves from '@/directive/waves/index.js'
  import { platformConst } from '@/yimiviews/appointmentManage/columnsConst'
  import { pageListPlatform } from '@/api/appointmentManage/appointmentConfirm'
  export default {
    components: { complexTable },
    data() {
      return {
        platformConst,
        filter: {
          keyWord: '',
          type: null,
          todayFlag: false,
          page: 1,
          limit: 5
        },
        filter2: {
          keyWord: '',
          type: null,
          page: 1,
          limit: 5
        },
        activePanel: 'pending',
        dialogLeftTop1_1: false,
        dialogLeftTop1_2: false,
        formLabelWidth: '120px',
        filterContainer: {},
        totalList1: 0,
        totalList2: 0,
        tableList1: [],
        tableList2: []
      }
    },
    mounted() {
      this.getTableList1(this.filter)
      this.getTableList2(this.filter2)
    },
    methods: {
      initListQuery(listQuery) {
        this.filter.limit = listQuery.limit
        this.filter.page = listQuery.page
        this.filter2.limit = listQuery.limit
        this.filter2.page = listQuery.page
      },
      operationEvent1_1(row) {
        this.dialogLeftTop1_1 = !this.dialogLeftTop1_1
      },
      operationEvent1_2(row) {
      },
      handleFilter() {
        this.getTableList1(this.filter)
      },
      handleFilter2() {
        this.getTableList2(this.filter2)
      },
      handleClick(tab, event) {
      },
      todayAppointment() {},
      getTableList1(listQuery) {
        this.filter.limit = listQuery.limit
        this.filter.page = listQuery.page
        pageListPlatform({ condition: this.filter.type, status: 0, keyword: this.filter.keyWord, todayFlag: this.filter.todayFlag ? 1 : 0 }, this.filter.page, this.filter.limit).then((res) => {
          for (const item of res.data.list) {
            item.id = item.appointmentId
          }
          this.tableList1 = res.data.list
          this.totalList1 = res.data.total
        })
      },
      getTableList2(listQuery) {
        this.filter2.limit = listQuery.limit
        this.filter2.page = listQuery.page
        pageListPlatform({ condition: this.filter2.type, status: 1, keyword: this.filter2.keyWord }, this.filter2.page, this.filter2.limit).then((res) => {
          for (const item of res.data.list) {
            item.id = item.appointmentId
          }
          this.tableList2 = res.data.list
          this.totalList2 = res.data.total
        })
      }
    },
    computed: {
      APPLICANT_NAME() {
        this.dialogLeftTop1_1_data.applicant = this.$store.getters.name
        return this.$store.getters.name
      }
    },
    directives: {
      waves
    }
  }
</script>
<style lang="scss">
  .tabPanel{
    height: 100%;
    background-color: #fff;
    padding-top: 10px;
    overflow: auto;
    .el-tabs__header{
      padding-left: 20px;
    }
  }
  .filterBox{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .filterPart{
      line-height: 2;
    }
  }
</style>
