<template lang="pug">
  .lg-container
    .lg-container-white
      .filter-container
        el-input.filter-item.w200(v-model="filters.keyWord" suffix-icon="el-icon-search" placeholder="请输入疾病名称" @keyup.enter.native="handleFilter")
        el-button.filter-item(type="primary" icon="el-icon-plus" @click="handleCreate") 新增
      lgTable(columns-type="index"
        columns-label="序号"
        :list="list"
        :total-list="total"
        :lg-thead="sicknessDirConst.tableAttr.thead"
        :lg-buttons="sicknessDirConst.tableAttr.buttons"
        @operationEvent0="operationEvent0"
        @operationEvent1="operationEvent1"
        @initListQuery="initListQuery"
        @getListByPagination="getListByPagination")
      lgDialog(:title="dialogTitle"
        :visible="dialogFormVisible"
        width="500px"
        :show-form="true"
        form-ref="dataForm"
        :form-rules="dataRules"
        label-width="100px"
        :value="dataForm"
        @on-submit="handleCreateOrUpdate"
        @on-close="onClose")
        template(slot="form")
          el-form-item(label="疾病名称" prop="name")
            el-input(v-model="dataForm.name")
          el-form-item(label="icd10" prop="icd10")
            el-input(v-model="dataForm.icd10")
          el-form-item(label="icd9" prop="icd9")
            el-input(v-model="dataForm.icd9")
          el-form-item(label="部位" prop="position")
            el-input(v-model="dataForm.position")
          el-form-item(label="科室" prop="departmentId")
            el-select(v-model="dataForm.departmentId")
              el-option(v-for="item in allDepartmentList" :key="item.id" :label="item.name" :value="item.id")
</template>

<script>
import { list, createOrUpdate, remove } from '@/api/common'
import lgTable from '@/views/components/lgTable'
import lgDialog from '@/views/components/lgDialog'
import { sicknessDirConst } from '@/views/platform/columnsConst'
import { getDepartments } from '@/api/system'
const defaultForm = {
  id: null,
  name: '',
  icd10: '',
  icd9: '',
  departmentId: null,
  department: '',
  position: ''
}
export default {
  components: { lgTable, lgDialog },
  data() {
    return {
      sicknessDirConst,
      apiUri: 'adminIcd10',
      list: [],
      total: 0,
      listQuery: {
        current: 1,
        pageSize: 10
      },
      filters: {
        keyWord: ''
      },
      dataForm: Object.assign({}, defaultForm),
      dialogFormVisible: false,
      dialogTitle: '',
      dialogPvVisible: false,
      dataRules: {
        name: [{ required: true, message: '请输入疾病名称', trigger: 'blur' }],
        icd10: [{ required: true, message: '请输入icd10', trigger: 'blur' }],
        icd9: [{ required: true, message: '请输入icd9', trigger: 'blur' }]
      },
      allDepartmentList: [] // 科室
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  mounted() {
    this.getList()
    this.getDepartmentList()
  },
  methods: {
    // 初始化页数与条数
    initListQuery(listQuery) {
      this.listQuery = listQuery
    },
    // 分页操作
    getListByPagination(listQuery) {
      this.listQuery = listQuery
      this.getList()
    },
    // 过滤列表
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    // 获取列表
    getList() {
      const params = Object.assign({}, this.listQuery, this.filters)
      list(this.apiUri, params).then(res => {
        if (res.code === 200) {
          this.list = res.list
          this.total = res.total
        }
      })
    },
    // 编辑
    operationEvent0(row) {
      this.dataForm = Object.assign({}, row)
      this.dialogTitle = '更新'
      this.dialogFormVisible = true
    },
    // 删除
    operationEvent1(row) {
      this.$confirm('是否确定删除：' + row.name + '?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        remove(this.apiUri, row.id).then(res => {
          if (res.code === 200) {
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
            if (this.list.length === 1 && this.listQuery.current > 1) {
              this.listQuery.current -= 1
            }
            this.getList()
          }
        })
      }).catch(() => {
        this.$notify({
          title: '取消',
          message: '已取消删除',
          type: 'info'
        })
      })
    },
    // 添加
    handleCreate() {
      this.resetForm()
      this.dialogTitle = '新增'
      this.dialogFormVisible = true
    },
    // 提交
    handleCreateOrUpdate() {
      const data = Object.assign({}, this.dataForm)
      data.department = this.allDepartmentList.filter(e => e.id === data.departmentId)[0].name
      createOrUpdate(this.apiUri, data).then(res => {
        if (res.code === 200) {
          this.getList()
          this.dialogFormVisible = false
          this.$notify({
            title: '成功',
            message: this.dialogTitle + '成功',
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    onClose() {
      this.dialogFormVisible = false
    },
    // 清空弹框表单
    resetForm() {
      this.dataForm = {
        id: null,
        name: '',
        icd10: '',
        icd9: '',
        departmentId: null,
        department: '',
        position: ''
      }
    },
    // 获取所有科室
    getDepartmentList() {
      getDepartments().then(
        (res) => {
          if (res.code === 200) {
            this.allDepartmentList = res.info
          }
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-container {
  justify-content: flex-end;
}
</style>
