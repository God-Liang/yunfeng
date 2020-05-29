<template>
  <div class="wrap">
    <div class="flexWrap">
      <div class="leftWrap">
        <div class="filter-container">
          <div class="filterBox">
            <div class="leftPart filterPart">
              <el-input
                style="width: 220px;"
                class="filter-item"
                placeholder="请输入搜索条件"
                v-model="filter.keywords"
              ></el-input>
              <el-button
                class="filter-item"
                type="primary"
                v-waves
                icon="el-icon-search"
                @click="getListBySearch1()"
              >搜索</el-button>
            </div>
            <div class="rightPart filterPart">
              <el-button type="primary" @click="dialogLeftTop1_1_show()">新增医疗组</el-button>
              <el-button type="primary" @click="dialogLeftTop1_2_show()">设置医疗组成员</el-button>
            </div>
          </div>
        </div>
        <complexTable
          ref="complexTable"
          :hasSelection="false"
          :list="tableList1"
          :theadList="medicalGroupConst.theadList1"
          :operationButtons="medicalGroupConst.operationButtons1"
          :statusArr="medicalGroupConst.statusArr"
          @operationEvent0="operationEvent1_0"
          @getListByPagination="getListByPagination"
          :totalList="totalList1"
        ></complexTable>
      </div>
      <div class="rightWrap">
        <category
          :data="filterData"
          :operationTage="true"
          @selectedType="selectedType"
          @searchKey="searchKey"
          @editClick="editClick"
          @deleteClick="deleteClick"
          :classLoading="classLoading"
        ></category>
      </div>
    </div>
    <el-dialog
      :title="dialogLeftTop1_1_title"
      :visible.sync="dialogLeftTop1_1"
      class="dialogLeftTop1_1"
    >
      <el-form
        ref="formLeftTop1"
        :rules="dictionariesRules"
        :model="formLeftTop1"
        label-width="100px"
      >
        <el-form-item label="医疗组名称" prop="name">
          <el-input v-model="formLeftTop1.name"></el-input>
        </el-form-item>
        <el-form-item label="医疗组描述" prop="description">
          <el-input type="textarea" rows="4" v-model="formLeftTop1.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogLeftTop1_1 = false">取 消</el-button>
        <el-button type="primary" @click="formLeftTop1_submit('formLeftTop1')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="医疗组成员设置" :visible.sync="dialogLeftTop1_2" class="dialogLeftTop1_2">
      <div class="filter-container">
        <div class="filterBox">
          <div class="leftPart filterPart"></div>
          <div class="rightPart filterPart">
            <el-input
              style="width: 220px;"
              class="filter-item"
              placeholder="请输入医生姓名"
              v-model="filter2.keywords"
            ></el-input>
            <el-button
              class="filter-item"
              type="primary"
              v-waves
              icon="el-icon-search"
              @click="getListBySearch2"
            >搜索</el-button>
          </div>
        </div>
      </div>
      <complex-table
        :list="tableList2"
        :totalList="totalList2"
        :theadList="medicalGroupConst.theadList1"
        :hasOperate="false"
        @getSelectArr="getSelectArr"
      ></complex-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogLeftTop1_2 = false">取 消</el-button>
        <el-button type="primary" @click="addMedicalGroupUser()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves/index.js'
import Tinymce from '@/components/Tinymce'
import complexTable from '@/views/table/complexTable'
import category from 'yimiviews/components/category'
import { medicalGroupConst } from '@/yimiviews/systemManage/columnsConst'
import { medicalCreate, medicalUpdate, medicalDelete, medicalRead, medicalGroupUserList, medicalGroupUnUserList, medicalGroupList, addMedicalGroupUser, delMedicalGroupUser } from '@/api/systemManage/medicalGroup'
const defaultForm = {
  id: '',
  name: '',
  description: ''
}
export default {
  directives: { waves },
  components: { category, complexTable, Tinymce },
  mounted() {
    this.initSelect()
  },
  data() {
    return {
      dialogLeftTop1_1: false,
      dialogLeftTop1_2: false,
      classLoading: true,
      medicalGroupConst,
      tableList1: [],
      totalList1: 0,
      listQuery1: {
        page: 1,
        limit: 10
      },
      filter: {
        id: '',
        keywords: ''
      },
      selectArr: [],
      tableList2: [],
      totalList2: 0,
      listQuery2: {
        page: 1,
        limit: 10
      },
      filter2: {
        keywords: ''
      },
      dialogLeftTop1_1_title: '',
      formLeftTop1: Object.assign({}, defaultForm),
      options: [],
      filterData: [],
      dictionariesRules: {
        name: { required: true, message: '请填写医疗组名称', trigger: 'blur' }
      }
    }
  },
  methods: {
    // 点击选中
    selectedType(selected) {
      this.filter.id = selected.value
      this.handleFilter()
    },
    // 获取分类数据
    initSelect() {
      medicalGroupList().then((res) => {
        this.options = res.data.list // 所有数据
        this.filterData = res.data.list // 过滤数据
        this.filter.id = this.options[0].value
        this.classLoading = false
        this.handleFilter()
      })
    },
    // 输入框过滤
    searchKey(keyWord) {
      this.filterData = this.options.filter(v => v.label.indexOf(keyWord) > -1)
    },
    formLeftTop1_reset() {
      this.formLeftTop1 = Object.assign({}, defaultForm)
    },
    formLeftTop1_submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = Object.assign({}, this.formLeftTop1)
          if (data.id) {
            medicalUpdate(data).then(res => {
              if (res.data.code === 200) {
                this.$message({
                  message: '修改成功!',
                  type: 'success'
                })
                this.dialogLeftTop1_1 = false
                this.initSelect()
              }
            })
          } else {
            medicalCreate(data).then((res) => {
              this.dialogLeftTop1_1 = false
              this.$message({
                message: '恭喜你，提交成功!',
                type: 'success'
              })
              this.initSelect()
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 新增医疗组
    dialogLeftTop1_1_show() {
      this.dialogLeftTop1_1 = true
      this.dialogLeftTop1_1_title = '新建医疗组'
      this.formLeftTop1_reset()
    },
    // 编辑医疗组
    editClick(item) {
      medicalRead(item.value).then(res => {
        if (res.data.code === 200) {
          this.formLeftTop1 = res.data.data
          this.dialogLeftTop1_1_title = '编辑医疗组'
          this.dialogLeftTop1_1 = true
        }
      })
    },
    // 删除医疗组
    deleteClick(item) {
      this.$confirm('是否删除该医疗组？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        medicalDelete(item.value).then(res => {
          if (res.data.code === 200) {
            this.$message({
              message: '删除成功!',
              type: 'success'
            })
            this.initSelect()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    getListBySearch1() {
      this.listQuery1.page = 1
      this.handleFilter()
    },
    getListByPagination(listQuery) {
      this.listQuery1 = listQuery
      this.handleFilter()
    },
    handleFilter() {
      const query = Object.assign({}, this.listQuery1, this.filter)
      medicalGroupUserList(query).then(res => {
        this.tableList1 = res.data.list
        this.totalList1 = parseInt(res.data.total)
      })
    },
    // 移除按钮
    operationEvent1_0(row) {
      this.$confirm('此操作将永久删除该条信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delMedicalGroupUser({ medicalGroupId: this.filter.id, userId: row.id }).then(() => {
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
    },
    // 设置医疗组成员
    dialogLeftTop1_2_show() {
      this.dialogLeftTop1_2 = true
      this.selectArr = []
      this.handleFilter2()
    },
    // 获取选择数据
    getSelectArr(selectArr) {
      this.selectArr = selectArr
    },
    getListBySearch2() {
      this.listQuery2.page = 1
      this.handleFilter2()
    },
    handleFilter2() {
      const query = Object.assign({}, this.listQuery2, this.filter2)
      medicalGroupUnUserList(query).then(res => {
        this.tableList2 = res.data.list
        this.totalList2 = parseInt(res.data.total)
      })
    },
    // 新增医疗组成员
    addMedicalGroupUser() {
      const userIds = []
      for (const i of this.selectArr) {
        userIds.push(i.id)
      }
      addMedicalGroupUser({ medicalGroupId: this.filter.id, userIds: userIds }).then(() => {
        this.dialogLeftTop1_2 = false
        this.handleFilter()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  .flexWrap {
    display: flex;
    height: 100%;
    background-color: #fff;
    overflow-y: scroll;
    overflow-x: hidden;
    .leftWrap {
      flex: 10;
    }
    .rightWrap {
      flex: 2;
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
    .el-select {
      display: block;
    }
  }
  .editor-container {
    min-height: 500px;
    margin: 0 0 30px;
    .editor-upload-btn-container {
      text-align: right;
      margin-right: 10px;
      .editor-upload-btn {
        display: inline-block;
      }
    }
  }
}
</style>
