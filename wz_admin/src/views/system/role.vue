<template>
  <div class="lg-container app-container">
    <div class="lg-container-white">
      <!--搜索模块-->
      <div class="filter-container">
        <el-input
          v-model="filters['input.query']"
          placeholder="输入关键字过滤"
          style="width: 200px;"
          class="filter-item el-input--small"
          @keyup.enter.native="handleFilter"
        />
        <el-button
          v-waves
          class="filter-item el-button--small"
          type="primary"
          icon="el-icon-search"
          @click="handleFilter"
        >搜索</el-button>
        <el-button
          class="filter-item el-button--small"
          style="margin-left: 10px;"
          type="primary"
          icon="el-icon-plus"
          @click="handleCreate"
        >新增</el-button>
      </div>

      <!--主列表模块-->
      <lgTable
        columns-type="index"
        columns-label="序号"
        :list="list"
        :total-list="total"
        :lg-thead="roleConst.tableAttr.thead"
        :lg-buttons="roleConst.tableAttr.buttons"
        @operationEvent0="operationEvent0"
        @operationEvent1="operationEvent1"
        @operationEvent2="operationEvent2"
        @operationEvent3="operationEvent3"
        @initListQuery="initListQuery"
        @getListByPagination="getListByPagination"
      />
      <!--编辑新增弹出框-->
      <lgDialog
        :title="textMap[dialogTitle]"
        :visible="dialogFormVisible"
        width="500px"
        :show-form="true"
        form-ref="dataForm"
        :form-rules="dataRules"
        label-width="80px"
        :value="dataForm"
        :btn-loading="btnLoading"
        @on-submit="handleCreateOrUpdate"
        @on-close="onClose"
      >
        <template slot="form">
          <el-form-item
            label="角色名称"
            prop="role_name"
          >
            <el-input v-model="dataForm.role_name" />
          </el-form-item>
          <el-form-item
            label="角色描述"
            prop="description "
          >
            <el-input v-model="dataForm.description" />
          </el-form-item>
          <!-- <el-form-item label="角色权限">
            <el-input v-model="dataForm.page_code" />
          </el-form-item> -->
          <el-form-item label="顺序">
            <el-input v-model="dataForm.seq" />
          </el-form-item>

        </template>
      </lgDialog>
      <!--权限设置-->
      <lgDialog
        title="权限设置"
        :visible="dialogFormVisibleTree"
        width="500px"
        :show-form="false"
        :btn-loading="btnLoading"
        @on-submit="handleCreateOrUpdateTree"
        @on-close="onTreeClose"
      >
        <template>
          <el-tree
            ref="tree"
            :props="props"
            :data="treeData"
            show-checkbox
            default-expand-all
            node-key="id"
            highlight-current
            check-strictly
          />
        </template>
      </lgDialog>
    </div>
  </div>
</template>

<script>
// import { asyncRoutes } from '@/router/index'
import { list, save, deleted } from '@/api/common'
import { savePower } from '@/api/role'
import waves from '@/directive/waves' // Waves directive
import lgTable from '@/views/components/lgTable'
import lgDialog from '@/views/components/lgDialog'
import { roleConst } from '@/views/system/columnsConst'
import { setTimeout } from 'timers'
const defaultForm = {
  id: 0,
  role_name: '',
  description: '',
  seq: '',
  page_code: ''
}
export default {
  components: { lgTable, lgDialog },
  directives: { waves },
  data() {
    return {
      roleConst,
      apiUri: 'role',
      list: [],
      total: 0,
      listQuery: {
        current: 1,
        pageSize: 10
      },
      filters: {
        'input.query': ''
      },
      dataForm: Object.assign({}, defaultForm),
      dialogFormVisible: false,
      dialogTitle: '',
      textMap: {
        update: '编辑',
        create: '添加'
      },
      dialogPvVisible: false,
      dataRules: {
        role_name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ]
      },
      // 权限相关
      dialogFormVisibleTree: false,
      treeData: [],
      props: {
        children: 'child',
        label: 'name'
      },
      btnLoading: false
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  mounted() {
    this.getList()
    this.getMenuList()
  },
  methods: {
    getMenuList() {
      list('menu', {}).then((res) => {
        if (res.success) {
          this.treeData = res.data.list
        }
      })
    },
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
      list(this.apiUri, params).then((res) => {
        if (res.success) {
          this.list = res.data.list
          this.total = res.data.total_count
          this.list.map((e) => {
            return (e.power_name = e.power
              .map((l) => {
                return l.name
              })
              .join(','))
          })
        }
      })
    },

    // 递归修改菜单
    findPathByLeafId(data) {
      for (var i = 0; i < data.length; i++) {
        data[i].label = 'meta' in data[i] ? data[i].meta.title : ''
        if (data[i].children) {
          this.findPathByLeafId(data[i].children)
        }
      }
      return data
    },
    // 权限
    operationEvent0(row) {
      this.dialogFormVisibleTree = true
      this.dataForm.id = row.id
      const checkedKeys = row.power.map((e) => {
        return e.id
      })
      setTimeout(() => {
        this.$refs.tree.setCheckedKeys(checkedKeys)
      }, 0)
    },
    // 权限编辑
    handleCreateOrUpdateTree() {
      const tempData = this.$refs.tree.getCheckedNodes(false, true)
      const power = tempData
        .map((e) => {
          return e.id
        })
        .join(',')
      const data = {
        role_id: this.dataForm.id,
        power: power
      }
      this.btnLoading = true
      savePower(data).then((res) => {
        if (res.success) {
          this.btnLoading = false
          this.$message({
            message: '修改权限成功',
            type: 'success'
          })
          this.dialogFormVisibleTree = false
          this.getList()
        }
      })
    },
    // 权限设置关闭
    onTreeClose() {
      this.dialogFormVisibleTree = false
    },
    // 编辑
    operationEvent1(row) {
      this.dataForm = Object.assign({}, row) // copy obj
      this.dialogTitle = 'update'
      this.dialogFormVisible = true
    },
    // 启用
    operationEvent2(row) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const params = { id: row.id }
          deleted(this.apiUri, params).then((res) => {
            if (res.success) {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.getList()
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 禁用
    operationEvent3(row) {},
    // 添加
    handleCreate() {
      this.resetForm()
      this.dialogTitle = 'create'
      this.dialogFormVisible = true
    },
    // 添加提交
    handleCreateOrUpdate() {
      const data = Object.assign({}, this.dataForm)
      this.btnLoading = true
      save(this.apiUri, data).then((res) => {
        if (res.success) {
          this.btnLoading = false
          this.getList()
          this.dialogFormVisible = false
          this.$message({
            message: this.textMap[this.dialogTitle] + '成功',
            type: 'success'
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
        code: '',
        description: '',
        orders: '',
        status: 1
      }
    }
  }
}
</script>

