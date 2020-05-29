<template>
  <div class="lg_wrap">
    <div class="lg_personnelDetails">
      <div class="roleTop">
        <h5>人员详情</h5>
        <el-button v-if="!isEidt" @click="editRole" size="small" type="primary">编辑</el-button>
        <div v-else>
          <el-button @click="submit" size="small" type="success">保存</el-button>
          <el-button @click="isEidt=false;getUserRead()" size="small" type="info">取消</el-button>
        </div>
      </div>
      <div class="roleBox">
        <div class="roleMessage">
          <div class="roleStatus" v-if="!isEidt">
            <span>{{roleForm.name}}</span>
            <i v-if="roleForm.status === 1">启用中</i>
            <i v-else style="background-color:red;">已禁用</i>
            <span>头像：</span>
            <img v-if="roleForm.avatar" :src="roleForm.avatar" alt class="contractImg">
            <div v-else class="svgSize">
              <svg-icon
                class-name="international-icon"
                class="avatar right_menu_item"
                icon-class="contractLogo"
              />
            </div>
          </div>
          <div class="roleCon">
            <div class="fifty">
              <span class="title">用户名 :</span>
              <span v-if="!isEidt">{{roleForm.name}}</span>
              <el-input v-else style="width:220px;" v-model="roleForm.name"></el-input>
            </div>
            <div class="fifty">
              <span class="title">真实姓名 :</span>
              <span v-if="!isEidt">{{roleForm.nick}}</span>
              <el-input style="width:220px;" v-else v-model="roleForm.nick"></el-input>
            </div>
            <div class="fifty">
              <span class="title">创建人 :</span>
              <span>{{roleForm.createName}}</span>
            </div>
            <div class="fifty">
              <span class="title">创建时间 :</span>
              <span>{{roleForm.createTime | fmtYMD}}</span>
            </div>
            <div class="fifty">
              <span class="title">手机 :</span>
              <span v-if="!isEidt">{{roleForm.phone}}</span>
              <el-input v-else style="width:220px;" v-model="roleForm.phone"></el-input>
            </div>
            <div class="fifty">
              <span class="title">邮箱 :</span>
              <span v-if="!isEidt">{{roleForm.email}}</span>
              <el-input v-else style="width:220px;" v-model="roleForm.email"></el-input>
            </div>
            <div class="fifty">
              <span class="title">出生日期 :</span>
              <span v-if="!isEidt">{{roleForm.birthday | fmtYMD}}</span>
              <el-date-picker
                v-else
                value-format="yyyy-MM-dd HH:mm:ss"
                v-model="roleForm.birthday"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </div>
            <div class="fifty">
              <span class="title">性别 :</span>
              <span v-if="!isEidt">{{roleForm.sexShow}}</span>
              <dict-select v-else v-model="roleForm.sex" placeholder="请选择性别" style='width: 220px' dict-code="xb"></dict-select>
            </div>
            <div class="fifty">
              <span class="title">科室 :</span>
              <span v-if="!isEidt">{{roleForm.departName}}</span>
              <el-select v-else v-model="roleForm.departId" placeholder="请选择科室名称" style="width:220px;">
                <el-option
                  v-for="item in departmentSelect"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </div>
            <div class="fifty">
              <span class="title">角色 :</span>
              <span v-if="!isEidt">{{userRolesShow}}</span>
              <el-select
                v-else
                style="width: 220px;"
                v-model="userRoles"
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
            </div>
            <div class="fifty">
              <span class="title">职称 :</span>
              <span v-if="!isEidt">{{roleForm.titleShow}}</span>
              <dict-select v-else v-model="roleForm.title" placeholder="请选择医生职称" style='width: 220px' dict-code="yszc"></dict-select>
            </div>
            <div class="fifty">
              <span class="title">用户类型 :</span>
              <span v-if="!isEidt">{{roleForm.type | typeFilter}}</span>
              <el-select v-else v-model="roleForm.type" placeholder="请选择用户类型" style="width:350px;">
                <el-option
                  v-for="item in userTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <div class="fifty">
              <el-checkbox v-model="roleForm.flag" v-if="!isEidt" disabled :true-label="1" :false-label="0">手术医生</el-checkbox>
              <el-checkbox v-model="roleForm.flag" v-else :true-label="1" :false-label="0">手术医生</el-checkbox>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dictSelect from '@/views/form/dictSelect'
import { getUserRoles, userRead, save, getDepartmentSelect } from '@/api/systemManage/user'
import { getRoleSelect } from '@/api/systemManage/role'
export default {
  components: {
    dictSelect
  },
  mounted() {
    this.getDepartmentSelect()
    this.getUserRead()
  },
  data() {
    return {
      id: '',
      checkList: [],
      keyword: '',
      avatar: '',
      userRoles: [],
      userRolesShow: '',
      roleForm: {},
      createNameList: [],
      departmentSelect: [],
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
      ],
      roleQuery: {
        page: 1,
        limit: 9999999
      },
      isEidt: false
    }
  },
  created() {
    if (this.$route.params.id) {
      this.id = this.$route.params.id
    }
  },
  filters: {
    typeFilter(name) {
      if (name) {
        let value = ''
        const userTypeList = [
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
        userTypeList.forEach(v => {
          if (v.value === name) {
            value = v.label
          }
        })
        return value
      }
    }
  },
  methods: {
    getUserRoles() {
      const query = { id: this.id }
      getUserRoles(query).then(res => {
        if (res.data.code === 200) {
          this.userRoles = res.data.role
        }
        this.getRoleList()
      })
    },
    getUserRead() {
      userRead(this.id).then(res => {
        if (res.data.code === 200) {
          this.roleForm = res.data.user
          this.getUserRoles()
        }
      })
    },
    editRole() {
      if (this.userRoles.indexOf(2) > -1) {
        this.$message({
          message: '超级管理员不可编辑',
          type: 'warning'
        })
        return false
      }
      this.isEidt = true
    },
    getRoleList() {
      getRoleSelect().then((res) => {
        if (res.data.code === 200) {
          this.createNameList = res.data.list
          const userRolesShow = []
          if (this.createNameList.length > 0 && this.userRoles) {
            this.userRoles.forEach(v => {
              if (v === 2) {
                userRolesShow.push('超级管理员')
              } else {
                userRolesShow.push(this.createNameList.find(k => k.id === v).title)
              }
            })
            this.userRolesShow = userRolesShow.length > 0 ? userRolesShow.join('、') : ''
          } else {
            this.userRolesShow = ''
          }
        }
      })
    },
    submit() {
      if (this.roleForm.name === '' && !this.roleForm.name) {
        this.$message({
          message: '用户名不能为空',
          type: 'warning'
        })
        return false
      }
      if (this.roleForm.nick === '' && !this.roleForm.nick) {
        this.$message({
          message: '真实姓名不能为空',
          type: 'warning'
        })
        return false
      }
      if (this.roleForm.phone === '' && !this.roleForm.phone) {
        this.$message({
          message: '手机号不能为空',
          type: 'warning'
        })
        return false
      }
      const reg = /^1\d{10}$/
      if (!reg.test(this.roleForm.phone)) {
        this.$message({
          message: '请输入正确的手机号',
          type: 'warning'
        })
        return false
      }
      if (this.userRoles.length > 0) {
        const data = Object.assign({}, this.roleForm)
        data.roles = this.userRoles.join(',')
        save(data).then((res) => {
          if (res.data.code === 200) {
            this.isEidt = false
            this.$message({
              message: '恭喜你，提交成功!',
              type: 'success'
            })
            this.getUserRead()
          } else {
            this.$message({
              message: res.data.msg,
              type: 'error'
            })
          }
        })
      } else {
        this.$message({
          message: '角色不能为空',
          type: 'warning'
        })
      }
    },
    // 选择部门列表
    getDepartmentSelect() {
      getDepartmentSelect().then(res => {
        this.departmentSelect = res.data.list
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.lg_personnelDetails {
  width: 100%;
  height: 100%;
  background-color: #fff;
  overflow: auto;
  .roleTop {
    height: 50px;
    line-height: 50px;
    padding: 0 15px;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    h5 {
      font-size: 14px;
      color: #333;
      margin: 0;
      font-weight: normal;
    }
    .el-button{
      line-height: 10px;
      height: 30px;
      margin-top: 10px;
      span{
        line-height: 30px;
      }
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
        height: 40px;
        line-height: 40px;
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
          margin-right: 20px;
          font-size: 12px;
          line-height: 20px;
        }
        .contractImg {
          width: 40px;
          height: 40px;
          display: inline-block;
          margin-left: 10px;
          vertical-align: middle;
        }
        .svgSize{
          font-size: 32px;
          margin-left: 10px;
          display: inline-block;
          vertical-align: middle;
        }
      }
      .roleCon {
        margin: 10px 0 0 50px;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        .fifty {
          width: 50%;
          margin-bottom: 10px;
          .title {
            display: inline-block;
            width: 60px;
          }
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
        .el-form {
          border-top: 1px solid #ccc;
          border-left: 1px solid #ccc;
          .el-form-item {
            border-right: 1px solid #ccc;
            border-bottom: 1px solid #ccc;
            padding: 10px 40px;
            margin-bottom: 0;
            .el-form-item__content {
              span {
                font-weight: bold;
              }
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
                  color: #333;
                }
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
.lg_personnelDetails{
  .pagination-container{
    display: none;
  }
}
.lg_personnelDetails {
  .el-checkbox {
    .el-checkbox__label {
      font-size: 12px;
      color: #333;
      font-weight: normal;
    }
  }
}
</style>
