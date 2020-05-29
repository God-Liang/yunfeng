<template>
  <div class='wrap'>
    <div class="followupWrap">
      <div class="filter-container">
        <div class='filterBox'>
          <div class='leftPart filterPart'>
          </div>
          <div class='rightPart filterPart'>
            <el-select clearable style="width: 120px" class="filter-item" v-model="filter.type">
              <el-option label="患者姓名" value="0"></el-option>
              <el-option label="手机后四位" value="1"></el-option>
              <el-option label="就诊卡号" value="2"></el-option>
            </el-select>
            <el-input style="width: 220px;" class="filter-item" placeholder="请输入搜索条件" v-model="filter.keyWord">
            </el-input>
            <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索
            </el-button>
          </div>
        </div>
      </div>
      <el-tabs v-model="activePanel" type="card" @tab-click="handleClick" class='tabPanel' style='height: auto;'>
        <el-tab-pane label="患者名单" name="4">
          <complex-table
            :columnsType='"index"'
            :list='list'
            :totalList='total'
            :theadList="followupConst.theadList11"
            :hasOperate=false
            @initListQuery = 'initListQuery'
            @getListByPagination='getListByPagination'>
          </complex-table>
        </el-tab-pane>
        <el-tab-pane label="今日任务" name="5">
          <complex-table
            :columnsType='"index"'
            :hasFollowId=true
            :list='list'
            :totalList='total'
            :theadList="followupConst.theadList2"
            :operationButtons='followupConst.operationButtons2'
            @initListQuery = 'initListQuery'
            @getListByPagination='getListByPagination'
            @operationEvent0='operationEvent2_0'
            @operationEvent1='operationEvent0_1'>
          </complex-table>
        </el-tab-pane>
        <el-tab-pane label="待随访" name="0">
          <complex-table
            :columnsType='"index"'
            :hasFollowId=true
            :list='list'
            :totalList='total'
            :theadList="followupConst.theadList3"
            :operationButtons='followupConst.operationButtons3'
            @initListQuery = 'initListQuery'
            @getListByPagination='getListByPagination'
            @operationEvent0='operationEvent3_0'
            @operationEvent1='operationEvent0_1'>
          </complex-table>
        </el-tab-pane>
        <el-tab-pane label="已完成" name="1">
          <complex-table
            :columnsType='"index"'
            :hasFollowId=true
            :list='list'
            :totalList='total'
            :theadList="followupConst.theadList4"
            :hasOperate=false
            @initListQuery = 'initListQuery'
            @getListByPagination='getListByPagination'>
          </complex-table>
        </el-tab-pane>
        <el-tab-pane label="已过期" name="2">
          <complex-table
            :columnsType='"index"'
            :hasFollowId=true
            :list='list'
            :totalList='total'
            :theadList="followupConst.theadList5"
            :operationButtons='followupConst.operationButtons5'
            @initListQuery = 'initListQuery'
            @getListByPagination='getListByPagination'
            @operationEvent0='operationEvent5_0'
            @operationEvent1='operationEvent0_1'>
          </complex-table>
        </el-tab-pane>
        <el-tab-pane label="已取消" name="3">
          <complex-table
            :columnsType='"index"'
            :hasFollowId=true
            :list='list'
            :totalList='total'
            :theadList="followupConst.theadList6"
            :hasOperate=false
            @initListQuery = 'initListQuery'
            @getListByPagination='getListByPagination'>
          </complex-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
  import complexTable from '@/views/table/complexTable'

  import waves from '@/directive/waves/index.js'
  import * as followupConst from '@/yimiviews/followupManage/followupConst.js'
  import { getPatientList, cancelFollowup } from '@/api/followupManage'

  export default {
    components: { complexTable },
    data() {
      return {
        followupConst,
        filter: {
          keyWord: '',
          type: '',
          followType: '4',
          planId: 1,
          page: 1,
          limit: 10
        },
        status: 1,
        activePanel: '4',
        list: [],
        total: 0,
        formLabelWidth: '120px'
      }
    },
    mounted() {
      const id = this.$route.params.id
      this.filter.planId = id
      this.getTableList(this.filter, this.activePanel)
    },
    methods: {
      initListQuery(listQuery) {
        this.filter.limit = listQuery.limit
        this.filter.page = listQuery.page
      },
      operationEvent0_1(row) {
        this.$confirm('确定要取消此次随访吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          cancelFollowup({ id: row.id }).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.handleFilter()
          })
        })
      },
      operationEvent2_0(row) {
        this.$router.push('/follow/follow/' + row.id)
      },
      operationEvent3_0(row) {
        this.$router.push('/follow/follow/' + row.id)
      },
      operationEvent5_0(row) {
        this.$router.push('/follow/follow/' + row.id)
      },
      handleFilter() {
        this.getTableList(this.filter, this.activePanel)
      },
      todayAppointment() {
      },
      propagandaAndEducation() {
        if (!this.selectArr.length) {
          this.$message({
            message: '请先选择宣教对象！',
            type: 'warning'
          })
          return
        }
        this.dialogLeftTop1_2 = true
      },
      handleClick(tab, event) {
        this.activePanel = tab.paneName
        this.filter.followType = tab.paneName
        this.filter.page = 1
        this.filter.limit = 10
        this.getTableList(this.filter, this.activePanel)
      },
      getListByPagination(listQuery) {
        this.getTableList(listQuery, this.activePanel)
      },
      getTableList(listQuery, status) {
        this.filter.page = listQuery.page
        this.filter.limit = listQuery.limit
        getPatientList(this.filter).then((res) => {
          this.listLoading = false
          this.list = res.data.list
          this.total = res.data.total
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
    background-color: #f0f2f5;
    height: 100%;
    .followupWrap {
      background-color: #fff;
      height: 100%;
      overflow: auto;
    }
  }

  .tabPanel {
    padding-top: 10px;
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
</style>
