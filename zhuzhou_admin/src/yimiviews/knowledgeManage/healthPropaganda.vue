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
                placeholder="请输入宣教名称"
                v-model="filter.keyword"
              ></el-input>
              <el-button
                class="filter-item"
                type="primary"
                v-waves
                icon="el-icon-search"
                @click="getListBySearch"
              >搜索</el-button>
              <el-button type="primary" class="filter-item" @click="add('新建')">新建</el-button>
            </div>
            <div class="rightPart filterPart">

            </div>
          </div>
        </div>
        <complexTable
          :columnsType='"index"'
          :list="tableList1"
          :totalList="totalList1"
          :theadList="healthPropagandaConst.theadList1"
          :operationButtons="healthPropagandaConst.operationButtons1"
          :statusArr="healthPropagandaConst.statusArr"
          @operationEvent0="operationEvent0"
          @operationEvent1="operationEvent1"
          @getListByPagination="getListByPagination"
        ></complexTable>
      </div>
      <div class="rightWrap">
        <category :data="filterData" classfiy="宣教分类" @selectedType="selectedType" @searchKey="searchKey" :classLoading="classLoading"></category>
      </div>
    </div>

    <!-- 新建 -->
    <el-dialog
      :title="dialogLeftTop1_1_title"
      :visible.sync="dialogLeftTop1_1"
      class="dialogLeftTop1_1"
      width="60%"
    >
      <el-form ref="formLeftTop1" :rules="propagandaRules" :model="formLeftTop1" label-width="80px">
        <el-form-item label="宣教分类" prop="type" style="width:50%">
          <dict-select
            v-model="formLeftTop1.type"
            placeholder="请选择宣教类型"
            style="width: 196px;"
            dict-code="xjlx"
          ></dict-select>
        </el-form-item>
        <el-form-item label="宣教名称" prop="name" style="width:50%">
          <el-input v-model="formLeftTop1.name" style="width: 196px;"></el-input>
        </el-form-item>
        <el-form-item label="是否启用" style="width:50%">
          <el-select v-model="formLeftTop1.status" placeholder="请选择启用标识" style="width: 196px;">
            <el-option
              v-for="item in healthPropagandaConst.statusSelectArr"
              :label="item.label"
              :value="item.value"
              :key="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=" " label-width="10px" prop="content" style="width:100%">
          <div class="editor-container">
            <tinymce :height=400 ref="editor" v-model="formLeftTop1.content"></tinymce>
          </div>
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
import category from '@/yimiviews/components/category'
import { healthPropagandaConst } from '@/yimiviews/knowledgeManage/columnsConst'
import { page, postForm, remove } from '@/api/knowledgeManage/healthPropaganda'
import { dictionary } from '@/api/knowledgeManage/dictionary'
import DictSelect from '../../views/form/dictSelect'
const defaultForm = {
  name: '',
  type: '',
  content: '',
  status: 1
}
const DELAY = 100
export default {
  directives: { waves },
  components: { DictSelect, category, complexTable, Tinymce },
  mounted() {
    this.uploadUrl = this.$store.state.app.BASE_API + '/attachment/upLoadImage'
    this.initSelect()
  },
  data() {
    return {
      dialogLeftTop1_1: false,
      healthPropagandaConst,
      tableList1: [],
      totalList1: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      filter: {
        keyword: '',
        type: ''
      },
      dialogLeftTop1_1_title: '',
      formLeftTop1: Object.assign({}, defaultForm),
      uploadUrl: '',
      options: [],
      propagandaRules: {
        type: { required: true, message: '请选择宣教分类', trigger: 'change' },
        name: { required: true, message: '请填写宣教名称', trigger: 'blur' },
        content: { required: true, message: '请填写描述', trigger: 'blur' }
      },
      filterData: [],
      classLoading: true
    }
  },
  methods: {
    add(title) {
      this.dialogLeftTop1_1_title = title
      this.dialogLeftTop1_1 = true
      this.formLeftTop1 = Object.assign({}, defaultForm)
      setTimeout(() => {
        this.$refs.editor.setContent('')
      }, DELAY)
    },
    formLeftTop1_submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          postForm(this.formLeftTop1).then((res) => {
            if (res.data.code === 200) {
              this.dialogLeftTop1_1 = false
              this.$message({
                type: 'success',
                message: '恭喜你，提交成功!'
              })
              this.handleFilter()
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    initSelect() {
      dictionary({ type: 'xjlx' }).then((res) => {
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
    selectedType(selected) {
      // filter.type 为右侧的分类
      this.filter.type = selected.value
      this.listQuery.page = 1
      this.handleFilter()
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
      page(query).then(res => {
        this.tableList1 = res.data.list
        this.totalList1 = parseInt(res.data.total)
      })
    },
    operationEvent0(row) {
      this.add('编辑健康宣教')
      for (const key in defaultForm) {
        if (defaultForm.hasOwnProperty(key)) {
          this.formLeftTop1[key] = row[key]
        }
      }
      this.formLeftTop1.id = row.id
      setTimeout(() => {
        this.$refs.editor.setContent(row.content)
      }, DELAY)
    },
    operationEvent1(row) {
      this.$confirm('此操作将永久删除该条信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        remove({ id: row.id }).then(() => {
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
  }
}
</script>

<style lang="scss">
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
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
  .dialogLeftTop1_1 {
    .el-dialog {
      min-width: 700px;
      .el-form {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        .el-form-item{
          .el-form-item__content{
            .el-textarea{
              textarea{
                min-height: 100px !important;
                resize: none;
              }
            }
          }
        }
      }
    }
  }
}
</style>
