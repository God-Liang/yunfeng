<template>
  <div class="wrap">
    <el-tabs v-model="activePanel" type="card" @tab-click="handleClick" class='tabPanel'>
      <el-tab-pane label="待确认" name="await">
        <div class="filter-container">
          <div class='filterBox'>
            <div class='leftPart filterPart'>
            </div>
            <div class='rightPart filterPart'>
              <el-date-picker
                v-model="filter.optDate"
                class="filter-item"
                type="date"
                placeholder="选择手术时间"
                style="width:150px;"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
              <el-select v-model="filter.optRoomId" filterable clearable class="filter-item" placeholder="请选择手术室" style='width: 150px'>
                <el-option v-for='item in operationRoomList' :label="item.name" :value="item.id" :key='item.id'></el-option>
              </el-select>
              <el-input
                style="width: 220px;"
                class="filter-item"
                placeholder="请输入患者姓名"
                v-model="filter.patientName"
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
          :theadList="surgeryConfirmConst.theadList1"
          :operationButtons="surgeryConfirmConst.operationButtons"
          @initListQuery="initListQuery"
          :moreHasOperate="true"
          :hasOperate="false"
          fixation="100"
          columnsLabel="序号"
          statusName="appointmentStatus"
          @getListByPagination="getListByPagination"
          @operationEvent0='operationEvent0'>
        </complex-table>
      </el-tab-pane>

      <el-tab-pane label="历史确认" name="history">
        <div class="filter-container">
          <div class='filterBox'>
            <div class='leftPart filterPart'></div>
            <div class='rightPart filterPart'>
              <el-date-picker
                v-model="filter2.optDate"
                class="filter-item"
                type="date"
                placeholder="选择手术时间"
                style="width:150px;"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
              <el-select v-model="filter2.optRoomId" filterable clearable class="filter-item" placeholder="请选择手术室" style='width: 150px'>
                <el-option v-for='item in operationRoomList' :label="item.name" :value="item.id" :key='item.id'></el-option>
              </el-select>
              <el-input
                style="width: 220px;"
                class="filter-item"
                placeholder="请输入患者姓名"
                v-model="filter2.patientName"
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
          :theadList="surgeryConfirmConst.theadList2"
          :hasOperate="false"
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
  import { surgeryConfirmConst } from '@/yimiviews/appointmentManage/columnsConst'
  import { pageList, update } from '@/api/appointmentManage/surgeryConfirm'
  import { pending } from '@/api/appointmentManage/appointmentRegistration'
  import DictSelect from '@/views/form/dictSelect'

  export default {
    components: { DictSelect, complexTable },
    data() {
      return {
        surgeryConfirmConst,
        tableList1: [],
        tableList2: [],
        totalList1: 0,
        totalList2: 0,
        filter: {
          optDate: '',
          patientName: '',
          optRoomId: null,
          isHistory: 0
        },
        filter2: {
          optDate: '',
          patientName: '',
          optRoomId: null,
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
        operationRoomList: []
      }
    },
    mounted() {
      this.getPend()
      this.handleFilter()
      this.handleFilter2()
    },
    methods: {
      initListQuery(listQuery) {
        this.listQuery = listQuery
        this.listQuery2 = listQuery
      },
      // 手术确认
      operationEvent0(row) {
        this.$confirm('手术是否确认?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const data = {
            id: row.id,
            appointmentStatus: 8,
            appointId: row.appointId
          }
          update(data).then(res => {
            if (res.data.code === 200) {
              this.$message({
                message: '手术确定成功',
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
      // 待确认
      handleFilter() {
        const query = Object.assign({}, this.listQuery, this.filter)
        pageList(query).then(res => {
          if (res.data.code === 200) {
            this.tableList1 = res.data.list
            this.totalList1 = parseInt(res.data.total)
          }
        })
      },
      // 历史确认
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
      handleClick(tab, event) {},
      // 手术室列表
      getPend() {
        pending({ optRoomType: null, keywords: '', page: 1, limit: 10 }).then((res) => {
          if (res.data.code === 200) {
            this.loading = false
            this.operationRoomList = res.data.list
          }
        })
      }
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
