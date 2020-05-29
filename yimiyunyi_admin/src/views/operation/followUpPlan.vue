<template lang="pug">
  .lg-container
    lgExhibition(:exhibitionData="exhibitionData")
    .lg-container-white
      .filter-container
        el-radio-group.type(v-model="filters.verifyStatus" @change="handleFilter")
          el-radio-button(label="") 全部
          el-radio-button(label="1") 已审核
          el-radio-button(label="0") 待审核
          el-radio-button(label="2") 已拒绝
        .filter-item
          el-input.filter-item.w200(v-model="filters.keyWord" suffix-icon="el-icon-search" placeholder="请输入方案名称/创建人" @keyup.enter.native="handleFilter")
          el-button(type="primary" icon="el-icon-plus" @click="onCreate") 新增
      lgSelectGroup(:selectData="followUpPlan.statusArr" :value="filters.status" title="状态：" @click="clickStatus")
      lgSelectGroup(:selectData="rangeList" :value="filters.department" :max="5" :props="{value: 'id', label: 'name'}" title="适用范围：" @click="clickDepartment")
      .lg-tabel-container
        el-table(key="0"
          ref="table"
          v-loading="listLoading"
          :data="list"
          element-loading-text="加载中..."
          fixed
          fit
          border
          highlight-current-row
          lazy
          row-key="id"
          :load="load"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}")
          el-table-column(label="序号" align="center" type="index" :index="indexMethod" width="55")
          el-table-column(label="方案名字" align="left" prop="name")
          el-table-column(v-for="thead in followUpPlan.tableAttr.thead" :key="thead.label" :width="thead.width || ''" :prop="thead.label" :label="thead.text" :fixed="thead.fixed" class-name="status-col")
            template(slot-scope="scope")
              lgSolt(v-if="thead.render" :render="thead.render" :row="scope.row" :column="thead")
              span(v-else) {{ scope.row[thead.label] }}
          el-table-column(label="操作" align="center" width="200" class-name="small-padding fixed-width" fixed="right")
            template(slot-scope="scope")
              template(v-if="scope.row.isHistor")
                el-button.long(type="text" @click="onLookAttr(scope.row)") 查看
              template(v-if="scope.row.verifyStatus === 0 && !scope.row.isHistor")
                el-button.long(type="text" @click="onAudit(scope.row)") 审核
                el-button.long(type="text" @click="onLookAttr(scope.row)") 查看
              template(v-if="scope.row.verifyStatus === 2 && !scope.row.isHistor")
                el-button.long(type="text" @click="onLookAttr(scope.row)") 查看
              template(v-if="scope.row.verifyStatus === 1 && !scope.row.isHistor")
                template(v-if="scope.row.status === 0")
                  el-button.long(type="text" @click="onEnable(scope.row)") 启用
                  el-button.long(type="text" @click="onEditorAttr(scope.row)") 编辑
                  el-button.long(type="text" @click="onLookAttr(scope.row)") 查看
                template(v-if="scope.row.status === 1")
                  el-button.long(type="text" @click="onDisable(scope.row)") 禁用
                  el-button.long(type="text" @click="onEditorAttr(scope.row)") 编辑
                  el-button.long(type="text" @click="onLookAttr(scope.row)") 查看

        .pagination-container
          el-pagination(ref="pagination"
            background
            :current-page="listQuery.current"
            :page-sizes="[10,20,50,100]"
            :page-size="listQuery.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange")
    lgDialog(:title="dialogTitle" :visible="dialogFormVisible" :showForm="false" :action="false" width="800px" @on-close="onClose")
      //- 方案属性
      template(v-if="curNum === 1")
        el-form(id="formRef"
          ref="formRef"
          :rules="formRules"
          :model="templateForm"
          style="margin-left: 180px"
          label-width="80px")
          el-form-item(label="方案名称" prop="name")
            el-input(v-model="templateForm.name" style="width: 300px;" placeholder="请输入方案名称")
          el-form-item(label="方案介绍" prop="introduce")
            el-input(type="textarea" resize="none" v-model="templateForm.introduce" style="width: 300px;" placeholder="请输入方案介绍")
          el-form-item(label="适用范围" prop="department")
            el-select(v-model="templateForm.department" @change="onDepartment" placeholder="请选择" style="width: 300px;" filterable clearable)
              el-option(v-for="item in allRangeList" :key="item.id" :label="item.name" :value="item.id")
          el-form-item(label="适用手术" prop="operationShow")
            el-select(v-model="templateForm.operationShow" filterable remote reserve-keyword :remote-method="remoteMethod" :loading="loading" placeholder="请输入关键词搜索" style="width: 300px;")
              el-option(v-for="item in operationList" :key="item.id" :label="item.name" :value="item.name")
          el-form-item(label="状态")
            el-select(v-model="templateForm.status" style="width: 300px;" placeholder="请选择状态")
              el-option(v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value")
      //- 方案节点
      template(v-if="curNum === 2")
        .step-list
          .step-item(v-for="(item, index) in nodeList" :key="index" :class="nodeActive === index ? 'active' : ''")
            .step-item_number(@click="onSwitchNode(index)" :class='index === 0 ? "line_l" : (index === nodeList.length - 1 ? "line_r" : "line_l line_r")') {{index+1}}
            .step-item_title(@click="onSwitchNode(index)")  {{item.name}}
            i.el-icon-delete.step-item_delete(v-if="nodeList.length > 1" @click="deleteNode(index)")
        .addNodeBox
          el-button(type="primary" size="mini" @click="addNode") 新增节点
        el-form(:rules="nodeRules" :model="nodeList[nodeActive]" ref="nodeForm" label-width="180px")
          el-form-item(label="节点名称：" prop="name")
            el-input(v-model="nodeList[nodeActive].name" style="width: 300px;" placeholder="请输入节点名称")
          el-form-item(label="与起始节点的间隔时间：" prop="intervalValue")
            el-input-number(v-model="nodeList[nodeActive].intervalValue" :min="1" style='width: 200px;')
            el-select(v-model="nodeList[nodeActive].unit" placeholder="请选择间隔时间单位" style='width: 100px;')
              el-option(v-for="item in timeOption" :key="item.value" :label="item.label" :value="item.value")
          el-form-item(label="选择量表：" prop="formSolutionNodeItemList" style="width: 50%;display:inline-block;")
            el-button(@click="addScale" type="primary" icon="el-icon-plus" circle)
          el-form-item(label="选择宣教：" prop="visitSolutionNodeItemList" style="width: 50%;display:inline-block;")
            el-button(@click="addMission" type="primary" icon="el-icon-plus" circle)
        .lg_formList
          .scale_l
            .scale_l_item(v-for="(nodeVal, node_i) in nodeList[nodeActive].formSolutionNodeItemList" :key="node_i")
              .scale_l_item_title {{nodeVal.templateName}}
              el-button(icon="el-icon-delete" size="mini" @click="removeNodeForm(node_i, 1)" circle)
          .mission_r
            .mission_r_item(v-for="(nodeVal, node_i) in nodeList[nodeActive].visitSolutionNodeItemList" :key="node_i")
              .mission_r_item_title {{nodeVal.templateName}}
              el-button(icon="el-icon-delete" size="mini" @click="removeNodeForm(node_i, 2)" circle)
      //- 检查
      template(v-if="curNum === 3")
        el-form(id="formRef"
          ref="formRef"
          :disabled="true"
          :model="templateForm"
          style="margin-left: 180px"
          label-width="80px")
          el-form-item(label="方案名称" prop="name")
            el-input(v-model="templateForm.name" style="width: 300px;" placeholder="请输入方案名称")
          el-form-item(label="方案介绍" prop="introduce")
            el-input(type="textarea" resize="none" v-model="templateForm.introduce" style="width: 300px;" placeholder="请输入方案介绍")
          el-form-item(label="适用范围" prop="department")
            el-select(v-model="templateForm.department" placeholder="请选择" style="width: 300px;" filterable clearable)
              el-option(v-for="item in allRangeList" :key="item.id" :label="item.name" :value="item.id")
          el-form-item(label="适用手术" prop="operationShow")
            el-select(v-model="templateForm.operationShow" filterable remote reserve-keyword :remote-method="remoteMethod" :loading="loading" placeholder="请输入关键词搜索" style="width: 300px;")
              el-option(v-for="item in operationList" :key="item.id" :label="item.name" :value="item.name")
          el-form-item(label="状态")
            el-select(v-model="templateForm.status" style="width: 300px;" placeholder="请选择状态")
              el-option(v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value")
        nodeInfo(:totalDay="totalDay" :list="nodeList")
      template(slot="action")
        el-button(@click="onClose") 取消
        el-button(type="primary" @click="onProv" v-if="curNum > 1 && dialogTitle !== '查看'") 上一步
        el-button(type="primary" @click="onNext" v-if="curNum < 3 && dialogTitle !== '查看'") 下一步
        el-button(type="primary" @click="onSubmit" v-if="curNum === 3 && dialogTitle !== '查看'") 确定
    //- 选择表单
    selectForm(:type="templateType" :formType="formType" :visible="selectVisible" :title="selectTitle" @on-submit="onSelectSubmit" @on-close="onSelectClose")
</template>
<script>
const lgSolt = {
  functional: true,
  props: {
    row: Object,
    render: Function,
    column: {
      type: Object,
      default: null
    }
  },
  render: (h, data) => {
    const element = data.props.render(h, data.props.row)
    if (typeof (element) === 'object' && element !== null) {
      return element
    } else {
      return h('span', element)
    }
  }
}
import { followUpPlan } from './columnsConst'
import lgExhibition from '@/views/components/lgExhibition'
import lgSelectGroup from '@/views/components/lgSelectGroup'
import lgTable from '@/views/components/lgTable'
import lgDialog from '@/views/components/lgDialog'
import selectForm from '@/views/components/selectForm'
import nodeInfo from '@/views/components/nodeInfo'
import { list, statistics, create, createOrUpdate } from '@/api/common'
import { getSolutionInfo } from '@/api/doctor'
import { getOperationList, getVersionPlan, getDepartments } from '@/api/system'

// 默认表单
const defaultForm = {
  id: null,
  name: '',
  operationShow: null, // 适用手术
  department: null, // 适用范围
  introduce: '', // 介绍
  status: 1
}
export default {
  name: 'ComponentName',
  components: { lgTable, lgExhibition, lgDialog, lgSelectGroup, selectForm, nodeInfo, lgSolt },
  data() {
    return {
      followUpPlan,
      apiUri: 'followupSolution',
      num: {},
      list: [],
      total: 0,
      filters: {
        verifyStatus: '',
        status: null,
        department: null,
        keyWord: '',
        scope: 2
      },
      listQuery: {
        current: 1,
        pageSize: 10
      },
      allRangeList: [],
      rangeList: [],
      exhibitionData: [],
      dialogTitle: '新增',
      dialogFormVisible: false,
      // 表单
      templateForm: Object.assign({}, defaultForm),
      // 表单校验
      formRules: {
        name: [{ required: true, message: '方案名称不能为空！', trigger: 'blur' }],
        introduce: [{ required: true, message: '方案介绍不能为空！', trigger: 'blur' }],
        department: [{ required: true, message: '适用范围不能为空！', trigger: 'change' }],
        operationShow: [{ required: true, message: '适用手术不能为空！', trigger: 'change' }]
      },
      statusOptions: [{
        value: 1,
        label: '启用'
      },
      {
        value: 0,
        label: '禁用'
      }],
      timeOption: [{
        value: 1,
        label: '天'
      }, {
        value: 2,
        label: '周'
      }, {
        value: 3,
        label: '月'
      },
      {
        value: 4,
        label: '年'
      }],
      curNum: 1,
      loading: false,
      operationList: [],
      nodeActive: 0,
      nodeList: [{
        intervalValue: 0,
        unit: 1,
        name: '节点1',
        formSolutionNodeItemList: [], // 量表
        visitSolutionNodeItemList: [] // 宣教
      }],
      nodeRules: {
        name: [{ required: true, message: '节点名称不能为空！', trigger: 'blur' }],
        intervalValue: [{ required: true, message: '间隔时间不能为空！', trigger: 'blur' }]
      },
      templateType: 1,
      selectVisible: false,
      selectTitle: '',
      totalDay: 0, // 最大时间
      formType: null
    }
  },
  computed: {
    // 通过vuex存储加载状态
    listLoading() {
      return this.$store.getters.listLoading
    }
  },
  mounted() {
    this.getStatistics()
    this.getList()
    this.getDepartmentList()
    this.remoteMethod('')
  },
  methods: {
    load(tree, treeNode, resolve) {
      const data = {
        id: tree.id,
        solutionNumber: tree.solutionNumber
      }
      getVersionPlan(data).then(res => {
        if (res.code === 200) {
          res.info.map(v => {
            v.isHistor = true
          })
          resolve(res.info)
        }
      })
    },
    remoteMethod(query) {
      this.loading = true
      getOperationList(query).then(res => {
        this.operationList = res.list
        setTimeout(() => {
          this.loading = false
        }, 200)
      })
    },
    getDepartmentList() {
      getDepartments().then(
        (res) => {
          if (res.code === 200) {
            this.allRangeList = res.info
            const list = [].concat(res.info)
            list.unshift({
              id: null,
              name: '全部'
            })
            this.rangeList = list
          }
        }
      )
    },
    getStatistics() {
      statistics(this.apiUri).then((res) => {
        if (res.code === 200) {
          this.num = res.info
          this.exhibitionData = [{
            ratio: 12,
            img: require('@/assets/img/s_1.png'),
            num: this.num.checkPendingSolution,
            unit: '个',
            title: '待审核方案'
          }, {
            ratio: 12,
            img: require('@/assets/img/s_2.png'),
            num: this.num.officialSolution,
            unit: '个',
            title: '官方方案'
          }]
          // {
          //   ratio: 8,
          //   img: require('@/assets/img/s_3.png'),
          //   num: this.num.personageSolution,
          //   unit: '个',
          //   title: '个人方案'
          // }
        }
      })
    },
    getList() {
      const params = Object.assign({}, this.listQuery, this.filters)
      list(this.apiUri, params).then((res) => {
        if (res.code === 200) {
          this.list = res.list
          this.total = res.total
          this.list.map(v => {
            if (v.version && v.version > 1) {
              v.hasChildren = true
            }
          })
        }
      })
    },
    // 切换状态
    clickStatus(val) {
      this.filters.status = val
      this.handleFilter()
    },
    clickDepartment(val) {
      this.filters.department = val
      this.handleFilter()
    },
    handleFilter() {
      this.getList()
    },
    // 审核
    onAudit(row) {
      this.$confirm('是否审核通过?', '提示', {
        confirmButtonText: '审核通过',
        cancelButtonText: '拒绝',
        distinguishCancelAndClose: true,
        type: 'warning'
      }).then((val) => {
        const params = {
          id: row.id,
          verifyStatus: 1
        }
        createOrUpdate(this.apiUri, params).then(res => {
          if (res.code === 200) {
            this.getList()
            this.$notify({
              title: '成功',
              message: '审核通过',
              type: 'success',
              duration: 2000
            })
          }
        })
      }).catch((action) => {
        if (action === 'cancel') {
          const params = {
            id: row.id,
            verifyStatus: 2
          }
          createOrUpdate(this.apiUri, params).then(res => {
            if (res.code === 200) {
              this.getList()
              this.$notify({
                title: '成功',
                message: '审核不通过',
                type: 'success',
                duration: 2000
              })
            }
          })
          // this.$prompt('', '填写拒绝理由', {
          //   confirmButtonText: '确定',
          //   cancelButtonText: '取消',
          //   inputValidator: (value) => { // 点击按钮时，对文本框里面的值进行验证
          //     if (!value) {
          //       return '拒绝理由不能为空！'
          //     }
          //   }
          // })
          //   .then(({ value }) => {

          //   })
          //   .catch(() => {})
        }
      })
    },
    // 启用
    onEnable(row) {
      const params = {
        id: row.id,
        status: 1
      }
      createOrUpdate(this.apiUri, params).then(res => {
        if (res.code === 200) {
          this.getList()
          this.$notify({
            title: '成功',
            message: '启用成功',
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    // 禁用
    onDisable(row) {
      const params = {
        id: row.id,
        status: 0
      }
      createOrUpdate(this.apiUri, params).then(res => {
        if (res.code === 200) {
          this.getList()
          this.$notify({
            title: '成功',
            message: '禁用成功',
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    // 编辑
    onEditorAttr(row) {
      this.resetForm()
      this.dialogTitle = '编辑'
      this.curNum = 1
      getSolutionInfo(row.id).then(res => {
        if (res.code === 200) {
          this.templateForm = res.info.solution
          this.nodeList = res.info.solutionNodeList
          this.totalDay = this.getMaxDay()
          this.dialogFormVisible = true
          this.formType = res.info.solution.department
        }
      })
    },
    // 查看
    onLookAttr(row) {
      this.$router.push(`/details/planDetail/${row.id}`)
    },
    // 修改每页条数
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    // 页码改变时触发
    handleCurrentChange(val) {
      this.listQuery.current = val
      this.getList()
    },
    // 索引
    indexMethod(index) {
      return this.listQuery.pageSize * (this.listQuery.current - 1) + index + 1
    },
    // 新增
    onCreate() {
      this.resetForm()
      this.dialogTitle = '新增'
      this.dialogFormVisible = true
    },
    // 提交
    onSubmit() {
      const data = Object.assign({}, this.templateForm)
      data.departmentShow = this.getFormTypeShow(data.department)
      const dataObj = {
        solution: data,
        solutionNodeList: this.nodeList
      }
      dataObj.solution.scope = 2
      dataObj.solution.scopeShow = '平台'
      create('followupSolution', dataObj).then(res => {
        if (res.code === 200) {
          this.getList()
          this.dialogFormVisible = false
          this.$notify({
            title: '成功',
            message: '新增成功',
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    onDepartment(val) {
      if (val) {
        this.formType = val
      }
    },
    getFormTypeShow(id) {
      const list = []
      let name = ''
      this.allRangeList.map(v => {
        list.push(v)
        if (v.children) {
          v.children.map(e => {
            list.push(e)
          })
        }
      })
      list.map(e => {
        if (e.id === id) {
          name = e.name
        }
      })
      return name
    },
    // 关闭弹窗
    onClose() {
      this.dialogFormVisible = false
    },
    // 清空弹框表单
    resetForm() {
      this.templateForm = Object.assign({}, defaultForm)
      this.nodeList = [{
        intervalValue: 0,
        unit: 1,
        name: '节点1',
        formSolutionNodeItemList: [], // 量表
        visitSolutionNodeItemList: [] // 宣教
      }]
      this.curNum = 1
      this.$nextTick(() => {
        this.$refs['formRef'].clearValidate()
      })
    },
    // 上一步
    onProv() {
      this.curNum--
    },
    // 下一步
    onNext() {
      if (this.curNum === 1) {
        this.$refs['formRef'].validate((valid) => {
          if (valid) {
            this.curNum++
          }
        })
      } else if (this.curNum === 2) {
        if (this.verifyNode()) {
          this.curNum++
        }
      } else {
        this.curNum++
      }
    },
    getDay(day, unit) {
      let intervalDay = 0
      switch (unit) {
        case 1:
          intervalDay = day
          break
        case 2:
          intervalDay = day * 7
          break
        case 3:
          intervalDay = day * 30
          break
        case 4:
          intervalDay = day * 365
          break
        default:
          break
      }
      return intervalDay
    },
    getMaxDay() {
      const dayList = []
      this.nodeList.map(e => {
        e.intervalDay = this.getDay(e.intervalValue, e.unit)
        e.formSolutionNodeItemList = e.formSolutionNodeItemList ? e.formSolutionNodeItemList : []
        e.visitSolutionNodeItemList = e.visitSolutionNodeItemList ? e.visitSolutionNodeItemList : []
        e.lbNum = e.formSolutionNodeItemList.length
        e.xjNum = e.visitSolutionNodeItemList.length
        dayList.push(e.intervalDay)
      })
      return Math.max(...dayList)
    },
    // 新增量表
    addScale() {
      this.templateType = 1
      this.selectTitle = '选择量表'
      this.selectVisible = true
    },
    // 新增宣教
    addMission() {
      this.templateType = 2
      this.selectTitle = '选择宣教'
      this.selectVisible = true
    },
    // 选择表单确定
    onSelectSubmit(data) {
      this.selectVisible = false
      let isRepeat = false
      if (this.templateType === 1) {
        this.nodeList[this.nodeActive].formSolutionNodeItemList.map(e => {
          if (e.templateId === data.templateId) {
            isRepeat = true
          }
        })
        if (!isRepeat) { this.nodeList[this.nodeActive].formSolutionNodeItemList.push(data) } else {
          this.$message({
            message: '已存在该量表',
            type: 'warning'
          })
        }
      } else {
        this.nodeList[this.nodeActive].visitSolutionNodeItemList.map(e => {
          if (e.templateId === data.templateId) {
            isRepeat = true
          }
        })
        if (!isRepeat) { this.nodeList[this.nodeActive].visitSolutionNodeItemList.push(data) } else {
          this.$message({
            message: '已存在该宣教',
            type: 'warning'
          })
        }
      }
    },
    // 选择表单取消
    onSelectClose() {
      this.selectVisible = false
    },
    // 删除量表
    removeNodeForm(i, type) {
      if (type === 1) {
        this.nodeList[this.nodeActive].formSolutionNodeItemList.splice(i, 1)
      } else {
        this.nodeList[this.nodeActive].visitSolutionNodeItemList.splice(i, 1)
      }
    },
    // 新增节点
    addNode() {
      if (this.verifyNode()) {
        this.nodeList.push({
          intervalValue: 0,
          unit: 1,
          name: '节点' + (this.nodeList.length + 1),
          formSolutionNodeItemList: [], // 量表
          visitSolutionNodeItemList: [] // 宣教
        })
        this.nodeActive = this.nodeList.length - 1
      }
    },
    // 删除节点
    deleteNode(i) {
      if (this.nodeActive === this.nodeList.length - 1) {
        this.nodeActive--
      }
      this.nodeList.splice(i, 1)
    },
    // 切换节点
    onSwitchNode(index) {
      if (this.verifyNode()) {
        this.nodeActive = index
      }
    },
    verifyNode() {
      var verifyTage = true
      this.$refs['nodeForm'].validate((valid) => {
        if (valid) {
          this.totalDay = this.getMaxDay()
          // 校验时间
          let repeatObj = {}
          const day = this.nodeList[this.nodeActive].intervalDay
          this.nodeList.map((e, i) => {
            if (day === e.intervalDay && this.nodeActive !== i) {
              repeatObj = e
              repeatObj.isVerify = true
            }
          })
          if (repeatObj.isVerify) {
            this.$message({
              message: '与起始节点的间隔时间重复，重复节点：' + repeatObj.name,
              type: 'warning'
            })
            verifyTage = false
            return false
          }
          // 校验量表宣教
          if (this.nodeList[this.nodeActive].visitSolutionNodeItemList.length === 0 && this.nodeList[this.nodeActive].formSolutionNodeItemList.length === 0) {
            this.$message({
              message: '当前节点量表、宣教至少有一个不为空',
              type: 'warning'
            })
            verifyTage = false
            return false
          }
        }
      })
      return verifyTage
    }
  }
}
</script>
<style lang="scss" scoped>
.lg-container-white {
  margin-top: 20px;
  height: calc(100% - 140px);
}
</style>
<style lang="scss">
  // 节点样式
  .lg_formList {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 5%;
    .scale_l {
      width: 45%;
      height: 200px;
      border: 1px solid #bcbcbc;
      padding: 10px;
      overflow: auto;
      &_item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 28px;
        margin-bottom: 6px;
        &_title {
          color: #999;
          font-size: 12px;
        }
      }
    }
    .mission_r {
      width: 45%;
      height: 200px;
      border: 1px solid #bcbcbc;
      padding: 10px;
      overflow: auto;
      &_item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 28px;
        margin-bottom: 6px;
        &_title {
          color: #999;
          font-size: 12px;
        }
      }
    }
  }
  .step-list {
    border-bottom: 1px solid #DCDFE6;
    padding: 6px 0 15px;
    width: 760px;
    display: flex;
    overflow: auto;
    .step-item {
      width: 150px;
      min-width: 150px;
      height: 100%;
      display: flex;
      flex-direction: column;
      position: relative;
      &.active {
        .step-item_number {
          border-color: #03a9ac;
          color: #03a9ac;
          &.line_l {
            &::before {
              background-color: #03a9ac;
            }
          }
          &.line_r {
            &::after {
              background-color: #03a9ac;
            }
          }
        }
        .step-item_title {
          color: #03a9ac;
        }
      }
      &_number {
        width: 24px;
        height: 24px;
        text-align: center;
        line-height: 20px;
        border-radius: 50%;
        border: 2px solid #999;
        color: #999;
        font-weight: bold;
        font-size: 14px;
        position: relative;
        cursor: pointer;
        &.line_l {
          &::before {
            content: '';
            display: block;
            width: 65px;
            height: 2px;
            background-color: #999;
            position: absolute;
            right: -65px;
            top: 10px;
          }
        }
        &.line_r {
          &::after {
            content: '';
            display: block;
            width: 65px;
            height: 2px;
            background-color: #999;
            position: absolute;
            left: -65px;
            top: 10px;
          }
        }
      }
      &_title {
        color: #999;
        font-weight: bold;
        font-size: 14px;
        line-height: 18px;
        margin-top: 3px;
        cursor: pointer;
      }
      &_delete {
        position: absolute;
        left: 24px;
        top: -6px;
        font-size: 12px;
        color: #F56C6C;
        cursor: pointer;
      }
    }
  }
  .addNodeBox {
    display: flex;
    justify-content: flex-end;
    margin: 10px 0 20px;
  }
</style>
