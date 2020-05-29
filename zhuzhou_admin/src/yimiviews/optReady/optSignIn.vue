<template>
  <div class="wrap">
    <el-tabs v-model="activePanel" type="card" @tab-click="handleClick" class='tabPanel'>
      <el-tab-pane label="待报到" name="await">
        <div class="filter-container">
          <div class='filterBox'>
            <div class='leftPart filterPart'>
              <el-checkbox
                class="filter-item"
                style="margin-left:15px;"
                @change="handleFilter"
                true-label="1"
                false-label="0"
                v-model="filter.isToday"
              >今日手术</el-checkbox>
            </div>
            <div class='rightPart filterPart'>
              <el-select clearable style="width: 120px" class="filter-item" v-model="filter.type">
                <el-option v-for="item in optSignInConst.keyWordList" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
              <el-input
                style="width: 220px;"
                class="filter-item"
                placeholder="请输入查询内容"
                v-model="filter.keyWord"
              ></el-input>
              <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索
              </el-button>
            </div>
          </div>
        </div>
        <complex-table
          :columnsType='"index"'
          :list="tableList1"
          :totalList="totalList1"
          :theadList="optSignInConst.theadList1"
          :operationButtons="optSignInConst.operationButtons"
          @initListQuery="initListQuery"
          :moreHasOperate="true"
          :hasOperate="false"
          fixation="100"
          columnsLabel="序号"
          statusName="appointmentStatus"
          @getListByPagination="getListByPagination"
          @operationEvent0='operationEvent1_0'>
        </complex-table>
      </el-tab-pane>

      <el-tab-pane label="历史报到" name="history">
        <div class="filter-container">
          <div class='filterBox'>
            <div class='leftPart filterPart'></div>
            <div class='rightPart filterPart'>
              <el-select clearable style="width: 120px" class="filter-item" v-model="filter2.type">
                <el-option v-for="item in optSignInConst.keyWordList" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
              <el-input
                style="width: 220px;"
                class="filter-item"
                placeholder="请输入查询内容"
                v-model="filter2.keyWord"
              ></el-input>
              <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter2">搜索
              </el-button>
            </div>
          </div>
        </div>
        <complex-table
          columnsLabel="序号"
          :columnsType='"index"'
          :list="tableList2"
          :totalList="totalList2"
          :theadList="optSignInConst.theadList2"
          :hasOperate="false"
          :moreHasOperate="false"
          statusName="appointmentStatus"
          @initListQuery="initListQuery"
          @getListByPagination="getListByPagination2">
        </complex-table>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>
<script>
  import complexTable from '@/views/table/complexTable'
  import waves from '@/directive/waves/index.js'
  import { optSignInConst } from '@/yimiviews/optReady/columnsConst'
  import { pageList, update } from '@/api/optReady/optSignIn'
  import DictSelect from '@/views/form/dictSelect'

  export default {
    components: { DictSelect, complexTable },
    data() {
      return {
        optSignInConst,
        tableList1: [],
        tableList2: [],
        totalList1: 0,
        totalList2: 0,
        filter: {
          keyWord: '',
          isToday: '1',
          type: null,
          isHistory: 0 // 待报到
        },
        filter2: {
          keyWord: '',
          type: null,
          isHistory: 1 // 历史报到
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
      // 报到
      operationEvent1_0(row) {
        this.$confirm('手术报到是否确认?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const data = {
            id: row.id,
            appointId: row.appointId
          }
          update(data).then(res => {
            if (res.data.code === 200) {
              this.$message({
                message: '确定成功',
                type: 'success'
              })
              this.handleFilter()
              this.handleFilter2()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消手术确认'
          })
        })
      },
      // 待报到
      handleFilter() {
        const query = Object.assign({}, this.listQuery, this.filter)
        pageList(query).then(res => {
          if (res.data.code === 200) {
            this.tableList1 = res.data.list
            this.totalList1 = parseInt(res.data.total)
          }
        })
      },
      // 历史报到
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
      handleClick(tab, event) {}
    },
    directives: {
      waves
    }
  }
</script>
<style lang="scss" scope>
  .wrap {
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
    .dialogLeftTop1_1 {
      .el-dialog {
        overflow: auto;
      }
      .el-dialog__header {
        border-bottom: 1px solid #ddd;
      }
      .el-date-editor {
        width: 190px;
      }
    }
    .dialogLeftTop1_2 {
      .el-select {
        display: block;
      }
    }
    .dialogLeftTop1_3 {
      .box-card {
        background: #eee;
      }
      .el-dialog__header {
        border-bottom: 1px solid #ddd;
      }
      .el-dialog {
        margin-top: 10vh !important;
        overflow: auto;
      }
    }
  }
</style>
