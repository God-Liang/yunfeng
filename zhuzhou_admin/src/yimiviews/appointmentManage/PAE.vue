<template>
  <div class="wrap">
    <el-tabs v-model="activePanel" type="card" @tab-click="handleClick" class="tabPanel">
      <el-tab-pane label="待宣教" name="await">
        <div class="filter-container">
          <div class="filterBox">
            <div class="leftPart filterPart"></div>
            <div class="rightPart filterPart">
              <el-select clearable style="width: 120px" class="filter-item" v-model="filter.type">
                <el-option v-for="item in PAEConst.keyWordList" :label="item.label" :value="item.value" :key="item.value"></el-option>
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
          :columnsType="'index'"
          columnsLabel="序号"
          :list="tableList1"
          :totalList="totalList1"
          :theadList="PAEConst.theadList1"
          :operationButtons="PAEConst.operationButtons1"
          @operationEvent0="operationEvent0"
          @operationEvent1="operationEvent1"
          @initListQuery="initListQuery"
          @getListByPagination="getListByPagination"
        ></complex-table>
      </el-tab-pane>

      <el-tab-pane label="已宣教" name="completed">
        <div class="filter-container">
          <div class="filterBox">
            <div class="leftPart filterPart"></div>
            <div class="rightPart filterPart">
              <el-select clearable style="width: 120px" class="filter-item" v-model="filter2.type">
                <el-option v-for="item in PAEConst.keyWordList" :label="item.label" :value="item.value" :key="item.value"></el-option>
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
          :columnsType="'index'"
          columnsLabel="序号"
          :list="tableList2"
          :totalList="totalList2"
          :theadList="PAEConst.theadList1"
          :operationButtons="PAEConst.operationButtons2"
          @operationEvent2="operationEvent2"
          @initListQuery="initListQuery"
          @getListByPagination="getListByPagination2"
        ></complex-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import complexTable from '@/views/table/complexTable'
import waves from '@/directive/waves/index.js'
import { PAEConst } from '@/yimiviews/appointmentManage/columnsConst'
import { pageList } from '@/api/appointmentManage/pae'
export default {
  components: { complexTable },
  data() {
    return {
      PAEConst,
      tableList1: [],
      tableList2: [],
      totalList1: 0,
      totalList2: 0,
      filter: {
        keyWord: '',
        type: null,
        isHistory: 0
      },
      filter2: {
        keyWord: '',
        type: null,
        isHistory: 1 // 已宣教
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
    operationEvent0(row) {
      this.$router.push('/PAE/editPAE/' + row.id)
    },
    operationEvent1(row) {
      this.$router.push('/PAE/startPAE/' + row.id)
    },
    operationEvent2(row) {
      this.$router.push('/PAE/PAEDeal/' + row.id)
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
    handleClick(tab, event) {}
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
