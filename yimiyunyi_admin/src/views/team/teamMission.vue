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
          el-input.filter-item.w200(v-model="filters.name" suffix-icon="el-icon-search" placeholder="请输入宣教名称/创建人" @keyup.enter.native="handleFilter")
          el-button.filter-item(type="primary" icon="el-icon-plus" @click="handleCreate") 新增
      lgSelectGroup(:selectData="teamMissionConst.statusArr" :value="filters.status" title="状态：" @click="clickStatus")
      lgSelectGroup(:selectData="rangeList" :value="filters.formType" :max="5" :props="{value: 'id', label: 'name'}" title="适用范围：" @click="clickDepartment")
      lgTable(columns-type="index"
            columns-label="序号"
            :list="list"
            :total-list="total"
            :lg-thead="teamMissionConst.tableAttr.thead"
            :lg-buttons="teamMissionConst.tableAttr.buttons"
            @operationEvent0="operationEvent0"
            @operationEvent1="operationEvent1"
            @operationEvent2="operationEvent2"
            @operationEvent3="operationEvent3"
            @operationEvent4="operationEvent4"
            @operationEvent5="operationEvent5"
            @operationEvent6="operationEvent6"
            @initListQuery="initListQuery"
            @getListByPagination="getListByPagination")
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
        el-form-item(label="宣教名称" prop="name")
          el-input(v-model="templateForm.name" style="width: 220px;" placeholder="请输入宣教名称")
        el-form-item(label="适用范围" prop="formType")
          el-select(v-model="templateForm.formType" placeholder="请选择" style="width: 220px;" filterable clearable)
            el-option(v-for="item in allRangeList" :key="item.id" :label="item.name" :value="item.id")
        el-form-item(label="状态")
          el-select(v-model="templateForm.status" style="width: 220px;" placeholder="请选择状态")
            el-option(v-for="item in statusOptions" :key="item.key" :label="item.display_name" :value="item.key")
</template>
<script>
// 默认表单
const defaultForm = {
  id: null,
  name: '',
  type: 2,
  typeShow: '宣教',
  formType: null,
  status: 1,
  htmlContent: ''
}
import { teamMissionConst } from './columnsConst'
import lgTable from '@/views/components/lgTable'
import lgDialog from '@/views/components/lgDialog'
import lgSelectGroup from '@/views/components/lgSelectGroup'
import { list, createOrUpdate, create } from '@/api/common'
import { getDepartments } from '@/api/system'
export default {
  name: 'ComponentName',
  components: { lgTable, lgDialog, lgSelectGroup },
  data() {
    return {
      teamMissionConst,
      apiUri: 'template',
      num: {},
      list: [],
      total: 0,
      filters: {
        verifyStatus: '', // 审核状态
        status: null, // 启动/禁用
        name: '', // 宣教名称
        templateNumber: '', // 模板编号
        type: 2, // 模板类型
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
      // 弹窗显示隐藏
      dialogFormVisible: false,
      // 弹窗提示语
      dialogTitle: '新增',
      // 表单
      templateForm: Object.assign({}, defaultForm),
      // 表单校验
      rules: {
        name: [{ required: true, message: '宣教名称不能为空！', trigger: 'blur' }],
        formType: [{ required: true, message: '适用范围不能为空！', trigger: 'change' }]
      },
      disabled: false,
      action: true
    }
  },
  mounted() {
    this.getList()
    this.getDepartmentList()
  },
  methods: {
    realignList(data) {
      const arr = []
      for (var i = 0, len = data.length; i < len; i += 7) {
        arr.push(data.slice(i, i + 7))
      }
      return arr
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
    getList() {
      const params = Object.assign({}, this.listQuery, this.filters)
      list(this.apiUri, params).then((res) => {
        if (res.code === 200) {
          this.list = res.list
          this.total = res.total
        }
      })
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
    // 初始化页数与条数
    initListQuery(listQuery) {
      this.listQuery = listQuery
    },
    // 分页操作
    getListByPagination(listQuery) {
      this.listQuery = listQuery
      this.getList()
    },
    handleFilter() {
      this.getList()
    },
    // 启用
    operationEvent0(row) {
      const params = {
        id: row.id,
        status: 1
      }
      createOrUpdate(this.apiUri, params).then(res => {
        if (res.code === 200) {
          this.getList()
          this.$message({
            message: '启用成功',
            type: 'success'
          })
        }
      })
    },
    // 禁用
    operationEvent1(row) {
      const params = {
        id: row.id,
        status: 0
      }
      createOrUpdate(this.apiUri, params).then(res => {
        if (res.code === 200) {
          this.getList()
          this.$message({
            message: '禁用成功',
            type: 'success'
          })
        }
      })
    },
    // 编辑属性
    operationEvent2(row) {
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
    // 编辑宣教
    operationEvent3(row) {
      this.$router.push(`/case/tinymce/${row.id}`)
    },
    // 审核
    operationEvent4(row) {
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
    operationEvent5(row) {
      for (const key in this.templateForm) {
        if (this.templateForm.hasOwnProperty(key)) {
          this.templateForm[key] = row[key]
        }
      }
      this.dialogTitle = '查看'
      this.disabled = true
      this.action = false
      this.dialogFormVisible = true
    },
    // 查看宣教
    operationEvent6(row) {
      this.$router.push(`/case/lookForm/${row.id}`)
    },
    // 添加
    handleCreate() {
      this.resetForm()
      this.dialogTitle = '新增'
      this.disabled = false
      this.action = true
      this.dialogFormVisible = true
    },
    // 添加提交
    createData() {
      const data = Object.assign({}, this.templateForm)
      data.formTypeShow = this.getFormTypeShow(data.formType)
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
    onChange(val) {
      console.log(val)
    }
  }
}
</script>
