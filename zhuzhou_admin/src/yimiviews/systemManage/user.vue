<template>
  <div class="lg_wrap">
    <div class="lg_personnerTpos">
      <el-container>
        <el-aside v-loading="treeLoading">
          <div class="addSection">
            <el-button
              size="small"
              style="background-color: rgba(255, 89, 24, 1);border-color:rgba(255, 89, 24, 1);color:#fff;"
              @click="newlySection"
            >新增科室</el-button>
            <span style="display:none;"></span>
            <el-button @click="editDepartment" size="small" type="primary">编辑科室</el-button>
          </div>
          <div class="sectionList">
            <el-input
              style="margin-bottom: 10px;"
              placeholder="输入关键字进行过滤"
              v-model="filterText">
            </el-input>
            <el-tree
              :data="departmentList"
              :props="defaultProps"
              accordion
              highlight-current
              node-key="id"
              ref="tree"
              id="department"
              current-node-key
              :filter-node-method="filterNode"
              @check-change="handleCheckChange"
              @node-click="handleNodeClick"
            ></el-tree>
          </div>
        </el-aside>
        <el-main>
          <div class="includeRole">
            <div class="includeRoleTop">
              <div id="status">
                <el-select
                  v-model="filter.status"
                  clearable
                  style="margin-right:10px;margin-top:10px;"
                >
                  <el-option
                    v-for="item in statusList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
              <div id="fex">
                <dict-select v-model="filter.sex" clearable placeholder="请选择" dict-code="xb"></dict-select>
              </div>
              <el-input
                v-model="filter.keyWord"
                placeholder="用户名/手机号/真实姓名"
                style="width:230px;margin-right:10px;margin-top:10px;"
              ></el-input>
              <el-button
                type="primary"
                style="margin-right:10px;background-color: #1cc09f;border-color:#1cc09f;margin-top:10px;"
                @click="searchBtn"
              >搜索</el-button>
              <el-button
                style="background-color: rgba(255, 89, 24, 1);border-color:rgba(255, 89, 24, 1);color:#fff;margin:10px 0 0 0;"
                @click="newlyIncreased"
              >+ 新增人员</el-button>
            </div>
            <complex-table
              columnsLabel="序号"
              :columnsType="'index'"
              :list="tableList1"
              :totalList="totalList1"
              :theadList="userConst.theadList1"
              :operationButtons="userConst.operationButtons1"
              :statusArr="userConst.statusArr"
              :moreHasOperate="moreHasOperate"
              :hasOperate="hasOperate"
              @operationEvent0="operationEvent0"
              @operationEvent1="operationEvent1"
              @operationEvent2="operationEvent2"
              @operationEvent3="operationEvent3"
              @getListByPagination="getListByPagination"
            ></complex-table>
          </div>
        </el-main>
      </el-container>
      <!-- 科室 -->
      <el-dialog
        :title="departmentTitle"
        :visible.sync="departmentVisible"
        width="600px"
        :before-close="departmentClose"
      >
        <el-form
          :model="departmentForm"
          :rules="departmentRules"
          ref="departmentForm"
          label-width="100px"
        >
          <el-form-item label="上级科室：" style="width:450px;">
            <el-input v-model="departmentForm.parentName" disabled></el-input>
          </el-form-item>
          <el-form-item label="科室类别：" prop="type" style="width:450px;">
            <el-select style="width: 100%" v-model="departmentForm.type" placeholder="请选择科室类别">
              <el-option
                v-for="item in typeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="科室名称：" prop="name" style="width:450px;">
            <el-input v-model="departmentForm.name" placeholder="请输入科室名称"></el-input>
          </el-form-item>
          <el-form-item align="right">
            <el-button @click="departmentClose">取消</el-button>
            <el-button type="primary" @click="submitFormDe('departmentForm')">确认</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 人员 -->
      <el-dialog
        :title="personnelTitle"
        :visible.sync="personnelVisible"
        width="650px"
        :before-close="personnelClose"
      >
        <el-form
          :model="personnelForm"
          :rules="personnelRules"
          ref="personnelForm"
          label-width="100px"
        >
          <el-form-item label="头像：" style="width:450px;">
            <img v-if="personnelForm.avatar" :src="personnelForm.avatar" alt class="contractImg">
            <div v-else class="svgSize">
              <svg-icon
                class-name="international-icon"
                class="avatar right_menu_item"
                icon-class="contractLogo"
              />
            </div>
          </el-form-item>
          <el-form-item label="科室名称：" prop="departId" style="width:450px;">
            <el-select v-model="personnelForm.departId" placeholder="请选择科室名称" style="width:350px;">
              <el-option
                v-for="item in departmentSelect"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户名：" prop="name" style="width:450px;">
            <el-input v-model="personnelForm.name"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名：" prop="nick" style="width:450px;">
            <el-input v-model="personnelForm.nick"></el-input>
          </el-form-item>
          <el-form-item label="性别：" style="width:450px;">
            <dict-select v-model="personnelForm.sex" placeholder style="width:100%;" dict-code="xb"></dict-select>
          </el-form-item>
          <el-form-item label="职称：" style="width:450px;">
            <dict-select
              v-model="personnelForm.title"
              placeholder="请选择医生职称"
              style="width:100%;"
              dict-code="yszc"
            ></dict-select>
          </el-form-item>
          <el-form-item label="用户类型：" style="width:450px;" prop="type">
            <el-select v-model="personnelForm.type" placeholder="请选择用户类型" style="width:350px;">
              <el-option
                v-for="item in userTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机号码：" style="width:450px;" prop="phone">
            <el-input v-model="personnelForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱：" style="width:450px;">
            <el-input v-model="personnelForm.email"></el-input>
          </el-form-item>
          <el-form-item label="出生日期：" style="width:450px;">
            <el-date-picker
              style="width:100%"
              v-model="personnelForm.birthday"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="角色：" style="width: 450px;" prop="roles" id="createSelect">
            <el-select
              style="width: 100%"
              v-model="personnelForm.roles"
              multiple
              filterable
              default-first-option
              placeholder="可搜索选择的角色"
            >
              <el-option
                v-for="item in createNameList"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label style="width:450px;">
            <el-radio v-model="defaultPass" label="1" style="padding-right: 30px">系统默认密码：123456</el-radio>
            <el-checkbox v-model="personnelForm.flag" true-label="1" false-label="0">手术医生</el-checkbox>
          </el-form-item>
          <el-form-item align="right">
            <el-button @click="personnelClose">取消</el-button>
            <el-button type="primary" @click="submitForm('personnelForm')">确认</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import complexTable from '@/views/table/complexTable'
import { userConst } from '@/yimiviews/systemManage/columnsConst'
import { getList, save, updateStatus, resetPass, getDepartmentSelect, getDepartmentList, createDepartment, updateDepartment } from '@/api/systemManage/user'
import { getRoleSelect } from '@/api/systemManage/role'
import DictSelect from '@/views/form/dictSelect'
import { mapGetters } from 'vuex'
const deUser = {
  departId: '',
  name: '',
  nick: '',
  sex: null,
  phone: '',
  title: null,
  email: '',
  birthday: '',
  roles: [],
  flag: '0',
  type: null
}
export default {
  components: {
    complexTable,
    DictSelect
  },
  computed: {
    ...mapGetters(['hospital'])
  },
  mounted() {
    this.handleFilter()
    this.getDepartmentSelect()
    this.getRoleList()
  },
  data() {
    return {
      filterText: '',
      moreHasOperate: true,
      hasOperate: false,
      // 人员
      personnelForm: {
        departId: '',
        name: '',
        nick: '',
        sex: null,
        phone: '',
        title: null,
        email: '',
        birthday: '',
        roles: [],
        flag: '0',
        type: null
      },
      defaultPass: '1',
      personnelRules: {
        name: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        departId: [{ required: true, message: '请选择部门名称', trigger: 'change' }],
        nick: [{ required: true, message: '真实姓名不能为空', trigger: 'blur' }],
        roles: [{ required: true, message: '所属角色不能为空', trigger: 'change' }],
        phone: [{ required: true, message: '请输入手机号码', trigger: ['blur'] },
          { pattern: /^1\d{10}$/, message: '请输入正确的手机号码' }],
        type: [{ required: true, message: '请选择用户类型', trigger: 'change' }]
      },
      // 科室
      departmentForm: {
        name: '',
        parentName: '',
        parentId: null,
        id: null
      },
      departmentRules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          { max: 20, message: '部门名称不得超过20字符', trigger: 'blur' }
        ],
        type: [{ required: true, message: '科室类别不能为空', trigger: 'change' }]
      },
      administrative: null,
      departmentTitle: '',
      personnelTitle: '',
      departmentVisible: false,
      personnelVisible: false,
      userConst,
      tableList1: [],
      totalList1: 0,
      listQuery: {
        page: 1, // 默认第一页
        limit: 10 // 默认一次展示十条
      },
      filter: {
        status: null,
        sex: null,
        keyWord: '',
        deptIds: null
      },
      id: '',
      statusList: [
        {
          value: 1,
          label: '启用'
        },
        {
          value: 0,
          label: '停用'
        }
      ],
      departmentList: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      pitchOn: 1,
      treeLoading: true,
      departmentSelect: [],
      createNameList: [],
      dynamicTags: [],
      roleQuery: {
        page: 1,
        limit: 9999999
      },
      typeList: [
        {
          label: '科室',
          value: 1
        },
        {
          label: '病区',
          value: 2
        }
      ],
      userTypeList: [
        {
          label: '其他',
          value: 0
        },
        {
          label: '医生',
          value: 1
        },
        {
          label: '护士',
          value: 2
        }
      ]
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  created() {
    this.id = this.$route.params.id
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    operationEvent0(row) {
      this.$router.push('/personnerTpos/personnelDetails/' + row.id)
    },
    operationEvent1(row) {
      this.$confirm('是否启用?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        updateStatus({ id: row.id, status: 1 }).then((res) => {
          if (res.data.code === 200) {
            this.$message({
              type: 'success',
              message: '启用成功'
            })
            this.handleFilter()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消启用'
        })
      })
    },
    operationEvent2(row) {
      this.$confirm('是否禁用?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        updateStatus({ id: row.id, status: 0 }).then((res) => {
          if (res.data.code === 200) {
            this.$message({
              type: 'success',
              message: '禁用成功'
            })
            this.handleFilter()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消禁用'
        })
      })
    },
    operationEvent3(row) {
      resetPass({ id: row.id }).then(res => {
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '重置密码成功'
          })
        }
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
        this.totalList1 = parseInt(res.data.total)
      })
    },
    searchBtn() {
      this.listQuery.page = 1
      this.handleFilter()
    },
    // 人员提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const query = Object.assign({}, this.personnelForm)
          query.roles = query.roles.join(',')
          save(query).then(res => {
            if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: '人员新增成功'
              })
              this.handleFilter()
              this.$refs['personnelForm'].resetFields()
              this.personnelVisible = false
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 科室提交
    submitFormDe(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const query = Object.assign({}, this.departmentForm)
          if (query.id) {
            updateDepartment(query).then(res => {
              if (res.data.code === 200) {
                this.$message({
                  type: 'success',
                  message: '部门编辑成功'
                })
                this.getDepartmentList()
                this.departmentVisible = false
              }
            })
          } else {
            createDepartment(query).then(res => {
              if (res.data.code === 200) {
                this.$message({
                  type: 'success',
                  message: '部门新增成功'
                })
                this.getDepartmentList()
                this.departmentVisible = false
              }
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 所有角色
    getRoleList() {
      getRoleSelect().then(res => {
        if (res.data.code === 200) {
          this.createNameList = res.data.list
        }
      })
    },
    // 新增人员
    newlyIncreased() {
      this.personnelForm = Object.assign({}, deUser)
      this.personnelVisible = true
      this.personnelTitle = '新增人员'
    },
    // 新增科室
    newlySection() {
      if (this.administrative) {
        if (this.administrative.level === 2) {
          this.$message({
            type: 'warning',
            message: '不可新增第四级科室'
          })
        } else {
          this.departmentForm = {
            name: '',
            type: null,
            parentId: this.administrative.id,
            parentName: this.administrative.name
          }
          this.departmentVisible = true
          this.departmentTitle = '新增科室'
        }
      } else {
        this.$message({
          type: 'warning',
          message: '请选中要新增的科室'
        })
      }
    },
    // 编辑科室
    editDepartment() {
      if (this.administrative) {
        if (this.administrative.id === 0) {
          this.$message({
            type: 'warning',
            message: '一级科室不可编辑'
          })
        } else {
          this.departmentForm = {
            name: this.administrative.name,
            parentId: this.administrative.parentId,
            parentName: this.administrative.parentName,
            id: this.administrative.id,
            type: this.administrative.type
          }
          this.departmentVisible = true
          this.departmentTitle = '编辑科室'
        }
      } else {
        this.$message({
          type: 'warning',
          message: '请选中要编辑的科室'
        })
      }
    },
    // 部门点击选中
    departmentClick(item, index) {
      this.sectionForm = item
      this.pitchOn = index
    },
    // 获取所有科室
    getDepartmentList() {
      getDepartmentList().then(res => {
        this.$nextTick(function() {
          this.departmentList = [{
            id: 0,
            name: this.hospital,
            children: res.data.trees
          }]
          this.treeLoading = false
        })
      })
    },
    // 选择科室列表
    getDepartmentSelect() {
      getDepartmentSelect().then(res => {
        this.departmentSelect = res.data.list
        this.getDepartmentList()
      })
    },
    // 科室选择
    handleNodeClick(data) {
      this.administrative = data
      if (this.administrative.parentId === 0) {
        this.administrative.parentName = this.hospital
      }
      if (data.id === 0) {
        this.filter.deptIds = ''
      } else {
        this.filter.deptIds = data.id
      }
      this.handleFilter()
    },
    handleCheckChange(data, checked, indeterminate) {},
    // 人员关闭
    personnelClose() {
      this.personnelVisible = false
    },
    // 科室关闭
    departmentClose() {
      this.departmentVisible = false
    }
  }
}
</script>
<style lang="scss" scoped>
.lg_personnerTpos {
  width: 100%;
  height: 100%;
  background-color: #fff;
  overflow: auto;
  .el-container {
    height: 100%;
    overflow: auto;
    .el-aside {
      width: 240px !important;
      height: 100%;
      padding: 0 10px;
      .addSection {
        text-align: center;
        padding-bottom: 10px;
        border-bottom: 1px solid #eee;
        margin-top: 10px;
        display: flex;
        justify-content: space-around;
      }
      .sectionList {
        padding: 10px 10px 0;
        .sectionItem {
          height: 40px;
          line-height: 40px;
          cursor: pointer;
          display: flex;
          justify-content: flex-start;
          &.active {
            .sectionName {
              background-color: rgba(28, 192, 159, 0.47);
              color: #fff;
            }
          }
          .svgFont {
            display: inline-block;
            font-size: 20px;
            margin-right: 5px;
          }
          .sectionName {
            color: #666;
            padding: 3px 5px;
            font-size: 12px;
            line-height: 16px;
            height: 22px;
            margin-top: 10px;
          }
        }
      }
    }
    .el-main {
      padding: 0;
      border-left: 1px dashed #eee;
      .includeRole {
        padding: 0 10px;
        .includeRoleTop {
          padding: 0 0 10px;
          border-bottom: 1px solid #eee;
        }
      }
    }
  }
  .svgSize {
    font-size: 32px;
    margin-right: 10px;
  }
  .contractImg {
    width: 40px;
    height: 40px;
    display: inline-block;
    margin-right: 10px;
  }
}
</style>
<style lang="scss">
/* elementUI默认样式修改 */
.includeRole {
  #fex {
    display: inline-block;
    .el-select > .el-input {
      width: 165px !important;
      &:after {
        content: "性别 :";
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
  }
  #status {
    display: inline-block;
    .el-select > .el-input {
      width: 185px !important;
      &:after {
        content: "账号状态 :";
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
}
#department {
  .el-tree-node__content {
    font-size: 14px;
    height: 26px;
    font-weight: 400;
  }
  .el-tree-node.is-current > .el-tree-node__content {
    color: rgba(255, 255, 255, 1);
    background-color: rgba(24, 144, 255, 1);
    &:hover {
      color: rgba(255, 255, 255, 1);
      background-color: rgba(24, 144, 255, 1);
    }
  }
}
</style>
