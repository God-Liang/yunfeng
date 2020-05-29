<template>
  <div class="wrap">
    <el-tabs v-model="activePanel" type="card" @tab-click="handleClick" class="tabPanel">
      <el-tab-pane label="待评估" name="await">
        <div class="filter-container">
          <div class="filterBox">
            <div class="leftPart filterPart"></div>
            <div class="rightPart filterPart">
              <el-select clearable style="width: 120px" class="filter-item" v-model="filter.type">
                <el-option v-for="item in anesthesiaConst.keyWordList" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
              <el-input
                style="width: 220px;"
                class="filter-item"
                placeholder="请输入搜索条件"
                v-model="filter.keyWord"
              ></el-input>
              <el-button
                class="filter-item"
                type="primary"
                v-waves
                icon="el-icon-search"
                @click="handleFilter"
              >搜索</el-button>
            </div>
          </div>
        </div>
        <complex-table
          :columnsType='"index"'
          columnsLabel="序号"
          :list="tableList1"
          :totalList="totalList1"
          :theadList="anesthesiaConst.theadList1"
          :operationButtons="anesthesiaConst.operationButtons1"
          @initListQuery="initListQuery"
          @operationEvent0="operationEvent0"
          @getListByPagination="getListByPagination"
        ></complex-table>
      </el-tab-pane>
      <el-tab-pane label="已评估" name="done">
        <div class="filter-container">
          <div class="filterBox">
            <div class="leftPart filterPart"></div>
            <div class="rightPart filterPart">
              <el-select clearable style="width: 120px" class="filter-item" v-model="filter2.type">
                <el-option v-for="item in anesthesiaConst.keyWordList" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
              <el-input
                style="width: 220px;"
                class="filter-item"
                placeholder="请输入搜索条件"
                v-model="filter2.keyWord"
              ></el-input>
              <el-button
                class="filter-item"
                type="primary"
                v-waves
                icon="el-icon-search"
                @click="handleFilter2"
              >搜索</el-button>
            </div>
          </div>
        </div>
        <complex-table
          :columnsType='"index"'
          columnsLabel="序号"
          :list="tableList2"
          :statusArr="anesthesiaConst.statusArr"
          :totalList="totalList2"
          :theadList="anesthesiaConst.theadList1"
          :operationButtons="anesthesiaConst.operationButtons2"
          @initListQuery="initListQuery"
          @operationEvent1="operationEvent1"
          @getListByPagination="getListByPagination2"
        ></complex-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import complexTable from '@/views/table/complexTable'
import waves from '@/directive/waves/index.js'
import { anesthesiaConst } from '@/yimiviews/optReady/columnsConst'
import { pageList } from '@/api/appointmentManage/anesthesia'
export default {
  components: { complexTable },
  data() {
    return {
      anesthesiaConst,
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
      activePanel: 'await',
      dialogLeftTop1_2: false,
      formLeftTop2: { // 退出日间原因表单
        typeId: '',
        reasonId: '',
        memo: '',
        appointId: 0
      }
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
    // 麻醉评估
    operationEvent0(row) {
      this.$router.push('/anesthesia/anesthesiaEvaluation/' + row.id)
    },
    // 评估详情
    operationEvent1(row) {
      this.$router.push('/anesthesia/evaluateDetail/' + row.id)
    },
    // 待处理预约
    handleFilter() {
      const query = Object.assign({}, this.listQuery, this.filter)
      pageList(query).then(res => {
        if (res.data.code === 200) {
          this.tableList1 = res.data.list
          this.totalList1 = parseInt(res.data.total)
        }
      })
    },
    // 历史预约
    handleFilter2() {
      const query = Object.assign({}, this.listQuery2, this.filter2)
      pageList(query).then(res => {
        if (res.data.code === 200) {
          this.tableList2 = res.data.list
          this.totalList2 = parseInt(res.data.total)
        }
      })
    },
    getListByPagination(listQuery) {
      this.listQuery = listQuery
      this.handleFilter()
    },
    getListByPagination2(listQuery) {
      this.listQuery2 = listQuery
      this.handleFilter2()
    },
    handleClick(tab, event) {
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
