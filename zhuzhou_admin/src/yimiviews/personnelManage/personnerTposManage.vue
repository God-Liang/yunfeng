<template>
  <div class="lg_wrap">
    <div class="lg_personnerTpos">
      <el-container>
        <el-aside>
          <div class="addSection">
            <el-button
              size="small"
              style="background-color: rgba(255, 89, 24, 1);border-color:rgba(255, 89, 24, 1);color:#fff;"
              @click="newlySection"
            >+ 新增部门</el-button>
          </div>
          <div class="sectionList">
            <div class="sectionItem">
              <div class="svgFont">
                <svg-icon class-name="international-icon" icon-class="section"/>
              </div>
              <span class="sectionName">蒋村社区卫生服务中心</span>
            </div>
          </div>
        </el-aside>
        <el-main>
          <div class="includeRole">
            <div class="includeRoleTop">
              <span>{{hospitalName}}</span>
              <div id="status">
                <el-select size="small" v-model="signedStatus" style="margin-right:10px;margin-top:10px;">
                  <el-option
                    v-for="item in statusList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
              <div id="fex">
                <el-select size="small" v-model="fex" style="margin-right:10px;margin-top:10px;">
                  <el-option
                    v-for="item in fexList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
              <el-input
                size="small"
                v-model="keyword"
                placeholder="用户名/手机号/真实姓名"
                style="width:230px;margin-right:10px;margin-top:10px;"
              ></el-input>
              <el-button
                size="small"
                type="primary"
                style="margin-right:10px;background-color: #1cc09f;border-color:#1cc09f;margin-top:10px;"
                @click="searchBtn"
              >搜索</el-button>
              <el-button
                size="small"
                style="background-color: rgba(255, 89, 24, 1);border-color:rgba(255, 89, 24, 1);color:#fff;margin:10px 0 0 0;"
                @click="newlyIncreased"
              >+ 新增人员</el-button>
            </div>
            <complex-table
              :columnsLabel='"序号"'
              :columnsType='"index"'
              :list="tableList1"
              :totalList="totalList1"
              :theadList="personnerTposManageConst.theadList1"
              :operationButtons="personnerTposManageConst.operationButtons1"
              :statusArr="personnerTposManageConst.statusArr"
              @operationEvent0="operationEvent0"
              @getListByPagination="getListByPagination"
            ></complex-table>
          </div>
        </el-main>
      </el-container>
      <div class="addpersonner" v-if="personnerTage">
        <div class="bg"></div>
        <div class="personnerBox">
          <div class="personnerTop" v-if="sectionTopTage">
            <h5>新增部门</h5>
            <i class="el-icon-close" @click="roleClick"></i>
          </div>
          <div class="personnerTop" v-if="personnelTopTage">
            <h5>新增人员</h5>
            <i class="el-icon-close" @click="roleClick"></i>
          </div>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size='small' v-if="ruleFormTage">
            <el-form-item label="头像：" style="width:450px;">
              <img v-if="ruleForm.avatar" :src="ruleForm.avatar" alt class="contractImg">
              <div v-else class="svgSize">
                <svg-icon
                  class-name="international-icon"
                  class="avatar right_menu_item"
                  icon-class="contractLogo"
                />
              </div>
            </el-form-item>
            <el-form-item label="部门名称：" prop="departmentName" style="width:450px;">
              <el-select v-model="ruleForm.departmentName" placeholder="请选择活动区域" style="width:350px;">
                <el-option label="部门一" value="1"></el-option>
                <el-option label="部门二" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="用户名：" prop="userName" style="width:450px;">
              <el-input v-model="ruleForm.userName"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名：" prop="realName" style="width:450px;">
              <el-input v-model="ruleForm.realName"></el-input>
            </el-form-item>
            <el-form-item label="性别：" style="width:280px;">
              <el-radio-group v-model="ruleForm.gender">
                <el-radio label="男" value='男'></el-radio>
                <el-radio label="女" value='女'></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="手机号码：" style="width:450px;">
              <el-input v-model="ruleForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：" style="width:450px;">
              <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>
            <el-form-item label="出生日期：" style="width:450px;">
              <el-date-picker
                v-model="ruleForm.time"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="" style="width:450px;">
              <el-radio v-model="ruleForm.default" label="1">系统默认密码：888888</el-radio>
            </el-form-item>
            <el-form-item style="text-align:right;width: 100%;padding: 20px;position: absolute;bottom: 0px;right: 0px;margin: 0;border-top: 1px solid #eee;">
              <el-button @click="closeForm">取消</el-button>
              <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
            </el-form-item>
          </el-form>
          <el-form :model="sectionForm" :rules="sectionRules" ref="sectionForm" label-width="100px" class="demo-ruleForm" size='small' v-if="sectionFormTage">
            <el-form-item label="上级部门：" prop="superiorSection" style="width:450px;">
              <el-select v-model="sectionForm.superiorSection" placeholder="请选择上级部门" style="width:350px;">
                <el-option label="部门一" value="1"></el-option>
                <el-option label="部门二" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="部门名称：" prop="departmentName" style="width:450px;">
              <el-input v-model="sectionForm.departmentName" placeholder="部门名称不得超过20字符"></el-input>
            </el-form-item>
            <el-form-item style="text-align:right;width: 100%;padding: 20px;position: absolute;bottom: 0px;right: 0px;margin: 0;border-top: 1px solid #eee;">
              <el-button @click="closeForm">取消</el-button>
              <el-button type="primary" @click="submitForm('sectionForm')">确认</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import complexTable from '@/views/table/complexTable'
import { personnerTposManageConst } from '@/yimiviews/personnelManage/columnsConst'
export default {
  components: {
    complexTable
  },
  mounted() {
    this.tableList1 = [
      {
        id: 0,
        status: 0,
        name: 'ayq',
        zname: '超级管理员',
        fex: '男',
        phone: '18427845',
        bm: '部门',
        time: '2018-11-12 12：10：22'
      },
      {
        id: 1,
        status: 1,
        name: 'zhangsan',
        zname: '张三',
        fex: '男',
        phone: '18427845',
        bm: '部门',
        time: '2018-11-12 12：10：22'
      },
      {
        id: 1,
        status: 0,
        name: 'lisi',
        zname: '李四',
        fex: '男',
        phone: '18427845',
        bm: '部门',
        time: '2018-11-12 12：10：22'
      }
    ]
  },
  data() {
    return {
      ruleForm: {
        departmentName: '',
        userName: '',
        gender: '',
        realName: '',
        phone: '',
        email: '',
        time: '',
        default: '1'
      },
      rules: {
        userName: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        departmentName: [{ required: true, message: '请选择部门名称', trigger: 'change' }],
        realName: [
          { required: true, message: '真实姓名不能为空', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      sectionForm: {
        superiorSection: '',
        departmentName: ''
      },
      sectionRules: {
        superiorSection: [{ required: true, message: '请选择上级部门', trigger: 'change' }],
        departmentName: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          { max: 20, message: '部门名称不得超过20字符', trigger: 'blur' }
        ]
      },
      ruleFormTage: false,
      sectionFormTage: false,
      personnerTage: false,
      sectionTopTage: false,
      personnelTopTage: false,
      personnerTposManageConst,
      tableList1: [],
      totalList1: 4,
      listQuery: {
        page: 1, // 默认第一页
        limit: 10 // 默认一次展示十条
      },
      filter: {},
      id: '',
      activeIndex: '1',
      checkList: [],
      keyword: '',
      hospitalName: '蒋村社区卫生服务中心',
      signedStatus: '全部',
      statusList: [
        {
          value: '0',
          label: '全部'
        },
        {
          value: '1',
          label: '启用'
        },
        {
          value: '2',
          label: '停用'
        }
      ],
      fex: '全部',
      fexList: [
        {
          value: '0',
          label: '全部'
        },
        {
          value: '1',
          label: '男'
        },
        {
          value: '2',
          label: '女'
        },
        {
          value: '3',
          label: '不详'
        }
      ]
    }
  },
  created() {
    this.id = this.$route.params.id
  },
  methods: {
    operationEvent0(row) {
      this.$router.push('/personnerTpos/personnelDetails/' + row.id)
    },
    getListByPagination(listQuery) {
      this.listQuery = listQuery
      this.handleFilter()
    },
    searchBtn() { },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    roleClick() {
      this.personnerTage = false
      this.ruleFormTage = false
      this.personnelTopTage = false
      this.sectionFormTage = false
      this.sectionTopTage = false
    },
    closeForm() {
      this.personnerTage = false
      this.ruleFormTage = false
      this.personnelTopTage = false
      this.sectionFormTage = false
      this.sectionTopTage = false
    },
    newlyIncreased() {
      this.personnerTage = true
      this.ruleFormTage = true
      this.personnelTopTage = true
    },
    newlySection() {
      this.personnerTage = true
      this.sectionFormTage = true
      this.sectionTopTage = true
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
      width: 200px !important;
      height: 100%;
      padding: 0 10px;
      .addSection {
        text-align: center;
        padding-bottom: 10px;
        border-bottom: 1px solid #eee;
        margin-top: 10px;
      }
      .sectionList {
        padding: 10px 10px 0;
        .sectionItem {
          height: 40px;
          line-height: 40px;
          display: flex;
          justify-content: flex-start;
          .svgFont {
            display: inline-block;
            font-size: 20px;
            margin-right: 5px;
          }
          .sectionName {
            color: #fff;
            background-color: rgba(28, 192, 159, 0.47);
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
          > span {
            font-size: 14px;
            color: #333;
            margin-right: 10px;
          }
        }
      }
    }
  }
  .addpersonner {
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
    .personnerBox {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      width: 760px;
      height: 750px;
      background-color: #fff;
      .personnerTop {
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
      .demo-ruleForm{
        padding: 50px 100px;
      }
    }
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
  #status {
    display: inline-block;
    .el-select > .el-input {
      width: 185px !important;
      &:after {
        content: "账号状态 :";
        height: 32px;
        line-height: 32px;
        position: absolute;
        top: 0;
        left: 20px;
      }
      .el-input__inner {
        padding-left: 80px !important;
      }
    }
  }
}
.lg_personnerTpos {
  .el-pagination {
    display: none;
  }
  .app-container {
    padding: 10px 0 0;
  }
}
</style>