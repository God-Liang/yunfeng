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
                placeholder="请输入模板名称"
                v-model="filter.keywords"
              ></el-input>
              <el-button
                class="filter-item"
                type="primary"
                v-waves
                icon="el-icon-search"
                @click="getListBySearch"
              >搜索</el-button>
              <el-button type="primary" class="filter-item" @click="dialogLeftTop1_1_show()">新建</el-button>
            </div>
            <div class="rightPart filterPart"></div>
          </div>
        </div>
        <complexTable
          :hasSelection="false"
          :list="tableList1"
          :totalList="totalList1"
          :theadList="messageConst.theadList1"
          :operationButtons="messageConst.operationButtons1"
          :statusArr="messageConst.statusArr"
          @operationEvent0="operationEvent1_0"
          @operationEvent1="operationEvent1_1"
          @operationEvent2="operationEvent1_2"
          @getListByPagination="getListByPagination"
        ></complexTable>
      </div>
      <div class="rightWrap">
        <category
          :data="filterData"
          classfiy="短语分类"
          @selectedType="selectedType"
          @searchKey="searchKey"
          :classLoading="classLoading"
        ></category>
      </div>
    </div>
    <el-dialog
      :title="dialogLeftTop1_1_title"
      :visible.sync="dialogLeftTop1_1"
      class="dialogLeftTop1_1"
    >
      <el-form ref="formLeftTop1" :rules="messagerules" :model="formLeftTop1" label-width="80px">
        <el-form-item label="提醒类别" prop="type">
          <el-select v-model="formLeftTop1.type" placeholder="请选择提醒类别">
            <el-option
              v-for="item in options"
              :label="item.label"
              :value="item.value"
              :key="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="模板名称" prop="name">
          <el-input v-model="formLeftTop1.name"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input type="textarea" rows="4" v-model="formLeftTop1.content"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="content">
          <el-select v-model="formLeftTop1.status" placeholder="请选择提醒类别">
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogLeftTop1_1 = false">取 消</el-button>
        <el-button type="primary" @click="formLeftTop1_submit('formLeftTop1')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="内容预览" :visible.sync="dialogLeftTop1_2" class="dialogLeftTop1_2">
      <el-row>
        <el-col>
          <div>
            <h3>名称：</h3>
            <p style="padding-left:20px;">{{previewData.name}}</p>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <div>
            <h3>简介：</h3>
            <p style="padding-left:20px;">{{previewData.content}}</p>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves/index.js'
import Tinymce from '@/components/Tinymce'
import complexTable from '@/views/table/complexTable'
import category from 'yimiviews/components/category'
import { messageConst } from '@/yimiviews/knowledgeManage/columnsConst'
import { pending, postForm, remove } from '@/api/knowledgeManage/message'
import { dictionary } from '@/api/knowledgeManage/dictionary'
const defaultForm = {
  type: '',
  name: '',
  content: '',
  status: 1
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
      previewData: {},
      messageConst,
      tableList1: [],
      totalList1: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      filter: {
        type: '',
        keywords: ''
      },
      dialogLeftTop1_1_title: '',
      formLeftTop1: Object.assign({}, defaultForm),
      options: [],
      messagerules: {
        type: { required: true, message: '请选择提醒类别', trigger: 'change' },
        name: { required: true, message: '请填写模板名称', trigger: 'blur' },
        content: { required: true, message: '请填写内容', trigger: 'blur' }
      },
      filterData: [],
      classLoading: true
    }
  },
  methods: {
    selectedType(selected) {
      this.filter.type = selected.value
      this.listQuery.page = 1
      this.handleFilter()
    },
    initSelect() {
      dictionary({ type: 'txlb' }).then((res) => {
        this.options = res.data.list
        this.filterData = res.data.list // 过滤数据
        this.filter.type = this.options[0].value
        this.classLoading = false
        this.handleFilter()
      })
    },
    // 输入框过滤
    searchKey(keyWord) {
      this.filterData = this.options.filter(v => v.label.indexOf(keyWord) > -1)
    },
    getListBySearch() {
      this.listQuery.page = 1
      this.handleFilter()
    },
    getListByPagination(listQuery) {
      this.listQuery = listQuery
      this.handleFilter()
    },
    handleFilter() {
      const query = Object.assign({}, this.listQuery, this.filter)
      pending(query).then(res => {
        this.tableList1 = res.data.list
        this.totalList1 = parseInt(res.data.total)
      })
    },
    formLeftTop1_submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          postForm(this.formLeftTop1).then((res) => {
            if (res.data.code === 200) {
              this.$message({
                message: '恭喜你，提交成功!',
                type: 'success'
              })
              this.$refs[formName].resetFields()
              this.dialogLeftTop1_1 = false
              this.handleFilter(this.listQuery)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    dialogLeftTop1_1_show() {
      this.dialogLeftTop1_1_title = '新建'
      this.formLeftTop1 = Object.assign({}, defaultForm)
      this.dialogLeftTop1_1 = true
    },
    operationEvent1_0(row) {
      this.dialogLeftTop1_1_title = '编辑'
      this.formLeftTop1 = Object.assign({}, row)
      this.dialogLeftTop1_1 = !this.dialogLeftTop1_1
    },
    operationEvent1_1(row) {
      this.previewData = row
      this.dialogLeftTop1_2 = !this.dialogLeftTop1_2
    },
    operationEvent1_2(row) {
      this.$confirm('此操作将永久删除该条信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        remove({ id: row.id }).then((res) => {
          if (res.data.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.handleFilter(this.listQuery)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
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
