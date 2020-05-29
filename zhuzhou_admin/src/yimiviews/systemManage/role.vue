<template>
  <div class="lg_wrap">
    <div class="lg_contract">
      <div class="lg_transferTab">
        <div class="leftTab">
          <el-select v-model="filter.type" clearable class="roleType" style="margin-right:10px;margin-top:10px;">
            <el-option
              v-for="item in roleTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-select v-model="filter.status" clearable class="status" style="margin-right:10px;margin-top:10px;">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-input
            v-model="filter.keywords"
            placeholder="角色名称"
            style="width:230px;margin-right:10px;margin-top:10px;"
          ></el-input>
          <el-button
            type="primary"
            style="background-color:#1cc09f;color: #fff;border-color: #42b983;margin-right:10px;margin-top:10px;"
            @click="handleFilter"
          >搜索</el-button>
        </div>
        <div class="rightTab">
          <span>
            <el-button
              style="background-color: rgba(255, 89, 24, 1);border-color:rgba(255, 89, 24, 1);color:#fff;margin-right:10px;margin-top:10px;"
              @click="addClick"
            >+ 新增角色</el-button>
          </span>
        </div>
      </div>
      <complex-table
        :columnsLabel='"序号"'
        :columnsType='"index"'
        :list="tableList1"
        :totalList="totalList1"
        :theadList="roleConst.theadList1"
        :operationButtons="roleConst.operationButtons1"
        :statusArr="roleConst.statusArr"
        :moreHasOperate="moreHasOperate"
        :hasOperate="hasOperate"
        @operationEvent0="operationEvent0"
        @operationEvent1="operationEvent1"
        @operationEvent2="operationEvent2"
        @getListByPagination="getListByPagination"
      ></complex-table>
      <el-dialog :title="title" :visible.sync="permissionDialogVisible" id="jurisdiction">
        <el-form :model="roleForm" :rules="roleFormRules" ref="roleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="角色名称" prop="title">
            <el-input style="width:85%" v-model="roleForm.title"></el-input>
          </el-form-item>
          <el-form-item label="" class="ml0">
            <el-tree
              class="filter-tree myTree"
              :data="data2"
              show-checkbox
              node-key="id"
              :default-expanded-keys="expandedKeys"
              :default-checked-keys="roleForm.permissionIds"
              :props="defaultProps"
              ref="myTree">
            </el-tree>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="resetTreeChecked">清空</el-button>
          <el-button @click="permissionDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="savePermissions('roleForm')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import complexTable from '@/views/table/complexTable'
import { roleConst } from '@/yimiviews/systemManage/columnsConst'
import { getList, update, saveRolePermission, getPermissionsByRoleId } from '@/api/systemManage/role'
import { getPermissionList } from '@/api/systemManage/permission'
import elementTree from '@/yimiviews/components/elementTree'
export default {
  components: {
    complexTable,
    elementTree
  },
  mounted() {
    this.getPermissionList()
    this.handleFilter()
  },
  data() {
    return {
      moreHasOperate: true,
      hasOperate: false,
      roleConst,
      tableList1: [],
      totalList1: 4,
      listQuery: {
        page: 1, // 默认第一页
        limit: 10 // 默认一次展示十条
      },
      filter: {
        status: null,
        type: null,
        keywords: ''
      },
      roleTypeList: [
        {
          value: 1,
          label: '自定义角色'
        },
        {
          value: 2,
          label: ' 预定义角色'
        }
      ],
      options: [
        {
          value: 1,
          label: '启用'
        },
        {
          value: 0,
          label: '停用'
        }
      ],
      contractMessage: '',
      permissionDialogVisible: false,
      roleForm: {
        permissionIds: [], // 权限
        title: '' // 角色名称
      },
      title: '', // 弹框
      roleFormRules: {
        title: { required: true, message: '请填写角色名称', trigger: 'blur' }
      },
      query: {
        permission: {}
      },
      expandedKeys: [],
      roleData: [],
      data2: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      treeLoading: true
    }
  },
  methods: {
    // 新增角色
    addClick() {
      this.title = '新增'
      this.permissionDialogVisible = true
      if (this.roleForm.permissionIds.length > 0) {
        this.$refs.myTree.setCheckedKeys([])
      }
      this.roleForm.title = ''
      this.roleForm.id = null
    },
    // 查看详情
    operationEvent0(row) {
      this.$router.push(`/roleTpos/roleDetails/${row.id}`)
    },
    // 编辑
    operationEvent1(row) {
      if (row.title === '超级管理员') {
        this.$message({
          type: 'warning',
          message: '"超级管理员"无法操作'
        })
      } else {
        this.title = '编辑'
        this.roleForm.title = row.title
        this.roleForm.id = row.id
        this.getPermissionsByRoleId(row.id)
        this.permissionDialogVisible = true
      }
    },
    // 修改状态
    operationEvent2(row) {
      this.$confirm(row.status === 0 ? '是否启用?' : '是否停用?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        update({ id: row.id, status: row.status === 0 ? 1 : 0 }).then((res) => {
          if (res.data.code === 200) {
            this.$message({
              type: 'success',
              message: row.status === 0 ? '启用成功' : '停用成功'
            })
            this.handleFilter()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: row.status === 0 ? '已取消启用' : '已取消停用'
        })
      })
    },
    getListByPagination(listQuery) {
      this.listQuery = listQuery
      this.handleFilter()
    },
    handleFilter() {
      const query = Object.assign({}, this.listQuery, this.filter)
      getList(query).then(res => {
        this.tableList1 = res.data.list
        this.tableList1.forEach((v, k) => {
          this.tableList1[k].typeShow = this.roleTypeList.find(i => i.value === v.type).label
        })
        this.totalList1 = parseInt(res.data.total)
      })
    },
    // 确定
    savePermissions(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let message = ''
          const permissionIds = this.$refs.myTree.getCheckedKeys()
          permissionIds.forEach(v => {
            this.roleData.forEach(k => {
              if (k.id === v) {
                permissionIds.push(k.parentId)
              }
            })
          })
          permissionIds.forEach((v, i) => {
            if (v === 0) {
              permissionIds.splice(i, 1)
            }
          })
          this.roleForm.permissionIds = Array.from(new Set(permissionIds))
          if (this.roleForm.id) {
            message = '编辑成功'
          } else {
            message = '新增成功'
          }
          const query = Object.assign({}, this.roleForm)
          query.permissionIds = query.permissionIds.join(',')
          saveRolePermission(query).then(res => {
            if (res.data.code === 200) {
              this.$notify({
                title: '成功',
                message: message,
                type: 'success',
                duration: 2000
              })
              this.permissionDialogVisible = false
              this.handleFilter()
            }
          })
        } else {
          return false
        }
      })
    },
    resetTreeChecked() {
      this.$refs.myTree.setCheckedKeys([])
    },
    // 获取当前角色的权限
    getPermissionsByRoleId(roleId) {
      getPermissionsByRoleId({ roleId: roleId }).then(res => {
        this.roleForm.permissionIds = res.data.value
        this.$refs.myTree.setCheckedKeys(this.roleForm.permissionIds)
      })
    },
    // 所有权限
    getPermissionList() {
      getPermissionList(this.query).then(res => {
        if (res.data.code === 200) {
          this.roleData = res.data.value
          this.data2 = this.handlePermissionList(res.data.value)
          this.treeLoading = false
        }
      })
    },
    handlePermissionList(data) {
      const list = [[], [], []]
      for (let i = 0; i < data.length; i++) {
        if (data[i].type === 1) {
          const obj = {}
          obj.id = data[i].id
          obj.label = data[i].title
          obj.children = []
          list[0].push(obj)
        } else if (data[i].type === 2) {
          const obj = {}
          obj.id = data[i].id
          obj.parentId = data[i].parentId
          obj.label = data[i].title
          obj.children = []
          list[1].push(obj)
        } else if (data[i].type === 3) {
          const obj = {}
          obj.id = data[i].id
          obj.parentId = data[i].parentId
          obj.label = data[i].title
          list[2].push(obj)
        }
      }
      for (let i = 0; i < list[0].length; i++) {
        for (let j = 0; j < list[1].length; j++) {
          if (list[1][j].parentId === list[0][i].id) {
            list[0][i].children.push(list[1][j])
          }
        }
      }
      for (let i = 0; i < list[1].length; i++) {
        for (let j = 0; j < list[2].length; j++) {
          if (list[2][j].parentId === list[1][i].id) {
            list[1][i].children.push(list[2][j])
          }
        }
      }
      return list[0]
    }
  }
}
</script>
<style lang="scss" scoped>
.lg_contract {
  width: 100%;
  height: 100%;
  background-color: #fff;
  overflow: auto;
  .lg_transferTab {
    display: flex;
    justify-content: space-between;
    overflow-x: hidden;
    flex-wrap: wrap;
    padding: 0 20px;
    .leftTab {
      display: flex;
      justify-content: flex-start;
    }
  }
}
.addRoleBox {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 1999;
  .bg {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.25);
  }
  .addRole {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 760px;
    height: 750px;
    background-color: #fff;
    .roleTop {
      height: 40px;
      line-height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #eee;
      padding: 0 10px;
      h5 {
        margin: 0;
        color: rgba(0, 0, 0, 0.65);
      }
      i {
        line-height: 40px;
        font-weight: bold;
        cursor: pointer;
      }
    }
    .roleSelect {
      margin-top: 50px;
      padding: 0 50px;
      .el-form {
        .el-form-item {
          .el-form-item__content {
            .el-checkbox-group {
              padding-left: 30px;
            }
          }
        }
        .fontBlod {
          .el-form-item__content {
            .el-checkbox-group {
              padding-left: 0;
              label {
                font-weight: bold;
                color: #606266;
              }
            }
          }
        }
      }
    }
  }
}
</style>
<style lang="scss">
/* elementUI默认样式修改 */
.leftTab {
  .status > .el-input {
    width: 185px !important;
    &:after {
      content: "状态 :";
      height: 36px;
      line-height: 36px;
      position: absolute;
      top: 0;
      left: 20px;
    }
    .el-input__inner {
      padding-left: 60px !important;
    }
  }
  .roleType > .el-input {
    width: 210px !important;
    &:after {
      content: "角色类型 :";
      height: 36px;
      line-height: 36px;
      position: absolute;
      top: 0;
      left: 20px;
    }
    .el-input__inner {
      padding-left: 90px !important;
    }
  }
}
.applicationBox .el-form-item--medium .el-form-item__content {
  display: flex;
  justify-content: flex-end;
}
.applicationBox textarea {
  resize: none !important;
  height: 200px;
}
.addRoleBox {
  .el-form-item__content > label {
    font-weight: bold;
  }
  .el-checkbox-group > label {
    font-size: 12px;
    color: #999;
  }
  .el-form-item__content > .el-checkbox-group {
    font-weight: bold;
  }
  .el-form-item--medium .el-form-item__content,
  .el-form-item--medium .el-form-item__label {
    line-height: 25px;
  }
}
.ml0{
  .el-form-item__content{
    margin-left: 30px !important;
    height: 300px;
    overflow-y: scroll;
  }
}
</style>