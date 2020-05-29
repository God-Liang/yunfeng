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
                placeholder="按名称搜索"
                v-model="filter.keywords"
              ></el-input>
              <el-button
                class="filter-item"
                type="primary"
                v-waves
                icon="el-icon-search"
                @click="getListBySearch()"
              >搜索</el-button>
              <el-button type="primary" class="filter-item" @click="dialogLeftTop1_1_show()">新建字典</el-button>
            </div>
            <div class="rightPart filterPart"></div>
          </div>
        </div>
        <complexTable
          ref="complexTable"
          :hasSelection="false"
          :list="tableList1"
          :theadList="dictionaryConst.theadList1"
          :operationButtons="dictionaryConst.operationButtons1"
          :statusArr="dictionaryConst.statusArr"
          @operationEvent0="operationEvent1_0"
          @operationEvent1="operationEvent1_1"
          @getListByPagination="getListByPagination"
          :totalList="totalList1"
        ></complexTable>
      </div>
      <div class="rightWrap">
        <category :data="filterData" @selectedType="selectedType" @searchKey="searchKey" :classLoading="classLoading"></category>
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
        label-width="80px"
      >
        <el-form-item label="类型" prop="type">
          <el-select v-model="formLeftTop1.type" placeholder="请选择字典类型">
            <!--<el-option v-for = 'item in dictionaryConst.surgeryType' :label="item.label" :value="item.value" :key = 'item.value'></el-option>-->
            <el-option
              v-for="item in options"
              :label="item.label"
              :value="item.value"
              :key="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="字典名称" prop="keyCnName">
          <el-input v-model="formLeftTop1.keyCnName"></el-input>
        </el-form-item>
        <el-form-item label="代码" prop="value">
          <el-input v-model="formLeftTop1.value"></el-input>
        </el-form-item>
        <el-form-item label="父代码">
          <el-input v-model="formLeftTop1.parentId" placeholder="输入父类的代码"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="extDesc">
          <el-input type="textarea" rows="4" v-model="formLeftTop1.extDesc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogLeftTop1_1 = false">取 消</el-button>
        <el-button type="primary" @click="formLeftTop1_submit('formLeftTop1')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves/index.js'
import Tinymce from '@/components/Tinymce'
import complexTable from '@/views/table/complexTable'
import category from 'yimiviews/components/category'
// import { parseTime } from '@/utils'
import { dictionaryConst } from '@/yimiviews/knowledgeManage/columnsConst'
import { pending, remove, postForm, dictionaryType } from '@/api/knowledgeManage/dictionary'
const defaultForm = {
  id: '',
  type: '',
  dictionaryName: '',
  code: '',
  description: '',
  editor: '',
  editTime: ''
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
      classLoading: true,
      dictionaryConst,
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
      filterData: [],
      dictionariesRules: {
        type: { required: true, message: '请选择类型', trigger: 'change' },
        keyCnName: { required: true, message: '请填写字典名称', trigger: 'blur' },
        value: [{ required: true, message: '请填写代码', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]+$/, message: '非字母,数字名称' }]
      }
    }
  },
  methods: {
    // 点击选中
    selectedType(selected) {
      this.filter.type = selected.value
      this.formLeftTop1.type = selected.value
      this.handleFilter()
    },
    // 获取分类数据
    initSelect() {
      dictionaryType().then((res) => {
        this.options = res.data.list // 所有数据
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
    formLeftTop1_reset() {
      this.formLeftTop1 = Object.assign({}, defaultForm)
      this.formLeftTop1.type = this.filter.type
    },
    formLeftTop1_submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          postForm(this.formLeftTop1).then((res) => {
            this.dialogLeftTop1_1 = false
            this.$message({
              message: '恭喜你，提交成功!',
              type: 'success'
            })
            this.handleFilter(this.listQuery)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    dialogLeftTop1_1_show() {
      this.dialogLeftTop1_1 = true
      this.dialogLeftTop1_1_title = '新建'
      this.formLeftTop1_reset()
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
    operationEvent1_0(row) {
      this.formLeftTop1_reset()
      this.dialogLeftTop1_1_title = '编辑'
      this.formLeftTop1 = Object.assign({}, row)
      this.dialogLeftTop1_1 = !this.dialogLeftTop1_1
    },
    operationEvent1_1(row) {
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
            this.handleFilter()
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
