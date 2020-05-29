<template>
  <div class='wrap'>
    <div class="wrapBox">
      
      <!-- <div class="app-button-container">
          <el-button type="primary" @click="add('新增随访计划')">新增随访计划</el-button>
      </div> -->

      <div class="filter-container">
        <div class= 'filterBox'>
          <div class='leftPart filterPart'>
            <el-radio-group v-model="filter.status" size="medium" @change="chkChange">
              <el-radio-button label="0"> 全部</el-radio-button>
              <el-radio-button label="1">进行中</el-radio-button>
              <el-radio-button label="2">已完成</el-radio-button>
            </el-radio-group>
          </div>
          <div class='rightPart filterPart'>
            <!-- <el-select clearable style="width: 120px" class="filter-item" v-model="filter.type" placeholder="请选择手术名称">
              <el-option
                v-for="item in operationList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select> -->
            <el-input style="width: 220px;" class="filter-item" placeholder="输入随访计划名称" v-model="filter.keyword">
            </el-input>
            <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
          </div>
        </div>
      </div>
      <followup-table
        ref = 'followupTable'
        :hasSelection= false
        :list = 'tableList1'
        :total = 'totalList1'
        :theadList = "theadList1"
        :operationButtons = 'operationButtons1'
        @getListByPagination = 'getTableList1'
        @operationEvent0 = 'operationEvent0'
        @operationEvent1 = 'operationEvent1'
        @operationEvent2 = 'operationEvent2' >
      </followup-table>

    </div>
      <el-dialog :title="addFormTitle" :visible.sync="dialogLeftTop1_1" class='dialogLeftTop1_1'>
        <el-form :model="addForm" ref='addForm' :show-message= true :rules="addForm_rules" :inline="true" :label-width="formLabelWidth">
          <el-form-item label=" 表单名" prop = 'name'>
            <el-input v-model="addForm.name" auto-complete="off" placeholder="请输入" style='width: 196px;'></el-input>
          </el-form-item>
          
          <el-form-item label="医院" prop = 'hospitalId'>
            <el-select v-model="addForm.hospitalId" placeholder="请选择" style = 'width: 196px'>
              <el-option label="术后表" value="1"></el-option>
              <el-option label="术前表" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="表单类型" prop = 'type'>
            <el-select v-model="addForm.type" placeholder="请选择" style = 'width: 196px'>
              <el-option label="术后表" value="1"></el-option>
              <el-option label="术前表" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="功能类型" prop = 'functionType'>
            <el-select v-model="addForm.functionType" placeholder="请选择" style = 'width: 196px'>
              <el-option label="功能1" value="1"></el-option>
              <el-option label="功能2" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开头语" prop = 'headContent'>
            <el-input type = 'textarea' v-model="addForm.headContent" auto-complete="off" placeholder="请输入" style='width: 500px;' ></el-input>
          </el-form-item>
          <el-form-item label="结束语" prop = 'footContent'>
            <el-input type = 'textarea' v-model="addForm.footContent" auto-complete="off" placeholder="请输入" style='width: 500px;' ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogLeftTop1_1 = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>
        </div>
      </el-dialog>
 </div>
</template>
<script>
  import followupTable from '@/yimiviews/followupManage/followupTable'
  import waves from '@/directive/waves/index.js'
  import { theadList1, operationButtons1, addForm_rules } from '@/yimiviews/followupManage/followupConst.js'
  import { pending } from '@/api/knowledgeManage/operationDirectory'
  import { addForm, suspendForm, getPlanList } from '@/api/followupManage'
  export default {
    components: { followupTable },
    data() {
      return {
        theadList1,
        operationButtons1,
        addForm_rules,
        tableList1: [],
        totalList1: 0,
        listQuery: {
          page: 1,
          limit: 5
        },
        filter: {
          // type: '',
          keyword: '',
          status: '0'
        },
        activePanel: 'pending',
        dialogLeftTop1_1: false,
        addFormTitle: '新建随访计划',
        addForm: {
          name: '',
          hospitalId: '',
          type: '',
          functionType: '',
          headContent: '',
          footContent: ''
        },
        addForm_doctorList: [],
        addForm_surgeryList: [],
        formLabelWidth: '120px',
        filterContainer: {},
        selectArr: [],
        operationList: []
      }
    },
    mounted() {
      this.getTableList1(this.listQuery)
      this.getOperationList()
    },
    methods: {
      add(title) {
        this.addFormTitle = title
        this.dialogLeftTop1_1 = true
      },
      operationEvent0(row) {
        this.$router.push('/followup/followupDetail/' + row.id)
      },
      operationEvent1(row) {
        this.add('编辑随访计划')
      },
      operationEvent2(row) {
        this.$confirm('您确定要删除此表单吗？', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            suspendForm(row.id).then(() => {
              this.$message({
                message: '恭喜你，表单删除成功！',
                type: 'success',
                duration: 2000
              })
            })
            if (this.tableList1.length === 1) {
              this.filter.page = (this.filter.page - 1 <= 0 ? 1 : this.filter.page - 1)
            }
            this.getTableList1(this.filter)
          })
          .catch(action => {
            this.$message({
              type: 'info',
              message: '放弃删除'
            })
          })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dialogLeftTop1_1 = false
            addForm(this.addForm).then(() => {
              this.$message({
                message: '恭喜你，新建表单成功！',
                type: 'success',
                duration: 2000
              })
              this.$refs[formName].resetFields()
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      handleFilter() {
        this.$refs.followupTable.resetPage()
        this.getTableList1(this.listQuery)
      },
      chkChange(value) {
        this.filter.status = value
        this.handleFilter()
      },
      handleClick(tab, event) {
      },
      getTableList1(listQuery) {
        const query = Object.assign({}, listQuery, this.filter)
        getPlanList(query).then((res) => {
          this.tableList1 = res.data.list
          this.totalList1 = res.data.total
        })
      },
      getOperationList() {
        const query = {
          page: 1,
          limit: 999999
        }
        pending(query).then(res => {
          if (res.data.code === 200) {
            this.operationList = res.data.list
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
.wrapBox{
        height: 100%;
        background-color: #fff;
        overflow: auto;
  .tabPanel{
    padding-top: 10px;
    .el-tabs__header{
      padding-left: 20px;
    }
  }
  .filterBox{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .filterPart{
      line-height: 2;
    }
  }
  .dialogLeftTop1_1{
    .el-date-editor{
        width:190px;
      }
  }
  .dialogLeftTop1_2{
    .el-select{
      display: block;
    }
  }
  .dialogLeftTop1_3{
    .box-card{
      background: #eee;
    }
  }
}
</style>
