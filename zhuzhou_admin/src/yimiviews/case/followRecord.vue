<template>
  <div class="PAERecord" ref="sectionBox">
    <div class="sectionBox">
      <div style="text-align: right;margin-top:20px;padding-right:30px;">
        <el-button type="primary" @click="createTaskFlag = true">新建随访任务</el-button>
      </div>
      <h2>
        <span>随访任务</span>
      </h2>
      <div class="box">
        <complex-table
          :hasSelection="false"
          :list="list1"
          :totalList="totalList1"
          :theadList="theadList1"
          statusName="followupStatus"
          :statusArr='statusArr'
          :hasOperate="false"
          :moreHasOperate="true"
          :operationButtons="operationButtons1"
          @getListByPagination="getListByPagination"
          @operationEvent0='operationEvent1_0'
          @operationEvent1='operationEvent1_1'
          @initListQuery="initListQuery"
        ></complex-table>
      </div>
      <h2>
        <span>随访记录</span>
      </h2>
      <div class="box">
        <complex-table
          :hasSelection="false"
          :list="list2"
          :totalList="totalList2"
          :theadList="theadList2"
          :operationButtons="operationButtons2"
          @getListByPagination="getListByPagination2"
          @operationEvent0='operationEvent2_0'
          @initListQuery="initListQuery"
        ></complex-table>
      </div>
    </div>
    <el-dialog title="新建随访任务" :visible.sync="createTaskFlag">
      <el-form :model="followTask" :rules="followTaskRules" :label-width="formLabelWidth" ref="followTask">
        <el-form-item label="回访时间" prop="planTime">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="followTask.planTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="width: 196px;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="随访计划" prop="planId">
          <el-select v-model="followTask.planId" placeholder="请选择" style="width: 196px;">
            <el-option
              v-for="item in followUpList"
              :label="item.name"
              :value="item.id"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="表单分类" prop="formType">
          <el-select v-model="followTask.formType" @change="formTypeChange" placeholder="请选择" style="width: 196px;">
            <el-option
              v-for="item in classfiyList"
              :label="item.label"
              :value="item.value"
              :key="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="随访表单" prop="formId">
          <el-select v-model="followTask.formId" @focus="formIdChange" placeholder="请选择" style="width: 196px;">
            <el-option
              v-for="item in formList"
              :label="item.name"
              :value="item.id"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="回访方式" prop="followupType">
          <dict-select
            v-model="followTask.followupType"
            placeholder="请选择回访方式"
            style="width: 196px;"
            dict-code="followup_type"
          ></dict-select>
        </el-form-item>
        <el-form-item label="有效天数">
          <el-input-number v-model="followTask.expireDay" style="width: 196px;" :min="1" label="描述文字"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createTaskFlag = false">取 消</el-button>
        <el-button type="primary" @click="createFollowTask('followTask')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import complexTable from '@/views/table/complexTable'
import { dictionary } from '@/api/knowledgeManage/dictionary'
import DictSelect from '@/views/form/dictSelect'
import { page } from '@/api/knowledgeManage/followupForm'
import { getPlanList } from '@/api/followupManage'
import { getFollowupTask, getFollowupFinish, addFollowup } from '@/api/patientArchives'
export default {
  components: { complexTable, DictSelect },
  data() {
    return {
      formLabelWidth: '120px',
      createTaskFlag: false,
      currentTask: '',
      currentTaskState: '',
      followTask: {
        planTime: '',
        planId: null,
        formType: null,
        formId: null,
        followupType: null,
        expireDay: ''
      },
      followTaskRules: {
        planTime: [{ required: true, message: '请输入回访时间', trigger: 'change' }],
        planId: [{ required: true, message: '请输入随访计划', trigger: 'change' }],
        formType: [{ required: true, message: '请选择表单分类', trigger: 'change' }],
        formId: [{ required: true, message: '请选择随访表单', trigger: 'change' }],
        followupType: [{ required: true, message: '请选择回访方式', trigger: 'change' }]
      },
      appointment: {
        num: 'Y234231029431',
        applicant: 'admin',
        expectTime: '2018-09-06',
        operatorTime1: '2018-12-12',
        status: '随访'
      },
      list1: [], // 随访任务
      list2: [], // 随访记录
      totalList1: 0,
      totalList2: 0,
      theadList1: [
        {
          label: 'planTime',
          text: '计划随访时间'
        },
        {
          label: 'planUserName',
          text: '计划随访人'
        },
        {
          label: 'formTitle',
          text: '随访模板'
        },
        {
          label: 'followupTypeShow',
          text: '随访类型'
        },
        {
          label: 'followupStatus',
          text: '任务状态'
        }
      ],
      theadList2: [
        {
          label: 'execTime',
          text: '随访时间'
        },
        {
          label: 'planUserName',
          text: '随访人'
        },
        {
          label: 'formTitle',
          text: '随访模板'
        },
        {
          label: 'followupTypeShow',
          text: '随访类型'
        },
        {
          label: 'followupResultShow',
          text: '随访结论'
        }
      ],
      statusArr: ['未完成', '已完成', '', '已取消'],
      operationButtons1: [
        [{
          name: 'followUp',
          text: '随访',
          id: 0,
          type: 'text'
        }],
        [{
          name: 'look',
          text: '查看',
          id: 1,
          type: 'text'
        }]
      ],
      operationButtons2: [
        {
          name: 'look',
          text: '查看',
          id: 0,
          type: 'text'
        }
      ],
      filter: {
        limit: 10,
        page: 1
      },
      filter2: {
        limit: 10,
        page: 1
      },
      formList: [],
      classfiyList: [],
      followUpList: []
    }
  },
  mounted() {
    const CH = document.body.offsetHeight
    this.$refs.sectionBox.style.height = CH - 98 + 'px'
    this.getClassfiyList()
    this.getfollowUpList()
    this.getFollowupTaskList()
    this.getFollowupFinishList()
  },
  methods: {
    // 随访任务列表
    getFollowupTaskList() {
      const query = Object.assign({ appointId: parseInt(this.$route.params.id) }, this.filter)
      getFollowupTask(query).then(res => {
        if (res.data.code === 200) {
          this.list1 = res.data.list
          this.totalList1 = parseInt(res.data.total)
        }
      })
    },
    // 随访记录列表
    getFollowupFinishList() {
      const query = Object.assign({ appointId: parseInt(this.$route.params.id) }, this.filter2)
      getFollowupFinish(query).then(res => {
        if (res.data.code === 200) {
          this.list2 = res.data.list
          this.totalList2 = parseInt(res.data.total)
        }
      })
    },
    initListQuery(listQuery) {
      this.filter = listQuery
      this.filter2 = listQuery
    },
    // 分页加载
    getListByPagination(listQuery) {
      this.listQuery = listQuery
      this.getFollowupTaskList()
    },
    getListByPagination2(listQuery) {
      this.listQuery2 = listQuery
      this.getFollowupFinishList()
    },
    formTypeChange(val) {
      this.getFormList(val)
    },
    formIdChange() {
      if (!this.followTask.formType) {
        this.$message({
          message: '请选择表单分类',
          type: 'warning'
        })
      }
    },
    getfollowUpList(listQuery) {
      const query = {
        page: 1,
        limit: 999999
      }
      getPlanList(query).then((res) => {
        if (res.data.code === 200) {
          this.followUpList = res.data.list
        }
      })
    },
    getFormList(type) {
      const query = {
        page: 1,
        limit: 999999,
        type: type
      }
      page(query).then(res => {
        if (res.data.code === 200) {
          this.formList = res.data.list
        }
      })
    },
    getClassfiyList() {
      dictionary({ type: 'bdlx' }).then((res) => {
        if (res.data.code === 200) {
          this.classfiyList = res.data.list
        }
      })
    },
    // 创建随访任务
    createFollowTask(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = Object.assign({}, this.followTask)
          data.formTitle = this.formList.find(v => v.id === data.formId).name
          data.appointId = parseInt(this.$route.params.id)
          addFollowup(data).then(res => {
            if (res.data.code === 200) {
              this.$message({
                message: '随访任务新建成功',
                type: 'success'
              })
              this.getFollowupTaskList()
              this.getFollowupFinishList()
            }
          })
          this.createTaskFlag = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 随访
    operationEvent1_0(row) {
      this.$router.push('/follow/follow/' + row.id)
    },
    operationEvent1_1(row) {
      this.$router.push('/follow/followDetails/' + row.id)
    },
    // 查看详情
    operationEvent2_0(row) {
      this.$router.push('/follow/followDetails/' + row.id)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../styles/case.scss";
.currentTaskState {
  padding: 20px;
}
.PAERecord {
  .sectionBox {
    min-height: calc(100% - 15px);
    .box {
      padding: 0;
    }
  }
}
</style>



