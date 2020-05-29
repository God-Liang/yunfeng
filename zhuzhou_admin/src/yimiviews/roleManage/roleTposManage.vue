<template>
  <div class="lg_wrap">
    <div class="lg_contract">
      <div class="lg_transferTab">
        <div class="leftTab">
          <el-select v-model="roleType" class="roleType" style="margin-right:10px;margin-top:10px;" size="small">
            <el-option
              v-for="item in roleTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-select v-model="status" class="status" style="margin-right:10px;margin-top:10px;" size="small">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-input
            v-model="contractMessage"
            placeholder="角色名称"
            style="width:230px;margin-right:10px;margin-top:10px;"
            size="small"
          ></el-input>
          <el-button
            type="primary"
            style="background-color:#1cc09f;color: #fff;border-color: #42b983;margin-right:10px;margin-top:10px;"
            @click="searchBtn"
            size="small"
          >搜索</el-button>
        </div>
        <div class="rightTab">
          <span>
            <el-button
              style="background-color: rgba(255, 89, 24, 1);border-color:rgba(255, 89, 24, 1);color:#fff;margin-right:10px;margin-top:10px;"
              @click="addClick"
              size="small"
            >+ 新增角色</el-button>
          </span>
        </div>
      </div>
      <complex-table
        :columnsLabel='"序号"'
        :columnsType='"index"'
        :list="tableList1"
        :totalList="totalList1"
        :theadList="roleManageConst.theadList1"
        :operationButtons="roleManageConst.operationButtons1"
        :statusArr="roleManageConst.statusArr"
        @operationEvent0="operationEvent0"
        @getListByPagination="getListByPagination"
      ></complex-table>
    </div>
    <div class="addRoleBox" v-if="roleTage">
      <div class="bg"></div>
      <div class="addRole">
        <div class="roleTop">
          <h5>添加角色</h5>
          <i class="el-icon-close" @click="roleClick"></i>
        </div>
        <div class="roleSelect">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="角色名称：" prop="name" style="width:460px;margin-left: 75px;">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item>
              <el-checkbox
                :indeterminate="isIndeterminate.myDesk"
                v-model="checkAll.myDesk"
                @change="handleCheckAllChange1"
              >我的工作台</el-checkbox>
              <div style="margin: 15px 0;"></div>
              <el-checkbox-group
                v-model="checkedCities.myDesk"
                @change="handleCheckedCitiesChange1"
              >
                <el-checkbox v-for="city in cities.myDesk" :label="city" :key="city">{{city}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item>
              <el-checkbox
                :indeterminate="isIndeterminate.contract"
                v-model="checkAll.contract"
                @change="handleCheckAllChange2"
              >签约管理</el-checkbox>
              <div style="margin: 15px 0;"></div>
              <el-checkbox-group
                v-model="checkedCities.contract"
                @change="handleCheckedCitiesChange2"
              >
                <el-checkbox v-for="city in cities.contract" :label="city" :key="city">{{city}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item>
              <el-checkbox
                :indeterminate="isIndeterminate.transfer"
                v-model="checkAll.transfer"
                @change="handleCheckAllChange3"
              >转诊管理</el-checkbox>
              <div style="margin: 15px 0;"></div>
              <el-checkbox-group
                v-model="checkedCities.transfer"
                @change="handleCheckedCitiesChange3"
              >
                <el-checkbox v-for="city in cities.transfer" :label="city" :key="city">{{city}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item class="fontBlod">
              <el-checkbox-group
                v-model="checkedCities.subsequent"
                @change="handleCheckedCitiesChange4"
              >
                <el-checkbox label="复诊管理" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item class="fontBlod">
              <el-checkbox-group v-model="checkedCities.visit" @change="handleCheckedCitiesChange5">
                <el-checkbox label="患者随访" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item class="fontBlod">
              <el-checkbox-group v-model="checkedCities.role" @change="handleCheckedCitiesChange6">
                <el-checkbox label="角色管理" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item class="fontBlod">
              <el-checkbox-group
                v-model="checkedCities.personnel"
                @change="handleCheckedCitiesChange7"
              >
                <el-checkbox label="人员管理" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item class="fontBlod">
              <el-checkbox-group
                v-model="checkedCities.message"
                @change="handleCheckedCitiesChange8"
              >
                <el-checkbox label="消息管理" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item style="text-align: right;">
              <el-button @click="cancel()">取消</el-button>
              <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import complexTable from '@/views/table/complexTable'
import { roleManageConst } from '@/yimiviews/roleManage/columnsConst'
export default {
  components: {
    complexTable
  },
  mounted() {
    this.tableList1 = [
      {
        id: 0,
        status: 0,
        roleType: '预设角色',
        roleName: '管理员'
      },
      {
        id: 1,
        status: 1,
        roleType: '自定义角色',
        roleName: '随访人员'
      },
      {
        id: 2,
        status: 0,
        roleType: '自定义角色',
        roleName: '复诊管理员'
      }
    ]
    this.$store.commit('TOGGLE_LOADING', false)
  },
  data() {
    return {
      roleManageConst,
      tableList1: [],
      totalList1: 4,
      listQuery: {
        page: 1, // 默认第一页
        limit: 10 // 默认一次展示十条
      },
      filter: {},
      roleTypeList: [
        {
          value: '0',
          label: '全部'
        },
        {
          value: '1',
          label: '自定义角色'
        },
        {
          value: '2',
          label: ' 预定义角色'
        }
      ],
      roleType: '全部',
      options: [
        {
          value: '0',
          label: '全部'
        },
        {
          value: '1',
          label: '已通过'
        },
        {
          value: '2',
          label: '被解除'
        }
      ],
      status: '全部',
      contractMessage: '',
      inputName: '',
      ruleForm: {
        name: ''
      },
      rules: {
        name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }]
      },
      checkAll: {
        myDesk: false,
        contract: false,
        transfer: false
      },
      checkedCities: {
        myDesk: [],
        contract: [],
        transfer: [],
        subsequent: [],
        visit: [],
        role: [],
        personnel: [],
        message: []
      },
      isIndeterminate: {
        myDesk: false,
        contract: false,
        transfer: false
      },
      cities: {
        myDesk: ['我的首页'],
        contract: ['我的上级机构', '新签约审核'],
        transfer: ['上转登记', '下转接收', '我的病人']
      },
      roleTage: false
    }
  },
  methods: {
    // 按条件搜索
    searchBtn() { },
    // 新增角色
    addClick() {
      this.roleTage = true
    },
    operationEvent0(row) {
      this.$router.push(`/roleTpos/roleDetails/${row.id}`)
    },
    getListByPagination(listQuery) {
      this.listQuery = listQuery
      this.handleFilter()
    },
    // 关闭新增角色
    roleClick() {
      this.roleTage = false
    },
    // 确定
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.roleTage = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 取消
    cancel() {
      this.roleTage = false
    },
    handleCheckAllChange1(val) {
      this.checkedCities.myDesk = val ? this.cities.myDesk : []
      this.isIndeterminate.myDesk = false
    },
    handleCheckAllChange2(val) {
      this.checkedCities.contract = val ? this.cities.contract : []
      this.isIndeterminate.contract = false
    },
    handleCheckAllChange3(val) {
      this.checkedCities.transfer = val ? this.cities.transfer : []
      this.isIndeterminate.transfer = false
    },
    handleCheckedCitiesChange1(value) {
      const checkedCount1 = value.length
      this.checkAll.myDesk = checkedCount1 === this.cities.myDesk.length
      this.isIndeterminate.myDesk =
        checkedCount1 > 0 && checkedCount1 < this.cities.myDesk.length
    },
    handleCheckedCitiesChange2(value) {
      const checkedCount2 = value.length
      this.checkAll.contract = checkedCount2 === this.cities.contract.length
      this.isIndeterminate.contract =
        checkedCount2 > 0 && checkedCount2 < this.cities.contract.length
    },
    handleCheckedCitiesChange3(value) {
      const checkedCount3 = value.length
      this.checkAll.transfer = checkedCount3 === this.cities.transfer.length
      this.isIndeterminate.transfer =
        checkedCount3 > 0 && checkedCount3 < this.cities.transfer.length
    },
    handleCheckedCitiesChange4(value) { },
    handleCheckedCitiesChange5(value) { },
    handleCheckedCitiesChange6(value) { },
    handleCheckedCitiesChange7(value) { },
    handleCheckedCitiesChange8(value) { }
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
  .roleType > .el-input {
    width: 210px !important;
    &:after {
      content: "角色类型 :";
      height: 32px;
      line-height: 32px;
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
</style>