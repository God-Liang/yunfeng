<template>
  <div class="wrap">
    <div class="flexWrap">
      <div class="leftWrap">
        <div class="app-button-container">
          <el-button type="primary" @click="dialogLeftTop1_1_show()">新建手术</el-button>
          <el-button type="primary" @click="dialogLeftTop1_2_show()">随访设置</el-button>
          <el-button type="primary" @click="dialogLeftTop1_3_show()">医生设置</el-button>
          <el-button type="primary" @click="dialogLeftTop1_4_show()">生成随访计划</el-button>
        </div>
        <div class="filter-container">
          <div class="filterBox">
            <div class="leftPart filterPart"></div>
            <div class="rightPart filterPart">
              <el-input
                style="width: 220px;"
                class="filter-item"
                placeholder="请输入手术名称"
                v-model="filter.keywords"
              ></el-input>
              <el-button
                class="filter-item"
                type="primary"
                v-waves
                icon="el-icon-search"
                @click="getListBySearch"
              >搜索</el-button>
            </div>
          </div>
        </div>
        <complexTable
          :hasSelection="false"
          :list="tableList1"
          :totalList="totalList1"
          :theadList="operationDirectoryConst.theadList1"
          :operationButtons="operationDirectoryConst.operationButtons1"
          :statusArr="operationDirectoryConst.statusArr"
          :moreHasOperate="moreHasOperate"
          :hasOperate="hasOperate"
          @operationEvent0="operationEvent1_0"
          @operationEvent1="operationEvent1_1"
          @operationEvent2="operationEvent1_2"
          @operationEvent3="operationEvent1_3"
          @operationEvent4="operationEvent1_4"
          @getRowClick="getRowClick"
          @getListByPagination="getListByPagination"
        ></complexTable>
      </div>
      <div class="rightWrap">
        <category
          :data="filterData"
          classfiy="手术类型"
          @selectedType="selectedType"
          @searchKey="searchKey"
          :classLoading="classLoading"
        ></category>
      </div>
    </div>
    <el-dialog
      :title="dialogLeftTop1_1_title"
      :visible.sync="dialogLeftTop1_1"
      class="dialogLeftTop1_1"
    >
      <el-form ref="formLeftTop1" :rules="operationRules" :model="formLeftTop1" label-width="80px">
        <el-form-item label="手术类型" prop="type">
          <el-select v-model="formLeftTop1.type" placeholder="请选择手术类型">
            <el-option
              v-for="item in options"
              :label="item.label"
              :value="item.value"
              :key="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手术名称" prop="name">
          <el-input v-model="formLeftTop1.name"></el-input>
        </el-form-item>
        <el-form-item label="手术描述" prop="introduction">
          <div class="editor-container">
            <!-- <tinymce :height=400 ref="editor" v-model="formLeftTop1.introduction"></tinymce> -->
            <el-input v-model="formLeftTop1.introduction" type="textarea"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="宣教类型" prop="eduType">
          <dict-select
            v-model="formLeftTop1.eduType"
            placeholder="请选择宣教类型"
            dict-code="xjlx"
            @change="refreshEduRecord"
          ></dict-select>
        </el-form-item>
        <el-form-item label="宣教内容" prop="eduId">
          <el-select v-model="formLeftTop1.eduId" placeholder="请选择宣教内容">
            <el-option
              v-for="item in eduContents"
              :label="item.name"
              :value="item.id"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=" ">
          <el-checkbox v-model="formLeftTop1.flag" true-label="1" false-label="0">日间手术标志</el-checkbox>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogLeftTop1_1 = false">取 消</el-button>
        <el-button type="primary" @click="formLeftTop1_submit('formLeftTop1')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="手术简介预览" :visible.sync="previewShow" class="dialogLeftTop1_1">
      <el-row>
        <el-col>
          <div>
            <h3>手术名称：</h3>
            <p style="padding-left:20px;">{{previewData.name}}</p>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <div>
            <h3>手术类型：</h3>
            <p style="padding-left:20px;">{{previewData.type}}</p>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <div>
            <h3>手术简介：</h3>
            <p style="padding-left:20px;">{{previewData.introduction}}</p>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
    <el-dialog title="随访设置" width="850px" :visible.sync="dialogLeftTop1_2" class="dialogLeftTop1_2">
      <h2>手术信息</h2>
      <el-row :gutter="20" style="margin:0;padding:0 20px;">
        <el-col :span="12">
          <div>手术名称：{{surgeryInfo.name}}</div>
        </el-col>
        <el-col :span="12">
          <div>手术类别：{{surgeryInfo.typeShow}}</div>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin:0;padding:0 20px;">
        <el-col :span="12">
          <div>手术标识：{{surgeryInfo.flagShow}}</div>
        </el-col>
        <el-col :span="12">
          <div>启用标识：{{surgeryInfo.status === 0?'停用':'启用'}}</div>
        </el-col>
      </el-row>
      <hr>
      <h2>随访规则</h2>
      <el-form
        ref="formLeftTop2"
        :inline="true"
        :rules="formLeftTop2Rules"
        :model="formLeftTop2"
        label-width="100px"
      >
        <el-form-item label="随访人">
          <el-select
            v-model="formLeftTop2.followupUserId"
            placeholder="请选择随访人"
            style="width: 270px"
            filterable
            reserve-keyword
            :remote-method="getDoctor"
          >
            <el-option
              v-for="item in operateDoctorList"
              :label="item.nick"
              :value="item.id"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="随访次数">
          <el-input-number
            v-model="formLeftTop2.followNum"
            style="width: 250px"
            controls-position="right"
            :min="1"
            :max="50"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="首次随访时间" prop="firstFollow">
          <el-input
            v-model="formLeftTop2.firstFollow"
            auto-complete="off"
            style="width: 270px"
            placeholder="出院后第几天首次随访"
          >
            <template slot="append">天</template>
          </el-input>
        </el-form-item>
        <el-form-item label="随访间隔时间">
          <el-input-number
            v-model="formLeftTop2.followSpace"
            style="width: 160px"
            controls-position="right"
            :min="1"
            :max="50"
          ></el-input-number>
        </el-form-item>
        <el-form-item :label-width="'0'">
          <el-select v-model="formLeftTop2.timeUnit" style="width: 76px;" placeholder="">
            <el-option
              v-for="item in timeType"
              :label="item.label"
              :value="item.value"
              :key="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="有效天数" prop="validDay">
          <el-input v-model="formLeftTop2.validDay" auto-complete="off" style="width: 270px">
            <template slot="append">天</template>
          </el-input>
        </el-form-item> -->
        <br>
        <el-button class="ruleBtn" type="primary" @click="saveFollowRule('formLeftTop2')">保存</el-button>
      </el-form>
      <hr>
      <h2 style="padding-top: 20px;">随访表单</h2>
      <el-button
        style="position: absolute;right: 20px;margin-top:-30px;"
        type="primary"
        @click="dialogLeftTop1_2_1_show()"
      >选择表单</el-button>
      <complex-table
        :list="selForm.tableList2"
        :totalList="selForm.totalList2"
        :columnsType="'index'"
        :theadList="operationDirectoryConst.theadList2"
        :operationButtons="operationDirectoryConst.operationButtons2"
        @getListByPagination="getListByPagination2"
        @operationEvent0="delFollowForm"
      ></complex-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogLeftTop1_2 = false">取 消</el-button>
        <el-button type="primary" @click="dialogLeftTop1_2 = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="随访设置-选择表单" :visible.sync="dialogLeftTop1_2_1" class="dialogLeftTop1_2">
      <div class="filter-container">
        <div class="filterBox">
          <div class="leftPart filterPart"></div>
          <div class="rightPart filterPart">
            <el-input
              style="width: 220px;"
              class="filter-item"
              placeholder="请输入搜索条件"
              v-model="uSelect.filter.keywords"
            ></el-input>
            <el-button
              class="filter-item"
              type="primary"
              v-waves
              icon="el-icon-search"
              @click="getListBySearch3"
            >搜索</el-button>
          </div>
        </div>
      </div>
      <complex-table
        :list="uSelect.tableList3"
        :totalList="uSelect.totalList3"
        :theadList="operationDirectoryConst.theadList2"
        :hasOperate="false"
        @getSelectArr="getSelectArr"
        @getListByPagination="getListByPagination3"
      ></complex-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogLeftTop1_2_1 = false">取 消</el-button>
        <el-button type="primary" @click="addFollowForm()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="医生设置"
      :visible.sync="dialogLeftTop1_3"
      class="dialogLeftTop1_3"
      id="dialogLeftTop1_3"
    >
      <div style="text-align: center">
        <el-transfer
          style="text-align: left; display: inline-block"
          v-model="value3"
          filterable
          :left-default-checked="leftDefault"
          :right-default-checked="rightDefault"
          :render-content="renderFunc"
          :titles="['待选医生', '已选医生']"
          :button-texts="['到左边', '到右边']"
          :format="{
                    noChecked: '${total}',
                    hasChecked: '${checked}/${total}'
                }"
          @change="handleChange"
          :data="doctorList"
        ></el-transfer>
        <div slot="footer" class="dialog-footer" style="margin-top:20px;">
          <el-button @click="dialogLeftTop1_3 = false">取 消</el-button>
          <el-button type="primary" @click="formLeftTop3_submit()">保存</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves/index.js'
import Tinymce from '@/components/Tinymce'
import complexTable from '@/views/table/complexTable'
import category from 'yimiviews/components/category'
import { operationDirectoryConst } from '@/yimiviews/knowledgeManage/columnsConst'
import { userSelect } from '@/api/systemManage/user'
import { pending, postForm, remove, optDoctorSearch, optDoctorSave, operationFollowup, saveFollowupRule, selOperationForm, unSelOperationForm, addOperationForm, delOperationForm, getFollowupPlan } from '@/api/knowledgeManage/operationDirectory'
import { page as healthEduPage } from '@/api/knowledgeManage/healthPropaganda'
import { dictionary } from '@/api/knowledgeManage/dictionary'
import DictSelect from '@/views/form/dictSelect'
const defaultForm = {
  type: null,
  name: '',
  introduction: '',
  eduId: '',
  eduType: null,
  flag: 1
}
export default {
  directives: { waves },
  components: { category, complexTable, Tinymce, DictSelect },
  mounted() {
    this.initSelect()
    this.getDoctor(' ')
    this.getEduContents(' ')
  },
  data() {
    return {
      followupName: null,
      operateDoctorList: [], // 随访人列表
      moreHasOperate: true,
      hasOperate: false,
      dialogLeftTop1_1: false,
      previewShow: false,
      previewData: {},
      dialogLeftTop1_2: false,
      dialogLeftTop1_3: false,
      dialogLeftTop1_2_1: false,
      operationDirectoryConst,
      timeType: [
        { label: '天', value: 0 },
        { label: '周', value: 1 },
        { label: '月', value: 2 },
        { label: '年', value: 3 }
      ],
      surgeryInfo: {},
      tableList1: [],
      totalList1: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      filter: {
        type: '',
        keywords: ''
      },
      selForm: { // 已选择表单
        tableList2: [],
        totalList2: 0,
        listQuery: {
          page: 1,
          limit: 5
        },
        filter: {
          operationId: ''
        }
      },
      selectArr: [],
      uSelect: { // 未选择表单
        tableList3: [],
        totalList3: 0,
        listQuery: {
          page: 1,
          limit: 5
        },
        filter: {
          operationId: '',
          keywords: ''
        }
      },
      selectRow: null,
      dialogLeftTop1_1_title: '',
      formLeftTop1: Object.assign({}, defaultForm),
      formLeftTop2: {
        timeUnit: 0
      },
      formLeftTop3: {
        type: 'day'
      },
      value3: [],
      doctorList: [],
      options: [],
      eduContents: [],
      renderFunc(h, option) {
        return <span>{option.key} - {option.label}</span>
      },
      operationRules: {
        type: { required: true, message: '请选择手术类型', trigger: 'change' },
        name: { required: true, message: '请输入手术名称', trigger: 'blur' },
        introduction: { required: true, message: '请输入手术描述', trigger: 'blur' }
      },
      formLeftTop2Rules: {
        firstFollow: [{
          validator: (rule, value, callback) => {
            if (value !== '') {
              if ((/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/).test(value) === false) {
                callback(new Error('请填写大于等于0的数字'))
              } else {
                callback()
              }
            } else {
              callback()
            }
          },
          trigger: 'blur'
        }],
        validDay: [{
          validator: (rule, value, callback) => {
            if (value !== '') {
              if ((/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/).test(value) === false) {
                callback(new Error('请填写大于等于0的数字'))
              } else {
                callback()
              }
            } else {
              callback()
            }
          },
          trigger: 'blur'
        }]
      },
      filterData: [],
      classLoading: true,
      leftDefault: [],
      rightDefault: []
    }
  },
  methods: {
    selectedType(selected) {
      this.filter.type = selected.value
      this.handleFilter()
    },
    initSelect() {
      dictionary({ type: 'sslx' }).then((res) => {
        this.options = res.data.list
        this.filterData = res.data.list // 过滤数据
        this.filter.type = this.options[0].value
        this.classLoading = false
        this.handleFilter()
      })
    },
    // 输入框过滤
    searchKey(keyWord) {
      this.filterData = this.options.filter(v => v.label.indexOf(keyWord) > -1)
    },
    // 点击新建手术按钮
    dialogLeftTop1_1_show() {
      this.dialogLeftTop1_1_title = '新建'
      this.formLeftTop1 = Object.assign({}, defaultForm)
      this.getEduContents(this.formLeftTop1.eduType)
      this.formLeftTop1.flag = String(this.formLeftTop1.flag)
      this.dialogLeftTop1_1 = true
    },
    // 点击编辑按钮
    operationEvent1_0(row) {
      this.dialogLeftTop1_1_title = '编辑'
      this.formLeftTop1 = Object.assign({}, row)
      this.getEduContents(this.formLeftTop1.eduType)
      this.formLeftTop1.flag = String(this.formLeftTop1.flag)
      this.dialogLeftTop1_1 = !this.dialogLeftTop1_1
    },
    operationEvent1_1(row) {
      this.previewShow = true
      this.previewData = Object.assign({}, row)
      this.previewData.type = this.options.filter(v => v.value === this.previewData.type)[0].label
      // this.formLeftTop2 = row.description
    },
    // 点击删除按钮
    operationEvent1_2(row) {
      this.$confirm('此操作将永久删除该条信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        remove({ id: row.id }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.handleFilter()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 启用
    operationEvent1_3(row) {
      this.$confirm('是否启用?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        postForm({ id: row.id, status: 1 }).then((res) => {
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
    // 停用
    operationEvent1_4(row) {
      this.$confirm('是否禁用?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        postForm({ id: row.id, status: row.status === 0 ? 1 : 0 }).then((res) => {
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
    // 新建手术保存
    formLeftTop1_submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formLeftTop1.flag = parseInt(this.formLeftTop1.flag)
          postForm(this.formLeftTop1).then((res) => {
            this.dialogLeftTop1_1 = false
            this.$message({
              message: '恭喜你，提交成功!',
              type: 'success'
            })
            this.handleFilter()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 随访设置弹出框
    dialogLeftTop1_2_show() {
      if (!this.selectRow) {
        this.$message({
          type: 'warning',
          message: '请先选择一条数据'
        })
        return
      }
      operationFollowup({ operationId: this.selectRow.id }).then(res => {
        this.surgeryInfo = res.data.operation
        this.formLeftTop2 = Object.assign({}, res.data.followupRule)
      })
      this.selForm.filter.operationId = this.selectRow.id
      this.handleFilter2()
      this.dialogLeftTop1_2 = true
    },
    // 选择随访表单弹出框
    dialogLeftTop1_2_1_show() {
      this.uSelect.filter.operationId = this.selectRow.id
      this.uSelect.listQuery.page = 1
      this.handleFilter3()
      this.selectArr = []
      this.dialogLeftTop1_2_1 = true
    },
    // 保存随访规则
    saveFollowRule(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const followupArr = this.operateDoctorList.filter(v => v.id === this.formLeftTop2.followupUserId)
          this.formLeftTop2.followupUserName = followupArr === [] ? '' : followupArr[0].nick
          this.formLeftTop2.operationId = this.selectRow.id
          saveFollowupRule(this.formLeftTop2).then((res) => {
            this.$message({
              message: '恭喜你，提交成功!',
              type: 'success'
            })
          })
        } else {
          return false
        }
      })
    },
    // 获取选择数据
    getSelectArr(selectArr) {
      this.selectArr = selectArr
    },
    // 增加随访表单
    addFollowForm() {
      const formIds = []
      for (const i of this.selectArr) {
        formIds.push(i.id)
      }
      addOperationForm({ operationId: this.selectRow.id, formIds: formIds }).then(res => {
        this.dialogLeftTop1_2_1 = false
        this.handleFilter2()
      })
    },
    // 删除随访表单
    delFollowForm(row) {
      delOperationForm({ operationId: this.selectRow.id, followFormId: row.id }).then(res => {
        this.handleFilter2()
      })
    },
    // 医生设置弹出框
    dialogLeftTop1_3_show() {
      if (!this.selectRow) {
        this.$message({
          type: 'warning',
          message: '请先选择一条数据'
        })
        return
      } else {
        optDoctorSearch({ operationId: this.selectRow.id }).then(res => {
          this.doctorList = res.data.allList
          this.value3 = res.data.selList
          const doctorList = []
          this.doctorList.forEach(v => {
            doctorList.push(v.key)
          })
          this.value3.forEach(v => {
            if (doctorList.indexOf(v) > 0) {
              doctorList.splice(doctorList.indexOf(v), 1)
            }
          })
        })
        this.dialogLeftTop1_3 = true
      }
    },
    // 医生设置保存
    formLeftTop3_submit() {
      optDoctorSave({ operationId: this.selectRow.id, userIds: this.value3 }).then(res => {
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '医生设置成功'
          })
          this.dialogLeftTop1_3 = false
        }
      })
    },
    // 手术列表分页
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
    // 已选择表单分页
    getListByPagination2(listQuery) {
      this.selForm.listQuery = listQuery
      this.handleFilter2()
    },
    handleFilter2() {
      const query = Object.assign({}, this.selForm.listQuery, this.selForm.filter)
      selOperationForm(query).then(res => {
        this.selForm.tableList2 = res.data.list
        this.selForm.totalList2 = parseInt(res.data.total)
      })
    },
    // 未选择表单分页
    getListBySearch3() {
      this.uSelect.listQuery.page = 1
      this.handleFilter3()
    },
    getListByPagination3(listQuery) {
      this.uSelect.listQuery = listQuery
      this.handleFilter3()
    },
    handleFilter3() {
      const query = Object.assign({}, this.uSelect.listQuery, this.uSelect.filter)
      unSelOperationForm(query).then(res => {
        this.uSelect.tableList3 = res.data.list
        this.uSelect.totalList3 = parseInt(res.data.total)
      })
    },
    getRowClick(row, event, column) {
      this.selectRow = row
    },
    handleChange(value, direction, movedKeys) { },
    // 获取所有随访人
    getDoctor(query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          userSelect({ keyword: query.toLowerCase(), type: 2 }).then((res) => {
            this.loading = false
            this.operateDoctorList = res.data.list
          })
        }, 200)
      } else {
        this.operateDoctorList = []
      }
    },
    // 通过宣教类型获取宣教内容
    refreshEduRecord() {
      this.formLeftTop1.eduId = ''
      this.getEduContents(this.formLeftTop1.eduType)
    },
    getEduContents(type) {
      healthEduPage({
        page: 1,
        limit: 100,
        type: type
      }).then(res => {
        this.eduContents = res.data.list
      })
    },
    // 生成随访计划
    dialogLeftTop1_4_show() {
      getFollowupPlan().then(res => {
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '生成随访计划成功！'
          })
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
    // min-height: 500px;
    // margin: 0 0 30px;
    .editor-upload-btn-container {
      text-align: right;
      margin-right: 10px;
      .editor-upload-btn {
        display: inline-block;
      }
    }
    .el-textarea {
      textarea {
        resize: none;
        min-height: 100px !important;
      }
    }
  }
  .dialogLeftTop1_2 {
    .el-dialog {
      .el-dialog__body {
        padding: 0;
      }
    }
    h2 {
      padding: 0 20px;
    }
    hr {
      border: 0;
      width: 100%;
      display: block;
      height: 1px;
      background-color: #ddd;
    }
    .el-form {
      padding: 0 20px;
      margin-bottom: 45px;
      .ruleBtn {
        position: absolute;
        right: 20px;
      }
    }
  }
}
</style>
<style lang="scss">
#dialogLeftTop1_3 {
  .el-dialog {
    width: 600px !important;
  }
}
</style>
