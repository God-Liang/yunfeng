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
                @click="getListBySearch"
              >搜索</el-button>
              <el-button type="primary" @click="dialogLeftTop1_1_show()">新建床位</el-button>
              <el-button type="primary" @click="addWard()">新建病房</el-button>
            </div>
            <div class="rightPart filterPart"></div>
          </div>
        </div>
        <complexTable
          :hasSelection="false"
          :list="tableList1"
          :totalList="totalList1"
          :theadList="bedConst.theadList1"
          :operationButtons="bedConst.operationButtons1"
          :statusArr="bedConst.statusArr"
          @operationEvent0="operationEvent1_0"
          @operationEvent1="operationEvent1_1"
          @operationEvent2="operationEvent1_2"
          @getListByPagination="getListByPagination"
        ></complexTable>
      </div>
      <div class="rightWrap">
        <category
          classfiy="病房列表"
          :operationTage="true"
          :data="filterData"
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
      <el-form ref="formLeftTop1" :model="formLeftTop1" :inline="true" label-width="100px">
        <el-form-item label="病房类别">
          <dict-select
            v-model="formLeftTop1.type"
            :disabled="disabled"
            placeholder
            style="width: 196px;"
            dict-code="bffl"
          ></dict-select>
        </el-form-item>
        <el-form-item label="病房名称">
          <el-input v-model="formLeftTop1.roomName" disabled style="width: 196px;"></el-input>
        </el-form-item>

        <el-form-item label="床位号">
          <el-input v-model="formLeftTop1.bedNo" style="width: 196px;"></el-input>
        </el-form-item>

        <el-form-item label="状态">
          <el-select v-model="formLeftTop1.status" placeholder="请选择启用标识" style="width: 196px;">
            <el-option
              v-for="item in bedConst.statusSelectArr"
              :label="item.label"
              :value="item.value"
              :key="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否加床">
          <el-select v-model="formLeftTop1.isAdd" placeholder="请选择是否加床" style="width: 196px;">
            <el-option
              v-for="item in bedConst.addBedArr"
              :label="item.label"
              :value="item.value"
              :key="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogLeftTop1_1 = false">取 消</el-button>
        <el-button type="primary" @click="formLeftTop1_submit()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="手术简介预览" :visible.sync="dialogLeftTop1_2" class="dialogLeftTop1_2">
      <div v-html="formLeftTop2"></div>
    </el-dialog>
    <el-dialog title="退出日间" :visible.sync="dialogLeftTop1_3" class="dialogLeftTop1_3">
      <el-form ref="formLeftTop3" :model="formLeftTop3" label-width="80px">
        <el-form-item label="类型">
          <el-select v-model="formLeftTop3.type" placeholder="请选择取消类型">
            <el-option label="病人取消" value="type1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="取消原因">
          <el-select v-model="formLeftTop3.content" placeholder="请选择取消原因">
            <el-option label="不好" value="bad"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="formLeftTop3.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogLeftTop1_3 = false">取 消</el-button>
        <el-button type="primary" @click="dialogLeftTop1_3 = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 病房 -->
    <el-dialog :title="wardTitle" :visible.sync="wardTage" class="dialogLeftTop1_3">
      <el-form ref="wardForm" :rules="wardFormRules" :model="wardForm" label-width="80px">
        <el-form-item label="所属病区" prop="areaId">
          <el-select v-model="wardForm.areaId" placeholder="请选择所属病区" style="width: 80%;">
            <el-option v-for="item in areaLists" :label="item.name" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="病房类别" prop="wardType">
          <dict-select v-model="wardForm.wardType" style="width: 80%;" dict-code="bffl"></dict-select>
        </el-form-item>
        <el-form-item label="病房名称" prop="wardName">
          <el-input v-model="wardForm.wardName" style="width: 80%;"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="wardRemark">
          <el-input type="textarea" v-model="wardForm.wardRemark" style="width: 80%;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="wardTage = false">取 消</el-button>
        <el-button type="primary" @click="wardSumbit('wardForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves/index.js'
import Tinymce from '@/components/Tinymce'
import complexTable from '@/views/table/complexTable'
import category from 'yimiviews/components/category'
import { bedConst } from '@/yimiviews/knowledgeManage/columnsConst'
import { pending, postForm, wardSelect, wardCreate, wardUpdate, wardDelete, wardRead } from '@/api/knowledgeManage/bed'
import { areaList } from '@/api/appointmentManage/surgery'
import DictSelect from '@/views/form/dictSelect'
export default {
  directives: { waves },
  components: { category, complexTable, Tinymce, DictSelect },
  mounted() {
    this.getAreaList()
    this.initSelect()
  },
  data() {
    return {
      disabled: true,
      dialogLeftTop1_1: false,
      dialogLeftTop1_2: false,
      dialogLeftTop1_3: false,
      bedConst,
      tableList1: [],
      totalList1: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      filter: {
        wardId: null,
        keywords: ''
      },
      dialogLeftTop1_1_title: '',
      formLeftTop1: {
        wardId: null,
        roomName: '',
        bedNo: '',
        status: 1,
        isAdd: 0
      },
      formLeftTop2: '',
      formLeftTop3: {
        type: '',
        content: '',
        remark: ''
      },
      filterData: [],
      classLoading: true,
      wardTage: false,
      wardForm: {
        areaId: null,
        wardType: null,
        wardName: '',
        wardRemark: ''
      },
      wardFormRules: {
        areaId: [{ required: true, message: '请选择所属病区', trigger: 'change' }],
        wardType: [{ required: true, message: '请选择病房类别', trigger: 'change' }],
        wardName: [{ required: true, message: '病房名称不能为空', trigger: 'blur' }]
      },
      areaLists: [],
      wardTitle: ''
    }
  },
  methods: {
    selectedType(selected) {
      this.filter.wardId = selected.value
      this.formLeftTop1.type = selected.type
      this.formLeftTop1.roomName = selected.label
      this.listQuery.page = 1
      this.handleFilter()
    },
    initSelect() {
      wardSelect().then((res) => {
        this.options = res.data.list
        this.filterData = res.data.list // 过滤数据
        if (res.data.list.length > 0) {
          this.filter.wardId = this.options[0].value
          this.formLeftTop1.type = this.options[0].type
          this.formLeftTop1.roomName = this.options[0].label
          this.formLeftTop1.wardId = this.options[0].value
          this.handleFilter()
        }
        this.classLoading = false
      })
    },
    // 输入框过滤
    searchKey(keyWord) {
      this.filterData = this.options.filter(v => v.label.indexOf(keyWord) > -1)
    },
    formLeftTop1_submit() {
      postForm(this.formLeftTop1).then((res) => {
        if (res.data.code === 200) {
          this.$message({
            message: '恭喜你，提交成功!',
            type: 'success'
          })
          this.dialogLeftTop1_1 = false
          this.handleFilter()
        }
      })
    },
    dialogLeftTop1_1_show() {
      this.dialogLeftTop1_1_title = '新建床位'
      this.formLeftTop1.bedNo = ''
      this.formLeftTop1.status = 1
      this.formLeftTop1.isAdd = 0
      this.dialogLeftTop1_1 = true
    },
    getListBySearch() {
      this.listQuery.page = 1
      this.handleFilter()
    },
    getListByPagination(listQuery) {
      this.listQuery = listQuery
      pending(listQuery).then(res => {
        this.tableList1 = res.data.list
        this.totalList1 = parseInt(res.data.total)
      })
    },
    handleFilter() {
      const query = Object.assign({}, this.listQuery, this.filter)
      pending(query).then(res => {
        this.tableList1 = res.data.list
        this.totalList1 = parseInt(res.data.total)
      })
    },
    operationEvent1_0(row) {
      this.dialogLeftTop1_1_title = '编辑'
      this.formLeftTop1 = Object.assign({}, row)
      this.dialogLeftTop1_1 = true
    },
    operationEvent1_1(row) {
      this.formLeftTop2 = row.description
      this.dialogLeftTop1_2 = !this.dialogLeftTop1_2
    },
    operationEvent1_2() {
      this.dialogLeftTop1_3 = !this.dialogLeftTop1_3
    },
    // 新增病房
    addWard() {
      this.wardForm = {
        wardType: null,
        wardName: '',
        wardRemark: ''
      }
      this.wardTitle = '新增病房'
      this.wardTage = true
    },
    // 编辑病房
    editClick(item) {
      wardRead(item.value).then(res => {
        if (res.data.code === 200) {
          this.wardForm = Object.assign({}, res.data.info)
          this.wardTitle = '编辑病房'
          this.wardTage = true
        }
      })
    },
    // 删除病房
    deleteClick(item) {
      this.$confirm('是否删除该病房？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        wardDelete(item.value).then(res => {
          if (res.data.code === 200) {
            this.$message({
              message: '删除成功',
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
    // 病房提交
    wardSumbit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = Object.assign({}, this.wardForm)
          if (data.id) {
            wardUpdate(data).then(res => {
              if (res.data.code === 200) {
                this.$message({
                  message: '病房修改成功',
                  type: 'success'
                })
                this.wardTage = false
                this.initSelect()
              }
            })
          } else {
            wardCreate(data).then(res => {
              if (res.data.code === 200) {
                this.$message({
                  message: '新增病房成功',
                  type: 'success'
                })
                this.wardTage = false
                this.initSelect()
              }
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 获取病区列表
    getAreaList() {
      areaList().then(res => {
        if (res.data.code === 200) {
          this.areaLists = res.data.list
        }
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
