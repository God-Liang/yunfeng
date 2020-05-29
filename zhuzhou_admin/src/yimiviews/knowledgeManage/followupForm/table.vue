<template>
  <div class="app-container">
    <el-table  :key='tableKey' :data="list" v-loading="!list" element-loading-text="给我一点时间"  fixed border highlight-current-row ref= 'table' @select = 'getRow' @select-all = 'getRow'
      >
      <el-table-column align='center' v-if= 'hasSelection' type="selection" width="55"></el-table-column>
      <el-table-column type="expand" class-name="status-col" width = '70%' >
        <template slot-scope="scope">
          <el-table :data="scope.row.formLists" label-position="left" inline class="demo-table-expand" fixed border highlight-current-row >
            <el-table-column label="标题名" align='center'>
                <template slot-scope="childrenScope">
                  <span>{{ childrenScope.row.title }}</span>
                </template>
                
            </el-table-column>
            <el-table-column label="控件类型" align='center'>
                <template slot-scope="childrenScope">
                  <span>{{ childrenScope.row.type.text }}</span>
                </template>
            </el-table-column>
            <el-table-column label="控件对应值" align='center'>
                <template slot-scope="childrenScope">
                  <span v-for = '(option, index) in childrenScope.row.options' :key="index">{{ option}} &nbsp;&nbsp;</span>
                </template>
            </el-table-column>
            <el-table-column label="备注" align='center'>
                <template slot-scope="childrenScope">
                  <span>{{ childrenScope.row.remark }}</span>
                </template>
            </el-table-column>
            <el-table-column   label="操作" width="100" align="center" class-name="small-padding fixed-width">
              <template slot-scope="childrenScope">
                <el-button  size = 'small' type="success" @click="childrenTable(childrenScope.row)" >编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column align='center' width="55" label="编码" >
        <template slot-scope="scope">
            <span>{{scope.row.code}}</span>
        </template>
      </el-table-column>
      
      <el-table-column class-name="status-col" label="表单名" align='center'>
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column align='center' label="简介" >
        <template slot-scope="scope">
            <span>{{scope.row.description}}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="创建时间" >
        <template slot-scope="scope">
          <span>{{scope.row.createTime}}</span>
        </template>
      </el-table-column>
      
      <el-table-column v-if = 'hasOperate'  label="操作" :width="100 * operationButtons.length" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-for='button in operationButtons' size = 'small' :type="button.type" @click="fun(scope.row, button.id)" :key = 'button.name'>{{button.text}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[5,10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="list.length">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { fetchPv, createArticle, updateArticle } from '@/api/article'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
// import { pending } from '@/api/appointmentManage'
export default {
  name: 'followupTable',
  directives: {
    waves
  },
  props: {
    hasSelection: {
      type: Boolean,
      default: true
    },
    hasOperate: {
      type: Boolean,
      default: true
    },
    list: {
      type: Array,
      default: function() {
        return []
      }
    },
    theadList: {
      type: Array,
      default: function() {
        return []
      }
    },
    operationButtons: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      tableKey: 0,
      // list: null,
      total: 5,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 5,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.total = this.list.length
  },
  methods: {
    getRow(s, r) {
      this.$emit('getSelectArr', s, r)
    },
    fun(row, buttonId) {
      this.$emit('operationEvent' + buttonId, row)
    },
    childrenTable(row) {
      this.$emit('childrenTableEvent', row)
    },
    getList() {
      this.$emit('getListByPagination', this.listQuery)
    },
    // handleFilter() {
    //   this.listQuery.page = 1 // 通过筛选条件每次请求默认第一页
    //   this.getList()
    // },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    degreeColor(degree) {
      const map = [
        {
          'level': 100,
          'color': '#67C23A'
        },
        {
          'level': 75,
          'color': '#409EFF'
        },
        {
          'level': 50,
          'color': '#E6A23C'
        },
        {
          'level': 25,
          'color': '#F56C6C'
        }
      ]
      let i = 0
      let result = '#67C23A'
      while (i < 4) {
        if (degree < map[i]['level']) {
          result = map[i]['color']
        } else {
          return result
        }
        i++
      }
      return result
    }
  },
  computed: {}
}
</script>
<style lang="scss">
.filter-container{
  line-height: 2.5;
}
</style>

