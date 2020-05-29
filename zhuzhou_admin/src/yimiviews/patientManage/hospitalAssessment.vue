<template>
  <div class='wrap'>
    <el-tabs v-model="activePanel" type="card" @tab-click="handleClick" class='tabPanel'>
      <el-tab-pane label="待评估病人" name="await">
        <div class="filter-container">
          <div class= 'filterBox'>
            <div class='leftPart filterPart'>
            </div>
            <div class='rightPart filterPart'>
              <el-select clearable style="width: 120px" class="filter-item" v-model="filter.type">
                <el-option v-for="item in hospitalAssessmentConst.keyWordList" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
              <el-input style="width: 220px;" class="filter-item" placeholder="请输入搜索条件" v-model="filter.keyWord"></el-input>
              <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
            </div>
          </div>
        </div>
        <complex-table
          :columnsType='"index"'
          columnsLabel="序号"
          :list="tableList1"
          :totalList='totalList1'
          :theadList="hospitalAssessmentConst.theadList1"
          :operationButtons="hospitalAssessmentConst.operationButtons1"
          @operationEvent0='operationEvent1_0'
          @initListQuery='initListQuery'
          @getListByPagination='getListByPagination'>
        </complex-table>
      </el-tab-pane>
      <el-tab-pane label="已评估病人" name="history">
        <div class="filter-container">
          <div class= 'filterBox'>
            <div class='leftPart filterPart'></div>
            <div class='rightPart filterPart'>
              <el-select clearable style="width: 120px" class="filter-item" v-model="filter2.type">
                <el-option v-for="item in hospitalAssessmentConst.keyWordList" :label="item.label" :value="item.value" :key="item.value"></el-option>
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
          :theadList="hospitalAssessmentConst.theadList2"
          :operationButtons="hospitalAssessmentConst.operationButtons2"
          @operationEvent0='operationEvent2_0'
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
  import { hospitalAssessmentConst } from '@/yimiviews/patientManage/columnsConst'
  import { pageList } from '@/api/patientManage/hospitalAssessment'
  export default {
    components: { complexTable },
    data() {
      return {
        hospitalAssessmentConst,
        tableList1: [],
        tableList2: [],
        totalList1: 0,
        totalList2: 0,
        filter: {
          keyWord: '',
          status: null,
          type: null,
          isHistory: 0
        },
        filter2: {
          keyWord: '',
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
      // 出院评估
      operationEvent1_0(row) {
        this.$router.push('/hospitalAssessment/leaveEvaluation/' + row.id)
      },
      // 评估详情
      operationEvent2_0(row) {
        this.$router.push('/hospitalAssessment/assessDetail/' + row.id)
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