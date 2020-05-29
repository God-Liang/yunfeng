<template>
  <div class="wrap">
    <el-tabs v-model="activePanel" type="card" @tab-click="handleClick" class='tabPanel'>
      <el-tab-pane label="待处理预约" name="await">
        <div class="app-button-container">
          <router-link to="/appointmentConfirm/registerAppointment/-1">
            <el-button type="primary">预约登记</el-button>
          </router-link>
        </div>
        <div class="filter-container">
          <div class='filterBox'>
            <div class='leftPart filterPart'>
              <el-checkbox class="filter-item" style="margin-left:15px;" @change="handleFilter"
                true-label="1" false-label="0" v-model="filter.isToday">今日预约
              </el-checkbox>
            </div>
            <div class='rightPart filterPart'>
              <el-select style="width: 120px" class="filter-item" clearable v-model="filter.status" placeholder="处理状态">
                <el-option v-for="item in appointmentRegistrationConst.statusList" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
              <el-select clearable style="width: 120px" class="filter-item" v-model="filter.type">
                <el-option v-for="item in appointmentRegistrationConst.keyWordList" :label="item.label" :value="item.value" :key="item.value"></el-option>
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
          columnsLabel="序号"
          :list="tableList1"
          :totalList="totalList1"
          :theadList="appointmentRegistrationConst.theadList1"
          :operationButtons="appointmentRegistrationConst.operationButtons1"
          :moreHasOperate="true"
          :hasOperate="false"
          fixation="100"
          statusName="appointmentStatus"
          @initListQuery="initListQuery"
          @getListByPagination="getListByPagination"
          @operationEvent0="operationEvent1_0"
          @operationEvent1="operationEvent1_1"
          @operationEvent2="operationEvent1_2">
        </complex-table>
      </el-tab-pane>

      <el-tab-pane label="历史预约" name="history">
        <div class="filter-container">
          <div class='filterBox'>
            <div class='leftPart filterPart'></div>
            <div class='rightPart filterPart'>
              <span style="font-size: 14px;color:#333;">申请时间：</span>
              <el-date-picker
                v-model="filter2.startTime"
                type="date"
                style="width: 150px;"
                class="filter-item"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
                :picker-options="startDatePicker"
              ></el-date-picker>
              <span class="timeStriping filter-item">—</span>
              <el-date-picker
                style="width: 150px;"
                v-model="filter2.endTime"
                class="filter-item"
                type="date"
                value-format="yyyy-MM-dd"
                :picker-options="endDatePicker"
                placeholder="选择日期"
              ></el-date-picker>

              <el-select clearable style="width: 120px" class="filter-item" v-model="filter2.type">
                <el-option v-for="item in appointmentRegistrationConst.keyWordList1" :label="item.label" :value="item.value" :key="item.value"></el-option>
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
          :theadList="appointmentRegistrationConst.theadList2"
          :hasOperate="false"
          @initListQuery="initListQuery"
          @getListByPagination="getListByPagination2">
          <!--:operationButtons="appointmentRegistrationConst.operationButtons2"-->
          <!--@operationEvent0="operationEvent2_0"-->
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
  import { appointmentRegistrationConst } from '@/yimiviews/appointmentManage/columnsConst'
  import { pageList, cancel } from '@/api/appointmentManage/appointmentRegistration'
  import DictSelect from '@/views/form/dictSelect'
  import { getPermission } from '@/api/common/common'
  export default {
    components: { DictSelect, complexTable },
    data() {
      return {
        appointmentRegistrationConst,
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
          startTime: '',
          endTime: '',
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
      // 预约登记
      operationEvent1_0(row) {
        this.$router.push('/appointmentConfirm/registerAppointment/' + row.id)
      },
      // 门诊登记
      operationEvent1_1(row) {
        this.$router.push('/appointmentConfirm/registerAppointment/' + row.id)
      },
      // 审核
      operationEvent1_2(row) {
        const query = {
          appointId: row.appointId,
          status: row.appointmentStatus
        }
        getPermission(query).then(res => {
          if (res.data.code === 200) {
            this.$router.push('/appointmentConfirm/registerAppointment/' + row.id)
          }
        })
      },
      // 重新预约
      operationEvent2_0(row) {
        this.$router.push('/appointmentConfirm/againAppointment/' + row.id)
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
      // 退出日间
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
    directives: {
      waves
    }
  }
</script>
<style lang="scss" scoped>
  .wrap {
    .tabPanel {
      height: 100%;
      background-color: #fff;
      padding-top: 10px;
      overflow: auto;
    }
    .filterBox {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .filterPart {
        line-height: 2;
      }
    }
    .dialogLeftTop1_2 {
      .el-select {
        display: block;
      }
      textarea {
        resize: none;
        height: 72px;
      }
    }
  }
</style>
<style lang="scss">
.tabPanel {
  .el-tabs__header {
    padding-left: 20px;
  }
}
</style>
