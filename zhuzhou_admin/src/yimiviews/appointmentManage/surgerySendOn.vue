<template>
  <div class="wrap">
    <el-tabs v-model="activePanel" type="card" @tab-click="handleClick" class='tabPanel'>
      <el-tab-pane label="待预送" name="await">
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
              <el-select v-model="filter.status" clearable class="filter-item" style="width:120px;" placeholder="状态">
                <el-option
                  v-for="item in surgerySendOnConst.statusList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-input
                style="width: 220px;"
                class="filter-item"
                placeholder="请输入患者姓名"
                v-model="filter.patientName"
              ></el-input>
              <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索
              </el-button>
              <el-button type="primary" @click="sortClick">手术室排序</el-button>
            </div>
          </div>
        </div>
        <complex-table
          :columnsType='"index"'
          :list="tableList1"
          :totalList="totalList1"
          :theadList="surgerySendOnConst.theadList1"
          :operationButtons="surgerySendOnConst.operationButtons"
          @initListQuery="initListQuery"
          :moreHasOperate="true"
          :hasOperate="false"
          fixation="100"
          columnsLabel="序号"
          statusName="appointmentStatus"
          @getListByPagination="getListByPagination"
          @operationEvent0='operationEvent1_0'
          @operationEvent1='operationEvent1_1'>
        </complex-table>
      </el-tab-pane>

      <el-tab-pane label="历史预送" name="history">
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
          :theadList="surgerySendOnConst.theadList2"
          :hasOperate="false"
          statusName="checkedStatus"
          :statusArr="surgerySendOnConst.statusArr1"
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
  import { surgerySendOnConst } from '@/yimiviews/appointmentManage/columnsConst'
  import { pageList, update } from '@/api/appointmentManage/surgerySendOn'
  import { pending } from '@/api/appointmentManage/appointmentRegistration'
  import { getPermission } from '@/api/common/common'
  import DictSelect from '@/views/form/dictSelect'
  import { parseTime } from '@/utils/index'

  export default {
    components: { DictSelect, complexTable },
    data() {
      return {
        surgerySendOnConst,
        tableList1: [],
        tableList2: [],
        totalList1: 0,
        totalList2: 0,
        filter: {
          optDate: '',
          status: null,
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
      // 手术排序
      sortClick() {
        this.$router.push('/surgerySendOn/operationSequencing')
      },
      initListQuery(listQuery) {
        this.listQuery = listQuery
        this.listQuery2 = listQuery
      },
      operationEvent1_0(row) {
        const tomDate = new Date()
        tomDate.setDate(tomDate.getDate() + 1)
        // alert('明天是：' + parseTime(tomDate))
        if (parseTime(row.schedule) > parseTime(tomDate)) {
          this.$message({
            message: '只能提交今天和明天的手术！',
            type: 'warning'
          })
          return
        } else if (parseTime(row.schedule) < parseTime(new Date())) {
          this.$message({
            message: '手术时间已过，不可提交！',
            type: 'warning'
          })
          return
        }
        this.$confirm('手术预送是否确认?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const data = {
            id: row.id,
            appointmentStatus: 6,
            appointId: row.appointId
          }
          update(data).then(res => {
            if (res.data.code === 200) {
              this.$message({
                message: '提交成功',
                type: 'success'
              })
              this.handleFilter()
              this.handleFilter2()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消提交'
          })
        })
      },
      // 预送审核
      operationEvent1_1(row) {
        const query = {
          appointId: row.appointId,
          status: row.appointmentStatus
        }
        getPermission(query).then(res => {
          if (res.data.code === 200) {
            this.$confirm('手术预送审核是否确认?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              const data = {
                id: row.id,
                appointmentStatus: 7,
                appointId: row.appointId
              }
              update(data).then(res => {
                if (res.data.code === 200) {
                  this.$message({
                    message: '审核成功',
                    type: 'success'
                  })
                  this.handleFilter()
                }
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消审核'
              })
            })
          }
        })
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
            this.tableList2.forEach(v => {
              if (v.appointmentStatus < 8) {
                v.checkedStatus = 0
              } else {
                v.checkedStatus = 1
              }
            })
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
