<template>
  <div class="lg_wrap">
    <div class="lg_contract">
      <div class="roleTop">
        <h5>角色管理</h5>
      </div>
      <div class="roleBox">
        <div class="roleMessage">
          <div class="roleStatus">
            <span>{{roleForm.title}}</span>
            <i v-if="roleForm.status ===  1">启用中</i>
            <i v-else style="background-color:red;">已停用</i>
          </div>
          <div class="roleCon">
            <div class="roleType">
              <span>角色类型 :</span>
              <span>{{roleForm.typeShow}}</span>
            </div>
            <div class="creator">
              <span>创建人 :</span>
              <span>{{roleForm.createName}}</span>
            </div>
            <div class="createTime">
              <span>创建时间 :</span>
              <span>{{roleForm.createTime}}</span>
            </div>
          </div>
        </div>
        <div class="details">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
          >
            <el-menu-item index="1">此角色包含功能权限</el-menu-item>
            <el-menu-item index="2">此角色包含用户</el-menu-item>
          </el-menu>
          <div class="detailsBox">
            <div class="includeJurisdiction" v-if="includeJurisdictionTage">
              <div class="roleSelect">
                <ul>
                  <li v-for="(item, index) in permissionsDataAll" :key="index">
                    <h3>{{item.title}}</h3>
                    <el-row>
                      <el-col :span="24" v-for="(value, key) in item.children" :key="key">
                        {{value}}
                      </el-col>
                    </el-row>
                  </li>
                </ul>
              </div>
            </div>
            <div class="includeRole" v-if="includeRoleTage">
              <div class="includeRoleTop">
                <el-select
                  size="small"
                  v-model="filter.status"
                  clearable
                  style="margin-right:25px;"
                  id="status"
                >
                  <el-option
                    v-for="item in statusList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-input
                  size="small"
                  v-model="filter.keyWord"
                  placeholder="用户名/手机号/真实姓名"
                  style="width:230px;margin-right:15px;"
                ></el-input>
                <el-button
                  size="small"
                  type="primary"
                  style="margin-right:10px;background-color: #1cc09f;border-color:#1cc09f;"
                  @click="searchBtn"
                >搜索</el-button>
              </div>
              <complex-table
                columnsLabel="序号"
                columnsType="index"
                :list="tableList1"
                :totalList="totalList1"
                :theadList="roleDetailsConst.theadList1"
                :operationButtons="roleDetailsConst.operationButtons1"
                :statusArr="roleDetailsConst.statusArr"
                @operationEvent0="operationEvent0"
                @operationEvent1="operationEvent1"
                @getListByPagination="getListByPagination"
              ></complex-table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import complexTable from '@/views/table/complexTable'
import { roleDetailsConst } from '@/yimiviews/systemManage/columnsConst'
import { read, getRoleUsers, roleRemovePer, getPermissionsByRoleId } from '@/api/systemManage/role'
import { getPermissionList } from '@/api/systemManage/permission'
export default {
  components: {
    complexTable
  },
  mounted() {
    this.id = this.$route.params.id
    if (this.id) {
      read(this.id).then(res => {
        this.roleForm = res.data.info
        this.roleForm.typeShow = this.roleTypeList.find(i => i.value === this.roleForm.type).label
      })
      this.getRoleUsers()
    }
    this.getPermissionsByRoleId(this.$route.params.id)
  },
  data() {
    return {
      roleDetailsConst,
      tableList1: [],
      totalList1: 4,
      listQuery: {
        page: 1, // 默认第一页
        limit: 10 // 默认一次展示十条
      },
      filter: {
        status: null,
        keyWord: ''
      },
      id: '',
      activeIndex: '1',
      includeJurisdictionTage: true, // 此角色包含功能权限
      includeRoleTage: false, // 此角色包含用户
      ruleForm: {},
      checkList: [],
      statusList: [{
        value: 1,
        label: '启用'
      },
      {
        value: 0,
        label: '停用'
      }],
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
      query: {
        permission: {}
      },
      roleForm: {},
      expandedKeys: [],
      permissionsAll: [], // 所有权限
      permissionIds: [], // 当前角色权限
      permissionsDataAll: []
    }
  },
  methods: {
    // 所有权限
    getPermissionList() {
      getPermissionList(this.query).then(res => {
        if (res.data.code === 200) {
          this.permissionsAll = res.data.value
          // this.data2 = this.handlePermissionList(res.data.value)
          this.handlePermissionList(this.permissionsAll)
        }
      })
    },
    // 获取当前角色的权限
    getPermissionsByRoleId(roleId) {
      getPermissionsByRoleId({ roleId: roleId }).then(res => {
        this.permissionIds = res.data.value
        this.getPermissionList()
      })
    },
    handlePermissionList(data) {
      const permissionData = []
      const permissionParentTitle = []
      let permissionParentIds = []
      // 通过权限id获取父id及对应的数据
      this.permissionIds.forEach(v1 => {
        data.forEach(v2 => {
          if (v1 === v2.id) {
            permissionParentIds.push(v2.parentId)
            permissionData.push(v2)
          }
        })
      })
      // 父ID去重
      permissionParentIds = Array.from(new Set(permissionParentIds))
      // 获取父ID的title
      permissionParentIds.forEach(v3 => {
        data.forEach(v4 => {
          if (v3 === v4.id) {
            permissionParentTitle.push(v4.title)
          }
        })
      })
      const permissionsDataAll = []
      permissionParentIds.forEach((v5, index) => {
        const obj = {
          title: permissionParentTitle[index],
          children: []
        }
        permissionData.forEach(v6 => {
          if (v5 === v6.parentId) {
            obj.children.push(v6.title)
          }
        })
        permissionsDataAll.push(obj)
      })
      this.permissionsDataAll = permissionsDataAll
    },
    // 查看
    operationEvent0(row) {
      this.$router.push('/personnerTpos/personnelDetails/' + row.id)
    },
    // 移除
    operationEvent1(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const query = {
          userId: row.id,
          roleId: this.id
        }
        roleRemovePer(query).then(res => {
          this.$message({
            type: 'success',
            message: '移除成功'
          })
          this.getRoleUsers()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消移除'
        })
      })
    },
    getListByPagination(listQuery) {
      this.listQuery = listQuery
      this.getRoleUsers()
    },
    handleSelect(key, keyPath) {
      this.includeJurisdictionTage = key === '1'
      this.includeRoleTage = key === '2'
    },
    getRoleUsers() {
      const query = Object.assign({ id: this.id }, this.listQuery, this.filter)
      getRoleUsers(query).then(res => {
        this.tableList1 = res.data.list
        this.totalList1 = parseInt(res.data.total)
      })
    },
    searchBtn() {
      this.listQuery.page = 1
      this.getRoleUsers()
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
  .roleTop {
    height: 50px;
    line-height: 50px;
    padding: 0 15px;
    border-bottom: 1px solid #ccc;
    h5 {
      font-size: 14px;
      color: #333;
      margin: 0;
      font-weight: normal;
    }
  }
  .roleBox {
    padding: 0 50px;
    .roleMessage {
      margin-top: 20px;
      span {
        height: 30px;
        line-height: 30px;
        font-size: 12px;
        color: #333;
      }
      .roleStatus {
        span {
          font-size: 14px;
          color: #333;
        }
        i {
          font-style: normal;
          display: inline-block;
          padding: 3px 5px;
          background-color: rgba(28, 192, 159, 1);
          color: #fff;
          border-radius: 3px;
          margin-left: 10px;
          font-size: 12px;
        }
      }
      .roleCon {
        margin: 10px 0 0 50px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        div {
          width: 50%;
        }
      }
    }
    .details {
      margin-top: 30px;
      .el-menu--horizontal > .el-menu-item {
        font-size: 16px;
        &.is-active {
          color: #409eff;
        }
      }
      .roleSelect {
        margin-top: 10px;
        padding-bottom: 20px;
        overflow: scroll;
        ul {
          border: 1px solid #ccc;
          list-style: none;
          padding: 0;
          margin: 0;
          li {
            border-bottom: 1px solid #ccc;
            padding: 20px 40px;
            margin-bottom: 0;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            &:last-child{
              border-bottom: 0;
            }
            h3{
              color:#333;
              font-size: 14px;
              font-weight: bold;
              padding: 0;
              display: block;
              width: 120px;
              margin: 0;
            }
            .el-row{
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              .el-col{
                font-size: 14px;
                color:#333;
                margin: 8px 0;
              }
            }
          }
        }
      }
      .includeRole {
        margin-top: 10px;
      }
    }
  }
}
</style>
<style lang="scss">
/* elementUI默认样式修改 */
.includeRole {
  .includeRoleTop{
    padding-left: 20px;
  }
  .el-select > .el-input {
    width: 185px !important;
    &:after {
      content: "状态 :";
      height: 32px;
      line-height: 32px;
      position: absolute;
      top: 0;
      left: 20px;
    }
    .el-input__inner {
      padding-left: 60px !important;
    }
  }
}
</style>