<template>
  <div class="wrap">
    <el-tabs v-model="activePanel" type="card" @tab-click="handleClick" class='tabPanel'>
      <el-tab-pane label="待处理预约" name="await">
        <div class="filter-container">
          <div class='filterBox'>
            <div class='leftPart filterPart'>
              <el-checkbox class="filter-item" style="margin-left:15px;" @change="handleFilter" 
                true-label="1" false-label="0" v-model="filter.isToday">今日预约
              </el-checkbox>
            </div>
            <div class='rightPart filterPart'>
              <el-select style="width: 120px" clearable class="filter-item" v-model="filter.status" placeholder="处理状态">
                <el-option v-for="item in appointmentConfirmConst.statusList" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
              <el-select clearable style="width: 120px" class="filter-item" v-model="filter.type">
                <el-option v-for="item in appointmentConfirmConst.keyWordList" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
              <el-input style="width: 220px;" class="filter-item" placeholder="请输入搜索条件" v-model="filter.keyWord">
              </el-input>
              <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索
              </el-button>
            </div>
          </div>
        </div>
        <complex-table
          :columnsType='"index"'
          :list="tableList1"
          :totalList="totalList1"
          :theadList="appointmentConfirmConst.theadList1"
          :operationButtons="appointmentConfirmConst.operationButtons1"
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

      <el-tab-pane label="历史预约" name="history">
        <div class="filter-container">
          <div class='filterBox'>
            <div class='leftPart filterPart'></div>
            <div class='rightPart filterPart'>
              <el-select clearable style="width: 120px" class="filter-item" v-model="filter2.type">
                <el-option v-for="item in appointmentConfirmConst.keyWordList" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
              <el-input style="width: 220px;" class="filter-item" placeholder="请输入搜索条件" v-model="filter2.keyWord">
              </el-input>
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
          :theadList="appointmentConfirmConst.theadList2"
          :hasOperate="false"
          statusName="appointmentStatus"
          @initListQuery="initListQuery"
          @getListByPagination="getListByPagination2">
        </complex-table>
      </el-tab-pane>

      <el-dialog title="退出日间" :visible.sync="dialogLeftTop1_2" class='dialogLeftTop1_2'>
        <el-form ref="formLeftTop2" :model="formLeftTop2" label-width="80px">
          <el-form-item label="类型">
            <dict-select v-model="formLeftTop2.typeId" placeholder="请选择取消类型" dict-code="exit_doms_type">
            </dict-select>
          </el-form-item>
          <el-form-item label="取消原因">
            <dict-select v-model="formLeftTop2.reasonId" placeholder="请选择取消原因" dict-code="exit_doms_reason" parent-code="exit_doms_type" :parent-value="formLeftTop2.typeId">
            </dict-select>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="formLeftTop2.memo"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogLeftTop1_2=false">取 消</el-button>
          <el-button type="primary" @click="cancelAppoint">确 定</el-button>
        </div>
      </el-dialog>

    </el-tabs>
  </div>
</template>
<script>
  import complexTable from '@/views/table/complexTable'
  import waves from '@/directive/waves/index.js'
  import { appointmentConfirmConst } from '@/yimiviews/appointmentManage/columnsConst'
  import { pageList, cancel } from '@/api/appointmentManage/appointmentConfirm'
  import DictSelect from '@/views/form/dictSelect'
  import { getPermission } from '@/api/common/common'
  export default {
    components: { DictSelect, complexTable },
    data() {
      return {
        appointmentConfirmConst,
        tableList1: [],
        tableList2: [],
        totalList1: 0,
        totalList2: 0,
        filter: {
          keyWord: '',
          status: null,
          type: null,
          isToday: '1',
          isHistory: 0
        },
        filter2: {
          keyWord: '',
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
      // 预约处理
      operationEvent1_0(row) {
        this.$router.push('/appointmentConfirm/appointmentDeal/' + row.id)
      },
      // 处理审核
      operationEvent1_1(row) {
        const query = {
          appointId: row.appointId,
          status: row.appointmentStatus
        }
        getPermission(query).then(res => {
          if (res.data.code === 200) {
            this.$router.push('/appointmentConfirm/appointmentDeal/' + row.id)
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
      cancelAppoint() {
        cancel(this.formLeftTop2).then((res) => {
          if (res.data.code === 200) {
            this.$message({
              message: '取消成功！',
              type: 'success',
              duration: 2000
            })
            this.dialogLeftTop1_2 = false
            if (this.tableList1.length === 1) {
              this.filter.page = (this.filter.page - 1 <= 0 ? 1 : this.filter.page - 1)
            }
            this.handleFilter()
            this.handleFilter2()
          } else {
            this.$message({
              message: '取消失败！',
              type: 'error',
              duration: 2000
            })
          }
        })
      }
    },
    directives: {
      waves
    }
  }
</script>
<style lang="scss">
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
