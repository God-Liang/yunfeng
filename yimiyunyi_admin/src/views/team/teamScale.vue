<template lang="pug">
  .lg-container
    .lg-container-white
      .filter-container
        el-radio-group.filter-item(v-model="filters.verifyStatus" @change="handleFilter")
          el-radio-button(label="") 全部
          el-radio-button(label="1") 已审核
          el-radio-button(label="0") 待审核
          el-radio-button(label="2") 已拒绝
        .filter-item
          el-input.filter-item.w200(v-model="filters.name" suffix-icon="el-icon-search" placeholder="请输入量表名称/创建人" @keyup.enter.native="handleFilter")
          el-button(type="primary" icon="el-icon-plus" @click="handleCreate") 新增
      lgSelectGroup(:selectData="teamScaleConst.statusArr" :value="filters.status" title="状态：" @click="clickStatus")
      lgSelectGroup(:selectData="rangeList" :value="filters.formType" :max="5" :props="{value: 'id', label: 'name'}" title="适用范围：" @click="clickDepartment")
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
          el-table-column(label="量表名称" align="left" width="150" prop="name")
          el-table-column(v-for="thead in teamScaleConst.tableAttr.thead" :key="thead.label" :width="thead.width || ''" :prop="thead.label" :label="thead.text" :fixed="thead.fixed" class-name="status-col")
            template(slot-scope="scope")
              lgSolt(v-if="thead.render" :render="thead.render" :row="scope.row" :column="thead")
              span(v-else) {{ scope.row[thead.label] }}
          el-table-column(label="操作" align="center" width="240" class-name="small-padding fixed-width" fixed="right")
            template(slot-scope="scope")
              template(v-if="scope.row.isHistor")
                el-button.long(type="text" @click="onLookAttr(scope.row)") 查看属性
                el-button.long(type="text" @click="onLookTemp(scope.row)") 查看量表
              template(v-if="scope.row.verifyStatus === 0 && !scope.row.isHistor")
                el-button.long(type="text" @click="onAudit(scope.row)") 审核
                el-button.long(type="text" @click="onLookAttr(scope.row)") 查看属性
                el-button.long(type="text" @click="onLookTemp(scope.row)") 查看量表
              template(v-if="scope.row.verifyStatus === 2 && !scope.row.isHistor")
                el-button.long(type="text" @click="onLookAttr(scope.row)") 查看属性
                el-button.long(type="text" @click="onLookTemp(scope.row)") 查看量表
              template(v-if="scope.row.verifyStatus === 1 && !scope.row.isHistor")
                template(v-if="scope.row.status === 0")
                  el-button.long(type="text" @click="onEnable(scope.row)") 启用
                  el-button.long(type="text" @click="onEditorAttr(scope.row)") 编辑属性
                  el-button.long(type="text" @click="onEditorTemp(scope.row)") 编辑量表
                template(v-if="scope.row.status === 1")
                  el-button.long(type="text" @click="onDisable(scope.row)") 禁用
                  el-button.long(type="text" @click="onEditorAttr(scope.row)") 编辑属性
                  el-button.long(type="text" @click="onEditorTemp(scope.row)") 编辑量表
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
    lgDialog(:title="dialogTitle"
      :visible="dialogFormVisible"
      width="600px"
      :show-form="true"
      form-ref="dataForm"
      :form-rules="rules"
      label-width="80px"
      :value="templateForm"
      :disabled="disabled"
      :action="action"
      @on-submit="dialogTitle === '新增' ? createData() : updateData()"
      @on-close="onClose")
      template(slot="form")
        el-form-item(label="量表名称" prop="name")
          el-input(v-model="templateForm.name" style="width: 220px;" placeholder="请输入模板名称")
        el-form-item(label="适用范围" prop="formType")
          el-select(v-model="templateForm.formType" placeholder="请选择" style="width: 220px;" filterable clearable)
            el-option(v-for="item in allRangeList" :key="item.id" :label="item.name" :value="item.id")
        el-form-item(label="状态")
          el-select(v-model="templateForm.status" style="width: 220px;" placeholder="请选择状态")
            el-option(v-for="item in statusOptions" :key="item.key" :label="item.display_name" :value="item.key")
        el-form-item(label="表单分析")
          el-select(v-model="templateForm.isScore" style="width: 220px;" placeholder="是否需要表单分析")
            el-option(v-for="item in scoreOptions" :key="item.key" :label="item.display_name" :value="item.key")
        el-form-item(v-if="templateForm.isScore" label="结果分析")
          .analysis-list
            .analysis-item(v-for="(item, index) in analysisResult" :key="index")
              .analysis-left
                el-input-number(size="mini" v-model="item.min" :step="1") ~
                el-input-number(size="mini" v-model="item.max" :step="1")
                el-input(type="textarea" resize="none" style="font-size: 12px;" placeholder="请输入结果分析" :rows="2" v-model="item.content")
              el-button(icon="el-icon-delete" @click="removeAnalysis(index)" circle)
          .t_r
            el-button(@click="addAnalysis" type="primary" icon="el-icon-plus" circle)
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
// 默认表单
const defaultForm = {
  id: null,
  name: '',
  type: 1,
  typeShow: '量表',
  formType: null,
  status: 1,
  htmlContent: '',
  isScore: 0,
  analysisResult: []
}
import { teamScaleConst } from './columnsConst'
import lgTable from '@/views/components/lgTable'
import lgDialog from '@/views/components/lgDialog'
import lgSelectGroup from '@/views/components/lgSelectGroup'
import { list, createOrUpdate, create } from '@/api/common'
import { getVersionList, getDepartments } from '@/api/system'

export default {
  name: 'ComponentName',
  components: { lgTable, lgSolt, lgDialog, lgSelectGroup },
  data() {
    return {
      teamScaleConst,
      apiUri: 'template',
      num: {},
      list: [],
      total: 0,
      filters: {
        verifyStatus: '', // 审核状态
        status: null, // 启动/禁用
        name: '', // 量表名称
        templateNumber: '', // 模板编号
        type: 1, // 模板类型
        formType: null, // 适用范围
        scope: 1
      },
      listQuery: {
        current: 1,
        pageSize: 10
      },
      allRangeList: [],
      rangeList: [],
      showMore: false,
      statusOptions: [{
        key: 1,
        display_name: '启用'
      },
      {
        key: 0,
        display_name: '禁用'
      }],
      scoreOptions: [{
        key: 1,
        display_name: '是'
      },
      {
        key: 0,
        display_name: '否'
      }],
      // 弹窗显示隐藏
      dialogFormVisible: false,
      // 弹窗提示语
      dialogTitle: '新增',
      // 表单
      templateForm: Object.assign({}, defaultForm),
      // 表单校验
      rules: {
        name: [{ required: true, message: '模板名称不能为空！', trigger: 'blur' }],
        formType: [{ required: true, message: '适用范围不能为空！', trigger: 'change' }]
      },
      downloadLoading: false,
      analysisResult: [{
        min: 0,
        max: 0,
        content: ''
      },
      {
        min: 0,
        max: 0,
        content: ''
      }],
      disabled: false,
      action: true
    }
  },
  computed: {
    // 通过vuex存储加载状态
    listLoading() {
      return this.$store.getters.listLoading
    }
  },
  mounted() {
    this.getList()
    this.getDepartmentList()
  },
  methods: {
    load(tree, treeNode, resolve) {
      const data = {
        id: tree.id,
        templateNumber: tree.templateNumber
      }
      getVersionList(data).then(res => {
        if (res.code === 200) {
          res.info.map(v => {
            v.isHistor = true
          })
          resolve(res.info)
        }
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
    // 切换状态
    clickStatus(val) {
      this.filters.status = val
      this.handleFilter()
    },
    clickDepartment(val) {
      this.filters.formType = val
      this.handleFilter()
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
    change(id, item) {
      this.filters.formType = id
      this.showMore = false
      this.getList()
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
    // 查看属性
    onLookAttr(row) {
      for (const key in this.templateForm) {
        if (this.templateForm.hasOwnProperty(key)) {
          this.templateForm[key] = row[key]
        }
      }
      if (this.templateForm.isScore) {
        this.analysisResult = JSON.parse(row.analysisResult)
      }
      this.dialogTitle = '查看'
      this.disabled = true
      this.action = false
      this.dialogFormVisible = true
    },
    // 查看量表
    onLookTemp(row) {
      this.$router.push(`/case/lookForm/${row.id}`)
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
    // 编辑查看
    onEditorAttr(row) {
      for (const key in this.templateForm) {
        if (this.templateForm.hasOwnProperty(key)) {
          this.templateForm[key] = row[key]
        }
      }
      if (this.templateForm.isScore) {
        this.analysisResult = JSON.parse(row.analysisResult)
      }
      this.dialogTitle = '更新'
      this.disabled = false
      this.action = true
      this.dialogFormVisible = true
    },
    // 编辑量表
    onEditorTemp(row) {
      const routeData = this.$router.resolve({ path: '/formEditor', query: { id: row.id }})
      window.open(routeData.href, '_blank')
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
    // 添加
    handleCreate() {
      this.resetForm()
      this.analysisResult = [{
        min: 0,
        max: 0,
        content: ''
      },
      {
        min: 0,
        max: 0,
        content: ''
      }]
      this.dialogTitle = '新增'
      this.disabled = false
      this.action = true
      this.dialogFormVisible = true
    },
    // 添加提交
    createData() {
      const data = Object.assign({}, this.templateForm)
      data.formTypeShow = this.getFormTypeShow(data.formType)
      if (data.isScore) {
        data.analysisResult = JSON.stringify(this.analysisResult)
      } else {
        data.analysisResult = '[]'
      }
      create(this.apiUri, data).then(res => {
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
    // 编辑提交
    updateData() {
      const data = Object.assign({}, this.templateForm)
      data.formTypeShow = this.getFormTypeShow(data.formType)
      if (data.isScore) {
        data.analysisResult = JSON.stringify(this.analysisResult)
      } else {
        data.analysisResult = '[]'
      }
      createOrUpdate(this.apiUri, data).then(res => {
        if (res.code === 200) {
          this.getList()
          this.dialogFormVisible = false
          this.$notify({
            title: '成功',
            message: '更新成功',
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    // 关闭弹窗
    onClose() {
      this.dialogFormVisible = false
    },
    // 清空弹框表单
    resetForm() {
      this.templateForm = Object.assign({}, defaultForm)
    },
    addAnalysis() {
      this.analysisResult.push({
        min: 0,
        max: 0,
        content: ''
      })
    },
    removeAnalysis(index) {
      this.analysisResult.splice(index, 1)
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
    }
  }
}
</script>
