<template>
  <div class="lg-container">
    <div class="lg-container-white">
      <el-container>
        <el-main>
          <!--搜索模块-->
          <div class="filter-container">
            <el-input
              v-model="filters['input.query']"
              placeholder="输入关键字过滤"
              style="width: 200px;"
              size="small"
              class="filter-item"
              @keyup.enter.native="handleFilter"
            />
            <el-button
              v-waves
              class="filter-item"
              type="primary"
              size="small"
              icon="el-icon-search"
              @click="handleFilter"
            >搜索</el-button>
            <el-button
              class="filter-item"
              type="primary"
              size="small"
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
            :lg-thead="userConst.tableAttr.thead"
            :lg-buttons="userConst.tableAttr.buttons"
            :btn-loading="btnLoading"
            @operationEvent0="operationEvent0"
            @operationEvent1="operationEvent1"
            @operationEvent2="operationEvent2"
            @operationEvent3="operationEvent3"
            @initListQuery="initListQuery"
            @getListByPagination="getListByPagination"
          />
          <!--编辑新增用户弹出框-->
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
                label="用户名"
                prop="login_name"
              >
                <el-input v-model="dataForm.login_name" />
              </el-form-item>
              <el-form-item
                v-if="dialogTitle === 'create'"
                label="用户密码"
                prop="login_pwd"
              >
                <el-input
                  v-model="dataForm.login_pwd"
                  type="password"
                />
              </el-form-item>
              <el-form-item
                v-if="dialogTitle === 'create'"
                label="确认密码"
                prop="login_pwd2"
              >
                <el-input
                  v-model="dataForm.login_pwd2"
                  type="password"
                />
              </el-form-item>
              <el-form-item
                label="真实名字"
                prop="link_man"
              >
                <el-input v-model="dataForm.link_man" />
              </el-form-item>
              <el-form-item label="性别">
                <el-select
                  v-model="dataForm.sex"
                  class="filter-item"
                  placeholder="请选择性别"
                >
                  <el-option
                    v-for="item in userConst.sexOptions"
                    :key="item.key"
                    :label="item.valueCn"
                    :value="item.key"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                label="角色"
                prop="role_id"
              >
                <el-select
                  v-model="dataForm.role_id"
                  class="filter-item"
                  placeholder="请选择角色"
                >
                  <el-option
                    v-for="item in userConst.roleOptions"
                    :key="item.key"
                    :label="item.valueCn"
                    :value="item.key"
                  />
                </el-select>
              </el-form-item>
            </template>
          </lgDialog>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
// import { getOrgTree, getUserRole } from '@/api/system'
// import { getUserRole } from '@/api/system'
import { list, save, update, deleted } from '@/api/common'
import waves from '@/directive/waves' // Waves directive
import lgTable from '@/views/components/lgTable'
import lgDialog from '@/views/components/lgDialog'
import { userConst } from '@/views/system/columnsConst'
const defaultForm = {
  id: 0,
  login_name: '',
  login_pwd: '',
  link_man: '',
  sex: '',
  role_id: ''
}
export default {
  components: { lgTable, lgDialog },
  directives: { waves },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        // if (this.dataForm.login_pwd2 !== '') {
        //   console.log(this.$refs.dataForm)

        //   this.$refs.dataForm.validateField('login_pwd2')
        // }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.dataForm.login_pwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      userConst,
      apiUri: 'user',
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
        login_name: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        login_pwd: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        login_pwd2: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],
        role_id: [{ required: true, message: '请选择角色', trigger: 'change' }]
      },
      filterText: '',
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      rolesList: [],
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
    // this.getRolesList()
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
      this.listQuery.current = 1
      this.getList()
    },
    // 获取列表
    getList() {
      const params = Object.assign({}, this.listQuery, this.filters)
      list(this.apiUri, params).then((res) => {
        if (res.success) {
          this.list = res.data.list.map((e) => {
            if (e.deleted === 'N') {
              e.status = 1
            } else if (e.deleted === 'Y') {
              e.status = 2
            }
            return e
          })
          this.total = res.data.total_count
        }
      })
    },
    // 编辑
    operationEvent0(row) {
      this.dialogTitle = 'update'
      this.dialogFormVisible = true
      this.dataForm = {
        id: row.Id,
        login_name: row.login_name,
        link_man: row.link_man,
        sex: row.sex,
        role_id: row.role_id
      }
      console.log(row.role_id)
    },
    // 启用
    operationEvent1(row) {
      const params = {
        id: row.id,
        status: 1
      }
      update(this.apiUri, params).then((res) => {
        if (res.success) {
          this.getList()
          this.$message({
            message: '启用成功',
            type: 'success'
          })
        }
      })
    },
    // 禁用
    operationEvent2(row) {
      const params = {
        id: row.id,
        status: 0
      }
      update(this.apiUri, params).then((res) => {
        if (res.success) {
          this.getList()
          this.$message({
            message: '禁用成功',
            type: 'success'
          })
        }
      })
    },
    // 删除
    operationEvent3(row) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const data = { id: row.Id }
          deleted(this.apiUri, data).then((res) => {
            if (res.success) {
              this.getList()
              this.$message({
                message: '删除成功',
                type: 'success'
              })
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
    // 添加
    handleCreate() {
      this.resetForm()
      this.dialogTitle = 'create'
      this.dialogFormVisible = true
    },
    // 添加提交
    handleCreateOrUpdate() {
      const data = Object.assign({}, this.dataForm)
      delete data.login_pwd2
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
        id: 0,
        login_name: '',
        login_pwd: '',
        link_man: '',
        sex: '',
        role_id: ''
      }
    },
    // 获取角色列表
    getRolesList() {
      const data = {
        current: 1,
        pageSize: 9999
      }
      list('role', data).then((res) => {
        if (res.success) {
          this.rolesList = res.data.list
        }
      })
    }
  }
}
</script>

<style lang="scss">
.lg-tree-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .lg-tree-label {
    color: #434343;
    font-size: 13px;
    width: 120px;
  }
  .lg-tree-btn {
  }
}
</style>
