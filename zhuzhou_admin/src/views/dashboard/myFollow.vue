<template>
  <div class="wrap">
    <div class="scrollWrap" style="background: #fff; height: 100%;">
      <div class="filter-container">
        <div class="filterBox">
          <div class="leftPart filterPart">
            <el-date-picker
              style="width:180px;"
              v-model="filter.startDate"
              type="date"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期"
              :picker-options="startDatePicker"
              @change="dateChangeBeginTime"
            ></el-date-picker>
            <span>—</span>
            <el-date-picker
              style="width:180px;"
              v-model="filter.endDate"
              type="date"
              value-format="yyyy-MM-dd HH:mm:ss"
              :picker-options="endDatePicker"
              placeholder="选择日期"
            ></el-date-picker>
            <el-select
              clearable
              style="width: 140px"
              class="filter-item"
              placeholder="随访状态"
              v-model="filter.followupType"
            >
              <el-option
                v-for="item in followupTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-input placeholder="请输入内容" style="width:400px;" v-model="filter.keywords" class="input-with-select">
              <el-select v-model="filter.searchType" style="width:132px;" slot="prepend" placeholder="过滤条件">
                <el-option label="患者姓名" value= 0></el-option>
                <el-option label="手机号后四位" value= 1></el-option>
                <el-option label="就诊卡号" value= 2></el-option>
              </el-select>
            </el-input>
            <el-button
              class="filter-item"
              type="primary"
              v-waves
              icon="el-icon-search"
              @click="searchBtn"
            >搜索</el-button>
          </div>
          <div class="rightPart filterPart">
          </div>
        </div>
      </div>
      <complex-table
        columnsType='index'
        :list="tableList1"
        :totalList="totalList1"
        :theadList="myFollowConst.theadList1"
        :operationButtons="myFollowConst.operationButtons1"
        :hasOperate="false"
        :moreHasOperate="true"
        fixation="200"
        statusName="followupStatus"
        @getSelectArr="getSelectArr"
        @getListByPagination="getListByPagination"
        @operationEvent0="operationEvent0"
        @operationEvent1="operationEvent1"
        @operationEvent2="operationEvent2"
      ></complex-table>
    </div>
  </div>
</template>
<script>
import complexTable from '@/views/table/complexTable'
import waves from '@/directive/waves/index.js'
import * as myFollowConst from './myFollowConst.js'
import { getMyFollowup } from '@/api/myhome'
import { cancelFollowup } from '@/api/followupManage'
export default {
  components: { complexTable },
  data() {
    return {
      myFollowConst,
      dateArr: [],
      filter: {
        followupType: null,
        searchType: null,
        keywords: '',
        startDate: null,
        endDate: null
      },
      listQuery: {
        page: 1,
        limit: 10
      },
      activePanel: 'pending',
      dialogLeftTop1_1: false,
      dialogLeftTop1_2: false,
      dialogLeftTop1_3: false,
      formLabelWidth: '120px',
      filterContainer: {},
      tableList1: [],
      totalList1: 0,
      selectArr: [],
      startDatePicker: this.beginDate(),
      endDatePicker: this.processDate(),
      followupTypeList: [
        {
          label: '待随访',
          value: 0
        },
        {
          label: '已随访',
          value: 1
        }
      ]
    }
  },
  mounted() {
    this.handleFilter()
  },
  methods: {
    operationEvent0(row) {
      this.$router.push('/follow/follow/' + row.id)
    },
    // 取消随访
    operationEvent1(row) {
      if (row.followupStatus !== 0) {
        this.$message({
          type: 'warning',
          message: '不可取消!'
        })
      } else {
        this.$confirm('此操作将永久删除该条信息, 是否继续?', '提示', {
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
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    operationEvent2(row) {
      this.$router.push('/follow/followDetails/' + row.id)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message({
            message: '恭喜你，预约成功！',
            type: 'success',
            duration: 2000
          })
          this.$refs[formName].resetFields()
          this.dialogLeftTop1_1 = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    searchBtn() {
      this.listQuery.page = 1
      this.handleFilter()
    },
    getListByPagination(listQuery) {
      this.listQuery = listQuery
      this.handleFilter()
    },
    handleFilter() {
      const query = Object.assign({}, this.listQuery, this.filter)
      getMyFollowup(query).then(res => {
        this.tableList1 = res.data.list
        this.totalList1 = parseInt(res.data.total)
      })
    },
    dateChangeBeginTime(val) {
      const self = this
      self.startDate = val
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
    getSelectArr(selectArr) {
      this.selectArr = selectArr
    },
    beginDate() {
      const _this = this
      return {
        disabledDate(time) {
          if (_this.filter.endDate) {
            return new Date(_this.filter.endDate).getTime() < time.getTime()
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
          if (_this.filter.startDate) {
            return new Date(_this.filter.startDate).getTime() > time.getTime()
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
<style lang="scss">
.wrap {
  .scrollWrap {
    height: 100%;
    overflow: auto;
    background-color: #fff;
    padding-top: 10px;
    .el-tabs__header {
      padding-left: 20px;
    }
  }
  .filterBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
.el-range-editor--medium .el-range-separator {
  padding: 0 !important;
}
</style>
